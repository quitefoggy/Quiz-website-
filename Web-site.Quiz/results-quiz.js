`use strict`

const resultsArea = document.getElementById("results-area");  
const change_quiz = document.getElementById("change-quiz");
const play_again  = document.getElementById("play-again");
const home_button = document.getElementById("go-home");

const score = JSON.parse(localStorage.getItem("quizScore"));

if (score != null) { 
    resultsArea.textContent = `Your score for quiz named ${score.quiz_name}: ${score.res_score} out of ${score.amount_of_que} correct!`;
}    
else {
    console.log(score);
    resultsArea.textContent = "Could not find your results ):";
}

change_quiz.addEventListener("click", function(){
    window.location.href = "play_select.html";
});
play_again.addEventListener("click", function(){
    window.location.href = "play.html";
});
home_button.addEventListener("click", function(){
    window.location.href = "index.html";
});

//localStorage.removeItem("quizScore");
