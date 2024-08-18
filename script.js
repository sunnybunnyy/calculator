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
    console.log("operate was called");
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
        return divide(num1, num2);
    }
}

function displayNum(num) {
    let display = document.querySelector('#display');
    display.textContent = num;
}

function calculate(operator, num1, num2) {
    console.log('= ' + operator + " " + parseFloat(num1) + " " + parseFloat(num2) + " " + operate(operator, parseFloat(num1), parseFloat(num2)));
    let solution = operate(operator, parseFloat(num1), parseFloat(num2));
    displayNum(roundDecimalPlaces(solution));
    return solution;
}

function roundDecimalPlaces(num) {
    return Math.round(num * (10 ** 14)) / (10 ** 14);
}

function createExpression() {
    let firstNum;
    let secondNum;
    let operator;
    let solution;
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains('digit')) {
                if (!operator) {
                    firstNum ??= 0;
                    firstNum += button.textContent;
                    displayNum(roundDecimalPlaces(parseFloat(firstNum)));
                } else {
                    secondNum ??= 0;
                    secondNum += button.textContent;
                    displayNum(roundDecimalPlaces(parseFloat(secondNum)));
                }
            } else if (button.classList.contains('operator')) {
                    if (secondNum != null) {
                        firstNum = calculate(operator, firstNum, secondNum);
                        secondNum = null;
                    }
                    operator = button.textContent;
            } // split into nested if statement

            else if (button.classList.contains('equals')) {
                if (secondNum != null) {
                    solution = calculate(operator, firstNum, secondNum);
                    firstNum = null;
                    secondNum = null;
                    operator = null;
                }
            }
        })
    })
}

createExpression();