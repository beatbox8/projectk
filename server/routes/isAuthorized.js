const express = require('express');
const { protectRoute } = require('../middleware/authUser.middleware');
const router = express.Router();

router.get('/check',(req, res) => {
    try {
        console.log('Admin user authenticated.');
        res.send({ success:true ,message: "User is authorized" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;
