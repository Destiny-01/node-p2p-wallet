import { Response } from "express";
import { compare, hash } from "bcryptjs";
import { User } from "../models";
import { ExtendedSignupRequest, ExtendedLoginRequest } from "../types";

export const signupController = async (
  req: ExtendedSignupRequest,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    // should implement secure and efficient validation, but keeping it simple
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Name, email and password required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, error: "Email has already been taken" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: `An error occured: ${err.message}` });
  }
};

export const loginController = async (
  req: ExtendedLoginRequest,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: `An error occured: ${err.message}` });
  }
};
