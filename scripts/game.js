const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "This is test question number 1",
        choice1: "Answer 1",
        choice2: "Answer 2",
        choice3: "Answer 3",
        choice4: "Answer 4",
        answer: 1
    },
    {
        question: "This is test question number 2",
        choice1: "Answer 1",
        choice2: "Answer 2",
        choice3: "Answer 3",
        choice4: "Answer 4",
        answer: 2
    },
    {
        question: "This is test question number 3",
        choice1: "Answer 1",
        choice2: "Answer 2",
        choice3: "Answer 3",
        choice4: "Answer 4",
        answer: 3
    },
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questioncounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questioncounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");

    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

          selectedChoice.parentElement.classList.add(classToApply);

          setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
        }, 1000);          

    });
});

startGame();