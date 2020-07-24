import * as firebase from "firebase/app";
import * as dotenv from "dotenv";
import "firebase/auth";
import { user_store } from "./stores/user";
import Axios from "axios";

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
    .then(async (result) => {
      let userId = result.additionalUserInfo?.profile.id || "";
      let displayName = result.user?.displayName || "";
      let isNewUser = result.additionalUserInfo?.isNewUser;
      let photoUrl = result.user?.photoURL || "";
      let email = result.user?.email || "";

      if (isNewUser) {
        const user = await Axios.post(
          `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${userId}`,
          {
            name: displayName,
            email: email,
          }
        ).then((response) => response.data);
        console.log(user);
      } else {
        let fetchedUser = await (
          await Axios.get(
            `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${userId}`
          )
        ).data;
        console.log(fetchedUser);
        user_store.updateContact(
          fetchedUser.telNumber,
          fetchedUser.department,
          fetchedUser.room
        );
        console.log(user_store);
      }
      user_store.update(displayName, userId, photoUrl, email);
    })
    .catch((error) => {
      console.log(error);
    });

export default firebase;
