const buttons = document.querySelectorAll('.btn')
const clearBtn = document.querySelector('#clearBtn')
const display = document.querySelector('#displayCont')
const historyResult = document.querySelector('#historyResult')
const clearHistory = document.querySelector('#clearHistory')
const operators = /[-+×÷^]/
const positiveNegative = /[⁺⁻]/
const numPad = /[0-9]/
let operator;
let content;
let mousedownTime;
let num1;
let num2;
let result;
let numAndOp;

function history() {
    const div = document.createElement('div'),
          h1 = document.createElement('h1'),
          p = document.createElement('p'),
          childDiv = document.querySelector('.historyResultLog'),
          shortResult = `${result}`.slice(0,7);
    div.classList.add('historyResultLog');
    h1.classList.add('displayResult');
    p.classList.add('displayOperation');
    h1.textContent = shortResult;
    p.textContent = `${content}`;
    div.appendChild(p);
    div.appendChild(h1);
    if (childDiv != null) {
        historyResult.insertBefore(div, childDiv);
    }else {historyResult.appendChild(div)}
}
function deleteDisplay(timeDifference) {
    if (timeDifference < 500) {
        const lastChar = display.textContent.charAt(display.textContent.length - 1)
        if (lastChar == ' ') {
            display.textContent = `${display.textContent.slice(0, -3)}`;
        } else {
            display.textContent = `${display.textContent.slice(0, -1)}`;
        }
        
    } else {
        display.textContent = '';
    }
}
function calculator(numberAndOperator) {
    num1 = Number(numberAndOperator[0].replace(/[⁺⁻]/, function (a) { return a === "⁺" ? "+" : "-" }));
    num2 = Number(numberAndOperator[2].replace(/[⁺⁻]/, function (a) { return a === "⁺" ? "+" : "-" }));
    operator = numberAndOperator[1];
    
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num1 / num2;
            break;
        case "^":
            result = num1 ** num2;
            break;
    }
    let shortResult = `${result}`
    if (operators.test(shortResult)) {
        shortResult = shortResult.replace("-", "⁻")
        display.textContent = `${shortResult}`;
    }else{display.textContent = shortResult;}
    
    
    
}
function signPositiveNegative() {
    if (positiveNegative.test(display.textContent) && operators.test(content) || operators.test(content)) {
        const operatorIndex = content.search(operators);
        const firstPart = display.textContent.slice(0, operatorIndex + 2);
        let secondPart = display.textContent.slice(operatorIndex + 2, display.textContent.length);
            if (operators.test(display.textContent) && positiveNegative.test(num2)) {
                secondPart = secondPart.replace(/[⁺⁻]/, function (a) { return a === "⁺" ? "⁻" : "⁺" });
                display.textContent = firstPart + secondPart;
            } else {
                secondPart = "⁺" + secondPart;
                display.textContent = firstPart + secondPart;
            }
    } else {
            if (positiveNegative.test(display.textContent) && positiveNegative.test(num1)) {
                display.textContent = display.textContent.replace(/[⁺⁻]/, function(a) { return a === "⁺" ? "⁻" : "⁺" })
            } else {display.textContent = "⁺".concat(display.textContent);}
    }
}
function operatorDisplay(e) {
        if (operators.test(` ${e.textContent} `) && operators.test(content)) {
            display.textContent = display.textContent.replace(operators, e.textContent);
        }else{display.textContent = display.textContent += ` ${e.textContent} `;}
}
function pointDisplay(e, point) {
    if (/\./.test(display.textContent) && operators.test(content)) {
            if (point >= 2) {
                if ((e.textContent == '.')) { return }
                else { display.textContent += `${e.textContent}` }
            }
            else { display.textContent += `${e.textContent}` };
        }
    else if (/\./.test(content) && /\./.test(e.textContent)) { return } 
    else { display.textContent += `${e.textContent}`}
}
function inputbutton(e) {
    if (display.textContent == `Hello` || display.textContent == `Infinity` || display.textContent == `NaN` || display.textContent == `undefined` || display.textContent == `infinit`) { display.textContent = `` };
    const mouseupTime = e.timeStamp,
          timeDifference = mouseupTime - mousedownTime,
          point = display.textContent.split('.').length - 1;

    switch (this.textContent) {
        case "Del/Clear":
            deleteDisplay(timeDifference);
            break;
        case '=':
            calculator(numAndOp);
            history();
            break;
        case '±':
            signPositiveNegative()
            break;
        case ".":
            pointDisplay(this, point)
            break;
    }

    if (numPad.test(this.textContent)) { display.textContent += `${this.textContent}`; }
    else if (operators.test(this.textContent)) { operatorDisplay(this) };
    
    numAndOp = display.textContent.split(' ');
    num1 = numAndOp[0]
    num2 = numAndOp[2]
    
    content = display.textContent;
}

buttons.forEach(button => button.addEventListener('click', inputbutton));
clearBtn.addEventListener('mousedown', (e) => mousedownTime = e.timeStamp);

function deleteHistory() {
    const historyLogs = document.querySelectorAll('.historyResultLog')
    historyLogs.forEach((b) => historyResult.removeChild(b))
    
}

clearHistory.addEventListener('click', deleteHistory);
