const express = require("express");
const { object } = require("joi");
const mongoose = require("mongoose");

const router = express.Router();
const stop = mongoose.model("Stops");
const bus = mongoose.model("Bus");
// const history = mongoose.model("History");
const { historyModel } = require("../model/index");

router.get("/getHistory", async (req, res) => {
  historyModel
    .find({ user_email: req.body.email })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(422).send(JSON.stringify("No data Found"));
    });
});
router.post("/insert/history", async (req, res) => {
  // return re;
  // res.status(200).send("hello");
  const { user_email, destination, origin } = req.body;
  historyModel
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec(async (err, doc) => {
      let key = 0;
      // res.status(200).send(JSON.stringify(doc));
      if (Object.keys(doc) > 0) {
        key = doc[0].key + 1;
      } else {
        key = 1;
      }
      try {
        const new_history = new historyModel({
          key: key,
          user_email: user_email,
          destination: destination,
          origin: origin,
        });
        await new_history.save();
        res.status(200).send(JSON.stringify("Success"));
      } catch (error) {
        res.status(422).send(JSON.stringify(error));
      }
    });

  // const history = new history({
  //   user_email: req.body.email,
  //   destination: req.body.destination,
  //   origin: req.body.origin,
  // });
});

router.get("/getBusses", async (req, res) => {
  bus
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(422).send(JSON.stringify("No data Found"));
    });
});

router.post("/insert/bus", async (req, res) => {
  const { title, number_routes, route_id } = req.body;
  bus
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec(async (err, doc) => {
      let key = 0;
      // res.status(200).send(JSON.stringify(doc));
      if (Object.keys(doc) > 0) {
        key = doc[0].key + 1;
      } else {
        key = 1;
      }
      try {
        const new_bus = new bus({ key, title, number_routes, route_id });
        await new_bus.save();
        res.status(200).send(JSON.stringify("Success"));
      } catch (error) {
        res.status(422).send(JSON.stringify("Please Check data Duplication"));
      }
    });
});

router.post("/insert/stop", async (req, res) => {
  // console.log(req.body);
  const { title, location } = req.body;

  stop
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec(async (err, doc) => {
      let key = 0;
      // res.status(200).send(JSON.stringify(doc));
      if (Object.keys(doc) > 0) {
        key = doc[0].key + 1;
      } else {
        key = 1;
      }
      try {
        const user = new stop({ key, title, location });
        await user.save();
        res.status(200).send(JSON.stringify("Success"));
      } catch (err) {
        res.status(422).send(JSON.stringify("Please Check data Duplication"));
      }
    });
});

router.get("/getAllStops", (req, res) => {
  stop
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(422).send(JSON.stringify("NO data Found"));
    });
});

module.exports = router;
