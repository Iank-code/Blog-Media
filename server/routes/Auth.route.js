const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register routes
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    zipcode: req.body.zipcode,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
