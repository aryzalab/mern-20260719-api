import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transactionId: String,
  amount: {
    type: Number,
    required: [true, "Payment amount is required."],
  },
  method: {
    type: String,
    required: [true, "Payment method is required."],
    enum: ["CASH", "CARD", "ONLINE"],
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "FAILED", "SUCCESS"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

export default mongoose.model("Payment", paymentSchema);
