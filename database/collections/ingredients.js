const mongoose = require("../connect");
var userSchema = {
  name : String,
  kcal : Number,
  peso : Number
};
var user = mongoose.model("ingredients", userSchema);
module.exports = user;
