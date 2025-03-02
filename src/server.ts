import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import logRequestResponse from './middlewares/loggerMiddleware';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());
app.use(logRequestResponse);

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});