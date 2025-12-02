// settings.js

document.addEventListener('DOMContentLoaded', () => {

    // ----- Tab Switching -----
    const tabs = document.querySelectorAll('.settings-nav a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));

            // Activate clicked tab
            tab.classList.add('active');
            const targetId = tab.dataset.tab + '-tab';
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.remove('hidden');
        });
    });

    // ----- User Avatar -----  
    // Keep it empty for dynamic data later
    const userAvatar = document.getElementById('user-avatar');
    const userNameEl = document.getElementById('user-name');
    if (userAvatar) userAvatar.textContent = '';
    if (userNameEl) userNameEl.textContent = '';

    // ----- Theme Switching -----
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (!radio.checked) return;
            const body = document.body;
            const themePreview = radio.closest('.theme-option')?.querySelector('.theme-preview');

            if (!themePreview) return;

            if (themePreview.classList.contains('light-theme')) {
                body.style.backgroundColor = '#f5f7fa';
                body.style.color = '#333';
            } else if (themePreview.classList.contains('dark-theme')) {
                body.style.backgroundColor = '#1a2530';
                body.style.color = '#fff';
            } else {
                // Auto theme based on time
                const hour = new Date().getHours();
                if (hour >= 7 && hour <= 18) {
                    body.style.backgroundColor = '#f5f7fa';
                    body.style.color = '#333';
                } else {
                    body.style.backgroundColor = '#1a2530';
                    body.style.color = '#fff';
                }
            }
        });
    });

    // ----- Toggle Switches -----
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const parent = toggle.closest('.notification-item, .security-item');
            const titleEl = parent?.querySelector('.notification-title, .security-title');
            const title = titleEl ? titleEl.textContent : 'Toggle';
            console.log(`${title} is now ${toggle.checked ? 'ON' : 'OFF'}`);
        });
    });

});
