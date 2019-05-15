window.selectT = "";
window.relayT = "";
window.finalT = "";

chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({title: "병쨩번역", contexts: ["selection"], id: "EE"}));
chrome.contextMenus.onClicked.addListener((info, tab) => {selectT = info.selectionText; translate(selectT);});

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
          console.log(relayT, " -> ", finalT, '\n');
          alert("번역전 : " + text + "\n번역후 : " + finalT);
          inputStorage();
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

function inputStorage(){

  let word = {eng: selectT, kor: finalT};
  chrome.storage.local.set(word, () => console.log("INPUT SUCCESS"));
}
