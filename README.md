# 🏆 BCOE Sports Event Registration System

A professional web application for college sports event registration with Razorpay payment integration and automatic receipt generation.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://yashpalsince2004.github.io/sports_registrartion/)
[![Razorpay](https://img.shields.io/badge/Payment-Razorpay-blue)](https://razorpay.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🌟 Features

### ✨ Core Features

- **Multi-Sport Registration**: Support for 18+ sports (Football, Cricket, Basketball, Chess, etc.)
- **Gender Categories**: Boys, Girls, and Open categories
- **Team Management**: Individual and team sport support with captain/vice-captain selection
- **Step-by-Step Flow**: 4-step registration process with progress indicator
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

### 💳 Payment Integration

- **Razorpay Gateway**: Secure payment processing
- **Test Mode**: Safe demonstration without real money
- **Multiple Payment Methods**: UPI, Cards, Net Banking, Wallets
- **Transparent Pricing**: Fixed entry fees (₹50 - ₹250)
- **Organizer Absorbs Charges**: No hidden costs for participants

### 📄 Automatic Receipt Generation

- **PDF Receipts**: Auto-generated professional receipts using jsPDF
- **Instant Download**: Receipts download immediately after payment
- **Comprehensive Details**: Includes all registration and payment information
- **Unique Receipt ID**: Trackable receipt identifier for each transaction
- **College Branding**: Features Student Council logo and college name

### 📊 Data Management

- **Google Sheets Integration**: All registrations stored automatically
- **Real-time Logging**: Payment status, receipt ID, and participant details
- **Export Capability**: Easy data export for event management
- **Receipt Tracking**: Links each registration to its receipt

---

## 🚀 Live Demo

**Website**: [https://yashpalsince2004.github.io/sports_registrartion/](https://yashpalsince2004.github.io/sports_registrartion/)

### Test the Payment Flow:

1. Select any sport and enter details
2. Use test card: `4111 1111 1111 1111`
3. CVV: `123`, Expiry: Any future date
4. Receipt downloads automatically!

---

## 📸 Screenshots

### Homepage

Clean, modern interface with sport cards and filter options.

### Payment Integration

Razorpay checkout with Test Mode indicator and automatic receipt generation.

### Auto-Generated Receipt

Professional PDF receipt with college branding and complete transaction details.

---

## 🛠️ Technology Stack

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and gradients
- **JavaScript (ES6+)**: Vanilla JS for logic
- **jsPDF**: PDF receipt generation

### Payment

- **Razorpay Checkout SDK**: Payment gateway integration
- **Test Mode**: Development-safe payment testing

### Backend/Data

- **Google Apps Script**: Serverless backend
- **Google Sheets API**: Data persistence

### Assets

- **Student Council Logo**: College branding integration

---

## 📦 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/yashpalsince2004/sports_registrartion.git
cd sports_registrartion
```

### 2. Configure Razorpay

```bash
# Copy template
cp js/razorpay-config.example.js js/razorpay-config.js

# Edit and add your API keys
nano js/razorpay-config.js
```

Get your Razorpay keys:

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get Test API keys from dashboard
3. See `RAZORPAY_SETUP.md` for detailed instructions

### 3. Configure Google Sheets

1. Create a Google Sheet
2. Open `google-apps-script/Code.gs`
3. Copy to Apps Script Editor (Extensions → Apps Script)
4. Deploy as Web App
5. Copy deployment URL to `js/googleSheetsIntegration.js`

See `GOOGLE_SHEETS_SETUP.md` for step-by-step guide.

### 4. Open Application

```bash
# Simply open in browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📖 Documentation

| Document                                                     | Description                         |
| ------------------------------------------------------------ | ----------------------------------- |
| [`RAZORPAY_SETUP.md`](RAZORPAY_SETUP.md)                     | Complete Razorpay integration guide |
| [`RAZORPAY_QUICK_START.md`](RAZORPAY_QUICK_START.md)         | 5-minute quick setup                |
| [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md)           | Google Sheets backend setup         |
| [`GITHUB_PUSH_INSTRUCTIONS.md`](GITHUB_PUSH_INSTRUCTIONS.md) | Git deployment guide                |

---

## 🎯 Project Structure

```
sports_registrartion/
├── index.html                      # Main application
├── README.md                       # This file
├── .gitignore                      # Git ignore rules
│
├── assets/
│   ├── logo.png                    # Student Council logo
│   └── logo.svg                    # Logo (SVG format)
│
├── css/
│   └── styles.css                  # All styling (2700+ lines)
│
├── js/
│   ├── app.js                      # Main application logic
│   ├── sportsData.js               # Sports configuration
│   ├── formHandler.js              # Form validation
│   ├── receiptGenerator.js         # PDF receipt generation
│   ├── googleSheetsIntegration.js  # Sheets API integration
│   ├── storage.js                  # Local storage utilities
│   ├── razorpay-config.example.js  # Config template
│   └── razorpay-config.js          # Actual config (gitignored)
│
├── google-apps-script/
│   └── Code.gs                     # Backend Apps Script
│
└── docs/
    ├── RAZORPAY_SETUP.md
    ├── RAZORPAY_QUICK_START.md
    ├── GOOGLE_SHEETS_SETUP.md
    └── GITHUB_PUSH_INSTRUCTIONS.md
```

---

## 🧪 Testing

### Test Mode Payment

The application runs in **Test Mode** by default.

**Test Card Details:**

```
Card Number: 4111 1111 1111 1111
CVV:         123
Expiry:      Any future date (e.g., 12/25)
Name:        Test User
```

**Test Scenarios:**

- ✅ Successful Payment: Use card above
- ❌ Failed Payment: Use `4000 0000 0000 0002`
- 🔄 Cancel Payment: Press ESC in Razorpay modal

---

## 🎓 Academic Context

This project was developed for:

- **Institution**: Bharat College of Engineering
- **Organizer**: Student Council
- **Purpose**: Streamline sports event registrations with automated payment and documentation
- **Use Case**: College annual sports event management

### Key Achievements

- ✅ Professional payment integration
- ✅ Automated receipt generation
- ✅ Complete audit trail (Google Sheets)
- ✅ Production-ready architecture
- ✅ Mobile-responsive design

---

## 🔐 Security

### Best Practices Implemented

- **API Key Protection**: `.gitignore` prevents key commits
- **Template Config**: `razorpay-config.example.js` for safe sharing
- **Frontend-only Secret**: Key Secret not used in browser
- **Test Mode Default**: Safe demonstration mode
- **HTTPS Required**: For live mode deployment

### For Production Use

1. Complete Razorpay KYC verification
2. Switch to Live API keys
3. Deploy to HTTPS server
4. Implement backend signature verification (optional)
5. Enable Razorpay webhooks (recommended)

---

## 🚀 Deployment

### GitHub Pages (Current)

Auto-deploys from `main` branch.
**URL**: https://yashpalsince2004.github.io/sports_registrartion/

### Alternative Hosting

- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google Cloud integration
- **Custom Server**: HTTPS required for live payments

---

## 📊 Features Breakdown

| Feature           | Status      | Description                         |
| ----------------- | ----------- | ----------------------------------- |
| Sport Selection   | ✅ Complete | 18+ sports with categories          |
| Player Details    | ✅ Complete | Dynamic forms based on sport type   |
| Payment Gateway   | ✅ Complete | Razorpay integration with test mode |
| Auto Receipts     | ✅ Complete | PDF generation with jsPDF           |
| Google Sheets     | ✅ Complete | Real-time data logging              |
| Mobile Responsive | ✅ Complete | Works on all devices                |
| Test Mode         | ✅ Complete | Safe demonstration                  |
| Live Mode         | ✅ Ready    | Switch config for production        |
| Email Receipts    | 🔄 Future   | Planned enhancement                 |
| Multi-language    | 🔄 Future   | Planned enhancement                 |

---

## 🤝 Contributing

While this is an academic project, suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Yashpal**

- GitHub: [@yashpalsince2004](https://github.com/yashpalsince2004)
- Project: BCOE Sports Registration System

---

## 🙏 Acknowledgments

- **Bharat College of Engineering** - For the opportunity
- **Student Council** - Project sponsor
- **Razorpay** - Payment gateway platform
- **Google Apps Script** - Backend infrastructure
- **jsPDF** - PDF generation library

---

## 📞 Support

For questions or issues:

1. Check documentation in `/docs` folder
2. Review `RAZORPAY_SETUP.md` for payment setup
3. See `GOOGLE_SHEETS_SETUP.md` for backend config
4. Open an issue on GitHub

---

## 📈 Project Stats

- **Total Lines of Code**: 7,500+
- **Files**: 18
- **Languages**: HTML, CSS, JavaScript
- **Libraries**: jsPDF, Razorpay SDK
- **Documentation**: 5 comprehensive guides

---

## 🔮 Future Enhancements

- [ ] Email receipt delivery
- [ ] Payment receipt regeneration
- [ ] Admin dashboard for organizers
- [ ] Export registrations as Excel
- [ ] SMS notifications for participants
- [ ] Multi-event support
- [ ] QR code on receipts for verification
- [ ] Participant history tracking

---

## ⚡ Quick Links

- 🌐 [Live Demo](https://yashpalsince2004.github.io/sports_registrartion/)
- 📚 [Razorpay Setup](RAZORPAY_SETUP.md)
- 📊 [Google Sheets Guide](GOOGLE_SHEETS_SETUP.md)
- 🔧 [Configuration Template](js/razorpay-config.example.js)

---

<div align="center">

**Made with ❤️ for BCOE Student Council**

⭐ Star this repo if you found it helpful!

</div>
