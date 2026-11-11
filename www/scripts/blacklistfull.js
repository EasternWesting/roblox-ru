document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('tag');

    const tooltipTexts = {
        'IND': 'IND (Indulgence) — При первом нарушении данного пункта нарушителю будет выдано устное предупреждение.',
        'IND-T': 'IND (Indulgence) — Если участник находится на сервере менее 14-ти дней, то за первое нарушение данного пункта нарушителю будет выдано устное предупреждение.',
        'RES': 'RES (Reset) — В некоторых случаях за нарушение данного пункта нарушителю может быть снято XP в !rank.',
        'TOS': 'ToS (Terms of Service) — Условия предоставления сервисов Discord. Данный пункт взят из правил ToS Discord.',
        'AUTO-MOD': 'AUTO MOD (Automatic Moderation) — Данный пункт частично или полностью модерируется с помощью автомодерации бота JuniperBot.',
        'REGEX': 'RegeX — Данный пункт частично модерируется с помощью автоматической системы, проверяющей профиль участника на наличие запрещенных символов.'
    };
    
    elements.forEach(el => {
        let text = '';
        for (const className in tooltipTexts) {
            if (el.classList.contains(className)) {
                text = tooltipTexts[className];
                break;
            }
        }

        if (text) {
        el.style.setProperty('--tt-text', `"${text}"`);
        }
    });
});

const btn = document.getElementById('dropdown-btn');
const menu = document.getElementById('dropdown-menu');

btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.getAttribute('aria-hidden') === 'false';

    if (!isOpen) {
        document.querySelectorAll('.dropdown-content[aria-hidden="false"]').forEach(m => {
            m.setAttribute('aria-hidden', 'true');
            m.parentElement.classList.remove('open');
        });
    }

    const newState = isOpen ? 'true' : 'false';
    menu.setAttribute('aria-hidden', newState);
    btn.parentElement.classList.toggle('open', newState === 'false');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(m => {
            m.setAttribute('aria-hidden', 'true');
            m.parentElement.classList.remove('open');
        });
    }
});