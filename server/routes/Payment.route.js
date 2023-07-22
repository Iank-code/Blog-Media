const router = require("express").Router();
const dotenv = require("dotenv");
const UserModel = require("../models/User.model");
dotenv.config();

router.post("/:user_id", async (req, res) => {
  try {
    const _ = await UserModel.updateOne(
      { _id: req.params.user_id },
      {
        $set: { subscriptionType: "PREMIUM_USER" },
      }
    );
    return res.status(204).json("Subsciption updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
