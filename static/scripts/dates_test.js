// Загрузка вопросов и ответов из JSON-файла
const coutOfQuestions = 10; // сколько вопросов отображается
fetch("/static/tests_jsons/dates_test.json")
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
        let helpUsedIndArr = [];
        let QuestionNow = 0;


        // Функция для отображения текущего вопроса
        function displayCurrentQuestion() {
            let helpUnusedIndArr = [];
            for (let i = 0; i < questions.length; i++) {
                if (helpUsedIndArr.includes(i, 0) === false) {
                    helpUnusedIndArr.push(i);
                }
            }

            let rnd = Math.floor(Math.random() * helpUnusedIndArr.length);
            console.log(helpUnusedIndArr);
            helpUsedIndArr.push(helpUnusedIndArr[rnd]);
            QuestionNow = helpUnusedIndArr[rnd];

            const currentQuestion = questions[QuestionNow];
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';

            // Контейнер с номером вопроса и полосой прогресса
            const numberQuestionContainer = document.createElement('div');
            numberQuestionContainer.classList.add('numberQuestionContainer');
            // Номер вопроса
            const qnumber = document.createElement('div');
            qnumber.textContent = currentQuestionIndex + 1;
            qnumber.classList.add('qnumber');
            numberQuestionContainer.appendChild(qnumber);

            // Полоса прогресса
            const progressBar = document.createElement('div');
            progressBar.classList.add('progressBarOuter')
            const progress = document.createElement('div');
            progress.classList.add('progressBarInner');
            progress.style.width = (100 / coutOfQuestions * currentQuestionIndex) + '%';
            progressBar.appendChild(progress);

            numberQuestionContainer.appendChild(progressBar);

            questionContainer.appendChild(numberQuestionContainer);


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
            const currentQuestion = questions[QuestionNow];
            if (selectedIndex === currentQuestion.correctAnswer) {
                correctAnswers++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < coutOfQuestions) {
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
            resultsElement.textContent = `Ваш результат: ${correctAnswers} / ${coutOfQuestions}`;
            questionContainer.appendChild(resultsElement);
        }

        // Отображение первого вопроса
        displayCurrentQuestion();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
    });



/*// Загрузка вопросов и ответов из JSON-файла
const coutOfQuestions = 15;
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

            // Контейнер с номером вопроса и полосой прогресса
            const numberQuestionContainer = document.createElement('div');
            numberQuestionContainer.classList.add('numberQuestionContainer');
            // Номер вопроса
            const qnumber = document.createElement('div');
            qnumber.textContent = currentQuestionIndex + 1;
            qnumber.classList.add('qnumber');
            numberQuestionContainer.appendChild(qnumber);

            // Полоса прогресса
            const progressBar = document.createElement('div');
            progressBar.classList.add('progressBarOuter')
            const progress = document.createElement('div');
            progress.classList.add('progressBarInner');
            progress.style.width = (100 / coutOfQuestions * currentQuestionIndex) + '%';
            progressBar.appendChild(progress);

            numberQuestionContainer.appendChild(progressBar);

            questionContainer.appendChild(numberQuestionContainer);


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
            resultsElement.textContent = `Ваш результат: ${correctAnswers} / ${questions.length}`;
            questionContainer.appendChild(resultsElement);
        }

        // Отображение первого вопроса
        displayCurrentQuestion();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
    });
*/