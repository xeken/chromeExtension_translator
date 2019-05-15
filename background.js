window.selectT = "";
window.relayT = "";
window.finalT = "";

chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({title: "병쨩번역", contexts: ["selection"], id: "EE"}));
chrome.contextMenus.onClicked.addListener((info, tab) => {selectT = info.selectionText; translate(selectT);});

//connectDB();

async function translate(text) {

  let url = 'https://www.googleapis.com/language/translate/v2?key=';
  let apiKey = "apikey";

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

function connectDB(){

  let mysql = require('mysql');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'Mysql',
    password: 'root'
  });

  connection.connect(function(err) {
    if(!err)
      console.log("Success"); 
  })
}

function inputDB(){

}
