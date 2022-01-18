const router = require('express').Router();
const userRoutes = require('./user-routes');

// use the user routes as middleware
router.use('/users', userRoutes);

module.exports = router;