document.addEventListener("DOMContentLoaded", () => {
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const splitValueEl = document.getElementById("splitValue");
    const transactionList = document.getElementById("transactionList");
    const transactionForm = document.getElementById("transactionForm");
    const splitExpenseBtn = document.getElementById("splitExpenseBtn");
    const transactionTypeLabel = document.getElementById("transactionTypeLabel");
  
    let transactions = [];
  
    // Update header totals
    function updateBalance() {
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      balanceEl.textContent = `₹${(income - expense).toFixed(2)}`;
      incomeEl.textContent = `₹${income.toFixed(2)}`;
      expenseEl.textContent = `₹${expense.toFixed(2)}`;
    }
  
    // Render transactions list with checkboxes for expense items
    function updateUI() {
      transactionList.innerHTML = "";
      transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        let checkboxHTML = "";
        if (transaction.type === "expense") {
          checkboxHTML = `<input type="checkbox" class="select-checkbox" data-index="${index}">`;
        }
        li.innerHTML = `
          ${checkboxHTML}
          <div class="transaction-info">
            <strong>${transaction.name}</strong>
            <small>${transaction.date}</small>
          </div>
          <div class="transaction-amount ${transaction.type}">
            ₹${transaction.amount.toFixed(2)}
          </div>
        `;
        transactionList.appendChild(li);
      });
      updateBalance();
    }
  
    // Add new transaction
    transactionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const amount = parseFloat(document.getElementById("amount").value);
      const date = document.getElementById("date").value;
      const type = document.getElementById("type").checked ? "expense" : "income";
  
      if (!name || isNaN(amount) || amount <= 0 || !date) {
        alert("Please enter valid details.");
        return;
      }
  
      transactions.push({ name, amount, type, date });
      updateUI();
      transactionForm.reset();
    });
  
    // Update toggle label for transaction type
    document.getElementById("type").addEventListener("change", function () {
      transactionTypeLabel.textContent = this.checked ? "Expense" : "Income";
    });
  
    // Calculate split based on selected expense transactions
    splitExpenseBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll(".select-checkbox");
      let totalSelectedExpense = 0;
      checkboxes.forEach((cb) => {
        if (cb.checked) {
          const idx = cb.getAttribute("data-index");
          totalSelectedExpense += transactions[idx].amount;
        }
      });
  
      if (totalSelectedExpense <= 0) {
        alert("No expense transactions selected for splitting.");
        return;
      }
  
      const members = prompt("Enter the number of members to split among:");
      if (!members || isNaN(members) || members <= 0) {
        alert("Invalid number of members.");
        return;
      }
  
      const perPersonShare = totalSelectedExpense / members;
      splitValueEl.textContent = `₹${perPersonShare.toFixed(2)}`;
      alert(
        `Total Selected Expense: ₹${totalSelectedExpense.toFixed(
          2
        )}\nNumber of Members: ${members}\nEach should pay: ₹${perPersonShare.toFixed(2)}`
      );
    });
  
    updateUI();
  });
  
