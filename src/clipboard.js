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
        let targetAttr = e.currentTarget.getAttribute('for');
        let typeAttr   = e.currentTarget.getAttribute('type') || 'copy';
        let valueAttr  = e.currentTarget.getAttribute('value');

        if (valueAttr) {
            this.selectValue(valueAttr, typeAttr);
        }
        else if (targetAttr) {
            this.selectTarget(targetAttr, typeAttr);
        }
        else {
            throw new Error('Missing "for" or "value" attribute');
        }

        e.preventDefault();
    }

    selectValue(valueAttr, typeAttr) {
        let fake = document.createElement('input');

        fake.value = valueAttr;
        fake.style.opacity = 0;
        fake.style.zIndex = -1;

        document.body.appendChild(fake);

        fake.select();
        this.copy(typeAttr);

        document.body.removeChild(fake);
    }

    selectTarget(targetAttr, typeAttr) {
        let target = document.getElementById(targetAttr);

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
            target.select();
        }
        else {
            let range = document.createRange();
            range.selectNode(target);
            window.getSelection().addRange(range);
        }

        this.copy(typeAttr);
    }

    copy(typeAttr) {
        try {
            let successful = document.execCommand(typeAttr);
            if (!successful) throw 'Invalid "type" attribute';

            window.getSelection().removeAllRanges();
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}
