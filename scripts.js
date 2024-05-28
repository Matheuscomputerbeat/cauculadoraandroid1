document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = '';
    let firstNumber = '';
    let secondNumber = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            if (!isNaN(action) || action === '.') {
                handleNumber(action);
            } else {
                handleOperator(action);
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
                currentInput = '0';
                operator = '';
                firstNumber = '';
                secondNumber = '';
                updateDisplay(currentInput);
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
                if (operator && firstNumber !== '' && currentInput !== '') {
                    secondNumber = currentInput;
                    currentInput = calculate(firstNumber, secondNumber, operator).toString();
                    operator = '';
                    firstNumber = '';
                    updateDisplay(currentInput);
                }
                break;
            default:
                if (firstNumber === '') {
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
                break;
        }
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
