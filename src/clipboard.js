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
        let actionAttr = e.currentTarget.getAttribute('data-action') || 'copy';
        let targetAttr = e.currentTarget.getAttribute('data-target');
        let textAttr   = e.currentTarget.getAttribute('data-text');

        if (textAttr) {
            this.selectValue(textAttr, actionAttr);
        }
        else if (targetAttr) {
            this.selectTarget(targetAttr, actionAttr);
        }
        else {
            throw new Error('Missing "data-target" or "data-text" attribute');
        }

        e.preventDefault();
    }

    selectValue(textAttr, actionAttr) {
        let fake = document.createElement('input');

        fake.value = textAttr;
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
