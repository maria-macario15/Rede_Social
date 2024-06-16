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