package ru.quietwater.aquarium;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import android.util.AtomicFile;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.webkit.WebViewAssetLoader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class MainActivity extends Activity {
    private static final int PICK_JSON = 10, SAVE_JSON = 11;
    private static final int MAX_JSON = 8_000_000;
    private WebView web;
    private ValueCallback<Uri[]> fileCallback;
    private String pendingExport;
    private final ExecutorService disk = Executors.newSingleThreadExecutor();
    private AtomicFile checkpoint;
    private AtomicFile exportCheckpoint;
    private boolean resumed;
    private android.window.OnBackInvokedCallback backCallback;
    private WebViewAssetLoader assets;

    @Override public void onCreate(Bundle saved) {
        super.onCreate(saved);
        checkpoint = new AtomicFile(new File(getFilesDir(), "aquarium.json"));
        exportCheckpoint = new AtomicFile(new File(getCacheDir(), "pending-export.json"));
        assets = new WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web = new WebView(this);
        web.setBackgroundColor(0xff091e28);
        setContentView(web);
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(true);
        web.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        web.getSettings().setSupportMultipleWindows(false);
        web.addJavascriptInterface(new Bridge(), "AquariumAndroid");
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("https".equals(uri.getScheme()) && "appassets.androidplatform.net".equals(uri.getHost())) {
                    WebResourceResponse response = assets.shouldInterceptRequest(uri);
                    if (response != null) return response;
                }
                return new WebResourceResponse("text/plain", "UTF-8", 403, "Blocked",
                    Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                return true;
            }
            @Override public void onPageFinished(WebView v, String url) { immersive(); }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                FileChooserParams params) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = callback;
                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
                intent.putExtra(Intent.EXTRA_MIME_TYPES,
                    new String[]{"application/json", "application/zip", "text/plain", "application/octet-stream"});
                try { startActivityForResult(intent, PICK_JSON); }
                catch (ActivityNotFoundException e) {
                    fileCallback.onReceiveValue(null); fileCallback = null;
                    message("Не удалось открыть выбор файлов");
                }
                return true;
            }
        });
        if (saved != null && saved.getBoolean("exportPending")) {
            try { pendingExport = new String(exportCheckpoint.readFully(), StandardCharsets.UTF_8); }
            catch (Exception ignored) { pendingExport = null; }
        }
        web.loadUrl("https://appassets.androidplatform.net/assets/index.html");
        if (Build.VERSION.SDK_INT >= 33) {
            backCallback = this::handleBack;
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, backCallback);
        }
        immersive();
    }

    private final class Bridge {
        @JavascriptInterface public String getCheckpoint() {
            synchronized (checkpoint) {
                try { return new String(checkpoint.readFully(), StandardCharsets.UTF_8); }
                catch (Exception ignored) { return ""; }
            }
        }
        @JavascriptInterface public boolean saveCheckpoint(String value) {
            if (value == null || value.length() > MAX_JSON) return false;
            byte[] bytes = value.getBytes(StandardCharsets.UTF_8);
            if (bytes.length > MAX_JSON) return false;
            // Synchronous AtomicFile checkpoint completes before WebView is paused.
            synchronized (checkpoint) {
                FileOutputStream stream = null;
                try {
                    stream = checkpoint.startWrite(); stream.write(bytes); checkpoint.finishWrite(stream); return true;
                } catch (Exception ignored) { if (stream != null) checkpoint.failWrite(stream); return false; }
            }
        }
        @JavascriptInterface public void saveFile(String name, String value) {
            if (value == null || value.getBytes(StandardCharsets.UTF_8).length > MAX_JSON) {
                runOnUiThread(() -> message("Сохранение должно быть меньше 8 МБ")); return;
            }
            String filename = name == null ? "Aquarium.json" : name.replaceAll("[^\\p{L}\\p{N}_.-]", "_");
            runOnUiThread(() -> {
                if (pendingExport != null) { message("Завершите предыдущее сохранение"); return; }
                pendingExport = value;
                disk.execute(() -> {
                    FileOutputStream stream = null;
                    try {
                        stream = exportCheckpoint.startWrite();
                        stream.write(value.getBytes(StandardCharsets.UTF_8));
                        exportCheckpoint.finishWrite(stream);
                    } catch (Exception e) {
                        if (stream != null) exportCheckpoint.failWrite(stream);
                        runOnUiThread(() -> { pendingExport = null; message("Не удалось подготовить файл"); });
                        return;
                    }
                    runOnUiThread(() -> {
                        if (isFinishing() || isDestroyed()) return;
                        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                        intent.addCategory(Intent.CATEGORY_OPENABLE);
                        intent.setType("application/json");
                        intent.putExtra(Intent.EXTRA_TITLE, filename);
                        try { startActivityForResult(intent, SAVE_JSON); }
                        catch (ActivityNotFoundException e) {
                            pendingExport = null; exportCheckpoint.delete(); message("Не удалось открыть сохранение");
                        }
                    });
                });
            });
        }
    }

    @Override protected void onActivityResult(int request, int result, Intent data) {
        super.onActivityResult(request, result, data);
        if (request == PICK_JSON && fileCallback != null) {
            Uri uri = result == RESULT_OK && data != null ? data.getData() : null;
            fileCallback.onReceiveValue(uri == null ? null : new Uri[]{uri}); fileCallback = null;
        }
        if (request == SAVE_JSON) {
            String content = pendingExport; pendingExport = null;
            exportCheckpoint.delete();
            Uri uri = result == RESULT_OK && data != null ? data.getData() : null;
            if (uri != null && content != null) disk.execute(() -> {
                try (java.io.OutputStream stream = getContentResolver().openOutputStream(uri, "w")) {
                    if (stream == null) throw new java.io.IOException("No output stream");
                    stream.write(content.getBytes(StandardCharsets.UTF_8));
                    runOnUiThread(() -> message("Аквариум сохранён"));
                } catch (Exception e) { runOnUiThread(() -> message("Не удалось сохранить файл")); }
            });
        }
    }

    private void immersive() {
        if (Build.VERSION.SDK_INT >= 30) {
            getWindow().setDecorFitsSystemWindows(false);
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.systemBars());
                controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        }
    }
    @Override public void onWindowFocusChanged(boolean focus) { super.onWindowFocusChanged(focus); if (focus) immersive(); }
    @Override protected void onPause() {
        resumed = false;
        if (web != null) web.evaluateJavascript("window.AquariumLifecycle && AquariumLifecycle.suspend()", value -> {
            if (web != null && !resumed) web.onPause();
        });
        super.onPause();
    }
    @Override protected void onResume() {
        super.onResume();
        resumed = true;
        if (web != null) { web.onResume(); web.evaluateJavascript("window.AquariumLifecycle && AquariumLifecycle.resume()", null); }
        immersive();
    }
    @Override public void onBackPressed() { handleBack(); }
    private void handleBack() {
        if (web == null) return;
        web.evaluateJavascript("window.AquariumLifecycle && AquariumLifecycle.back()", result -> {
            if (!"true".equals(result)) new AlertDialog.Builder(this)
                .setMessage("Закрыть аквариум?").setNegativeButton("Остаться", null)
                .setPositiveButton("Закрыть", (dialog, which) -> finish()).show();
        });
    }
    @Override protected void onSaveInstanceState(Bundle state) {
        super.onSaveInstanceState(state);
        state.putBoolean("exportPending", pendingExport != null);
    }
    @Override protected void onDestroy() {
        if (Build.VERSION.SDK_INT >= 33 && backCallback != null) {
            getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(backCallback);
        }
        if (fileCallback != null) fileCallback.onReceiveValue(null);
        if (web != null) { web.removeJavascriptInterface("AquariumAndroid"); web.destroy(); web = null; }
        disk.shutdown(); super.onDestroy();
    }
    private void message(String value) { Toast.makeText(this, value, Toast.LENGTH_SHORT).show(); }
}
