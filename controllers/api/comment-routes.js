const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/',(req,res) => {
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
});

// create a comment
router.post('/',withAuth,(req,res) => {
    if(req.session) { 
  Comment.create({
      comment_text: req.body.comment_text,
      // use session id for getting user id
      user_id: req.session.user_id,
      post_id: req.body.post_id 
    })
    .then(dbCommentData => {res.json(dbCommentData)})
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
   }
});

// delete a comment
router.delete('/:id',withAuth,(req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if(!dbCommentData) {
            res.status(400).json({message:'no comment found with that id'});
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports= router;