const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const stop = mongoose.model("Stops");

router.post("/insert/stop", async (req, res) => {
  console.log(req.body);
  const { key, title, location } = req.body;
  try {
    const user = new stop({ key, title, location });
    await user.save();
    res.status(200).send(JSON.stringify("Success"));
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get("/getAllStops", (req, res) => {
  //   try {
  //     const { result } = stop.find();
  //     //   console.log(result.stops);
  //     res.send(result);
  //   } catch (err) {
  //     res.status(422).send(err.message);
  //   }
  stop
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(422).send(err.message);
    });
});

module.exports = router;
