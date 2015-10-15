var btns = document.querySelectorAll('.btn');

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.setAttribute('class', 'btn');
        e.currentTarget.removeAttribute('aria-label');
    });
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

// Simplistic detection, do not use it in production
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');

    if(/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    }
    else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    }
    else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }

    return actionMsg;
}

hljs.initHighlightingOnLoad();
