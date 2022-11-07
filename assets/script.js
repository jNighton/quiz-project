//call html elements:
var highscoreBtn = document.querySelector("#highscoreBtn");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");

var questionsScreen = document.querySelector("#questions-Screen");
var timeEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var choiceEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");
var index = 0;
var score = 0;

var endScreen = document.querySelector("#end-screen");
var submit = document.querySelector("#submit");
var finalScoreEl = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");

var highscoreScreen = document.querySelector("#highscore-screen");
var highscoreListEl = document.querySelector("#highscoreList");
var highscoreScreenVis = false;

var secondsLeft = 60;


var theQuestions = [
    {
        question: "What element do we use to connect an external JavaScript file to a HTML file? ",
        choices: ["A: <div>", "B: <script>", "C: <style>", "D: <append>"],
        correct: "B: <script>"
    },
    {
        question: "Which is the concatenation operator?",
        choices: ["A: =", "B: -", "C:==", "D: +"],
        correct: "D: +"
    },
    {
        question: "Which variable has values of true or false",
        choices: ["A: String", "B: Boolean", "C: TrueFalse", "D: Number"],
        correct: "B: Boolean"
    },
    {
        question: "Which is the 'not' operator?",
        choices: ["A: !", "B: ~", "C: -", "D: ?"],
        correct: "A: !"
    },
    {
        question: "A variable called within a function is a _____ variable",
        choices: ["A: global", "B: private", "C: internal", "D: local"],
        correct: "D: local"
    }


];

startButton.addEventListener("click", () => {
    startGame();
});


function startGame() {
    clearStartScreen();
    countdown();
    getQuestions();
}

function clearStartScreen() {
    startScreen.setAttribute("class", "hide");
}

// function showStartScreen() {
//     startScreen.classList("remove");
// }


function countdown() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === -1) {
            clearInterval(timerInterval);
            endGame();
        } else if (highscoreScreen == true) {
            clearInterval(timerInterval);
        }

    }, 1000);

}


function getQuestions() {
    
    questionsScreen.classList.remove("hide");

    theQuestions.textContent = "";
    questionsEl.textContent = "";

    var questionsVisable = document.createElement("h1");
    questionsVisable.setAttribute("id", "show");
    questionsEl.appendChild(questionsVisable);
    document.getElementById("show").textContent = theQuestions[index].question;

    for (var i = 0; i < theQuestions[index].choices.length; i++) {
        var choicesVisable = document.createElement("li");
        choicesVisable.setAttribute("id", theQuestions[index].choices[i]);
        choiceEl.appendChild(choicesVisable);
        choicesVisable.append(theQuestions[index].choices[i]);

        choicesVisable.addEventListener("click", function (event) {
            if (event.target.id == theQuestions[index].correct) {
                resultEl.textContent = "correct";
                score += 10;
                console.log("correct");
            }
            else{
                resultEl.textContent = "incorrect";
                secondsLeft -= 10;
                console.log("incorrect");
            }
            nextQuestion();

        })

    }
}

function nextQuestion(){
    index ++;
    resultEl.textContent = "";
    choiceEl.textContent = "";

    if(index < theQuestions.length){
    getQuestions();
    }
    else if(index == theQuestions.length){
    endGame();
    }
}



highscoreBtn.addEventListener("click", () => {
    showHighScores();
    clearStartScreen();
});

// function clearHighScores() {
//     highscoreScreen.setAttribute("class", "hide");
// }

function showHighScores() {
    var storedScore = JSON.parse(localStorage.getItem("score"));

    questionsScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    highscoreScreen.classList.remove("hide");

    highscoreScreen = true;

    for (var i = 0; i < storedScore.length; i++) {

        console.log(storedScore[i]);

        // var scoreListEl = document.createElement("li");
        // scoreListEl.setAttribute("id", "show");
        // scoreListEl.textContent = (storedInitials + ": " + storedScore);

        // highscoreListEl.appendChild(scoreList);
    
    }
}

    function endGame() {
        console.log("game over");
        questionsScreen.setAttribute("class", "hide");
        endScreen.classList.remove("hide"); 
        finalScoreEl.textContent = score;

        submit.addEventListener("click", function() {
            var initials = document.querySelector("#initials").value;
            console.log(initials);

            if (initials === ""){
                displayMessage("initials cannot be blank");
            } else if (initials.length > 3){
                displayMessage("you can only enter 3 initials");
            } else {
                var storedScore = localStorage.getItem("score") || [];
                var highscores = {
                    initials: initials, score: score
                };

                storedScore.push(highscores);
                localStorage.setItem("score", JSON.stringify(storedScore));
            }
        });
    }

    

