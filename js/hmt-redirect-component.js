var HmtRedirectComponent = function (componentElement, urlService, window) {
    componentElement.style.display = 'none';

    var queryParams = urlService.getQueryParams(window.document.location.search);
    var url = queryParams['url'];

    var visitButton = componentElement.querySelector('.visit-button');
    var cancelButton = componentElement.querySelector('.cancel-button');
    var urlSpan = componentElement.querySelector('.urlSpan');

    if (url) {
        componentElement.style.display = 'block';//Wanted display='initial' but that didn't work in IE11
        var domain = urlService.extractDomain(url);
        urlSpan.innerHTML = domain;
        visitButton.innerHTML = 'Visit ' + domain;

        visitButton.addEventListener('click', function () {
            window.location.href = url;
        });
        cancelButton.addEventListener('click', function () {
            window.close(); //For new windows and tabs
            window.history.back(); //For pre-existing windows and tabs
        });

    }
};
