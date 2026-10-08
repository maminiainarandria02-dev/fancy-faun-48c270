// Change ce numéro à chaque mise à jour de l'application pour forcer le rafraîchissement
const CACHE = 'chantiers-v15';
const FILES = [
  './', './index.html', './manifest.json',
  './jspdf.umd.min.js', './supabase.js',
  './inter-latin-wght-normal.woff2',
  './space-grotesk-latin-wght-normal.woff2',
  './jetbrains-mono-latin-wght-normal.woff2',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Google Maps etc. : réseau uniquement
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

// Un clic sur une notification ramène l'utilisateur dans l'application
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
