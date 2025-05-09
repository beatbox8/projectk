require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const  isAuthorized = require('./routes/isAuthorized');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const scheduleMonthlyTransactions = require('./utils/scheduleTransactions');
const whatsappRoutes = require('./routes/whatsappRoutes');
const { protectRoute } = require('./middleware/authUser.middleware');
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
 
app.use(cors({
  origin: ['https://fluffy-fudge-704cd6.netlify.app','http://localhost:3000','https://beat-box-frontend.onrender.com'], // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/students',studentRoutes);
app.use('/api/transactions',protectRoute, transactionRoutes);
app.use('/api/whatsapp', protectRoute,whatsappRoutes);
app.use('/api',isAuthorized);

scheduleMonthlyTransactions();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
