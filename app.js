// MyBizTracker - Main Application Logic

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const toast = document.getElementById('toast');

// Inventory Modal Elements
const addItemBtn = document.getElementById('addItemBtn');
const addItemModal = document.getElementById('addItemModal');
const addItemForm = document.getElementById('addItemForm');
const closeAddItem = document.getElementById('closeAddItem');

// Expense Modal Elements
const addExpenseBtn = document.getElementById('addExpenseBtn');
const addExpenseModal = document.getElementById('addExpenseModal');
const addExpenseForm = document.getElementById('addExpenseForm');
const closeAddExpense = document.getElementById('closeAddExpense');

// Sales Modal Elements
const addSaleBtn = document.getElementById('addSaleBtn');
const addSaleModal = document.getElementById('addSaleModal');
const addSaleForm = document.getElementById('addSaleForm');
const closeAddSale = document.getElementById('closeAddSale');

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

// Initialize App
function initApp() {
  loadTheme();
  setupNavigation();
  setupModals();
  setupForms();
  refreshDashboard();
  updateAllTables();
}

// Navigation Setup
function setupNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.dataset.tab;
      switchTab(tabName);
    });
  });
}

function switchTab(tabName) {
  // Remove active class from all tabs and nav items
  tabPanes.forEach(pane => pane.classList.remove('active'));
  navItems.forEach(item => item.classList.remove('active'));

  // Add active class to selected tab and nav item
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Refresh data when switching to tabs
  if (tabName === 'dashboard') refreshDashboard();
  else if (tabName === 'inventory') updateInventoryTable();
  else if (tabName === 'expenses') updateExpensesTable();
  else if (tabName === 'sales') updateSalesTable();
  else if (tabName === 'reports') updateReports();
  else if (tabName === 'reminders') updateReminders();
}

// Modal Setup
function setupModals() {
  // Inventory Modal
  addItemBtn.addEventListener('click', () => {
    addItemModal.classList.add('active');
  });
  closeAddItem.addEventListener('click', () => {
    addItemModal.classList.remove('active');
  });

  // Expense Modal
  addExpenseBtn.addEventListener('click', () => {
    addExpenseModal.classList.add('active');
  });
  closeAddExpense.addEventListener('click', () => {
    addExpenseModal.classList.remove('active');
  });

  // Sales Modal
  addSaleBtn.addEventListener('click', () => {
    addSaleModal.classList.add('active');
  });
  closeAddSale.addEventListener('click', () => {
    addSaleModal.classList.remove('active');
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === addItemModal) addItemModal.classList.remove('active');
    if (e.target === addExpenseModal) addExpenseModal.classList.remove('active');
    if (e.target === addSaleModal) addSaleModal.classList.remove('active');
  });
}

// Form Setup
function setupForms() {
  addItemForm.addEventListener('submit', handleAddItem);
  addExpenseForm.addEventListener('submit', handleAddExpense);
  addSaleForm.addEventListener('submit', handleAddSale);
}

// Handle Add Item
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
  
  addItemForm.reset();
  addItemModal.classList.remove('active');
  updateInventoryTable();
}

// Handle Add Expense
function handleAddExpense(e) {
  e.preventDefault();
  
  const expense = {
    description: document.getElementById('expenseDesc').value,
    type: document.getElementById('expenseType').value,
    category: document.getElementById('expenseCategory').value,
    amount: parseFloat(document.getElementById('expenseAmount').value)
  };

  storage.addExpense(expense);
  showToast('Expense logged successfully!');
  
  addExpenseForm.reset();
  addExpenseModal.classList.remove('active');
  updateExpensesTable();
  refreshDashboard();
}

// Handle Add Sale
function handleAddSale(e) {
  e.preventDefault();
  
  const sale = {
    customer: document.getElementById('customerName').value || 'Walk-in',
    amount: parseFloat(document.getElementById('saleAmount').value),
    paymentMethod: document.getElementById('paymentMethod').value,
    items: document.getElementById('saleItems').value
  };

  storage.addSale(sale);
  showToast('Sale recorded successfully!');
  
  addSaleForm.reset();
  addSaleModal.classList.remove('active');
  updateSalesTable();
  refreshDashboard();
}

// Dashboard Functions
function refreshDashboard() {
  const totalRevenue = storage.getTotalRevenue();
  const totalExpenses = storage.getTotalExpenses();
  const netProfit = storage.getNetProfit();
  const totalItems = storage.getInventoryItems().length;

  document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toFixed(2);
  document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toFixed(2);
  document.getElementById('netProfit').textContent = '$' + netProfit.toFixed(2);
  document.getElementById('totalItems').textContent = totalItems;

  updateRecentTransactions();
}

