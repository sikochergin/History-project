// Загрузка вопросов и ответов из JSON-файла
console.log("hes");
fetch("/static/tests_jsons/dates_test.json")
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let correctAnswers = 0;

        // Функция для отображения текущего вопроса
        function displayCurrentQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';

            // Создание элементов для отображения вопроса и ответов
            const questionElement = document.createElement('div');
            questionElement.classList.add("text");
            questionElement.textContent = currentQuestion.question;
            questionContainer.appendChild(questionElement);

            const answerElements = document.createElement('div');
            answerElements.classList.add('answer-options');

            // Отображение вариантов ответов в два столбика
            for (let i = 0; i < currentQuestion.answers.length; i++) {
                const answerElement = document.createElement('div');
                answerElement.classList.add('answer-option');
                answerElement.textContent = currentQuestion.answers[i];
                answerElement.addEventListener('click', () => handleAnswerClick(i));
                answerElements.appendChild(answerElement);
            }

            questionContainer.appendChild(answerElements);
        }

        // Функция для обработки клика на ответ
        function handleAnswerClick(selectedIndex) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedIndex === currentQuestion.correctAnswer) {
                correctAnswers++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                showFinalResults();
            }
        }

        // Функция для отображения результатов теста
        function showFinalResults() {
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';

            const resultsElement = document.createElement('div');
            resultsElement.classList.add('results');
            resultsElement.textContent = `Правильных ответов ${correctAnswers} из ${questions.length}`;
            questionContainer.appendChild(resultsElement);
        }

        // Отображение первого вопроса
        displayCurrentQuestion();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
    });
