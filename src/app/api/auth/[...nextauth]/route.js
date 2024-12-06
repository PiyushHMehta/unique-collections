import clientPromise from "@/libs/mongooseConnect";
import bcrypt from "bcryptjs";
import { User } from '@/models/User';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import mongoose from "mongoose";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URI);
                const user = await User.findOne({ email });
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                if (passwordOk) {
                    return user;
                }

                return null
            }
        })
    ],
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }