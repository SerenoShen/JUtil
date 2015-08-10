var JMap = (function (){

	function MapCache() {

		var len = 0, cache = {};

		this.put = function (key, value){

			if ( key === null && key === undefined ){
				throw new Error( " null or undefined is not a illegality variable ! " );
			}

			if (cache[ key + " " ] == undefined) {
				cache[ key + " "] = value;
				len++;
				return;
			}

			cache[ key + " " ] = value;
		};

		this.get = function (key) {

			return cache[ key + " " ];

		};

		this.remove = function (key) {

			var value;

			if ( key !== null || key !== undefined ) {
				value = cache[ key + " " ];
				delete cache[ key + " " ];
				len--;
				return value;
			}

			return value;
		};

		this.clear =  function () {
			cache = {};
			len = 0;
		};

		this.keys = function () {
			var keys = [], prop;

			for ( prop in cache ){
				keys.push( prop.substring(0, prop.length - 1) );
			}

			return keys;
		};

		this.size = function () {
			return len;
		};
	}



	// 遵循 AMD 模块化规范， 支持RequireJS 模块化导出
	if ( typeof define === 'function' && define.amd ) {
		define('jmap', [], function (){
			return MapCache;
		})
	}
	
	return MapCache;
}());