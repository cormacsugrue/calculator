let firstNum = null;
let secondNum = null;
let operator = null;
const display = document.querySelector('#calculator-display');
const numericButtons = document.querySelectorAll('.numeric-button');

numericButtons.forEach((button) => {
    button.addEventListener('click', numericButtonClick);
})

function numericButtonClick(e) {
    // console.log(e.target.innerText);
    display.innerHTML = e.target.innerHTML;
}


function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case 'add':
            return add(firstNum, secondNum);
            break;
        case 'subtract':
            return subtract(firstNum, secondNum);
            break;
        case 'multiply':
            return multiply(firstNum, secondNum);
            break;
        case 'divide':
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
