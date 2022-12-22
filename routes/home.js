var express = require('express');
var router = express.Router();
const drinksDB = require('../model/drinksDB');
const goalDB = require('../model/goalDB');
const userDB = require('../model/usersDB');

router.get('/goal', (req, res) => {
  goalDB.getGoal(req.query.userId, (err, result) =>  {
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

router.get('/drinks', (req, res) => {
  drinksDB.getDrinks(req.query.userId, (err, result) =>  {
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

router.get('/username', (req, res) => {
  userDB.getUsernameById(req.query.userId, (err, result) =>  {
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

router.get('/lastDrank', (req, res) => {
  drinksDB.getLastDrank(req.query.userId, (err, result) =>  {
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

router.get('/daysFromlastDrank', (req, res) => {
  drinksDB.getDaysFromLastDrank(req.query.userId, (err, result) =>  {
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

router.put('/updateGoal', (req, res) => {
  goalDB.updateGoal(req.query.userId, req.body.goal, (err, result) => {
    if(err?.code === "ER_BAD_NULL_ERROR"){
      res.status(400).send({"error msg" : "goal cannot be null"});
    }else if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      console.log(req.body)
      res.status(204).send();
    }else{
      res.status(201).send({"success msg" : "goal updated successfully"});
    }
  })
})

router.put('/addDrink', (req, res) => {
  drinksDB.addDrink(req.query.userId, (err, result) => {
    if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(201).send({"success msg" : "one drink added"});
    }
  })
})

router.put('/removeDrink', (req, res) => {
  drinksDB.removeDrink(req.query.userId, (err, result) => {
    if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(201).send({"success msg" : "one drink removed"});
    }
  })
})

module.exports = router;