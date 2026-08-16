import mongoose from "mongoose";

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
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 50,
    required: [true, "Password is required."],
  },
  roles: {
    type: [String],
    default: ["CUSTOMER"],
    enum: ["CUSTOMER", "MERCHANT", "ADMIN", "SUPER_ADMIN"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    maxLength: 15,
    minLength: 6,
    unique: true,
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
});

export default mongoose.model("User", userSchema);
