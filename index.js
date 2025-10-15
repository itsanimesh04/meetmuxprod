const express = require("express");
const dotenv = require("dotenv");
const userSchema = require("./models/userModel");
const orderSchema = require("./models/orderSchema");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("mongo connected");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.status(200).json("Backend runnning");
});

app.post("/createuser", async (req, res) => {
  try {
    const { name, username } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!username)
      return res.status(400).json({ error: "username is required" });
    const user = await userSchema.create({
      name: name,
      username: username,
    });
    await user.save();
    console.log(`User saved with username ${username} and name ${name}`);
    res.json(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

app.post("/createorder", async (req, res) => {
  try {
    const { name, id, username } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!username)
      return res.status(400).json({ error: "userName is required" });
    if (!id) return res.status(400).json({ error: "id is required" });

    const od = await orderSchema.findOne({
      id: id,
    });
    if (od) {
      console.log("order already exist ignoring save");
      res.status(400).json({ message: "order already exist" });
    }

    const order = await orderSchema.create({
      name: name,
      id: id,
      username: username,
    });
    await order.save();
    console.log("order saved successfull");
    res.status(201).json({ message: "order created successfully" }, order);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});

app.post("/deleteorder", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return req.status(400).json({ error: "id is required" });

    const od = await orderSchema.findOne({
      id: id,
    });
    if (!od) {
      console.log("order dont exist ignoring delete");
      res.status(200).json({ message: "order doesnt exist!" });
    }

    const order = await orderSchema.deleteOne({
      id: id,
    });
    console.log("order deleted successfull");
    res.status(201).json({ message: "order deleted successfully" });
  } catch (error) {
    res.json(400).json({
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
