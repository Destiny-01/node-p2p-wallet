import { Response } from "express";
import { User } from "../models";
import { handleInitPayment, handleVerifyPayment } from "../services";
import { ExtendedPaymentRequest } from "../types";

export const initializePayment = async (
  req: ExtendedPaymentRequest,
  res: Response
) => {
  try {
    const response = await handleInitPayment(req.body);

    if (!response.status || !response.data) {
      return res
        .status(500)
        .json({ success: false, message: response.message });
    }

    return res
      .status(201)
      .json({ success: true, data: response.data.authorization_url });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: `An error occured: ${err.message}` });
  }
};

export const verifyPayment = async (
  req: ExtendedPaymentRequest,
  res: Response
) => {
  try {
    const response = await handleVerifyPayment(req.query.reference);
    if (!response.status || !response.data) {
      return res
        .status(500)
        .json({ success: false, message: response.message });
    }

    const user = await User.findOne({ email: response.data?.customer.email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "An error occured during your payment",
      });
    }

    user.walletBalance += response.data.amount / 100 || 0;
    await user.save();

    return res.status(200).json({ success: true, data: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: `An error occured: ${err.message}` });
  }
};
