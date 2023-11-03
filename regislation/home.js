const publicKey = 'BNOj0QKh4opSQPWMTd1oxVmyiAjzk7s8uBKiXllql-aUye7B60Yq7YVwpVyotJxuJz8wgplKgsNArmjXYonMyPk';

    // サービスワーカーを登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
    }

    // キー変換関数
    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    document.getElementById('subscribe').addEventListener('click', function() {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          
          navigator.serviceWorker.ready.then((registration) => {
            const convertedVapidKey = urlBase64ToUint8Array(publicKey);
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            }).then((subscription) => {
              console.log('User is subscribed:', subscription);
              
             
             
              fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                  'content-type': 'application/json'
                }
              });
            }).catch((err) => {
              console.log('Failed to subscribe the user: ', err);
            })
          });
        }
      });
    });