const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/devopsdb");  

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  tech: String,
  experience: String
});

const User = mongoose.model("User", UserSchema);

app.post("/add", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Saved Successfully");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => console.log("Server running"));
