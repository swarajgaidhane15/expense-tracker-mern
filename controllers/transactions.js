const mongoose = require('mongoose');

const Balance = require('../models/Balance');

// @desc Get all transactions
// @route GET /
// @access Public
exports.getTransactions = async(req, res, next) => {
    try {
        const transactions = await Balance.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.send(500).json({
            success: false,
            error: 'Server error'
        })
    }
};

// @desc Post all transactions
// @route POST /
// @access Public
exports.addTransaction = async(req, res, next) => {
    try {
        const { text, amount } = req.body;

        const newTransaction = await Balance.create(req.body);

        return res.status(201).json({
            success: true,
            data: newTransaction
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                err: messages
            })
        } else {
            return res.send(500).json({
                success: false,
                error: 'Server error'
            })
        }
    }
}

// @desc Delete transaction
// @route DELETE /:id
// @access Public
exports.deleteTransaction = async(req, res, next) => {
    try {
        const transaction = await Balance.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.send(500).json({
            success: false,
            error: 'Server error'
        })
    }
}