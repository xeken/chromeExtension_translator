const contextMenuProps = {
  "title": "병쨩번역",
  "id": "translator",
  "contexts": ["selection"]
};
const url = 'https://www.googleapis.com/language/translate/v2?key=';
const apiKey = 'AIzaSyDdQ6ahZ2JgCPBEewfoH9tq_n2zwnzHhAU';

chrome.contextMenus.create(contextMenuProps);
chrome.contextMenus.onClicked.addListener((info, tab) => translate(info.selectionText))

async function translate(selectedText) {

  let tempText;
  let translatedText;

  await $.ajax({
    type: "POST",
    url: url + apiKey,
    data: `&target=ja&format=html&q=${encodeURI(selectedText)}`,
    success: res => tempText = res.data.translations[0].translatedText,
    error: error => alert("중계 번역 이전 : ", error)
  });

  await $.ajax({
    type: "POST",
    url: url + apiKey,
    data: `&target=ko&format=html&q=${encodeURI(tempText)}`,
    success: res => translatedText = res.data.translations[0].translatedText,
    error: error => alert("중계 번역 이후 : ", error)
  });

  await inputStorage(selectedText, translatedText);
  //await swal("번역전: " +selectedText +"\n번역후: " +translatedText, {buttons:false});
  await alert("번역전 : " + selectedText + "\n번역후 : " + translatedText);
}

function inputStorage(selection, translation) {

  chrome.storage.local.get(function (data) {

    if (!data.kor)
      data.kor = [];
    if (!data.eng)
      data.eng = [];

    data.eng.push(selection);
    data.kor.push(translation);

    chrome.storage.local.set(data);
  });
}

chrome.commands.onCommand.addListener((press) => {

  if (press === "toggle-feature") {

    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendMessage(tab.id, { req: "selection" }, function (response) {
        if (chrome.runtime.lastError)
          alert("이 페이지에서는 사용 할 수 없나봐요.\nERROR: " + chrome.runtime.lastError.message);
        if (response.res.trim() == "") 
          alert("이프 유 워나 유징 디스, 유 슈드 투 하이라이팅 텍스트 퍼스트 ");
        else 
          translate(response.res);
      });
    });
  }
});

