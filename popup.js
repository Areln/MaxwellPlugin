

document.getElementById("injectHtml").addEventListener("click", function () {
    injectUI();
});

function injectUI() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                (async function() {
                    console.log('Helloo');
                    const response = await fetch(chrome.runtime.getURL("inject/injected.html"));
                    const html = await response.text();

                    let container = document.getElementById("zoomControls");
                    if (container) {
                        controls = document.createElement("div");
                        controls.innerHTML = html;
                        container.append(controls)

                        const script = document.createElement("script");
                        script.src = chrome.runtime.getURL("inject/injected.js");
                        document.documentElement.appendChild(script);
                    }
                })();
            }
        });
    });
}
