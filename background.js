chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({title: "병쨩번역", contexts: ["selection"], id: "EE"}));
chrome.contextMenus.onClicked.addListener((info, tab) => translate(info.selectionText));

async function translate(selectedText) {

  let url = 'https://www.googleapis.com/language/translate/v2?key=';
  let apiKey = 'API_KEY';

  $.ajax({

    type: "POST",
    url: url + apiKey,
    data: `&target=ja&format=html&q=${encodeURI(selectedText)}`, //일본어로 중계번역을 한 번 거친다.
    success: function (res) {

      let relayText = res.data.translations[0].translatedText;
      console.log(selectedText, " -> ", relayText);

      $.ajax({

        type: "POST",
        url: url + apiKey,
        data: `&target=ko&format=html&q=${encodeURI(relayText)}`,
        success: function (res) {
          
          let translatedText = res.data.translations[0].translatedText
          console.log(relayText, " -> ", translatedText);

          inputStorage(selectedText, translatedText);
          chrome.runtime.sendMessage({eng: selectedText, kor: translatedText});

          alert("번역전 : " + selectedText + "\n번역후 : " + translatedText);
        },
        error: function (error) {
          console.log("중계(일어) 번역 이후의 에러입니다.", error);
        }
      })

    },
    error: function (error) {
      console.log("중계(일어) 번역 이전의 에러입니다.", error);
    }
  })

}

function inputStorage(eng, kor){

  let word = {eng: eng, kor: kor};
  chrome.storage.local.set(word, () => console.log("스토리지 저장 완료"));
}
