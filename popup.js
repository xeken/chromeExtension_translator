const background = chrome.extension.getBackgroundPage();

let selectT = background.selectT;
let relayT = background.relayT;
let finalT = background.finalT;

function view(){

    document.getElementById("before").innerHTML = selectT;
    document.getElementById("relay").innerHTML = relayT;
    document.getElementById("after").innerHTML = finalT;
}

function inputDB(){
    /*
        insert,
        overlap,
        excel
    */
}

function download(){

    
}
view();