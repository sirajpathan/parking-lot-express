import {} from 'dotenv/config';
import Auth from './auth';

class RequestValidator extends Auth {

	constructor () {
        super();
        this.MAX_REQUESTS = process.env.MAX_REQUESTS;
        this.REQUEST_DURATION = process.env.REQUEST_DURATION;
        this.userRequests = {};
        setInterval(this._removeOldEntries, 5000);
    }

    _removeOldEntries () {
        for(let i in this.userRequests) {
            this.userRequests[i] = this.userRequests[i].filter(request => {
                return request > (Date.now() - (this.REQUEST_DURATION * 1000));
            });
            if (this.userRequests[i].length == 0) {
                delete this.userRequests[i];
            }
        }
    }
    _getIpAddress (address) {
        if (address.substr(0, 7) == "::ffff:") {
            address = address.substr(7)
        }
        return address;
    }
    _validate (ip) {
        ip = this._getIpAddress(ip);
        if (!this.userRequests[ip]) {
            this.userRequests[ip] = [Date.now()];
            return true;
        } else {
            this.userRequests[ip].push(Date.now());
            this.userRequests[ip] = this.userRequests[ip].filter(request => {
                return request > (Date.now() - (this.REQUEST_DURATION * 1000));
            });
            return this.userRequests[ip].length <= this.MAX_REQUESTS;
        }
    }

    validator (req, res, next) {
        //authenticate for the first request and store token in cookie
        if (req.method === 'POST' && req.path === '/park' && req.body.carNumber) {
            if (req.cookies.token) {
                throw new Error('you have already parked one car');
            }
            res.cookie('token', this.encrypt(req.body.carNumber), { maxAge: 86400000, httpOnly: true });
        }
        if (this._validate(req.connection.remoteAddress)) {
            next();
        } else {
            throw new Error('Sorry, you have exceeded maximum request limit');
        }
    }
}

module.exports = RequestValidator;