// Table Update Functions
function updateInventoryTable() {
  const items = storage.getInventoryItems();
  const tbody = document.getElementById('inventoryTable');
  tbody.innerHTML = '';

  items.forEach(item => {
    const tr = document.createElement('tr');
    const stockClass = item.stock <= item.minStock ? 'style="color: #ef4444;"' : '';
    
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.sku}</td>
      <td ${stockClass}>${item.stock}</td>
      <td>${item.minStock}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><button onclick="deleteInventoryItem('${item.id}')" class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateExpensesTable() {
  const expenses = storage.getExpenses();
  const tbody = document.getElementById('expensesTable');
  tbody.innerHTML = '';

  expenses.forEach(exp => {
    const tr = document.createElement('tr');
    const date = new Date(exp.date).toLocaleDateString();
    
    tr.innerHTML = `
      <td>${date}</td>
      <td>${exp.description}</td>
      <td>${exp.category}</td>
      <td>$${exp.amount.toFixed(2)}</td>
      <td><span style="padding: 4px 8px; border-radius: 4px; background: ${exp.type === 'expense' ? '#fee2e2' : '#d1fae5'};">${exp.type}</span></td>
      <td><button onclick="deleteExpense('${exp.id}')" class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateSalesTable() {
  const sales = storage.getSales();
  const tbody = document.getElementById('salesTable');
  tbody.innerHTML = '';

  sales.forEach(sale => {
    const tr = document.createElement('tr');
    const date = new Date(sale.date).toLocaleDateString();
    
    tr.innerHTML = `
      <td>${date}</td>
      <td>${sale.customer}</td>
      <td>$${sale.amount.toFixed(2)}</td>
      <td>${sale.paymentMethod}</td>
      <td>${sale.items || '-'}</td>
      <td><button onclick="deleteSale('${sale.id}')" class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateAllTables() {
  updateInventoryTable();
  updateExpensesTable();
  updateSalesTable();
}

// Delete Functions
function deleteInventoryItem(id) {
  if (confirm('Delete this item?')) {
    storage.deleteInventoryItem(id);
    showToast('Item deleted');
    updateInventoryTable();
  }
}

function deleteExpense(id) {
  if (confirm('Delete this expense?')) {
    storage.deleteExpense(id);
    showToast('Expense deleted');
    updateExpensesTable();
    refreshDashboard();
  }
}

function deleteSale(id) {
  if (confirm('Delete this sale?')) {
    storage.deleteSale(id);
    showToast('Sale deleted');
    updateSalesTable();
    refreshDashboard();
  }
}

// Reports and Reminders
function updateReports() {
  const topProducts = document.getElementById('topProducts');
  topProducts.innerHTML = '<p>Reports will show top-selling products and profit trends.</p>';
}

function updateReminders() {
  const lowStockItems = storage.getLowStockItems();
  const lowStockDiv = document.getElementById('lowStockReminders');
  lowStockDiv.innerHTML = '';

  if (lowStockItems.length === 0) {
    lowStockDiv.innerHTML = '<p>No low stock items. Good stock levels!</p>';
  } else {
    lowStockItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'reminder-item';
      div.innerHTML = `<strong>${item.name}</strong><br>Current: ${item.stock} | Min: ${item.minStock}`;
      lowStockDiv.appendChild(div);
    });
  }
}

function updateRecentTransactions() {
  const transactions = storage.getRecentTransactions(5);
  const container = document.getElementById('recentTransactions');
  container.innerHTML = '';

  if (transactions.length === 0) {
    container.innerHTML = '<p>No transactions yet. Start adding items to see activity.</p>';
    return;
  }

  transactions.forEach(trans => {
    const div = document.createElement('div');
    div.className = 'transaction-item';
    const date = new Date(trans.date).toLocaleDateString();
    const type = trans.customer ? 'Sale' : 'Expense';
    const amount = trans.amount || trans.amount;
    
    div.innerHTML = `
      <div>
        <strong>${type}</strong><br>
        <small>${date}</small>
      </div>
      <div><strong>$${amount.toFixed(2)}</strong></div>
    `;
    container.appendChild(div);
  });
}

// Theme Management
function loadTheme() {
  const theme = storage.getSettings().theme || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  storage.updateSettings({ theme: isDark ? 'dark' : 'light' });
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Toast Notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
