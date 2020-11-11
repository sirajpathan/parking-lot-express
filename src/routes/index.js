var express = require('express');
var router = express.Router();
import ParkingLot from "../module/parking";
const parkingLot = new ParkingLot();

router
  .post('/slot/:id', function(req, res, next) {
    res.send("response");
  });

module.exports = router;
