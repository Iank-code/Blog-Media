const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Register route
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
    const { password, ...others } = savedUser.toObject();
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong Credentials!");
    }

    const dbZipcode = user.zipcode;
    const userZipcode = req.body.zipcode;
    if (dbZipcode !== userZipcode) {
      return res.status(401).json("Wrong Credentials!");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user.toObject();

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
