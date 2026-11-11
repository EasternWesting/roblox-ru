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

// RULES BUTTONS, RULES TEXTS
const buttons = document.querySelectorAll('.rules-btns button');
const blocks = document.querySelectorAll('.rules');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        blocks.forEach(el => el.classList.remove('active'));
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');

        document.getElementById('ri1').textContent = btn.dataset.title;
        document.getElementById('ri2').textContent = btn.dataset.subtitle;
    });
});
// --------------------

// BACKGROUND TRANSPARENCY
const transp_slider = document.getElementById('transp_slider');
const bg_transp = 'bg-transp';
const transpTxt = document.getElementById('transpTxt')

function updateTranspSlider() {
    const transp = transp_slider.value;
    const newTransp = `rgba(0, 0, 0, ${transp})`;
    const transp_percent = Math.round(transp * 100);

    document.documentElement.style.setProperty('--bg', newTransp);
    transpTxt.textContent = `Прозрачность: ${transp_percent}%`;
    localStorage.setItem(bg_transp, transp);
}

const savedTransp = localStorage.getItem(bg_transp);
if (savedTransp !== null) {
    transp_slider.value = savedTransp;
}

transp_slider.addEventListener('input', updateTranspSlider);
updateTranspSlider();
// --------------------

// BACKGROUND BLUR
const blur_slider = document.getElementById('blur_slider');
const bg_blur = 'bg-blur';
const blurTxt = document.getElementById('blurTxt')

function updateBlurSlider() {
    const blur = blur_slider.value;
    const newBlur = `${blur}px`;

    document.documentElement.style.setProperty('--blur', newBlur);
    blurTxt.textContent = `Размытие: ${blur} ур.`;
    localStorage.setItem(bg_blur, blur);
}

const saved_blur = localStorage.getItem(bg_blur);
if (saved_blur !== null) {
    blur_slider.value = saved_blur;
}

blur_slider.addEventListener('input', updateBlurSlider);
updateBlurSlider();
// --------------------

// DROPDOWN MENU
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
// --------------------