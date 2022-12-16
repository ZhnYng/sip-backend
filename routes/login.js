var express = require('express');
var router = express.Router();
var userDB = require('../model/usersDB');

router.post('/submit', (req, res) => {
  userDB.validateUser(req.body, (err, result) => {
    if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result == "password invalid"){
      res.status(200).send({"success msg" : result})
    }else{
      res.status(200).send(result)
    }
  })
})

module.exports = router;