var express = require('express');
var router = express.Router();
const { login, signup } = require('../models/userModel');
const aiModel = require('../models/aiModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  aiModel.getDriMicro("male", "14", "5 feet 6 inches", "108");
  aiModel.getDiet("male", "14", "5 feet 6 inches", "108");
  res.render('index', { title: 'PA3' });  
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login to PA3', info: 'Login with existing credentials:'});
});
router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'Signup for PA3', info: 'Signup to PA3, email and password:'});
});
router.post('/authenticateUser', async function(req, res, next) {
  const result = await login(req, res, next);
  console.log(result);
  if (result == "not enough cred")
    res.render('login', {title: 'Login to PA3', info: 'Please fill in all fields:'});
  else if (result == "incorrect pass/email")
    res.render('login', {title: 'Login to PA3', info: 'Incorrect password or email:'});
  else if (result == "user does not exist")
    res.render('login', {title: 'Login to PA3', info: 'Email does not exist. If you do not have an account, please sign up:'});
});
router.post('/registerUser', async function(req, res, next) {
  const result = await signup(req, res, next);
  console.log(result);
});
module.exports = router;
