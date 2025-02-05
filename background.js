chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "logConsent") {
        console.log("Consent logged:", request.data);
    }
});
