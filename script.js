// DADOS DO QUIZ APRIMORADO
const quizData = [
    {
        question: "Qual foi o valor das exportações do agronegócio brasileiro em 2025?",
        options: [
            "US$ 100 bilhões",
            "US$ 169,2 bilhões",
            "US$ 50 bilhões",
            "US$ 200 bilhões"
        ],
        correct: 1
    },
    {
        question: "Desde 1985, a produção de grãos no Brasil cresceu quanto?",
        options: [
            "100%",
            "200%",
            "Mais de 500%",
            "50%"
        ],
        correct: 2
    },
    {
        question: "Qual percentual do território brasileiro permanece preservado?",
        options: [
            "30%",
            "50%",
            "65%",
            "80%"
        ],
        correct: 2
    },
    {
        question: "O que é ILPF?",
        options: [
            "Irrigação Inteligente de Larga Faixa",
            "Integração Lavoura-Pecuária-Floresta",
            "Instituto de Leis Florestais",
            "Inovação em Limpeza Florestal"
        ],
        correct: 1
    },
    {
        question: "Qual é a matriz energética renovável do Brasil?",
        options: [
            "20%",
            "35%",
            "48%",
            "60%"
        ],
        correct: 2
    },
    {
        question: "Quantas toneladas de CO₂ foram evitadas pelos biocombustíveis nos últimos 5 anos?",
        options: [
            "50 milhões",
            "100 milhões",
            "200 milhões",
            "300 milhões"
        ],
        correct: 2
    }
];

// VARIÁVEIS GLOBAIS
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// ELEMENTOS DO DOM
const startBtn = document.getElementById('start-quiz');
const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultText = document.getElementById('result-text');
const progressBar = document.getElementById('progress-bar');

// EVENT LISTENERS
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// FUNÇÕES DO QUIZ
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    startBtn.style.display = 'none';
    quizContent.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    
    questionText.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}: ${question.question}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index, optionDiv);
        optionsContainer.appendChild(optionDiv);
    });
    
    nextBtn.style.display = 'none';
}

function selectOption(index, element) {
    const question = quizData[currentQuestion];
    const allOptions = document.querySelectorAll('.option');
    
    // Desabilitar cliques após seleção
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');
    
    allOptions.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
    
    if (index === question.correct) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
        allOptions[question.correct].classList.add('correct');
    }
    
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage === 100) {
        emoji = '🏆';
        message = `${emoji} CAMPEÃO! Você acertou TODAS as ${quizData.length} questões! Você é um especialista em agronegócio sustentável! Parabéns! 🎉`;
    } else if (percentage >= 80) {
        emoji = '🌟';
        message = `${emoji} EXCELENTE! Você acertou ${score} de ${quizData.length} questões (${percentage}%). Conhecimento impressionante! Muito bem! 🎊`;
    } else if (percentage >= 60) {
        emoji = '👍';
        message = `${emoji} BOM TRABALHO! Você acertou ${score} de ${quizData.length} questões (${percentage}%). Continue aprendendo sobre sustentabilidade! 📚`;
    } else if (percentage >= 40) {
        emoji = '💡';
        message = `${emoji} VOCÊ ACERTOU ${score} de ${quizData.length} questões (${percentage}%). Estude mais sobre o agronegócio sustentável! Você consegue! 💪`;
    } else {
        emoji = '🌱';
        message = `${emoji} VOCÊ ACERTOU ${score} de ${quizData.length} questões (${percentage}%). Visite novamente para aprender mais sobre o agro! 🚜`;
    }
    
    resultText.textContent = message;
}

// FUNÇÃO DE MENSAGEM FINAL
function mostrarMensagem() {
    const mensagemDiv = document.getElementById('mensagem');
    const novaMsg = "🌍 O futuro do campo depende da união entre inovação, sustentabilidade e pessoas. Cada decisão que tomamos hoje molda o amanhã de nossas comunidades rurais. Juntos, podemos construir um agronegócio que alimenta o mundo e preserva a natureza para as gerações futuras! 🌱🚜💚";
    
    if (mensagemDiv.textContent.includes('futuro do campo depende')) {
        mensagemDiv.textContent = "O futuro do campo depende da união entre inovação, sustentabilidade e pessoas. O agro forte é aquele que produz com respeito à natureza, gerando alimento, emprego e esperança para as gerações futuras.";
        mensagemDiv.style.animation = 'none';
    } else {
        mensagemDiv.textContent = novaMsg;
        mensagemDiv.style.animation = 'fadeInElement 0.8s ease-out';
    }
}

// ANIMAÇÃO DE SCROLL (Fade-in ao rolar)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// EFEITO DE PARALLAX NO HERO
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// LOG DE CARREGAMENTO
window.addEventListener('load', () => {
    console.log('🌱 Agrinho 2026 - Versão Visual Premium carregado com sucesso!');
    console.log('🚀 Projeto pronto para impressionar os jurados!');
});
