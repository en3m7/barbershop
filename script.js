document.addEventListener('DOMContentLoaded', () => {
    // Анимация при скролле для элементов с классом .fade-in
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

    // Инициализация Bootstrap Carousel для галереи
    const gallerySlider = document.querySelector('#gallerySlider');
    if (gallerySlider) {
        new bootstrap.Carousel(gallerySlider, {
            interval: 3000, // Переключение каждые 3 секунды
            ride: 'carousel',
            pause: 'hover' // Пауза при наведении
        });
    }
});