//imports, confing and firebase
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import("./style/secendary.css");
const firebase = require("firebase");
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAAuBjw9PcIJoliXzS5i9i3GM2X61b5nUY",
  authDomain: "reminder-75c96.firebaseapp.com",
  databaseURL: "https://reminder-75c96.firebaseio.com",
  projectId: "reminder-75c96",
  storageBucket: "reminder-75c96.appspot.com",
  messagingSenderId: "453049542104",
  appId: "1:453049542104:web:7abac7c49244ab3d56fead"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
