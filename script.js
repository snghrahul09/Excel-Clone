let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .col")
// console.log(allCells);
let addressBar = document.querySelector(".address_box")
let leftBtn = document.querySelector(".left")
let rightBtn = document.querySelector(".right")
let centerBtn = document.querySelector(".center")
let fontBtn = document.querySelector(".font_size")
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment_container>input");
let formulaInput = document.querySelector(".formula_box");
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top-left-block");
let sheetDB = workSheetDB[0];

firstSheet.addEventListener("click", handleActiveSheet);
gridContainer.addEventListener("scroll", function () {
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})
//create Sheet and add functionalities
addBtnContainer.addEventListener("click", function () {
    let sheetArr = document.querySelectorAll(".sheet");
    let lastsheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastsheetElem.getAttribute("SheetIdx");
    idx = Number(idx);
    let newSheet = document.createElement("div")
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("SheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 1}`;
    //page add
    sheetList.appendChild(newSheet);
    //db active set
    sheetArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    sheetArr = document.querySelectorAll(".sheet")
    sheetArr[sheetArr.length - 1].classList.add("active_sheet");
    //2d array
    initCurrentSheetdb();
    // current change
    sheetDB = workSheetDB[idx];
    //cell empty
    //new page elment value empty
    initUI();
    //change sheet
    newSheet.addEventListener("click", handleActiveSheet);

})
function handleActiveSheet(e) {
    let mySheet = e.currentTarget;
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    });
    if (!mySheet.classList[1]) {
        mySheet.classList.add("active_sheet");
    }
    //Sheet
    let SheetIdx = mySheet.getAttribute("SheetIdx");
    sheetDB = workSheetDB[SheetIdx - 1];
    //get data from that and setUI
    setUI(sheetDB);

}
// ************************************************************************
//address seton click of a cell
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", function handleCell() {
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObject = sheetDB[rid][cid];
        // console.log(cellObject);
        // styling-> set 
        // object styling set 
        // UI 
        // cell
        // boldness
        if (cellObject.formula != "") {
            formulaInput.value = cellObject.formula;
        } else {
            formulaInput.value = "";
        }
        // console.log(cellObject.halign);
        if (cellObject.bold == true) {
            boldElem.classList.add("active-btn");
        } else {
            boldElem.classList.remove("active-btn");
        }
        if (cellObject.italic == true) {
            italicElem.classList.add("active-btn");
        } else {
            italicElem.classList.remove("active-btn");
        }
        if (cellObject.underline == true) {
            underlineElem.classList.add("active-btn");
        } else {
            underlineElem.classList.remove("active-btn")
        }

        //alignment
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }
        console.log(cellObject.halign);
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active-btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
            // right active
        } else if (cellObject.halign == "center") {
            // center active
            centerBtn.classList.add("active-btn")
        }
    });

    allCells[i].addEventListener("keydown", function (e) {
        let obj = allCells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col_box")[rid];
        leftCol.style.height = height + "px";
    });
}

//intial cell click emulate
allCells[0].click();
//**********************formatting**************************** */

leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
})

rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
})

centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
})

fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize + "px";
})

fontFamily.addEventListener("change", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cFont = fontFamily.value;
    cell.style.fontFamily = cFont;
})

boldElem.addEventListener("click", function () {
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active-btn");
        cellObject.bold = true;
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
        cellObject.bold = false;
    }
})

italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active-btn");
        cellObject.italic = true;
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
        cellObject.italic = false;
    }
})

underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
        cellObject.underline = true;
    } else {
        // cell text normal
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
        cellObject.underline = false;
    }
})
// ****************************************************************


function initUI() {
    for (let i = 0; i < allCells.length; i++) {
        //boldness
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none"
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px"
        allCells[i].style.textAlign = "left"
        allCells[i].style.innerText = ""
    }
}

function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
        }
    }
}

/* ***************************formula box******************** */
// cell blur functionality
//get "Value" -> value
// on Formula Value -> Set manually Value 
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        if (cellObject.value == cell.innerText) {
            return;
        }

        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }
        cellObject.value = cell.innerText;
        changeChildrens(cellObject);
    });
}
// formula bar enter
// On value -> set formula
// get old formula -> update to new formula
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let newFormula = formulaInput.value;
        //get Current cell
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == newFormula) {
            return;
        }
        if (prevFormula != "" && prevFormula != newFormula) {
            removeFormula(cellObject, address);
        }
        let evaluatedValue = evaluateFormula(newFormula);
        setUIByFormula(evaluatedValue, rid, cid);
        //db -> works
        setFormula(evaluatedValue, newFormula, rid, cid, address);
        changeChildrens(cellObject);

    }
});

function evaluateFormula(formula) {
    //"( A1 + A2 )"
    let formulaTokens = formula.split(" ");
    //split
    //[(, A1, +, A2, )]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharFromCode = formulaTokens[i].charCodeAt(0);
        if (firstCharFromCode >= 65 && firstCharFromCode <= 90) {
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            // getting value from DB
            let { value } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }

    //infix evaluate
    let ans = eval(formula);
    return ans;
    //eval
    //10+20
}

function setUIByFormula(value, rid, cid) {
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
    //set formula on UI
}

function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    //split
    //[(, A1, +, A2, )]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharFromCode = formulaTokens[i].charCodeAt(0);
        if (firstCharFromCode >= 65 && firstCharFromCode <= 90) {
            let parentRidCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRidCid.rid][parentRidCid.cid];
            // getting value from DB
            cellObject.children.push(address);
        }
    }
}
function changeChildrens(cellObject) {
    let childrens = cellObject.children;
    console.log(childrens)
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRiCiObj = getRIdCIdfromAddress(chAddress);
        let chObj = sheetDB[chRiCiObj.rid][chRiCiObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRiCiObj.rid, chRiCiObj.cid);
        chObj.value = evaluatedValue;
        changeChildrens(chObj);
    }
}
//remove yourself from parent's children array
function removeFormula(cellObject, address) {
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    //split
    //[(, A1, +, A2, )]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharFromCode = formulaTokens[i].charCodeAt(0);
        if (firstCharFromCode >= 65 && firstCharFromCode <= 90) {
            let parentRidCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRidCid.rid][parentRidCid.cid];
            let childrens = parentCellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}
// ********************** helper Fn*******************
function getRIdCIdfromAddress(address) {
    let cellcolAdr = address.charCodeAt(0);
    let cellrowAdr = address.slice(1);
    let cid = cellcolAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };
}

function detectCycle(e) {
    let cycle = true;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cellObject = sheetDB[rid][cid];
    // let parents = cellObject.children;
    cellObject.forEach(cell => {
        let 
        if (cell.formula != "") {
            alert("Already formula exist");
        }
        
    });
}
detectCycle();