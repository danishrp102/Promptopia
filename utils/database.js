import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // sets the mongoose options, if not used it gives warnings in the console

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, { // the URI of our actual database 0R URI of our mongodb atlas instance
            dbName: "share_prompt",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("MongoDB connected!");

    } catch (error) {
        console.log(error);
    }
}