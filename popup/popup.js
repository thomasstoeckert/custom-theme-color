window.onload = function() {
    const addButton = document.getElementById("addButton");
    const deleteButton = document.getElementById("deleteButton");
    
    const hostnameBlock = document.getElementById("hostname");
    const colorBlock = document.getElementById("colorcode");
    const colorInput = document.getElementById("colorInput");
    
    /// Utility Function ///
    var updateUI = function(colorcode) {
        updateButtons(colorcode);
        updateColorCode(colorcode);
    }

    var updateButtons = function(colorcode) {
        if(colorcode == undefined) {
            if(deleteButton) deleteButton.style.display = "none";
            if(addButton) addButton.style.display = "inline";
        } else {
            if(deleteButton) deleteButton.style.display = "inline";
            if(addButton) addButton.style.display = "none";
        }
    }

    var updateColorCode = function(colorcode) {
        // Update colorcode text
        if(colorcode === undefined) {
            // Hide Colorcode Block
            colorBlock.style.display = "none";
            // Show input
            colorInput.style.display = "inline-block";
        } else {
            // Update colorBlock visuals
            colorBlock.innerHTML = colorcode;
            colorBlock.style.color = colorcode;
            // Reveal colorBlock, hide colorInput
            colorBlock.style.display = "inline";
            colorInput.style.display = "none";
        }
    }

    var getHostname = function(callback) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            callback(new URL(tabs[0].url).hostname);
        });
    }

    /// Assign functionality to Buttons

    if (addButton) {
        addButton.onclick = function() {
            // Add our hostname, register theme color
            getHostname(function(hostname) {
                var payload = {};
                payload[hostname] = colorInput.value;
                chrome.storage.local.set(payload, function() {});
            });
        }
    }

    if (deleteButton) {
        deleteButton.onclick = function() {
            getHostname(function(hostname) {
                chrome.storage.local.remove([hostname], function() {});
            });
        }
    }
    
    // Establish initial state of the page
    getHostname(function(hostname) {
        hostnameBlock.innerHTML = hostname;

        var payload = [];
        payload.push(hostname);
    
        chrome.storage.local.get(payload, function(result) {
            
            var colorcode = result[hostname];
            updateUI(colorcode);
        });
    });

    // Listen to future changes
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        getHostname(function(hostname) {
            for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                // If the value of our current site was changed, refresh the UI
                if(key === hostname) {
                    updateUI(newValue);
                }
              }
        });
    });
}

