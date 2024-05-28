const frame = document.querySelector("#frame");
const screen = document.querySelector('#screen');
const numbers = ['1','2','3','4','5','6','7','8','9','0', '.'];
const keys = ['/', '+', '=', '*', '%', '-'];

function addButtons() {
    const id = {
        0: "AC", 1: "+/-", 2: "%", 3: "/",
        4: '7', 5: '8', 6: '9', 7: '*', 8: '4',
        9: '5', 10: '6', 11: '-', 12: '1',
        13: '2', 14: '3', 15: '+', 16: '0', 17: '.', 18: '='
    }
    const green_buttons = ["+/-", "%", "/", "*", "-", "+", "="];

    for (let i = 0; i < 19; i++) {
        const button = document.createElement('button');
        button.setAttribute('class', 'btn');
        button.textContent = id[i];

        if (id[i] == '0') {
            button.style.flexGrow = "1";
            button.classList.add('num');
        }
        if (id[i] == "AC") {
            button.classList.add('AC');
        }
        else if (green_buttons.includes(id[i])) {
            button.classList.add('green_btn');
        }
        else {
            button.classList.add('num');
        }

        frame.appendChild(button);
    }
}
addButtons();

function inputNumbers(e) {
    let input = undefined;
    if (e.type == "click") {
        input = e.target.textContent;
    }
    else if (numbers.includes(e.key)) {
        input = e.key;
    }
    if (input == undefined) return;    
    if (clearDisplay || screen.textContent == '0') {
        if (equalsPressed == true) {
            inputOne = undefined;
            storedNumber = undefined;
        }
        if (input == '.') {
            screen.textContent = '0.';
            decimalPresent = true;
        }
        else {
            screen.textContent = input;
        }
        clearDisplay = false;
    }
    else if (screen.textContent.length < 15) {
        if (!decimalPresent || input != ".") {
            screen.textContent += input;
        }
        if (input == ".") {
            decimalPresent = true;
        }
    }
}



function isPressed(e) {
    if (e.target.classList.item(1) == 'AC') {
        greenBtns.forEach(function (greenBtn) {
            greenBtn.style.backgroundColor = "#3c6400";
        });
        nums.forEach(function (num) {
            num.style.opacity = 1;
        });
        redBtn.style.backgroundColor = '#da1313';
    }
    if (e.target.classList.item(1) == 'green_btn') {
        redBtn.style.backgroundColor = "#850a0a";
        greenBtns.forEach(function (greenBtn) {
            greenBtn.style.backgroundColor = "#3c6400";
        });
        e.target.style.backgroundColor = "#78c701";
        
    }
    else {
        redBtn.style.backgroundColor = "#850a0a";
        nums.forEach(function (num) {
            num.style.opacity = 1;
        });
        e.target.style.opacity = "80%";
    }
}

function operatorFunction(e) {
    inputOne = screen.textContent;
    equalsPressed = false;

    if (e.target.textContent == '+/-') {
        if (screen.textContent[0] == '-') {
            screen.textContent = screen.textContent.substring(1);
        }
        else if (screen.textContent.length < 15) {
            screen.textContent = "-" + screen.textContent;
        }
    }
    else if (e.target.textContent == "%") {
        if (storedNumber != undefined) {
            screen.textContent = screen.textContent*0.01*storedNumber;
        }
    }
    else {
        if (storedNumber == undefined) {
            storedNumber = inputOne;
            inputOne = undefined; 
            clearDisplay = true;
            currentOperation = e.target.textContent;
            if (e.target.textContent == '=') {
                storedNumber = undefined;
                equalsPressed = true;
                currentOperation = undefined;
            }
        }
        else {
            storedNumber = operator(currentOperation, +storedNumber, +inputOne);
            screen.textContent = (storedNumber + "").substring(0,15);
            inputOne = undefined;
            clearDisplay = true;
            if (e.target.textContent == '=') {
                equalsPressed = true;
                currentOperation = undefined;
                storedNumber = undefined;
            }
            else {
                currentOperation = e.target.textContent;
            }
 
        }

        //Colour the buttons
    }   
}

function operator(sign, a, b) {
    switch (sign) {
        case '+':
            return a + b;
        case "-":
            return a - b;
        case '*':
            return a * b;
        case "/":
            if (a == 0) {
                return 10000000;
            }
            return a / b;
    }
}

function clear(e) {
    screen.textContent = '0';
    clearDisplay = true;
    inputOne = undefined;
    storedNumber = undefined;
    currentOperation = undefined;
    equalsPressed = false;

} 


//Handles the input of numbers and decimals
const nums = document.querySelectorAll(".num");
let decimalPresent = false;

window.addEventListener('keydown', inputNumbers);
nums.forEach(function (num) {
    num.addEventListener('click', isPressed);
    num.addEventListener('click', inputNumbers);
    
});


//Handles the input of operators
//For handling display clears and keeping track of operations
let clearDisplay = true;
let inputOne = undefined;
let storedNumber = undefined;
let currentOperation = undefined;
let equalsPressed = false;
const greenBtns = document.querySelectorAll(".green_btn");
greenBtns.forEach(function (greenBtn) {
    greenBtn.addEventListener('click', operatorFunction);
    greenBtn.addEventListener('click', isPressed);
});

//Handling AC
const redBtn = document.querySelector(".AC");
redBtn.addEventListener('click', clear);
redBtn.addEventListener('click', isPressed);


