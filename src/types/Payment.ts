import { Request } from "express";

export interface ExtendedPaymentRequest extends Request {
  body: PaystackData;
  query: {
    reference: string;
  };
}

export interface PaystackData {
  amount: number;
  email: string;
}

export interface ReturnedPaystackData {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface ReturnedPaystackVerifyData {
  status: boolean;
  message: string;
  data?: {
    amount: number;
    customer: {
      email: string;
    };
  };
}
