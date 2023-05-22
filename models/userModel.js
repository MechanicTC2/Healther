var {localSQLConnection} = require('../knexfile');
const knex = require('knex')({
    client: 'mysql',
    connection: localSQLConnection,
  })
//login
async function login(req, res, next, err, results) {
    var email = req.body.email; 
    var password = req.body.password;
    console.log("email: " + email)
    console.log("password: " + password);
    try {
        if (email == undefined || password == undefined) {
            console.log("not enough cred");
            return "not enough cred";
        }
        else {
            var data = await knex('users').where({
                username: email
            }).select('*');
            console.log("email" + data);
            if (email != data[0].username || password != data[0].user_password) {
               console.log("login failed, incorrect pass/email");
               return "incorrect pass/email";
            }
            else {
                console.log("login success");
                return email + ";" + password;
             }
        }
    }
    catch (err) {
        console.log(err.errorno);
        console.log("login failed, user does not exist");
        return err.errorno;
    }
}
//signup
async function signup(req, res, next) {
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;
    var height = req.body.height;
    var weight = req.body.weight;
    var age = req.body.age;
    if (email == undefined || password == undefined) {
        console.log("signup failed, not enough cred");
        return "not enough cred";
    }
    else {
        ///*
        try {
            var data = await knex('users').where({
            username: email
            }).select('*');
            console.log(data)
            if (email == data[0].username) {
                console.log("signup failed, email already exists");
                return "email already exists";
            }
        }
        catch (error) {
        //*/
        const shit = await knex('users').insert({
            username: email,
            user_password: password,
            height: height,
            weight: weight,
            age: age
        });   
        console.log(shit)             
        console.log("signup success");    
        //res.cookie('password', password);
        return "signup success";
        }
    }
}
module.exports = {login, signup};