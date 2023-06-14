import axios from "axios";
import {
  PaystackData,
  ReturnedPaystackData,
  ReturnedPaystackVerifyData,
} from "../types";

const Authorization = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
export const handleInitPayment = async (
  data: PaystackData
): Promise<ReturnedPaystackData> => {
  try {
    const callback_url = `https://${
      process.env.NODE_ENV === "production"
        ? "paystack-p2p-wallet.vercel.app"
        : "localhost:3000"
    }/api/v1/paystack/callback`;

    data.amount *= 100;
    const request = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { ...data, callback_url },
      {
        headers: {
          Authorization,
        },
      }
    );

    return request.data;
  } catch (err: any) {
    return { status: false, message: `An error occured: ${err.message}` };
  }
};

export const handleVerifyPayment = async (
  ref: string
): Promise<ReturnedPaystackVerifyData> => {
  try {
    const request = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization,
        },
      }
    );

    return request.data;
  } catch (err: any) {
    return { status: false, message: `An error occured: ${err.message}` };
  }
};
