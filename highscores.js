// creates variables fot the users highscore, to clear the scores, and the back button
var highScores = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var backBtn = document.querySelector("#backBtn");

// creates a listener for the clear button to clear highscores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// stres the users initials and high scores locally
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScores.appendChild(createLi);

    }
}
// creates a listener for the back button to return back to the index file.
backBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});