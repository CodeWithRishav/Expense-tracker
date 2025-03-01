document.addEventListener("DOMContentLoaded", () => {
    const balance = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const transactionList = document.getElementById("transactionList");
    const transactionForm = document.getElementById("transactionForm");
    const splitExpenseBtn = document.getElementById("splitExpenseBtn");

    let transactions = [];

    // 🔹 Function to Update Balance
    function updateBalance() {
        const income = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        
        const expense = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        
        const totalBalance = income - expense;

        balance.textContent = `₹${totalBalance.toFixed(2)}`;
        incomeEl.textContent = `₹${income.toFixed(2)}`;
        expenseEl.textContent = `₹${expense.toFixed(2)}`;
    }

    // 🔹 Function to Add Transaction
    function addTransaction(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const date = document.getElementById("date").value;
        const isExpense = document.getElementById("type").checked;
        const type = isExpense ? "expense" : "income";

        if (name === "" || isNaN(amount) || amount <= 0 || !date) {
            alert("Please enter valid transaction details.");
            return;
        }

        const transaction = { name, amount, type, date };
        transactions.push(transaction);

        updateUI();
        transactionForm.reset();
    }

    // 🔹 Function to Update UI
    function updateUI() {
        transactionList.innerHTML = "";
        transactions.forEach(transaction => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${transaction.name}</strong> - ₹${transaction.amount.toFixed(2)}
                <span style="color: ${transaction.type === "income" ? "green" : "red"};">${transaction.type}</span>
                <br><small>${transaction.date}</small>
            `;
            transactionList.appendChild(li);
        });

        updateBalance();
    }

    // 🔹 Split Expense Function
    function splitExpense() {
        if (transactions.length === 0) {
            alert("No expenses to split.");
            return;
        }

        const members = prompt("Enter the number of members:");
        if (!members || isNaN(members) || members <= 0) {
            alert("Please enter a valid number of members.");
            return;
        }

        const expenseTransactions = transactions.filter(t => t.type === "expense");
        if (expenseTransactions.length === 0) {
            alert("No expenses found to split.");
            return;
        }

        let totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
        let perPersonShare = totalExpense / members;

        alert(`Total Expense: ₹${totalExpense.toFixed(2)}\nEach person should pay: ₹${perPersonShare.toFixed(2)}`);
    }

    // 🔹 Event Listeners
    transactionForm.addEventListener("submit", addTransaction);
    splitExpenseBtn.addEventListener("click", splitExpense);
});
