const router = require('express').Router();

const userRoutes = require('./userRoutes');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;
