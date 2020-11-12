import ParkingLot from "../../src/module/parking";
const parkingLot = new ParkingLot();

test('adds 1 + 2 to equal 3', () => {
  const response = parkingLot.parkCar("MH03D7447");
  expect(response.slot).toBe(0);
});