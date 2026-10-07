#!/usr/bin/env python3
"""Create a portable browser preview without external images or scripts."""
import base64
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
web = root / "web"
destination = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "preview" / "Aquarium_Test_v2.html"
html = (web / "index.html").read_text()
css = (web / "app.css").read_text()
engine = (web / "app.js").read_text()
# Native packaged URLs are accepted by Android. Portable previews use data URLs.
engine = re.sub(r"const PACKAGED_IMAGES=new Set\([^\n]+\);", "const PACKAGED_IMAGES=new Set();", engine)
images = {}
for image in sorted((web / "assets").rglob("*.webp")):
    name = image.relative_to(web).as_posix()
    images[name] = "data:image/webp;base64," + base64.b64encode(image.read_bytes()).decode()
for name, data_url in images.items():
    engine = engine.replace('"' + name + '"', '"' + data_url + '"')
html = html.replace('<link rel="stylesheet" href="app.css">', '<style>' + css + '</style>')
for name, code in [("vendor/fflate.js", (web / "vendor/fflate.js").read_text()),
                   ("pack-io.js", (web / "pack-io.js").read_text()), ("app.js", engine)]:
    code = code.replace("</script", "<\\/script")
    html = html.replace('<script src="' + name + '"></script>', '<script>' + code + '</script>')
license_text = (root / "licenses/fflate-MIT.txt").read_text()
html = html.replace("<!doctype html>", "<!doctype html>\n<!-- fflate 0.8.2:\n" + license_text + "\n-->")
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(html)
print(f"{destination}: {len(images)} embedded images, {destination.stat().st_size:,} bytes")
