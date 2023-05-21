var express = require('express');
var router = express.Router();
const { login, signup } = require('../models/userModel');
const { queryTags } = require('../models/aiModel');
const aiModel = require('../models/aiModel');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
router.use(cookieParser());

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', {title: 'Login to Healther'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login to Healther', info: 'Login with existing credentials:'});
});
router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'Signup for Healther', info: 'Signup for Healther, email and password:'});
});
router.post('/authenticateUser', async function(req, res, next) {
  const result = await login(req, res, next);
  console.log(result);
  if (result == "not enough cred")
    res.render('login', {title: 'Login to Healther', info: 'Please fill in all fields. '});
  else if (result == "incorrect pass/email")
    res.render('login', {title: 'Login to Healther', info: 'Incorrect password or email:'});
  else if (result == "user does not exist")
    res.render('login', {title: 'Login to Healther', info: 'Email does not exist. If you do not have an account, please sign up:'});
  else if (result == "ETIMEDOUT")
    res.render('login', {title: 'Login to Healther', info: 'Please check your connection and try again. If the issue persists, try reconnecting to the internet:'});
  else {
    bcrypt.genSalt(1, async function(err, salt) {
      bcrypt.hash(result.substring(result.indexOf(";") + 1), salt, async function(err, hash) {
          res.cookie('password', hash);
          res.redirect('/upload');
      });
    });
  }
});
router.post('/registerUser', async function(req, res, next) {
  const result = await signup(req, res, next);
  if(result === "signup success"){
    res.render('upload', {title: 'upload'});
  }
  else{
    res.render("oops", {title: "This email already exists, please try again."})
  }
});
router.get('/upload', function(req, res, next){
  res.render('upload', {title: 'upload'});
});
router.get('/welcome', function(req, res, next){
  res.render('welcome', {title: 'info', 'info': 'Your dietary info'})
})
router.post('/processImages', async function(req, res, next){
  console.log(await req.body)
  res.render('display.ejs', foods=queryTags(req.body.b64));
})
router.get('/display', function(req, res, next){
  res.render('display', foods=req.foods)
})
module.exports = router;