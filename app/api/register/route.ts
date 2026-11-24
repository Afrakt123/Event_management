import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "Already Registered. Please Login" },
                { status: 409 }
            );
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: encryptedPassword
        });

        return NextResponse.json(
            { message: "User Registered Successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
