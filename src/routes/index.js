var express = require('express');
var router = express.Router();
import ParkingLot from "../module/parking";
const parkingLot = new ParkingLot();

router
	.delete('/slot/:id', function (req, res, next) {
		const response = parkingLot.leaveParking(req.params.id, req.cookies.token, res);
		res.send(response);
	})
	.post('/park', function (req, res, next) {
		const response = parkingLot.parkCar(req.body.carNumber);
		res.send(response);
	})
	.get('/details', function (req, res, next) {
		const response = req.query.number ?
			parkingLot.getDetailsByCar(req.query.number) : parkingLot.getDetailsBySlot(req.query.slot);
		res.send(response);
	});

module.exports = router;
