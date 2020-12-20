"use strict";
// переключение блоков
let switchButton = document.querySelectorAll(".switch");
// console.log(switchButton);
for (let i = 0; i < switchButton.length; i++) {
  //console.log(switchButton[i]);
  switchButton[i].addEventListener("click", buttonSwitch);
}

function buttonSwitch() {
  //console.log(this.id);
  if (this.id == "list") {
    let wordBlock = document.querySelector(".grid-container-word");
    let listBlock = document.querySelector(".grid-container-list");
    let buttonSwitch = document.querySelector(".switch.active");
    // console.log(buttonSwitch);
    //console.log(wordBlock);
    wordBlock.style.display = "none";
    listBlock.style.display = "grid";
    buttonSwitch.classList.remove("active");
    this.classList.add("active");
  } else if (this.id == "word") {
    let wordBlock = document.querySelector(".grid-container-word");
    let listBlock = document.querySelector(".grid-container-list");
    let buttonSwitch = document.querySelector(".switch.active");

    //console.log(wordBlock);
    listBlock.style.display = "none";
    wordBlock.style.display = "grid";
    buttonSwitch.classList.remove("active");
    this.classList.add("active");
  }
}

// button xlsx



// Clear input
let buttonClearInput = document.querySelector(".clear");
let inputWord = document.querySelectorAll(".word");

buttonClearInput.addEventListener("click", clearInput);

function clearInput() {
  for (let i = 0; i < inputWord.length; i++) {
    if (inputWord[i].value != "") {
      inputWord[i].value = "";
    }
  }
}

// склонение word
let casesArr = [
  "genitive",
  "dative",
  "accusative",
  "instrumental",
  "prepositional",
];

let input = document.querySelector(".square");
input.addEventListener("click", cases);

function cases() {
  let inputValue = document.querySelector('input[name="words"]').value;
  let personData = inputValue.split(" ");
  let inputResponse = document.getElementsByClassName("cases-response");
  if (inputValue == "") {
    alert("Введите ФИО");
  } else {
    //console.log(personData);
    let person = {
      last: personData[0],
      first: personData[1],
      middle: personData[2],
    };

    // console.log(person)

    for (let i = 0; i < casesArr.length, i < inputResponse.length; i++) {
      let arr = [];
      arr = petrovich(person, casesArr[i]);
      inputResponse[i].value =
        arr["last"] + " " + arr["first"] + " " + arr["middle"];
      if (casesArr[i] === "prepositional") {
        inputResponse[i].value =
          "о " + arr["last"] + " " + arr["first"] + " " + arr["middle"];
      }
    }
  }
}

//clear texterea
let buttonClearTexterea = document.querySelector(".texterea-clear");
let textereaValue = document.querySelectorAll('textarea[name="words"]');
//console.log(textereaValue);
buttonClearTexterea.addEventListener("click", clearTexterea);
function clearTexterea() {
  for (let i = 0; i < textereaValue.length; i++) {
    if (textereaValue[i].value != "") {
      textereaValue[i].value = "";
    }
  }
}

// склонение list
let casesAll = document.querySelectorAll(".cases");
for (let i = 0; i < casesAll.length; i++) {
  casesAll[i].addEventListener("click", getList);
}
//console.log(casesAll);
function getList() {
  let idButton = this.id;
  //console.log(this.id);
  let list = document.querySelector("#words-in");
  if (list.value == "") {
    alert("Введите или вставьте список ФИО");
  } else {
    //console.log(list.value);
    let listItem = list.value.split("\n");
    transformList(listItem, idButton);
  }
}

function transformList(list, cases) {
  let listOut = document.querySelector("#words-out");
  let listArray = [];

  if (listOut.value != "") listOut.value = "";
  for (let i = 0; i < list.length; i++) {
    let personData = list[i].split(" ");
    let person = {
      last: personData[0],
      first: personData[1],
      middle: personData[2],
    };
    //console.log(person);
    listArray = petrovich(person, cases);
    // console.log(listArray);

    listOut.value +=
      listArray["last"] +
      " " +
      listArray["first"] +
      " " +
      listArray["middle"] +
      "\n";
  }
}
// export xls

let btnExportXLS = document.querySelector(".export-xlsx");
let dataTexterea = document.querySelector("#words-out");
btnExportXLS.onclick = () => {
  if (dataTexterea.value != "") {
    let dataItem = "ФИО" + "\n";
    dataItem += dataTexterea.value;
    // console.log(dataItem);
    getExport(dataItem);
  } else {
    alert("Нечего экспортировать!");
  }
};
function getExport(data) {
  const downloadlink = document.createElement("a");
  const filename = "Список ФИО";
  const dataUrl = "data:text/csv;charset=utf-8,\uFEFF";
  downloadlink.href = "data:" + dataUrl + data;
  //console.log(downloadlink.href);
  downloadlink.download = filename + ".xls";
  //document.body.appendChild(downloadlink);
  downloadlink.click();
}
