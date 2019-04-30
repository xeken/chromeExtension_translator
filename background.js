chrome.contextMenus.onClicked.addListener(
  function (info, tab) {

    translate(info.selectionText);
    // if (info.menuItemId === "EE")
    //   translate(info.selectionText);
    // else if (info.menuItemId === "JJ")
    //   translate(info.selectionText);

  }
);

chrome.runtime.onInstalled.addListener(function () {

  chrome.contextMenus.create({ title: "번역인게시야 하", contexts: ["selection"], id: "EE" });
  //chrome.contextMenus.create({ title: "Japanese To Korean", contexts: ["selection"], id: "JJ" });
});
window.relayT = "";
window.finalT = "";
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
          //chrome.open('chrome-extension://ojojlnlgnmppenikhmkiehkbhjleflle/popup.html');
          finalT = res2.data.translations[0].translatedText
          console.log(relayT, " -> ", finalT, '\n');
          window.open("popup.htm", "extension_popup", "status=no, scrollbars=yes, resizable=no");
        },
        error: function (error) {
          console.log("중계 번역 이후의 에러입니다.",error);
        }
      })

    },
    error: function (error) {
      console.log("중계 번역 이전의 에러입니다.",error);
    }
  })

}

// await $.ajax({

//   type: "GET",  // get일땐 접속 가능, post일떈 403 접속에러
//   url: url,
//   dataType: "text",
//   success: function (res) {

//     console.log(res);

//     if ($(res).find('tlid-translation translation').length > 0) //번역결과 div id
//       console.log("성공");
//     //alert($(this).text());
//   },
//   error: function (error) {
//     console.log(error);
//   }
// });  
// `https://translate.google.com/translate_a/single?client=webapp&sl=${lang}&tl=ko&hl=${lang}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=182148.286476&q=hello`
//   `https://translate.google.com/translate_a/single?client=webapp&sl=${lang}&tl=ko&hl=${lang}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=579056.937336&q=${encodeURI(text)}`
//   `https://translate.google.com/translate_a/single?client=webapp&sl=${lang}&tl=ko&hl=${lang}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=579056.937336&q=${encodeURI(text)}`
//         //let url = `https://translate.google.com/#view=home&op=translate&sl=${lang}&tl=ko&text=${encodeURI(text)}`
//let url = `https://translate.google.com/#${lang}/ko/}`;
//let purl = `https://papago.naver.com/?sk=${lang}&tk=ko&hn=0&st=${encodeURI(text)}`;
//console.log(url);

const fuck = "번역기 페이지링크로 ajax하였으나 번역기 상에서 또 한 번 ajax통신을 하기 때문에 response와 페이지 소스가 달랐다.\
              그리하여 번역기 상에서 ajax통신하는 것을 캡쳐해와 내가 직접 통신하니 성공하였다. 적절한 결과가 나왔다. \
              하지만 헤더중 tk라는 항목때문에 q가 바뀌면 에러를 배출한다.\
              결국 api를 사용하여야 할 것 같다.\
              아니면 헤더 리버싱하든가 hhhhhh\
              역시 답은 api였다. api를 사용하자♥"


