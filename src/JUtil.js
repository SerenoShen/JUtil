/**
 * Created by shenlei on 2015/8/2.
 */
(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {

        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("JUtil requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    // define the private variable
    var slice = [].slice;

    var concat = [].concat;

    var push = [].push;

    var indexOf = [].indexOf;

    var classType = ({});

    var toString = ({}).toString;

    var hasOwn = ({}).hasOwnProperty;
    
    var
        version = '0.0.1',

        JUtil = function () {
            return new JUtil.fn.init();
        };

    /******************** start : define JUtil prototype object *******************/
    JUtil.fn = JUtil.prototype = {
        // The current version of JUtil being used
        JUtil: version,

        constructor: JUtil
    };

    /******************** end : define JUtil prototype object ******************/

    /******************** start : define the global function extend ***************/
    JUtil.extend = JUtil.fn.extend = function () {
        var src,
            copyIsArray,
            copy,
            name,
            options,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !JUtil.isFunction(target)) {
            target = {};
        }

        // extend JUtil itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( JUtil.isPlainObject(copy) || (copyIsArray = JUtil.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && JUtil.isArray(src) ? src : [];

                        } else {
                            clone = src && JUtil.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = JUtil.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
    /******************** end : define the global function extend ***************/

    JUtil.extend({

        whitespace: "[\\x20\\t\\r\\n\\f]",

        rtrim: new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

        // Unique for each copy of JUtil on the page
        expando: "JUtil" + ( version + Math.random() ).replace(/\D/g, ""),

        // Assume JUtil is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        isFunction: function (obj) {
            return JUtil.type(obj) === "function";
        },

        isArray: Array.isArray || function (obj) {
            return JUtil.type(obj) === "array";
        },

        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function (obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || JUtil.type(obj) !== "object" || obj.nodeType || JUtil.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {
            }

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function (obj) {
            if (obj == null)
                return obj + "";

            return typeof obj === "object" || typeof obj === "function" ?
            classType[toString.call(obj)] || "object" : typeof obj;
        },


        globalEval: function (data) {
            if (data && JUtil.trim(data)) {
                ( window.execScript || function (data) {
                    window["eval"].call(window, data);
                } )(data);
            }
        },

        // Support: Android<4.1, IE<9
        trim: function (text) {
            return text == null ?
                "" :
                ( text + "" ).replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    JUtil.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        // A global GUID counter for objects
        guid: 1,

        now: function () {
            return +(new Date());
        }
    });

    // define private method isArrayLike
    function isArrayLike(obj) {
        var length = obj.length,
            type = JUtil.type(obj);

        if (type === "function" || JUtil.isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }

    // define function createCache
    // 利用闭包创建一个缓存，在创建时指定缓存容量的大小，缓存中存在的数据超过缓存容量时，将按照队列的方式进行数据处理
    function createCache(cacheLength) {
        var keys = [];

        function cache( key, value ) {
            if ( keys.push( key + " " ) > cacheLength ) {
                delete cache[ keys.shift() ];
            }
            return (cache[ key + " " ] = value);
        }
        return cache;
    }

    // support RequireJS
    if (typeof define === "function" && define.amd) {
        define("jutil", [], function () {
            return JUtil;
        });
    }

    // define the global variable JUtil
    if (typeof noGlobal === 'undefined') {
        window.JUtil = JUtil;
    }

    return JUtil;

}));