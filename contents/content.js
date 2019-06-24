chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.req == "selection")
        sendResponse({ res: window.getSelection().toString() });  // 응답을 보냄
});
