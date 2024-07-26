import Collection from "@/lib/models/collection";
import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectDB();
        const { title, description, image } = await req.json();

        const existingCollection = await Collection.findOne({ title });
        if (existingCollection) {
            return new NextResponse("Collection already exists", { status: 400 });
        };

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
        };

        const newCollection = await Collection.create({
            title,
            description,
            image,
        });

        await newCollection.save();
        return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
        console.log("Error creating collection: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const collections = await Collection.find().sort({ createdAt: -1 });
        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        console.log("Error fetching collections: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}