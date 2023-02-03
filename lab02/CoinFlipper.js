/**
 * Lab02 : JavaScript Coin Flipper
 * Name: Paige Rosynek
 * Section: SE 2840 031
 */


/**
 * Runs the coin flipper simulation.
 * Prompts the user for input, runs simulation, and measures how long
 * the simulation takes to execute.
 */
const run = () => {
    // note: prompt returns string
    let numberOfCoins = prompt('Enter the number of coins to be flipped : ', '1');
    let numberOfFlips = prompt('Enter the number of flips : ', '100');

    const isValidInput = checkValidInput(numberOfCoins, numberOfFlips)

    if (isValidInput.value) {
        numberOfCoins = parseInt(numberOfCoins);
        numberOfFlips = parseInt(numberOfFlips);
    }
    else {
        alert(isValidInput.message);
        return;  // exit function
    }

    const startTime = performance.now();
    const frequency = flipCoins(numberOfCoins, numberOfFlips);
    const executionTime = performance.now() - startTime;

    printHistogram(numberOfCoins, numberOfFlips, frequency);

    console.log('Coin flipper time : %f ms', executionTime);
}


/**
 * Simulates the flipping of a given number of coins a specified number of times.
 * The frequency of the number of times a certain number of heads occured is stored in an array.
 * @param coins the number of coins to flip
 * @param flips the number of times to flip each coin
 * @returns {any[]} array representing the frequency of 'heads' for each flip repetition
 */
function flipCoins(coins, flips) {
    let frequency = Array(coins + 1).fill(0);           // initialize array of zeros

    for (let flip = 0; flip < flips; flip++) {
        let heads = flipCoinsOneTime(coins);
        frequency[heads]++;                                             // update appropriate bin
    }

    return frequency;
}


/**
 * Simulates the flipping of a given number of coins one time.
 * The number of heads that occured is returned.
 * @param coins the number of coins to flip
 * @returns {number} the number of heads that occured
 */
function flipCoinsOneTime(coins) {
    let heads = 0;

    for (let i = 0; i < coins; i++) {
        heads += Math.floor(Math.random() * 2);
    }

    return heads;
}


/**
 * Checks if the number of coins and flips is a valid integer and
 * returns whether the values are valid. Returns a literal object that has properties value and
 * message to represent whether the input was valid and the associated error message if value is false.
 *
 * Coins must be in the range [1-10]
 * Flips must be in the range [1-1000000]
 * @param coins the number of coins to flip
 * @param flips the number of times to flip each coin
 * @returns {{message: string, value: boolean}} literal object representing whether the given values were valid and an associated error message
 */
function checkValidInput(coins, flips) {
    const isValid = {
        value : false,
        message : ''                        // error message
    };

    coins = Number(coins);
    flips = Number(flips);

    if (isNaN(coins) || isNaN(flips)) {
        isValid.message = 'Invalid input. Value must be a number.';
    }
    else if (isFloat(coins) || isFloat(flips)) {
        isValid.message = 'Invalid input. Value must be an integer.';
    }
    else if ((coins <= 0) || (coins > 10)) {
        isValid.message = 'Invalid input. Coins must be in the range 1 - 10.';
    }
    else if ((flips <= 0) || (flips > 1000000)) {
        isValid.message = 'Invalid input. Flips must be in the range 1 - 1000000.';
    }
    else {
        isValid.value = true;
    }

    return isValid;
}


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
 * Prints a histogram of the number of heads that occurred for the specified number of flip repetitions
 * @param coins the number of coins to flip
 * @param flips the number of times to flip each coin
 * @param frequency array representing the frequency of 'heads' for each flip repetition
 */
function printHistogram(coins, flips, frequency) {
    console.log(`Number of times each head count occurred in ${flips} flips of ${coins} coins : `)

    // print the histogram
    // (freq, index) = (frequency of count, number of heads)
    frequency.forEach((freq, index) => {
        const fraction = (freq / flips);
        const numAstrisks = Math.round(fraction * 100);
        printHistBar(index, numAstrisks, freq);
    });
}


/**
 * Prints a single row of the histogram with the number of heads that occurred,
 * the frequency of the count, and the distribution bar.
 * @param numHeads the number of heads; heads count
 * @param nAstrisks the calculated number of astricks to be printed
 * @param freq the frequency of the head count from out of all flips
 */
function printHistBar(numHeads, nAstrisks, freq) {
    const astricks = Array(nAstrisks).fill('*').join('');
    const bar = ` ${numHeads}  ${freq}  ${astricks}`
    console.log(bar)
}


// Run the coin flipper code when the browser finishes loading the js file
run();
