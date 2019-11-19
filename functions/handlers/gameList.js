const { db } = require('../util/admin');

exports.addItemToList = (req,res) => {
    let uid = req.body.uid;
    let gameId = req.body.gameID;
    let playStatus = req.body.playStatus;
    db
    .collection("users")
    .doc(uid)
    .collection("games")
    .doc(gameId)
    .set({
      ...req.body
    })
    .then(() => {
      return res.json({ message: "ADD_LIST_SUCCESS"}, uid, playStatus );
    })
    .catch(err => {
      return res.json({ message: "ADD_LIST_ERROR" }, err);
    });
}

exports.getPlayStatus = (req,res) => {
    var playStatus = null;
    if (req.body.uid === null) {
      playStatus = {
        playStatus: "Set Status",
        rate: 0
      };
      return res.json({ message: "GET_PLAYSTATUS_SUCCESS", playStatus });
    } else {
      db
        .collection("users")
        .doc(req.body.uid)
        .collection("games")
        .where("gameID", "==", req.body.gameID)
        .get()
        .then(games => {
          if (games.size === 0) {
            playStatus = {
              playStatus: "Set Status",
              rate: 0
            };
            return res.json({ message: "GET_PLAYSTATUS_SUCCESS", playStatus });
          } else {
            games.forEach(game => {
              playStatus = game.data();
              return res.json({ message: "GET_PLAYSTATUS_SUCCESS", playStatus });
            });
          }
        })
        .catch(err => {
            return res.json({message:"GET_PLAYSTATUS_ERROR", err})
        });
    }
}

exports.getGameList = (req,res) => {
    var gameList = [];
    db
      .collection("users")
      .doc(req.body.uid)
      .collection("games")
      .where("playStatus", "==", req.body.listType)
      .get()
      .then(games => {
        if (games.size === 0) {
          gameList = {};
          return res.json({ message: "GET_" + req.body.listType + "_SUCCESS", gameList });
        } else {
          games.forEach(game => {
            gameList.push(game.data());
          });
          return res.json({ message: "GET_" + req.body.listType + "_SUCCESS", gameList });
        }
      })
      .catch(err => {
        return res.json({ message: "GET_PLAYSTATUS_ERROR" }, err);
      });
}