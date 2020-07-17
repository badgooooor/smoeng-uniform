import * as firebase from "firebase/app";
import * as dotenv from "dotenv";
import "firebase/auth";
import { user_store } from "./stores/user";

dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () =>
  auth
    .signInWithPopup(provider)
    .then((result) => {
      let displayName = result.additionalUserInfo?.profile.given_name + " " + result.additionalUserInfo?.profile.family_name;
      user_store.update(displayName, result.additionalUserInfo?.profile.id);
    })
    .catch((error) => {
      console.log(error);
    });

export default firebase;
