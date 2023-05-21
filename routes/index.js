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
    res.redirect('/home');
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
  
  res.render('displayFood', {foods: await aiModel.queryTags(req.body.b64)});
})
router.get("/home", function(req, res, next){
  res.render("home")
})
router.post('/display', async function(req, res, next){
  var height = req.body.height;
  var weight = req.body.weight;
  var age = req.body.age;
  const nutrition = await aiModel.getNutrition(age, height, weight);
  const diet = await aiModel.getDiet(age, height, weight)

  const nsplit = nutrition.split(",")
  const dsplit = diet.split(",")

  const a = nsplit[0].substring(nsplit[0].indexOf("C"));
  const b = nsplit[1]
  const c = nsplit[2]
  const d = nsplit[3]
  const e = nsplit[4]
  const f = nsplit[5]
  const g = nsplit[6]
  const h = nsplit[7]
  const i = nsplit[8]
  const j = nsplit[9]
  const k = nsplit[10]
  const l = nsplit[11]

  const m = dsplit[3].substring(dsplit[3].indexOf('"'));
  const n = dsplit[4].substring(dsplit[4].indexOf('"'));
  const o = dsplit[5].substring(dsplit[5].indexOf('"'), dsplit[5].indexOf("}"));

  res.render('display', {a:a,b:b,c:c,d:d,e:e,f:f,g:g,h:h,i:i,j:j,k:k,l:l,m:m,n:n,o:o});
})
module.exports = router;