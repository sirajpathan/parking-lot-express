import {} from 'dotenv/config';
class ParkingLot {

	constructor () {
        this.MAX_PARKING_SLOTS = parseInt(process.env.SLOTS);
        if (isNaN(this.MAX_PARKING_SLOTS) || this.MAX_PARKING_SLOTS <= 0) {
			throw new Error('Correct value required to create parking slot');
		}
        this.parkingSlots = new Array(this.MAX_PARKING_SLOTS);
    }

    _getEmptySlot () {
        return this.parkingSlots.findIndex(slot => !slot);
	}

	/**
	 *
	 * @param {String} carNumber user's input via API param
	 * @description allocates nearest slot number to given car.
	 * It throws an error if parking lot is full.
	 */
    parkCar (carNumber) {
        var slot = this._getEmptySlot();
    	if (slot >= 0) {
            this.parkingSlots[slot] = carNumber;
            return {slot};
        } else {
            throw new Error('parking lot is full');
	  	}
    }
    
    leaveParking (slot) {
        try {
            this.parkingSlots[slot] = null;
            return "success";
        } catch (e) {
            return e;
        }
	}

	/**
	 *
	 * @param {String} carNumber user's input via API param
	 * @description it will return slot id for given car number.
	 * It throws an error if car not found.
	 */
	getDetailsByCar (carNumber) {
        const index = this.parkingSlots.indexOf(carNumber);
		if (index >= 0) {
			return {slot: index};
		}
		else {
			throw new Error('car with given registration is not found');
		}
    }

    /**
	 *
	 * @param {String | Number} slot user's input via API param
	 * @description it will return car number present on given slot.
	 * It throws an error if car not found.
	 */
	getDetailsBySlot (slot) {
		if (this.parkingSlots[slot]) {
			return {
				carNumber: this.parkingSlots[slot]
			};
		} else {
			throw new Error('car not found on given slot');
		}
	}
}

module.exports = ParkingLot;