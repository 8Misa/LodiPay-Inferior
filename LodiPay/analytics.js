// analytics.js

// ================== Utility Functions ==================

// Format currency
function formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ================== Update Financial Overview ==================
function updateFinancialOverview(data) {
    if (!data) return;

    // Income
    const incomeCard = document.querySelector(".analytics-card.income");
    if (incomeCard && data.income !== undefined) {
        incomeCard.querySelector(".analytics-value").textContent = formatCurrency(data.income);
        const incomeChange = incomeCard.querySelector(".analytics-change");
        if (incomeChange && data.change && data.change.income !== undefined) {
            incomeChange.className = `analytics-change ${data.change.income >= 0 ? 'positive' : 'negative'}`;
            incomeChange.innerHTML = `<i class="fas fa-arrow-${data.change.income >= 0 ? 'up' : 'down'}"></i> ${data.change.income}% from last month`;
        }
    }

    // Expenses
    const expensesCard = document.querySelector(".analytics-card.expenses");
    if (expensesCard && data.expenses !== undefined) {
        expensesCard.querySelector(".analytics-value").textContent = formatCurrency(data.expenses);
        const expensesChange = expensesCard.querySelector(".analytics-change");
        if (expensesChange && data.change && data.change.expenses !== undefined) {
            expensesChange.className = `analytics-change ${data.change.expenses >= 0 ? 'positive' : 'negative'}`;
            expensesChange.innerHTML = `<i class="fas fa-arrow-${data.change.expenses >= 0 ? 'up' : 'down'}"></i> ${data.change.expenses}% from last month`;
        }
    }

    // Savings
    const savingsCard = document.querySelector(".analytics-card.savings");
    if (savingsCard && data.savings !== undefined) {
        savingsCard.querySelector(".analytics-value").textContent = formatCurrency(data.savings);
        const savingsChange = savingsCard.querySelector(".analytics-change");
        if (savingsChange && data.change && data.change.savings !== undefined) {
            savingsChange.className = `analytics-change ${data.change.savings >= 0 ? 'positive' : 'negative'}`;
            savingsChange.innerHTML = `<i class="fas fa-arrow-${data.change.savings >= 0 ? 'up' : 'down'}"></i> ${data.change.savings}% from last month`;
        }
    }
}

// ================== Update Expense Breakdown ==================
function updateExpenseBreakdown(breakdown) {
    if (!breakdown) return;

    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    for (let category in breakdown) {
        const amount = breakdown[category];
        const percent = total > 0 ? Math.round((amount / total) * 100) : 0;
        const item = document.querySelector(`.breakdown-item.${category}`);
        if (item) {
            const amountEl = item.querySelector(".breakdown-amount");
            const percentEl = item.querySelector(".breakdown-percent");
            if (amountEl) amountEl.textContent = formatCurrency(amount);
            if (percentEl) percentEl.textContent = `${percent}% of total`;
        }
    }
}

// ================== Time Filter Buttons ==================
function setupTimeFilters(onTimeChange) {
    const buttons = document.querySelectorAll(".time-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (typeof onTimeChange === "function") {
                onTimeChange(btn.textContent.toLowerCase());
            }
        });
    });
}

// ================== Initialize Dashboard ==================
function initDashboard(getAnalyticsData) {
    const data = typeof getAnalyticsData === "function" ? getAnalyticsData() : null;

    if (data) {
        updateFinancialOverview(data);
        updateExpenseBreakdown(data.breakdown);
    }

    setupTimeFilters((timeframe) => {
        console.log(`Time filter selected: ${timeframe}`);
        // Fetch or update analyticsData based on timeframe
        const newData = typeof getAnalyticsData === "function" ? getAnalyticsData(timeframe) : null;
        if (newData) {
            updateFinancialOverview(newData);
            updateExpenseBreakdown(newData.breakdown);
        }
    });
}

// Run on page load
window.addEventListener("DOMContentLoaded", () => initDashboard());
