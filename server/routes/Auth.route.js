const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const redis = require("redis");
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
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // configuring redis
    const client = redis.createClient(process.env.REDIS_PORT);
    await client.connect();
    // await client.set(process.env.REDIS_PORT);

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
        email: user.email,
        zipcode: user.zipcode,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user.toObject();

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    // Assuming the API returns an array of posts, you can access them here
    const posts = response.data;
    // client.set("json_placeholder_data", JSON.stringify(posts));
    client.set("json_placeholder_data", JSON.stringify(posts), (err, reply) => {
      if (err) {
        console.error("Error setting data:", err);
      } else {
        console.log("Data set successfully:", reply);
      }
    });

    // Get a value

    let clientData = await client.get("json_placeholder_data");
    let data = JSON.parse(clientData);
    return res.status(200).json({ ...others, accessToken, data });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
