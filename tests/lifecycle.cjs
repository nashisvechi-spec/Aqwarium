const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),web=path.join(root,'web');
const checks=[],errors=[];
const pass=(name,result)=>{assert.ok(result,name);checks.push(name)};
const server=http.createServer((req,res)=>{
 const target=path.resolve(web,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!target.startsWith(web+path.sep)&&target!==web){res.writeHead(403);res.end();return}
 const file=target===web?path.join(web,'index.html'):target;
 if(!fs.existsSync(file)){res.writeHead(404);res.end();return}
 const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp'};
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
});
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const url='http://127.0.0.1:'+server.address().port;
 async function newPage(init,data){
  const context=await browser.newContext({viewport:{width:915,height:412}});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  if(init)await page.addInitScript(init,data);
  await page.goto(url);await page.waitForFunction(()=>typeof loaded!=='undefined'&&loaded);
  return page;
 }
 const page=await newPage();
 await page.evaluate(()=>{state.lightCycle='manual';state.night=false;invalidateRender()});
 const before=await page.evaluate(()=>({time:simTime,fish:state.fish.map(a=>({id:a.id,x:a.x,y:a.y}))}));
 await page.waitForFunction(time=>simTime>time+1,before.time);
 pass('Live frame loop advances time and moves fish',await page.evaluate(old=>state.fish.filter(a=>{
  const b=old.fish.find(b=>b.id===a.id);return Math.hypot(a.x-b.x,a.y-b.y)>.002;
 }).length>=2,before));
 for(const size of ['width','height','both']){
  const clock=await page.evaluate(size=>{
   if(size==='width'||size==='both')canvas.style.width='0px';
   if(size==='height'||size==='both')canvas.style.height='0px';
   resize();return simTime;
  },size);
  await page.waitForFunction(time=>simTime>time+.2,clock);
  pass('Temporary zero '+size+' keeps all fish coordinates finite',await page.evaluate(()=>W>0&&H>0&&state.fish.every(a=>[a.x,a.y,a.vx,a.vy,a.pitch,a.z].every(Number.isFinite))));
  await page.evaluate(()=>{canvas.style.width='';canvas.style.height='';resize()});
 }
 const suspended=await page.evaluate(()=>{
  AquariumLifecycle.suspend();AquariumLifecycle.suspend();
  loadData(copy(serialize()));setDisplayMode('balanced');requestRender();
  return {time:simTime,worldAt};
 });
 await page.waitForTimeout(350);
 pass('Native suspend prevents restart by restoration and display changes',await page.evaluate(old=>{
  advanceVisible(Date.now());return lifeSuspended&&simTime===old.time&&worldAt===old.worldAt&&!frameTimer&&!frameRequest&&!stillRequest&&!autoSaveTimer;
 },suspended));
 pass('Resume catches up once and restarts the frame loop',await page.evaluate(()=>{
  paused=false;worldAt=Date.now()-3600_000;const old=simTime;
  AquariumLifecycle.resume();const after=simTime;AquariumLifecycle.resume();
  return Math.abs(after-old-3600)<.1&&simTime===after&&!lifeSuspended&&!!(frameTimer||frameRequest);
 }));
 pass('Explicit user pause remains paused after resume',await page.evaluate(()=>{
  paused=true;AquariumLifecycle.suspend();worldAt=Date.now()-3600_000;const old=simTime;
  AquariumLifecycle.resume();return paused&&simTime===old&&!frameTimer&&!frameRequest;
 }));
 await page.evaluate(()=>{paused=false;AquariumLifecycle.resume()});
 pass('Native checkpoint still saves when browser quota is exhausted',await page.evaluate(()=>{
  const old=Storage.prototype.setItem;let writes=0;
  try{
   Storage.prototype.setItem=function(){throw new DOMException('Storage full','QuotaExceededError')};
   window.AquariumAndroid={saveCheckpoint:()=>{writes++;return true}};
   dirtySave=true;persist(true);return writes===1&&storageOK&&!dirtySave;
  }finally{Storage.prototype.setItem=old;delete window.AquariumAndroid}
 }));
 pass('Browser checkpoint remains available without the native bridge',await page.evaluate(()=>{
  dirtySave=true;persist(true);return storageOK&&!dirtySave&&JSON.parse(localStorage.getItem('quiet-water-v2')).scene.fish.length===state.fish.length;
 }));
 const fixture=await page.evaluate(()=>{
  stopAnimation();state.fish=[fishInstance('guppy',.6,.3)];
  Object.assign(state.fish[0],{id:'lifecycle-fish',name:'Сохранённая гуппи',colorVariant:'blue'});
  state.fish[0].stats.satiety=63;paused=false;return copy(serialize());
 });
 const nativePage=await newPage(data=>{
  const get=Storage.prototype.getItem;
  Storage.prototype.getItem=function(key){if(key==='quiet-water-v2')throw new DOMException('Unavailable','SecurityError');return get.call(this,key)};
  window.AquariumAndroid={getCheckpoint:()=>JSON.stringify(data),saveCheckpoint:()=>true};
 },fixture);
 pass('Startup restores native checkpoint when browser reads are blocked',await nativePage.evaluate(()=>state.fish.length===1&&state.fish[0].id==='lifecycle-fish'&&state.fish[0].colorVariant==='blue'));
 await nativePage.context().close();
 const fallbackPage=await newPage(data=>{
  localStorage.setItem('quiet-water-v2',JSON.stringify(data));
  const invalid=JSON.parse(JSON.stringify(data));invalid.life.updatedAt+=1000;invalid.scene.fish=null;
  window.AquariumAndroid={getCheckpoint:()=>JSON.stringify(invalid),saveCheckpoint:()=>true};
 },fixture);
 pass('Invalid newer native scene falls back to a valid browser checkpoint',await fallbackPage.evaluate(()=>state.fish.length===1&&state.fish[0].id==='lifecycle-fish'));
 await fallbackPage.context().close();
 const damaged=JSON.parse(JSON.stringify(fixture));
 Object.assign(damaged.scene.fish[0],{x:null,y:null,targetX:null,targetY:null,vx:null,vy:null,pitch:null});
 damaged.scene.fish[0].stats.comfort=null;
 const recoveredPage=await newPage(data=>localStorage.setItem('quiet-water-v2',JSON.stringify(data)),damaged);
 pass('Older damaged checkpoint recovers fish identity, color and hunger',await recoveredPage.evaluate(()=>{
  const a=state.fish[0];return state.fish.length===1&&a.id==='lifecycle-fish'&&a.colorVariant==='blue'&&Math.abs(a.stats.satiety-63)<.1&&[a.x,a.y,a.stats.comfort].every(Number.isFinite);
 }));
 const position=await recoveredPage.evaluate(()=>({time:simTime,x:state.fish[0].x,y:state.fish[0].y}));
 await recoveredPage.waitForFunction(time=>simTime>time+1,position.time);
 pass('Recovered fish resumes swimming',await recoveredPage.evaluate(old=>Math.hypot(state.fish[0].x-old.x,state.fish[0].y-old.y)>.002,position));
 pass('Malformed imported coordinates remain rejected',await recoveredPage.evaluate(data=>{
  try{loadData(data);return false}catch(e){return /координаты/.test(e.message)}
 },damaged));
 await recoveredPage.context().close();
 await page.setViewportSize({width:412,height:915});
 pass('Portrait displays rotation notice and hides app controls',await page.locator('#orientationNotice').isVisible()&&!await page.locator('#menuButton').isVisible());
 await page.setViewportSize({width:915,height:412});
 await page.click('#menuButton');
 pass('Landscape restores usable menu controls',await page.locator('#sheet').isVisible()&&!await page.locator('#orientationNotice').isVisible());
 await page.context().close();
 pass('No runtime errors during lifecycle and storage regressions',errors.length===0);
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
 fs.writeFileSync(path.join(root,'test-results/lifecycle.json'),JSON.stringify({passed:checks.length,checks,errors},null,2));
 console.log('PASS: '+checks.length+' lifecycle checks.');
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
