import crypto from 'crypto';

class Auth {

    constructor () {
        this.ENCRYPTION_KEY = '1234567890qwertyuiopasdfghjklqwe';
        this.IV_LENGTH = 16;
    }

    encrypt (text) {
        let iv = crypto.randomBytes(this.IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt (data) {
        let textParts = data.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}
module.exports = Auth;
