const Transaction = require('../models/Transaction');
const Student = require('../models/Student');
// Get transactions for a specific student
exports.getTransactionsByStudent = async (req, res) => {
  try {
    const transactions = await Transaction.find({ studentId: req.params.studentId }).sort({ month: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {

  const {studentId,month,paid} = req.body;

  if(!studentId|| !month )
  {
    return res.status(200).json({ message: 'All Fields Required' });
  }
  try {
    const existingTransaction = await Transaction.findOne({ studentId: studentId, month: month });
    if (existingTransaction) {
      return res.status(200).json({ message: 'Student Transaction already exists' });
    }
    const transaction = new Transaction(req.body);
    const newTransaction = await transaction.save();
    res.status(201).json({ message: 'Transaction Added Sucessfully',transactionNew : newTransaction});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transaction by ID (optional, add if needed)
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUnpaidForMonth = async (req, res) => {
  const { yearMonth } = req.params; // Expected format: YYYY-MM
  try {
    const unpaidTransactions = await Transaction.find({
      month: yearMonth,
      paid: false,
    })
      .populate('studentId', 'name mobile')
      .lean(); // lean() makes it plain JS objects, easier to filter

    // Filter out entries with null studentId
    const filtered = unpaidTransactions.filter(txn => txn.studentId !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
