const keyboard = document.getElementById('keyboard');
const clearBtn = document.getElementById('viewer-clear')
let viewer_num = document.getElementById('viewer-num');
let resultNum = 0;
let oldNum = null;
let newNum = null;
let currentOperation = null;
let decimalAdded = false;

keyboard.addEventListener('click', (event) => {
    let target = event.target;

    if (target.dataset.num) {
        let num = target.dataset.num;

        if (viewer_num.innerText === '0' || currentOperation === '=') {
            viewer_num.innerText = num;
        } else {
            viewer_num.innerText += num;
        }
    } else if (target.dataset.ops) {
        let operator = target.dataset.ops;

        if (operator === '.') {
            if (!decimalAdded) {
                viewer_num.innerText += '.';
                decimalAdded = true;
            }
            return;
        }

        if (oldNum === null) {
            oldNum = parseFloat(viewer_num.innerText);
            currentOperation = operator;
            viewer_num.innerText = '0';
            decimalAdded = false;
            return;
        }

        if (newNum === null) {
            newNum = parseFloat(viewer_num.innerText);
            switch (currentOperation) {
                case '+':
                    resultNum = oldNum + newNum;
                    break;
                case '-':
                    resultNum = oldNum - newNum;
                    break;
                case '*':
                    resultNum = oldNum * newNum;
                    break;
                case '/':
                    resultNum = oldNum / newNum;
                    break;
                default:
                    break;
            }

            oldNum = resultNum;
            currentOperation = operator;
            viewer_num.innerText = '0';
            newNum = null;
            decimalAdded = false;
            if (operator === '=') {
                viewer_num.innerText = resultNum;
                oldNum = null;
                resultNum = 0;
                currentOperation = null;
            }
        }
    }
});


clearBtn.addEventListener('click', (event) => {
    viewer_num.innerText = '0';
    oldNum = null;
    newNum = null;
    resultNum = 0;
    currentOperation = null;
    decimalAdded = false;
    return;
});
