import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();
import path from "path";

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Error is: ", err);
  });

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});

//importing routers
import userRouter from "./routes/user.route.js";
import auth from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

app.use("/api/user", userRouter);
app.use("/api/auth", auth);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  //if any other route is stricked, it will run index.html in dist in client
});
app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});
