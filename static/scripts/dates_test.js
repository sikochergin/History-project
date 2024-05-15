// Загрузка вопросов и ответов из JSON-файла
let countOfQuestions = 1; // сколько вопросов отображается
fetch("/static/tests_jsons/dates_test.json")
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
        let helpUsedIndArr = [];
        let QuestionNow = 0;

        // Обработка количества вопросов
        document.getElementById("question-count-slider").max = questions.length;
        document.getElementById("question-container").style.display = "none";
        const questionCountSlider = document.getElementById('question-count-slider');
        const questionCountDisplay = document.getElementById('question-count-display');
        const startButton = document.getElementById('start-button');

        questionCountSlider.addEventListener('input', () => {
            const count = questionCountSlider.value;
            questionCountDisplay.textContent = count;
            countOfQuestions = parseInt(count);
            helpUsedIndArr = [];
        });

        startButton.addEventListener('click', () => {
            document.getElementById('question-selection-container').style.display = 'none';
            document.getElementById('question-container').style.display = "flex";
            displayCurrentQuestion();
        });
        // Пройти заново
        const restartButton = document.getElementById('restart-button');

        restartButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            correctAnswers = 0;
            helpUsedIndArr = [];
            QuestionNow = 0;
            document.getElementById('results-container').style.display = 'none';
            document.getElementById('question-selection-container').style.display = 'block';
            document.getElementById('question-container').style.display = 'none';
        });


        // Функция для отображения текущего вопроса
        function displayCurrentQuestion() {
            let helpUnusedIndArr = [];
            for (let i = 0; i < questions.length; i++) {
                if (helpUsedIndArr.includes(i, 0) === false) {
                    helpUnusedIndArr.push(i);
                }
            }

            let rnd = Math.floor(Math.random() * helpUnusedIndArr.length);
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
            progress.style.width = (100 / countOfQuestions * currentQuestionIndex) + '%';
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
                answerElement.addEventListener('click', () => handleAnswerClick(i, answerElement));
                answerElements.appendChild(answerElement);
            }

            questionContainer.appendChild(answerElements);
        }

        // Функция для обработки клика на ответ
        function handleAnswerClick(selectedIndex, selectedElement) {
            const currentQuestion = questions[QuestionNow];
            const answerElements = document.querySelectorAll('.answer-option');
            const correctElement = answerElements[currentQuestion.correctAnswer];

            if (selectedIndex === currentQuestion.correctAnswer) {
                selectedElement.style.backgroundColor = '#558934';
                correctAnswers++;
                // Подождем немного, чтобы пользователь видел результат
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < countOfQuestions) {
                        displayCurrentQuestion();
                    } else {
                        showFinalResults();
                    }
                }, 1000);
            } else {
                selectedElement.style.backgroundColor = '#D73121';
                correctElement.style.backgroundColor = '#558934';
                showNextButton();
            }

        }
        // Кнопка далее
        function showNextButton() {
            const questionContainer = document.getElementById('question-container');
            const nextButton = document.createElement('button');
            nextButton.id = 'next-button';
            nextButton.textContent = 'Продолжить';
            nextButton.classList.add("nextButton");
            nextButton.addEventListener('click', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < countOfQuestions) {
                    displayCurrentQuestion();
                } else {
                    showFinalResults();
                }
            });
            questionContainer.appendChild(nextButton);
        }

        // отображения финальных результатов
        function showFinalResults() {
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';

            const resultsElement = document.createElement('div');
            resultsElement.classList.add('results');
            resultsElement.textContent = `Ваш результат: ${correctAnswers} / ${countOfQuestions}`;
            questionContainer.appendChild(resultsElement);

            restartButton.addEventListener('click', () => {
                currentQuestionIndex = 0;
                correctAnswers = 0;
                helpUsedIndArr = [];
                QuestionNow = 0;
                document.getElementById('results-container').style.display = 'none';
                document.getElementById('question-selection-container').style.display = 'block';
                document.getElementById('question-container').style.display = 'none';
            });

            document.getElementById('question-selection-container').style.display = 'none';
            document.getElementById('results-container').style.display = 'block';
        }


        // Отображение первого вопроса
        displayCurrentQuestion();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
    });