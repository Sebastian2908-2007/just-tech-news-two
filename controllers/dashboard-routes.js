const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post,User,Comment} = require('../models');
// withAuth is acustom middleware function that checks for a session.user_id if there is not one you will be redirected to the login page 
const withAuth = require('../utils/auth');

// renders the dashboard with post data
router.get('/', withAuth, (req,res) => {
   Post.findAll({
       where: {
           // use the ID from the session
           user_id: req.session.user_id
       },
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
       // serialize posts data before passing to the template
       const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn});  
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

router.get('/edit/:id',withAuth,(req,res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes:[
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
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
                attributes:['username']
            }
        ]
    }).then(dbPostData => {
        const post = dbPostData.get({plain:true})
        res.render('edit-post',{post, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;