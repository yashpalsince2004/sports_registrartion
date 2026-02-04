# 🎓 BCOE Sports Event Registration System

> **Note**: This is a template/demonstration project. Configure with your own API keys and credentials before use.

A professional web application for college sports event registration with Razorpay payment integration and automatic receipt generation.

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ⚠️ Setup Required

This is a **template project**. Before using:

1. **Get Razorpay API Keys**: Create account at [razorpay.com](https://razorpay.com)
2. **Set up Google Sheets**: Deploy the Apps Script as Web App
3. **Configure API Keys**: Update `js/razorpay-config.js` and `js/googleSheetsIntegration.js`

See detailed setup guides in the documentation folder.

---

## 🌟 Features

### Core Features

- **Multi-Sport Registration**: Support for 18+ sports (Football, Cricket, Basketball, Chess, etc.)
- **Gender Categories**: Boys, Girls, and Open categories
- **Team Management**: Individual and team sports with captain/vice-captain selection
- **Step-by-Step Flow**: 4-step registration process with progress indicator
- **Mobile Responsive**: Works seamlessly on all devices

### Payment Integration

- **Razorpay Gateway**: Secure payment processing
- **Test Mode**: Safe demonstration without real money
- **Multiple Payment Methods**: UPI, Cards, Net Banking, Wallets
- **Transparent Pricing**: Fixed entry fees (₹50 - ₹250)

### Auto Receipt Generation

- **PDF Receipts**: Auto-generated professional receipts using jsPDF
- **Instant Download**: Receipts download immediately after payment
- **Comprehensive Details**: Includes all registration and payment information
- **Unique Receipt ID**: Trackable receipt identifier

### Data Management

- **Google Sheets Integration**: All registrations stored automatically
- **Sport-Specific Sheets**: Each sport gets its own sheet
- **Real-time Logging**: Payment status, receipt ID, participant details
- **Color-Coded Headers**: Each sport has unique color

---

## 🛠️ Technology Stack

- **HTML5/CSS3/JavaScript**: Frontend
- **Razorpay SDK**: Payment gateway
- **jsPDF**: PDF receipt generation
- **Google Apps Script**: Backend/data storage

---

## 📦 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yashpalsince2004/sports_registrartion.git
cd sports_registrartion
```

### 2. Configure Razorpay

```bash
# Edit configuration
nano js/razorpay-config.js

# Add your test key:
keyId: 'rzp_test_YOUR_KEY_HERE'
```

### 3. Configure Google Sheets

```bash
# Edit configuration
nano js/googleSheetsIntegration.js

# Add your Web App URL:
webAppUrl: 'YOUR_APPS_SCRIPT_URL_HERE'
```

### 4. Open Application

```bash
open index.html
```

---

## 📖 Documentation

| Document                                               | Description                         |
| ------------------------------------------------------ | ----------------------------------- |
| [`RAZORPAY_SETUP.md`](RAZORPAY_SETUP.md)               | Complete Razorpay integration guide |
| [`RAZORPAY_QUICK_START.md`](RAZORPAY_QUICK_START.md)   | 5-minute quick setup                |
| [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md)     | Google Sheets backend setup         |
| [`SPORT_SPECIFIC_SHEETS.md`](SPORT_SPECIFIC_SHEETS.md) | Sport-specific sheets feature       |

---

## 🧪 Testing

### Test Mode (No Real Money)

```
Test Card: 4111 1111 1111 1111
CVV:       123
Expiry:    Any future date
```

---

## 📁 Project Structure

```
sports_registrartion/
├── index.html                      # Main application
├── css/styles.css                  # Styling
├── js/
│   ├── app.js                      # Main logic
│   ├── sportsData.js               # Sports configuration
│   ├── razorpay-config.js          # Razorpay setup (configure this!)
│   ├── googleSheetsIntegration.js  # Sheets integration (configure this!)
│   ├── receiptGenerator.js         # PDF receipt generation
│   └── ...
├── google-apps-script/
│   └── Code.gs                     # Backend Apps Script
└── docs/
    └── *.md                        # Documentation
```

---

## ⚙️ Configuration Files

### Required Setup

1. **`js/razorpay-config.js`**
   - Add your Razorpay API key
   - Set mode: 'test' or 'live'

2. **`js/googleSheetsIntegration.js`**
   - Add your Google Apps Script Web App URL
   - Deploy Code.gs as Web App first

---

## 🔒 Security Notes

- API keys are gitignored (`.gitignore`)
- Template files provided for safe sharing
- Never commit real API keys
- Use test mode for development
- HTTPS required for live payments

---

## 📊 Features

| Feature           | Status      |
| ----------------- | ----------- |
| Sport Selection   | ✅ Complete |
| Player Details    | ✅ Complete |
| Payment Gateway   | ✅ Complete |
| Auto Receipts     | ✅ Complete |
| Google Sheets     | ✅ Complete |
| Mobile Responsive | ✅ Complete |
| Test Mode         | ✅ Complete |

---

## 🎓 Educational Use

This project demonstrates:

- Payment gateway integration
- Automated document generation
- Serverless backend with Apps Script
- Modern web development practices
- Professional UI/UX design

Perfect for:

- College projects
- Learning payment integration
- Understanding frontend-backend flow
- Event management systems

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

Built as a demonstration of modern web development techniques including:

- Payment gateway integration (Razorpay)
- PDF generation (jsPDF)
- Serverless backend (Google Apps Script)
- Responsive design
- Professional UI/UX

---

## 📞 Support

- **Documentation**: Check the `/docs` folder
- **Setup Issues**: See `RAZORPAY_SETUP.md` and `GOOGLE_SHEETS_SETUP.md`
- **GitHub Issues**: Feel free to open issues for bugs or questions

---

## ⚡ Quick Links

- 📚 [Setup Guide](RAZORPAY_SETUP.md)
- 🚀 [Quick Start](RAZORPAY_QUICK_START.md)
- 📊 [Google Sheets Guide](GOOGLE_SHEETS_SETUP.md)
- 🔧 [Sport-Specific Sheets](SPORT_SPECIFIC_SHEETS.md)

---

<div align="center">

**Template Project - Configure Before Use**

⭐ Star this repo if you found it helpful!

</div>
