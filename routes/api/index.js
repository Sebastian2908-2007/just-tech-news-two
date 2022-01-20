const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// use the user routes as middleware
// use imported user routes append /users to routes
router.use('/users', userRoutes);
// use imported post route append /posts to routes
router.use('/posts', postRoutes);
// use imported comment routes and append /comments to routes
router.use('/comments',commentRoutes);

// export router for usage in /routes/index.js
module.exports = router;