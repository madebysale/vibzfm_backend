const mysql = require("mysql2");

// Create a pool with additional configuration options
const db_pool = mysql.createPool({
  connectionLimit: 5, // Maximum number of connections in the pool
  host: "localhost",
  user: "root",
  database: "vidzfm",
  password: "arun@123",
  
  // Additional pool configuration options
  waitForConnections: true, // Whether the pool should wait for a connection to be released when the limit is reached
  queueLimit: 0, // Maximum number of queued connection requests when all connections are in use (0 means no limit)

  // Pool-specific configuration options
  acquireTimeout: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released
  waitForConnections: true, // Whether the pool should wait for a connection to be released when the limit is reached
  connectionLimit: 5, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of queued connection requests when all connections are in use (0 means no limit)
});

// The `promise()` method allows using async/await with the pool
const db_connection = db_pool.promise();

// Handle errors on the pool instead of individual connections
db_pool.on("error", (err) => {
  console.log("Database pool error", err);
});

module.exports = db_connection;
