// Class: SE2840 - Bus Tracker
// Name: Paige Rosynek
// Class Section: 031

/**
 * EXTRA FEATURES ADDED
 *      1. custom marker icons for buses
 *      2. access and mark user's current location if user allows location access
 *      3. remove all markers from map on stop button click & on error
 *      4. highlight bus markers for route when user clicks on bus
 */

const MCTS_KEY = "SeepSDr5HMSWGFKvbi3FLKExU";                                               // MCTS key 
const DEFAULT_COORDINATES = [43.03525, -87.90809];                                          // latitude/longitude of MKE public market
const MCTS_BASE_URL = `https://msoe-web-apps.appspot.com/BusInfo?key=${MCTS_KEY}&rt=`;      // request url
const FEET_TO_MILE = 5280;
let timer = null;       
let map = null;
let markers = [];           // list of markers on map
let markerLayer = null;     // layer group containing all markers

/**
 * Updates the map and table with JSON response from successful MCTS API request.
 * Sets an interval timer to request updated information every 5 seconds, if not already started.
 * 
 * @param {*} response : JSON response object from API request
 */
const onSuccess = (response) => {
    document.getElementById('error').style.visibility = 'hidden';           // hide error
    updateMap(response);                                                                                                    
    updateTable(response);

    // set timer to retrieve bus locations every 5 seconds only if timer hasn't been started already
    if(timer === null) {
        timer = setInterval(requestMCTS, 5000);
    }
};

/**
 * !EXTRA FEATURE! - remove markers on error
 * 
 * On error during fetch request, destroy table, stop updating (stop timer), and remove all markers from the map.
 * Then display error message to user.
 * 
 * @param {*} error : error message to display to user
 */
const onError = (error) => {
    document.getElementById('table-header').style.visibility = 'hidden';    // hide table header
    destroyTable();                                                         
    const errorObj = document.getElementById('error');
    errorObj.innerText = error; 
    errorObj.style.visibility = 'visible';                                  // display error message
    stopHandler();                                                          // stop timer & remove markers
};


/**
 * Make fetch request to MCTS API using the route entered by the user.
 */
const requestMCTS = () => {
    const route = document.getElementById('route').value;
    const requestURL = `${MCTS_BASE_URL}${route}`;

    // 1st then - get JSON response object
    // 2nd then - on successful load of data
    // catch - on error ocurred
    fetch(requestURL)
	    .then(response => { 
            if (response.ok === false) {
                throw new Error(`[ ! ] response error: ${response.status}: ${response.statusText}`);
            }
            else {
                return response.json();
            }
        })      
	    .then(data => {
            // if error in API response
            if (data['bustime-response']['error']) {
                throw new Error(`${data['bustime-response']['error'][0]['msg']}`);
            }
            else {
                // on successful load of data
                onSuccess(data);
            }
        })
        .catch(error => onError(error));
};


/**
 * Removes (deletes) all child elements of the table body
 * removeChild() reference : https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
 */
const destroyTable = () => {
    const tablebody = document.getElementById('tablebody');
    while (tablebody.firstChild) {
        tablebody.removeChild(tablebody.lastChild);
    }
};


/**
 * Updates the HTML table with the JSON response data from the API request.
 * 
 * @param {*} response : JSON response object from API request
 */
const updateTable = (response) => {
    destroyTable();     // delete table body

    // get buses list
    const vehicles = response['bustime-response']['vehicle'];
    
    // set route table header
    document.getElementById('routeid').innerText = `Route ${vehicles[0]['rt']}`;

    // make header visible
    document.getElementById('table-header').style.visibility = 'visible';

    const table = document.getElementById('tablebody');
    vehicles.forEach((obj) => {
        const row = document.createElement('tr');
        const bus = document.createElement('td');
        bus.innerText = obj['vid'];

        const dest = document.createElement('td');
        dest.innerText = obj['des'];

        const latitude = document.createElement('td');
        latitude.innerText = obj['lat'];

        const longitude = document.createElement('td');
        longitude.innerText = obj['lon'];

        const speed = document.createElement('td');
        speed.innerText = obj['spd'];

        const distance = document.createElement('td');
        distance.innerText = (Number(obj['pdist']) / FEET_TO_MILE).toString();      

        // append table cells to row
        row.appendChild(bus);
        row.appendChild(dest);
        row.appendChild(latitude);
        row.appendChild(longitude);
        row.appendChild(speed);
        row.appendChild(distance);

        // append row to table body
        table.appendChild(row);     
    });

    document.getElementById('table').style.visibility = 'visible';  // show table
};


