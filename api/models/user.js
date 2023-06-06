import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js"
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    phone: { type: String },
    isVendor: { type: Boolean, default: false },
    img: { type: String },
    isSeller: { type: Boolean, default: false },
    favorites: [{ prodId: { type: mongoose.Schema.Types.ObjectId } }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// This method is for generating a token using the users _id and and a secret key
userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET);
};

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
  this.resetPasswordExpire = Date.now()+10*(60*1000);

  return resetToken;
}

// // Monggose lets us make methods so we are creating a method that checks for password match
// userSchema.methods.matchPasswords = async function(password){
//   const match = await bcrypt.compare(password,this.password);
//   return match;
// };
export default mongoose.model("User", userSchema);
