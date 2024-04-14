import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
        console.log("DB connected");

        connection.on("error", (error) => {
            console.log(
                "mongoDB connection error, please make sure db is up and running",
                error
            );
            process.exit();
        });
    } catch (error) {
        console.log("something went wrong in connection");
        console.log(error);
    }
}
