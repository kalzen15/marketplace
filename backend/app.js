// Packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
const url = process.env.DB_CONNECT;

const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on("open", function () {
  console.log("Connected");
});

app.use(express.json());

const productRouter = require("./routes/api.ts");
const userRouter = require("./routes/users.js");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api", productRouter);
app.use("/users", userRouter);

app.listen(9000, function () {
  console.log("server started");
});
