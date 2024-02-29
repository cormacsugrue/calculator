let firstNum = 0;
let secondNum = null;
let operator = null;
let currentResult = null;
let hasDecimal = false;
let equalsButtonFlagSet = false;


const display = document.querySelector('#calculator-display');
const numericButtons = document.querySelectorAll('.numeric-button');
const equalsButton = document.querySelector('#equals-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('#clear-button');
const backspaceButton = document.querySelector('#backspace-button');

document.addEventListener('keydown', keypressed);


// Keyboard functionality for all buttons
function keypressed(e) {
    let clickEvent = new CustomEvent('click');;
    let buttonPressed;
    if(e.key >= 1 && e.key <= 9) {
        buttonPressed = document.querySelector(`#number-${e.key}`);
        buttonPressed.dispatchEvent(clickEvent);
    }
    
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        switch (e.key) {
            case '+':
                buttonPressed = document.querySelector(`#operator-plus`);
                break;
            case '-':
                buttonPressed = document.querySelector(`#operator-minus`);
                
                break;
            case '*':
                buttonPressed = document.querySelector(`#operator-multiply`);

                break;
            case '/':
                buttonPressed = document.querySelector(`#operator-divide`);

                break;
        }
        buttonPressed.dispatchEvent(clickEvent);
    }
    else if (e.key === '=' || e.key === 'Enter') {
        buttonPressed = document.querySelector('#equals-button');
        buttonPressed.dispatchEvent(clickEvent);
    }
    else if (e.key === 'Clear') {
        buttonPressed = document.querySelector('#clear-button');
        buttonPressed.dispatchEvent(clickEvent);
    }
    else if (e.key === 'Backspace') {
        buttonPressed = document.querySelector('#backspace-button');
        buttonPressed.dispatchEvent(clickEvent);
    }
    else if (e.key === '0') {
        buttonPressed = document.querySelector('#zero-btn');
        buttonPressed.dispatchEvent(clickEvent);
    }
    else if (e.key === '.') {
        buttonPressed = document.querySelector('#decimal-point');
        buttonPressed.dispatchEvent(clickEvent);
    }
}

numericButtons.forEach((button) => {
    button.addEventListener('click', numericButtonClick);
   
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonClick);
    button.addEventListener('click', () => {
        button.style.backgroundColor = "rgb(226, 143, 118)"
    });
    
})

function operatorButtonColorRevert() {
    operatorButtons.forEach((button) => {
        button.style.backgroundColor = "rgb(222, 107, 72)";
    })
}

equalsButton.addEventListener('click', equalsButtonClick);

clearButton.addEventListener('click', initialize);

backspaceButton.addEventListener('click', backspace);

function backspace() {
    let currentDisplay = display.innerHTML
    let newDisplay = currentDisplay.substring(0, (currentDisplay.length -1));
    if (currentDisplay.length === 1) {
        newDisplay = 0;
    } 
    updateDisplay(newDisplay);
}

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
    operatorButtonColorRevert();
}

function operatorButtonClick(e) {
    operatorButtonColorRevert();
    if (secondNum !== null) {
        currentResult = operate(firstNum, secondNum, operator);
        updateDisplay(currentResult);
        secondNum = null;
    }

    operator = e.target.innerHTML;
    firstNum = display.innerHTML;
    hasDecimal = false;
    equalsButtonFlagSet = false;
}

function numericButtonClick(e) {

    operatorButtonColorRevert();
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
    operatorButtonColorRevert();
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
    }

    result = parseFloat(result.toFixed(8));

    if (result > 99999999){
        result = result.toExponential(4);
    } 

    return result;
    
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