const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const stop = mongoose.model("Stops");

router.post("/insert/stop", async (req, res) => {
  console.log(req.body);
  const { title, location } = req.body;
  

    stop.find().sort({_id:-1}).limit(1).exec( async (err,doc)=>{
      console.log(doc[0].key+1);
      const key=doc[0].key+1;
      try{
      const user = new stop({ key, title, location });
     await user.save();
     res.status(200).send(JSON.stringify("Success"));
      }
      catch (err) {
        res.status(422).send(JSON.stringify("Please Check data Duplication"));
      }
    })
   
 
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
      res.status(422).send(JSON.stringify("NO data Found"));
    });
});

module.exports = router;
