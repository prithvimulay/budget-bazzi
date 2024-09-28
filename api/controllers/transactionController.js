// src/controllers/transactionController.js

import Transaction from '../models/Transaction.js';


export const createTransaction = async (req, res) => {
    try {
        const { name, description, datetime, price } = req.body;
        const transaction = await Transaction.create({ name, description, datetime, price });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};