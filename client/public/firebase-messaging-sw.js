/* eslint-disable */

importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCaJH2XBUqeCMfgEAneygYTvwkYOvhoJCo',
  authDomain: 'spotifyre-notifications.firebaseapp.com',
  projectId: 'spotifyre-notifications',
  storageBucket: 'spotifyre-notifications.appspot.com',
  messagingSenderId: '651198449979',
  appId: '1:651198449979:web:0c9e6c7f50bae7dc530f1e'
});

const messaging = app.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    '[firebase-messaging-sw.js] setBackgroundMessageHandler',
    payload
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
