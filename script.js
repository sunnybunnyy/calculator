let num1Global;
let num2Global;
let operatorGlobal;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === 'add') {
        add(num1, num2);
    } else if (operator === 'subtract') {
        subtract(num1, num2);
    } else if (operator === 'multiply') {
        multiply(num1, num2);
    } else if (operator === 'divide') {
        divide(num1, num2);
    }
}

function populateDisplay() {
    let displayValue;
    let digits = document.querySelectorAll('.digits');
    digits.forEach((digit) => {
        digit.addEventListener("click", () => {
            let display = document.querySelector('#display');
            display.textContent = digit.textContent;
            displayValue = display.textContent;
        })
    })
}