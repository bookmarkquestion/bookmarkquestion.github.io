var HmtRedirectComponent = function (componentElement, urlService, window) {
    function filterInnerHtml(unfilteredValue) {
        return (unfilteredValue.replace('<', '').replace('>', ''));
    }

    function renderMessage(message, url) {
        var site = urlService.extractDomain(url);
        messageSpan.innerHTML = filterInnerHtml(queryParams['message'].replace('{site}', site));
        visitButton.innerHTML = filterInnerHtml('Visit ' + site);
    }

    componentElement.style.display = 'none';

    var queryParams = urlService.getQueryParams(window.document.location.search);

    if (!queryParams['url'] || !queryParams['interval'] || !queryParams['message']) {
        return;
    }

    var url = queryParams['url'];
    var interval = queryParams['interval'];
    var message = queryParams['message'];


    var visitButton = componentElement.querySelector('button.visit-button');
    var cancelButton = componentElement.querySelector('button.cancel-button');
    var messageSpan = componentElement.querySelector('span.message-span');


    if (window.localStorage.getItem('usedSinceNew' + url) === null) {
        alert('hi');
    }
    window.localStorage.setItem('usedSinceNew' + url, true);

    if (interval > 1) {
        var count = parseInt(window.localStorage.getItem(url));
        console.log(count);
        if (count < interval - 1) {
            window.localStorage.setItem(url, count + 1);
            window.location.href = url;
            window.document.body.innerHTML = '';//Prevent page flicker when redirecting
            return;
        } else {
            window.localStorage.setItem(url, 0);
        }
    }

    renderMessage(message, url);

    visitButton.addEventListener('click', function () {
        window.location.href = url;
    });
    cancelButton.addEventListener('click', function () {
        window.close(); //For new windows and tabs
        window.history.back(); //For pre-existing windows and tabs
    });

    componentElement.style.display = 'block'; // display='initial' didn't work in IE11
};
