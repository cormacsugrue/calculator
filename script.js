let firstNum = 0;
let secondNum = null;
let operator = null;
let currentResult = null;
let hasDecimal = false;
let equalsButtonFlagSet = false;


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

clearButton.addEventListener('click', initialize);

function equalsButtonClick() {
// Check if operatior has been selected and sets the current result to the display
    if (operator === null) {
        // Do nothing
        return;
    }
// If an operator has been selected check if the second number has been set
    else if (secondNum === null ){
        // if no previous result run the operator on itself
        if (currentResult === null) {
            currentResult = operate(firstNum, firstNum, operator);
        }
        // If there is a previous result run the operator recursively  
        else {
            currentResult = operate(firstNum, currentResult, operator)
        }
        updateDisplay(currentResult);
        return;
    }
    // If there is second number run operator on the 2 numbers
    else {
        currentResult = operate(firstNum, secondNum, operator);
        updateDisplay(currentResult);
        firstNum = currentResult;
        secondNum = null;
        hasDecimal = false;
        equalsButtonFlagSet = true;

        operator = null;
    }
        
}



function initialize() {
    firstNum = 0;
    secondNum = null;
    operator = null;
    hasDecimal = false;
    currentResult = null;
    equalsButtonFlagSet = false;
    updateDisplay(firstNum);

}

function operatorButtonClick(e) {
    if (secondNum !== null) {
        currentResult = operate(firstNum, secondNum, operator);
        updateDisplay(currentResult);
        secondNum = null;
    }

    operator = e.target.innerHTML;
    firstNum = display.innerHTML;
    hasDecimal = false;
    equalsButtonFlagSet = false;
    

    
    console.log(operator);
}


function numericButtonClick(e) {
    
    if (equalsButtonFlagSet === true) {
        initialize();
    }

    if (e.target.innerHTML === '.') {
        if (hasDecimal === true) {
            return;
        }
        else {
            hasDecimal = true;
        }
    }
    // Numeric button click without operator selected
    if (operator === null) {
         // Check the length of the display 
        if (display.innerHTML.length === 9) {
            return;
        }
        // case where display is showing zero
        if (display.innerHTML.toString() !== '0') {
            // console.log('here!')
            updateDisplay(display.innerHTML.concat(e.target.innerHTML));
        } 
        // case where button selected is decimal when display is zero
        else if (e.target.innerHTML === '.') {
            updateDisplay('0.');
        }
        else updateDisplay(e.target.innerHTML);
    }


    // First numeric button clicked after operator selected
    else if (secondNum === null) {
        if (e.target.innerHTML === ".") {
            secondNum = '0.'
        }
        else {
            secondNum = e.target.innerHTML;
        }
        updateDisplay(secondNum);
        
    }    
    // Check the length of the display 
    else if (display.innerHTML.length === 9) {
        return;
    }
    // Subsequent numeric button clicked after operator selected
    else {
        secondNum = display.innerHTML.concat(e.target.innerHTML);
        updateDisplay(secondNum);
    } 
}

function updateDisplay(newDisplayValue) {
    display.innerHTML = newDisplayValue;
}


function operate(firstNum, secondNum, operator) {
    let result;

    switch (operator) {
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case '*':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
    
        case null:
            console.log('The operator is null');
    }

    return Math.round(result * 10000000) / 10000000;
}

function add(a,b) {
    return +a + +b;
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
