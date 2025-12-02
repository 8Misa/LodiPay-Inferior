document.addEventListener('DOMContentLoaded', () => {
    // ================== User Info ==================
    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.getElementById('user-avatar');
    const userTierEl = document.getElementById('user-tier');

    /**
     * Sets user information dynamically.
     * @param {Object} user - User object with name, avatarText, and tier.
     */
    function setUserInfo(user) {
        if (!user) return;

        if (user.name) userNameEl.textContent = user.name;
        if (user.avatarText) userAvatarEl.textContent = user.avatarText;
        if (user.tier) userTierEl.textContent = user.tier;
    }

    // ================== Wallet Actions ==================
    const actionButtons = document.querySelectorAll('.wallet-actions .action-btn');

    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.textContent.trim();
            alert(`You clicked: ${action}`);
            // Here you can trigger modals, redirect, or call APIs
        });
    });

    // ================== Add Card Button ==================
    const addCardBtn = document.querySelector('.btn-add');

    if (addCardBtn) {
        addCardBtn.addEventListener('click', () => {
            alert('Redirecting to Add Card page...');
            // Example: window.location.href = 'add-card.html';
        });
    }

    // Expose setUserInfo globally for dynamic user data
    window.setUserInfo = setUserInfo;
});
