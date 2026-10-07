'use strict';
function bestCheckpoint(){
 const local=localStorage.getItem('quiet-water-v2');
 let native='';try{native=window.AquariumAndroid?.getCheckpoint()||''}catch(e){}
 const parse=s=>{try{const o=JSON.parse(s);return o.format==='quiet-water-aquarium'?o:null}catch(e){return null}};
 const a=parse(local),b=parse(native);
 if(!a)return b?native:null;if(!b)return local;
 return (b.life?.updatedAt??0)>(a.life?.updatedAt??0)?native:local;
}
async function portableData(data){
 const result=JSON.parse(JSON.stringify(data));
 const cache=new Map();
 async function visit(obj){
  if(!obj||typeof obj!=='object')return;
  for(const [key,value] of Object.entries(obj)){
   if(key==='image'&&typeof value==='string'&&/^assets\/(fish|decor|backgrounds)\/[a-z0-9_-]+\.webp$/.test(value)){
    if(!cache.has(value))cache.set(value,fetch(value).then(r=>{if(!r.ok)throw Error('Не удалось подготовить изображение');return r.blob()}).then(blob=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)})));
    obj[key]=await cache.get(value);
   }else if(value&&typeof value==='object')await visit(value);
  }
 }
 await visit(result);return result;
}
async function download(data,name){
 try{
  const portable=await portableData(data),text=JSON.stringify(portable,null,2);
  if(new Blob([text]).size>8_000_000)throw Error('Сохранение должно быть меньше 8 МБ');
  if(window.AquariumAndroid){window.AquariumAndroid.saveFile(name,text);return}
  const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
 }catch(e){toast('Не удалось сохранить: '+e.message)}
}
async function readContentFile(file){
 if(!/\.zip$/i.test(file.name))return JSON.parse(await file.text());
 const buffer=new Uint8Array(await file.arrayBuffer());let total=0,count=0;
 const accepted=info=>{
  if(info.name.endsWith('/'))return false;
  if(++count>70||info.name.length>180||info.name.includes('..')||info.name.startsWith('/')||info.name.includes('\\'))throw Error('Некорректная структура ZIP');
  if(!/\.(json|png|jpe?g|webp)$/i.test(info.name))return false;
  if(info.originalSize>2_000_000||(total+=info.originalSize)>8_000_000)throw Error('Изображения в ZIP слишком большие');
  return true;
 };
 const entries=fflate.unzipSync(buffer,{filter:accepted});
 const manifest=Object.keys(entries).find(x=>/(^|\/)manifest\.json$/i.test(x))??Object.keys(entries).find(x=>/\.json$/i.test(x));
 if(!manifest)throw Error('В ZIP нужен manifest.json');
 const data=JSON.parse(fflate.strFromU8(entries[manifest])),prefix=manifest.includes('/')?manifest.slice(0,manifest.lastIndexOf('/')+1):'';
 function images(obj){
  if(!obj||typeof obj!=='object')return;
  for(const [key,value] of Object.entries(obj)){
   if(key==='image'&&typeof value==='string'&&!value.startsWith('data:')){
    const path=prefix+value,bytes=entries[path];if(!bytes)throw Error('В ZIP нет изображения: '+value);
    const ext=value.split('.').pop().toLowerCase(),mime=ext==='jpg'?'jpeg':ext;
    if(!['png','jpeg','webp'].includes(mime))throw Error('Поддерживаются PNG, JPEG и WebP');
    let raw='';for(let i=0;i<bytes.length;i+=8192)raw+=String.fromCharCode(...bytes.subarray(i,i+8192));
    obj[key]='data:image/'+mime+';base64,'+btoa(raw);
   }else if(value&&typeof value==='object')images(value);
  }
 }
 images(data);return data;
}
