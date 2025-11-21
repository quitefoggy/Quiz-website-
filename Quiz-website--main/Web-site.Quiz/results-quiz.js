document.addEventListener("DOMContentLoaded", function() {
    const resultsArea = document.getElementById("results-area");  
    
    const score = localStorage.getItem("Quizscore");
    const total = localStorage.getItem("Quiztotal");
    if (score !== null && total !== null) { 
        resultsArea.textContent = `Your score: ${score} out of ${total} correct!`;
    }    
    else {
        
        resultsArea.Display.textContent = "Could not find your results ):";
    }
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizTotal");

});