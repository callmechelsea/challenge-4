// event listener buttons
let startButton = document.querySelector("#start-button");
let buttonOne = document.querySelector("#btn1");
let buttonTwo = document.querySelector("#btn2");
let buttonThree = document.querySelector("#btn3");
let buttonFour = document.querySelector("#btn4");
let saveScore = document.querySelector("#save-score");

// divs that have their display property updated
let preQuizDiv = document.querySelector("#pre-quiz");
let quizDiv = document.querySelector("#quiz-questions");
let endScreenDiv = document.querySelector("#quiz-end-screen");
let checkAnswerDiv = document.querySelector("#check-answer");

// dynamically updated text
let questionText = document.querySelector("#question-text");
let checkAnsText = document.querySelector("#answer-text");

// time left on quiz
let timeLeft = document.querySelector("#time-left");

// end of game score
let userScore = document.querySelector("#user-score");

// Question arrays. Each question must have four possible answers. The correct answer starts at an index of 1 to verify if the correct answer was clicked
let arrayOfQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    arr: ["1. alerts", "2. strings", "3. booleans", "4. numbers"],
    rightAns: 1,
  },
  {
    question: "The condition in an if / else statment is enclosed within ___.",
    arr: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    rightAns: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store ___.",
    arr: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    rightAns: 4,
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to letiables",
    arr: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    rightAns: 3,
  },
  {
    question:
      "A tool used during development and debugging for printing content to the debugger is:",
    arr: ["1. JavaScript", "2. console log", "3. for loops", "4. terminal"],
    rightAns: 2,
  },
];

// timer start value
let timer = 75;

// quiz counter to iterate through array
let quizCount = 0;

// score to store at the end of the game
let score = 0;

//Start Timer, function is called when the game starts
function startTimer() {
  quizFormat();
  quizNextQuestion();
  interval = setInterval(function () {
    timer--;
    timeLeft.textContent = timer;
    if (timer === 0) {
      clearInterval(interval);
      //If timer runs out end the quiz
      endQuiz();
    }
  }, 1000);
}

//Update the DOM to hide the initial page, and display the quiz questions and buttons
function quizFormat() {
  //update the display of the quiz
  preQuizDiv.setAttribute("style", "display:none;");
  quizDiv.setAttribute("style", "display:block;");
}

//confirm if button clicked was the correct answer or not
function correctAnswer(e) {
  let element = e.target;
  console.log(element);
  if (element.matches("button") === true) {
    //grab the data index of the user answer
    let questionAnswered = element.getAttribute("data-index");
    //compare the user answer to the array of questions object answer, using the previous quiz count to compare to the previous question
    if (questionAnswered != arrayOfQuestions[quizCount - 1].rightAns) {
      timer -= 10;
      //display incorrect message
      checkAnsText.textContent = "Incorrect!";
    } else {
      //display correct message
      checkAnsText.textContent = "Correct!";
    }
    checkAnswerDiv.setAttribute("style", "display:block");
    setTimeout(function () {
      checkAnswerDiv.setAttribute("style", "display:none");
    }, 500);
    quizNextQuestion();
  }
}

//cycles through questions to display
function quizNextQuestion() {
  console.log("quizNextQuiestion called?");
  if (quizCount == arrayOfQuestions.length) {
    // end the quiz since the end of the array was reached
    endQuiz();
  } else {
    questionText.textContent = arrayOfQuestions[quizCount].question;
    buttonOne.textContent = arrayOfQuestions[quizCount].arr[0];
    buttonTwo.textContent = arrayOfQuestions[quizCount].arr[1];
    buttonThree.textContent = arrayOfQuestions[quizCount].arr[2];
    buttonFour.textContent = arrayOfQuestions[quizCount].arr[3];
    quizCount++;
  }
}

function endQuiz() {
  //stop the timer
  clearInterval(interval);
  //Called when the timer is 0 or when the last question is answered
  timeLeft.textContent = timer;
  //set score equal to the timer at the end of the game
  score = timer;
  // hide the quiz div, and display the end screen div
  quizDiv.setAttribute("style", "display:none;");
  endScreenDiv.setAttribute("style", "display:block;");

  userScore.textContent = score;
}

function saveHighScore() {
  //get initials from the input box
  let userInitials = document.querySelector("#initials").value.trim();
  if (userInitials !== "") {
    //array
    let storedData =
      JSON.parse(window.localStorage.getItem("highScores")) || [];
    console.log(storedData);
    //store updated data to the local storage//
    let newData = {
      savedInitials: userInitials,
      savedScore: score,
    };
    //add data to the array
    storedData.push(newData);
    //story the array in local storage
    window.localStorage.setItem("highScores", JSON.stringify(storedData));
    //redirect to the high score page
    window.location.href = "highscore.html";
  }
}

startButton.addEventListener("click", startTimer);
buttonOne.addEventListener("click", correctAnswer);
buttonTwo.addEventListener("click", correctAnswer);
buttonThree.addEventListener("click", correctAnswer);
buttonFour.addEventListener("click", correctAnswer);
saveScore.addEventListener("click", function (event) {
  event.preventDefault();
  saveHighScore();
});
