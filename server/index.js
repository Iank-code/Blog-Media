const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/Auth.route");
const FeedRoute = require("./routes/Feed.route");
const PaymentRoute = require("./routes/Payment.route");
const UserInfoRoute = require("./routes/User.route");

app.use(cors());

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection successfull!"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/feed", FeedRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/user", UserInfoRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
