import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAreloE0v26Lbg6H0vXdfJ2WXIMi_tVPVc",
  authDomain: "hot-burgers-afeef.firebaseapp.com",
  databaseURL: "https://hot-burgers-afeef-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp};

export default base
