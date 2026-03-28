// sw.js - NUR AI Background Engine
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { title, body, delay, prayerName } = event.data;

        // Use a persistent timer approach
        setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                icon: 'https://cdn-icons-png.flaticon.com/512/2874/2874802.png',
                vibrate: [300, 100, 300, 100, 500],
                badge: 'https://cdn-icons-png.flaticon.com/512/2874/2874802.png',
                tag: prayerName, // Prevents duplicate notifications for same prayer
                renotify: true,
                requireInteraction: true // Keeps notification on screen until dismissed
            });
        }, delay);
    }
});

// Open the app when the user clicks the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
