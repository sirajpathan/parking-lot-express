import {} from 'dotenv/config';
import FileSync from './file-sync';
import Auth from './auth';
const auth = new Auth();

class ParkingLot extends FileSync {

	constructor () {
		super('./data/parking.json');

        this.MAX_PARKING_SLOTS = parseInt(process.env.SLOTS);
        this._init();
	}
	
	_init () {
		if (isNaN(this.MAX_PARKING_SLOTS) || this.MAX_PARKING_SLOTS <= 0) {
			throw new Error('Correct value required to create parking slot');
		}

		//Initialize with stored data in case of system failure
		const parkingData = this.getStoredData();
		if (parkingData && process.env.CLEAN_START !== "true") {
			this.parkingSlots = parkingData;
		} else {
			this.parkingSlots = new Array(this.MAX_PARKING_SLOTS);
		}
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
			this.updateFile(this.parkingSlots);
            return {slot};
        } else {
            throw new Error('parking lot is full');
	  	}
    }
    
	/**
	 *
	 * @param {String} slot user's input via API param
	 * @param {String} token collected from stored cookie
	 * @description it will return slot id for given car number.
	 * It throws an error if car number does not matches with decrypted token data.
	 * It throws an error if car not found.
	 */
	leaveParking (slot, token, res) {
		if (token && auth.decrypt(token) === this.parkingSlots[slot]) {
			if(this.parkingSlots[slot]) {
				this.parkingSlots[slot] = null;
				this.updateFile(this.parkingSlots);
				res.clearCookie('token');
				return 'success';
			} else {
				throw new Error('slot not found');
			}
		} else {
			throw new Error('not authorized to remove car from slot');
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