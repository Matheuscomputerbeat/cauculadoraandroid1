document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const history = document.getElementById('history');

    let currentInput = '0';
    let operator = null;
    let firstNumber = null;
    let secondNumber = null;
    let historyEntries = [];

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent;
            if (!isNaN(buttonText) || buttonText === '.') {
                handleNumber(buttonText);
            } else {
                handleOperator(button.getAttribute('data-action'));
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
                if (firstNumber !== null) {
                    const percentValue = parseFloat(currentInput) / 100;
                    currentInput = (parseFloat(firstNumber) - (parseFloat(firstNumber) * percentValue)).toString();
                    updateDisplay(currentInput);
                }
                break;
            case 'equals':
                if (operator && firstNumber !== null && currentInput !== '') {
                    secondNumber = currentInput;
                    const result = calculate(firstNumber, secondNumber, operator).toString();
                    addHistoryEntry(firstNumber, secondNumber, operator, result);
                    currentInput = result;
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
            const result = calculate(firstNumber, secondNumber, operator).toString();
            addHistoryEntry(firstNumber, secondNumber, operator, result);
            operator = op;
            firstNumber = result;
            currentInput = '';
        }
    }

    function clearCalculator() {
        currentInput = '0';
        operator = null;
        firstNumber = null;
        secondNumber = null;
        updateDisplay(currentInput);
        clearHistory();
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

    function addHistoryEntry(num1, num2, operator, result) {
        const operatorSymbol = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/'
        }[operator];

        const historyEntry = `${num1} ${operatorSymbol} ${num2} = ${result}`;
        historyEntries.push(historyEntry);
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        history.innerHTML = historyEntries.join('<br>');
    }

    function clearHistory() {
        historyEntries = [];
        history.innerHTML = '';
    }
});
