const mongoose = require("mongoose");
const env = require("../config/env");

mongoose.connect(env.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("disconnected", () => {
  console.log("MONGODB disconnected");
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB disconnected due to : " + err);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("App is terminating");
  mongoose.connection.close(() => {
    console.log("MONGODB disconnected");
    process.exit(0);
  });
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdOn: { type: Date, default: Date.now },
});
const travel_history = new mongoose.Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  stops: {
    type: Object,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
const busSchema = new mongoose.Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  route: {
    type: Object,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);
const otpModel = mongoose.model("otp", otpSchema);
const historyModel = mongoose.model("travel_history", travel_history);
const bus = mongoose.model("bus", busSchema);

module.exports = {
  userModel,
  otpModel,
  historyModel,
  bus,
};
