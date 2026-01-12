// MyBizTracker - Vanilla JavaScript with Lucide Icons (No React JSX needed)
const React = window.React;
const ReactDOM = window.ReactDOM;

// Storage Manager Class
class StorageManager {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    const defaultData = {
      inventory: [],
      expenses: [],
      sales: [],
      settings: { currency: '$', theme: 'light', language: 'en' }
    };
    if (!localStorage.getItem('myBizTrackerData')) {
      localStorage.setItem('myBizTrackerData', JSON.stringify(defaultData));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem('myBizTrackerData') || '{}');
  }

  saveData(data) {
    localStorage.setItem('myBizTrackerData', JSON.stringify(data));
  }

  addInventoryItem(item) {
    const data = this.getData();
    item.id = Date.now().toString();
    item.dateAdded = new Date().toISOString();
    data.inventory.push(item);
    this.saveData(data);
    return item;
  }

  getInventoryItems() {
    const data = this.getData();
    return data.inventory || [];
  }

  deleteInventoryItem(id) {
    const data = this.getData();
    data.inventory = data.inventory.filter(item => item.id !== id);
    this.saveData(data);
  }

  addExpense(expense) {
    const data = this.getData();
    expense.id = Date.now().toString();
    expense.date = expense.date || new Date().toISOString();
    data.expenses.push(expense);
    this.saveData(data);
    return expense;
  }

  getExpenses(filterType = null) {
    const data = this.getData();
    let expenses = data.expenses || [];
    if (filterType) expenses = expenses.filter(exp => exp.type === filterType);
    return expenses;
  }

  deleteExpense(id) {
    const data = this.getData();
    data.expenses = data.expenses.filter(exp => exp.id !== id);
    this.saveData(data);
  }

  addSale(sale) {
    const data = this.getData();
    sale.id = Date.now().toString();
    sale.date = sale.date || new Date().toISOString();
    data.sales.push(sale);
    this.saveData(data);
    return sale;
  }

  getSales() {
    const data = this.getData();
    return data.sales || [];
  }

  deleteSale(id) {
    const data = this.getData();
    data.sales = data.sales.filter(sale => sale.id !== id);
    this.saveData(data);
  }

  getTotalRevenue() {
    const sales = this.getSales();
    return sales.reduce((total, sale) => total + parseFloat(sale.amount || 0), 0);
  }

  getTotalExpenses() {
    const expenses = this.getExpenses('expense');
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount || 0), 0);
  }

  getNetProfit() {
    return this.getTotalRevenue() - this.getTotalExpenses();
  }

  getLowStockItems() {
    const inventory = this.getInventoryItems();
    return inventory.filter(item => item.stock <= item.minStock);
  }
}

const storage = new StorageManager();

// Utility function to create Lucide icons
function createIcon(iconName) {
  const root = document.createElement('div');
  root.innerHTML = `<svg class="lucide-icon" width="20" height="20"></svg>`;
  
  // Map icon names to Lucide icon representations
  const icons = {
    'Dashboard': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    'Inventory': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><path d="M9 2v4M15 2v4M6 8h12"></path></svg>',
    'Expenses': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>',
    'Sales': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    'Reports': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="3" y2="21"></line><line x1="21" y1="21" x2="3" y2="21"></line><polyline points="3 18 5 16 7 18 9 14 11 18 13 13 15 18 17 14 19 18 21 16"></polyline></svg>',
    'Reminders': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
    'Menu': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    'Moon': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    'Sun': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    'Plus': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    'Trash': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
    'Settings': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m4.24-4.24l4.24-4.24"></path></svg>'
  };
  
  if (icons[iconName]) {
    root.innerHTML = icons[iconName];
  }
  return root.firstChild;
}

// Initialize App
function initApp() {
  renderApp();
  attachEventListeners();
}

function renderApp() {
  const root = document.getElementById('root');
  const metrics = {
    revenue: storage.getTotalRevenue(),
    expenses: storage.getTotalExpenses(),
    profit: storage.getNetProfit(),
    items: storage.getInventoryItems().length
  };

  root.innerHTML = `
    <div class="app-container">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span>MyBizTracker</span>
          </div>
        </div>
        <nav class="nav-menu">
          <ul>
            <li><a href="#" data-tab="dashboard" class="nav-item active">Dashboard</a></li>
            <li><a href="#" data-tab="inventory" class="nav-item">Inventory</a></li>
            <li><a href="#" data-tab="expenses" class="nav-item">Expenses</a></li>
            <li><a href="#" data-tab="sales" class="nav-item">Sales</a></li>
            <li><a href="#" data-tab="reports" class="nav-item">Reports</a></li>
            <li><a href="#" data-tab="reminders" class="nav-item">Reminders</a></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <header class="app-header">
          <h1>MyBizTracker - Business Management</h1>
        </header>
        <div class="tab-content">
          <div class="dashboard-grid">
            <div class="card stat-card">
              <h3>Total Revenue</h3>
              <p class="stat-value">$${metrics.revenue.toFixed(2)}</p>
            </div>
            <div class="card stat-card">
              <h3>Total Expenses</h3>
              <p class="stat-value">$${metrics.expenses.toFixed(2)}</p>
            </div>
            <div class="card stat-card">
              <h3>Net Profit</h3>
              <p class="stat-value">$${metrics.profit.toFixed(2)}</p>
            </div>
            <div class="card stat-card">
              <h3>Total Items</h3>
              <p class="stat-value">${metrics.items}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

function attachEventListeners() {
  const navItems = document.querySelectorAll('[data-tab]');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      // Tab switching logic would go here
    });
  });
}

// Run app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
