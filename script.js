let firstNum = 0;
let secondNum = null;
let operator = null;
let currentResult = null;

const display = document.querySelector('#calculator-display');
const numericButtons = document.querySelectorAll('.numeric-button');
const equalsButton = document.querySelector('#equals-button');
const operatorButtons = document.querySelectorAll('.operator-button')

numericButtons.forEach((button) => {
    button.addEventListener('click', numericButtonClick);
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonClick);
})

equalsButton.addEventListener('click', equalsButtonClick);

function equalsButtonClick() {
    // --- THe below logig will occur when equal is selected
    secondNum = display.innerHTML;
    currentResult = operate(firstNum, secondNum, operator);
    updateDisplay(currentResult);
    firstNum = currentResult;

}

function operatorButtonClick(e) {
    operator = e.target.innerHTML;
    firstNum = display.innerHTML;

    
    console.log(operator);
}


function numericButtonClick(e) {
    if (display.innerHTML.toString() !== '0') {
        console.log('here!')
        updateDisplay(display.innerHTML.concat(e.target.innerHTML));
    } 
    else updateDisplay(e.target.innerHTML);
}

function updateDisplay(newDisplayValue) {
    display.innerHTML = newDisplayValue;
}


function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
            break;
        case '-':
            return subtract(firstNum, secondNum);
            break;
        case '*':
            return multiply(firstNum, secondNum);
            break;
        case '/':
            return divide(firstNum, secondNum);
            break;
    
        case null:
            console.log('The operator is null');
    }
}

function add(a,b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
