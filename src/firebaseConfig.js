import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
import { config } from "@/.env";

firebase.initializeApp(config);

//OAuth Config
let provider = new firebase.auth.OAuthProvider('google.com');
provider.addScope('profile');
provider.addScope('email');

export {
  provider
}