const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDb = require("./confiq/ConnectDb");
const authController = require("./controllerRoute/AuthController");
const productController = require("./controllerRoute/productController");
const cartController = require("./controllerRoute/cartController");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authController);
app.use("/api/products", productController);
app.use("/api/cart", cartController);

//error  middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 400;
  const message = error.message || error.message || "error occur";
  next();
  res.status(statusCode).json({
    message,
    statusCode,
    success: false,
    error: true,
  });
});

ConnectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
