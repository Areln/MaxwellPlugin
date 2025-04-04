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
        script.type = "module";
        script.src = chrome.runtime.getURL("inject/injected.js");
        document.documentElement.appendChild(script);

        // Add path here because we cannot get it in the injected script
        const oiiaElement = document.createElement('div');
        oiiaElement.id = 'oiia';
        oiiaElement.dataset.path = chrome.runtime.getURL('oiia.glb');
        oiiaElement.style.display = 'none';
        document.body.appendChild(oiiaElement);
    }
}