const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();
const {signup, login, signout } = require('./handlers/users');
const {getGameList, getPlayStatus, addItemToList} = require("./handlers/gameList")
const {addComments, getComments} = require("./handlers/comments")

app.use(cors());

app.post('/signup', signup);
app.post('/login', login);
app.post('/signout', signout)

app.get('/getGameList', getGameList);
app.get('/getPlayStatus', getPlayStatus);
app.post('/addItemToList', addItemToList);

app.post('/addComments', addComments)
app.get('/getComments', getComments);


exports.api = functions.region('europe-west1').https.onRequest(app);


