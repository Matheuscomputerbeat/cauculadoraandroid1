document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let operator = null;
    let firstNumber = null;
    let secondNumber = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent;
            if (!isNaN(buttonText) || buttonText === '.') {
                handleNumber(buttonText);
            } else {
                handleOperator(buttonText);
            }
        });
    });

    function handleNumber(number) {
        if (currentInput.includes('.') && number === '.') return;
        currentInput = currentInput === '0' ? number : currentInput + number;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        switch (op) {
            case 'clear':
                clearCalculator();
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1) || '0';
                updateDisplay(currentInput);
                break;
            case 'percent':
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
                break;
            case 'equals':
                if (operator && firstNumber !== null && currentInput !== '') {
                    secondNumber = currentInput;
                    currentInput = calculate(firstNumber, secondNumber, operator).toString();
                    operator = null;
                    firstNumber = null;
                    updateDisplay(currentInput);
                }
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleDefaultOperator(op);
                break;
            default:
                // Lidar com outros botões (se necessário)
                break;
        }
    }

    function handleDefaultOperator(op) {
        if (firstNumber === null) {
            firstNumber = currentInput;
            operator = op;
            currentInput = '';
        } else if (operator) {
            secondNumber = currentInput;
            currentInput = calculate(firstNumber, secondNumber, operator).toString();
            operator = op;
            firstNumber = currentInput;
            currentInput = '';
        }
    }

    function clearCalculator() {
        currentInput = '0';
        operator = null;
        firstNumber = null;
        secondNumber = null;
        updateDisplay(currentInput);
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                return num1 / num2;
            default:
                return num2;
        }
    }
});
