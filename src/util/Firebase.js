const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
    constructor() {

        this._config = {
            "Your config"
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
