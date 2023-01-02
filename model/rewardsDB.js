var db = require('./db');

const rewardsDB = {
    getPoints : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT points FROM rewards, points WHERE rewards.user_id = points.user_id AND rewards.user_id = ? ORDER BY rewards_id DESC LIMIT 1;";
            dbConn.query(sqlStmt, [parseInt(userId)], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    addPoints : function(pointsDetails, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const {userId, points} = pointsDetails;
            const sqlStmt = "INSERT INTO points (points, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE points = ?;";
            dbConn.query(sqlStmt, [points, userId, points], (err, result) => {
                if(err) return callback(err, null);
                const sqlStmt = "INSERT INTO rewards (points_id, user_id) VALUES ((SELECT points_id FROM points WHERE user_id = ?), ?);";
                dbConn.query(sqlStmt, [userId, userId], (err, result) => {
                    dbConn.end();
                    if(err) return callback(err, null);
                    return callback(null, result);
                })
            })
        })
    },

    getVouchers : function(userId, callback){
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "SELECT brand, amount FROM vouchers, rewards WHERE rewards.voucher_id = vouchers.voucher_id AND rewards.user_id = ?;";
            dbConn.query(sqlStmt, [userId], (err, result) => {
                dbConn.end();
                if(err) return callback(err, null);
                return callback(null, result);
            })
        })
    },

    addVoucher : function(voucherDetails, callback){
        const {points, voucherId, userId} = voucherDetails;
        var dbConn = db.getConnection();
        dbConn.connect((err, result) => {
            if(err) return callback(err, null);
            const sqlStmt = "INSERT INTO points (points, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE points = ?;";
            dbConn.query(sqlStmt, [points, userId, points], (err, result) => {
                if(err) return callback(err, null);
                const sqlStmt = "INSERT INTO rewards (points_id, voucher_id, user_id) VALUES ((SELECT points_id FROM points WHERE user_id = ?), ?, ?);";
                dbConn.query(sqlStmt, [userId, voucherId, userId], (err, result) => {
                    dbConn.end();
                    if(err) return callback(err, null);
                    return callback(null, result);
                })
            })
        })
    }
}

module.exports = rewardsDB;