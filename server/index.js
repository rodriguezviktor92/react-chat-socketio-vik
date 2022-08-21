import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { PORT } from './config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = http.createServer(app);
new SocketServer(server);
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(cors());
app.use(morgan('dev'));

const users = [];
const createUser = (userId) => {
  const newUser = {
    id: userId,
    user: 'User' + users.length,
  };
  users.push(newUser);
};

const getUser = (userId) => {
  const user = users.find((user) => user.id === userId);
  console.log(user);
  return user;
};

io.on('connection', (socket) => {
  createUser(socket.id);
  console.log(users);

  socket.on('message', (message) => {
    console.log(message);
    socket.broadcast.emit('message', {
      body: message,
      from: getUser(socket.id),
    });
  });
});

app.use(express.static(join(__dirname, '../client/dist')));
server.listen(PORT);
console.log('Server started on port ', PORT);
