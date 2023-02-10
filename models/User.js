const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken")
require("dotenv").config()
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email",
      ],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.createJWT = function(){
    return jwt.sign({ id: this._id , username: this.name}, process.env.JWT_SECRET, {expiresIn: "30d"})
}
UserSchema.methods.getName = function(){
  return this.name;
}

module.exports = mongoose.model("User", UserSchema);
