## Introduction

In this assignment, you will create both the front-end application and back-end server for an app about users who are all sharing their geographic location with each other

- The back-end consists of a web server in Node.js that will serve a web application's front-end files as well as provide a JSON API for retrieving and filtering data. 
- The front-end consists of a client interface to display the data on a Leaflet map as well as in a table along with some additional functionality for navigation and sorting.

## Objectives

By the end of this lab you will be able to:

- Create a Node.js server to serve files for a web application
- Create a Node.js server to serve JSON data based on URL query parameters
- Enhance your knowledge of front-end and back-end JavaScript

## Background

Recall that in JavaScript, an object can be defined literally:

```
let person = {
    name: "roscoe", 
    age: 21,
};
```

In this case, the person object has properties that can be accessed as person.name and person.age.

Also, recall that in JavaScript, an array can be defined literally:

```
let charList = ["a", "b", "c"];
```

In this case, the charList array elements can be accessed individually as ```charList[0]```, ```charList[1]```, etc.

Combining the two concepts, we can define a literal array of objects:

```
let people = [
  { name: "roscoe", age: 21},
  { name: "rhonda", age: 22},
];
```

We can access the first person's name as ```people[0].name```, etc.

## References

The following is helpful reference:

- Leaflet API Documentation: [https://leafletjs.com/reference.html](https://leafletjs.com/reference.html)
- Express API Documentation: [https://expressjs.com/en/api.html](https://expressjs.com/en/api.html)
- JavaScript Array Filter API: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## Assignment Project

The person tracker is a web application that shows the geographic location of people on a Leaflet map.  Information about the people themselves is provided by a JSON API that needs to be implemented.  

Your job is to:

- Create a web server that will host the files for the web application (HTML, CSS, JavaScript)
- Create a JSON API to retrieve people's locations.  Data consists of first name, last name, age, hometown, and current location (latitude and longitude).  The data for everyone is provided in a JavaScript file that must be imported (i.e. require) into your web server code.
- Write the JavaScript for the front-end to make AJAX calls to the server API to display everyone's location.

The provided data looks like:

```javascript
const personData =
[
    {
        firstname: 'Louise',
        lastname: 'Crawford',
        age: 69,
        hometown: 'Albuquerque',
        location: { lat: 37.89981315, lon: -109.25922002 }
    },
    {
        firstname: 'Jamie',
        lastname: 'Franklin',
        age: 71,
        hometown: 'Las Vegas',
        location: { lat: 35.19448987, lon: -91.94759849 }
    },
    {
        firstname: 'Lucas',
        lastname: 'Cooper',
        age: 63,
        hometown: 'Las Cruces',
        location: { lat: 38.46313691, lon: -79.11583311 }
    },
    .
    .
    .
    {
        firstname: 'Luis',
        lastname: 'Lawrence',
        age: 26,
        hometown: 'Lowell',
        location: { lat: 37.29978676, lon: -109.54877785 }
    }
];
module.exports = personData;
```

### Part 1 Read over the given files

See "Getting Started" below.  There are several files provided for you for the web application front-end as well as some files to start your server.  Read over these files and figure out how they work.  Ask you instructor any questions about the files' functionality before continuing.

### Part 2 Serving the web application

Your HTTP server must run using port 3000

All HTML and CSS for the Person Tracker web application is provided for you.  The front-end JavaScript (PersonTracker.js) is blank and requires you to complete the code for the front-end functionality.

Your web server must be able to serve these files to the browser via GET requests.  These files should be placed in a separate directory called 'srv'.  The default resource (e.g. '/') should be set to the PersonTracker.html.

For example:

- Navigating to http://localhost:3000 should serve up PersonTracker.html
- Navigating to http://localhost:3000/PersonTracker.js should serve the PersonTracker.js file
- etc.

If the user makes a request for a file that does not exist, your web server should send back a 404 Not Found error.  You are welcome, but not required, to create a custom 404 page or let the browser use the default.

NOTE: Once your web server is up and running do NOT run the PersonTracker.html from WebStorm.  WebStorm creates its own web server when you run your HTML from there.  For this lab, you are creating your own web server in Node.js.  Once your Node.js server is running, to access your web app, just navigate to: http://localhost:3000.

### Part 3 Serving the JSON data

In addition to the web app files, your HTTP server must support the following GET operations:

- Return information for everyone
  - http://localhost:3000/all
- Return the information for everyone with the first name of INPUT
  - http://localhost:3000/firstname?filtervalue=INPUT
- Return the information for everyone with the last name of INPUT
  - http://localhost:3000/lastname?filtervalue=INPUT
- Return the information for everyone whose age is INPUT
  - http://localhost:3000/age?filtervalue=INPUT
- Return the information for everyone whose hometown is INPUT
  - http://localhost:3000/hometown?filtervalue=INPUT

NOTE: the INPUT value is a ***query*** parameter (named 'filtervalue') in the requested resource in the request URL

INPUT values for firstname, lastname, and hometown must be a string of length > 0.  INPUT for age must be an integer greater than zero.  For all other requests, send back: 404 Not Found HTTP response.

NOTE: it is NOT acceptable to return 404 if the INPUT for firstname, lastname, age, and hometown is empty.

If the operation is successful the result must be formatted as a JSON string as follows:

```json
{
    "status": "success",
    "length": LENGTH,
    "values": VALUE[],
}
```

The values in the JSON response indicate:

- status "success" - that the request was successful
- LENGTH is the number of person information entries found
- VALUE[] is the array of person information entries found

The data returned in the 'values' array should be formatted exactly as is in the personData array, however, must be filtered based on the request.

If an invalid value is specified, the response must be a JSON string formatted as follows: 

```json
{
    "status": "error",
    "message": ERRORMESSAGE,
}
```

The values in the JSON response indicate:

- status "error" - that the request was unsuccessful
- ERRORMESSAGE is a string containing an error message – choose an appropriate message for the error

You must validate the query string input, return an error message if the input is not valid.

NOTE:
- White space in the response is not important. 
- For string filters, all filter values are to be CASE INSENSITIVE and return results if the search string is contained in any SUBSTRING of the searched value. 
- For age filter, the search must be an exact match for the age.

Here are some example requests and responses:

Request: http://localhost:3000/firstname?filtervalue=jo

Response:

```json
{
    "status":"success",
    "length":2,
    "values":[
        {
            "firstname":"Joan",
            "lastname":"King",
            "age":55,
            "hometown":"Seagoville",
            "location":{
                "lat":40.89938144,
                "lon":-82.94638411
            }
        },
        {
            "firstname":"Johnni",
            "lastname":"Bailey",
            "age":55,
            "hometown":"Cedar Rapids",
            "location":{
                "lat":40.11841772,
                "lon":-95.85283063
            }
        }
    ]
}
```

Request: http://localhost:3000/age?filtervalue=67

Response:

```json
{
    "status":"success",
    "length":3,
    "values":[
        {
            "firstname":"Marion",
            "lastname":"Gordon",
            "age":67,
            "hometown":"Mobile",
            "location":{
                "lat":37.28787485,
                "lon":-119.88481544
            }
        },
        {
            "firstname":"Byron",
            "lastname":"Mendoza",
            "age":67,
            "hometown":"Santa Rosa",
            "location":{
                "lat":34.3970049,
                "lon":-108.47112226
            }
        },
        {
            "firstname":"Floyd",
            "lastname":"Hunt",
            "age":67,
            "hometown":"Elizabeth",
            "location":{
                "lat":46.6446959,
                "lon":-117.71067593
            }
        }
    ]
}
```

Request: http://localhost:3000/lastname?filtervalue=aafdsafdsaf

Response:

```json
{
    "status":"success",
    "length":0,
    "values":[]
}
```

Request: http://localhost:3000/age?filtervalue=-1

Response:

```json
{
    "status":"error",
    "message":"Filter value must be a number > 0"
}
```

Request: http://localhost:3000/firstname?filtervalue=

Response:

```json
{
    "status":"error",
    "message":"Filter value is required"
}
```

### Part 4 The Person Tracker Web User Interface

You have been given the HTML and CSS files that import the Leaflet and Bootstrap files along with set the page layout and formatting for the person tracker user interface.

In this part of the project, you will need to write the JavaScript for the front-end of the person tracker.

1. Implement the JavaScript code to create AJAX (i.e. fetch) requests to invoke the correct end-point of the JSON API based on the current filter selection and filter value.<br/>
NOTE: If the user selects the "Show All" radio button then the text input field for the filter must be disabled.  It should be re-enabled when the user selects a filter.
2. Resolve the response and use the JSON response to set markers on the map for each person
   - The name of the person must be displayed persistently below the marker (e.g. permanent tooltip)
   - When the marker is clicked the hometown of the person should appear in the popup (e.g. leaflet popup)
   - NOTE: Old marker ***MUST*** be removed from the map
3. Set the information in the table below the map to each person in the JSON response
4. If you receive an error from the server 
   - Clear the map - remove all markers 
   - Clear the table - remove all rows 
   - Hide/Disable the sorting interface (see below)
   - Display an error message - you are given a 'div' element with ID "messages" to help out with this

NOTE: Input validation must be performed on your ***Node.js server***.  Do ***NOT*** perform input validation on the client.

In addition to the functionality to retrieve and display filtered person data the person tracker front-end must also support:

- Sorting - allow the user to sort the table below the map by name, age, or hometown 
  - This should be allowed to sort ascending or descending 
  - A user interface including drop down menus and a sort button is provided for you. 
  - The name displayed in the table combines the first and last name into a single string.  Your sort routine should treat this as a single string 
  - The name and hometown should be string sorted 
  - Age should be numerically sorted (not string sorted)
  - The sort interface should be hidden or disabled and only displayed when the table contains data 
- Center the map on the person when clicking on their corresponding row in the table

NOTE: While the interface for sorting is provided for you, you are welcome to change it provided the required functionality is met.  You are free to use other tables (e.g. [Google table chart](https://developers.google.com/chart/interactive/docs/gallery/table)) or other third party libraries.

If using an external library make sure you:
- Document where you got the library
- Give a short description of the library

## Getting Started

Create a WebStorm project for this assignment.  In the project you will need the files included in the repository:

- [PersonData.js](src/PersonData.js) - JavaScript source that exports the person tracker data
- [PersonServer.js](src/PersonServer.js) - JavaScript source for the static and API server
- [srv/PersonTracker.js](src/srv/PersonTracker.js) - JavaScript source file for the PersonTracker front-end code
- [srv/PersonTracker.html](src/srv/PersonTracker.html) - HTML source file for the PersonTracker front-end code
- [srv/PersonTracker.css](src/srv/PersonTracker.css) - CSS source file for the PersonTracker front-end code
- [package.json](src/package.json) - an NPM package file containing dependencies for the project

NOTE: The server requires the use of ```express```.  A ```package.json``` file is provided for you.  To set up your project run: ```npm install```.

At the top of EACH FILE include a comment block with your name, assignment name, and section number.

The provided HTML is a starting point.  Feel free to modify the structure and styling as you like.  Just make sure your application meets the required functionality.

Possible changes you might want to make:

- Reorganize the user interface
- Move the map to a different place on the page
- Change the map size
- Alter other styling of the table, buttons, input field, etc.

### Using a Google Table Chart

For this assignment, you are required to use a table to display the person data.  The Google charts library contains an object for 'charting' a table.  Instead of using an HTML table, you are welcome to use a [Google Table Chart](https://developers.google.com/chart/interactive/docs/gallery/table) provided all the requirements for the table are met.

## Hints and Tips

- Using express makes serving static files very easy 
- These functions can be helpful for doing case-insensitive filtering:
  - toLowerCase() - https://www.w3schools.com/jsref/jsref_tolowercase.aspLinks to an external site. 
  - includes() - https://www.w3schools.com/jsref/jsref_includes.aspLinks to an external site. 
- Using the isInputInteger function from previous labs can be helpful for checking for a valid age:

  ```javascript
  const isInputAnInteger = (value) => {
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
  ```

- To determine the target for an event you can use a feature built into DOM event handlers.  Each event handler is given an optional parameter representing the event itself.  You can use this object to determine information about the event.  For example, the following code sets an event handler for a click event on all table rows and uses the event object to retrieve the target DOM element of the event:

  ```javascript
  const tableRows = document.getElementsByTagName("tr");
  for(const row of tableRows) {
      row.onclick = ((event) => {
          const eventTarget = event.currentTarget;
          console.log(eventTarget);
      });
  }
  ```

  In this case eventTarget is set to the DOM element for the table row (the target of the click event).  Use this to help you determine which table row the user clicked on in order to pan to the map to the correct location.
- Bootstrap provides class called visually-hidden which can be used to easily show and hide DOM elements.  Using the add and remove function on the elements class list can be helpful.  The starter HTML file already makes use of this to hide the error message display and the sorting interface. <br/>
  For example:
  - To hide a DOM element - add the visually-hidden class:
  
    ```javascript
    element.classList.add('visually-hidden');
    ```

  - To show a DOM element - remove the visually-hidden class:

    ```javascript
    element.classList.remove('visually-hidden');
    ```

- The people in the database are positioned all over the United States.  Initially position your map in the center of the US with a zoom factor that shows the whole US, use the following:
  - Initial Position: [39.8283, -98.5795]
  - Initial Zoom Factor: 4 
- Leaflet composes maps via layers.  These layers can have elements (e.g. markers) independently added and cleared.  Use this to help you position markers and then clear them.  In other words, place markers on a layer and then clear the layer to remove the markers. 
  - Add a layer to your map:

    ```javascript
    const markerLayer = L.layerGroup().addTo(map);
    ``` 

  - Add a marker to the markerLayer instead of the map:

    ```javascript
    L.marker(position).addTo(markerLayer);
    ``` 

  - Clear the markers by clearing the markerLayer:

    ```javascript
    markerLayer.clearLayers();
    ``` 

- You can use the map.panTo function to center the map on a specific latitude and longitude.

  ```javascript
  const position = [ 37.89981315, -109.25922002 ]
  map.panTo(position);
  ```
  
## Frequently Asked Questions

- Q: Can I modify the HTML to change around the formatting and/or element locations?
  - A: Yes, provided that the required functionality is still there 
- Q: Can I use a different table than an HTML table, e.g. a Google charts table? 
  - A: Yes, provided that the required functionality is still there 
    - The table must be sortable as described above 
    - The map must pan to the correct location when a row is clicked
- Q: Can I modify or create my own sorting interface? 
  - A:Yes, provided that the required functionality is still there
      - Sorting directions and types must be the same as described above
      - Sorting must be hidden or disabled when the table contains no rows or there is an error

## Deliverables

When you are ready to submit your assignment:

- Make sure your name, assignment name, and section number are in comments on ***ALL*** HTML, CSS, and JS file(s).
- ALSO, include in your source file(s) a set of suggestions for improvement and/or what you enjoyed about this assignment.
- Make sure your assignment code is commented thoroughly.
- Make sure all files are committed and pushed to the main branch of your repository.

NOTE: If/when using resources from material outside what was presented in class (e.g., Google search, Stack Overflow, etc.) document the resource used in your submission.  Include exact URLs for web pages where appropriate.

To submit, create a new release on your repository to tag it as being ready to submit.  Copy the URL for the release and submit the link to Canvas.

## Grading Criteria (85 Points)

- (5 Points) Correct Submission - Followed submission instructions (e.g. files are updated with name, assignment, section, sources are cited, etc.)
- (5 Points) Suggestions - a list of suggestions for improvement and/or what you enjoyed about this assignment
- (10 Points) Code Structure
  - Readable code/file structure
  - Code is well documented
- (15 Points) Server Side Response Format
  - Correct server response format 
- (10 Points) Server Side Error Checking
  - Correct server side error checking of query parameters and routes 
- (10 Points) Server Side Error Messages
  - Error messages returned by the server make sense 
- (10 Points) Client side - Map behavior
  - Previous error message is cleared
  - Old map markers are removed
  - New map markers are placed in the correct position
  - Map markers have the correct labeling 
- (10 Points) Client side - Table Behavior
  - Previous error message is cleared
  - Table rows are replaced with new data
  - Clicking on a table row pans the map to the correct location
  - Table can be sorted as required 
- (10 Points) Client side - Error Handling
  - When an error is returned or fetch fails:
  - Map is cleared
  - Table is cleared and sorting is hidden/disabled
  - Error message is displayed