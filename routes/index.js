var express = require('express');
var router = express.Router();
const { login, signup } = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PA3' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login to PA3', info: 'Login with existing credentials:'});
});
router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'Signup for PA3', info: 'Signup to PA3, email and password:'});
});
router.post('/authenticateUser', function(req, res, next) {
  login(req, res, next);
});
router.post('/registerUser', function(req, res, next) {
  signup(req, res, next);
});
module.exports = router;
