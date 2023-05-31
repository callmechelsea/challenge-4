// buttons
let goBack = document.querySelector("#go-back");
let clearScores = document.querySelector("#clear-score");

// high score list div to store the generated paragraphs
let highScoreList = document.querySelector("#score-list");

renderScores();

function renderScores() {
  highScoreList.innerHTML = "";
  let storedScores = JSON.parse(window.localStorage.getItem("highScores"));
  console.log(storedScores);
  // each high score gets a new paragraph element
  for (let i = 0; i < storedScores.length; i++) {
    let scoreText =
      storedScores[i].savedInitials + " " + storedScores[i].savedScore;
    // create a new paragraph element
    let paragraph = document.createElement("p");
    // add the paragraph text of the initials and score
    paragraph.textContent = scoreText;
    // append the paragraph to the div High Score List
    highScoreList.appendChild(paragraph);
  }
}

function clearScoreList() {
  // clear the high scores in local storage
  window.localStorage.setItem("highScores", "[]");
  // rerender the list of scores to clear the paragraphs displayed
  renderScores();
}

goBack.addEventListener("click", function () {
    // back to index page
  window.location.href = "index.html";
});
clearScores.addEventListener("click", clearScoreList);
