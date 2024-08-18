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
    display.textContent = roundDecimalPlaces(num);
}

function calculate(operator, num1, num2) {
    console.log('= ' + operator + " " + parseFloat(num1) + " " + parseFloat(num2) + " " + operate(operator, parseFloat(num1), parseFloat(num2)));
    let solution = operate(operator, parseFloat(num1), parseFloat(num2));
    displayNum(solution);
    return solution;
}

function roundDecimalPlaces(num) {
    const decimalPlaces = getDecimalPlaces(num);
    if (decimalPlaces < 0 || getNumDigits(num) > 8) {
        return "Too big!";
    }
    return Math.round(num * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
}

function getDecimalPlaces(num) {
    return 8 - num.toString().indexOf('.');
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
                }
            } else if (button.classList.contains('operator')) {
                    if (secondNum != null) {
                        firstNum = calculate(operator, firstNum, secondNum);
                        secondNum = null;
                    }
                    operator = button.textContent;
            }

            else if (button.classList.contains('equals')) {
                if (secondNum != null) {
                    solution = calculate(operator, firstNum, secondNum);
                    firstNum = solution;
                    secondNum = null;
                    operator = null;
                }
            }
        })
    })
}

createExpression();