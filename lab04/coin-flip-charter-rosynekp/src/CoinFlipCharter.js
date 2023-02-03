// Class: SE2840 - Coin Flip Charter
// Name: Paige Rosynek
// Class Section: 031

/**
 * chartSetup
 * Set up the Google chart properties and other page events
 */
const chartSetup = () => {

    // Initialize the Google chart package
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(createDefaultDisplay);

    // Set up the button handler to call a function that updates the page
    document.getElementById("update").onclick = updateDisplay;
};


/**
 * createDefaultDisplay
 * Create the "default" page - display all data with no filters
 */
const createDefaultDisplay = () => {
    const table = document.getElementById('table1body');
    let index = 1;

    for (let x in results) {
        const row = document.createElement('tr');
        row.id = `row${index}`;

        const values = Object.values(results[x]);               // values of single record
        values.unshift(index.toString());                       // prepend index to table records data

        results[x] = Object.values(results[x]);                 // convert results from array of objs to array of arrays
        results[x].unshift(index.toString());                   // prepend index to each result

        // create & populate each table cell in the table row
        for (let value in values) {
            const cell = document.createElement('td');
            cell.innerHTML = values[value];
            row.appendChild(cell);
        }

        table.appendChild(row);                                 // add row to HTML table element
        index++;
    }

    drawChart(results);                                         // draw column chart
};

/**
 * drawChart
 * Display the given chartData in the Google chart
 */
const drawChart = (chartData) => {
    // create google data table for the bar chart data
    const data = new google.visualization.DataTable();

    // columns to plot data
    data.addColumn('string', 'Index');                  // x-axis
    data.addColumn('number', 'Execution Time');         // y-axis

    // generate values/rows of data table from chartData - add chartData to data table
    for (let row in chartData) {
        const values = new Array(2);

        values[0] = Object.values(chartData[row])[0];               // index
        values[1] = Number(Object.values(chartData[row])[5]);       // execution time

        data.addRow(values);                                        // add row to data table
    }


    // set options for the google bar chart
    const options = {
        width: 1200,
        height: 400,
        legend: 'top',
        chartArea: {
            width: '90%',
            height: '80%',
        }
    };

    // draw the chart on the chart_div
    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
};

/**
 * Filters the HTML table for rows using a given substring.
 * Gets the filter value entered in the text field, filters the table, updates the table to show filtered results,
 * and returns an array of the filtered results.
 *
 * @param index index of the field to filter the result table by
 * @returns {*[]} filtered table data results
 */
const filterBySubstring = (index) => {
    const table = document.getElementById('table1body');
    const substring  = document.getElementById('filter').value;     // get substring from text input field
    const rows = table.getElementsByTagName('tr');
    let chartData = [];

    let dataIndex = 0;
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const values = row.getElementsByTagName('td');          // row values

        // substring match
        if (values[index].innerText.toLowerCase().includes(substring.toLowerCase())) {
            row.style.display = 'table-row';                                // set table row to visible if match

            // copy array to chartData
            chartData[dataIndex] = [];
            for (let v = 0; v < values.length; v++) {
                chartData[dataIndex].push(values[v].innerText);
            }

            dataIndex++;
        }
        else {
            row.style.display = 'none';                                 // hide table row if not a match
        }
    }

    return chartData;
};


/**
 * Filters the HTML table for rows using a given value.
 * Gets the filter value entered in the text field, filters the table, updates the table to show filtered results,
 * and returns an array of the filtered results.
 *
 * @param index index of the field to filter the result table by
 * @returns {*[]} filtered table data results
 */
const filterByNumeric = (index) => {
    const table = document.getElementById('table1body');
    const toMatch  = document.getElementById('filter').value;       // value to match
    const rows = table.getElementsByTagName('tr');
    const chartData = [];

    let dataIndex = 0;
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const values = row.getElementsByTagName('td');          // row values

        // fillter by exact value match
        if (values[index].innerText === toMatch) {
            row.style.display = 'table-row';                                // show table row if match

            // copy array to chartData
            chartData[dataIndex] = [];
            for (let v = 0; v < values.length; v++) {
                chartData[dataIndex].push(values[v].innerText);
            }

            dataIndex++;
        }
        else {

            row.style.display = 'none';                                     // hide table row if not match
        }
    }

    return chartData;
};


/**
 * Updates the column chart and table displayed on the page based on filter specified.
 */
const updateDisplay = () => {
    // determine which radio button is currently selected - id
    const selected = document.querySelector('input[type=\"radio\"]:checked').id;

    let chartData = []

    // filter based on the selected radio button
    switch(selected) {
        case 'id1':
            // filter by id - substring match
            chartData = filterBySubstring(1);
            drawChart(chartData);
            break;
        case 'coins1':
            // filter by number of coins - numeric match
            chartData = filterByNumeric(2);
            drawChart(chartData);
            break;
        case 'flips1':
            // filter by number of flips - numeric match
            chartData = filterByNumeric(3);
            drawChart(chartData);
            break;
        case 'browser1':
            // filter by browser - substring match
            chartData = filterBySubstring(4);
            drawChart(chartData);
            break;
        case '':
            createDefaultDisplay();
            break;
        default:
            console.log('error');
    }
};


/**
 * Initializes the gooogle charts and other page properties on load
 */
window.onload = () => {
    chartSetup();
};
