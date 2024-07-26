import mongoose from "mongoose";

let isConnected: boolean;

export const connectDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || '', {
            dbName: "borcelle_admin",
        });
        isConnected = true;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
};