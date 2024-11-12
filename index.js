const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const db = require("./configDB");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", isAuthenticated, userRoutes);

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.listen(PORT, async () => {
  console.log(`Server Started Successfully at http://localhost:${PORT}`);
});
