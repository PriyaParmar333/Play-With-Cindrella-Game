const cindrella = document.querySelector(".cindrella");
const obstacle = document.querySelector(".obstacle");

let isJumping = false;
let gameRunning = false;

let score = 0;
let scoreInterval;
const scoreBox = document.querySelector(".score");


/* ---------------- WELCOME SCREEN ---------------- */
const welcomeScreen = document.createElement("div");
welcomeScreen.style.position = "absolute";
welcomeScreen.style.top = "0";
welcomeScreen.style.left = "0";
welcomeScreen.style.width = "100%";
welcomeScreen.style.height = "100%";
welcomeScreen.style.background = "rgba(0,0,0,0.9)";
welcomeScreen.style.color = "#fff";
welcomeScreen.style.display = "flex";
welcomeScreen.style.flexDirection = "column";
welcomeScreen.style.justifyContent = "center";
welcomeScreen.style.alignItems = "center";
welcomeScreen.style.fontSize = "30px";
welcomeScreen.style.zIndex = "10";

welcomeScreen.classList.add("img-welcome");

welcomeScreen.innerHTML = `
    <img src="GameAssets/welcome-Cindrella.png" class="img-welcome">
    <h1>Welcome to Play With Cindrella</h1>

    <p>Press ENTER to Start</p>
    <p>Press SPACE to Jump</p>
`;

document.body.appendChild(welcomeScreen);

//-------------------------Start Game----------------------------------//

document.addEventListener("keydown", (e) => {
    if(e.code == "Enter" && !gameRunning) {
        start();
    }
    if(e.code == "Space" && !isJumping) {
        Jumping();
    }
})

//role of enter key
function start() {
    gameRunning = true;
    welcomeScreen.style.display = "none";
    obstacle.classList.add("run");

    //reset score
    score = 0;
    scoreBox.innerHTML = "Score : " + score;

     // start counting score
    scoreInterval = setInterval(() => {
        score++;
        scoreBox.innerHTML = "Score : " + score;
    }, 1000); // every second

}
//role of space key
function Jumping() {
    isJumping=true;
    cindrella.classList.add("jump");

    setTimeout(() => {
        cindrella.classList.remove("jump")
        isJumping = false;
    },800);
}


// Collision detection
setInterval(() => {

    if(!gameRunning) return;

    let c = cindrella.getBoundingClientRect();
    let o = obstacle.getBoundingClientRect();

    if (
        c.right > o.left &&
        c.left < o.right &&
        c.bottom > o.top &&
        c.top < o.bottom
    ) {
        endGame();
    }

}, 100);


function endGame() {
    gameRunning = false;
    clearInterval(scoreInterval);
    obstacle.classList.remove("run");//RESETS animation
    cindrella.classList.remove("jump");
    welcomeScreen.style.display = "flex";
    welcomeScreen.innerHTML = `
    <h1>Game Over!!</h1>
    <p>Better Luck Next Time....
    <i class="fa-regular fa-face-laugh-beam"></i></p>
     Your Score:<b>${score}</b>
    <p>Press ENTER to Play Again</p>
    `;
}