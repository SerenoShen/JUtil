var JMap = (function (){

	function MapCache() {

		this.size = 0;
		this.mapCache = {};

	}

	MapCache.prototype = {

		put : function (key, value){

			if ( key === null && key === undefined ){
				throw new Error( " null or undefined is not a illegality variable ! " );
			}

			if (this.mapCache[ key + " " ] == undefined) {
				this.mapCache[ key + " "] = value;
				this.size++;
				return;
			}

			this.mapCache[ key + " " ] = value;
		},

		get : function (key) {
			if (this.mapCache[key + " "] != undefined) {
				return this.mapCache[ key + " " ];
			}

			return null;
		},

		remove : function (key) {

			var value;

			if ( key !== null || key !== undefined ) {
				value = this.mapCache[ key + " " ];
				delete this.mapCache[ key + " " ];
				this.size--;
				return value;
			}

			return value;
		},

		clear : function () {
			this.mapCache = {};
			this.size = 0;
		},

		keys : function () {
			var keys = [], prop;

			for ( prop in this.mapCache ){
				keys.push( prop.substring(0, prop.length - 1) );
			}

			return keys;
		},

		size : function () {
			return this.size;
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