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
        if (this.triggers.length > 0) {
            [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
        }
        else {
            throw new Error('The provided selector is empty');
        }
    }

    bind(trigger) {
        trigger.addEventListener('click', (e) => this.select(e));
    }

    select(e) {
        let actionAttr = e.currentTarget.dataset.action || 'copy';
        let targetAttr = e.currentTarget.dataset.target;
        let valueAttr  = e.currentTarget.dataset.value;

        if (valueAttr) {
            this.selectValue(valueAttr, actionAttr);
        }
        else if (targetAttr) {
            this.selectTarget(targetAttr, actionAttr);
        }
        else {
            throw new Error('Missing "data-target" or "data-value" attribute');
        }

        e.preventDefault();
    }

    selectValue(valueAttr, actionAttr) {
        let fake = document.createElement('input');

        fake.value = valueAttr;
        fake.style.opacity = 0;
        fake.style.zIndex = -1;

        document.body.appendChild(fake);

        fake.select();
        this.copy(actionAttr);

        document.body.removeChild(fake);
    }

    selectTarget(targetAttr, actionAttr) {
        let target = document.getElementById(targetAttr);

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
            target.select();
        }
        else {
            let range = document.createRange();
            range.selectNode(target);
            window.getSelection().addRange(range);
        }

        this.copy(actionAttr);
    }

    copy(actionAttr) {
        try {
            let successful = document.execCommand(actionAttr);
            if (!successful) throw 'Invalid "data-action" attribute';

            window.getSelection().removeAllRanges();
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
