const admin = require('firebase-admin');
var serviceAccount = require("../game-holic-590ee-firebase-adminsdk-qrr3e-4f51285f87.json");


admin.initializeApp({
    databaseURL: "https://game-holic-590ee.firebaseio.com",
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };