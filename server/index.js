const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/Auth.route");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection successfull!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", AuthRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
