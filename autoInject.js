window.addEventListener('load', async function() {
    await injectUI();
});


async function injectUI() {
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
}