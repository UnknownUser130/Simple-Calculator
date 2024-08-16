document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '0';
            }else if (value === 'D') { // Handle Delete button
                if (currentInput) {
                    currentInput = currentInput.slice(0, -1);
                    display.textContent = operator ? `${previousInput} ${operator} ${currentInput}` : currentInput || '0';
                }
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                    display.textContent = `${previousInput} ${operator}`
                }
            } else {
                if(value === '.' && currentInput.includes('.')){
                    return;
                }
                currentInput += value;
                display.textContent = operator ? `${previousInput} ${operator} ${currentInput}` : currentInput;
            }
        });
    });

    function calculate(a, operator, b) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return ((num1 / num2).toFixed(14)).toString();
            default:
                return '';
        }
    }
});