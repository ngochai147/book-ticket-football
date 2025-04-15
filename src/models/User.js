// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferredLanguage: { type: String, default: "English" },
  estebanAndradaAge: { type: Number, required: true },
  acceptedTerms: { type: Boolean, required: true },
  receiveNewsletters: { type: Boolean, default: false },
  avatarUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);