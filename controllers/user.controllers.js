const bcrypt = require("bcrypt");
const db = require("../configDB");

const getProfile = async (req, res) => {
  const requiredUserId = req.user_id;
  try {
    const requiredUser = await db("employees")
      .where("id", requiredUserId)
      .first();
    if (!requiredUser) {
      return res
        .status(400)
        .json({ success: false, message: "user does Not Exist" });
    }

    const payload = {
      name: requiredUser.name,
      email: requiredUser.email,
      age: requiredUser.age,
      created_at: requiredUser.created_at,
    };

    return res.status(200).json({ success: true, payload: payload });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user_id;
  const { name, email, password, age } = req.body;

  const existingUser = await db("employees").where("id", userId).first();
  if (!existingUser) {
    return res.status(400).json({ success: false, message: "User not Found" });
  }

  if (!name || !email || !password || !age) {
    return res.status(400).json({ success: false, message: "Fill all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db("employees").where("id", userId).update({
      name,
      email,
      password: hashedPassword,
      age,
      updated_at: db.fn.now(),
    });

    return res.status(200).json({ success: true, payload: updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const userId = req.user_id;

  try {
    const user = await db("employees").where("id", userId);

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "Not a Valid User" });
    }

    await db("employees").where("id", userId).del();
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
