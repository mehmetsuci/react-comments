import Rebase from 're-base'
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDl_0BLOH6x2cSS0ZL_5ej5XobcNBnIaqw",
  authDomain: "reactcurso-45fec.firebaseapp.com",
  databaseURL: "https://reactcurso-45fec.firebaseio.com",
  projectId: "reactcurso-45fec",
  storageBucket: "",
  messagingSenderId: "1077296735833"
})
const db = firebase.database(firebaseApp)
const base = Rebase.createClass(db)

export const providers = {
  'facebook': new firebase.auth.FacebookAuthProvider()
}

export const auth = firebaseApp.auth()
export default base