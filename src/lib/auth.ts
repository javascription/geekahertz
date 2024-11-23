import dbConnect from "./dbConnect";
import User from "../models/userModel";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {

    providers: [
        credentials({
            // Define Credentials

            name: "credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            // Authorization
            async authorize(credentials): Promise<any> {

                // Wait for Database Connection

                await dbConnect()

                // Search For User In DB
                const user = await User.findOne({
                    email: credentials?.email
                }).select("+password");

                // If User Does Not Exist:
                if (!user) throw new Error("Incorrect Email");

                // If the User Exists, Match the Passwords
                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
                
                // If Passsword Doesn't Match
                if (!passwordMatch) throw new Error("Incorrect Password");
                
                // If the Password Matches
                console.log(user)

                return {
                    id: user._id,
                    name: user.name, // Include username for display purposes
                    email: user.email,       // Include email if needed
                    
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,  // This should match the secret used in .env
    },
    callbacks: {
        async jwt({ token, user }) {
            // On initial login, `user` will be populated, so you can attach properties to `token`.
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Transfer custom properties from `token` to `session.user`.
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                };
            }
            return session;
        }
    }
}