const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Connect to MongoDB (ideally, do this in a separate config file)

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const cookieOptions={
      httpOnly : false,
      secure : true,
      sameSite : "strict",
      maxAge : 7*24*60*60*1000
    };
    res.cookie('token',token,cookieOptions)
    res.json({user: { email: user.email } });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.signOut = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly : true,
      secure : false,
      sameSite : "strict",
      maxAge : 7*24*60*60*1000
    });

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Sign-out error:', error);
    res.status(500).json({ message: 'Something went wrong during logout' });
  }
};


// Initialize the admin user if not present
async function initializeAdmin() {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const adminUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        isAdmin: true,
      });
      await adminUser.save();
      console.log('Admin user created.');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

initializeAdmin();
