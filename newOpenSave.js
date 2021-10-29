let download = document.querySelector(".download");
download.addEventListener("click", function () {
    const data = JSON.stringify(workSheetDB);
    //blob
    //xslx npm
    const blob = new Blob([data], { 'message': 'Hello world' });
    const url = window.URL.createObjectURL(blob);
    //download btn
    let a = document.createElement("a");
    //download
    a.download = "file.Json";
    a.href = url;
    a.click();
});

let openFile = document.querySelector(".open_file");
openFile.addEventListener("click", function () {
    let files = openFile.files;
    let reqFileObj = files[0];
    var fr = new FileReader();
    fr.readAsText(reqFileObj);
    fr.addEventListener("load", function () {
//data
//excel
console.log(fr.result);

    })
});