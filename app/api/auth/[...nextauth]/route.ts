
import { connectDB } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials: any) {
                await connectDB();

                const existingUser = await users.findOne({
                    email: credentials.email
                });

                if (!existingUser) {
                    return null;
                }

                const isPswdMatch = await bcrypt.compare(
                    credentials.password,
                    existingUser.password
                );

                if (!isPswdMatch) {
                    return null;
                }

                return {
                    id: existingUser._id.toString(),
                    name: existingUser.name,
                    email: existingUser.email
                };
            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: "/login"
    },

    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
