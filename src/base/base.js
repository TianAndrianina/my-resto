import Rebase from 're-base';
import firebase from 'firebase';

const config = {
// copier les 3 premières lignes de VOTRE config de votre base !!!
 // NE PRENEZ PAS LES VALEURS QUI SONT ICI !!!
    apiKey:"AIzaSyCMG99jFnbLIfGZ8LSgDoshQAUlwWDP8rA",
    authDomain:"mbds-2685c.firebaseapp.com",
    databaseURL:"https://mbds-2685c.firebaseio.com"     // pas de , à la fin
}

const base = Rebase.createClass(config);
const app = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firebaseapp = app; 
export default base;