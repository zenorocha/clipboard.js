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
            var targetSelector = e.currentTarget.getAttribute('for');
            var target = document.getElementById(targetSelector);

            target.select();

            try {
                document.execCommand('copy');
            }
            catch (err) {
                console.error(err);
            }

            e.preventDefault();
        });
    }
}
