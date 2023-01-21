const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const form = document.getElementById("game-over-form");
const gameOverModal = document.getElementById("game-over-modal");

let jumpCount = 0;
let correctAnswers = 0;
let questionIndex = 0;
const questions = [    { question: "What is the capital of France?", answer: "Paris" },    { question: "What is the highest mountain in the world?", answer: "Everest" },    { question: "What is the largest ocean in the world?", answer: "Atlantic" }];

// Function to jump
function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        jumpCount++;
        // check if player has jumped 3 times
        if (jumpCount === 3 && questionIndex < questions.length) {
            displayQuestion();
        }
        setTimeout(function () {
            dino.classList.remove("jump")
        }, 300);
    }
}

// Function to display question
function displayQuestion() {
    let data = {
        question1: '',
        question2: '',
        question3: ''
    };
    for (let i = questionIndex; i < questions.length; i++) {
        const question = questions[i];
        const answer = prompt(question.question);
        if (answer === question.answer) {
            correctAnswers++;
            data['question' + (i + 1)] = answer;
        } else {
            alert("Wrong answer. Game over.");
            gameOver();
            break;
        }
    }
    if (correctAnswers === questions.length) {
        alert("You have answered all questions correctly. Game over.");
        gameOver();
    }
    questionIndex = questions.length;
}

document.addEventListener("keydown", function (e) {
    jump();
});




// Function to show game over modal
function gameOver() {
    alert("Game Over!");
    const name = prompt("Please enter your name:");
    const email = prompt("Please enter your email:");
    // validate inputs
    if (name && email) {
        sendDataToServer(name, email, data);
    } else {
        alert("Please enter a valid name and email.");
        gameOver();
    }
}

document.addEventListener("keydown", function (e) {
    jump();
});

// Function to send data to server
function sendDataToServer(name, email, data) {
    fetch("http://localhost:3000/submit", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            question1: data.question1,
            question2: data.question2,
            question3: data.question3
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
