const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// use the routes for our views
router.use('/',homeRoutes);

// use exported routes in routes/api/index.js
router.use('/api',apiRoutes);

// catch all for non existent routes
router.use((req,res) => {
    res.status(404).end();
});

// export for use in server.js
module.exports = router;