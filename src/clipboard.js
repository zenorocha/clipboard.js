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
        [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
    }

    bind(trigger) {
        trigger.addEventListener('click', (e) => this.select(e));
    }

    select(e) {
        var valueAttr  = e.currentTarget.getAttribute('value');
        var targetAttr = e.currentTarget.getAttribute('for');

        if (valueAttr) {
            this.selectValue(valueAttr);
        }
        else if (targetAttr) {
            this.selectTarget(targetAttr);
        }
        else {
            console.error('Missing "for" or "value" attribute');
        }

        e.preventDefault();
    }

    selectValue(valueAttr) {
        var fake = document.createElement('input');

        fake.value = valueAttr;
        fake.style.opacity = 0;
        fake.style.zIndex = -1;

        document.body.appendChild(fake);

        fake.select();
        this.copy();

        document.body.removeChild(fake);
    }

    selectTarget(targetAttr) {
        var target = document.getElementById(targetAttr);

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
            target.select();
        }
        else {
            var range = document.createRange();
            range.selectNode(target);
            window.getSelection().addRange(range);
        }

        this.copy();
    }

    copy() {
        try {
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        }
        catch (err) {
            console.error(err);
        }
    }
}
