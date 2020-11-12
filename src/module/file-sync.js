import fs from 'fs';
import path from 'path';

class FileSync {

    constructor (file) {
        this.file = path.resolve(file);
    }

    updateFile (data) {
        fs.writeFileSync(this.file, JSON.stringify(data), {encoding: 'utf8'});
    }

    getStoredData () {
        const data = fs.readFileSync(this.file, {encoding: 'utf8'});
        return data ? JSON.parse(data) : false;
    }
}
module.exports = FileSync;