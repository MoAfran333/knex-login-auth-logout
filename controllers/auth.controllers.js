const bcrypt = require("bcrypt");
const db = require("../configDB");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email or Password is Empty" });
  }

  try {
    const existingUser = await db("employees").where("email", email).first();

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Does NOT exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        user_id: existingUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully Logged In",
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email or Password is Empty" });
  }

  const existingUser = await db("employees").where("email", email).first();

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const addedUser = await db("employees").insert({
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully Signed Up",
      data: addedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: false, message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const refreshToken = async (params) => {
  
}

module.exports = { login, signup, logout };
