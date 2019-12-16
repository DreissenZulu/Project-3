// Set up MySQL connection.
const mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  /* Alex */
  // connection = mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   port: 3306,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: "jobAppDB"
  // });

  /* Steven */
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // user: "root",
    // password: "steven123",

    // user: "root",
    // password: "testtest",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,

    database: "InFactDB"
  });
}

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
