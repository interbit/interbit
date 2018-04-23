require(['gitbook', 'jquery'], function(gitbook, $) {

    function toggleSearchFocus() {
        var $search = $('#book-search-input');

        $search.on('focus blur', 'input', function() {
            $search.toggleClass('focus');
        });
    }
    function removePublishedBy() {
        var link = $('.gitbook-link');
        link.remove();
    }

    gitbook.events.on('start', function() {
        toggleSearchFocus();
    });

    gitbook.events.on('page.change', function() {
        removePublishedBy();
    });
});
