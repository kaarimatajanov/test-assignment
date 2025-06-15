document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

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

    const form = document.getElementById('contactForm');
    const createJobBtn = document.getElementById('createJobBtn');
    const saveInfoBtn = document.getElementById('saveInfoBtn');

    if (form && createJobBtn && saveInfoBtn) {
        createJobBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Form data for Create job:', data);

            const apiToken = 'edc7e04186714a9f74ee7e1e41d98b4582eee86c';
            const pipedriveEndpoint = 'https://api.pipedrive.com/v1/deals';

            const payload = {
                title: `New job - ${data.firstName} ${data.lastName} - ${data.jobType}`,
                person_id: 54321, // Замени на реальный person_id
                stage_id: 67890, // Замени на stage_id новой воронки
                value: 100,
                currency: 'USD',
                status: 'open',
                'cf_scheduled_date': data.startDate,
                'cf_start_time': data.startTime,
                'cf_end_time': data.endTime,
                'cf_description': data.description,
                'cf_address': data.address,
                'cf_city': data.city,
                'cf_state': data.state,
                'cf_zip_code': data.zipCode,
                'cf_area': data.area,
                'cf_phone': data.phone,
                'cf_email': data.email,
                'cf_job_source': data.jobSource,
                'cf_test_select': data.testSelect
            };

            fetch(pipedriveEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Pipedrive response:', data);
                if (data.success) {
                    alert('New job created successfully!');
                } else {
                    alert('Error creating job: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to connect to Pipedrive. Check console for details.');
            });
        });

        saveInfoBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Form data for Save info:', data);

            // Сохраняем данные в localStorage
            localStorage.setItem('savedFormData', JSON.stringify(data));
            alert('Data saved locally!');
        });
    }
});
