import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 2, // 2 hour
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("ResetPassword", resetPasswordSchema);
