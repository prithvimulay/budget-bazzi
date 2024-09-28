// src/routes/transactionRoutes.js

import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';

const router = express.Router();

// Define routes
router.post('/create', createTransaction);
router.get('/get', getTransactions);

export default router;