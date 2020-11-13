import Auth from "../../src/module/auth";

describe('Auth normal flow', () => {
	const auth = new Auth();

	test('should decrypt car number correctly', () => {
		let string = 'MH03D7447';
		const cipherText = auth.encrypt(string);
		expect(auth.decrypt(cipherText)).toBe(string);
	});

});