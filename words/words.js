$(document).ready(_ => {

    chrome.storage.local.get(null, all => {

        let eng = all.eng;
        let kor = all.kor;

        for (let i in eng) {

            $('.result > tbody:last').append(`
                <tr>
                    <td scope="row">${eng[i]}</td>
                    <td>${kor[i]}</td>
                    <td><button id="${i}" class="delete"></button></td>
                </tr>
            `);
        }

        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(buttons => {
            buttons.addEventListener('click', event => {
                console.log($(event.target));
                console.log($(event.target).parent().parent());
                $(event.target).parent().parent().remove();
                deleteDataFromStorage(event);
            });
        });
    });
    $('#export').click(function () {
        $("#table_data").table2excel({
            name: "병쨩번역",
            filename: "words",
            fileext: ".xls"
        });
    });
    //$('#export').click( _ => exportTableToExcel());
    $('#reset').click( _ => {chrome.storage.local.clear(); location.reload();});
});

function deleteDataFromStorage(event) {
    chrome.storage.local.get(function (data) {
        data.eng.splice(event.target.id, 1)
        data.kor.splice(event.target.id, 1);

        chrome.storage.local.set(data)
    });
}

// function exportTableToExcel() {


//     const dataType = 'application/vnd.ms-excel';
//     let tableHTML = document.getElementById('table_data').outerHTML.replace(/ /g, '%20');
//     const filename = 'words.xls';
//     const encoding = '\ufeff';
//     let downloadLink = document.createElement("a");
//     document.body.appendChild(downloadLink);

//     if (navigator.msSaveOrOpenBlob) {
//         let blob = new Blob([encoding, tableHTML], { type: dataType });
//         navigator.msSaveOrOpenBlob(blob, filename);
//     } else {
//         downloadLink.href = 'data:' + dataType + ', ' +tableHTML;
//         downloadLink.download = filename;
//         downloadLink.style.display = 'none';
//         downloadLink.click();
//     }
// }
