import { compare } from "bcryptjs";
import { Response } from "express";
import { Transaction, User } from "../models";
import { ExtendedTranferRequest } from "../types";

export const transferFunds = async (
  req: ExtendedTranferRequest,
  res: Response
) => {
  try {
    const { amount, email, password, receiverEmail } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "An error occured, try logging in again",
      });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password" });
    }

    const receivingUser = await User.findOne({ email: receiverEmail });
    if (!receivingUser) {
      return res.status(500).json({
        success: false,
        message: "User with that email address not found",
      });
    }

    if (user.walletBalance < amount) {
      return res.status(500).json({
        success: false,
        message: "Insufficient funds!",
      });
    }

    if (user._id === receivingUser._id || email === receiverEmail) {
      return res.status(403).json({
        success: false,
        message:
          "I see what you trying to do there, but you can't transfer to yourself",
      });
    }

    const transaction = await Transaction.create({
      amount,
      sender: user._id,
      receiver: receivingUser._id,
    });

    user.transactions.push(transaction._id);
    receivingUser.transactions.push(transaction._id);
    user.walletBalance -= amount;
    receivingUser.walletBalance += amount;

    await user.save();
    await receivingUser.save();

    return res.status(200).json({ success: true, data: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: `An error occured: ${err.message}` });
  }
};
