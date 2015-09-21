hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new Clipboard('.btn');
    var btns = clipboard.triggers;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('copy', function(e) {
            console.info('Event:', e.type);
            console.info('Text:', e.detail);
        });

        btns[i].addEventListener('cut', function(e) {
            console.info('Event:', e.type);
            console.info('Text:', e.detail);
        });

        btns[i].addEventListener('no-support', function(e) {
            var flashes = document.querySelectorAll('.flash');

            for (var j = 0; j < btns.length; j++) {
                btns[j].disabled = true;
                flashes[j].classList.remove('hidden');
            }
        });
    }
});
