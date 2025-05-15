const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

function connectWithRetry() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306')
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
      return;
    }
    console.log('Connected to MySQL database');
    console.log('Connected to host:', process.env.DB_HOST);
  });

  db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectWithRetry();
    } else {
      throw err;
    }
  });

  return db;
}

const db = connectWithRetry();
module.exports = db;