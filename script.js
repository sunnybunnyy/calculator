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
    /*let digits = document.querySelectorAll('.digits');
    digits.forEach((digit) => {
        digit.addEventListener("click", () => {*/
            let display = document.querySelector('#display');
            display.textContent = num;
            /*let displayValue = display.textContent;
            return displayValue;
        })
    })*/
}

/*function displaySolution(num) {
    let display = document.querySelector('#display');
    display.textContent = 
}*/

function calculate() {
    let firstNum = 0;
    let secondNum = 0;
    let operator;
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains('digit')) {
                if (!operator) {
                    firstNum += button.textContent;
                    displayNum(parseInt(firstNum));
                } else {
                    secondNum += button.textContent;
                    displayNum(parseInt(secondNum));
                }
            } else if (button.classList.contains('operator')
                        && typeof firstNum !== undefined) {
                    operator = button.textContent;
                    displayNum();
            }

            if (button.classList.contains('equals')) {
                console.log('= ' + operator + " " + parseInt(firstNum) + " " + parseInt(secondNum) + " " + operate(operator, parseInt(firstNum), parseInt(secondNum)));
                displayNum(operate(operator, parseInt(firstNum), parseInt(secondNum)));
                firstNum = 0;
                secondNum = 0;
                operator = null;
            }
        })
    })
}

calculate();