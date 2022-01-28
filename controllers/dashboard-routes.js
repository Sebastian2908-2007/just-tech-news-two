const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post,User,Comment,Vote} = require('../models');

router.get('/dashboard', (req,res) => {
    res.render('dashboard');
});

module.exports = router;