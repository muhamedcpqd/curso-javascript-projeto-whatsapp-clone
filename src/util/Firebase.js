const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
    constructor() {

        this._config = {
            authDomain: "whatsapp-df51c.firebaseapp.com",
            databaseURL: "https://whatsapp-df51c.firebaseio.com",
            projectId: "whatsapp-df51c",
            storageBucket: "gs://whatsapp-df51c.appspot.com",
            messagingSenderId: "265446347283"
        }
        this.init();
    }

    init() {

        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            })

            window._initializedFirebase = true;   
        }

    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {

        let provider = new firebase.auth.GoogleAuthProvider();
        
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                resolve({user, token});

            }).catch();
        })
    }
}
