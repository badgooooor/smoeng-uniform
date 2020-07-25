import * as firebase from "firebase/app";
import * as dotenv from "dotenv";
import "firebase/auth";
import { user_store } from "./stores/user";
import Axios from "axios";
import { createUser, getUser } from "./services/user";

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

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log(user);
    let displayName = user.displayName || "";
    let email = user.email || "";
    let photoUrl = user.photoURL || "";
    let isNewUser = false;
    let userId = user.providerData[0]?.uid;

    const fetchedUser = await getUser(userId);

    user_store.updateContact(
      fetchedUser.telNumber,
      fetchedUser.department,
      fetchedUser.room
    );

    user_store.update(displayName, userId, photoUrl, email);
  } else {
    return signInWithGoogle();
  }
});

export const signInWithGoogle = () =>
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      let userId = result.additionalUserInfo?.profile.id || "";
      let displayName = result.user?.displayName || "";
      let isNewUser = result.additionalUserInfo?.isNewUser;
      let photoUrl = result.user?.photoURL || "";
      let email = result.user?.email || "";

      if (isNewUser) {
        const user = await createUser(userId, {
          name: displayName,
          email: email,
        });
      } else {
        const fetchedUser = await getUser(userId);

        user_store.updateContact(
          fetchedUser.telNumber,
          fetchedUser.department,
          fetchedUser.room
        );
      }
      user_store.update(displayName, userId, photoUrl, email);
    })
    .catch((error) => {
      console.log(error);
    });

export default firebase;
