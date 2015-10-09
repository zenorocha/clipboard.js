(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Clipboard"] = factory();
	else
		root["Clipboard"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _srcClipboard = __webpack_require__(2);

	var _srcClipboard2 = _interopRequireDefault(_srcClipboard);

	var _srcClipboardAction = __webpack_require__(32);

	var _srcClipboardAction2 = _interopRequireDefault(_srcClipboardAction);

	var _delegateEvents = __webpack_require__(33);

	var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

	var _tinyEmitter = __webpack_require__(37);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	// expose bundled libraries
	_srcClipboard2['default'].ClipboardAction = _srcClipboardAction2['default'];
	_srcClipboard2['default'].DelegateEvents = _delegateEvents2['default'];
	_srcClipboard2['default'].TinyEmitter = _tinyEmitter2['default'];

	exports['default'] = _srcClipboard2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(3)['default'];

	var _inherits = __webpack_require__(17)['default'];

	var _createClass = __webpack_require__(28)['default'];

	var _classCallCheck = __webpack_require__(31)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _clipboardAction = __webpack_require__(32);

	var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

	var _delegateEvents = __webpack_require__(33);

	var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

	var _tinyEmitter = __webpack_require__(37);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	/**
	 * Base class which takes a selector, delegates a click event to it,
	 * and instantiates a new `ClipboardAction` on each click.
	 */

	var Clipboard = (function (_Emitter) {
	    _inherits(Clipboard, _Emitter);

	    /**
	     * @param {String} selector
	     * @param {Object} options
	     */

	    function Clipboard(selector, options) {
	        _classCallCheck(this, Clipboard);

	        _get(Object.getPrototypeOf(Clipboard.prototype), 'constructor', this).call(this);

	        this.resolveOptions(options);
	        this.delegateClick(selector);
	    }

	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */

	    /**
	     * Defines if attributes would be resolved using internal setter functions
	     * or custom functions that were passed in the constructor.
	     * @param {Object} options
	     */

	    _createClass(Clipboard, [{
	        key: 'resolveOptions',
	        value: function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	        }

	        /**
	         * Delegates a click event on the passed selector.
	         * @param {String} selector
	         */
	    }, {
	        key: 'delegateClick',
	        value: function delegateClick(selector) {
	            var _this = this;

	            this.binding = _delegateEvents2['default'].bind(document.body, selector, 'click', function (e) {
	                return _this.onClick(e);
	            });
	        }

	        /**
	         * Undelegates a click event on body.
	         * @param {String} selector
	         */
	    }, {
	        key: 'undelegateClick',
	        value: function undelegateClick() {
	            _delegateEvents2['default'].unbind(document.body, 'click', this.binding);
	        }

	        /**
	         * Defines a new `ClipboardAction` on each click event.
	         * @param {Event} e
	         */
	    }, {
	        key: 'onClick',
	        value: function onClick(e) {
	            if (this.clipboardAction) {
	                this.clipboardAction = null;
	            }

	            this.clipboardAction = new _clipboardAction2['default']({
	                action: this.action(e.delegateTarget),
	                target: this.target(e.delegateTarget),
	                text: this.text(e.delegateTarget),
	                trigger: e.delegateTarget,
	                emitter: this
	            });
	        }

	        /**
	         * Default `action` lookup function.
	         * @param {Element} trigger
	         */
	    }, {
	        key: 'defaultAction',
	        value: function defaultAction(trigger) {
	            return getAttributeValue('action', trigger);
	        }

	        /**
	         * Default `target` lookup function.
	         * @param {Element} trigger
	         */
	    }, {
	        key: 'defaultTarget',
	        value: function defaultTarget(trigger) {
	            var selector = getAttributeValue('target', trigger);

	            if (selector) {
	                return document.querySelector(selector);
	            }
	        }

	        /**
	         * Default `text` lookup function.
	         * @param {Element} trigger
	         */
	    }, {
	        key: 'defaultText',
	        value: function defaultText(trigger) {
	            return getAttributeValue('text', trigger);
	        }

	        /**
	         * Destroy lifecycle.
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.undelegateClick();

	            if (this.clipboardAction) {
	                this.clipboardAction.destroy();
	                this.clipboardAction = null;
	            }
	        }
	    }]);

	    return Clipboard;
	})(_tinyEmitter2['default']);

	exports['default'] = Clipboard;
	function getAttributeValue(suffix, element) {
	    var attribute = 'data-clipboard-' + suffix;

	    if (!element.hasAttribute(attribute)) {
	        return;
	    }

	    return element.getAttribute(attribute);
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	__webpack_require__(7);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(8);

	__webpack_require__(12)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(9)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(10);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(13)
	    , fn   = (__webpack_require__(15).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(16)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(18)["default"];

	var _Object$setPrototypeOf = __webpack_require__(20)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(13);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(23).set});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(6).getDesc
	  , isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(25);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line no-proto
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(26)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(27);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(29)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Inner class which performs selection from either `text` or `target`
	 * properties and then executes copy or cut operations.
	 */
	'use strict';

	var _createClass = __webpack_require__(28)['default'];

	var _classCallCheck = __webpack_require__(31)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var ClipboardAction = (function () {
	    /**
	     * @param {Object} options
	     */

	    function ClipboardAction(options) {
	        _classCallCheck(this, ClipboardAction);

	        this.resolveOptions(options);
	        this.initSelection();
	    }

	    /**
	     * Defines base properties passed from constructor.
	     * @param {Object} options
	     */

	    _createClass(ClipboardAction, [{
	        key: 'resolveOptions',
	        value: function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = options.action;
	            this.emitter = options.emitter;
	            this.target = options.target;
	            this.text = options.text;
	            this.trigger = options.trigger;

	            this.selectedText = '';
	        }

	        /**
	         * Decides which selection strategy is going to be applied based
	         * on the existence of `text` and `target` properties.
	         */
	    }, {
	        key: 'initSelection',
	        value: function initSelection() {
	            if (this.text && this.target) {
	                throw new Error('Multiple attributes declared, use either "target" or "text"');
	            } else if (this.text) {
	                this.selectFake();
	            } else if (this.target) {
	                this.selectTarget();
	            } else {
	                throw new Error('Missing required attributes, use either "target" or "text"');
	            }
	        }

	        /**
	         * Creates a fake textarea element, sets its value from `text` property,
	         * and makes a selection on it.
	         */
	    }, {
	        key: 'selectFake',
	        value: function selectFake() {
	            var _this = this;

	            this.removeFake();

	            this.fakeHandler = document.body.addEventListener('click', function () {
	                return _this.removeFake();
	            });

	            this.fakeElem = document.createElement('textarea');
	            this.fakeElem.style.position = 'absolute';
	            this.fakeElem.style.left = '-9999px';
	            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
	            this.fakeElem.setAttribute('readonly', '');
	            this.fakeElem.value = this.text;
	            this.selectedText = this.text;

	            document.body.appendChild(this.fakeElem);

	            this.fakeElem.select();
	            this.copyText();
	        }

	        /**
	         * Only removes the fake element after another click event, that way
	         * an user can hit `Ctrl+C` to copy because selection still exists.
	         */
	    }, {
	        key: 'removeFake',
	        value: function removeFake() {
	            if (this.fakeHandler) {
	                document.body.removeEventListener('click');
	                this.fakeHandler = null;
	            }

	            if (this.fakeElem) {
	                document.body.removeChild(this.fakeElem);
	                this.fakeElem = null;
	            }
	        }

	        /**
	         * Selects the content from element passed on `target` property.
	         */
	    }, {
	        key: 'selectTarget',
	        value: function selectTarget() {
	            if (this.target.nodeName === 'INPUT' || this.target.nodeName === 'TEXTAREA') {
	                this.target.select();
	                this.selectedText = this.target.value;
	            } else {
	                var range = document.createRange();
	                var selection = window.getSelection();

	                range.selectNodeContents(this.target);
	                selection.addRange(range);
	                this.selectedText = selection.toString();
	            }

	            this.copyText();
	        }

	        /**
	         * Executes the copy operation based on the current selection.
	         */
	    }, {
	        key: 'copyText',
	        value: function copyText() {
	            var succeeded = undefined;

	            try {
	                succeeded = document.execCommand(this.action);
	            } catch (err) {
	                succeeded = false;
	            }

	            this.handleResult(succeeded);
	        }

	        /**
	         * Fires an event based on the copy operation result.
	         * @param {Boolean} succeeded
	         */
	    }, {
	        key: 'handleResult',
	        value: function handleResult(succeeded) {
	            if (succeeded) {
	                this.emitter.emit('success', {
	                    action: this.action,
	                    text: this.selectedText,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            } else {
	                this.emitter.emit('error', {
	                    action: this.action,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            }
	        }

	        /**
	         * Removes current selection and focus from `target` element.
	         */
	    }, {
	        key: 'clearSelection',
	        value: function clearSelection() {
	            if (this.target) {
	                this.target.blur();
	            }

	            window.getSelection().removeAllRanges();
	        }

	        /**
	         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
	         * @param {String} action
	         */
	    }, {
	        key: 'destroy',

	        /**
	         * Destroy lifecycle.
	         */
	        value: function destroy() {
	            this.removeFake();
	        }
	    }, {
	        key: 'action',
	        set: function set() {
	            var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

	            this._action = action;

	            if (this._action !== 'copy' && this._action !== 'cut') {
	                throw new Error('Invalid "action" value, use either "copy" or "cut"');
	            }
	        },

	        /**
	         * Gets the `action` property.
	         * @return {String}
	         */
	        get: function get() {
	            return this._action;
	        }

	        /**
	         * Sets the `target` property using an element
	         * that will be have its content copied.
	         * @param {Element} target
	         */
	    }, {
	        key: 'target',
	        set: function set(target) {
	            if (target !== undefined) {
	                if (target && typeof target === 'object' && target.nodeType === 1) {
	                    this._target = target;
	                } else {
	                    throw new Error('Invalid "target" value, use a valid Element');
	                }
	            }
	        },

	        /**
	         * Gets the `target` property.
	         * @return {String|HTMLElement}
	         */
	        get: function get() {
	            return this._target;
	        }
	    }]);

	    return ClipboardAction;
	})();

	exports['default'] = ClipboardAction;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var closest = __webpack_require__(34)
	  , event = __webpack_require__(36);

	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	// Some events don't bubble, so we want to bind to the capture phase instead
	// when delegating.
	var forceCaptureEvents = ['focus', 'blur'];

	exports.bind = function(el, selector, type, fn, capture){
	  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};

	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var matches = __webpack_require__(35)

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	
	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	function E () {
		// Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
		on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});
	    
	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });
	    
	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    var fn = function () {
	      self.off(name, fn);
	      callback.apply(ctx, arguments);
	    };
	    
	    return this.on(name, fn, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;
	    
	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }
	    
	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];
	    
	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback) liveEvents.push(evts[i]);
	      }
	    }
	    
	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length) 
	      ? e[name] = liveEvents
	      : delete e[name];
	    
	    return this;
	  }
	};

	module.exports = E;


/***/ }
/******/ ])
});
;