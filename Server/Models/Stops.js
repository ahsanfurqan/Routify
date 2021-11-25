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
  location: {
    type: Object,
    required: true,
    unique: true,
  },
});

mongoose.model("Stops", stopSchema);
