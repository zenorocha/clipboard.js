hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new Clipboard('.btn');
    var btns = clipboard.triggers;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('success', function(e) {
            showTooltip(e.currentTarget, 'Copied!');

            console.info('Action:', e.detail.action);
            console.info('Text:', e.detail.text);

            e.detail.clearSelection();
        });

        btns[i].addEventListener('error', function(e) {
            showTooltip(e.currentTarget, messageFallback(e.detail.action));
        });
    }

    function showTooltip(elem, msg) {
        elem.setAttribute('class', 'btn tooltipped tooltipped-s');
        elem.setAttribute('aria-label', msg);
    }

    function messageFallback(action) {
        var actionKey, actionCommand;

        if (action === 'copy') {
            actionKey = 'C';
        }
        else {
            actionKey = 'X';
        }

        // Simplistic detection, do not use it in production
        if(/iPhone|iPad/i.test(navigator.userAgent)) {
            actionCommand = 'No support :(';
        }
        else if (/Mac/i.test(navigator.userAgent)) {
            actionCommand = 'Press ⌘-' + actionKey + ' to ' + action;
        }
        else {
            actionCommand = 'Press Ctrl-' + actionKey + ' to ' + action;
        }

        return actionCommand;
    }
});
