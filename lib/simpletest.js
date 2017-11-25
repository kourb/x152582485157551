//// Shortcuts
	const {log} = require('./shortcuts.js')


//// Imports
	const {VEBT, VEBX} = require('./vebt.js')
	const {getRandomArbitrary, getRandomInt, fibonacci} = require('./utilites.js')


//// Test config
	const RAND_AMOUNT = 1
	const FIB_AMOUNT = 16


//// Simple Test
	let Tree = new VEBX(64000)
	// Filling <Tree> with random Ints from 1 to 1024
	let c = RAND_AMOUNT; while(c--){
		//Tree.insert(getRandomInt(1,1024))
	}
	// Filling <Tree> with fibonacci sequence
	let fibs = fibonacci(FIB_AMOUNT)
	Tree.insert(fibs)
	// Printing Fibonacci sequence
	log('---- Fibonacci sequence ----')
	log(fibs)
	log('--------------\n')
	// Printing <Tree>
	log('---- Tree ----')
	log(Tree)
	log('--------------\n')
	// Finding random number form <Tree> and its neighbourhood 
	let number = fibs[getRandomInt(0, FIB_AMOUNT-1)]
	number = 5
	log('---- Random number form tree and its neighbourhood ----')
	let tExist = Tree.find(number) ? '✔' : '✘'
	log(Tree.prev(number) + ' ← '+number + '[' + tExist + '] → ' + Tree.next(number))
	log('--------------\n')

	
	