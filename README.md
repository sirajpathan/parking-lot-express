# parking-lot-express
Parking lot APIs in express js

## Description
This project will create parking lot server on port 3000. User can make request to POST API to assign car number to empty slot and the API will return slot number along with token for basic authentication. Same token will be used for removing car from given slot number. <br>
User can also get car number or slot number by making GET request to /details API<br>

## Security
For all the endpoints requests are filtered with the help of IP address. Which means if user try to make more than 10 requests to the API within 10 seconds then it will throw an error.<br><br>
User who has made request to POST- /park endpoint will have token, stored in the form of cookie on his browser/application. The same token will be used to validate DELETE - /slot/{id} request. If cookie is not valid or unavailable then unauthorized error will be thrown.

## Start server
``` bash
# install dependencies
npm i
```

``` bash
# start server
# this command is also used to start server from data present in parking.json
npm run start
```

``` bash
# to start server by skipping data present in json file
npm run clean-start
```

``` bash
# to run test cases
npm t
```


## API details
This contains below APIs to park, unpark and get information about parked car. You can get Postman collection from this file *./parking-lot.postman_collection.json*
```API
POST - /park 
GET - /details?slot={slot-number} /details?number={car-number} 
DELETE - /slot/{id}
```