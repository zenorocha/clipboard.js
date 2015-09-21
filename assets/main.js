hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new Clipboard('.btn');
    var btns = clipboard.triggers;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('copy', complete);
        btns[i].addEventListener('cut', complete);

        btns[i].addEventListener('mouseleave', function(e) {
            e.currentTarget.classList.remove('tooltipped', 'tooltipped-s');
            e.currentTarget.removeAttribute('aria-label');
        });

        btns[i].addEventListener('no-support', function(e) {
            var flashes = document.querySelectorAll('.flash');

            for (var j = 0; j < btns.length; j++) {
                btns[j].disabled = true;
                flashes[j].classList.remove('hidden');
            }
        });
    }

    function complete(e) {
        console.info('Event:', e.type);
        console.info('Text:', e.detail);

        e.currentTarget.classList.add('tooltipped', 'tooltipped-s');
        e.currentTarget.setAttribute('aria-label', 'Copied!');
    }
});
