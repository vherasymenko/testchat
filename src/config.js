import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAAjKMU1g450mj9I_D8OYHzQPi2HyFc4bg",
    authDomain: "authproject-45c98.firebaseapp.com",
    databaseURL: "https://authproject-45c98.firebaseio.com",
    projectId: "authproject-45c98",
    storageBucket: "authproject-45c98.appspot.com",
    messagingSenderId: "817496567715"
};

const fire = firebase.initializeApp(config);

export default fire;



