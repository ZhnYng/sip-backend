const db = require('./db');
const bcrypt = require("bcrypt");

const userDB = {
    insertUser : function(userDetails, callback){
        var dbConn = db.getConnection();
        dbConn.connect(async(err, result) => {
            if(err) return callback(err, null);
            const {username, password} = userDetails;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const sqlStmt = "INSERT INTO users (username, password) VALUES (?, ?);";
            dbConn.query(sqlStmt, [username, hashedPassword], (err, result) => {
                if(err) return callback(err, null);
                const sqlStmt = "INSERT INTO goal (goal, user_id) VALUES (0, (SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1));";
                dbConn.query(sqlStmt, [], (err, result) => {
                    if(err) return callback(err, null);
                    const sqlStmt = "INSERT INTO drinks (drinks, user_id) VALUES (0, (SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1));";
                    dbConn.query(sqlStmt, [], (err, result) => {
                        dbConn.end();
                        if(err) return callback(err, null);
                        return callback(null, result);
                    })
                })
            })
        })
    },

    validateUser : function(userDetails, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT user_id, password FROM users WHERE username = ?;";
            dbConn.query(sqlStmt, [userDetails.username], async(err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                const validPassword = await bcrypt.compare(userDetails.password, result[0].password);
                if(validPassword){
                    return callback(null, {"userId" : result[0].user_id});
                }else{
                    return callback(null, "password invalid");
                }
            })
        })
    },

    getUsernameById : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT username FROM users WHERE user_id = ?;";
            dbConn.query(sqlStmt, [userId], async(err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    }
}

module.exports = userDB;