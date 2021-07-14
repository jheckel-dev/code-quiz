// creating a variable to store the array of questions
var questions = [
    {
        title: "Of the following what is not a commonly used data type?:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        title: "What must an if / else statement be enclosed within?",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Parentheses"
    },
    {
        title: "Which of the following can be stored in a JavaScript array?",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "What must string values be enclosed with when being assigned to a variable?",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
        answer: "Quotes"
    },
    {
        title: "What is one of the most useful tools to a developer when debugging?",
        choices: ["Javascript", "Terminal / Bash", "For Loops", "Console Log"],
        answer: "Console Log"
    },

];
// creating variables to hold the users score and the questions to be answered
var score = 0;
var questionIndex = 0;
var time = document.querySelector("#time");
var timer = document.querySelector("#startBtn");
var quizQue = document.querySelector("#quizQue");
var quiz = document.querySelector("#quiz");

// 10 seconds for each question
var secondsLeft = 50;
// holds the numeric interval for the time
var holdInterval = 0;
// the penalty for wrong answers
var penalty = 10;
// creates un ordered list element
var ulCreate = document.createElement("ul");

// listens for a button click to begin the above timer function, starts at interval zero and triggers a time is up notice when reaches zero again.
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                done();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// clears the page and shows the question, and the answer choices, loops questions in a sequential order
function render(questionIndex) {
    quizQue.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        quizQue.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQue.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compares the users choice to the answer to the question in the array
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // activly compares the users choice to the correct answer in the array for the given question.
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer; 
        } else {
            // deducts the penalty of 10 seconds form the time the user has remaining on incorrect answers.
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // adds one to the question index advancing to the next question
    questionIndex++;

    if (questionIndex >= questions.length) {
        // If the the questions left in the index are less than or equal to the number of questions answered, renders a score card
        done();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    quizQue.appendChild(createDiv);

}
// appends page with a final score for the user
function done() {
    quizQue.innerHTML = "";
    time.innerHTML = "";

    // creates a heading notifying that the use has completed the quiz
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You finished!"

    quizQue.appendChild(createH1);

    // creates a paragraph to appended with the users final score, and time remaining
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizQue.appendChild(createP);

    // displays the score by converting time remaining to the users score.
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizQue.appendChild(createP2);
    }

    // creates a label informing the user to enter their initials to record their score 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizQue.appendChild(createLabel);

    // creates an input allowing the user to enter initials when the quiz is completed
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizQue.appendChild(createInput);

    // creates a submit button to store users score and initials
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizQue.appendChild(createSubmit);

    // stores users score and initials locally
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.replace("highScores.html");
        }
    });

}