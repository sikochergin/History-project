document.addEventListener('DOMContentLoaded', () => {
    const questionsURL = "/static/tests_jsons/dates_test.json";
    const totalTimeInMinutes = 20;
    const totalQuestions = 20;

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = [];

    let countdown;

    document.getElementById('start-button').addEventListener('click', startTest);

    function startTest() {
        document.getElementById('description-container').style.display = 'none';
        document.getElementById('question-container').style.display = 'flex';
        let timeLeft = totalTimeInMinutes * 60;

        countdown = setInterval(() => {
            displayTimeLeft(--timeLeft);
            if (timeLeft <= 0) {
                endTest();
                clearInterval(countdown);
            }
        }, 1000);

        fetch(questionsURL)
            .then(response => response.json())
            .then(data => {
                displayCurrentQuestion(data.questions);
            })
            .catch(error => {
                console.error('Error loading questions:', error);
            });
    }

    function displayTimeLeft(timeSeconds) {
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = timeSeconds % 60;
        document.getElementById('timer-container').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function displayCurrentQuestion(questions) {
        if (currentQuestionIndex >= totalQuestions || questions.length === 0) {
            endTest();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';

        const questionElement = document.createElement('div');
        questionElement.classList.add('text');
        questionElement.textContent = currentQuestion.question;
        questionContainer.appendChild(questionElement);

        const answerElements = document.createElement('div');
        answerElements.classList.add('answer-options');

        for (let i = 0; i < currentQuestion.answers.length; i++) {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer-option');
            answerElement.textContent = currentQuestion.answers[i];
            answerElement.addEventListener('click', () => handleAnswerClick(currentQuestion, i));
            answerElements.appendChild(answerElement);
        }

        questionContainer.appendChild(answerElements);
    }

    function handleAnswerClick(question, selectedIndex) {
        if (selectedIndex !== question.correctAnswer) {
            incorrectAnswers.push({
                question: question.question,
                correctAnswer: question.answers[question.correctAnswer]
            });
        } else {
            correctAnswers++;
        }

        currentQuestionIndex++;
        fetch(questionsURL)
            .then(response => response.json())
            .then(data => {
                displayCurrentQuestion(data.questions);
            })
            .catch(error => {
                console.error('Error loading questions:', error);
            });
    }

    function endTest() {
        clearInterval(countdown);
        document.getElementById('question-container').style.display = 'none';
        showFinalResults();
    }

    function showFinalResults() {
        const main = document.getElementById('main');
        main.style.height = 'auto';
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = '';

        const resultSummary = document.createElement('div');
        resultSummary.classList.add('results');
        resultSummary.textContent = `Ваш результат: ${correctAnswers} / ${totalQuestions}`;
        resultsContainer.appendChild(resultSummary);

        if (incorrectAnswers.length > 0) {
            const incorrectAnswersElement = document.createElement('div');
            incorrectAnswersElement.classList.add('incorrect-answers');

            const incorrectTitle = document.createElement('h3');
            incorrectTitle.textContent = 'Вопросы с неправильными ответами:';
            incorrectAnswersElement.appendChild(incorrectTitle);

            incorrectAnswers.forEach(item => {
                const questionElement = document.createElement('div');

                const questionText = document.createElement('p');
                questionText.textContent = `Вопрос: ${item.question}`;
                questionElement.appendChild(questionText);

                const correctAnswerText = document.createElement('p');
                correctAnswerText.textContent = `Правильный ответ: ${item.correctAnswer}`;
                questionElement.appendChild(correctAnswerText);

                incorrectAnswersElement.appendChild(questionElement);
            });

            resultsContainer.appendChild(incorrectAnswersElement);
        }
    }
});