var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'remotemysql.com', // Replace with your host name
  user: 'UZKSgJUOhh',      // Replace with your database username
  password: '5BAoIVDdi5',      // Replace with your database password
  database: 'UZKSgJUOhh' // // Replace with your database Name
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

setInterval(() => {
  conn.query('SELECT "KEEP ALIVE"', function(err, result){
    if (err) throw err;
    console.log("Keeping alive")
  })
}, 90000);

module.exports = conn;