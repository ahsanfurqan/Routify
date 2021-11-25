require("./Models/Stops");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { mongoUrl, url } = require("./Keys");
const routes = require("./routes/Data_routes");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(routes);

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("Database COnnected");
});
mongoose.connection.on("error", (err) => {
  console.log("error = ", err);
});
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("server is running");
});