/**
 * !EXTRA FEATURE!
 * Highlights all markers with the route of the clicked on marker.
 * 
 * NOTE : this only highlights existing markers, if markers with the same route are added from updateMap(),
 * then they will NOT be highlighted. I left it like this because it allows the user to better see where the updated
 * markers are. Also if this doesn't count as extra credit, that's ok.
 * 
 * @param {*} obj : marker object that was clicked on
 */
const highlightRoute = (obj) => {
    const route = obj['target']['_popup']['_content'];

    for (let i = 0; i < markers.length; i++) {
        if (markers[i].getPopup().getContent() === route) {
            markers[i]._icon.style.filter = "hue-rotate(120deg)"
        }
    }
};


/**
 * !EXTRA FEATURE! - uses custom markers
 * 
 * Updates the Leaflet map with the JSON response data from the API request.
 * 
 * @param {*} response : JSON response object from API request
 */
const updateMap = (response) => {
    // get buses list
    const vehicles = response['bustime-response']['vehicle'];

    vehicles.forEach((obj) => {
        const coordinates = [obj['lat'], obj['lon']];

        // add custom marker to map
        const busIcon = L.icon({
            iconUrl : 'bus-stop.png',
            iconSize : [60, 60]
        });        
        
        const marker = L.marker(coordinates, {icon : busIcon}).addTo(map);
        marker.bindTooltip(`${obj['vid']}`, {permanent:true}).openTooltip();        // add bus number to marker
        marker.bindPopup(`${obj['rt']}`).on('click', (e) => highlightRoute(e));     // when marker clicked, highlight route markers & display route
        markers.push(marker);                                                       // store marker
        markerLayer = L.layerGroup(markers);
        markerLayer.addTo(map);                                                     // add markers to map
    });
};


/**
 * !EXTRA FEATURE! - removes all markers from the map
 * 
 * Remove all markers from the map
 */
const removeMarkers = () => {
    if (markers.length !== 0) {
        markerLayer.clearLayers();
    }
};


/**
 * !EXTRA FEATURE! - gets user's geolocation and marks it on the map if user allows for location access
 * 
 * Initializes Leaflet map. Default coordinates are set for MKE Public Market, but if the user allows for 
 * the app to access their location the map will use the user's current coordinates and place a marker on 
 * the map.
 */
const mapSetUp = () => {    
    // set map view to default coordinates
    map = L.map('map').setView(DEFAULT_COORDINATES, 11);

    // get user's current location
    map.locate({setView: true, maxZoom: 11});

    // if location found, mark it on map, otherwise stay at default coordinates
    map.on('locationfound', (e) => {
        const marker = L.marker(e.latlng).addTo(map).bindPopup('YOU ARE HERE').openPopup();
        markers.push(marker);
    });

    // add map view
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 15,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
};


/**
 * Stops update interval timer
 */
const stopTimer = () => {
    clearInterval(timer);
    timer = null;
};

/**
 * Handler for stop button click. 
 */
const stopHandler = () => {
    removeMarkers();
    stopTimer();
    document.getElementById('route').disabled = false;   // enable route field
    document.getElementById('start').disabled = false;   // enable start button
    document.getElementById('stop').disabled = true;     // disable stop button
    markers = [];                                        // empty markers
};

/**
 * Handler for start button click.
 */
const startHandler = () => {
    requestMCTS();  
    document.getElementById('route').disabled = true;   // disable route field
    document.getElementById('start').disabled = true;   // disable start button
    document.getElementById('stop').disabled = false;   // enable stop button
};


/**
 * Initializes web app.
 */
const init = () => {
    if(timer !== null) {
        stopTimer();
    }

    mapSetUp();                                                     // initialize map
    document.getElementById('route').value = '';                    // clear input field
    document.getElementById('error').style.visibility = 'hidden';
    document.getElementById('table').style.visibility = 'hidden';

    const stop = document.getElementById('stop')                    // stop button disabled 
    stop.disabled = true;
    stop.onclick = stopHandler;                                     // set event handler (onclick)

    const start = document.getElementById('start');       
    start.disabled = false;                                         // start button enabled
    start.onclick = startHandler;                                   // set event handler (onclick)         
};


/**
 * Window load event handler
 *    Initialize the web app and set up event handlers
 */
window.onload = () => {
    init();
};
