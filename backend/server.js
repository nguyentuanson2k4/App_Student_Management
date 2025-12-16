import express from 'express';
import cors from 'cors';
import initRoutes from './src/routes/index.js';
import connectDB from './src/config/connectDB.js';
require('dotenv').config();                 

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8888;

initRoutes(app);
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});