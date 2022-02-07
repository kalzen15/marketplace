/*
    Program file for the overall routing
*/

const express = require("express");
const router = express.Router();
// Handle of Schema
const Praan = require("../models/praan.ts");
const Products = require("../models/products.js");
const User = require("../models/user.js");
const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const verify = require("../verifyToken");

// Sending async request so it does not block the process
// This is for a basic post request
router.get("/top", verify, async (req, res) => {
  try {
    const top = await Products.find().limit(5);
    res.json(top);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.get("/currentUser/:id", verify, async (req, res) => {
  try {
    const id = req.params.id;
    const top = await User.find({ _id: id });
    res.json(top[0]);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.get("/product/:id", verify, async (req, res) => {
  try {
    const id = req.params.id;
    const top = await Products.find({ _id: id });
    res.json(top[0]);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.get("/latest", verify, async (req, res) => {
  try {
    const top = await Products.find().sort({ endTimeStamp: "desc" }).limit(5);
    res.json(top);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.post("/", verify, async (req, res) => {
  const product = new Products({
    ...req.body,
  });

  try {
    const a1 = await product.save();
    res.json(a1);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.post("/addMoney", verify, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.body.userId },
      { $inc: { walletBalance: req.body.amount } }
    );

    res.json(user);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});

router.post("/buy", verify, async (req, res) => {
  try {
    const product = await Products.updateOne(
      { _id: req.body.productId },
      { $push: { bidsList: req.body.data } }
    );

    const user = await User.updateOne(
      { _id: req.body.data.userId },
      {
        $inc: {
          walletBalance: -req.body.data.price,
          engagedWalletBalance: req.body.data.price,
        },
        $push: { activeBids: req.body.product },
      }
    );

    res.json(product);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});
router.post("/endSale", verify, async (req, res) => {
  try {
    const product = await Products.updateOne(
      { _id: req.body.productId },
      { $set: { sold: true } }
    );
    console.log("req.body.bid.time", req.body.bid);

    const user = await User.updateOne(
      { _id: req.body.buyer.userId },
      {
        $inc: {
          engagedWalletBalance: -req.body.buyer.price,
        },
        $push: { walletItems: req.body.product },
        $set: { activeBids: [] },
      }
    );
    const selleruser = await User.updateOne(
      { _id: req.body.seller.userId },
      {
        $inc: {
          walletBalance: req.body.buyer.price,
        },
      }
    );
    res.json(product);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});

// Exporting module so it will be accessible in app.js
module.exports = router;
