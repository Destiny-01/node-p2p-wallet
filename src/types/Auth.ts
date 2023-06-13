import { Request } from "express";

export interface ExtendedSignupRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface ExtendedLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
