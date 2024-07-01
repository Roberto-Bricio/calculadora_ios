document.addEventListener("DOMContentLoaded", function() {
    let display = document.getElementById('display');
    let buttons = Array.from(document.getElementsByClassName('button'));
    let operator = null;
    let currentValue = null;
    let newValue = false;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            let btnValue = e.target.innerText;

            if (!isNaN(btnValue) || btnValue === '.') {
                handleNumber(btnValue);
            } else {
                handleOperator(btnValue);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        let key = e.key;
        if (!isNaN(key) || key === '.') {
            handleNumber(key);
        } else {
            switch (key) {
                case 'c':
                case 'C':
                    handleOperator('C');
                    break;
                case '/':
                    handleOperator('÷');
                    break;
                case '*':
                    handleOperator('×');
                    break;
                case '-':
                    handleOperator('−');
                    break;
                case '+':
                    handleOperator('+');
                    break;
                case '=':
                case 'Enter':
                    handleOperator('=');
                    break;
                case '%':
                    handleOperator('%');
                    break;
                case 'Backspace':
                    handleBackspace();
                    break;
                case 'Escape':
                    handleOperator('C');
                    break;
            }
        }
    });

    function handleNumber(num) {
        if (newValue) {
            display.innerText = num;
            newValue = false;
        } else {
            if (display.innerText === '0') {
                display.innerText = num;
            } else {
                display.innerText += num;
            }
        }
    }

    function handleOperator(op) {
        switch (op) {
            case 'C':
                display.innerText = '0';
                operator = null;
                currentValue = null;
                break;
            case '±':
                display.innerText = (parseFloat(display.innerText) * -1).toString();
                break;
            case '%':
                display.innerText = (parseFloat(display.innerText) / 100).toString();
                break;
            case '÷':
            case '×':
            case '−':
            case '+':
                operator = op;
                currentValue = parseFloat(display.innerText);
                newValue = true;
                break;
            case '=':
                if (operator && currentValue !== null) {
                    let result = calculate(currentValue, parseFloat(display.innerText), operator);
                    display.innerText = result.toString();
                    operator = null;
                    currentValue = null;
                }
                break;
        }
    }

    function calculate(a, b, op) {
        switch (op) {
            case '÷':
                return a / b;
            case '×':
                return a * b;
            case '−':
                return a - b;
            case '+':
                return a + b;
        }
    }

    function handleBackspace() {
        if (display.innerText.length > 1) {
            display.innerText = display.innerText.slice(0, -1);
        } else {
            display.innerText = '0';
        }
    }
});
