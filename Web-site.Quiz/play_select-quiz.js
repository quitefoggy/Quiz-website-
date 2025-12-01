`use strict`

const gameArea = document.getElementById("quiz-game-area");
const savedQuizString = localStorage.getItem("mySavedQuiz");

if (!savedQuizString) {
    gameArea.innerHTML = "<p>No quiz has been created yet. Go to the 'Create' page.</p>";
}

const quizzes = JSON.parse(savedQuizString);

quizzes.forEach((quizData, q_index) => {
    const quizElement = document.createElement("button");
    quizElement.classList = "hero__btn";
    quizElement.classList.add("play-question-block");
    quizElement.textContent = quizData.quiz_name;

    quizElement.addEventListener("click",function(){
        sessionStorage.setItem("myTempQuiz",quizData.quiz_name);
        window.location.href="play.html";
    });

    gameArea.appendChild(quizElement);
});

//window.location.href = "results.html";

