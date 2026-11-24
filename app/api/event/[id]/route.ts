
import { connectDB } from "@/lib/mongodb";
import events from "@/models/eventModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

type Props = {
    params: Promise<{ id: string }>
};

export async function GET(req: NextRequest, { params }: Props) {
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

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid event ID" },
                { status: 400 }
            );
        }

        await connectDB();

        const event = await events.findOne({
            _id: id,
            userId: token.sub
        });

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Event fetched successfully", data: event },
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

export async function PUT(req: NextRequest, { params }: Props) {
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

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid event ID" },
                { status: 400 }
            );
        }

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

        await connectDB();

        const updatedEvent = await events.findOneAndUpdate(
            {
                _id: id,
                userId: token.sub
            },
            {
                eventName,
                description,
                eventDate,
                venue,
                eventType,
                status
            },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Event updated successfully", data: updatedEvent },
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

export async function DELETE(req: NextRequest, { params }: Props) {
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

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid event ID" },
                { status: 400 }
            );
        }

        await connectDB();

        const deletedEvent = await events.findOneAndDelete({
            _id: id,
            userId: token.sub
        });

        if (!deletedEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Event deleted successfully" },
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
