const { number } = require("joi");

const mongoose = require("mongoose");

const history = new mongoose.Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  destination: {
    type: Number,
    required: true,
  },
  origin: {
    type: Number,
    requird: true,
  },
});

mongoose.model("history", history);
module.exports = {
  history,
};
