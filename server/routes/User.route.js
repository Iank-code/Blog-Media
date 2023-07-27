const router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const dotenv = require("dotenv");
dotenv.config();

router.get("/info", async (req, res) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(500).json("Failed to authenticate");
    }
    const token = authorization.split(" ")[1];

    const isValidToken = jwt.verify(token, process.env.JWT_SEC);

    if (!isValidToken || isValidToken.id == undefined) {
      return res.status(500).json("Also Failed");
    }

    const { id } = isValidToken;

    const user = await UserModel.findById({ _id: id });

    const { password, ...others } = user.toObject();

    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
