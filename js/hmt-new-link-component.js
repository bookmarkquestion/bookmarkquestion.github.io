var HmtNewLinkComponent = function (componentElement, urlService, window) {
    function createRedirectUrl(toUrl) {
        return window.location.href.split('?')[0]
            + '?url=' + encodeURIComponent(toUrl);
    }

    var queryParams = urlService.getQueryParams(window.document.location.search);
    var url = queryParams['url'];
    var urlInput = componentElement.querySelector('input.input-url');

    if (url) {
        urlInput.value = url;
    }

    componentElement.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = createRedirectUrl(urlInput.value);
    });
}
