const firebase = require("firebase");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDZEQfSWwPb_RyJ060TRQrLgZEhOskmBZ8",
  authDomain: "catan-45cf4.firebaseapp.com",
  databaseURL: "https://catan-45cf4.firebaseio.com/",
  projectId: "catan-45cf4",
  storageBucket: "catan-45cf4.appspot.com",
  messagingSenderId: "387625127091"
}

firebase.initializeApp(config);
export const db = firebase.firestore();

export default firebase