const { db } = require('../util/admin');

exports.addComments = (req,res)=>{
    let commentList = req.body.commentList;
    db
    .collection("commentList")
    .doc(req.body.gameID)
    .set({
      ...JSON.parse(JSON.stringify(commentList))
    })
    .then(() => {
      return res.json({ message: "ADD_COMMENTS_SUCCESS "});
    })
    .catch(err => {
      return res.json({ message: types.ADD_COMMENTS_ERROR }, err);
    });
}

exports.getComments = (req,res) =>{
    let commentList;
    db
    .collection("commentList")
    .doc(req.body.gameID)
    .get()
    .then(comments => {
      if (comments._document === null) {
        commentList = [];
      } else {
        commentList = Object.values(comments.data());
      }
      return res.json({ message: "GET_COMMENTS_SUCCESS"}, commentList );
    })
    .catch(err => {
        return res.json({ message: "GET_COMMENTS_ERROR "}, err);
    });
}