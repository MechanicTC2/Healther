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
  const nutrition = await aiModel.getNutrition("male", "14", "154", "50")
  const diet = await aiModel.getDiet("male", "14", "154", "50")
  console.log(nutrition)
  console.log(diet);
  res.render('index', {title: 'Login to PA3'});
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
  else if (result == "ETIMEDOUT")
    res.render('login', {title: 'Login to PA3', info: 'Please check your connection and try again. If the issue persists, try reconnecting to the internet:'});
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