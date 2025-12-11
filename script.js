// Слайдер
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;
let autoSlideInterval;
const autoSlideCheckbox = document.getElementById('autoSlideCheckbox');

// Функция для обновления слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

// Функция для показа предыдущего слайда
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

// Автопрокрутка
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showNextSlide();
    }, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Обработчики событий для кнопок
prevButton.addEventListener('click', () => {
    showPreviousSlide();
    if (autoSlideCheckbox.checked) {
        stopAutoSlide();
        startAutoSlide();
    }
});

nextButton.addEventListener('click', () => {
    showNextSlide();
    if (autoSlideCheckbox.checked) {
        stopAutoSlide();
        startAutoSlide();
    }
});

// Обработчик для чекбокса автопрокрутки
autoSlideCheckbox.addEventListener('change', function() {
    if (this.checked) {
        startAutoSlide();
    } else {
        stopAutoSlide();
    }
});

// Инициализация слайдера
updateSlider();
if (autoSlideCheckbox.checked) {
    startAutoSlide();
}

// Полноэкранный просмотр изображений
function openFullscreenImage(element) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    fullscreenImage.src = element.src;
    fullscreenContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeFullscreenImage() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Кнопка "Наверх"
const scrollToTopButton = document.getElementById('scrollToTopButton');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

scrollToTopButton.addEventListener('click', function() {
    scrollToTop();
});

function scrollToTop() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - (currentScroll / 10));
    }
}

// Тест
const quizData = [
    {
        question: "Какой гормон регулирует уровень сахара в крови?",
        answers: ["Инсулин", "Адреналин", "Серотонин", "Мелатонин"],
        correct: 0
    },
    {
        question: "Какой тип диабета наиболее распространен?",
        answers: ["Диабет 1 типа", "Диабет 2 типа", "Гестационный диабет", "MODY-диабет"],
        correct: 1
    },
    {
        question: "Какие симптомы характерны для диабета?",
        answers: ["Учащенное мочеиспускание", "Повышенная жажда", "Утомляемость", "Все вышеперечисленное"],
        correct: 3
    },
    {
        question: "Какой уровень глюкозы натощак считается нормой?",
        answers: ["Менее 3.9 ммоль/л", "3.9-5.5 ммоль/л", "5.6-6.9 ммоль/л", "Более 7.0 ммоль/л"],
        correct: 1
    },
    {
        question: "Что такое гипогликемия?",
        answers: ["Высокий уровень сахара", "Низкий уровень сахара", "Нормальный уровень сахара", "Отсутствие инсулина"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButtonElement = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    
    answersElement.innerHTML = '';
    currentQuizData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-btn';
        button.style.margin = '5px';
        button.style.width = '100%';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });
    
    nextButtonElement.style.display = 'none';
    resultElement.style.display = 'none';
}

function selectAnswer(answerIndex) {
    const correct = quizData[currentQuestion].correct;
    
    if (answerIndex === correct) {
        score++;
    }
    
    const buttons = answersElement.querySelectorAll('button');
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correct) {
            button.style.backgroundColor = '#78e08f';
        } else if (index === answerIndex && index !== correct) {
            button.style.backgroundColor = '#e74c3c';
        }
    });
    
    nextButtonElement.style.display = 'inline-block';
}

function showResult() {
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';
    nextButtonElement.style.display = 'none';
    
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <h3>Ваш результат: ${score} из ${quizData.length}</h3>
        <p>${score === quizData.length ? 'Отлично! Вы отлично разбираетесь в теме диабета!' : 
           score >= quizData.length/2 ? 'Хорошо! Но есть что подучить.' : 
           'Вам стоит больше узнать о диабете. Это важная тема!'}</p>
        <button onclick="resetQuiz()" class="quiz-btn">Пройти тест заново</button>
    `;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    questionElement.style.display = 'block';
    answersElement.style.display = 'flex';
    nextButtonElement.style.display = 'none';
    loadQuestion();
}

nextButtonElement.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Игра
const foodItems = document.querySelectorAll('.food');
const dropZones = document.querySelectorAll('.drop-zone');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');
const resetGameButton = document.getElementById('reset-game');

let correctCount = 0;
let wrongCount = 0;

// Drag and Drop
foodItems.forEach(food => {
    food.addEventListener('dragstart', dragStart);
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
});

let draggedFood = null;

function dragStart(e) {
    draggedFood = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.target.classList.add('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const dropZone = e.target.closest('.drop-zone');
    if (!dropZone) return;
    
    const foodType = draggedFood.getAttribute('data-type');
    const zoneType = dropZone.classList.contains('good-zone') ? 'good' : 'bad';
    
    if (foodType === zoneType) {
        correctCount++;
        draggedFood.style.opacity = '0.5';
        draggedFood.style.cursor = 'default';
        draggedFood.draggable = false;
        
        // Добавляем еду в зону
        const zoneContent = dropZone.querySelector('.zone-content');
        const clonedFood = draggedFood.cloneNode(true);
        clonedFood.style.margin = '5px';
        clonedFood.style.display = 'inline-block';
        zoneContent.appendChild(clonedFood);
        
        // Воспроизводим звук успеха
        playSound('correct');
    } else {
        wrongCount++;
        // Воспроизводим звук ошибки
        playSound('wrong');
    }
    
    updateGameScore();
    
    // Проверяем, закончена ли игра
    const remainingFood = Array.from(foodItems).filter(food => 
        food.style.opacity !== '0.5'
    );
    
    if (remainingFood.length === 0) {
        setTimeout(() => {
            alert(`Игра окончена!\nПравильно: ${correctCount}\nНеправильно: ${wrongCount}`);
        }, 500);
    }
}

function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // До
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Ми
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Соль
    } else {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Ля
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1); // Соль
    }
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
}

function updateGameScore() {
    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
}

resetGameButton.addEventListener('click', () => {
    // Сброс игры
    correctCount = 0;
    wrongCount = 0;
    updateGameScore();
    
    foodItems.forEach(food => {
        food.style.opacity = '1';
        food.style.cursor = 'move';
        food.draggable = true;
    });
    
    document.querySelectorAll('.zone-content').forEach(zone => {
        zone.innerHTML = '';
    });
    
    // Воспроизводим звук сброса
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(392, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
});

// Закрытие полноэкранного изображения по клику на фон
document.getElementById('fullscreen-container').addEventListener('click', function(e) {
    if (e.target.id === 'fullscreen-container') {
        closeFullscreenImage();
    }
});

// Инициализация теста
loadQuestion();

// Плавная прокрутка при клике на ссылки в меню
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});