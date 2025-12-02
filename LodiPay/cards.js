// cards.js

// ================== Sidebar Navigation ==================
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const page = link.dataset.page;
        if (page === 'logout') {
            alert('Logging out...');
            // Add your logout logic here
            return;
        }

        // Navigation logic (replace with your own page logic)
        alert(`Navigate to "${page}" page`);
    });
});

// ================== User Info ==================
const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');

function setUserInfo(user) {
    if (!user) return;
    userName.textContent = user.name || '';
    userAvatar.textContent = user.name ? user.name[0] : ''; // First letter of name
    document.getElementById('user-tier').textContent = user.tier || '';
}

// ================== Card Management ==================
const cardsGrid = document.querySelector('.cards-grid');
const addCardBtn = document.querySelector('.btn-add-card');

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-header">
            <div class="card-type">${cardData.type || 'Debit Card'}</div>
            <div class="card-network">${cardData.network || 'VISA'}</div>
        </div>
        <div class="card-number">${cardData.number || '**** **** **** ****'}</div>
        <div class="card-details">
            <div class="card-info">
                <div class="card-label">Card Holder</div>
                <div class="card-value">${cardData.holder || ''}</div>
            </div>
            <div class="card-info">
                <div class="card-label">Expires</div>
                <div class="card-value">${cardData.expiry || 'MM/YY'}</div>
            </div>
        </div>
        <div class="card-actions">
            <button class="card-action-btn edit-card" title="Edit Card">
                <i class="fas fa-edit"></i>
            </button>
            <button class="card-action-btn remove-card" title="Remove Card">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

    // Add card action listeners
    card.querySelector('.edit-card').addEventListener('click', () => {
        alert(`Edit card: ${cardData.number}`);
        // Add your edit card logic here
    });

    card.querySelector('.remove-card').addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this card?')) {
            card.remove();
        }
    });

    // Insert the card before the "add card" section
    const addCardSection = document.querySelector('.add-card-section');
    cardsGrid.insertBefore(card, addCardSection);
}

// ================== Add Card Button ==================
addCardBtn.addEventListener('click', () => {
    // Example: open a form modal or prompt for card info
    const cardHolder = prompt('Enter card holder name:');
    const cardNumber = prompt('Enter card number:');
    const cardExpiry = prompt('Enter expiry (MM/YY):');
    const cardType = prompt('Enter card type (Debit/Credit):');
    const cardNetwork = prompt('Enter card network (VISA/MasterCard):');

    if (cardHolder && cardNumber) {
        createCard({
            holder: cardHolder,
            number: cardNumber,
            expiry: cardExpiry,
            type: cardType,
            network: cardNetwork
        });
    }
});

// ================== Card Management Options ==================
const managementOptions = document.querySelectorAll('.management-option');

managementOptions.forEach(option => {
    option.addEventListener('click', () => {
        const action = option.querySelector('h3').textContent;
        alert(`Selected action: ${action}`);
        // Implement logic for each management option (Card Security, Limits, etc.)
    });
});

// ================== Initialize User Info ==================
setUserInfo({
    name: '', // Populate dynamically
    tier: ''  // Populate dynamically
});
