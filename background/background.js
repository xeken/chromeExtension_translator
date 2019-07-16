const contextMenuProps = {
  "title": "병쨩번역",
  "id": "translator",
  "contexts": ["selection"]
};
const url = 'https://www.googleapis.com/language/translate/v2?key=';
const apiKey = 'YOUR API KEY';

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
    error: error => alert("에러가 발생했데요, 병현님을 기다리세요 \n", error)
  });

  await $.ajax({
    type: "POST",
    url: url + apiKey,
    data: `&target=ko&format=html&q=${encodeURI(tempText)}`,
    success: res => translatedText = res.data.translations[0].translatedText,
    error: error => alert("에러가 발생했데요, 병현님을 기다리세요 \n", error)
  });

  await inputStorage(selectedText, translatedText);

  //await alert("번역전 : " + selectedText + "\n번역후 : " + translatedText);
  await chrome.tabs.getSelected(null, async (tab) =>{

    await chrome.tabs.sendMessage(tab.id, {req: "translate", selected: selectedText, translated: translatedText}, (error) => {if(chrome.runtime.lastError)console.log("translate: "+chrome.runtime.lastError.message)});
  })
}

function inputStorage(selection, translation) {

  chrome.storage.local.get((data) => {

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

  if (press === "toggle-feature")

    chrome.tabs.getSelected(null, (tab) => {

      chrome.tabs.sendMessage(tab.id, { req: "selection" }, (response) => {

        if (chrome.runtime.lastError)
          alert("이 페이지에서는 사용 할 수 없나봐요.\nERROR: " + chrome.runtime.lastError.message);
        if (response.res.trim() == "")
          chrome.tabs.sendMessage(tab.id, { req: "selectIsNothing", msg: "이프 유 원트 투 유즈 디스, 유 슈드 투 셀렉트 텍스트 퍼스트"}, (error) => console.log(error));
        else
          translate(response.res);
      });
    });
});


