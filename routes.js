const router = require('express').Router();
const UserRoutes = require('./routes/UserRoutes')

router.use('/users', UserRoutes);

module.exports = router;