var express = require('express');
var router = express.Router();
const userDB = require('../model/usersDB');

router.post('/submit', (req, res) => {
  userDB.insertUser(req.body, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({"error_msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(400).send({"error_msg" : "missing values"});
    }else{
      res.status(201).send({"success_msg" : "user added successfully"});
    }
  })
});

module.exports = router;