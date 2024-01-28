import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Error is: ", err);
  });

app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});

//importing routers
import userRouter from "./routes/user.route.js";
import auth from "./routes/auth.route.js";

app.use("/api/user", userRouter);
app.use("/api/auth", auth);

app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});
