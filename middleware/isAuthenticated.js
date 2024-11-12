const jwt = require("jsonwebtoken");

require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User, Please Login again" });
    }

    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user_id = decodedToken.user_id;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = isAuthenticated;
