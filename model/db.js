const mysql = require('mysql');
var db = {
  getConnection : function(){
    var dbConn = mysql.createConnection({
      host: 'localhost', // Replace with your host name
      user: 'sip_root',      // Replace with your database username
      password: 'SipRootUser@2000',      // Replace with your database password
      database: 'sip_db' // // Replace with your database Name
    });
    return dbConn;
  }
}

module.exports = db;