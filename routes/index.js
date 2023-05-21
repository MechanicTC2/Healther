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
router.post('/authenticateUser', async function(req, res, next) {
  const result = await login(req, res, next);
  console.log(result);
  if (result == "not enough cred")
    res.render('login', {title: 'Login to PA3', info: 'Please fill in all fields:'});
  else if (result == "incorrect pass/email")
    res.render('login', {title: 'Login to PA3', info: 'Incorrect password or email:'});
  else if (result == "user does not exist")
    res.render('login', {title: 'Login to PA3', info: 'Email does not exist. If you do not have an account, please sign up:'});
  else {
    bcrypt.genSalt(1, async function(err, salt) {
      bcrypt.hash(result.substring(result.indexOf(";") + 1), salt, async function(err, hash) {
          console.log(result.substring(result.indexOf(";") + 1))
          res.cookie('password', hash);
          res.redirect('/upload');
      });
    });
  }
});
router.post('/registerUser', async function(req, res, next) {
  const result = await signup(req, res, next);
  console.log(result);
});
router.get('/upload', function(req, res, next){
  res.render('upload', {title: 'upload'});
});
router.get('/welcome', function(req, res, next){
  res.render('welcome', {title: 'info', 'info': 'Your dietary info'})
})
router.post('/processImages', async function(req, res, next){
  res.render('display.ejs', foods=queryTags(req.body.photo));
})
router.get('/display', function(req, res, next){
  res.render('display', foods=req.foods)
})
module.exports = router;
