import express from "express";
import { connectDB } from "./config";
import routes from "./routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

const PORT = 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server up on port ${PORT}`);
});
