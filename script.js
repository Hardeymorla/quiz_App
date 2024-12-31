const questions = [
    {
        question: "Which planet is the hottest in the milky way?",
        answers:
        [
            {text: "Mars", correct: false},
            {text: "Pluto", correct: false},
            {text: "Venus", correct: true},
            {text: "Jupitar", correct: false},
        ]
    },
    {
        question: "Where is the strongest human muscle located?",
        answers:
        [
            {text: "Jaw", correct: true},
            {text: "Neck", correct: false},
            {text: "Leg", correct: false},
            {text: "buttock", correct: false},
        ]
    },
    {
        question: "What is the smallest unit of matter",
        answers:
        [
            {text: "Mass", correct: false},
            {text: "Cell", correct: false},
            {text: "Stone", correct: false},
            {text: "Atom", correct: true},
        ]
    },
    {
        question: "What was the name of the first computer virus",
        answers:
        [
            {text: "Trojan", correct: false},
            {text: "Creeper", correct: true},
            {text: "Virus x", correct: false},
            {text: "Corona virus", correct: false},
        ]
    },
    {
        question: "In what decade was the internet created",
        answers:
        [
            {text: "1950s", correct: false},
            {text: "1970s", correct: false},
            {text: "1960s", correct: true},
            {text: "1990s", correct: false},
        ]
    }
]
document.addEventListener("DOMContentLoaded", (e) => { 
    const questionElement = document.getElementById("question-elememt");
    const answerBtns = document.getElementById("answer-button");
    const nextBtn = document.getElementById("next-btn");
    const timerEl = document.getElementById("timer");
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextBtn.innerHTML = "Next";
        showQuestion();
        
    }
    
    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        console.log(currentQuestionIndex);
        console.log(currentQuestion);
        console.log(questions[currentQuestionIndex].answers.correct=true);
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question
    
        currentQuestion.answers.sort(() => Math.random() - 0.5);
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerBtns.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer)
        })
        startTimer();
        timerEl.style.display = "block";
    };
    
    
    function resetState() {
        nextBtn.style.display = "none";
        while (answerBtns.firstChild) {
            answerBtns.removeChild(answerBtns.firstChild);
        }
    };
    
     
    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === "true";
        if (isCorrect) {
            selectedButton.classList.add("correct");
            score++;
        } else {
            selectedButton.classList.add("incorrect");
        }
        Array.from(answerBtns.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }  
            button.disabled = true;
        });
        nextBtn.style.display = "block";
        
        
    }
    
    
    function showScore() {
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
        nextBtn.innerHTML = "Play Again";
        nextBtn.style.display = "block";
        timerEl.style.display = "none";
        
    }
    
    function handleNextQuestion() {
        clearInterval(timer);
        if (currentQuestionIndex < questions.length) {
           
            showQuestion();
        }else {
            showScore(); 
        }
    }
    nextBtn.addEventListener("click", () => {
        
        if (currentQuestionIndex < questions.length) {
            currentQuestionIndex++;
            handleNextQuestion();
        }else {
            startQuiz(); 
        }
        
    });
    
    function startTimer() {
        // clearInterval(timer);
        let timeLeft = 10;
        timerEl.textContent = `Time left ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Time left ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                currentQuestionIndex++;
                handleNextQuestion();
            }
        }, 1000)
    }
    
    startQuiz();
})
