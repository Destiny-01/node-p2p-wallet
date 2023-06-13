import express from "express";
import { connectDB } from "./config";

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server up on port ${PORT}`);
});
