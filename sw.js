const CACHE = 'khaled-dash-v1';
const FILES = [
  'index.html','main.html','health.html','gym.html','po-water.html',
  'finance.html','caffeine.html','nova-lite.html','avatar-lab.html','template.html',
  'topbar.js','sync.js','manifest.json','icon.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const c = caches.open(CACHE).then(ca => { ca.put(e.request, res.clone()); });
      return res;
    }))
  );
});
