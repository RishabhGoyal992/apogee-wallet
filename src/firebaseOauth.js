import firebase from "firebase/app"
import store from './store'
import { googleLogin } from '@/actionCreators/auth'


firebase.auth().getRedirectResult().then(result => {
  console.log(result)
  let idToken;
  if(result.credential && (idToken = result.credential.idToken)) {
    store.dispatch(googleLogin(idToken));
  }
}).catch(e => {
  console.log(e)
})
