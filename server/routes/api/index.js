const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');


// api routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);


module.exports = router; 