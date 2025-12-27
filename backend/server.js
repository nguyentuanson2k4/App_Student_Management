import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import initRoutes from './src/routes/index.js';
import connectDB from './src/config/connectDB.js'; 
import cookieParser from 'cookie-parser';               

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8888;

initRoutes(app);
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});