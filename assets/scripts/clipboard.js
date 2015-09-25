var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    e.clearSelection();

    console.info('Action:', e.action);
    console.info('Text:', e.text);

    showTooltip(e.trigger, 'Copied!');
});

clipboard.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});
