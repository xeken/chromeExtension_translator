// const background = chrome.extension.getBackgroundPage();

// let selectT = background.selectT;
// let finalT = background.finalT;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){

        nonTrans = request.eng;
        let trans = request.kor;
        console.log(nonTrans, trans);
    }   
)
function view(){

   
}

function download(){

    
    chrome.storage.local.get(null, function(items){ 
        let allKeys = Object.keys(items);
        console.log(allKeys);
    })

    // for(var i = 0; i < localStorage.length; i++){
    // console.log(localStorage.key(i));
    // }


    //let word = ["eng", "kor"];
    // chrome.storage.local.get(word, function(items){
    //     let eng = items.eng;
    //     let kor = items.kor;

    //     console.log(eng, kor, "크롬 로컬 스토리지")
    // })
}
