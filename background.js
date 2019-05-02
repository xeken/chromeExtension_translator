window.selectT = "";
window.relayT = "";
window.finalT = "";
window.finalT2 = "";
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
  let apiKey = 'AIzaSyDdQ6ahZ2JgCPBEewfoH9tq_n2zwnzHhAU';

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
          try {
            for (let i = 0; i < 4; i++) {
              finalT2 = res2.data.translations[i];
              console.log(finalT);
            }
          } catch (err) { console.log(err); }
          //window.open("popup.htm", "extension_popup", "height=250, width=300, status=no");
          console.log(relayT, " -> ", finalT, '\n');
          alert("번역전 : " + text + "\n번역후 : " + finalT);
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

  $.ajax({

    type: 'GET',
    url: `http://www.dgsw.hs.kr/user/carte/list.do`,
    success: function(meals){
      console.log(meals);
    },
    error: function(meE){
      console.log(meE);
    }
  })
}


          