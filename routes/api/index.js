const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// use the user routes as middleware
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;