const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
