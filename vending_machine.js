// For reading the keyboard input
const readline = require('readline-sync');
const Big = require('big.js');

//---------------------------------------------
// A class representing a vending machine
// @param items - an array of items
// @param prices - the price of each item
//--------------------------------------------
function VendingMachine(items, prices) {
	// Save the items and prices
	this.items = items;
	this.prices = prices;

	// How many coins the machine has accepted
	this.sumOfCointsAccepted = 0


	// Displays the menu
	this.showMenu = function () {

		console.log("Welcome to our flawless and secure vending experience!");

		// Print Woot twice
		for (var i = 0; i < 2; ++i) {
			console.log("Woot!");
		}

		// Prints all the items
		for (var i; i < this.items.length; ++i) {
			console.log(i + ". " + this.items[i] + " [$" + this.prices[i] + "]");
		}
	}



	// ------------------------------------
	// Accepts coins
	// @param item - the requested item
	// @param price - the price of the item
	// --------------------------------------
	this.inputCoins = function (item, price, numItems) {
		price = new Big(price);
		// The coin sum
		var coinSum = new Big(0.0);
		var floatCents = new Big(0.0);

		let inputOptions = ['Insert money', 'Return money', 'Start vending with current amount']
		let insertedCents = new Big(0.0);

		let exitFlag = false;

		do {
			// Get the Option
			let inputChoice = readline.keyInSelect(inputOptions, "Choose an input option: ");
			//inputChoice += 1;
			console.log(inputOptions[inputChoice] + ' was chosen.');
			console.log("inputChoice: ", inputChoice)
			if (inputChoice + 1 === 1) {
				console.log("Inserting money...");
				let badInput = true
				while (badInput) {
					// Get the money
					insertedCents = readline.questionFloat("\nPlease insert the bills (whole numbers) and/or cents (e.g., .25) to purchase your "
						+ item.toLowerCase() + " (" + coinSum + " inserted so far) \nPlease enter the amount:  ");

					if (insertedCents >= 0) {
						console.log("You entered: ", insertedCents)
						badInput = false;

					} else {
						console.log("Please enter a number greater than or equal to 0.")
					}
				}
				// Get the floating point value
				floatCents = new Big(parseFloat(insertedCents));

				// Add the coin sum
				coinSum = coinSum.plus(floatCents);

				console.log("Just accepted ", floatCents, " worth of coins\n");


			}
			else if (inputChoice + 1 === 2) {
				// Return Requested
				console.log("returning money ->", coinSum.toFixed(2));
				exitFlag = true;

			}
			else if (inputChoice + 1 === 3) {
				console.log("start vending with current amount");
				// Enough money! 
				if (Math.floor(coinSum / price) >= numItems) {
					let returnSum = new Big(coinSum - ((numItems * numItems * price) / numItems))
					console.log("Please claim your ", numItems, " ", item, "(s).  Also, returning to you the sum of ", returnSum.toFixed(2));
				}
				// Not enough money
				else {
					console.log("Sorry, insufficient funds!");
					console.log("returning money ->", coinSum.toFixed(2));

				}
				exitFlag = true;

			}

		} while (exitFlag == false);

	}

	// Used to select the item
	this.itemRequest = function () {

		// Show the menu
		this.showMenu();

		// The item number
		var itemNum = readline.keyInSelect(this.items, "Please enter the item number: ",);

		if (itemNum + 1 === 0) {
			return;
		}
		console.log("You selected item: ", itemNum + 1);


		// If this is a bulk purchase, then show the menu
		while (true) {
			var numItemsInput = readline.questionInt("How many " + this.items[itemNum] + "(s) would you like to purchase? ");

			// Get the number of items
			var numItems = parseInt(numItemsInput);

			if (numItems >= 1) {
				break;
			}

			console.log("Please enter a number greater than or equal to 1.")
		}

		console.log("You requested: ", numItems, " ", this.items[itemNum].toLowerCase(), "(s) which costs " + Big(this.prices[itemNum]).times(numItems));


		// Go to the purchasing process
		this.inputCoins(this.items[itemNum], this.prices[itemNum], numItems);

	}

	// Turns on the vending machine
	this.turnOn = function () {
		this.itemRequest();
	}
}

var vm = new VendingMachine(["Water", "Soda", "Pizza", "Taco", "Tesla"], [Big(.50), Big(.99), Big(1.99), Big(3.99), Big(850000.00)]);


vm.turnOn();


