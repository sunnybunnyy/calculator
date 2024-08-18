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

function displayNum(num, decimal) {
    let display = document.querySelector('#display');
    if (num === 'D:' || num === '') {
        display.textContent = num;
    } else {
        display.textContent = roundDecimalPlaces(parseFloat(num)) + (decimal ? '.' : '');
        return roundDecimalPlaces(parseFloat(num)) + (decimal ? '.' : '');
    }
}

function calculate(operator, num1, num2) {
    console.log('= ' + operator + " " + parseFloat(num1) + " " + parseFloat(num2) + " " + operate(operator, parseFloat(num1), parseFloat(num2)));
    let solution = operate(operator, parseFloat(num1), parseFloat(num2));
    return displayNum(solution);
}

function roundDecimalPlaces(num) {
    const decimalPlaces = 8 - indexOfDecimal(num);
    const overflow = getNumDigits(num) - 8;
    console.log("indexOfDecimal: " + indexOfDecimal(num) + "   numDigits: " + getNumDigits(num));
    if (num > 99999999) {
        return Math.trunc(num / 10);
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
                    let decimal = false;
                    if (button.textContent === '.') {
                        decimal = true;
                    }
                    firstNum = displayNum(firstNum, decimal);
                } else {
                    secondNum ??= 0;
                    secondNum += button.textContent;
                    if (button.textContent === '.') {
                        decimal = true;
                    }
                    secondNum = displayNum(secondNum, decimal);
                }
            } else if (button.classList.contains('equals')) {
                console.log('equals   = ' + operator + " " + firstNum + " " + secondNum + " " + solution);
                
                if (secondNum != null) {
                    solution = calculate(operator, firstNum, secondNum);
                    if (solution === 'D:') {
                        firstNum = null;
                    } else {
                        firstNum = solution;
                    }
                    secondNum = null;
                    solution = null;
                    operator = null;
                    console.log()
                }
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
            } else if (button.classList.contains('clear')) {
                firstNum = null;
                secondNum = null;
                operator = null;
                displayNum('', false);
            } else if (button.classList.contains('backspace')) {
                console.log('backspace   = ' + operator + " " + firstNum + " " + secondNum + " " + solution);
                if (secondNum != null) {
                    const secondNumStr = secondNum.toString();
                    const newSecondNumStr = secondNumStr.slice(0, secondNumStr.length - 1)
                    secondNum = displayNum(newSecondNumStr, false);
                    console.log("secondNum is edited");
                } else if (firstNum != null) {
                    const firstNumStr = firstNum.toString()
                    const newFirstNumStr = firstNumStr.slice(0, firstNumStr.length - 1);
                    firstNum = displayNum(newFirstNumStr, false);
                    console.log("firstNum is edited " + newFirstNumStr + "!");
                }  
            }
        })
    })
}

createExpression();