self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.map(k=>caches.delete(k)));
    await self.registration.unregister();
    const clientsList=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const c of clientsList){c.navigate(c.url);}
  })());
});