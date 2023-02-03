// Class: SE2840 - Person Tracker
// Name: Paige Rosynek
// Class Section: 031

// define constants & global variables
const DEFAULT_COORDINATES = [39.8283, -98.5795]
const DEAFULT_ZOOM = 4;
const ALL_ENDPOINT = '/all';
const FIRSTNAME_ENDPOINT = '/firstname';
const LASTNAME_ENDPOINT = '/lastname';
const HOMETOWN_ENDPOINT = '/hometown';
const AGE_ENDPOINT = '/age';
let map = null;
let markerLayer = null;

/**
 * Handler for AJAX response error.
 * Clears map markers, clears the table, & displays an error message to the user
 * 
 * @param {*} msg : error message to be displayed
 */
const onError = (msg) => {
    // clear map markers
    markerLayer.clearLayers();

    // clear table
    destroyTable();

    // hide table header
    const header = document.getElementById('table-header');
    header.style.visibility = 'hidden';


    // hide/disable sorting
    document.getElementById('sortControl').style.visibility = 'hidden';

    // display error message
    const error = document.getElementById('messages');
    error.innerText = msg;
    document.getElementById('messages').style.visibility = 'visible';
};

/**
 * Handler for AJAX response success.
 * Updates the map markers, updates the table, and displays sort controls.
 * 
 * @param {*} response : JSON response object
 */
const onSuccess = (response) => {
    // hide error if visible
    document.getElementById('messages').style.visibility = 'hidden';

    // show sort options
    document.getElementById('sortControl').style.visibility = 'visible';
    
    // update map
    updateMap(response);

    // update table
    updateTable(response);
};

/**
 * Makes AJAX fetch request to nodejs server using the given endpoint & query parameter
 * 
 * @param {*} endpoint : endpoint to route to
 * @param {*} filter : query parameter 'filtervalue' value, null if endpoint is '/all'
 */
