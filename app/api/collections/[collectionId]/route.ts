import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Collection from "@/lib/models/collection";

import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        await connectDB();
        await Collection.findByIdAndDelete(params.collectionId);
        return new NextResponse("Collection deleted", { status: 200 });

    } catch (error) {
        console.log("Error fetching collections: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        await connectDB();
        const collection = await Collection.findById(params.collectionId);

        if (!collection) {
            return new NextResponse(JSON.stringify({ message: "Collection not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(collection), { status: 200 });

    } catch (error) {
        console.log("Error fetching collections: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectDB();

        let collection = await Collection.findById(params.collectionId);
        if (!collection) {
            return new NextResponse(JSON.stringify({ message: "Collection not found" }), { status: 404 });
        }

        const { title, description, image } = await req.json();

        if (!title || !image) {
            return new NextResponse(JSON.stringify({ message: "Title and image are required" }), { status: 400 });
        }

        collection = await Collection.findByIdAndUpdate(params.collectionId, {
            title,
            description,
            image
        }, { new: true });

        await collection.save();
        return NextResponse.json(collection, { status: 200 });
    } catch (error) {
        console.log("Error fetching collections: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
};