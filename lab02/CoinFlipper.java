import java.util.Scanner;

/******************************************************************************************************************
 * CoinFlipper.java
 * Adapted from Dean & Dean - Introduction to Programming with Java: A Problem Solving Approach, ch 9.
 *
 * This program generates a histogram of coin flips. Suppose you have 5 coins and flip them 100000 times. 
 * Some flips will result in all heads, some with all tails, and others with some combination of heads and tails.
 * The histogram displays the number of times each combination occurred over all flips.
 ******************************************************************************************************************/
public class CoinFlipper {

    /**
     * Program execution begins here
     * @param args not used
     */
    public static void main(String[] args) {
        CoinFlipper coinFlipper = new CoinFlipper();
        coinFlipper.run();
    }

    /**
     * CoinFlipper - Constructor
     */
    private CoinFlipper() {
        // Intentionally left blank
    }

    /**
     * Gathers input from the user,
     * controls execution, and measures how long it takes to execute.
     */
    private void run() {
        int numberOfCoins = 0;        // number of coins to flip
        int numberOfRepetitions = 0;  // number of times the coins are flipped

        // The frequency array holds the number of times a particular number of heads occurred:
        // frequency[0] holds the number of times 0 heads occurred
        // frequency[1] holds the number of times 1 head occurred
        // ...
        // frequency[numberOfCoins] holds the number of times all heads occurred
        int[] frequency;

        Scanner kbd = new Scanner(System.in);
        boolean validInput = false;
        while( !validInput ) {
            try {
                System.out.print("Enter the number of coins to be flipped: ");
                numberOfCoins = kbd.nextInt();
                System.out.print("Enter the number of flips: ");
                numberOfRepetitions = kbd.nextInt();
            } catch( Exception e ) {
                System.out.println("Invalid input. Try again.");
                kbd.nextLine(); // consume remaining input
                continue;
            }
            validInput = true;
        }

        long executionTime = System.currentTimeMillis(); // current system time snapshot
        frequency = flipCoins(numberOfCoins, numberOfRepetitions); // flip numberOfCoins coins numberOfRepetitions times
        executionTime = System.currentTimeMillis() - executionTime; // compute elapsed time

        // NOTE: Do not include histogram generation in execution time calculation - console I/O takes a long time compared to internal math computations
        printHistogram(numberOfCoins, numberOfRepetitions, frequency); // display the resulting histogram

        System.out.println("Coin Flipper Time: " + executionTime + "ms");
    }

    /**
     * This method flips a specified number of coins a specified number of times
     * and gathers the number of times a certain number of heads occurred in each flip into a frequency[] array.
     * @param coins the number of coins to flip
     * @param times the number of times to flip each coin
     * @return array representing the frequency of 'heads' for each flip repetition
     */
    private int[] flipCoins(int coins, int times) {
        // This loop fills up frequency 'bins'.
        //    Each iteration simulates one group of coin flips.
        // For example, with a group of flips of 3 coins, heads may come up 0, 1, 2, or 3 times.

        // Allocate the array per user-specified input (note: Java initializes the contents to 0).
        int[] frequency = new int[coins + 1];
        for(int rep = 0; rep < times; rep++) {
            // perform a flip of the coins
            int heads = flipCoinsOneTime(coins);
            frequency[heads]++; // update appropriate bin
        }
        return frequency;
    }

    /**
     * This method flips a set of coins and returns the number heads that occurred.
     * It makes use of a random number generator to randomly generate heads or tails for each flip.
     * @param coins the number of coins to flip
     * @return the number of heads that occurred in the flips
     */
    private int flipCoinsOneTime(int coins) {
        int heads = 0;
        for(int i = 0; i < coins; i++) { // flip the coin
            heads += (int)(Math.random() * 2); // computed random int value is either 0 or 1 (tails or heads)
        }
        return heads; // number of heads that came up
    }

    /**
     * This method prints a histogram of the number of heads that occurred for a specified number of flip repetitions
     * Notes: The output generated for coins=5 and times=100000 may look something like this:
     *
     * Number of times each head count occurred in 100000 flips of 5 coins:
     * 0  3076  ***
     * 1  15792  ****************
     * 2  31348  *******************************
     * 3  31197  *******************************
     * 4  15552  ****************
     * 5  3035  ***
     *
     * @param coins the number of coins flipped in each repetition
     * @param times the number of times the coins were flipped
     * @param frequency the frequency (count) of heads for each flip repetition
     */
    private void printHistogram(int coins, int times, int[] frequency) {
        System.out.println("Number of times each head count occurred in " + times + " flips of " + coins + " coins:");

        // This loop prints the histogram. Each iteration prints one histogram bar.
        for(int heads = 0; heads < frequency.length; heads++) {

            // Compute the length of the histogram bar
            //   Normalize based on the number of repetitions
            double fractionOfReps = (float) frequency[heads] / times;
            int numOfAsterisks = (int) Math.round(fractionOfReps * 100);

            // Print the histogram bar
            System.out.print( " " + heads + "  " + frequency[heads] + "  " );
            for(int i = 0; i < numOfAsterisks; i++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}