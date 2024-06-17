<<<<<<< HEAD
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
=======
const app = require('express')(); // Cria uma instância do Express
const server = require('http').createServer(app); // Cria um servidor HTTP usando o Express
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } }); // Cria uma instância do Socket.IO associada ao servidor HTTP

const PORT = 3001; // Porta em que o servidor WebSocket vai escutar

// Evento de conexão com Socket.IO
io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id); // Quando um usuário se conecta, exibe seu ID de socket

  // Evento de desconexão
  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id); // Quando um usuário se desconecta, exibe seu ID de socket
  });

  // Evento para definir o nome de usuário
  socket.on('set_username', username => {
    socket.data.username = username; // Define o nome de usuário associado ao socket
  });

  // Evento para enviar mensagem
  socket.on('message', text => {
    // Emite a mensagem recebida para todos os clientes conectados
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    });
  });
});

// Inicia o servidor WebSocket na porta especificada
server.listen(PORT, () => console.log('Server running...'));
>>>>>>> 52d1a49dc8f5110cfaf6df17dfd206d4d12b1b6c
