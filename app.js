// MyBizTracker - Complete Application Logic
const storage = new StorageManager();

// Initialize app on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  setupEventListeners();
  refreshDashboard();
}

// Tab Navigation
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(el.dataset.tab);
    });
  });

  // Inventory
  document.getElementById('addItemBtn').onclick = () => document.getElementById('addItemModal').classList.add('active');
  document.getElementById('closeAddItem').onclick = () => document.getElementById('addItemModal').classList.remove('active');
  document.getElementById('addItemForm').onsubmit = handleAddItem;

  // Expenses
  document.getElementById('addExpenseBtn').onclick = () => document.getElementById('addExpenseModal').classList.add('active');
  document.getElementById('closeAddExpense').onclick = () => document.getElementById('addExpenseModal').classList.remove('active');
  document.getElementById('addExpenseForm').onsubmit = handleAddExpense;

  // Sales
  document.getElementById('addSaleBtn').onclick = () => document.getElementById('addSaleModal').classList.add('active');
  document.getElementById('closeAddSale').onclick = () => document.getElementById('addSaleModal').classList.remove('active');
  document.getElementById('addSaleForm').onsubmit = handleAddSale;

  // Modal close on outside click
  window.onclick = (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  };
}

function switchTab(tab) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('[data-tab]').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  if (tab === 'dashboard') refreshDashboard();
  else if (tab === 'inventory') updateInventoryTable();
  else if (tab === 'expenses') updateExpensesTable();
  else if (tab === 'sales') updateSalesTable();
  else if (tab === 'reports') updateReports();
  else if (tab === 'reminders') updateReminders();
}

// Dashboard
function refreshDashboard() {
  const revenue = storage.getTotalRevenue();
  const expenses = storage.getTotalExpenses();
  const profit = storage.getNetProfit();
  const items = storage.getInventoryItems().length;

  document.getElementById('totalRevenue').textContent = '$' + revenue.toFixed(2);
  document.getElementById('totalExpenses').textContent = '$' + expenses.toFixed(2);
  document.getElementById('netProfit').textContent = '$' + profit.toFixed(2);
  document.getElementById('totalItems').textContent = items;

  updateRecentTransactions();
}

function updateRecentTransactions() {
  const transactions = storage.getRecentTransactions(10);
  const container = document.getElementById('recentTransactions');
  container.innerHTML = '';

  if (transactions.length === 0) {
    container.innerHTML = '<p>No transactions yet. Start adding data!</p>';
    return;
  }

  transactions.forEach(t => {
    const div = document.createElement('div');
    div.className = 'transaction-item';
    const date = new Date(t.date).toLocaleDateString();
    const type = t.customer ? 'Sale' : 'Expense';
    div.innerHTML = `<strong>${type}</strong> - $${t.amount.toFixed(2)} (${date})`;
    container.appendChild(div);
  });
}

// Inventory Management
function handleAddItem(e) {
  e.preventDefault();
  const item = {
    name: document.getElementById('itemName').value,
    sku: document.getElementById('itemSKU').value,
    stock: parseInt(document.getElementById('itemStock').value),
    minStock: parseInt(document.getElementById('itemMinStock').value),
    price: parseFloat(document.getElementById('itemPrice').value)
  };

  storage.addInventoryItem(item);
  showToast('Item added successfully!');
  e.target.reset();
  document.getElementById('addItemModal').classList.remove('active');
  updateInventoryTable();
}

