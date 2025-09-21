
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Rise';
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
