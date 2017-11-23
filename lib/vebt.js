//// Shortcuts
	const log = console.log


//// Van Embe Boas Tree
	// VEB Tree Constructor -> <VEBT>
	function VEBT(k){
		// Tree Dimension
		this.k = k
		// MIN and MAX elements
		this.min
		this.max
		// Children array, consisting of 2^{k/2} k/2-trees
		this.children = []
	}

	// VEB + AUX сonstructor, with the multiplicity condition 2 -> <VEBT+AUX>
	function VEBX(k) {
		// Conditions
		if(k < 0){
			log('VEBX: Dimension must be > 0')
			return 0
		}else{
			this.k = 2 
			while(this.k < k){
				this.k *= this.k
			}
		}
		// Main tree
		let T = new VEBT(this.k)
		// Auxiliary tree
		T.aux = new VEBT(this.k/2)
		return T
	}

	// {Find} operation -> <Boolean>: <true> - x exists in <VEBX>, <false> - x doesn't exist in <VEBX> 
	VEBT.prototype.find = function(x){
		if(this.empty){
			return false
		}
		if(this.min == x || this.max == x){
			return true
		}

		let highx = this.high(x)
		if(this.children[highx]){
			return this.children[highx].find(this.low(x))
		}else{
			return false
		}
	}

	// {Insert} operation 
	VEBT.prototype.insert = function(x) {
		if(this.empty){ // Empty tree case
			this.min = x
			this.max = x
		}else if(this.min == this.max){ // 1-Tree case
			if(this.min < x){
				this.max = x
			}else{
				this.min = x
			}
		}else{
			// Over-relaxation of MIN
			if(this.min > x){
				let tmp = x
				x = this.min
				this.min = tmp 
				
			}
			// Over-relaxation of MAX
			if(this.max < x){
				let tmp = x
				x = this.max
				this.max = tmp
			}
			// Element insertion
			if(this.k != 1){
				// high(x) to AUX
				let highx = this.high(x)
				let node = this.children[highx]
				if(!node){
					this.children[highx] = new VEBX(this.k)
				}
				if(this.children[this.high(x)].empty){
					this.aux.insert(this.aux.high(x))
				}
				// low(x) to children[high(x)] sub-tree
				this.children[highx].insert(this.low(x))
			}
		}
	}

	// {Remove} operation -> <Signal>: 4 - removed
	VEBT.prototype.remove = function(x){
		if(this.min == x && this.max == x){
			delete this.min
			return 4
		}
		
		if(this.min == x){
			if(this.aux.empty){
				this.min = this.max
				return 4
			}
			x = this.index(this.aux.min, this.children[this.aux.min].min)
			this.min = x
		}
		
		if(this.max == x){
			if(this.aux.empty){
				this.max = this.min
				return 4
			}
		}else{
			x = this.index(this.aux.max, this.children[this.aux.max].max)
			this.max = x
		}

		if(this.aux.empty){
			return 0
		}

		// Cascade remove
		this.children[this.high(x)].remove(this.low(x))

		// If we removed the last element from the subtree, then we delete the information that this subtree is not empty
		if(this.children[this.high(x)].empty){
			this.aux.remove(this.high(x))
		}
	}

	// {FindNext} operation
	VEBT.prototype.next = function(x){
		// Empty Tree and ending cases
		if(this.empty || this.max <= x){
			return 0
		}
		
		if(this.min > x){
			return this.min
		}
		// Tree has no more than two elements
		if(this.aux.empty){ 
			return this.max
		}else{ 
			// Case where the next number begins with high(x)
			if(!this.children[this.high(x)].empty && this.children[this.high(x)].max > this.low(x)){
				return this.index(this.high(x), this.children[this.high(x)].next(this.low(x)))
			// Otherwise we should find next non-empty subtree	
			}else{
				let nextHight = this.aux.next(this.high(x))
				if(!nextHight){
					return this.max
				}else{
					return this.index(nextHight, this.children[nextHigh].min)
				}
			}
		}
	}

	// {FindPrevious} operation
	VEBT.prototype.prev = function(x){
		// Empty Tree and ending cases
		if(this.empty || this.min >= x){
			return 0
		}

		if(this.max < x){
			return this.max
		}
		// Tree has no more than two elements
		if(this.aux.empty){
			return this.min
		}else{
			// Case where the next number begins with high(x)
			if(!this.children[this.high(x)].empty && this.children[this.high(x)].min < this.low(x)){
				return this.index(this.high(x), this.children[this.high(x)].prev(this.low(x)))
			// Otherwise we should find next non-empty subtree	
			}else{
				let nextHight = this.aux.next(this.high(x))
				if(!nextHight){
					return this.min
				}else{
					return this.index(nextHight, this.children[nextHigh].max)
				}
			}
		}
	}

	/// Utilites
		// Is tree empty?
		Object.defineProperty(VEBT.prototype, 'empty', {
			get: function(){
				return this.min == undefined ? true : false
			}
		})

		// Highest
		VEBT.high = function(x) {
			return Math.floor(x / Math.sqrt(this.k))
		}
		VEBT.prototype.high = VEBT.high

		// Lowest
		VEBT.low = function(x) {
			return x % Math.ceil(Math.sqrt(this.k))
		}
		VEBT.prototype.low = VEBT.low

		// Index
		VEBT.index = function(x, y) {
			return (x * Math.floor(Math.sqrt(this.k))) + y
		}
		VEBT.prototype.index = VEBT.index



// Testing
let TestTree = new VEBX(10000)
//log(TestTree.low(5823))
TestTree.insert(15)
TestTree.insert(17)
// TestTree.insert(18)
// TestTree.insert(19)
// TestTree.insert(67)
//TestTree.remove(67)
//TestTree.insert(57)
log(TestTree)
log('next', TestTree.next(15))
log('prev', TestTree.prev(17))
log(TestTree.find(67))





