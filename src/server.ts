require('dotenv').config();
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { usersRoutes } from './routes/user';
import { Socket, Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`User conntected: ${socket.id}`);

  socket.on('send_message', (data) => {
    socket.broadcast.emit('recieve_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

app.use('/', authRoutes);
app.use('/main', usersRoutes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI as string);

server.listen(process.env.PORT || 4000, function () {
  console.log('connected to DB');
});
