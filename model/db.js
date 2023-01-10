const mysql = require('mysql');
var db = {
  getConnection : function(){
    var dbConn = mysql.createConnection({
      host: 'sql6.freemysqlhosting.net', // Replace with your host name
      user: 'sql6589548',      // Replace with your database username
      password: 'y33vwq7Jmg', // Replace with your database password
      database: 'sql6589548' // // Replace with your database Name
    });
    return dbConn;
  }
}

module.exports = db;