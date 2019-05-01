window.selectT = "";
window.relayT = "";
window.finalT = "";

chrome.contextMenus.onClicked.addListener(
  function (info, tab) {

    selectT = info.selectionText;
    translate(selectT);
  }
);

chrome.runtime.onInstalled.addListener(
  function () {
    chrome.contextMenus.create({ title: "번역인게시야", contexts: ["selection"], id: "EE" });
  }
);

async function translate(text) {

  let url = 'https://www.googleapis.com/language/translate/v2?key=';
  let apiKey = '';


  $.ajax({

    type: "POST",
    url: url + apiKey,
    data: `&target=ja&format=html&q=${encodeURI(text)}`, //일본어로 중계번역을 한 번 거친다.
    success: function (res) {

      relayT = res.data.translations[0].translatedText;
      console.log(text, " -> ", relayT);

      $.ajax({

        type: "POST",
        url: url + apiKey,
        data: `&target=ko&format=html&q=${encodeURI(relayT)}`,
        success: function (res2) {

          finalT = res2.data.translations[0].translatedText
          console.log(relayT, " -> ", finalT, '\n');
          window.open("popup.htm", "extension_popup", "height=250, width=300, status=no, scrollbars=no, resizable=no");
        },
        error: function (error) {
          console.log("중계 번역 이후의 에러입니다.", error);
        }
      })

    },
    error: function (error) {
      console.log("중계 번역 이전의 에러입니다.", error);
    }
  })

}