const makeRequest = (endpoint, filter) => {
    const url = (filter === null) ? `${endpoint}` : `${endpoint}?filtervalue=${filter}`;

    fetch(url)
        .then(response => {
            // return JSON object
            return response.json();     
        })
        .then(responseText => {
            if (responseText.status === 'error') {
                // error in server response
                onError(responseText.message);
            }
            else {
                // successful request
                onSuccess(responseText);
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
 * Updates (creates) the HTML table with JSON response data (person data)
 * 
 * @param {*} response : JSON response object
 */
const updateTable = (response) => {
    // clear table
    destroyTable();

    const table = document.getElementById('tablebody');

    // create table
    response.values.forEach((item) => {
        const row = document.createElement('tr');          
        const name = document.createElement('td');
        name.innerText = `${item.firstname} ${item.lastname}`;

        const age = document.createElement('td');
        age.innerText = item.age;

        const htown = document.createElement('td');
        htown.innerText = item.hometown;

        // append table cells to row
        row.appendChild(name);
        row.appendChild(age);
        row.appendChild(htown);

        // append row to table body
        table.appendChild(row);
        
        // set click event for each table row 
        row.onclick = () => {
            map.panTo(item.location);
        };
    });

    // show table header
    const header = document.getElementById('table-header');
    header.style.visibility = 'visible';
};

/**
 * Sorts the current HTML table data according to the selected sort controls.
 * reference: https://www.tutorialspoint.com/how-to-sort-an-html-table-using-javascript
 */
const sortTable = () => {
    const sortBy = document.getElementById('sortType').value;                 // what to sort by
    const sortDirection = document.getElementById('sortDirection').value;     // direction - increasing or decreasing

    let col;  // column index
    switch (sortBy) {
        case 'name':
            col = 0;
            break;
        case 'age':
            col = 1;
            break;
        case 'hometown':
            col = 2;
            break;
    }

    const table = document.getElementById('table');

    // reference: https://www.tutorialspoint.com/how-to-sort-an-html-table-using-javascript
    let sorted = true;
    let rows, swap, top, btm, i;
    while (sorted) {
        sorted = false;
        rows = table.rows;
        
        // i = 0 is table header
        for (i = 1; i < rows.length - 1; i++) {
            swap = false;
    
            // look at two rows subsequent rows
            top = rows[i].getElementsByTagName('td')[col];
            btm = rows[i + 1].getElementsByTagName('td')[col];

            if (sortDirection === 'inc') {
                // sort increasing - low to high
                if (index === 1) {
                    // sort by age - numerical compare
                    if (Number(top.innerText) > Number(btm.innerHTML)) {
                        swap = true;
                        break;
                    }
                }
                else if (top.innerText.toLowerCase() > btm.innerHTML.toLowerCase()) {
                    // sort alphabetical a -> z
                    swap = true;
                    break;
                }
            }
            else if (sortDirection === 'dec') {
                // sort decreasing - high to low 
                if (index === 1) {
                    // sort by age - numerical compare
                    if (Number(top.innerText) < Number(btm.innerHTML)) {
                        swap = true;
                        break;
                    }
                }
                if (top.innerHTML.toLowerCase() < btm.innerHTML.toLowerCase()) {
                    // sort alphabetical z -> a
                    swap = true;
                    break;
                }
            }

            
        }
        if (swap) {
            // swap rows
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorted = true;
        }
    }
};

/**
 * Updates map with JSON response data (person data) & adds markers for each person's location.
 * Each marker displays the person's name & clicking on a marker displays their hometown.
 * 
 * @param {*} response : JSON response object 
 */
const updateMap = (response) => {
    // clear previous markers
    markerLayer.clearLayers();

    // create markers
    response.values.forEach((item) => {
        const marker = L.marker([item.location.lat, item.location.lon]);
        marker.bindTooltip(`${item.firstname} ${item.lastname}`, {permanent:true}).openTooltip();   // display person's name next to marker
        marker.bindPopup(`Hometown: ${item.hometown}`);                                             // when marker clicked, display hometown
        marker.addTo(markerLayer);  
    });

    // add markers to map
    markerLayer.addTo(map);
};

/**
 * Display button handler.
 * Makes AJAX request to endpoint depending on the radio button using the input text for the query parameter value.
 */
const displayHandler = () => {
    // get filter text
    const filter = document.getElementById('filterText').value;

    // make request based on checked radio
    if (document.getElementById('allRadio').checked) {
        // make ajax request - all data
        makeRequest(ALL_ENDPOINT, null);        // no filter value for '/all' endpoint
    }
    else if (document.getElementById('fnRadio').checked) {
        // make ajax request - firstname filter
        makeRequest(FIRSTNAME_ENDPOINT, filter);
    }
    else if (document.getElementById('lnRadio').checked) {
        // make ajax request - lastname filter
        makeRequest(LASTNAME_ENDPOINT, filter);
    }
    else if (document.getElementById('ageRadio').checked) {
        // make ajax request - age filter
        makeRequest(AGE_ENDPOINT, filter);
    }
    else if (document.getElementById('homeRadio').checked) {
        // make ajax request - hometown filter
        makeRequest(HOMETOWN_ENDPOINT, filter);
    }
};

/**
 * Initializes leaflet map
 */
const initMap = () => {    
    // set map view to default coordinates
    map = L.map('map').setView(DEFAULT_COORDINATES, DEAFULT_ZOOM);
    map.options.maxZoom = 8;
    map.options.minZoom = 3;

    // add map view
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // add marker layer to map
    markerLayer = L.layerGroup().addTo(map);
};

/**
 * Initializes person tracker web app
 */
const initApp = () => {
    // initialize map
    initMap();

    // hide table header
    const header = document.getElementById('table-header');
    header.style.visibility = 'hidden';

    // hide/disable sorting
    document.getElementById('sortControl').style.visibility = 'hidden';

    // set display button handler
    const display = document.getElementById('displayButton');
    display.onclick = displayHandler;

    // set sort button handler
    const sort = document.getElementById('sortButton');
    sort.onclick = sortTable;

    // set actions for radio btns
    // disable/enable text field depending on radio checked
    const radios = document.querySelectorAll('input[type="radio"]');
    const inputField = document.getElementById('filterText');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].id === 'allRadio') {
            radios[i].onclick = () => { inputField.disabled = true };
        }
        else {
            radios[i].onclick = () => { inputField.disabled = false };
        }
    }

    // clear input field of previous input
    inputField.value = '';
};

/**
 * Loads person tracker web app on window load
 */
window.onload = () => {
    initApp();
}
