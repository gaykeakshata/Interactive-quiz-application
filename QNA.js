const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
    ]
  },
  {
    question: "Which of the following is NOT a valid JavaScript data type?",
    answers: [
      { text: "Undefined", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Symbol", correct: false },
    ]
  },
  {
    question: "Which method is used to convert JSON text into a JavaScript object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.toObject()", correct: false },
    ]
  },
  {
    question: "What is the output of 'typeof NaN' in JavaScript?",
    answers: [
      { text: "'number'", correct: true },
      { text: "'NaN'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'object'", correct: false },
    ]
  },
  {
    question: "Which of the following is used to prevent default event behavior in JavaScript?",
    answers: [
      { text: "stopEvent()", correct: false },
      { text: "event.preventDefault()", correct: true },
      { text: "cancelEvent()", correct: false },
      { text: "event.stop()", correct: false },
    ]
  },
  {
    question: "Which of the following is correct about closures in JavaScript?",
    answers: [
      { text: "Closures allow a function to access variables from another function.", correct: false },
      { text: "Closures allow inner functions to access outer function variables even after the outer function has returned.", correct: true },
      { text: "Closures are global variables in JavaScript.", correct: false },
      { text: "Closures are used only in arrow functions.", correct: false },
    ]
  },
  {
    question: "In Python, what will be the output of: print(0.1 + 0.2 == 0.3)?",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
      { text: "0.3", correct: false },
      { text: "Error", correct: false },
    ]
  },
  {
    question: "Which keyword is used to define a function in Python?",
    answers: [
      { text: "function", correct: false },
      { text: "def", correct: true },
      { text: "define", correct: false },
      { text: "fun", correct: false },
    ]
  },
  {
    question: "Which data structure uses LIFO (Last In First Out)?",
    answers: [
      { text: "Queue", correct: false },
      { text: "Linked List", correct: false },
      { text: "Stack", correct: true },
      { text: "Array", correct: false },
    ]
  },
  {
    question: "Which SQL command is used to remove a table completely?",
    answers: [
      { text: "DELETE", correct: false },
      { text: "DROP", correct: true },
      { text: "REMOVE", correct: false },
      { text: "TRUNCATE", correct: false },
    ]
  },
  {
    question: "In C, what is the output of: printf(\"%d\", sizeof('A'));",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "4", correct: true },
      { text: "8", correct: false },
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Colorful Style Sheet", correct: false },
    ]
  },
  {
    question: "Which tag is used to define a JavaScript in HTML?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizBox = document.getElementById('quiz-box');
const scoreBox = document.getElementById('score-box');
const scoreDisplay = document.getElementById('score');
const lastScoreDisplay = document.getElementById('last-score');
const timerDisplay = document.getElementById('time');

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  scoreBox.classList.add('hide');
  quizBox.classList.remove('hide');
  nextButton.innerText = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timerDisplay.innerText = 30;
  timeLeft = 30;
  nextButton.style.display = 'none';
  answerButtons.innerHTML = '';
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showCorrectAnswer();
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) score++;

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    } else {
      button.classList.add('wrong');
    }
  });

  nextButton.style.display = 'inline-block';
}

function showCorrectAnswer() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    } else {
      button.classList.add('wrong');
    }
  });
  nextButton.style.display = 'inline-block';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizBox.classList.add('hide');
  scoreBox.classList.remove('hide');
  scoreDisplay.innerText = `${score} / ${shuffledQuestions.length}`;
  localStorage.setItem('lastQuizScore', score);
  lastScoreDisplay.innerText = localStorage.getItem('lastQuizScore');
}

window.onload = () => {
  const last = localStorage.getItem('lastQuizScore') || 0;
  lastScoreDisplay.innerText = last;
  startQuiz();
};