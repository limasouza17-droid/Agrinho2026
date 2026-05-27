document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o botão "Mostrar Mensagem"
    window.mostrarMensagem = function() {
        const mensagemElement = document.getElementById('mensagem');
        mensagemElement.textContent = 'Juntos, podemos construir um futuro mais verde e próspero para todos!';
    };

    // Lógica do Quiz
    const quizContainer = document.getElementById('quiz-container');
    const startQuizButton = document.getElementById('start-quiz');

    const questions = [
        {
            question: "Qual tecnologia ajuda a otimizar o uso de fertilizantes e defensivos agrícolas?",
            options: [
                "Máquinas agrícolas inteligentes",
                "Agricultura de precisão",
                "Bioinsumos",
                "Irrigação por inundação"
            ],
            answer: "Agricultura de precisão"
        },
        {
            question: "O que significa ILPF no contexto do agronegócio sustentável?",
            options: [
                "Integração Lavoura-Pecuária-Fruticultura",
                "Inovação, Logística e Produtividade Familiar",
                "Integração Lavoura-Pecuária-Floresta",
                "Indústria de Laticínios e Produtos Frescos"
            ],
            answer: "Integração Lavoura-Pecuária-Floresta"
        },
        {
            question: "Qual é um dos principais benefícios dos bioinsumos?",
            options: [
                "Aumento do uso de produtos químicos",
                "Controle de pragas e doenças de forma natural",
                "Diminuição da produtividade",
                "Aumento do desmatamento"
            ],
            answer: "Controle de pragas e doenças de forma natural"
        },
        {
            question: "Qual é um dos desafios para a adoção de tecnologia na agricultura brasileira?",
            options: [
                "Excesso de mão de obra especializada",
                "Falta de incentivos governamentais",
                "Baixo custo de investimento inicial",
                "Resistência dos produtores à inovação"
            ],
            answer: "Resistência dos produtores à inovação"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="question">${q.question}</div>
                <div class="options">
                    ${q.options.map((option, index) => `
                        <label>
                            <input type="radio" name="question${currentQuestionIndex}" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
                <button id="submit-answer" class="botao">Responder</button>
            `;
            document.getElementById('submit-answer').addEventListener('click', checkAnswer);
        } else {
            showResults();
        }
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert('Por favor, selecione uma opção!');
        }
    }

    function showResults() {
        quizContainer.innerHTML = `
            <div id="quiz-results">
                Você acertou ${score} de ${questions.length} perguntas!
            </div>
            <button id="restart-quiz" class="botao">Refazer Quiz</button>
        `;
        document.getElementById('restart-quiz').addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        });
    }

    startQuizButton.addEventListener('click', loadQuestion);
});
