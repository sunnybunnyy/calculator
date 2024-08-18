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
    console.log("num1: " + num1 + "   num2: " + num2);
    if (num2 === 0) {
        return "D:";
    }
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
    if (num === 'D:') {
        display.textContent = num;
    } else {
        display.textContent = roundDecimalPlaces(num);
    }
}

function calculate(operator, num1, num2) {
    console.log('= ' + operator + " " + parseFloat(num1) + " " + parseFloat(num2) + " " + operate(operator, parseFloat(num1), parseFloat(num2)));
    let solution = operate(operator, parseFloat(num1), parseFloat(num2));
    displayNum(solution);
    return solution;
}

function roundDecimalPlaces(num) {
    const decimalPlaces = 8 - indexOfDecimal(num);
    console.log("decimalPlaces: " + decimalPlaces + "   numDigits: " + getNumDigits(num));
    if (indexOfDecimal(num) > 8 && getNumDigits(num) > 8) {
        return "Too big!";
    }
    return Math.round(num * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
}

function indexOfDecimal(num) {
    return num.toString().indexOf('.');
}

function getNumDigits(num) {
    return num.toString().length;
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
                    displayNum(parseFloat(firstNum));
                } else {
                    secondNum ??= 0;
                    secondNum += button.textContent;
                    displayNum(parseFloat(secondNum));
                } // doesn't work when operator is firset input
            } else if (button.classList.contains('operator')) {
                    if (secondNum != null) {
                        firstNum = calculate(operator, firstNum, secondNum);
                        if (firstNum === 'D:') {
                            firstNum = null;
                            solution = null;
                        }
                        secondNum = null;
                    }
                    if (firstNum != null) {
                        operator = button.textContent;
                    }
            } else if (button.classList.contains('equals')) {
                if (secondNum != null) {
                    solution = calculate(operator, firstNum, secondNum);
                    if (solution === 'D:') {
                        firstNum = null;
                    } else {
                        firstNum = solution;
                    }
                    secondNum = null;
                    operator = null;
                }
            } else if (button.classList.contains('clear')) {
                firstNum = null;
                secondNum = null;
                operator = null;
                displayNum('');
            }
        })
    })
}

createExpression();