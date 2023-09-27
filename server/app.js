import dotenv from 'dotenv';
import connectDB from './config/db.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


dotenv.config();
connectDB();
const app = express();


//  PARSING
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready')
});

//  ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

//  PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
