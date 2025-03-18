
// if (window.location.hostname.includes("https://maxwellcat.world/")) {
//     injectUI();
// }


document.getElementById("injectHtml").addEventListener("click", function () {
    injectUI();
});

function injectUI() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                (async function () {
                    const response = await fetch(chrome.runtime.getURL("ui/injected.html"));
                    const html = await response.text();

                    let container = document.getElementById("zoomControls");
                    if (container) {
                        controls = document.createElement("div");
                        controls.innerHTML = html;
                        container.append(controls)

                        const script = document.createElement("script");
                        script.src = chrome.runtime.getURL("injected.js");
                        document.documentElement.appendChild(script);
                    }
                })();
            }
        });
    });
}
