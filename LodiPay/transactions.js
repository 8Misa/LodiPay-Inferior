document.addEventListener("DOMContentLoaded", () => {
    const transactionsBody = document.getElementById("transactions-body");
    const searchInput = document.getElementById("search");
    const dateFromInput = document.getElementById("date-from");
    const dateToInput = document.getElementById("date-to");
    const typeSelect = document.getElementById("transaction-type");
    const statusSelect = document.getElementById("status");
    const applyBtn = document.querySelector(".btn-primary");
    const resetBtn = document.querySelector(".btn-secondary");
    const pagination = document.querySelector(".pagination");

    // Empty transactions array - replace with actual data
    let transactions = [];
    let currentPage = 1;
    const rowsPerPage = 5;

    // Render pagination buttons
    function renderPagination(totalPages) {
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = "page-btn" + (i === currentPage ? " active" : "");
            btn.textContent = i;
            btn.addEventListener("click", () => {
                currentPage = i;
                renderTransactions(transactions);
            });
            pagination.appendChild(btn);
        }
    }

    // Render transactions (currently empty)
    function renderTransactions(filteredTransactions = []) {
        transactionsBody.innerHTML = "";

        if (!filteredTransactions.length) {
            // No transactions to show
            transactionsBody.innerHTML = `<tr><td colspan="4">No Transactions Found</td></tr>`;
            renderPagination(0);
            return;
        }

        const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedTransactions = filteredTransactions.slice(start, end);

        paginatedTransactions.forEach(tx => {
            const tr = document.createElement("tr");
            // Only minimal structure, no inner HTML templates
            tr.dataset.type = tx.type;
            tr.dataset.status = tx.status;
            tr.dataset.date = tx.date;
            tr.dataset.description = tx.description;
            tr.dataset.amount = tx.amount;
            transactionsBody.appendChild(tr);
        });

        renderPagination(totalPages);
    }

    // Filter logic (ready for real data)
    function filterTransactions() {
        let filtered = [...transactions];

        // Search filter
        const search = searchInput.value.toLowerCase();
        if (search) {
            filtered = filtered.filter(tx =>
                (tx.description && tx.description.toLowerCase().includes(search)) ||
                (tx.amount && tx.amount.toString().includes(search))
            );
        }

        // Type filter
        const type = typeSelect.value;
        if (type !== "all") filtered = filtered.filter(tx => tx.type === type);

        // Status filter
        const status = statusSelect.value;
        if (status !== "all") filtered = filtered.filter(tx => tx.status === status);

        // Date filter
        const fromDate = dateFromInput.value;
        const toDate = dateToInput.value;
        if (fromDate) filtered = filtered.filter(tx => tx.date >= fromDate);
        if (toDate) filtered = filtered.filter(tx => tx.date <= toDate);

        renderTransactions(filtered);
    }

    // Event listeners
    applyBtn.addEventListener("click", filterTransactions);
    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        dateFromInput.value = "";
        dateToInput.value = "";
        typeSelect.value = "all";
        statusSelect.value = "all";
        currentPage = 1;
        renderTransactions([]);
    });

    // Initial render with empty transactions
    renderTransactions([]);
});
