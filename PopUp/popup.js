chrome.storage.local.get((data) => {
    if (data.eng || data.kor){
        document.getElementById('before').innerHTML = data.eng[data.eng.length-1];
        document.getElementById('after').innerHTML = data.kor[data.kor.length-1];
    }
});

document.getElementById('newTab').addEventListener('click', _ => window.open("/words/words.htm"));

