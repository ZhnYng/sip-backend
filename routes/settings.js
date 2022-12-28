var express = require('express');
var router = express.Router();
const goalDB = require('../model/goalDB');
const userDB = require('../model/usersDB');

router.put('/updateGoal', (req, res) => {
  goalDB.updateGoal(req.query.userId, req.body.goal, (err, result) => {
    if(err?.code === "ER_BAD_NULL_ERROR"){
      res.status(400).send({"error msg" : "goal cannot be null"});
    }else if(err){
      console.error(err);
      res.status(500).send({"error msg" : "internal server error"});
    }else if(result.affectedRows === 0){
      res.status(204).send();
    }else{
      res.status(200).send({"success msg" : "goal updated successfully"});
    }
  })
})

router.put('/updateReminderStatus', (req, res) => {
    userDB.updateReminderStatus(req.query.userId, req.body.reminder, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(200).send({"success msg" : "reminder updated successfully"});
        }
    })
})

router.get('/getReminderStatus', (req, res) => {
    userDB.getReminderStatus(req.query.userId, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({"error msg" : "internal server error"});
        }else{
            res.status(200).send(result);
        }
    })
})

module.exports = router;