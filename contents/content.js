chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(window.getSelection().toString());
    if (request.req == "selection")
        sendResponse({ res: window.getSelection().toString() });
    if (request.req == "translate")
        swal({
            text: request.selected +"\n" +request.translated,
            icon: "success",
            button: false,
        });
    if (request.req == "selectIsNothing")
        swal({
            title: "알간?",
            text: request.msg,
            icon: "error",
        })
});
