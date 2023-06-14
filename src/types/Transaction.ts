import { Request } from "express";

export interface ExtendedTranferRequest extends Request {
  body: {
    amount: number;
    email: string;
    password: string;
    receiverEmail: string;
  };
}

export interface ExtendedTransactionRequest extends Request {
  body: {
    email: string;
  };
}
