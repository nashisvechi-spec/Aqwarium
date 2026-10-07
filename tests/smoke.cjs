const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name)};
const web=path.join(root,'web');
const server=http.createServer((req,res)=>{
 const target=path.resolve(web,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!target.startsWith(web+path.sep)&&target!==web){res.writeHead(403);res.end();return}
 const file=target===web?path.join(web,'index.html'):target;
 if(!fs.existsSync(file)){res.writeHead(404);res.end();return}
 const ext=path.extname(file),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.json':'application/json'};
 res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:412,height:915},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(r.url()+': '+r.status())});
 await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>typeof loaded!=='undefined'&&loaded);
 pass('App starts without runtime errors',errors.length===0);
 pass('9 built-in inhabitants',await page.evaluate(()=>fishTypes.length===9));
 pass('10 decorations, 4 backgrounds',await page.evaluate(()=>decorTypes.length===10&&BACKGROUNDS.length===4));
 pass('1x = 24 h; growth 8x; hunger 36 h',await page.evaluate(()=>LIFE_DAY===86400&&GROWTH_MULTIPLIER===8&&HUNGER_FULL_HOURS===36));
 pass('Economy mode defaults to 20 FPS',await page.evaluate(()=>displayMode==='eco'&&displaySettings().fps===20));
 const graphics=await page.evaluate(async()=>{
  const urls=[...PACKAGED_IMAGES];
  return await Promise.all(urls.map(url=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve({url,ok:i.naturalWidth>0});i.onerror=()=>resolve({url,ok:false});i.src=url})));
 });
 if(graphics.length!==28||graphics.some(x=>!x.ok))console.log('Graphic diagnostics',graphics);
 pass('All 28 packaged images decode',graphics.length===28&&graphics.every(x=>x.ok));
 await page.evaluate(()=>{stopAnimation();paused=true;state.lightCycle='manual';state.night=false;invalidateRender();draw()});
 fs.mkdirSync(path.join(root,'screenshots'),{recursive:true});
 await page.screenshot({path:path.join(root,'screenshots/portrait.png')});
 await page.click('#menuButton');await page.screenshot({path:path.join(root,'screenshots/menu-portrait.png')});
 await page.evaluate(()=>openPage('fish'));
 pass('Fish catalog shows 9 species',await page.locator('#catalog .item').count()===9);
 await page.getByRole('button',{name:/Гуппи.*Мирная/}).click();
 pass('Selecting guppy opens 4 colors',await page.locator('[data-color-variant]').count()===4);
 await page.locator('[data-color-variant="blue"]').click();
 await page.click('#addColorFish');
 pass('Blue guppy has saved individual color',await page.evaluate(()=>state.fish.at(-1).colorVariant==='blue'));
 await page.evaluate(()=>chooseFishColor('betta_splendens'));
 pass('Selecting betta opens 3 colors',await page.locator('[data-color-variant]').count()===3);
 await page.locator('[data-color-variant="red_blue"]').click();
 await page.screenshot({path:path.join(root,'screenshots/betta-colors.png')});
 await page.click('#addColorFish');
 pass('Red-blue betta added',await page.evaluate(()=>state.fish.at(-1).colorVariant==='red_blue'));
 pass('Betta cannot consume fish',await page.evaluate(()=>!params(F('betta_splendens')).consumeAllowed));
 const exported=await page.evaluate(()=>serialize());
 await page.evaluate(data=>loadData(data),exported);
 pass('JSON round trip preserves fish and colors',await page.evaluate(()=>state.fish.length===9&&state.fish.at(-1).colorVariant==='red_blue'&&state.fish.at(-2).colorVariant==='blue'));
 pass('Portable export embeds demo and color images',await page.evaluate(async()=>{const data=await portableData(serialize());return data.customFish.every(f=>f.image.startsWith('data:image/')&&(!f.colorVariants||f.colorVariants.every(c=>!c.image||c.image.startsWith('data:image/'))))}));
 await page.evaluate(()=>{paused=false;stopAnimation();closeSheet();dirtySave=true;persist(true)});
 await page.reload();await page.waitForFunction(()=>loaded);
 pass('Reload restores 9 inhabitants and chosen colors',await page.evaluate(()=>state.fish.length===9&&state.fish.at(-1).colorVariant==='red_blue'));
 await page.evaluate(()=>{stopAnimation();paused=true});
 for(const viewport of [{width:320,height:568},{width:412,height:915},{width:915,height:412},{width:1280,height:720}]){
  await page.setViewportSize(viewport);
  for(const section of ['menu','fish','decor','bg','lighting','food','packs','settings','absence']){
   await page.evaluate(s=>openPage(s),section);
   const size=await page.locator('#sheet').boundingBox();
   pass('Menu '+section+' fits '+viewport.width+'x'+viewport.height,!!size&&size.x>=-1&&size.y>=-1&&size.x+size.width<=viewport.width+1&&size.y+size.height<=viewport.height+1);
  }
 }
 await page.setViewportSize({width:915,height:412});await page.evaluate(()=>{closeSheet();state.lightCycle='manual';state.night=false;invalidateRender();draw()});
 await page.screenshot({path:path.join(root,'screenshots/landscape.png')});
 const hunting=await page.evaluate(()=>{
  state.decor=[];state.fish=[];state.mode='natural';state.lightCycle='manual';state.night=false;
  const pike=fishInstance('pike_grass_ambush',.4,.65),small=fishInstance('guppy',.41,.65);
  pike.z=small.z=1;pike.length=23;small.length=4;
  pike.territory={x:.4,y:.65,z:1,radius:.18,show:true};state.fish=[pike,small];
  const r={};pike.stats.satiety=21;r.no79=!canConsumePrey(pike,small);
  pike.stats.satiety=20;r.yes80=canConsumePrey(pike,small);r.stay80=!canLeaveTerritoryForHunt(pike);
  small.x=.8;r.outside80=!canConsumePrey(pike,small);
  pike.stats.satiety=10;r.leave90=canLeaveTerritoryForHunt(pike);r.consume90=canConsumePrey(pike,small);
  state.mode='calm';r.calm=!canConsumePrey(pike,small);
  const c=fishInstance('cichlid',.4,.65);c.z=1;c.length=20;small.x=.4;state.mode='natural';c.stats.satiety=11;
  r.default89=!canConsumePrey(c,small);c.stats.satiety=10;r.default90=canConsumePrey(c,small);
  r.spawn=Array.from({length:100},()=>fishInstance('pike_grass_ambush')).every(a=>a.length>=20&&a.length<=26);
  return r;
 });
 for(const [name,value] of Object.entries(hunting))pass('Hunting: '+name,value);
 const clock=await page.evaluate(()=>{
  state.fish=[fishInstance('guppy')];state.decor=[];state.environment.temperature=24;state.lightCycle='manual';state.night=false;
  const a=state.fish[0];a.stats.satiety=100;a.stats.comfort=95;a.stats.health=100;a.stats.stress=0;
  const old=a.length;a.growthScale=1;updateStats(a,86400,true);
  const expected=params(F('guppy')).growth*8;
  const result={hunger24:Math.abs(a.stats.satiety-100/3)<.01,growth8:Math.abs(a.length-old-expected)<.01};
  a.stats.satiety=100;updateStats(a,36*3600,true);result.hunger36=a.stats.satiety===0;
  a.stats.satiety=100;paused=false;worldAt=Date.now()-24*3600*1000;const before=simTime;catchUpLife(Date.now(),false);
  result.absence24=Math.abs((simTime-before)-86400)<1;result.noFoodOffline=a.stats.satiety<35;
  return result;
 });
 for(const [name,value] of Object.entries(clock))pass('Calendar and offline: '+name,value);
 pass('Territory survives save and restore',await page.evaluate(()=>{state.fish=[fishInstance('pike_grass_ambush')];const a=state.fish[0];a.territory={x:.3,y:.67,z:1,radius:.11,show:true,centerKind:'point',anchor:null};const data=serialize();loadData(data);return state.fish[0].territory.radius===.11&&state.fish[0].territory.x===.3}));
 pass('ZIP manifest and external image import',await page.evaluate(async()=>{
  const f=copy(F('neon'));f.id='zip_neon';f.name='ZIP неон';f.image='neon.webp';
  const image=new Uint8Array(await fetch('assets/fish/neon.webp').then(r=>r.arrayBuffer()));
  const manifest={format:'quiet-water-content-pack',version:1,fish:[f],decor:[]};
  const zip=fflate.zipSync({'manifest.json':fflate.strToU8(JSON.stringify(manifest)),'neon.webp':image});
  const data=await readContentFile(new File([zip],'example.zip'));loadData(data);return F('zip_neon').image.startsWith('data:image/webp;');
 }));
 pass('Malformed profiles and external image URLs rejected',await page.evaluate(()=>{
  const f=copy(F('neon'));f.id='bad';f.image='https://example.com/image.png';
  try{validateTypes([f],'fish');return false}catch(e){return true}
 }));
 pass('Android back handler closes menu',await page.evaluate(()=>{openPage('fish');return AquariumLifecycle.back()&&!$('#sheet').open}));
 pass('Pause freezes absence clock',await page.evaluate(()=>{paused=true;worldAt=Date.now()-86400000;const old=simTime;catchUpLife(Date.now(),false);return simTime===old}));
 pass('Newer native checkpoint is preferred',await page.evaluate(()=>{
  const previous=localStorage.getItem('quiet-water-v2');const local=serialize();local.life.updatedAt=100;
  const native=copy(local);native.life.updatedAt=200;localStorage.setItem('quiet-water-v2',JSON.stringify(local));
  window.AquariumAndroid={getCheckpoint:()=>JSON.stringify(native)};
  try{return JSON.parse(bestCheckpoint()).life.updatedAt===200}
  finally{delete window.AquariumAndroid;localStorage.setItem('quiet-water-v2',previous)}
 }));
 pass('Invalid native checkpoint falls back to local save',await page.evaluate(()=>{
  window.AquariumAndroid={getCheckpoint:()=>'{broken'};
  try{return bestCheckpoint()===localStorage.getItem('quiet-water-v2')}
  finally{delete window.AquariumAndroid}
 }));
 pass('Android export receives portable JSON',await page.evaluate(async()=>{
  let exported;window.AquariumAndroid={saveFile:(name,text)=>{exported={name,text}}};
  try{await download(serialize(),'Native_Aquarium.json');return exported.name==='Native_Aquarium.json'&&JSON.parse(exported.text).format==='quiet-water-aquarium'&&!/"image":"assets\//.test(exported.text.replace(/\s+/g,''))}
  finally{delete window.AquariumAndroid}
 }));
 pass('Failed native checkpoint is reported',await page.evaluate(()=>{
  window.AquariumAndroid={saveCheckpoint:()=>false};dirtySave=true;persist(true);delete window.AquariumAndroid;
  return !storageOK&&dirtySave;
 }));
 pass('Native checkpoint can recover after a failed save',await page.evaluate(()=>{
  window.AquariumAndroid={saveCheckpoint:()=>true};persist(true);delete window.AquariumAndroid;
  return storageOK&&!dirtySave;
 }));
 pass('ZIP directory traversal is rejected',await page.evaluate(async()=>{
  const zip=fflate.zipSync({'../manifest.json':fflate.strToU8('{}')});
  try{await readContentFile(new File([zip],'bad.zip'));return false}catch(e){return e.message.includes('структура ZIP')}
 }));
 pass('Oversized ZIP member is rejected before extraction',await page.evaluate(async()=>{
  const zip=fflate.zipSync({'huge.png':new Uint8Array(2_000_001)});
  try{await readContentFile(new File([zip],'huge.zip'));return false}catch(e){return e.message.includes('слишком большие')}
 }));
 pass('No runtime errors throughout checks',errors.length===0);
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
 fs.writeFileSync(path.join(root,'test-results/report.json'),JSON.stringify({passed:checks.length,checks,errors},null,2));
 console.log('PASS: '+checks.length+' checks.');
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
