const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

// this route renders the homepage with all of the posts
router.get('/',(req,res) => {
   Post.findAll({
       attributes: [
           'id',
           'post_url',
           'title',
           'created_at',
           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
       ],
       include: [
           {
               model: Comment,
               attributes:['id', 'comment_text', 'post_id','user_id','created_at'],
               include: {
                   model: User,
                   attributes:['username']
               }
           },
           {
               model: User,
               attributes: ['username']
           }
       ]
   })
   .then(dbPostData => {
       // post.get({ plain: true })) makes is so we only get the data we want instead of including a bunch of not needed data
       const posts = dbPostData.map(post => post.get({ plain: true }));
       res.render('homepage',{
           posts,
           loggedIn: req.session.loggedIn
        }); 
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

// this route renders the login/signup page
router.get('/login',(req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// this route renders single post page and recieves post data
router.get('/post/:id',(req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','post_url','title','created_at',[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
    ],
    include: [
        {
            model: Comment,
            attributes:['id','comment_text','post_id','user_id','created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
  }).then(dbPostData => {
      if(!dbPostData) {
          res.status(404).json({message: 'No post found with this id'});
          return;
      }
     const post = dbPostData.get({plain:true});
      res.render('single-post',{
          post,
          // pass in logged in variable from session so we can use it to conditionally render form based on user status
          loggedIn: req.session.loggedIn
        });
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports= router;