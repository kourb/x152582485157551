//// Random generators
	function getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

//// Fibonacci sequence generator
	function fibonacci(n){
		var i
		var fib = [0,1]
		let c = 2; while(c < n){
			fib[c] = fib[c-2] + fib[c-1]
			c++
		}
		return fib
	}


//// Exports
	module.exports = {getRandomArbitrary, getRandomInt, fibonacci}
