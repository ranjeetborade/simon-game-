
let level = 0;
let Started = false;

let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

// Start the game
document.addEventListener("keydown", function () {
    if (!Started) {
        console.log("Game Started!");
        Started = true;
        levelup();
    }
});

// Flash a button
function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

// Increase level and generate a random color
function levelup() {
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    btnFlash(randBtn);
}

// Handle player button clicks
function btnPress() {
    if (!Started) return;

    let btn = this;

    btnFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Check the player's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {

        console.log("Correct!");

        // Check if the full sequence is completed
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 800);
        }

    } else {

        h2.innerHTML =
            `Game Over! Your Score was ${level - 1}<br>Press any key to restart.`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Add click events to all buttons
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game
function reset() {
    Started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
