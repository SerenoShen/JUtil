var JMap = (function (){
	
	var 
		size = 0, 
		map = {},
		strundefined;
	
	function MapCache() {

	}

	MapCache.prototype.put = function (key, value){
		
		if ( key === null && key === strundefined ){
			throw new Error( " null or undefined is not a illegality variable ! " );
		}
		
		if (map[ key + " " ] == strundefined) {
			map[ key + " "] = value;
			size++;
			return;
		}
		
		map[ key + " " ] = value;
	};

	MapCache.prototype.remove = function (key) {

		var value;

		if ( key !== null || key !== strundefined ) {
			value = map[ key + " " ];
			delete map[ key + " " ];
			size--;
			return value;
		}

		return value;
	};

	MapCache.prototype.get = function (key) {
		if (map[key + " "] != strundefined) {
			return map[ key + " " ];
		}
		
		return null;
	};

	MapCache.prototype.keys = function () {
		var keys = [], prop;

		for ( prop in map ){
			keys.push(prop);
		}

		return keys;
	};
	
	MapCache.prototype.clear = function () {
		map = {};
		size = 0;
	};
	
	MapCache.prototype.size = function () {
		return size;
	};
	
	return MapCache;
}());