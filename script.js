const buttons = document.querySelectorAll('.btn')
const clearBtn = document.querySelector('#clearBtn')
const display = document.querySelector('#displayCont')
const historyResult = document.querySelector('#historyResult')
const operators = /[-+×÷^]/g
let operator;
let content;
let mousedownTime;
let num1;
let num2;
let result;

function history() {
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    div.classList.add('hisResult');
    h1.classList.add('disResult');
    p.classList.add('disOperation');
    h1.textContent = `${result}`;
    p.textContent = `${content}`;
    div.appendChild(p)
    div.appendChild(h1)
    historyResult.appendChild(div)
    const childDiv = document.querySelector('.hisResult')
    if (childDiv != undefined) {
        historyResult.insertBefore(div, div);
        console.log('noo')
    }

    
    console.log(childDiv)
    console.dir(historyResult)
    
}

function inputbutton(e) {
    const mouseupTime = e.timeStamp, timeDifference = mouseupTime - mousedownTime;
    if (display.textContent == `Hello` || display.textContent == `Infinity`) { display.textContent = `` };
    if (e.target.textContent == 'Del/Clear') {
        if (timeDifference < 500) {
            display.textContent = `${display.textContent.slice(0, -1)}`;
        } else {
            num1 = ''
            display.textContent = '';
        }
    } else if (e.target.textContent == '=') {
        
        const operatorIndex = content.search(operators);
        num1 = Number(content.slice(0, operatorIndex));
        num2 = Number(content.slice(operatorIndex + 1, content.length));
        operator = display.textContent.slice(operatorIndex, operatorIndex + 1);
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
        display.textContent = `${result}`;
        history();
    } else {
        if (operators.test(e.target.textContent) && operators.test(content)) {
            display.textContent = display.textContent.replace(operators, e.target.textContent);
        } 
        else { display.textContent += `${this.textContent}` };
    };
    content = display.textContent;
}
buttons.forEach(button => button.addEventListener('click', inputbutton));
clearBtn.addEventListener('mousedown', (e) => mousedownTime = e.timeStamp);