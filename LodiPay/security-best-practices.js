// ================== User Info ==================
const userNameEl = document.getElementById('user-name');
const userAvatarEl = document.getElementById('user-avatar');
const userTierEl = document.getElementById('user-tier');

// Function to set user info dynamically
function setUserInfo(user) {
    if (!user) return;

    userNameEl.textContent = user.name || '';
    userAvatarEl.textContent = user.name ? user.name[0].toUpperCase() : '';
    userTierEl.textContent = user.tier || '';
}

// ================== Breadcrumb Navigation ==================
const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
breadcrumbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('href');
        // Navigate to the target page
        console.log(`Navigate to: ${targetPage}`);
        // Example: window.location.href = targetPage;
    });
});

// ================== Security Setup Button ==================
const setupBtn = document.getElementById('security-setup');
if (setupBtn) {
    setupBtn.addEventListener('click', () => {
        alert('Redirecting to security setup features...');
        // TODO: Replace with actual navigation or modal
        // Example: window.location.href = '/security-setup.html';
    });
}

// ================== Optional: Highlight Practice Cards ==================
const practiceCards = document.querySelectorAll('.practice-card');
practiceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});
