import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js'; // Updated import for routes

dotenv.config();
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use transaction routes
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://money:k7hcmVr2ZY6uhuOf@cluster0.y2tqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { maxPoolSize: 10 });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Connection Error: ', error.message);
    }
};

connectToDatabase(); // Call the function to connect to the database

// Test route
app.get('/', (req, res) => {
    return res.send('Backend server up and running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
