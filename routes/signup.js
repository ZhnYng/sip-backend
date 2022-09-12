var express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();
var flash = require('express-flash');
var session = require('express-session');
var db = require('../database/database');

router.use(session({ 
  secret: 'signup!@#Sessefi2398',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

router.use(flash());

// Functions for validation
function nameIsValid(name){
  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm // Usernames can contain characters a-z, 0-9, underscores and periods. The username cannot start with a period nor end with a period. It must also not have more than one period sequentially. Max length is 30 chars.)
  if(!usernameRegex.test(name)){ // Test if input passes regex pattern
    return false;
  }else{
    return true;
  }
}

function passwordIsMatch(password, confirmPassword){
  if(password != confirmPassword){
    return false;
  }else{
    return true;
  }
}

function passwordIsValid(password){
  if(password.length > 100){
    return false;
  }else{
    return true;
  }
}

// Object for all validations
var validation = {
  nameDoesntExists : false,
  nameValid : false,
  passwordMatches : false,
  passwordValid : false
}

router.post('/submit', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  var sql = `SELECT username FROM accounts`;
  db.query(sql, async function(err, result) {
    if (err) throw err;
    req.flash('success', 'Data retrieved successfully!');
    var exists = false;
    for(const row of result){
      const existingUsername = row.username;
      if(existingUsername === username){
        exists = true;
        break;
      }
    }
    
    // Validation
    validation.nameDoesntExists = !exists;
    validation.nameValid = nameIsValid(username);
    validation.passwordMatches = passwordIsMatch(password, confirmPassword);
    validation.passwordValid = passwordIsValid(password);

    // Insert account info
    const areTrue = Object.values(validation).every(
      value => value === true
    );
    if(areTrue){
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      var sql = `INSERT INTO accounts (username, password) VALUES ("${username}", "${password}")`;
      db.query(sql, function(err, result) {
        if (err) throw err;
        res.send("Successful");
      });
    }else{
      res.send(validation);
    }
  });
});

module.exports = router;