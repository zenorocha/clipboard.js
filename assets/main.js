hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new Clipboard('.btn');
    var btns = clipboard.triggers;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('success', function(e) {
            showTooltip(e.currentTarget, 'Copied!');

            console.info('Action:', e.detail.action);
            console.info('Text:', e.detail.text);
        });

        btns[i].addEventListener('error', function(e) {
            if (e.currentTarget.hasAttribute('data-text')) {
                var flash = document.querySelector('.flash');
                flash.textContent = e.detail;
                flash.setAttribute('class', 'flash flash-error');

                e.currentTarget.disabled = true;
            }
            else {
                showTooltip(e.currentTarget, 'Selected!');
            }
        });
    }

    function showTooltip(elem, msg) {
        elem.setAttribute('class', 'btn tooltipped tooltipped-s');
        elem.setAttribute('aria-label', msg);
    }
});
