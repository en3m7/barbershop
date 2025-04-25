document.addEventListener('DOMContentLoaded', () => {
    // Анимация при скролле
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Бургер-меню
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });


    // Слайдер
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        const dotsContainer = document.querySelector('.dots');
        let currentIndex = 0;
        const totalSlides = images.length;

        // Создание точек
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            slides.style.transform = translateX(-${currentIndex * 100}%);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex >= totalSlides) currentIndex = 0;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            updateSlider();
        }

        next.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        prev.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        // Автоматическая смена слайдов
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Смена каждые 5 секунд
    }
});
