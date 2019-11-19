const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
    validateSignupData,
    validateLoginData
  } = require('../util/validators');
  

// Sign users up
exports.signup = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName
      };
  
    const { valid, errors } = validateSignupData(newUser);
  
    if (!valid) return res.status(400).json(errors);

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
      )
    .then(resp => {
      let user = db.collection('users').doc(resp.user.uid);
      return (
          user.set({
              userName: newUser.userName,
              initials: newUser.userName.charAt(0) + newUser.userName.charAt(1)
            })
          )
        })
    .then(() => {
      return res.json({ message: 'SIGNUP_SUCCESS' });
      })
    .catch((err) => {
      return res.json(err)
      });
    };

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
      };
    
    const { valid, errors } = validateLoginData(user);
    
    if (!valid) return res.status(400).json(errors);
    
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.error("SIGNIN_SUCCESS");
        return res.send({message:"sign in SUCCESS"})
        })
      .catch((err) => {
        console.error(err);
        return res
          .status(403)
          .json({ general: 'Wrong credentials, please try again' });
        });
    };

exports.signout = () => {
    firebase.auth().signOut().then(() => {
        return res.json({message:"sign out SUCCESS" })
      });
      
  }