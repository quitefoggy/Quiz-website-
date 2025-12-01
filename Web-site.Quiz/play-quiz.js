`use strict`

const gameArea = document.getElementById("quiz-game-area");
const submitButton = document.getElementById("submit-quiz-btn");
const resultsArea = document.getElementById("quiz-results");

const Quizzes = JSON.parse(localStorage.getItem("mySavedQuiz"));
const selected_quiz_name = sessionStorage.getItem("myTempQuiz");

let savedQuizString = "";

Quizzes.forEach((quiz,index)=>{
    if (quiz.quiz_name == selected_quiz_name){
        savedQuizString = quiz
    }
})

if (!savedQuizString) {
    gameArea.innerHTML = "<p>No quiz has been created yet. Go to the 'Create' page.</p>";
    submitButton.style.display = "none";
}

const questions = savedQuizString.question_list;

questions.forEach((questionData, q_index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("play-question-block");
    
    questionElement.innerHTML = `<h3>${q_index + 1}. ${questionData.question}</h3>`;

    const answersList = document.createElement("ul");
    
    questionData.answers.forEach((answer, a_index) => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            <input type="radio" name="question${q_index}" value="${a_index}" id="q${q_index}_a${a_index}">
            <label for="q${q_index}_a${a_index}">${answer}</label>
        `;
        answersList.appendChild(li);
    });

    questionElement.appendChild(answersList);
    gameArea.appendChild(questionElement);
});

submitButton.addEventListener("click", function() {
    let score = 0;
    
    questions.forEach((questionData, q_index) => {
        
        const selectedRadio = document.querySelector(`input[name="question${q_index}"]:checked`);
        
        if (selectedRadio) {
            if (selectedRadio.value == questionData.correctIndex) {
                score++;
            }
        }
    });

    resultsArea.textContent = `Your score: ${score} out of ${questions.length} Correct!`;
    submitButton.style.display = "You lost unlucky ):";
    let temp_store = {quiz_name:selected_quiz_name, res_score:score, amount_of_que:questions.length};

    localStorage.setItem("quizScore", JSON.stringify(temp_store));
    window.location.href = "results.html";
});
