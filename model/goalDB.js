var db = require('./db');

const goalDB = {
    updateGoal : function(userId, goal, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "UPDATE goal SET goal = ? WHERE user_id = ?;";
            dbConn.query(sqlStmt, [goal, userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    getGoal : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT goal FROM goal WHERE user_id = ?;";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    }
}

module.exports = goalDB;