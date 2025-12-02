// dashboard.js

// Utility function to format currency
function formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Populate user info dynamically
function updateUserInfo(user) {
    if (!user) return; // Exit if no user data
    document.getElementById("user-avatar").textContent = user.avatar || "";
    document.getElementById("user-name").textContent = user.name || "";
    document.getElementById("user-tier").textContent = user.tier || "";
}

// Populate main stats dynamically
function updateStats(stats) {
    if (!stats) return;
    document.getElementById("balance").textContent = formatCurrency(stats.balance || 0);
    document.getElementById("transaction-count").textContent = stats.transactionCount || 0;
    document.getElementById("income").textContent = formatCurrency(stats.income || 0);
    document.getElementById("expenses").textContent = formatCurrency(stats.expenses || 0);
}

// Populate transactions table dynamically
function populateTransactions(transactions) {
    const tbody = document.getElementById("transactions-body");
    tbody.innerHTML = ""; // Clear previous rows
    if (!transactions) return;

    transactions.forEach(tx => {
        const tr = document.createElement("tr");

        const typeTd = document.createElement("td");
        typeTd.textContent = tx.type || "";
        tr.appendChild(typeTd);

        const amountTd = document.createElement("td");
        amountTd.textContent = formatCurrency(tx.amount || 0);
        tr.appendChild(amountTd);

        const dateTd = document.createElement("td");
        dateTd.textContent = tx.date || "";
        tr.appendChild(dateTd);

        const statusTd = document.createElement("td");
        statusTd.textContent = tx.status || "";
        statusTd.className = `transaction-status ${tx.status ? tx.status.toLowerCase() : ""}`;
        tr.appendChild(statusTd);

        tbody.appendChild(tr);
    });
}

// Setup quick action navigation
function setupQuickActions() {
    const sendMoney = document.querySelector(".send-money");
    const requestMoney = document.querySelector(".request-money");
    const payBills = document.querySelector(".pay-bills");
    const addCard = document.querySelector(".add-card");

    sendMoney.addEventListener("click", () => {
        window.location.href = "sendmoney.html";
    });

    requestMoney.addEventListener("click", () => {
        window.location.href = "requestmoney.html";
    });

    payBills.addEventListener("click", () => {
        window.location.href = "paybills.html";
    });

    addCard.addEventListener("click", () => {
        window.location.href = "addcard.html";
    });
}

// Initialize dashboard with optional dynamic data
function initDashboard(user = null, stats = null, transactions = null) {
    updateUserInfo(user);
    updateStats(stats);
    populateTransactions(transactions);
    setupQuickActions();
}

// Run when page loads
window.addEventListener("DOMContentLoaded", () => initDashboard());
