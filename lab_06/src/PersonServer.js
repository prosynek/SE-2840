// Class: SE2840 - Person Tracker
// Name: Paige Rosynek
// Class Section: 031

const express = require('express');                 // import the express package
const personData = require('./PersonData.js');      // import person data
const SRV_DIRECTORY = `${__dirname}/srv`;           // path to srv directory
const PORT_LISTEN = 3000;                           // port to listen on

// create a new express application
const app = express();

// instruct the app to listen on port 3000
app.listen(PORT_LISTEN, () => {
    console.log("Server is running at http://localhost:3000");
});

// set a static route for all resources that don't have an explicit route
//   to use the static directory - set home/load page to tracker
app.use(express.static(SRV_DIRECTORY, { index: 'PersonTracker.html' }));

/**
 * Handler for '/all' endpoint - displays all person data
 *
 */
app.get('/all', (request, response) => {
    const result = {
        'status' : 'success',
        'length' : personData.length,
        'values' : personData,
    };

    response.json(result);
});

/**
 * Handler for '/firstname' endpoint - displays all person data where firstname is input (query param)
 *
 */
app.get('/firstname', (request, response) => {
    // get filter query parameter
    const filter = request.query.filtervalue;

    let result;
    if (filter === '') {
        // filter value not provided
        result = {
            'status' : 'error',
            'message' : 'Filter value is required.'
        };
    }
    else if (!isNaN(filter)) {
        // filter value is a number
        result = {
            'status' : 'error',
            'message' : 'Filter value must be a string.'
        };
    }
    else {
        // valid - get filtered data
        const filtered = filterBySubstring('firstname', filter);

        result = {
            'status' : 'success',
            'length' : filtered.length,
            'values' : filtered,
        };
    }

    response.json(result);
});

/**
 * Handler for '/lastname' endpoint - displays all person data where lastname is input (query param)
 *
 */
app.get('/lastname', (request, response) => {
    // get filter query parameter
    const filter = request.query.filtervalue;

    let result;    
    if (filter === '') {
        // filter value not provided
        result = {
            'status' : 'error',
            'message' : 'Filter value is required.'
        };
    }
    else if (!isNaN(filter)) {
        // filter value is a number
        result = {
            'status' : 'error',
            'message' : 'Filter value must be a string.'
        };
    }
    else {
        // valid - get filtered data
        const filtered = filterBySubstring('lastname', filter);

        result = {
            'status' : 'success',
            'length' : filtered.length,
            'values' : filtered,
        };
    }

    response.json(result);
});

/**
 * Handler for '/age' endpoint - displays all person data where age is input (query param)
 *
 */
app.get('/age', (request, response) => {
    // get filter query parameter
    const filter = request.query.filtervalue;

    let result;
    if (filter === '') {
        // filter value not provided
        result = {
            'status' : 'error',
            'message' : 'Filter value is required.'
        };
    }
    else if (!isInteger(filter)) {
        // if not an integer
        result = {
            'status' : 'error',
            'message' : 'Filter value must be an integer.'
        };
    }
    else if (filter <= 0) {
        // filter value is less than or equal to 0
        result = {
            'status' : 'error',
            'message' : 'Filter value must be an integer > 0.'
        };
    }
    else {
        // valid - get filtered data
        const filtered = filterByValue('age', parseInt(filter));

        result = {
            'status' : 'success',
            'length' : filtered.length,
            'values' : filtered,
        };
    }

    response.json(result);
});

/**
 * Handler for '/hometown' endpoint - displays all person data where hometown is input (query param)
 *
 */
app.get('/hometown', (request, response) => {
    // get filter query parameter
    const filter = request.query.filtervalue;

    let result;
    if (filter === '') {
        // filter value not provided
        result = {
            'status' : 'error',
            'message' : 'Filter value is required.'
        };
    }
    else if (!isNaN(filter)) {
        // filter value is a number
        result = {
            'status' : 'error',
            'message' : 'Filter value must be a string.'
        };
    }
    else {
        // valid - get filtered data
        const filtered = filterBySubstring('hometown', filter);

        result = {
            'status' : 'success',
            'length' : filtered.length,
            'values' : filtered,
        };
    }

    response.json(result);
});

/**
 * Handler for all endpoints that are not defined - page not found
 */
app.all('*', (request, response) => {
    response.status(404).json(
        {
            'status': 'error',
            'message': 'HTTP 404 Not Found',
        });
});

/**
 * Filters the JSON response data by 'key' values that contain the substring 'filterVal'.
 * Substring match is cae insensitive.
 * 
 * @param {*} key : JSON field (key) to filter JSON objects by
 * @param {*} filterVal : value of query parameter, substring to filter by
 * @returns JSON object containing filtered results
 */
const filterBySubstring = (key, filterVal) => {
    const results = personData.filter((item) => {
        return item[key].toLowerCase().includes(filterVal.toLowerCase());
    });

    return results;
};

/**
 * Filters the JSON response data by 'key' values that match the value 'filterVal' (exact match).
 * 
 * @param {*} key : JSON field (key) to filter JSON objects by
 * @param {*} filterVal : value of query parameter, value to filter by
 * @returns JSON object containing filtered results
 */
const filterByValue = (key, filterVal) => {
    const results = personData.filter((item) => {
        return item[key] === filterVal;
    });

    return results;
};

/**
 * Determines if a value is an integer - provided by Dr. Lembke
 * 
 * @param {*} value : value to check whether is an integer
 * @returns true if value is integer, false otherwise
 */
const isInteger = (value) => {
    // Make sure the input string is a number
    if(isNaN(value)) {
        return false;
    }

    // We now know the string contains a number, but is it an integer?
    // Parse the string to a float (decimal with precision) and then verify that it is an integer
    if(!Number.isInteger(parseFloat(value))) {
        return false;
    }

    // The input string is a number and an integer
    return true;
}