var HmtNewLinkComponent = function (componentElement, urlService, window) {
    function createRedirectUrl(toUrl, interval, message) {
        return window.location.href.split('?')[0]
            + '?url=' + encodeURIComponent(toUrl)
            + '&interval=' + encodeURIComponent(interval)
            + '&message=' + encodeURIComponent(message);
    }

    function hideForm() {
        componentElement.querySelector('.hide-container').style.display = 'block';
        componentElement.querySelector('.show-container').style.display = 'none';
    }

    function showForm() {
        componentElement.querySelector('.hide-container').style.display = 'none';
        componentElement.querySelector('.show-container').style.display = 'block';
    }

    var queryParams = urlService.getQueryParams(window.document.location.search);
    var urlInput = componentElement.querySelector('input.url-input');
    var intervalSelect = componentElement.querySelector('select.interval-select');
    var messageInput = componentElement.querySelector('input.message-input');

    //Default values
    urlInput.value = '';
    intervalSelect.value = '1';
    messageInput.value = 'How many times has viewing {site} improved your life?';
    messageInput.placeholder = messageInput.value;


    showForm();
    //Read values from URL
    if (queryParams['url']) {
        urlInput.value = queryParams['url'];
        hideForm();
    }
    if (queryParams['interval']) {
        intervalSelect.value = queryParams['interval'];
    }
    if (queryParams['message']) {
        messageInput.value = queryParams['message'];
    }

    componentElement.querySelector('.show-link').addEventListener('click', function () {
        showForm();
    });

    componentElement.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Ensure we do not redirect away the first time
        window.localStorage.setItem(urlInput.value, intervalSelect.value);

        //Ensure we can tell if the link has been used yet
        window.localStorage.setItem('usedSinceNew' + urlInput.value, false);

        window.location.href = createRedirectUrl(
            urlInput.value,
            intervalSelect.value,
            messageInput.value
        );
    });
};
