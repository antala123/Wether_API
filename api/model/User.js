import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name: { type: String, required: [true, "User name is required..."] },
    email: { type: String, required: [true, "User email is required..."], unique: [true, "email already exists..."] },
    password: { type: String, required: [true, "User password is required..."] }

}, { timestamps: true });

// Create JWT Token:
userSchema.methods.createJWT = function () {
    return Jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_LIMIT });
}


export default mongoose.model("user", userSchema);