import mongoose from "mongoose";
import { emailRegex } from "../constants/regex.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
  ROLE_SUPER_ADMIN,
} from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required."],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email address is required."],
    minLength: 5,
    maxLength: 100,
    unique: [true, "Email already exists."],
    lowercase: true,
    validate: {
      validator: (value) => {
        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  roles: {
    type: [String],
    default: [ROLE_CUSTOMER],
    enum: [ROLE_CUSTOMER, ROLE_ADMIN, ROLE_MERCHANT, ROLE_SUPER_ADMIN],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    maxLength: 15,
    minLength: 6,
    unique: [true, "Phone number already exists."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  address: {
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
  isActive: {
    type: Boolean,
    default: true,
  },
  profileImageUrl: String,
});

export default mongoose.model("User", userSchema);
