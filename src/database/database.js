const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('books.db');

db.run(
  `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    img VARCHAR(255),
    summary TEXT
);`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Users table created successfully.');
    }
  }
);

module.exports = db;
