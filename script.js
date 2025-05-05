document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Firebase с твоей конфигурацией
    const firebaseConfig = {
        apiKey: "AizaSYArESMmv0ZEG37UJzZ9eyKWD5JHdJ1SM",
        authDomain: "barbershop37-00.firebaseapp.com",
        projectId: "barbershop37-00",
        storageBucket: "barbershop37-00.appspot.com",
        messagingSenderId: "421518922824",
        appId: "1:421518922824:web:67356e9a84b9ecae513499",
        measurementId: "G-GB1NWMV5Y9"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

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
            pause: 'hover'
        });
    }

    // Обработка формы записи
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            const phone = contactForm.querySelector('#phone').value;
            const date = contactForm.querySelector('#date').value;
            const service = contactForm.querySelector('#service').value;

            // Сохранение в Firebase
            database.ref('appointments').push({
                name: name,
                phone: phone,
                date: date,
                service: service,
                timestamp: Date.now()
            }).then(() => {
                // Отправка уведомления в Telegram
                fetch(`https://api.telegram.org/7640965702:AAEDq5X3IthGjXoF1REtOpzqV3RuNByrp70/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: '-4741180688',
                        text: `Новая запись!\nИмя: ${name}\nТелефон: ${phone}\nДата: ${date}\nУслуга: ${service}`
                    })
                }).then(response => response.json()).then(data => {
                    if (!data.ok) console.error('Ошибка Telegram:', data);
                });

                alert('Запись успешно сохранена!');
                contactForm.reset();
            }).catch((error) => {
                alert('Ошибка: ' + error.message);
            });
        });
    }
});