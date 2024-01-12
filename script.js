//getting elements from HTML
const ac = document.querySelector('#ac'),
clear = document.querySelector('#clear'),
modulo = document.querySelector('#modulo'),
divide = document.querySelector('#divide'),
seven = document.querySelector('#seven'),
eight = document.querySelector('#eight'),
nine = document.querySelector('#nine'),
multiply = document.querySelector('#multiply'),
four = document.querySelector('#four'),
five = document.querySelector('#five'),
six = document.querySelector('#six'),
minus = document.querySelector('#minus'),
one = document.querySelector('#one'),
two = document.querySelector('#two'),
three = document.querySelector('#three'),
plus = document.querySelector('#plus'),
zero = document.querySelector('#zero'),
decimal = document.querySelector('#decimal'),
equal = document.querySelector('#equal');

//initialize numbers
let num = "0";
let numInArrayForm = [];
let total = 0;
let prevOperator = "N/A";
const MAX_LENGTH = 16; //digits

//add div to HTML
const displayContainer = document.querySelector('.display');
const displayedNumber = document.createElement('h1');
displayContainer.appendChild(displayedNumber);
displayedNumber.innerHTML = num;


//different functions
const initialize = () => {
    num = "0";
    numInArrayForm.length = 0;
}

const displayNewNumber = (newNum) => {
    return () => {
        if(newNum === "." && numInArrayForm.includes(".")) return;
        if(num === "0" && newNum != ".") num = "";

        numInArrayForm = num.split('');
        if(numInArrayForm.length === MAX_LENGTH) return
        numInArrayForm.push(newNum);
        num = numInArrayForm.join('');
        displayedNumber.textContent = num;
    }
}

const clearOne = () => {
    return () => {
        numInArrayForm = num.split('');
        numInArrayForm.pop();
        num = numInArrayForm.join('');
        if(num === "") num = "0";
        displayedNumber.textContent = num;
    }
}

const checkDecimalPosition = () => {
    let decimalChecker = num.split('');
    if(decimalChecker[decimalChecker.length] === ".") decimalChecker.pop();
    num = decimalChecker.join('');
}

const checkOperator = () => {
    checkDecimalPosition();
    let floatNum = parseFloat(num);
    let error = false;
    switch(prevOperator) {
        case "N/A": 
            total = floatNum; break;
        case "+":
            total += floatNum; break;
        case "-":
            total -= floatNum; break;
        case "*":
            total *= floatNum; break;
        case "/":
            floatNum != 0 ? total /= floatNum: error = true; 
            break;
        case "%":
            total %= floatNum; break;
        case "=":
            total = total;
    }

    if(total > 9007199254740991){
        error = true;
        alert("ERROR: Number cannot be bigger than 9007199254740992")
    }

    displayedNumber.innerHTML = error ? "ERROR" : total;
    if(error){
        total = 0;
        initialize();
    }
}

const calculate = (operation) => {
    return () => {
        checkOperator();
        prevOperator = operation;
        initialize();
    }
}

const clearAll = () => {
    return () => {
        initialize();
        prevOperator = "N/A";
        displayedNumber.innerHTML = num;
    }
}

//addingNumbers
decimal.addEventListener("click", displayNewNumber("."));
zero.addEventListener("click", displayNewNumber("0"));
one.addEventListener("click", displayNewNumber("1"));
two.addEventListener("click", displayNewNumber("2"));
three.addEventListener("click", displayNewNumber("3"));
four.addEventListener("click", displayNewNumber("4"));
five.addEventListener("click", displayNewNumber("5"));
six.addEventListener("click", displayNewNumber("6"));
seven.addEventListener("click", displayNewNumber("7"));
eight.addEventListener("click", displayNewNumber("8"));
nine.addEventListener("click", displayNewNumber("9"));

//calculations
plus.addEventListener("click", calculate("+"));
minus.addEventListener("click", calculate("-"));
multiply.addEventListener("click", calculate("*"));
divide.addEventListener("click", calculate("/"));
modulo.addEventListener("click", calculate("%"));
equal.addEventListener("click", calculate("="));

//clear
clear.addEventListener("click", clearOne());

//clearAll
ac.addEventListener("click", clearAll());
