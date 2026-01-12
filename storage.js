// LocalStorage Management for MyBizTracker

class StorageManager {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    const defaultData = {
      inventory: [],
      expenses: [],
      sales: [],
      settings: {
        currency: '$',
        theme: 'light',
        language: 'en'
      }
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

  // Inventory Methods
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

  updateInventoryItem(id, updates) {
    const data = this.getData();
    const index = data.inventory.findIndex(item => item.id === id);
    if (index !== -1) {
      data.inventory[index] = { ...data.inventory[index], ...updates };
      this.saveData(data);
    }
  }

  deleteInventoryItem(id) {
    const data = this.getData();
    data.inventory = data.inventory.filter(item => item.id !== id);
    this.saveData(data);
  }

  // Expense Methods
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
    if (filterType) {
      expenses = expenses.filter(exp => exp.type === filterType);
    }
    return expenses;
  }

  getExpensesByCategory(category) {
    const expenses = this.getExpenses();
    return expenses.filter(exp => exp.category === category);
  }

  deleteExpense(id) {
    const data = this.getData();
    data.expenses = data.expenses.filter(exp => exp.id !== id);
    this.saveData(data);
  }

  // Sales Methods
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

  // Analytics Methods
  getTotalRevenue() {
    const sales = this.getSales();
    return sales.reduce((total, sale) => total + parseFloat(sale.amount || 0), 0);
  }

  getTotalExpenses() {
    const expenses = this.getExpenses('expense');
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount || 0), 0);
  }

  getTotalIncome() {
    const expenses = this.getExpenses('income');
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount || 0), 0);
  }

  getNetProfit() {
    return this.getTotalRevenue() + this.getTotalIncome() - this.getTotalExpenses();
  }

  getLowStockItems() {
    const inventory = this.getInventoryItems();
    return inventory.filter(item => item.stock <= item.minStock);
  }

  getRecentTransactions(limit = 10) {
    const sales = this.getSales();
    const expenses = this.getExpenses();
    const all = [...sales, ...expenses].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ).slice(0, limit);
    return all;
  }

  // Settings Methods
  getSettings() {
    const data = this.getData();
    return data.settings || {};
  }

  updateSettings(settings) {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.saveData(data);
  }

  // Export Data
  exportData() {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  // Import Data
  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // Clear All Data
  clearAllData() {
    if (confirm('Are you sure? This will delete all data permanently.')) {
      localStorage.removeItem('myBizTrackerData');
      this.initializeStorage();
      return true;
    }
    return false;
  }
}

// Initialize global storage manager
const storage = new StorageManager();
