const db = require('./db');

const drinksDB = {
    addDrink : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "UPDATE drinks SET drinks = drinks + 1 WHERE user_id = ?;";
            dbConn.query(sqlStmt, [parseInt(userId)], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    removeDrink : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "UPDATE drinks SET drinks = drinks - 1 WHERE user_id = ?;";
            dbConn.query(sqlStmt, [parseInt(userId)], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    getDrinks : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT drinks FROM drinks WHERE user_id = ?;";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    }
}

module.exports = drinksDB;