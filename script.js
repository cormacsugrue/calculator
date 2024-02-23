let firstNum = 0;
let secondNum = null;
let operator = null;
let currentResult = null;

const display = document.querySelector('#calculator-display');
const numericButtons = document.querySelectorAll('.numeric-button');
const equalsButton = document.querySelector('#equals-button');
const operatorButtons = document.querySelectorAll('.operator-button')
const clearButton = document.querySelector('#clear-button');

numericButtons.forEach((button) => {
    button.addEventListener('click', numericButtonClick);
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonClick);
})

equalsButton.addEventListener('click', equalsButtonClick);

clearButton.addEventListener('click', clearButtonClick);

function equalsButtonClick() {
    // --- THe below logig will occur when equal is selected
    secondNum = display.innerHTML;
    currentResult = operate(firstNum, secondNum, operator);
    updateDisplay(currentResult);
    firstNum = currentResult;
}

function clearButtonClick() {
    firstNum = 0;
    secondNum = null;
    operator = null;

    updateDisplay(firstNum);

}

function operatorButtonClick(e) {
    operator = e.target.innerHTML;
    firstNum = display.innerHTML;

    
    console.log(operator);
}


function numericButtonClick(e) {
    // Numeric button click without operator selected
    if (operator === null) {
        if (display.innerHTML.toString() !== '0') {
            // console.log('here!')
            updateDisplay(display.innerHTML.concat(e.target.innerHTML));
        } 
        else updateDisplay(e.target.innerHTML);
    }
    // First numeric button clicked after operator selected
    else if (secondNum === null) {
        secondNum = e.target.innerHTML;
        updateDisplay(secondNum);
        
    }    
    // Subsequent numberic button clicked after operator selected
    else {
        secondNum = display.innerHTML.concat(e.target.innerHTML);
        updateDisplay(secondNum);
    } 
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
