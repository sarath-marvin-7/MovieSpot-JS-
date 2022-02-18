const firebaseConfig = {
    apiKey: "AIzaSyAZfx7zY7B09qn2ObdIlFCqCpql9pchiXE",
    authDomain: "moviespot-67611.firebaseapp.com",
    projectId: "moviespot-67611",
    storageBucket: "moviespot-67611.appspot.com",
    messagingSenderId: "431950898164",
    appId: "1:431950898164:web:a24eefdd14356551d5cfa1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Creating firestore
export const db = firebase.firestore();
db.settings({timestampsInSnapshots : true})