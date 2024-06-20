import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function dbConnect() {
  mongoose
    .connect(MONGODB_URI, {
      connectTimeoutMS: 3000,
    })
    .catch((err) => console.log(`Error connecting to DB: ${err}`));

  mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
  });

  mongoose.connection.on("error", () => {
    console.log("Error connecting to DB");
  });
}

export default dbConnect;
