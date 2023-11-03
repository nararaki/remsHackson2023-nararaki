self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
  });
  
  // あるイベント（例えばFetchイベントやPushイベント）で通知をトリガーできます
  //self.addEventListener('fetch', (event) => {
    // ...
  //});
  
  self.addEventListener('push', (event) => {
    var options = {
        body: event.data.text()
      };
    
      event.waitUntil(
        self.registration.showNotification('Time Notification', options)
      );
  });
  