var express = require('express');
var router = express.Router();
const drinksDB = require('../model/drinksDB');
const goalDB = require('../model/goalDB');

router.get('/', (req, res) => {
  let output = {}
  goalDB.getGoal(req.query.userId, (err, result) =>  {
    if(err){
      console.log(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.length === 0){
      res.status(204).send();
    }else{
      output['goal'] = result;
      drinksDB.getDrinks(req.params.userId, (err, result) => {
        if(err){
          console.log(err);
          res.status(500).send({"error msg" : "internal server error"});
        }else if(result.length === 0){
          res.status(204).send();
        }else{
          output['drinks'] = result;
          res.status(200).send(output);
        }
      })
    }
  })
})

router.put('/updateGoal/:userId', (req, res) => {
  goalDB.updateGoal(req.params.userId, req.body.goal, (err, result) => {
    if(err?.code === "ER_BAD_NULL_ERROR"){
      res.status(400).send({"error msg" : "goal cannot be null"});
    }else if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(201).send({"success msg" : "goal updated successfully"});
    }
  })
})

router.put('/updateAdd/:userId', (req, res) => {
  drinksDB.addDrink(req.params.userId, (err, result) => {
    if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(200).send({"success msg" : "one drink added"});
    }
  })
})

router.put('/updateRemove/:userId', (req, res) => {
  drinksDB.removeDrink(req.params.userId, (err, result) => {
    if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(200).send({"success msg" : "one drink removed"});
    }
  })
})

module.exports = router;