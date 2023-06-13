import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Transaction",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
