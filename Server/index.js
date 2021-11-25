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

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
mongoose.connection.on("connected", () => {
  console.log("Database COnnected");
});
mongoose.connection.on("error", (err) => {
  console.log("error = ", err);
});
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, "192.168.43.52", () => {
  console.log("server is running");
});
