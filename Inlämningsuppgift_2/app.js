let calcDisplay = document.querySelector('.calc-display');
let histDisplay = document.querySelector('.history-display');

let btnNr = document.querySelectorAll('.number');
let btnOp = document.querySelectorAll('.operation');
let btn0 = document.querySelector('.btn-0');
let btnClear = document.querySelector('.clear');
let btnEqual = document.querySelector('.equal');

let opBtn = '';
let opName = '';
let result = null;

btnNr.forEach(number => {
    number.addEventListener('click', (e) => {

        calcDisplay.innerText += e.target.innerText;

    })
});

btnOp.forEach(operation => {
    operation.addEventListener('click', (e) => {

        if (!op(calcDisplay.innerText)) {
            opName = e.target.innerText;
            calcDisplay.innerText += opName;
        }
    })
});

btnEqual.addEventListener('click', (e) => {
    if (!calcDisplay.innerText) return;

    result = displayCalc(calcDisplay.innerText);
    calcDisplay.innerText = calcDisplay.innerText + ' = ' + result;

    let ul = document.querySelector('.result-list');
    let listResult = document.createElement('li');
    let rmBtn = document.createElement('button');
    let line = document.createElement('hr')

    listResult.textContent = calcDisplay.textContent;
    rmBtn.textContent = 'Clear';
    rmBtn.className = 'historybutton';
    line.className = 'line';

    ul.append(listResult);
    listResult.append(rmBtn);
    listResult.append(line);

    rmBtn.addEventListener('click', event => {
        listResult.remove();
        rmBtn.remove();
    });
    calcDisplay.textContent = '';
})

btnClear.addEventListener('click', (e) => {
    calcDisplay.innerText = '';
    displayNum1 = '';
    displayNum2 = '';
    result = '';

})

function op(displayContent) {

    let lastchar = displayContent.slice(-1);
    if (lastchar === '*' || lastchar === '+' || lastchar === '-') {
        if (lastchar === '*' && displayContent.innerText == '') {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function displayCalc(displayContent) {
    result = eval(displayContent);
    return result;
}