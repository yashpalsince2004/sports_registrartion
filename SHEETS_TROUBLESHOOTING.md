# 🐛 Google Sheets Not Updating - Troubleshooting Guide

## Issue: Receipt generates but Google Sheets doesn't update

Based on your Chess registration receipt, the payment and receipt are working perfectly, but data isn't reaching Google Sheets.

---

## Quick Diagnostics

### Step 1: Check Browser Console

1. **Open your registration page**
2. **Open Browser Console**:
   - Chrome: `Cmd + Option + J` (Mac) or `F12` (Windows)
   - Look for errors after submitting

3. **Look for these messages**:
   ```
   ✅ Good: "Data sent to Google Sheets successfully"
   ❌ Bad: Any error mentioning "fetch", "CORS", or "script.google.com"
   ```

### Step 2: Verify Apps Script Deployment

1. **Open your Google Sheet**
2. **Extensions → Apps Script**
3. **Click "Deploy" → "Manage deployments"**

4. **Check these settings**:
   - ✅ Type: "Web app"
   - ✅ Execute as: "Me (your email)"
   - ✅ Who has access: **"Anyone"** ← CRITICAL!

5. **If "Who has access" is NOT "Anyone"**:
   - Click ✏️ Edit
   - Change to "Anyone"
   - Click "Deploy"
   - Copy new URL
   - Update in `js/googleSheetsIntegration.js`

---

## Common Fixes

### Fix 1: Apps Script Permissions

**Issue**: Apps Script not accepting requests

**Solution**:

1. Open Apps Script editor
2. Run → "doPost" (may ask for permissions)
3. Grant all permissions
4. Redeploy Web App

### Fix 2: Wrong Web App URL

**Issue**: Old or incorrect URL

**Current URL in code**:

```
https://script.google.com/macros/s/AKfycbys17SZDDAgl2ZSk04Cb2N2GjTLNN7e8w33QCrBoaBw_xa6qH1R01Wq-kC9FG0jD7ay/exec
```

**Verify**:

1. Apps Script → Deploy → Manage deployments
2. Copy **exact** Web App URL
3. Ensure it matches in `js/googleSheetsIntegration.js`

### Fix 3: Check Apps Script Logs

1. **Open Apps Script editor**
2. **View → Executions**
3. **Look for recent executions**:
   - ✅ Should see executions when you submit
   - ❌ If no executions = request not reaching script
   - 🔴 If error executions = check error message

---

## Manual Test

I've created a test file for you. It should have opened in your browser.

**Test Steps**:

1. Click "Send Test Data" button
2. Wait 3 seconds
3. **Check your Google Sheet**:
   - Look for a new "Chess" sheet
   - Should have one test row

**If test works**: Frontend code issue  
**If test fails**: Apps Script deployment issue

---

## Check Your Code Flow

### Current Submission Flow:

```javascript
// In app.js around line 800-830
function submitRegistration() {
  // 1. Prepare data
  const registrationData = prepareRegistrationData();

  // 2. Send to Google Sheets
  const result = await sendToGoogleSheets(registrationData);

  // 3. Show success
  showSuccessModal();
}
```

**Debug Points**:

1. Add `console.log(registrationData)` before sending
2. Check if `sendToGoogleSheets()` is called
3. Check response from Google Sheets

---

## Add Debug Logging

**Temporary Debug Code**:

Add this to your `js/app.js` around line 800:

```javascript
async function submitRegistration() {
  console.log("🔍 Starting submission...");

  const registrationData = prepareRegistrationData();
  console.log("📦 Registration Data:", registrationData);

  const result = await sendToGoogleSheets(registrationData);
  console.log("📊 Google Sheets Result:", result);

  // Rest of code...
}
```

Then check console to see where it fails.

---

## Most Likely Issue

Based on the symptom (receipt works, sheets don't), the most common cause is:

### **Apps Script "Who has access" is NOT set to "Anyone"**

**Fix**:

1. Apps Script → Deploy → Manage deployments
2. Click ✏️ on active deployment
3. **Who has access**: Change to **"Anyone"**
4. Click "Update"
5. Try submitting again

---

## Verify Data Structure

Make sure your Apps Script expects the right data. Check if these match:

**Frontend sends** (`app.js`):

- sportName
- category
- gender
- gameType
- entryFee
- paymentStatus
- razorpayPaymentId
- receiptId
- teamName
- players
- captain
- viceCaptain
- contact

**Backend expects** (`Code.gs` validateData):
Same fields ✅

---

## Test with Simple Data

Try this in browser console while on your registration page:

```javascript
// Test data send
const testData = {
  sportName: "Chess",
  category: "indoor",
  gender: "boys",
  gameType: "individual",
  entryFee: 50,
  paymentStatus: "Success",
  razorpayPaymentId: "pay_manual_test",
  paymentAmount: 50,
  receiptId: "REC-manual-test",
  teamName: "Manual Test",
  players: ["Test Player"],
  playersString: "Test Player",
  captain: "N/A",
  viceCaptain: "N/A",
  contact: "9999999999",
};

sendToGoogleSheets(testData).then((result) => {
  console.log("Result:", result);
});
```

Check Google Sheet for "Chess" sheet with this data.

---

## Next Steps

1. ✅ Check "Who has access" = "Anyone" in Apps Script
2. ✅ Check Apps Script executions log
3. ✅ Try the test HTML file I created
4. ✅ Check browser console for errors
5. ✅ Verify Web App URL is correct

**Let me know what you find and I can help further!**

---

**Screenshot Analysis**:
Your Chess receipt shows:

- Sport: Chess ✅
- Payment: Successful ✅
- Receipt ID: REC-1770105582178-VGP6N8 ✅

So payment and receipt generation are working perfectly. The issue is purely with the Google Sheets connection.
