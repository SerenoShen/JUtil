var JMap = (function (){

	function MapCache() {

		this.len = 0;
		this.cache = {};

	}

	MapCache.prototype = {

		put : function (key, value){

			if ( key === null && key === undefined ){
				throw new Error( " null or undefined is not a illegality variable ! " );
			}

			if (this.cache[ key + " " ] == undefined) {
				this.cache[ key + " "] = value;
				this.len++;
				return;
			}

			this.cache[ key + " " ] = value;
		},

		get : function (key) {

			return this.cache[ key + " " ];

		},

		remove : function (key) {

			var value;

			if ( key !== null || key !== undefined ) {
				value = this.cache[ key + " " ];
				delete this.cache[ key + " " ];
				this.len--;
				return value;
			}

			return value;
		},

		clear : function () {
			this.cache = {};
			this.len = 0;
		},

		keys : function () {
			var keys = [], prop;

			for ( prop in this.cache ){
				keys.push( prop.substring(0, prop.length - 1) );
			}

			return keys;
		},

		size : function () {
			return this.len;
		}
	};

	// 遵循 AMD 模块化规范， 支持RequireJS 模块化导出
	if ( typeof define === 'function' && define.amd ) {
		define('jmap', [], function (){
			return MapCache;
		})
	}
	
	return MapCache;
}());