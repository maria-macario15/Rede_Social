const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chat_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM messages';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.post('/messages', (req, res) => {
  const { user, message } = req.body;
  const sql = 'INSERT INTO messages ( message) VALUES (?, ?)';
  db.query(sql, [user, message], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id: results.insertId, message });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
