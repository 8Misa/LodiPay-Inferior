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

    // ================== Button Actions ==================
    const upgradeBtn = document.getElementById('upgrade-account');

    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            // Redirect to account options page or trigger modal
            window.location.href = 'account-options.html';
        });
    }
});
