const { number } = require("joi");
const mongoose = require("mongoose");
const stopSchema = new mongoose.Schema({
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
  route_id: {
    type: Number,
    required: true,
  },
  number_routes: {
    type: Number,
    required: true,
  },
});
mongoose.model("Bus", stopSchema);
