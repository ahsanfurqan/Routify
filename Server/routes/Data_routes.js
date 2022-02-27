const express = require("express");
const { object } = require("joi");
const mongoose = require("mongoose");
var dateTime = require("node-datetime");
const router = express.Router();
const stop = mongoose.model("Stops");
// const bus = mongoose.model("Bus");
// const history = mongoose.model("History");
const { historyModel, bus } = require("../model/index");

router.delete("/delete/stop", async (req, res) => {
  // stop.findOne
  stop
    .deleteOne({ key: req.body.key })
    .then((result) => {
      res.status(200).send(JSON.stringify("Deleted" + result));
    })
    .catch((err) => {
      res.status(422).send(JSON.stringify("No data Found"));
    });
});
router.delete("/delete/bus", async (req, res) => {
  bus
    .deleteOne({ key: req.body.key })
    .then((result) => {
      res.status(200).send(JSON.stringify("Deleted" + result));
    })
    .catch((err) => {
      res.status(422).send(JSON.stringify("No data Found"));
    });
});

router.post("/getHistory", async (req, res) => {
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
  const { user_email, location, charges, bus_name } = req.body;
  historyModel
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec(async (err, doc) => {
      let key = 0;

      // res.status(200).send(JSON.stringify(doc));
      if (doc.length > 0) {
        if (!isNaN(doc[0].key)) {
          key = doc[0].key + 1;
        }
      } else {
        key = 1;
      }
      var dt = dateTime.create();

      var formatted = dt.format("Y-m-d H:M:S");
      try {
        const new_history = new historyModel({
          key: key,
          user_email: user_email,
          stops: location,
          fare: charges,
          bus: bus_name,
          date: formatted,
        });
        await new_history.save();
        res.status(200).send(JSON.stringify("Success"));
      } catch (error) {
        console.log(error);
        res.status(422).send(error);
      }
    });
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
  const { title, route } = req.body;
  bus
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec(async (err, doc) => {
      let key = 0;
      // res.status(200).send(JSON.stringify(doc));
      if (doc.length > 0) {
        if (!isNaN(doc[0].key)) {
          key = doc[0].key + 1;
        }
      } else {
        key = 1;
      }

      try {
        const new_bus = new bus({ key, title, route });
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
      if (doc.length > 0) {
        if (!isNaN(doc[0].key)) {
          key = doc[0].key + 1;
        }
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
