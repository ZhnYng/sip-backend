var express = require('express');
var router = express.Router();
var flash = require('express-flash');
var session = require('express-session');
var db = require('../database/database');

router.use(session({ 
  secret: 'homeGoalUpdate2032*^@&@3',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

router.use(flash());

router.post('/', (req, res) => {

  const user = req.body.user;

  var sql = `SELECT * FROM ${user}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });

})

router.post('/updateGoal', (req, res) => {

  const user = req.body.user;
  const goal = req.body.goal;
  
  var sql = `INSERT INTO ${user} (goal, date) VALUES (${goal}, CURDATE());`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('works')
    res.send("Successful");
  });

})

router.post('/update', (req, res) => {

  const user = req.body.user;
  const drankToday = req.body.drankToday;
  
  var sql = `INSERT INTO ${user} (drank_today, date) VALUES (${drankToday}, CURDATE());`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('works')
    res.send("Successful");
  });

})

module.exports = router;