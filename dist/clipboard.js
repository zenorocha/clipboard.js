'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Clipboard = (function () {

    // Constructor

    function Clipboard(triggers) {
        _classCallCheck(this, Clipboard);

        this._triggers = triggers;
        this.init();
    }

    // Getters & Setters

    _createClass(Clipboard, [{
        key: 'init',

        // Methods

        value: function init() {
            [].forEach.call(this.triggers, this.bind);
        }
    }, {
        key: 'bind',
        value: function bind(trigger) {
            trigger.addEventListener('click', function (e) {
                var targetSelector = e.currentTarget.getAttribute('for');
                var target = document.getElementById(targetSelector);

                target.select();

                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error(err);
                }

                e.preventDefault();
            });
        }
    }, {
        key: 'triggers',
        get: function get() {
            return document.querySelectorAll(this._triggers);
        },
        set: function set(val) {
            return this._triggers = val;
        }
    }]);

    return Clipboard;
})();
