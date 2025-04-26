const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.get('/student/:studentId', transactionController.getTransactionsByStudent);
router.post('/', transactionController.addTransaction);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction); // Optional: Add delete route if needed
router.get('/unpaid/:yearMonth', transactionController.getUnpaidForMonth);
module.exports = router;