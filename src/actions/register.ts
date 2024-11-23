"use server";
import dbConnect from "../lib/dbConnect";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
    const { email, password, name } = values;

    try {
        // Await DB Connection
        await dbConnect();

        // Search for email and username in DB
        const userFound = await User.findOne({ email })
        const usernameFound = await User.findOne({ name })

        // If Email is Already in Use
        if (userFound) {
            return {
                error: 'This email is already in use!'
            }
        }
        // If Username is Already In Use
        if (usernameFound) {
            return {
                error: 'This username is already in use!'
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the User as all checks have passed
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Finally, Save the User Data
        const SavedUser = await user.save();

    } catch (error) {
        return error
    }
}