function updateInventoryTable() {
  const items = storage.getInventoryItems();
  const tbody = document.getElementById('inventoryTable');
  tbody.innerHTML = '';

  items.forEach(item => {
    const row = tbody.insertRow();
    const isLow = item.stock <= item.minStock;
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.sku}</td>
      <td style="${isLow ? 'color:red;font-weight:bold' : ''}">${item.stock}</td>
      <td>${item.minStock}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><button class="btn btn-danger" onclick="deleteItem('${item.id}')">Delete</button></td>
    `;
  });
}

function deleteItem(id) {
  if (confirm('Delete this item?')) {
    storage.deleteInventoryItem(id);
    showToast('Item deleted');
    updateInventoryTable();
  }
}

// Expenses
function handleAddExpense(e) {
  e.preventDefault();
  const expense = {
    description: document.getElementById('expenseDesc').value,
    type: document.getElementById('expenseType').value,
    category: document.getElementById('expenseCategory').value,
    amount: parseFloat(document.getElementById('expenseAmount').value)
  };

  storage.addExpense(expense);
  showToast('Expense logged!');
  e.target.reset();
  document.getElementById('addExpenseModal').classList.remove('active');
  updateExpensesTable();
  refreshDashboard();
}

function updateExpensesTable() {
  const expenses = storage.getExpenses();
  const tbody = document.getElementById('expensesTable');
  tbody.innerHTML = '';

  expenses.forEach(exp => {
    const row = tbody.insertRow();
    const date = new Date(exp.date).toLocaleDateString();
    row.innerHTML = `
      <td>${date}</td>
      <td>${exp.description}</td>
      <td>${exp.category}</td>
      <td>$${exp.amount.toFixed(2)}</td>
      <td><span style="padding:4px 8px;border-radius:4px;${exp.type === 'expense' ? 'background:#fee2e2' : 'background:#d1fae5'}">${exp.type}</span></td>
      <td><button class="btn btn-danger" onclick="deleteExpense('${exp.id}')">Delete</button></td>
    `;
  });
}

function deleteExpense(id) {
  if (confirm('Delete this expense?')) {
    storage.deleteExpense(id);
    showToast('Expense deleted');
    updateExpensesTable();
    refreshDashboard();
  }
}

// Sales
function handleAddSale(e) {
  e.preventDefault();
  const sale = {
    customer: document.getElementById('customerName').value || 'Walk-in',
    amount: parseFloat(document.getElementById('saleAmount').value),
    paymentMethod: document.getElementById('paymentMethod').value,
    items: document.getElementById('saleItems').value
  };

  storage.addSale(sale);
  showToast('Sale recorded!');
  e.target.reset();
  document.getElementById('addSaleModal').classList.remove('active');
  updateSalesTable();
  refreshDashboard();
}

function updateSalesTable() {
  const sales = storage.getSales();
  const tbody = document.getElementById('salesTable');
  tbody.innerHTML = '';

  sales.forEach(sale => {
    const row = tbody.insertRow();
    const date = new Date(sale.date).toLocaleDateString();
    row.innerHTML = `
      <td>${date}</td>
      <td>${sale.customer}</td>
      <td>$${sale.amount.toFixed(2)}</td>
      <td>${sale.paymentMethod}</td>
      <td>${sale.items || '-'}</td>
      <td><button class="btn btn-danger" onclick="deleteSale('${sale.id}')">Delete</button></td>
    `;
  });
}

function deleteSale(id) {
  if (confirm('Delete this sale?')) {
    storage.deleteSale(id);
    showToast('Sale deleted');
    updateSalesTable();
    refreshDashboard();
  }
}

// Reports
function updateReports() {
  const period = document.getElementById('reportPeriod').value;
  document.getElementById('topProducts').innerHTML = '<p>Profit trends and top products will display here.</p>';
}

// Reminders
function updateReminders() {
  const lowStockItems = storage.getLowStockItems();
  const lowDiv = document.getElementById('lowStockReminders');
  lowDiv.innerHTML = '';

  if (lowStockItems.length === 0) {
    lowDiv.innerHTML = '<p>No low stock items. Good inventory levels!</p>';
  } else {
    lowStockItems.forEach(item => {
      const div = document.createElement('div');
      div.style.padding = '10px';
      div.style.margin = '5px 0';
      div.style.background = '#fee2e2';
      div.style.borderLeft = '4px solid #ef4444';
      div.innerHTML = `<strong>${item.name}</strong><br>Stock: ${item.stock} (Min: ${item.minStock})`;
      lowDiv.appendChild(div);
    });
  }

  const expenses = storage.getExpenses();
  const insights = document.getElementById('spendingInsights');
  if (expenses.length === 0) {
    insights.innerHTML = '<p>No spending data yet. Add expenses to see insights.</p>';
  } else {
    const totalExpense = expenses.reduce((s, e) => s + (e.type === 'expense' ? e.amount : 0), 0);
    const div = document.createElement('div');
    div.style.padding = '10px';
    div.innerHTML = `<strong>Total Spending:</strong> $${totalExpense.toFixed(2)}<br><strong>Entries:</strong> ${expenses.length}`;
    insights.appendChild(div);
  }
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
