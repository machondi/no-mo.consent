const consentKeywords = ["accept", "agree", "cookie", "consent", "reject", "dismiss"];
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
                checkAndClickConsent(node);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    observer.observe(document.body, { childList: true, subtree: true });
    checkAndClickConsent(document.body);
});

function checkAndClickConsent(element) {
    const buttons = element.querySelectorAll("button, a");
    buttons.forEach(button => {
        const text = button.textContent.trim().toLowerCase();
        if (consentKeywords.some(keyword => text.includes(keyword))) {
            button.click();
            chrome.runtime.sendMessage({ action: "logConsent", data: text });
        }
    });
}
