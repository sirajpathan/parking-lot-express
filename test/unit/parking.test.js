import ParkingLot from "../../src/module/parking";
import Auth from "../../src/module/auth";

describe('ParkingLot normal flow', () => {

	process.env.SLOTS = 10;
	process.env.CLEAN_START = 'true';
	const parkingLot = new ParkingLot();
	const auth = new Auth();

	test('should initialize class with given slots', () => {
		expect(parkingLot.parkingSlots.length).toBe(10);
	});

	test('should return slot id as 0', () => {
		const response = parkingLot.parkCar("MH03D7447");
		expect(response.slot).toBe(0);
	});

	test('should return slot id as 0', () => {
		const response = parkingLot.getDetailsByCar("MH03D7447");
		expect(response.slot).toBe(0);
	});

	test('should return correct car number', () => {
		const response = parkingLot.getDetailsBySlot(0);
		expect(response.carNumber).toBe('MH03D7447');
	});

	test('should return success after removing data from slot', () => {
		const res = {
			clearCookie: jest.fn()
		}
		const response = parkingLot.leaveParking(0, auth.encrypt('MH03D7447'), res);
		expect(response).toBe('success');
	});

});


describe('ParkingLot incoorect environment variables', () => {

	const parkingLot = new ParkingLot();
	test('should return error for incorrect environment variables', () => {
		try {
			parkingLot.leaveParking(9999);
		} catch (e) {
			expect(e.message).toBe('not authorized to remove car from slot');
		}
	});

});

describe('ParkingLot negative flow', () => {
	process.env.SLOTS = 0;
	process.env.CLEAN_START = 'true';
	
	test('should initialize class with given slots', () => {
		let parkingLot;
		try {
			parkingLot = new ParkingLot();
		} catch (e) {
			expect(e.message).toBe('Correct value required to create parking slot');
		}
		expect(parkingLot).toBe(undefined);
	});

});