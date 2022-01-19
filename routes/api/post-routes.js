const router = require('express').Router();
const e = require('express');
const {Post,User} = require('../../models');

// get all posts
router.get('/',(req,res) => {
    console.log('===================');
    Post.findAll({
        // Query config
        attributes: ['id','post_url','title','created_at'],
        // order post from newest to oldest
        order:[['created_at','DESC']],
        // join to user table
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get a post by the id
router.get('/:id',(req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:['id','post_url','title','created_at'],
        // includes user info 'username' from the user model whatever user_id was used in post will be the user whos name appears
        include: [
            {
                model: User,
                attributes:['username']
            }
        ]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with thid id'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a post
router.post('/',(req,res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        postUrl: req.body.postUrl,
        user_id: req.body.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
      res.status(500).json(err);
    })
});

// update a posts title
router.put('/:id',(req,res) => {
    Post.update(
       {
        title: req.body.title
       },
       { 
        where: {
            id: req.params.id
        }
    }
    ).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message:'no post with found that id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id',(req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;