const router = require("express").Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
const UserModel = require("../models/User.model");
dotenv.config();

const verifyIfUserIsPremium = async (req) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return { authorized: false, isPremium: false };
  }

  try {
    // Getting the bearer token
    const token = authorization.split(" ")[1];

    const isValidToken = jwt.verify(token, process.env.JWT_SEC);

    if (!isValidToken || isValidToken.id == undefined) {
      return { authorized: false, isPremium: false };
    }

    const { id } = isValidToken;

    const user = await UserModel.findById({ _id: id });

    return {
      authorized: user._id !== null,
      isPremium: user.subscriptionType === "PREMIUM_USER",
    };
  } catch (error) {
    return { authorized: false, isPremium: false };
  }
};

// Getting posts
router.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;

    let _page, _limit;

    _page = page || 1;
    _limit = limit || 10;

    const { authorized, isPremium } = await verifyIfUserIsPremium(req);

    const isPremiumUser = authorized && isPremium;
    const maxForFreeUsers = isPremiumUser ? 100 : 20;

    if (_limit * _page > maxForFreeUsers && isPremiumUser == false) {
      return res
        .status(400)
        .json(
          "Maximum limit reached! Please upgrade your plan to view more posts"
        );
    }

    const endpoint = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await axios.get(endpoint);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json("Unable to feed");
  }
});

// Blocking post of a particular user
// router.post("/block", async (req, res) => {
//   try {
//     const blockedId = req.body.authID;
//     const uid = req.body.uid;
//     const user = await UserModel.findById({ _id: uid });
//     res.status(200).json(user);
//     // const { authorized, isPremium } = await verifyIfUserIsPremium(req);
//     // const isPremiumUser = authorized && isPremium;

//     if (user.subscriptionType === "PREMIUM_USER") {
//       // user.blockedUser.push(blockedId);
//       return res.status(200).json(user.blockedUser);
//     }
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

module.exports = router;
