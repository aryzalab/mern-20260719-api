import mongoose from "mongoose";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "../constants/orderStatuses.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_CANCELLED,
    ],
  },
  shippingAddress: {
    city: {
      type: String,
      required: true,
    },
    provice: {
      type: String,
    },
    street: String,
    country: {
      type: String,
      default: "Nepal",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

export default mongoose.model("Order", orderSchema);
