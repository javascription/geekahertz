import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email?: string | null;
            
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        username: string;
        
    }
}
