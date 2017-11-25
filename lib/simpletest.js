//// Shortcuts
	const {log} = require('./shortcuts.js')


//// Imports
	const {VEBT, VEBX} = require('./vebt.js')
	const {getRandomArbitrary, getRandomInt, fibonacci} = require('./utilites.js')


//// Test config
	const RAND_AMOUNT = 0
	const FIB_AMOUNT = 16


//// Simple Test
	let Fibonacci = fibonacci(FIB_AMOUNT)
	let Tree = new VEBX(VEBT.offerK(Fibonacci))
	// Filling <Tree> with random Ints from 1 to 1024
	let c = RAND_AMOUNT; while(c--){
		Tree.insert(getRandomInt(1,1024))
	}
	// Filling <Tree> with fibonacci sequence
	Tree.insert(Fibonacci)
	// Printing Fibonacci sequence
	log('---- Fibonacci sequence ----')
	log(Fibonacci)
	log('--------------\n')
	// Printing <Tree>
	log('---- Tree ----')
	log(Tree)
	log('--------------\n')
	// Finding random number form <Tree> and its neighbourhood 
	let number = Fibonacci[getRandomInt(0, FIB_AMOUNT-1)]
	number = 233
	let tExist = Tree.find(number) ? '✔' : '✘'
	log('---- Random number form tree and its neighbourhood ----')
	log((Tree.prev(number) || '✘') + ' ← '+number + '[' + tExist + '] → ' + (Tree.next(number) || '✘'))
	log('--------------\n')



	
	