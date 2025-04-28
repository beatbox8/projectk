const jwt = require('jsonwebtoken');
require('dotenv').config();

const protectRoute = async (req, res, next) => {
    // const token = req.cookies.token;
    // console.log("Token from cookie:", token);

    // if (!token) {
    //     return res.status(401).json({ success: false, message: "Unauthorized User" });
    // }

    try {
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);

        // const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        // console.log("Decoded token:", decoded);
        // req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized User (catch)" });
    }
};

module.exports = { protectRoute };
