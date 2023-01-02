var express = require('express');
var router = express.Router();
const rewardsDB = require('../model/rewardsDB');

router.get('/points', (req, res) => {
  rewardsDB.getPoints(req.query.userId, (err, result) =>  {
    if(err){
      console.log(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.length === 0){
      res.status(204).send();
    }else{
      res.status(200).send(result);
    }
  })
})

router.get('/vouchers', (req, res) => {
  rewardsDB.getVouchers(req.query.userId, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.length === 0){
      res.status(204).send();
    }else{
      res.status(200).send(result);
    }
  })
})

router.post('/addVoucher', (req, res) => {
  rewardsDB.addVoucher(req.body, (err, result) => {
    if(err?.sqlMessage === "Check constraint 'rewards' is violated."){
      res.status(400).send({"error msg" : "insufficient points"});
    }else if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else{
      res.status(200).send(result)
    }
  })
})

router.post("/addPoints", (req, res) => {
  rewardsDB.addPoints(req.body, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(200).send(result)
    }
  })
})

module.exports = router;