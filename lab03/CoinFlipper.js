// Class: SE2840 - JavaScript Coin Flipper DOM
// Name: Paige Rosynek
// Class Section: SE2840 031

/**
 * Determines whether the number of coins entered is valid.
 * Coins must be within the range 1 - 10.
 * @returns {boolean} true if the number of coins is valid, false otherwise
 */
const validateCoins = () => {
    let valid = false;
    const coinsInput = document.getElementById("numCoins");
    const coins = Number(coinsInput.value);
    const error = document.getElementById("coinsError");

    if (isNaN(coins) || coinsInput.value === "") {
        error.innerHTML = `Invalid input ( ${coinsInput.value} ). Value must be a number.`;
        error.style.color = "red";
    }
    else if (isFloat(coins)) {
        error.innerHTML = `Invalid input ( ${coins} ). Value must be a integer.`;
        error.style.color = "red";
    }
    else if ((coins <= 0) || (coins > 10)) {
        error.innerHTML = `Invalid input ( ${coins} ). Coins must be in the range 1 - 10.`;
        error.style.color = "red"
    }
    else {
        valid = true;
        error.innerHTML = "";
    }
    return valid;
};


/**
 * Determines whether the number of flips entered is valid.
 * Flips must be within the range 1 - 1000000.
 * @returns {boolean} true if the number of flips is valid, false otherwise
 */
const validateFlips = () => {
    let valid = false;
    const flipsInput = document.getElementById("numFlips");
    const flips = Number(flipsInput.value);
    const error = document.getElementById("flipsError");

    if (isNaN(flips) || flipsInput.value === "") {
        error.innerHTML = `Invalid input ( ${flipsInput.value} ). Value must be a number.`;
        error.style.color = "red";
    }
    else if (isFloat(flips)) {
        error.innerHTML = `Invalid input ( ${flips} ). Value must be a integer.`;
        error.style.color = "red";
    }
    else if ((flips <= 0) || (flips > 1000000)) {
        error.innerHTML = `Invalid input ( ${flips} ). Flips must be in the range 1 - 1000000.`;
        error.style.color = "red"
    }
    else {
        valid = true;
        error.innerHTML = "";
    }
    return valid;
};


/**
 * Validates wether the input for number of coins and number of flips is valid.
 * @returns {boolean} true if both the number of coins and number of flips is valid, otherwise false
 */
const validate = () => {
    return validateCoins() && validateFlips();
};


/**
 * Simulates the flipping of a given number of coins a specified number of times.
 * The frequency of the number of times a certain number of heads occured is stored in an array.
 * @param coins the number of coins to flip
 * @param flips the number of times to flip each coin
 * @returns {any[]} array representing the frequency of 'heads' for each flip repetition
 */
const flipCoins = (coins, flips) => {
    console.log(`${coins}`);
    let frequency = Array(coins + 1).fill(0);           // initialize array of zeros

    for (let flip = 0; flip < flips; flip++) {
        let heads = flipCoinsOneTime(coins);
        frequency[heads]++;                                             // update appropriate bin
    }

    return frequency;
};


/**
 * Simulates the flipping of a given number of coins one time.
 * The number of heads that occured is returned.
 * @param coins the number of coins to flip
 * @returns {number} the number of heads that occured
 */
const flipCoinsOneTime = (coins) => {
    let heads = 0;

    for (let i = 0; i < coins; i++) {
        heads += Math.floor(Math.random() * 2);
    }

    return heads;
};


/**
 * Determines whether a number is a float.
 * Returns true if n is a float, false otherwise.
 * @param n number to check the type of
 * @returns {boolean} whether or not n is a float (true if float, false otherwise)
 */
function isFloat(n) {
    return !isNaN(n) && n % 1 !== 0;
}


/**
 * Generates and styles the HTML content to display the histogram
 * @param coins the number of coins to flip
 * @param flips the number of times to flips the coins
 * @param frequency array representing the frequency of 'heads' for each flip repetition
 */
const generateHistogram = (coins, flips, frequency) => {
    const max = Math.max(...frequency);

    // (freq, bin) = (frequency of count, number of heads)
    frequency.forEach((freq, bin) => {
        console.log(`max = ${max}`);
        const scaled = (freq / max);

        let binElement = document.getElementById(`bin${bin}`);
        let freqElement = document.getElementById(`freq${bin}`);
        let bar = document.getElementById(`bar${bin}`);

        styleBin(binElement, bin);
        styleFreq(freqElement, freq);
        styleBar(bar, scaled);
    });
    let histogram = document.getElementById("histogram");
    histogram.style.visibility = "visible";
};


/**
 * Modifies and styles the bin HTML table element of the histogram
 * @param bin HTML table element that represents the bin
 * @param binNum number of the bin
 */
const styleBin = (bin, binNum) => {
    bin.innerHTML = `${binNum}`;
    bin.style.backgroundColor = "#f4a261";
    bin.style.color = "#f26419";
    bin.style.border = "2px solid #09443d";
    bin.style.padding = "5px";
    bin.style.margin = "10px";
    bin.style.width = "30px";
    bin.style.visibility = "visible";
};


/**
 * Modifies and styles the frequency count HTML table element of the histogram
 * @param freq HTML table element that represents the frequency count
 * @param freqCount the frequency count of the particular bin
 */
const styleFreq = (freq, freqCount) => {
    freq.innerHTML = `${freqCount}`;
    freq.style.backgroundColor = "#f26419";
    freq.style.color = "#f4a261";
    freq.style.border = "2px solid #09443d";
    freq.style.padding = "5px";
    freq.style.margin = "10px";
    freq.style.width = "30px";
    freq.style.visibility = "visible";
};


/**
 * Modifies and styles the progress HTML element that represents the histogram bar
 * @param bar HTML progress element
 * @param length value that represents the amount to fill the histogram bar
 */
const styleBar = (bar, length) => {
    bar.setAttribute("value", length);
    bar.style.visibility = "visible";
};

/**
 * Displays the execution time of the simulation in miliseconds on the screen.
 * @param elapsed execution time in miliseconds
 */
const displayTimeElapsed = (elapsed) => {
    let timeElapsed = document.getElementById("timeElapsed");
    timeElapsed.innerHTML = `Time elapsed : ${elapsed} ms`;
    timeElapsed.style.visibility = "visible";
};


/**
 * Clears (hides) the current histogram from the screen.
 */
const clear = () => {
    let elements = document.getElementsByTagName("td");
    for (const element of elements) {
        element.style.visibility = "hidden";
    }

    let bars = document.getElementsByTagName("progress");
    for (const bar of bars) {
        bar.style.visibility = "hidden";
    }

    let timeElapsed = document.getElementById("timeElapsed");
    timeElapsed.style.visibility = "hidden";
};


/**
 * Runs coin flipper application.
 * Validates user input, displays a histogram of the results of the simulation,
 * and measures how long the simulation took to run.
 */
window.onload = () => {
    const submit = document.getElementById("submit");
    submit.onclick = () => {
        const valid = validate();

        if (valid) {
            clear();    // hide current histogram

            const coins = parseInt(document.getElementById("numCoins").value);
            const flips = parseInt(document.getElementById("numFlips").value);

            const startTime = performance.now();
            const frequency = flipCoins(coins, flips);
            const executionTime = performance.now() - startTime;

            generateHistogram(coins, flips, frequency);
            displayTimeElapsed(executionTime);
        }
        else {
            clear();    // hide current histogram
        }
    };
};