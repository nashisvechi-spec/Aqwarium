const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const checks=[];
const pass=(name,result)=>{assert.ok(result,name);checks.push(name)};
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:412,height:915}});
 const errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url())});
 await page.goto(pathToFileURL(path.join(root,'preview/Aquarium_Test_v2.html')).href);
 await page.waitForFunction(()=>typeof loaded!=='undefined'&&loaded);
 pass('Standalone HTML starts from a local file',errors.length===0);
 pass('Standalone HTML includes all 9 inhabitants',await page.evaluate(()=>fishTypes.length===9));
 pass('Standalone HTML includes all 28 embedded images',await page.evaluate(async()=>{
  const urls=new Set();for(const t of [...fishTypes,...decorTypes,...BACKGROUNDS]){
   if(t.image)urls.add(t.image);for(const v of t.colorVariants||[])if(v.image)urls.add(v.image);
  }
  if(urls.size!==28||[...urls].some(s=>!s.startsWith('data:image/webp;base64,')))return false;
  return (await Promise.all([...urls].map(s=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i.naturalWidth>0);i.onerror=()=>resolve(false);i.src=s})))).every(Boolean);
 }));
 pass('Standalone save and restore preserves a betta color',await page.evaluate(()=>{
  stopAnimation();state.fish=[fishInstance('betta_splendens')];state.fish[0].colorVariant='red_blue';
  const data=serialize();loadData(data);return state.fish[0].colorVariant==='red_blue';
 }));
 pass('Standalone export needs no external assets',await page.evaluate(async()=>{
  const data=await portableData(serialize());return data.customFish.every(f=>f.image.startsWith('data:image/'));
 }));
 pass('Standalone menu opens and closes',await page.evaluate(()=>{openPage('fish');const opened=$('#sheet').open;AquariumLifecycle.back();return opened&&!$('#sheet').open}));
 pass('Standalone preview has no external requests or runtime errors',external.length===0&&errors.length===0);
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
 fs.writeFileSync(path.join(root,'test-results/portable.json'),JSON.stringify({passed:checks.length,checks,errors,external},null,2));
 console.log('PASS: '+checks.length+' standalone checks.');
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{if(browser)await browser.close()});
