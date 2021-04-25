const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    concept: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    operation: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);