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
  res.render('login', {title: 'Welcome to Healther', info: 'Login with existing credentials:'});
});

router.get("/getAttributes", async function(req, res, next){
  res.render('getAttributes', {title: 'Just a short survey', info: 'Please fill in these fields so we can create your personal dietary plan!'})
})

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'Signup for Healther', info: 'Signup for Healther, email and password:'});
});
router.post('/authenticateUser', async function(req, res, next) {
  const result = await login(req, res, next);
  console.log(result);
  if (result == "not enough cred")
    res.render('login', {title: 'Login to Healther', info: 'Please fill in all fields. '});
  else if (result == "incorrect pass/email")
    res.render('login', {title: 'It looks like we experienced a problem', info: 'Incorrect password or email:'});
  else if (result == "user does not exist")
    res.render('login', {title: 'It looks like we experienced a problem', info: 'Email does not exist. If you do not have an account, please sign up:'});
  else if (result == "ETIMEDOUT")
    res.render('login', {title: 'It looks like we experienced a problem', info: 'Please check your connection and try again. If the issue persists, try reconnecting to the internet:'});
  else {
    bcrypt.genSalt(1, async function(err, salt) {
      bcrypt.hash(result.substring(result.indexOf(";") + 1), salt, async function(err, hash) {
          res.cookie('password', hash);
          res.redirect('/home');
      });
    });
  }
});
router.post('/registerUser', async function(req, res, next) {
  const result = await signup(req, res, next);
  if(result === "signup success"){
    res.render('home');
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
  console.log(req.body.photo)
  res.render('display.ejs', foods=queryTags(req.body.photo));
})
router.get('/display', function(req, res, next){
  var height = req.body.height;
    var weight = req.body.weight;
    var age = req.body.age;
  const nutrition = aiModel.getNutrition(age, height, weight);
  const diet = aiModel.getDiet(age, height, weight)
  res.render('display', {nutrition:nutrition, diet:diet})
})
module.exports = router;