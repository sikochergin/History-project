fetch('../tests_jsons/dates_list.json')
    .then(response => response.json())
    .then(data => {
        const accordionContainer = document.getElementById('dates_list');

        data.events.forEach(event => {
            // Создаем элементы аккордеона
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            const accordionDate = document.createElement('div');
            accordionDate.classList.add('accordion-date');
            accordionDate.textContent = event.date;

            const accordionContent = document.createElement('div');
            accordionContent.classList.add('accordion-content');
            accordionContent.innerHTML = `<p>${event.description}</p>`;

            // Добавляем элементы в контейнер аккордеона
            accordionItem.appendChild(accordionDate);
            accordionItem.appendChild(accordionContent);
            accordionContainer.appendChild(accordionItem);

            //document.getElementById("dates_list").appendChild(accordionContainer);

            // Добавляем обработчик события для открытия и закрытия аккордеона
            accordionDate.addEventListener('click', () => {
                if (!accordionItem.classList.contains('open')) {
                    const allAccordionItems = document.querySelectorAll('.accordion-item');
                    allAccordionItems.forEach(item => item.classList.remove('open'));
                    accordionItem.classList.add('open');
                } else {
                    accordionItem.classList.remove('open');
                }
            });
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных', error);
    });