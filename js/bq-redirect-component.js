var HmtRedirectComponent = function (componentElement, urlService, window) {
    function filterInnerHtml(unfilteredValue) {
        return (unfilteredValue.replace('<', '').replace('>', ''));
    }

    function renderMessage(message, site) {
        messageSpan.innerHTML = filterInnerHtml(queryParams['message'].replace('{site}', site));
        visitButton.innerHTML = filterInnerHtml('Visit ' + site);
    }

    componentElement.style.display = 'none';

    var queryParams = urlService.getHashParams(window.document.location.hash);

    if (!queryParams['url'] || !queryParams['interval'] || !queryParams['message']) {
        return;
    }

    var url = queryParams['url'];
    var site = urlService.extractDomain(url);
    var interval = queryParams['interval'];
    var message = queryParams['message'];

    window.document.title = site; //Makes bookmarks look better

    var visitButton = componentElement.querySelector('button.visit-button');
    var cancelButton = componentElement.querySelector('button.cancel-button');
    var messageSpan = componentElement.querySelector('span.message-span');

    if (window.localStorage.getItem('usedSinceNew' + url) == 0) {
        componentElement.querySelector('.bookmark-now-alert').style.display = 'block';
    }
    window.localStorage.setItem('usedSinceNew' + url, 1);

    if (interval > 1) {
        var count = parseInt(window.localStorage.getItem(url));
        if (count < interval - 1) {
            window.localStorage.setItem(url, count + 1);
            window.location.href = url;
            window.document.body.innerHTML = '';//Prevent page flicker when redirecting
            return;
        } else {
            window.localStorage.setItem(url, 0);
        }
    }

    renderMessage(message, site);

    visitButton.addEventListener('click', function () {
        window.location.href = url;
    });
    cancelButton.addEventListener('click', function () {
        window.close(); //For new windows and tabs
        window.history.back(); //For pre-existing windows and tabs
    });

    componentElement.style.display = 'block'; // display='initial' didn't work in IE11
};
