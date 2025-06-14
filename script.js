document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!'); // Тестовое сообщение в консоли

    const inputs = [
        { id: 'startDate', type: 'date' },
        { id: 'startTime', type: 'time' },
        { id: 'endTime', type: 'time' }
    ];

    inputs.forEach(inputData => {
        const input = document.getElementById(inputData.id);
        if (!input) {
            console.error(`Element with id "${inputData.id}" not found!`);
            return;
        }

        // Set default values if needed
        if (inputData.type === 'date' && !input.value) {
            const today = new Date();
            input.value = today.toISOString().split('T')[0];
        }
        
        if (inputData.type === 'time' && !input.value) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            input.value = `${hours}:${minutes}`;
        }
    });

    // Add form submission handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted!');

            // Собираем данные формы
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Form data:', data); // Показываем данные в консоли

            // Дополнительная отладка
            console.log('Raw FormData entries:', [...formData.entries()]);

            // Проверка всех полей вручную
            const allInputs = form.querySelectorAll('input, select, textarea');
            allInputs.forEach(input => {
                console.log(`Field ${input.name}: ${input.value}`);
            });
            // Здесь позже добавим отправку в Pipedrive API
        });
    }
});
