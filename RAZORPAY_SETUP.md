# Razorpay Setup Guide for BCOE Sports Registration

Complete guide to set up Razorpay payment gateway for your College Sports Event Registration application.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating Razorpay Account](#creating-razorpay-account)
3. [Getting Test API Keys](#getting-test-api-keys)
4. [Configuring Application](#configuring-application)
5. [Testing Payment Integration](#testing-payment-integration)
6. [Going Live (Production)](#going-live-production)
7. [Troubleshooting](#troubleshooting)
8. [Important Notes](#important-notes)

---

## 📌 Prerequisites

Before starting, ensure you have:

- ✅ Valid email address
- ✅ Mobile number for OTP verification
- ✅ PAN card (for KYC - Live mode only)
- ✅ Bank account details (for Live mode only)
- ✅ GST number (optional, for businesses)
- ✅ Access to your project code

---

## 🎯 Creating Razorpay Account

### Step 1: Sign Up

1. **Visit Razorpay Website**
   - Go to [https://razorpay.com](https://razorpay.com)
   - Click **"Sign Up"** button (top-right corner)

2. **Choose Account Type**
   - Select **"For Developers"** or **"For Businesses"**
   - For educational projects: Choose "For Developers"

3. **Enter Details**
   - **Email**: Your valid email address
   - **Password**: Create a strong password (min 8 characters)
   - Click **"Create Account"**

4. **Verify Email**
   - Check your email inbox
   - Click verification link in Razorpay's email
   - Complete email verification

5. **Verify Mobile Number**
   - Enter your mobile number
   - Receive OTP via SMS
   - Enter OTP to verify

6. **Business Information** (Basic)
   - **Business Name**: `Bharat College of Engineering - Student Council`
   - **Business Type**: `Educational Institution` or `Others`
   - **Website**: Your college website or leave blank
   - Click **"Continue"**

### Step 2: Complete Dashboard Setup

1. **Login to Dashboard**
   - Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
   - Enter email and password

2. **Dashboard Tour**
   - Razorpay will show a quick tour
   - Click through to understand the interface
   - Skip if you prefer

---

## 🔑 Getting Test API Keys

> **Important**: Test Mode allows you to test payments **without real money**. Perfect for development and demonstration.

### Step 1: Ensure Test Mode is Active

1. **Check Mode Toggle**
   - Look at the top of the dashboard
   - You'll see a toggle: **Test Mode** | Live Mode
   - Ensure **"Test Mode"** is selected (should be blue/highlighted)

### Step 2: Generate Test API Keys

1. **Navigate to API Keys**
   - In the left sidebar, click **"Settings"** (gear icon)
   - Click **"API Keys"**
   - Or directly go to: `https://dashboard.razorpay.com/app/keys`

2. **Generate Test Key**
   - You'll see section: **"Test Mode"**
   - If keys already exist, you'll see them
   - If not, click **"Generate Test Key"**

3. **View and Copy Keys**

   You'll see two keys:

   **a) Key ID** (Public Key)

   ```
   Format: rzp_test_XXXXXXXXXXXXXXX
   Example: rzp_test_9Hx8K7pL6mN5oP
   ```

   - This key is **public** and used in frontend
   - Click **"Copy"** icon to copy

   **b) Key Secret** (Private Key)

   ```
   Format: XXXXXXXXXXXXXXXXXXXXXXXX
   Example: ABCdef123456XYZabc789
   ```

   - This key is **secret** and should never be exposed
   - Click **"Show"** to reveal
   - Click **"Copy"** to copy
   - ⚠️ **CRITICAL**: Never commit this to Git or share publicly

4. **Save Keys Securely**
   - Copy both keys to a secure location:
     - Password manager
     - Encrypted note
     - Secure `.env` file (not committed to Git)

---

## ⚙️ Configuring Application

### Step 1: Update Razorpay Config File

1. **Open Configuration File**

   ```bash
   # Navigate to your project
   cd /Users/yashpal/Documents/Project/bcoe_sports

   # Open razorpay-config.js
   open js/razorpay-config.js
   ```

2. **Locate Configuration Object**

   Find this section:

   ```javascript
   const RAZORPAY_CONFIG = {
     // Test Mode Keys (for development)
     test: {
       keyId: 'rzp_test_XXXXXXXXXXXXXX',      // ← REPLACE THIS
       keySecret: 'XXXXXXXXXXXXXXXXXXXXXX'     // ← Not used in frontend
     },

     // Live Mode Keys (for production)
     live: {
       keyId: 'rzp_live_XXXXXXXXXXXXXX',      // ← Add when going live
       keySecret: 'XXXXXXXXXXXXXXXXXXXXXX'
     },

     // Current mode
     mode: 'test', // 'test' or 'live'
   ```

3. **Replace Test Key ID**

   **Before:**

   ```javascript
   test: {
     keyId: 'rzp_test_XXXXXXXXXXXXXX',
   ```

   **After:**

   ```javascript
   test: {
     keyId: 'rzp_test_9Hx8K7pL6mN5oP',  // ← Your actual test key
   ```

4. **Ensure Mode is 'test'**

   ```javascript
   mode: 'test',  // ✅ Keep this for testing
   ```

5. **Save the File**
   - Press `Cmd + S` (Mac) or `Ctrl + S` (Windows)
   - Close the file

### Step 2: Verify Configuration

1. **Check Razorpay SDK is Loaded**

   Open `index.html` and verify:

   ```html
   <!-- Near the end of body -->
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   <script src="js/razorpay-config.js"></script>
   <script src="js/receiptGenerator.js"></script>
   <script src="js/app.js"></script>
   ```

2. **Verify Test Mode Badge**

   The payment step should show:

   ```html
   <span class="test-mode-badge">🧪 Test Mode</span>
   ```

---

## 🧪 Testing Payment Integration

### Step 1: Start the Application

1. **Open Application**

   ```bash
   # Open in browser
   open index.html
   ```

   Or use Live Server if available

2. **Complete Registration Form**
   - Select a sport (e.g., Football - ₹200)
   - Enter player details
   - Enter contact information
   - Proceed to payment step

### Step 2: Verify UI

1. **Check Payment Step**
   - ✅ See "🧪 Test Mode" badge
   - ✅ See sport details
   - ✅ See entry fee amount
   - ✅ See "Pay ₹X Now" button

### Step 3: Test Payment with Test Cards

Razorpay provides test cards that simulate different scenarios:

#### ✅ **Successful Payment Test Card**

```
Card Number:    4111 1111 1111 1111
CVV:            123
Expiry:         Any future date (e.g., 12/25)
Name:           Test User
```

**Steps:**

1. Click **"Pay ₹X Now"** button
2. Razorpay modal opens
3. Select **"Card"** tab
4. Enter test card details above
5. Click **"Pay"**
6. Payment succeeds ✅
7. Success message appears
8. Receipt PDF auto-downloads
9. "Next" button enabled

#### ❌ **Failed Payment Test Card**

```
Card Number:    4000 0000 0000 0002
CVV:            123
Expiry:         Any future date
Name:           Test User
```

This card **always fails** - useful for testing failure scenarios.

#### 🔄 **Other Test Scenarios**

**Cancel Payment:**

- Open payment modal
- Press `ESC` key or click `X`
- See failure message

**UPI Test (Test Mode):**

- Select UPI tab
- Use test UPI ID: `success@razorpay`
- Simulates successful UPI payment

**Net Banking Test:**

- Select Net Banking
- Choose any bank
- Login with any credentials (test mode accepts anything)

### Step 4: Verify Receipt Generation

After successful payment:

1. **Check Downloads Folder**

   ```
   ~/Downloads/BCOE_Receipt_REC-xxxxxxxxx-XXXXXX.pdf
   ```

2. **Open PDF and Verify:**
   - ✅ College name: "Bharat College of Engineering"
   - ✅ Organizer: "Student Council"
   - ✅ Sport details correct
   - ✅ Player names correct
   - ✅ Razorpay Payment ID present (starts with `pay_`)
   - ✅ Receipt ID present (starts with `REC-`)
   - ✅ Entry fee correct
   - ✅ "Test Mode" disclaimer visible

### Step 5: Verify Google Sheets

1. **Open Google Sheets**
   - Go to your registration sheet

2. **Check Latest Row**
   - ✅ Timestamp
   - ✅ Sport details
   - ✅ Payment Status: "Success"
   - ✅ Razorpay Payment ID (starts with `pay_`)
   - ✅ Receipt ID (starts with `REC-`)
   - ✅ All player information

### Step 6: Verify in Razorpay Dashboard

1. **Login to Dashboard**
   - Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
   - Ensure **Test Mode** is selected

2. **View Test Payments**
   - Click **"Transactions"** → **"Payments"**
   - See your test payment listed
   - Click on it to view details:
     - Amount
     - Payment ID
     - Method (Card/UPI/etc.)
     - Status: "Captured"

3. **Payment Details**
   - Click on any payment
   - See complete information:
     - Card last 4 digits (1111)
     - Notes (sport ID, name, etc.)
     - Customer details (if provided)

---

## 🚀 Going Live (Production)

> **⚠️ Important**: Only do this when you're ready to accept **real money** from participants.

### Step 1: Complete KYC Requirements

1. **Login to Razorpay Dashboard**

2. **Navigate to Account Settings**
   - Click **"Settings"** → **"Account & Settings"**

3. **Complete KYC**

   Required documents:
   - **PAN Card**: For business/organization verification
   - **Business Proof**: College registration, trust deed, etc.
   - **Bank Account**: For settlements
   - **Address Proof**: Utility bill, rent agreement

4. **Wait for Approval**
   - KYC review takes 24-48 hours
   - You'll receive email confirmation
   - Check dashboard for activation status

### Step 2: Activate Settlement Account

1. **Add Bank Account**
   - Settings → **"Bank Account Details"**
   - Enter:
     - Account Number
     - IFSC Code
     - Account Holder Name
     - Account Type (Savings/Current)

2. **Verify Account**
   - Razorpay will make a small test deposit
   - Verify the amount in dashboard
   - Account gets activated

### Step 3: Generate Live API Keys

1. **Switch to Live Mode**
   - Toggle at top: Test Mode → **Live Mode**

2. **Generate Live Keys**
   - Settings → **"API Keys"**
   - Click **"Generate Live Key"**
   - Confirm with password/OTP

3. **Copy Live Keys**
   ```
   Live Key ID:     rzp_live_XXXXXXXXXXXXXXX
   Live Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```

   - ⚠️ **CRITICAL**: Store these extremely securely
   - Never expose in frontend code
   - Never commit to Git

### Step 4: Update Application Configuration

1. **Open `js/razorpay-config.js`**

2. **Add Live Keys**

   ```javascript
   live: {
     keyId: 'rzp_live_YOUR_ACTUAL_LIVE_KEY_ID',  // ← Add here
     keySecret: 'KEEP_THIS_SECRET'
   },
   ```

3. **Switch Mode to Live**

   ```javascript
   mode: 'live',  // ← Change from 'test' to 'live'
   ```

4. **Save and Deploy**
   - Save file
   - Deploy to production server
   - **Never** run live mode on localhost

### Step 5: Update UI (Remove Test Badge)

Since you're going live, update the payment step:

**Option 1: Remove Test Badge**

```html
<!-- Remove or comment out -->
<!-- <span class="test-mode-badge">🧪 Test Mode</span> -->
```

**Option 2: Change Badge to Live**

```html
<span class="live-mode-badge">✅ Live Payment</span>
```

And add CSS:

```css
.live-mode-badge {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  /* Same styling as test badge but green */
}
```

### Step 6: Final Checks Before Going Live

- [ ] KYC approved and verified
- [ ] Bank account activated
- [ ] Live API keys generated and configured
- [ ] Mode switched to 'live'
- [ ] Application deployed to production server (not localhost)
- [ ] Test Mode badge removed/updated
- [ ] Test one payment with real card (small amount)
- [ ] Verify settlement in bank account (T+2 days)
- [ ] Google Sheets integration working
- [ ] Receipt generation working
- [ ] All team members aware of live mode

---

## 🔧 Troubleshooting

### Issue 1: "Payment gateway failed to load"

**Symptoms:**

- Razorpay button doesn't appear
- Console error: "Razorpay is not defined"

**Solutions:**

1. Check internet connection
2. Verify Razorpay SDK script tag in `index.html`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
3. Check browser console for loading errors
4. Try clearing browser cache (Cmd+Shift+R)

### Issue 2: "Payment system is not configured"

**Symptoms:**

- Alert message when clicking Pay button
- No Razorpay modal opens

**Solutions:**

1. Verify `razorpay-config.js` is loaded:
   ```html
   <script src="js/razorpay-config.js"></script>
   ```
2. Check Key ID is correctly set:
   ```javascript
   keyId: "rzp_test_XXXXXX"; // Should not be placeholder
   ```
3. Ensure mode is set to 'test' or 'live'
4. Check console for JavaScript errors

### Issue 3: Payment succeeds but no receipt

**Symptoms:**

- Payment shows success in Razorpay
- No PDF downloads
- Console error about jsPDF

**Solutions:**

1. Verify jsPDF library loaded:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
   ```
2. Check `receiptGenerator.js` is loaded
3. Allow downloads in browser settings
4. Disable popup blocker
5. Check browser console for errors

### Issue 4: Test card not working

**Symptoms:**

- Test card 4111... showing as invalid
- Payment fails in test mode

**Solutions:**

1. Ensure you're in **Test Mode** (check dashboard toggle)
2. Use exact test card: `4111 1111 1111 1111`
3. CVV can be any 3 digits (e.g., 123)
4. Expiry must be future date
5. Try different test card from Razorpay docs

### Issue 5: Live payments not working

**Symptoms:**

- Live mode payments fail
- Error: "API key error"

**Solutions:**

1. Verify KYC is approved (check dashboard)
2. Ensure live keys are correct (not test keys)
3. Check mode is set to 'live' in config
4. Verify application is on HTTPS (live mode requires SSL)
5. Check Razorpay dashboard for account restrictions

### Issue 6: Keys not working after regeneration

**Cause:**

- If you regenerate keys, old keys become invalid

**Solution:**

1. Always update `razorpay-config.js` with new keys
2. If multiple deployments, update all environments
3. Clear browser cache after updating

---

## 📝 Important Notes

### Security Best Practices

1. **Never Expose Key Secret**

   ```javascript
   // ❌ BAD - Don't use Key Secret in frontend
   keySecret: "actual_secret";

   // ✅ GOOD - Key Secret is for backend only
   keySecret: ""; // Leave empty in frontend
   ```

2. **Environment Variables (Recommended for Production)**

   ```javascript
   // Use environment variables instead of hardcoding
   const RAZORPAY_CONFIG = {
     test: {
       keyId: process.env.RAZORPAY_TEST_KEY_ID,
     },
     live: {
       keyId: process.env.RAZORPAY_LIVE_KEY_ID,
     },
   };
   ```

3. **Never Commit Keys to Git**

   ```bash
   # Add to .gitignore
   echo "js/razorpay-config.js" >> .gitignore

   # Or use environment-specific config files
   razorpay-config.production.js  # Gitignored
   razorpay-config.example.js     # Template in Git
   ```

### Razorpay Charges (India)

**Domestic Payments:**

- Credit Cards: 2% + GST
- Debit Cards: 2% + GST
- UPI: 2% + GST
- Net Banking: 2% + GST
- Wallets: 2% + GST

**GST:** 18% on transaction fee

**Example Calculation:**

```
Entry Fee: ₹250
Razorpay Fee: 2% of ₹250 = ₹5
GST (18%): 18% of ₹5 = ₹0.90
Total Deduction: ₹5.90

You Receive: ₹250 - ₹5.90 = ₹244.10
```

> **Note**: In your implementation, organizer absorbs this charge, so student still pays only ₹250.

### Settlement Timeline

- **Instant Settlement**: Available with approval (instant to bank)
- **Standard Settlement**: T+2 working days
  - Payment on Monday → Settlement on Wednesday
  - Payment on Friday → Settlement on Tuesday

### Webhook Setup (Advanced - Optional)

For production systems, set up webhooks:

1. **Dashboard → Settings → Webhooks**
2. **Add Webhook URL**: `https://your-domain.com/webhook`
3. **Select Events**:
   - payment.captured
   - payment.failed
4. **Use for**: Backend payment verification

### Test Mode Limitations

- ❌ No real money transactions
- ❌ Settlements don't happen
- ❌ Test payments don't show in live dashboard
- ✅ Perfect for development
- ✅ Perfect for demonstration
- ✅ Perfect for learning

### Going from Test to Live Checklist

- [ ] All features tested in test mode
- [ ] KYC completed and approved
- [ ] Live keys obtained
- [ ] Configuration updated with live keys
- [ ] Mode switched to 'live'
- [ ] Deployed to production server with HTTPS
- [ ] Test badge removed/updated
- [ ] Backup plan in case of issues
- [ ] Support email/contact set up
- [ ] Monitoring enabled

---

## 🆘 Support Resources

### Razorpay Documentation

- **Official Docs**: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- **API Reference**: [https://razorpay.com/docs/api/](https://razorpay.com/docs/api/)
- **Integration Guide**: [https://razorpay.com/docs/payment-gateway/web-integration/standard/](https://razorpay.com/docs/payment-gateway/web-integration/standard/)

### Razorpay Support

- **Email**: support@razorpay.com
- **Phone**: Check dashboard for support number
- **Live Chat**: Available in dashboard (Live Mode only)
- **Community**: [https://community.razorpay.com/](https://community.razorpay.com/)

### Test Resources

- **Test Cards**: [https://razorpay.com/docs/payments/payments/test-card-details/](https://razorpay.com/docs/payments/payments/test-card-details/)
- **Test UPI IDs**: success@razorpay, failure@razorpay
- **Postman Collection**: Available in Razorpay docs

---

## ✅ Quick Reference

### Test Mode Quick Start (5 Minutes)

```bash
1. Sign up at razorpay.com ✅
2. Go to Settings > API Keys ✅
3. Copy Test Key ID (rzp_test_XXX) ✅
4. Open js/razorpay-config.js ✅
5. Paste Key ID ✅
6. Save file ✅
7. Open index.html ✅
8. Test with card: 4111 1111 1111 1111 ✅
```

### Common Commands

```bash
# Open config file
open js/razorpay-config.js

# Check if Razorpay SDK loads
curl -I https://checkout.razorpay.com/v1/checkout.js

# View browser console for errors
# Chrome: Cmd+Option+J (Mac) or F12 (Windows)
```

### Key File Paths

```
/Users/yashpal/Documents/Project/bcoe_sports/
├── js/
│   ├── razorpay-config.js       ← API Keys here
│   ├── receiptGenerator.js      ← Receipt generation
│   └── app.js                   ← Payment handling
├── index.html                   ← Razorpay SDK loaded
└── google-apps-script/
    └── Code.gs                  ← Backend logging
```

---

## 🎯 Summary

**For Testing (Academic Project):**

1. Create Razorpay account
2. Get test API keys
3. Update `js/razorpay-config.js` with test Key ID
4. Keep mode as 'test'
5. Use test card: 4111 1111 1111 1111
6. Demonstrate complete workflow

**For Production (Real Events):**

1. Complete KYC verification
2. Add bank account
3. Get live API keys
4. Update config with live keys
5. Change mode to 'live'
6. Deploy to HTTPS server
7. Test with real card
8. Monitor settlements

---

**Setup Status**: ✅ Ready to Configure  
**Estimated Time**: 15-30 minutes  
**Difficulty**: ⭐⭐☆☆☆ (Easy)

The Razorpay integration is already coded in your application. You just need to get API keys and configure them!
