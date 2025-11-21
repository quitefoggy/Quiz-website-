`use strict`

const quiz_creator = document.getElementById("quiz-creator-form");
const quiz_destructor = document.getElementById("quiz-delete");
const quiz_question_destructor = document.getElementById("quiz-delete-question");
const previewArea = document.getElementById("quiz-preview");

let allQuizzes = JSON.parse(localStorage.getItem("mySavedQuiz")) || [];

function update_lS(mySavedQuiz){
    mySavedQuiz.forEach((quizData)=>{
        if (quizData != null){
            quizData.question_list.forEach((questionData)=>{
                if (questionData == null){
                    quizData.question_list.splice(quizData.question_list.indexOf(questionData),1);
                }
            });
        } else {
            mySavedQuiz.splice(mySavedQuiz.indexOf(quizData),1);
        }
    });
    try{
        localStorage.setItem("mySavedQuiz",JSON.stringify(mySavedQuiz));
    }catch (err) {
        console.log(mySavedQuiz);
        localStorage.setItem("mySavedQuiz","");
    }
}

//[{"quiz_name":"huh","question_list":[{"question":"qqj","answers":["qdcibqcq","qceuobcq","meow","b00b69","","",""],"correctIndex":"3"},{"question":"qqj2","answers":["q;iebcqq","oqiubc","oiqenfo","meeo2","","",""],"correctIndex":"3"}]}]

function updatePreview() {
    update_lS(allQuizzes);
    previewArea.innerHTML = ""; 
    allQuizzes.forEach((quizData, index) => {
        let quizElement = document.createElement("div");
        quizElement.classList.add("preview-question");
        quizElement.innerHTML = `<h2>${quizData.quiz_name}</h2>`
        
        quizData.question_list.forEach((questionData, index) => {
            let questionElement = document.createElement("div");
            questionElement.className = "preview-question";
            
            let questionName = document.createElement("h3");
            questionName.innerText = `${index + 1}. ${questionData.question}`;

            let answer_ul = document.createElement("ul");
            questionData.answers.forEach((answer, i) => {
                if (i == questionData.correctIndex) {
                    let answer_ul_li = document.createElement("li");
                    answer_ul_li.className = "correct-answer";
                    answer_ul_li.innerText = `${answer} (Correct)`;
                    answer_ul.appendChild(answer_ul_li);
                } else {
                    
                    let answer_ul_li = document.createElement("li");
                    answer_ul_li.innerText = `${answer}`;
                    answer_ul.appendChild(answer_ul_li);
                }
            });

            questionElement.appendChild(questionName);
            questionElement.appendChild(answer_ul);
            //previewArea.appendChild(questionElement);
        quizElement.appendChild(questionElement);
        previewArea.appendChild(quizElement);
    })});
}

quiz_creator.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const quiz_name = document.getElementById("quiz-name").value;
    const questionText = document.getElementById("question-input").value;
    const answerInputs = document.querySelectorAll(".answer-input");
    const correctAnswerInput = document.querySelector('input[name="correct-answer"]:checked');
    
    let certainQuestions = [];

    if (Object.keys(allQuizzes).length != 0){
        allQuizzes.forEach((quizData,index)=>{
            if (quizData.quiz_name == quiz_name){
                certainQuestions = quizData.question_list;
            }
        });
    }

    if (!quiz_name || !questionText || answerInputs[0].value === "" || !correctAnswerInput) {
        alert("Please fill out the quiz name, question, all answers, and select the correct one.");
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

    certainQuestions.push(newQuestion);
    const certainQuiz = {
        quiz_name:quiz_name,
        question_list: certainQuestions,
    };
    if (Object.keys(allQuizzes).length === 0){
        allQuizzes.push(certainQuiz);
    } else {
        allQuizzes.forEach((quizData,index)=>{
            if (quiz_name == quizData.quiz_name){
                console.log("we found the quiz");
                //let quizJSONData = JSON.parse(allQuizzes.quizData);
                quizData.question_list = certainQuestions;
            } else if (Object.keys(allQuizzes).length == index) {
                console.log("we made a new quiz");
                allQuizzes.push(certainQuiz);
            }
        });
    };
    localStorage.setItem("mySavedQuiz", JSON.stringify(allQuizzes));
    updatePreview();
    //quiz_creator.reset(); 
});

quiz_question_destructor.addEventListener("submit", function(event){
    event.preventDefault();

    const delete_quiz_name = document.getElementById("qdq_quiz_name").value;
    const delete_quiz_question_name = document.getElementById("qdq_question_name").value;

    if (Object.keys(allQuizzes).length != 0){
        //console.log("localStorage exists");
        allQuizzes.forEach((quizData)=>{
            if (quizData.quiz_name == delete_quiz_name){
                quizData.question_list.forEach((question)=>{
                    if (question.question == delete_quiz_question_name){
                        console.log(`${question.question} == ${delete_quiz_question_name}`);
                        console.log(`index = ${quizData.question_list.indexOf(question)}`)
                        quizData.question_list.splice(quizData.question_list.indexOf(question),1);
                    }
                });
            }
        });
    };
    updatePreview();
});
quiz_destructor.addEventListener("submit",function(event){
    event.preventDefault();

    const delete_quiz_name = document.getElementById("qd_name").value;
    if (Object.keys(allQuizzes).length != 0){
        allQuizzes.forEach((quizData) => {
            if (quizData.quiz_name == delete_quiz_name){
                allQuizzes.splice(allQuizzes.indexOf(quizData),1);
            }
        });
    }
    updatePreview();
});

updatePreview();