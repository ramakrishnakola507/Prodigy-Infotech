let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let gameContainer = document.getElementById("game-container");
let modeSelection = document.getElementById("mode-selection");
let friendModeBtn = document.getElementById("friend-mode");
let aiModeBtn = document.getElementById("ai-mode");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;
let aiMode = false;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
    xTurn = true; // Reset turn to X at the start of a new game
};

const winFunction = (letter) => {
    disableButtons();
    msgRef.innerHTML = `&#x1F389; <br> '${letter}' Wins`;
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
            }
        }
    }
};

const aiMove = () => {
    let availableSpaces = [];
    btnRef.forEach((element, index) => {
        if (element.innerText === "") availableSpaces.push(index);
    });

    let randomMove = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    btnRef[randomMove].innerText = "O";
    btnRef[randomMove].disabled = true;
    count += 1;
    winChecker();
    if (count === 9 && !popupRef.classList.contains("hide")) drawFunction();
    xTurn = true; // After AI move, it's X's turn again
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText === "" && !element.disabled) {
            if (xTurn) {
                element.innerText = "X";
                xTurn = false;
            } else {
                element.innerText = "O";
                xTurn = true;
            }
            element.disabled = true;
            count += 1;
            winChecker();

            if (aiMode && !xTurn && count < 9) {
                setTimeout(aiMove, 500); // AI takes turn after a brief pause
            }
        }
    });
});

friendModeBtn.addEventListener("click", () => {
    aiMode = false;
    enableButtons();
    modeSelection.classList.add("hide");
    gameContainer.classList.remove("hide");
    restartBtn.classList.remove("hide");
});

aiModeBtn.addEventListener("click", () => {
    aiMode = true;
    enableButtons();
    modeSelection.classList.add("hide");
    gameContainer.classList.remove("hide");
    restartBtn.classList.remove("hide");
});

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    modeSelection.classList.remove("hide");
    gameContainer.classList.add("hide");
    restartBtn.classList.add("hide");
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
