/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv, { config } from "dotenv";
import path from "path";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import productRouter from "./routers/productRouter";
import uploadRouter from "./routers/uploadRouter";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db!");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Original code
//  app.get("/api/paypal/clientId", (req, res) => {
//    res.send({ clientId: config.PAYPAL_CLIENT_ID });
//  });

// new code
// app.get("/api/paypal/clientId", (req, res) => {
//  console.log(process.env.PAYPAL_CLIENT_ID);
// });

app.get("/api/paypal/clientId", (req, res) => {
  console.log(process.env.PAYPAL_CLIENT_ID);
});

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/index.html"));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5070, () => {
  console.log("serve at http://localhost:5070");
});
