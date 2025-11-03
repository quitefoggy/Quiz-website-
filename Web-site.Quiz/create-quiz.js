document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("quiz-creator-form");
    const previewArea = document.getElementById("quiz-preview");
    const delButton = document.getElementById("delButton"); 

    let allQuestions = JSON.parse(localStorage.getItem("mySavedQuiz")) || [];

    function updatePreview() {
        previewArea.innerHTML = ""; 
        allQuestions.forEach((questionData, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("preview-question");
            
            let questionHTML = `<h3>${index + 1}. ${questionData.question}</h3><ul>`;
            
            questionData.answers.forEach((answer, i) => {
                if (i == questionData.correctIndex) {
                    questionHTML += `<li class="correct-answer">${answer} (Correct)</li>`;
                } else {
                    questionHTML += `<li>${answer}</li>`;
                }
            });
            
            questionHTML += `</ul>`;
            questionElement.innerHTML = questionHTML;
            previewArea.appendChild(questionElement);
        });
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const questionText = document.getElementById("question-input").value;
        const answerInputs = document.querySelectorAll(".answer-input");
        const correctAnswerInput = document.querySelector('input[name="correct-answer"]:checked');

        if (!questionText || answerInputs[0].value === "" || !correctAnswerInput) {
            alert("Please fill out the question, all answers, and select the correct one.");
            return;
        }

        const answers = [];
        answerInputs.forEach(input => {
            answers.push(input.value);
        });

        const newQuestion = {
            question: questionText,
            answers: answers,
            correctIndex: correctAnswerInput.value
        };

        allQuestions.push(newQuestion);
        localStorage.setItem("mySavedQuiz", JSON.stringify(allQuestions));
        updatePreview();
        form.reset(); 
    });

    delButton.addEventListener('click', function() {
        allQuestions = [];
        localStorage.removeItem("mySavedQuiz");
        updatePreview();
    });

    updatePreview();
});