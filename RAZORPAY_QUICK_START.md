# 🚀 Razorpay Quick Setup (5 Minutes)

## For Testing/Demo Mode

### 1️⃣ Create Account

- Go to [razorpay.com](https://razorpay.com) → Sign Up
- Verify email and mobile number
- Skip business details for now

### 2️⃣ Get Test API Keys

- Login: [dashboard.razorpay.com](https://dashboard.razorpay.com)
- Ensure **Test Mode** toggle is ON (top-right)
- Go to: **Settings** → **API Keys**
- Click **"Generate Test Key"** (if not already shown)
- Copy the **Key ID** (starts with `rzp_test_`)

### 3️⃣ Configure Application

```bash
# Open config file
cd /Users/yashpal/Documents/Project/bcoe_sports
open js/razorpay-config.js
```

**Replace this:**

```javascript
test: {
  keyId: 'rzp_test_XXXXXXXXXXXXXX',  // ← REPLACE
```

**With your actual key:**

```javascript
test: {
  keyId: 'rzp_test_9Hx8K7pL6mN5oP',  // ← YOUR TEST KEY
```

**Ensure mode is test:**

```javascript
mode: 'test',  // ✅ Keep this
```

**Save file** (Cmd+S)

### 4️⃣ Test Payment

- Open `index.html` in browser
- Complete registration form
- Click **"Pay Now"**
- Use test card:
  ```
  Card: 4111 1111 1111 1111
  CVV:  123
  Date: 12/25
  Name: Test User
  ```
- ✅ Receipt auto-downloads!

---

## Test Cards Reference

| Purpose       | Card Number         | Result           |
| ------------- | ------------------- | ---------------- |
| ✅ Success    | 4111 1111 1111 1111 | Payment succeeds |
| ❌ Fail       | 4000 0000 0000 0002 | Payment fails    |
| 💳 Visa       | 4012 8888 8888 1881 | Success (Visa)   |
| 💳 Mastercard | 5555 5555 5555 4444 | Success (MC)     |

**All test cards:**

- CVV: Any 3 digits (e.g., 123)
- Expiry: Any future date (e.g., 12/25)
- Name: Anything

---

## For Production (Real Money)

### Complete KYC First

1. **Dashboard** → **Settings** → **Account & Settings**
2. Upload:
   - PAN Card
   - Bank account details
   - Business proof (college registration)
3. Wait 24-48 hours for approval

### Get Live Keys

1. Switch to **Live Mode** (dashboard toggle)
2. **Settings** → **API Keys** → **Generate Live Key**
3. Copy **Live Key ID** (starts with `rzp_live_`)

### Update Config

```javascript
live: {
  keyId: 'rzp_live_YOUR_ACTUAL_KEY',  // ← Add live key
},
mode: 'live',  // ← Change to 'live'
```

### Deploy

- ⚠️ Must use HTTPS (not localhost)
- Remove Test Mode badge from UI
- Test with small real transaction
- Monitor settlements (T+2 days)

---

## 🆘 Troubleshooting

| Problem                   | Solution                                      |
| ------------------------- | --------------------------------------------- |
| "Razorpay is not defined" | Check internet, verify SDK script loaded      |
| Test card fails           | Ensure Test Mode is ON in dashboard           |
| No receipt downloads      | Check browser download settings, allow popups |
| Live key not working      | Verify KYC approved, use HTTPS                |

---

## 📞 Support

- **Razorpay Docs**: [razorpay.com/docs](https://razorpay.com/docs)
- **Support Email**: support@razorpay.com
- **Test Cards**: [razorpay.com/docs/payments/payments/test-card-details](https://razorpay.com/docs/payments/payments/test-card-details)

---

## ✅ Checklist

**For Demo/Testing:**

- [ ] Razorpay account created
- [ ] Test Key ID copied
- [ ] `js/razorpay-config.js` updated
- [ ] Mode set to 'test'
- [ ] Test payment completed successfully
- [ ] Receipt downloaded

**For Production:**

- [ ] KYC completed and approved
- [ ] Bank account activated
- [ ] Live Key ID obtained
- [ ] Config updated with live key
- [ ] Mode changed to 'live'
- [ ] Deployed to HTTPS server
- [ ] Test payment with real card successful

---

**Setup Time**: ⏱️ 5-10 minutes  
**Difficulty**: ⭐⭐☆☆☆ Easy  
**Status**: ✅ Ready to use!
