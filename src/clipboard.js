class Clipboard {

    // Constructor

    constructor(triggers) {
        this._triggers = triggers;
        this.init();
    }

    // Getters & Setters

    get triggers() {
        return document.querySelectorAll(this._triggers);
    }

    set triggers(val) {
        return this._triggers = val;
    }

    // Methods

    init() {
        [].forEach.call(this.triggers, this.bind);
    }

    bind(trigger) {
        trigger.addEventListener('click', e => {
            var value = e.currentTarget.getAttribute('value');
            var targetSelector = e.currentTarget.getAttribute('for');
            var target = document.getElementById(targetSelector);

            if (value) {
                var fake = document.createElement('input');

                fake.value = value;
                fake.style.opacity = 0;
                fake.style.zIndex = -1;

                document.body.appendChild(fake);

                fake.select();
            }

            if (target) {
                if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
                    target.select();
                }
                else {
                    var range = document.createRange();
                    range.selectNode(target);
                    window.getSelection().addRange(range);
                }
            }

            try {
                document.execCommand('copy');
                window.getSelection().removeAllRanges();

                if (value) {
                    document.body.removeChild(fake);
                }
            }
            catch (err) {
                console.error(err);
            }

            e.preventDefault();
        });
    }
}
