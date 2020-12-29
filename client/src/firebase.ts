import firebase from 'firebase';

const vapidKey =
  'BMbx1DeY3f7WKUHJ7EtjEW7l4oVf2LNopwArWME3i3c1bSo2uZEyexya2gXp-q-YAsCna2eyo9BcULtbzvoy0Ug';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyCaJH2XBUqeCMfgEAneygYTvwkYOvhoJCo',
  authDomain: 'spotifyre-notifications.firebaseapp.com',
  projectId: 'spotifyre-notifications',
  storageBucket: 'spotifyre-notifications.appspot.com',
  messagingSenderId: '651198449979',
  appId: '1:651198449979:web:0c9e6c7f50bae7dc530f1e'
});

export const messaging = app.messaging();
export const getPushToken = () => messaging.getToken({ vapidKey });
