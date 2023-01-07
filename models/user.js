const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  data: Array,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
