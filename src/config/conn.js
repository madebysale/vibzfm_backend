const mysql = require("mysql2");




const db_connection = mysql
  .createConnection({
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database: "vidzfm", // DATABASE NAME
    password: "arun@123", // DATABASE PASSWORD
    // 'options': {ATTR_EMULATE_PREPARES : true}
  
    
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;
