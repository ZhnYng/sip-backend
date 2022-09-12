var express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();
var flash = require('express-flash');
var session = require('express-session');
var db = require('../database/database');

router.use(session({ 
  secret: 'login!@#Sessefi2398',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

router.use(flash());

router.post('/submit', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  
  var sql = `SELECT password FROM accounts WHERE username = "${username}"`;
  db.query(sql, async function(err, result) {
    if (err) throw err;
    req.flash('success', 'Data retrieved successfully!');
    const validPassword = await bcrypt.compare(password, result[0].password);
    if(validPassword){
      res.send("Successful");
    }else{
      res.send("Unsuccessful");
    }
  });
})

module.exports = router;