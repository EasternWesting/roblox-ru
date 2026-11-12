const loader = document.getElementById('loader');
const skipBtn = document.getElementById('skip-loader');

function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
    }
}

skipBtn.addEventListener('click', hideLoader);
window.addEventListener('load', hideLoader);

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // RULES BUTTONS / RULES TEXTS
    // =====================================

    const rulesButtons = document.querySelector('.rules-btns');

    if (rulesButtons) {
        rulesButtons.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || !rulesButtons.contains(btn)) return;

            const target = document.getElementById(btn.dataset.target);
            if (!target) return;

            document.querySelector('.rules.active')
                ?.classList.remove('active');

            rulesButtons.querySelector('.active')
                ?.classList.remove('active');

            btn.classList.add('active');
            target.classList.add('active');

            const ri1 = document.getElementById('ri1');
            const ri2 = document.getElementById('ri2');

            if (ri1) ri1.textContent = btn.dataset.title || '';
            if (ri2) ri2.textContent = btn.dataset.subtitle || '';
        });
    }

    // =====================================
    // BACKGROUND TRANSPARENCY / BLUR
    // =====================================

    function setupSlider({
        sliderId,
        textId,
        storageKey,
        cssVariable,
        cssValue,
        textValue
    }) {
        const slider = document.getElementById(sliderId);
        const output = document.getElementById(textId);

        if (!slider) return;
        const saved = localStorage.getItem(storageKey);

        if (saved !== null) {
            slider.value = saved;
        }

        let frame = null;

        function update() {
            const value = slider.value;

            document.documentElement.style.setProperty(
                cssVariable,
                cssValue(value)
            );

            if (output) {
                output.textContent = textValue(value);
            }
        }

        slider.addEventListener('input', () => {
            if (frame !== null) return;

            frame = requestAnimationFrame(() => {frame = null; update();});
        });

        slider.addEventListener('change', () => {
            if (frame !== null) {
                cancelAnimationFrame(frame);
                frame = null;
            }

            update();
            localStorage.setItem(storageKey, slider.value);
        });

        update();
    }

    // TRANSPARENCY
    setupSlider({
        sliderId: 'transp_slider',
        textId: 'transpTxt',
        storageKey: 'bg-transp',
        cssVariable: '--bg',

        cssValue: value => `rgba(0, 0, 0, ${value})`,
        textValue: value => `Прозрачность: ${Math.round(value * 100)}%`
    });

    // BLUR
    setupSlider({
        sliderId: 'blur_slider',
        textId: 'blurTxt',
        storageKey: 'bg-blur',
        cssVariable: '--blur',

        cssValue: value => `${value}px`,
        textValue: value => `Размытие: ${value} ур.`
    });

    // =====================================
    // DROPDOWN MENU
    // =====================================

    const menuButton = document.getElementById('dropdown-btn');
    if (menuButton) {
        const dropdown = menuButton.closest('.dropdown');
        const header = menuButton.closest('.header');
        let menuIsOpen = false;

        function openMenu() {
            if (menuIsOpen) return;

            menuIsOpen = true;

            header?.classList.add('mobile-menu-open');
            dropdown?.classList.add('open');

            menuButton.setAttribute('aria-expanded', 'true');
            menuButton.setAttribute('aria-label', 'Закрыть меню');
        }

        function closeMenu() {
            if (!menuIsOpen) return;
            menuIsOpen = false;

            header?.classList.remove('mobile-menu-open');
            dropdown?.classList.remove('open');

            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Открыть меню');
        }

        menuButton.addEventListener('click', () => {
            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {closeMenu();}
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 640) {closeMenu();}
        });
    }

    // =====================================
    // NOTIFICATIONS
    // =====================================

    const notification = document.getElementById('notification');

    const notificationText = notification
        ?.querySelector('.notification-text');

    if (notification && notificationText) {
        let notificationTimer;

        const messages = {
            'IND': 'IND (Indulgence) — При первом нарушении данного пункта нарушителю будет выдано устное предупреждение.',
            'IND-T': 'IND (Indulgence) — Если участник находится на сервере менее 14-ти дней, то за первое нарушение данного пункта нарушителю будет выдано устное предупреждение.',
            'RES': 'RES (Reset) — В некоторых случаях за нарушение данного пункта нарушителю может быть снято XP в !rank.',
            'TOS': 'ToS (Terms of Service) — Условия предоставления сервисов Discord. Данный пункт взят из правил ToS Discord.',
            'AUTO-MOD': 'AUTO MOD (Automatic Moderation) — Данный пункт частично или полностью модерируется с помощью автомодерации бота JuniperBot.',
            'REGEX': 'RegeX — Данный пункт частично модерируется с помощью автоматической системы, проверяющей профиль участника на наличие запрещенных символов.'
        };

        function hideNotification() {
            clearTimeout(notificationTimer);
            notification.classList.remove('visible');
        }

        notification.addEventListener('click', hideNotification);

        document.addEventListener('click', (e) => {
            const target = e.target.closest('.IND, .IND-T, .RES, .TOS, .AUTO-MOD, .REGEX');

            if (!target) return;
            const className = [...target.classList].find(name => Object.hasOwn(messages, name));

            if (!className) return;
            notificationText.textContent = messages[className];

            clearTimeout(notificationTimer);

            notification.classList.add('visible');
            notificationTimer = setTimeout(hideNotification, 5000);
        });
    }
});
