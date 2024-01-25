const router = require('express').Router();
const UserController = require('../controllers/UserControllers')
const AuthMiddleware = require('../utilities/AuthMiddleware')

// Create new user
router.post('/signup',
    (req, res) => UserController.createNewUser(req, res));

// Login user
router.post('/login',
    // (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => UserController.loginUser(req, res));

module.exports = router