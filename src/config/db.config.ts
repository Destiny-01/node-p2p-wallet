import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDB = () => {
  const mongoURI =
    process.env.MONGO_URI || "mongodb://localhost:27017/p2p-wallet";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB up and running"))
    .catch((err) =>
      console.log(`An error occured while connecting to database: ${err}`)
    );
};
