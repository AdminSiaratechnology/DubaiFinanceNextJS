importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDdCs5wRv_2SSLCqrPBZ4wcIj-FMMJe_Xg",
  authDomain: "dubaifinance-253b7.firebaseapp.com",
  projectId: "dubaifinance-253b7",
  storageBucket: "dubaifinance-253b7.firebasestorage.app",
  messagingSenderId: "447458162927",
  appId: "1:447458162927:web:154b02fc9abc680d75c31a",
});

const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});