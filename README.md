# MyBizTracker 📊

## A Comprehensive Business Management App for SMEs and Traders

MyBizTracker is a lightweight, user-friendly business management application designed specifically for small business owners and traders in emerging markets. It provides essential tools for inventory management, expense tracking, sales recording, and business insights - all accessible from a single dashboard.

## ✨ Features

### Basic Mode
- **Inventory Management**: Track stock levels with automatic low-stock alerts
- **Expense & Income Tracking**: Log daily expenses and income with categorization
- **Sales Recording**: Record sales quickly with cash, eWallet, or credit payment options
- **Dashboard Analytics**: Real-time profit and loss summaries
- **Dark Mode**: Eye-friendly dark theme for extended use

### Premium Mode (Coming Soon)
- **Reports & Insights**: Visual charts on profit trends and popular products
- **Export Reports**: Export data to PDF, Word, or share via WhatsApp/SMS/Email
- **Advanced Inventory**: Barcode scanning and voice input for item addition
- **Smart Reminders**: Alerts for low stock, unpaid debts, and upcoming expenses
- **AI-Powered Tips**: Spending pattern analysis and business advice
- **Multi-Language Support**: Local language and voice command support

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Re-EL123/MyBizTracker.git
   cd MyBizTracker
   ```

2. **Open in browser**
   - Simply open `index.html` in a modern web browser
   - No installation or server setup required!

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Minimum 2MB storage for data
- No internet connection required (except for optional cloud sync)

## 📖 Usage

### Dashboard
- View real-time financial metrics
- See recent transactions at a glance
- Monitor total revenue, expenses, and net profit

### Managing Inventory
1. Click "Inventory" in the sidebar
2. Click "+ Add Item"
3. Enter item details (name, SKU, stock level, minimum stock threshold, price)
4. Low stock items automatically appear in the reminders section

### Tracking Expenses
1. Navigate to "Expenses" section
2. Click "+ Add Expense"
3. Specify description, type (expense/income), category, and amount
4. Categories include: Rent, Supplies, Wages, Utilities, Other

### Recording Sales
1. Go to "Sales" section
2. Click "+ Record Sale"
3. Enter customer name, amount, payment method, and items sold
4. Supports multiple payment methods (Cash, eWallet, Credit)

### Viewing Reports
- Access "Reports" for visual insights on profit trends
- Check "Reminders" for low stock alerts and spending patterns

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Lucide Icons (CDN)
- **Storage**: Browser LocalStorage API
- **Styling**: Custom CSS with CSS Variables for theming
- **Responsive**: Mobile-first design approach

## 📁 File Structure

```
MyBizTracker/
├── index.html       # Main HTML file with UI structure
├── styles.css       # Comprehensive styling with responsive design
├── storage.js       # localStorage management and CRUD operations
├── app.js          # Application logic and event handlers
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## 💾 Data Storage

Currently, MyBizTracker uses **Browser LocalStorage** for data persistence:
- Data stored locally in your browser
- No cloud sync by default
- Data persists across browser sessions
- Maximum storage: ~5-10MB depending on browser

### Future: Supabase Integration
Planned integration with Supabase for:
- Cloud backup and synchronization
- Multi-device access
- Advanced analytics
- Team collaboration features

## 🎨 Customization

The app uses CSS variables for easy theme customization. Edit these in `styles.css`:

```css
:root {
  --primary-color: #10b981;      /* Main brand color */
  --secondary-color: #6366f1;    /* Secondary accent */
  --danger-color: #ef4444;       /* Warning/delete color */
  --dark-bg: #1f2937;            /* Dark theme background */
  --light-bg: #f9fafb;           /* Light theme background */
}
```

## 🔒 Privacy & Security

- All data remains on your device
- No external servers or cloud access (unless Supabase is enabled)
- No personal data collection
- Open-source for transparency

## 🐛 Known Limitations

- Currently single-user (one user per browser)
- No automatic backups (export functionality coming soon)
- Basic reporting features (advanced analytics in premium version)
- No barcode scanner integration yet

## 🚀 Future Roadmap

- [ ] Supabase backend integration
- [ ] User authentication
- [ ] Multi-user support with roles
- [ ] Advanced reporting and analytics
- [ ] Barcode/QR code scanning
- [ ] Voice input and multilingual support
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Automated invoice generation
- [ ] Tax calculation assistance

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-source and available under the MIT License.

## 💬 Support

If you encounter issues or have suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots or error messages

## 👨‍💻 Author

**Akani Shibiri**
- GitHub: [@Re-EL123](https://github.com/Re-EL123)
- Full-stack developer and tech enthusiast

## 🙏 Acknowledgments

- Lucide Icons for beautiful icon set
- Open-source community for inspiration
- Local businesses for feature requirements

---

**MyBizTracker** - Empowering Small Business Owners with Intelligent Business Management Tools

Made with ❤️ for entrepreneurs and traders worldwide
