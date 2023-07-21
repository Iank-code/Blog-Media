const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/Auth.route");
const redis = require("redis");
const axios = require("axios");

dotenv.config();
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("DBConnection successfull!"))
//   .catch((err) => console.log(err));
app.get("/posts", async (req, res) => {
  const client = redis.createClient(process.env.REDIS_PORT);
  await client.connect();
  let clientData = await client.get("json_placeholder_data");
  let data = JSON.parse(clientData);
  return res.status(200).json(data);
});
app.use(express.json());
app.use("/api/auth", AuthRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
