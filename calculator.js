const frame = document.querySelector("#frame");
const screen = document.querySelector('#screen');

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
            button.style.backgroundColor = '#850a0a';
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



