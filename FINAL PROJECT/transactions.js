$(document).ready(function() {
    const transactionsTable = $("#transactions-table");
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.forEach(function(transaction) {
        const row = `
            <tr>
                <td>${transaction.date}</td>
                <td>${transaction.items.join(", ")}</td>
                <td>$${transaction.total}</td>
            </tr>
        `;
        transactionsTable.append(row);
    });
});