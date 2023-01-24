require('dotenv').config();
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { usersRoutes } from './routes/user';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(cors());

app.use('/', authRoutes);
app.use('/main', usersRoutes);

mongoose.set('strictQuery', false);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    server.listen(process.env.PORT || 4000, function () {
      console.log('connected to DB');
    });
  } catch (error) {
    console.log(error);
  }
})();
