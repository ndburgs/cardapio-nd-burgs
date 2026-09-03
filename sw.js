const CACHE='ndburgs-v9-shell';
const APP_SHELL=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(resp=>{if(resp&&resp.ok&&new URL(event.request.url).origin===self.location.origin){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy))}return resp}).catch(()=>cached||caches.match('./'))))});
