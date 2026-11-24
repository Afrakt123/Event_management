import { connectDB } from "@/lib/mongodb";
import events from "@/models/eventModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });

        if (!token?.sub) {
            return NextResponse.json(
                { message: "Please login first" },
                { status: 401 }
            );
        }

        await connectDB();

        const {
            eventName,
            description,
            eventDate,
            venue,
            eventType,
            status
        } = await req.json();

        if (!eventName || !description || !eventDate || !venue || !eventType || !status) {
            return NextResponse.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );
        }

        const newEvent = await events.create({
            eventName,
            description,
            eventDate,
            venue,
            eventType,
            status,
            userId: token.sub
        });

        return NextResponse.json(
            { message: "Event added successfully", data: newEvent },
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

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });

        if (!token?.sub) {
            return NextResponse.json(
                { message: "Please login first" },
                { status: 401 }
            );
        }

        await connectDB();

        const allEvents = await events.find({
            userId: token.sub
        }).sort({ _id: -1 });

        return NextResponse.json(
            { message: "Events fetched successfully", data: allEvents },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
