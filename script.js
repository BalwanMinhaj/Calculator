const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let expression = '';
let result = '';

function updateDisplay(exp, res) {
    expressionDiv.textContent = exp;
    resultDiv.textContent = res;
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function evaluateExpression() {
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult) ? ' ' : evalResult < 1 ? parseFloat(evalResult.toFixed(10)) : parseFloat(evalResult.toFixed(2));
}

function buttonClick(evt) {
    const target = evt.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    switch (action) {
        case 'number':
            expression += value;
            break;
        case 'clear':
            expression = '';
            result = '';
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression === '' && result !== '') {
                expression += result + value;
            } else if(expression !== '' && !isLastCharOperator()) {
                expression += value;
            }
            break;
        case 'equal':
            result = evaluateExpression();
            expression = '';
            break;
        case 'negate':
            if(expression === '' & result !== '') {
                result = -result;
            } else if(!expression.startsWith('-') && expression !== '') {
                expression = '-' + expression;
            } else if(expression.startsWith('-')) {
                expression = expression.slice(1)
            }
            break;
        case 'mod':
            if(expression !== '') {
                result = evaluateExpression();
                expression = '';

                if(!isNaN(result) && isFinite(result)) {
                    result /= 100;
                } else {
                    result = '';
                }
            } else if(result !== '') {
                result = parseFloat(result) / 100;
            }
            break;
    }

    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);