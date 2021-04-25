const Transaction = require('../models/Transaction');

exports.newTransaction = async (req, res) => {

    try {

        const transaction = new Transaction(req.body);

        transaction.creator = req.user.id;

        transaction.save();

        res.json(transaction);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find({ creator: req.user.id }).sort({ date: -1 });

        res.json({transactions})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateTransaction = async (req, res) => {
    
        const { concept, amount, operation } = req.body;
        
        const newTransaction = {};

        if(concept) { newTransaction.concept = concept; }

        if(amount) { newTransaction.amount = amount; }

        if(operation) { newTransaction.operation = operation; }

    try {

        let transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({ msg: 'No existen transacciones'});
        }

        if(transaction.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado'});
        }

        transaction = await Transaction.findByIdAndUpdate({ _id: req.params.id}, { $set: newTransaction }, { new: true });

        res.json({transaction});


    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar')
    }
}

exports.deleteTransaction = async (req, res) => {
    
    try {
        let transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({ msg: 'No existen transacciones'});
        }

        if(transaction.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado'});
        }

        await Transaction.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Eliminado satisfactoriamente' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar');
    }
}