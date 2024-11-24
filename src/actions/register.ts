"use server";
import dbConnect from "../lib/dbConnect";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name } = values;

  try {
    await dbConnect();
    const userFound = await User.findOne({ email });
    const usernameFound = await User.findOne({ name });
    if (userFound) {
      return {
        error: "This email is already in use!",
      };
    }
    if (usernameFound) {
      return {
        error: "This username is already in use!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const SavedUser = await user.save();
  } catch (error) {
    return error;
  }
};
