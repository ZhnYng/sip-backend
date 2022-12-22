const db = require('./db');

const drinksDB = {
    addDrink : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = 
                `INSERT INTO
                    drinks (drinks, user_id, curr_date)
                VALUES
                    (1, ?, CURDATE()) ON DUPLICATE KEY
                UPDATE
                    drinks = drinks + 1;`;
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
            const sqlStmt = "UPDATE drinks SET drinks = drinks - 1 WHERE user_id = ? AND date(last_updated) = CURDATE();";
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
            const sqlStmt = "SELECT SUM(drinks) AS drinks, MONTHNAME(curr_date) AS month FROM drinks WHERE user_id = ? AND curr_date >= CURDATE() - INTERVAL 6 MONTH GROUP BY MONTH(curr_date);";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    getLastDrank : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT MAX(curr_date) AS most_recent_record FROM drinks WHERE user_id = ?;";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    getDaysFromLastDrank : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT DATEDIFF(CURDATE(), MAX(curr_date)) AS days FROM drinks WHERE user_id = ?;";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    }
}

module.exports = drinksDB;