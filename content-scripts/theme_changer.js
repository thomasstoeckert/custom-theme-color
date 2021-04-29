var pageHostname = location.hostname;

var updateTheme = function(color) {
    var metatag = document.getElementsByName("theme-color");
    if(metatag.length == 0) {
        var newtag = document.createElement('meta');
        newtag.setAttribute("name", "theme-color");
        newtag.setAttribute("content", color);
        document.getElementsByTagName('head')[0].appendChild(newtag);
    } else {
        metatag[0].setAttribute("content", color);
    }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        // If the value of our current site was changed, refresh the UI
        if(key === pageHostname) {
            updateTheme(newValue);
        }
    } 
});

chrome.storage.local.get([pageHostname], function(result) {
    if(result[pageHostname] !== undefined) {
        updateTheme(result[pageHostname]);
    }
});