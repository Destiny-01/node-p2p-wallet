import express from "express";
import { connectDB } from "./config";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

const PORT = 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server up on port ${PORT}`);
});
