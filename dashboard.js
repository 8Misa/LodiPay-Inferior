import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mnekynmsgleysmfjtdbh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZWt5bm1zZ2xleXNtZmp0ZGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTAxMTUsImV4cCI6MjA4MDE4NjExNX0.l0h5Wlqlvzve5Bs8sHIeVCcRuikRrTr2dRYpkdYLSdo"; // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const userName = document.getElementById("user-name");
const userAvatar = document.getElementById("user-avatar");
const userTier = document.getElementById("user-tier");
const balanceEl = document.getElementById("balance");
const transactionCountEl = document.getElementById("transaction-count");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");
const transactionsBody = document.getElementById("transactions-body");

// Load User Info
async function loadUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        userName.textContent = "Guest";
        userAvatar.textContent = "G";
        userTier.textContent = "";
        return;
    }
    const fullName = user.user_metadata.full_name || "User";
    userName.textContent = fullName;
    userAvatar.textContent = fullName[0].toUpperCase();
    userTier.textContent = fullName; // show full name instead of "Premium User"
}

// Load Transactions & Stats
async function loadTransactions() {
    const { data: transactions, error } = await supabase
        .from("transactions")
        .select("*")
        .order("id", { ascending: false });

    if (error) { console.error(error); return; }

    let totalIncome = 0, totalExpenses = 0;
    transactionsBody.innerHTML = "";

    transactions.forEach(tx => {
        const statusClass = tx.status === "completed" ? "status-completed" :
                            tx.status === "pending" ? "status-pending" : "status-failed";
        transactionsBody.innerHTML += `
            <tr>
                <td>${tx.type}</td>
                <td>₱${tx.amount}</td>
                <td>${tx.date}</td>
                <td><span class="transaction-status ${statusClass}">${tx.status}</span></td>
            </tr>
        `;
        if (tx.type.toLowerCase() === "income") totalIncome += parseFloat(tx.amount);
        if (tx.type.toLowerCase() === "expense") totalExpenses += parseFloat(tx.amount);
    });

    incomeEl.textContent = `₱${totalIncome.toFixed(2)}`;
    expensesEl.textContent = `₱${totalExpenses.toFixed(2)}`;
    balanceEl.textContent = `₱${(totalIncome - totalExpenses).toFixed(2)}`;
    transactionCountEl.textContent = transactions.length;
}

// Initialize Dashboard
async function init() {
    await loadUser();
    await loadTransactions();

    // --- Add Card Redirect ---
    const addCardAction = document.querySelector(".add-card");
    addCardAction.addEventListener("click", () => {
        window.location.href = "cards.html";
    });
}

init();

