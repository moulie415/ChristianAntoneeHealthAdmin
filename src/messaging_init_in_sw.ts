import {initializeApp} from 'firebase/app';
import {getMessaging, getToken} from 'firebase/messaging';
import {firebaseConfig} from './FIREBASE_CONFIG';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey:
          'BF6_oX68s8_FwAxKWaE7_eHO8MbDVE1cL01F-SbYW-J9eX52XGVcZLuct-nN6dAu4A6LgilsKvo2OwTA5_Dc06I',
      })
        .then(currentToken => {
          if (currentToken) {
            console.log(currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            console.log(
              'No registration token available. Request permission to generate one.',
            );
            // ...
          }
        })
        .catch(err => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
    }
  });
}

requestPermission();
