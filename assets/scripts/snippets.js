(function() {
  'use strict';

  var identifier = 0;
  var snippets = Array.prototype.slice.call(document.querySelectorAll('pre.snippet'));

  snippets.forEach(function(snippet) {
    snippet.id = 'snip' + identifier;

    var copyBtn = document.createElement('span');

    copyBtn.className = 'btn clip';
    copyBtn.setAttribute('data-clipboard-target', '#snip' + identifier++);

    snippet.parentElement.insertBefore(copyBtn, snippet);
  });
})();
