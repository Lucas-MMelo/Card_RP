const inputNumber = document.getElementById("number");
const inputName = document.getElementById("name");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputCVC = document.getElementById("cvc");

inputNumber.addEventListener("keypress", (event) => {
    let size = inputNumber.value.length;
    
    if(size === 4 || size === 9 || size === 14) {
        inputNumber.value += " ";
    }

    checkIfNumbers(event);

    att("number", "numberCard");
});

inputCVC.addEventListener("keypress", (event) =>{

    checkIfNumbers(event);

    att("cvc", "cvcUser");
});

function checkIfNumbers(sent){
    let check = sent.keyCode;

    if(check <= 47 || check >= 58){
        sent.preventDefault();
    }
}

inputName.addEventListener("keypress", (event) => {
    let check = event.keyCode;

    if(check >= 48 && check <= 57){
        event.preventDefault();
    }

    att("name", "nameUser");
});


function att(first, second) {
    document.getElementById(first).oninput = () => {
        document.getElementById(second).innerText =
        document.getElementById(first).value;
    }
}

att("month", "monthUser");
att("year", "yearUser");

function confirm(){

    let checkName = inputName.value;
    let checkNumber = inputNumber.value;
    let checkMonth = inputMonth.value;
    let checkYear = inputYear.value;
    let checkCVC = inputCVC.value;

    checkContents(checkName, "warningName", inputName);
    checkContents(checkNumber, "warningNumbers", inputNumber);
    checkContents(checkCVC, "warningCVC", inputCVC);

    checkNumbers(checkNumber, "warningNumbers", inputNumber);
    checkNumbers(checkCVC, "warningCVC", inputCVC);

    checkLettersOnNumbers(checkNumber, "warningNumbers", inputNumber);
    checkLettersOnNumbers(checkCVC, "warningCVC", inputCVC);

    if(checkMonth == "month" || checkYear == "year"){
        let msg = "Can't be blank";
        document.getElementById("warningData").innerHTML = msg;
    } else {
        document.getElementById("warningData").innerHTML = null;
    }

    if(inputName.classList.contains("error") || inputNumber.classList.contains("error") || inputCVC.classList.contains("error") || checkMonth == "month" || checkYear == "year") {
    } else {
        complete();
    }
}

function checkContents(sent, target, inputTarget){
    if(sent == ''){
        let msg = "Can't be blank";
        document.getElementById(target).innerHTML = msg;
        inputTarget.classList.add("error");
    } else {
        document.getElementById(target).innerHTML = null;
        inputTarget.classList.remove("error");
    }
}

function checkNumbers(sent, target, inputTarget){
    if(target == "warningNumbers"){
        if(sent.length != 19){
            let msg = "Not enough numbers";
            document.getElementById(target).innerHTML = msg;
            inputTarget.classList.add("error");
            } else {
            document.getElementById(target).innerHTML = null;
            inputTarget.classList.remove("error");
        }
    }

    if(target == "warningCVC"){
        if(sent.length != 3){
            let msg = "Not enough numbers";
            document.getElementById(target).innerHTML = msg;
            inputTarget.classList.add("error");
            } else {
            document.getElementById(target).innerHTML = null;
            inputTarget.classList.remove("error");
        }
    }
}

function checkLettersOnNumbers(sent, target, inputTarget){
    for (let i = 0; i < sent.length; i++){
        if(sent[i].search(/[^a-zA-Z]+/)){
            let msg = "Wrong format. Numbers only";
            document.getElementById(target).innerHTML = msg; 
            inputTarget.classList.add("error");
        }
    }
}

function complete(){

    let targetDiv = document.getElementById("secondPart");
    targetDiv.style.display = "none";

    let newDiv = document.createElement("div");
    newDiv.classList.add("secondPart")
    let targetFather = document.getElementById("content");

    let img = document.createElement("img");
    img.src = "../\ASSETS/\IMAGENS/\icon-complete.png";

    let newH = document.createElement("p");
    newH.innerHTML = "Thank you!";

    let newP = document.createElement("p");
    newP.innerHTML = "We've added your card details";
    
    newP.classList.add("msg", "center");
    newH.classList.add("center");

    let newBttn = document.createElement("button");
    newBttn.setAttribute('type','button');
    newBttn.appendChild(document.createTextNode("Continue"));
    newBttn.classList.add("confirm");
    
    newDiv.appendChild(img);
    newDiv.appendChild(newH);
    newDiv.appendChild(newP);
    newDiv.appendChild(newBttn);

    targetFather.appendChild(newDiv);
    
}