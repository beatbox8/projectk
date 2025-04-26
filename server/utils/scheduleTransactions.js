const cron = require('node-cron');
const Student = require('../models/Student');
const Transaction = require('../models/Transaction');

const scheduleMonthlyTransactions = () => {
  // Run at 00:00 on the 1st day of every month
  cron.schedule('0 0 1 * *', async () => {
    console.log('Running monthly transaction creation task...');
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const currentMonthString = `${currentYear}-${currentMonth}`;

      const activeStudents = await Student.find({ isActive: true });

      for (const student of activeStudents) {
        // Check if a transaction already exists for this student and month
        const existingTransaction = await Transaction.findOne({
          studentId: student._id,
          month: currentMonthString,
        });

        if (!existingTransaction) {
          // Create a new unpaid transaction
          const newTransaction = new Transaction({
            studentId: student._id,
            month: currentMonthString,
            paid: false,
          });
          await newTransaction.save();
          console.log(`Created unpaid transaction for ${student.name} for ${currentMonthString}`);
        } else {
          console.log(`Transaction already exists for ${student.name} for ${currentMonthString}`);
        }
      }
      console.log('Monthly transaction creation task completed.');
    } catch (error) {
      console.error('Error during monthly transaction creation:', error);
    }
  });

  console.log('Monthly transaction creation scheduled to run on the 1st of every month.');
};

module.exports = scheduleMonthlyTransactions;