import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mnekynmsgleysmfjtdbh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZWt5bm1zZ2xleXNtZmp0ZGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTAxMTUsImV4cCI6MjA4MDE4NjExNX0.l0h5Wlqlvzve5Bs8sHIeVCcRuikRrTr2dRYpkdYLSdo"; // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const cardsGrid = document.querySelector(".cards-grid");
const userName = document.getElementById("user-name");
const userAvatar = document.getElementById("user-avatar");
const userTier = document.getElementById("user-tier");

async function loadUser() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
        userName.textContent = "Guest";
        userAvatar.textContent = "G";
        userTier.textContent = "";
        return;
    }

    const fullName = user.user_metadata.full_name || "User";
    userName.textContent = fullName;
    userAvatar.textContent = fullName[0].toUpperCase();
    userTier.textContent = fullName; // replace "Premium User" with actual name
}

async function fetchCards() {
    const { data: cards, error } = await supabase
        .from("cards")
        .select("*")
        .order("id", { ascending: true });
    if (error) {
        console.error("Error fetching cards:", error.message);
        return [];
    }
    return cards;
}

async function renderCards() {
    const cards = await fetchCards();
    cardsGrid.innerHTML = "";

    if (cards.length === 0) {
        cardsGrid.innerHTML = `
            <div class="add-card-section">
                <div class="add-card-content">
                    <i class="fas fa-plus-circle"></i>
                    <h2>No Cards Added Yet</h2>
                    <p>Securely link your debit or credit cards to enjoy seamless transactions and enhanced features within LodiPay.</p>
                    <button class="btn-add-card" id="addCardBtn"><i class="fas fa-plus"></i> Add New Card</button>
                </div>
            </div>
        `;
        document.getElementById("addCardBtn").addEventListener("click", addCard);
        return;
    }

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-type">${card.type}</div>
                <div class="card-network">${card.network}</div>
            </div>
            <div class="card-number">${card.number}</div>
            <div class="card-details">
                <div class="card-info">
                    <div class="card-label">Card Holder</div>
                    <div class="card-value">${card.holder}</div>
                </div>
                <div class="card-info">
                    <div class="card-label">Expiry</div>
                    <div class="card-value">${card.expiry}</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="card-action-btn" onclick="removeCard(${card.id})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        cardsGrid.appendChild(cardElement);
    });
}

async function addCard() {
    const cardData = {
        type: "Debit",
        network: "VISA",
        number: "**** **** **** 1234",
        holder: userName.textContent,
        expiry: "12/28"
    };

    const { data, error } = await supabase.from("cards").insert([cardData]);
    if (error) {
        alert("Failed to add card: " + error.message);
        return;
    }

    renderCards();
}

async function removeCard(cardId) {
    if (!confirm("Are you sure you want to remove this card?")) return;

    const { error } = await supabase.from("cards").delete().eq("id", cardId);
    if (error) {
        alert("Failed to remove card: " + error.message);
        return;
    }

    renderCards();
}

async function init() {
    await loadUser();
    await renderCards();
}

init();

