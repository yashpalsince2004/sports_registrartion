# Google Sheets Integration Setup Guide

## 📋 Overview

This guide will walk you through setting up Google Sheets integration for the BCOE Sports Event Registration System. After setup, all form submissions will be automatically saved to a Google Sheet in real-time.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `BCOE Sports Registrations`
4. The sheet will be created with a default tab called "Sheet1"

> **Note**: You don't need to add headers manually—the Apps Script will create them automatically on the first submission.

---

### Step 2: Open Google Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a new tab with a default `Code.gs` file
3. Delete any existing code in `Code.gs`

---

### Step 3: Paste the Apps Script Code

1. Open the file: [`google-apps-script/Code.gs`](file:///Users/yashpal/Documents/Project/bcoe_sports/google-apps-script/Code.gs)
2. Copy **all the code** from that file
3. Paste it into the `Code.gs` editor in Google Apps Script
4. Click the **💾 Save** button (or press `Cmd+S` / `Ctrl+S`)
5. Name your project: `BCOE Registration Handler`

---

### Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: `BCOE Registration API v1`
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**

   > ⚠️ **Important**: You MUST select "Anyone" to allow the form to submit data

5. Click **Deploy**
6. You may see a warning: **"This app isn't verified"**
   - Click **Advanced**
   - Click **Go to [Project Name] (unsafe)**
   - Review permissions and click **Allow**

7. After deployment, you'll see a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
8. **Copy this URL** — you'll need it in the next step!

---

### Step 5: Configure the Frontend

1. Open the file: [`js/googleSheetsIntegration.js`](file:///Users/yashpal/Documents/Project/bcoe_sports/js/googleSheetsIntegration.js)
2. Find this line:
   ```javascript
   webAppUrl: 'YOUR_WEB_APP_URL_HERE',
   ```
3. Replace `'YOUR_WEB_APP_URL_HERE'` with your actual Web App URL:
   ```javascript
   webAppUrl: 'https://script.google.com/macros/s/AKfycby.../exec',
   ```
4. Save the file

---

### Step 6: Test the Integration

#### Option 1: Use the Test Function (Recommended)

1. Go back to your Google Apps Script editor
2. In the toolbar, select **testScript** from the function dropdown
3. Click **▶ Run**
4. Check your Google Sheet — you should see a test registration appear!

#### Option 2: Submit a Real Form

1. Open [`index.html`](file:///Users/yashpal/Documents/Project/bcoe_sports/index.html) in your browser
2. Select any sport and fill out the registration form
3. Submit the form
4. Check your Google Sheet — the data should appear within seconds!

#### Option 3: Use Browser Console Test

1. Open [`index.html`](file:///Users/yashpal/Documents/Project/bcoe_sports/index.html) in your browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Type: `testGoogleSheetsConnection()` and press Enter
5. Check your Google Sheet for test data

---

## 📊 Google Sheet Structure

After the first submission, your sheet will automatically have these columns:

| Column                | Description                    | Example                   |
| --------------------- | ------------------------------ | ------------------------- |
| **Timestamp**         | Auto-generated submission time | 2/2/2026 10:30:45 PM      |
| **Gender**            | Boys or Girls                  | Boys                      |
| **Game Type**         | Indoor or Outdoor              | Outdoor                   |
| **Sport Name**        | Name of the sport              | Football                  |
| **Team Name**         | Team or participant name       | Champions FC              |
| **Number of Players** | Count of players               | 11                        |
| **Player Names**      | Comma-separated list           | John Doe, Jane Smith, ... |
| **Captain Name**      | Selected captain (team games)  | John Doe                  |
| **Vice-Captain Name** | Selected vice-captain          | Jane Smith                |
| **Contact Number**    | 10-digit phone number          | 9876543210                |

---

## 🔧 Configuration Options

Edit `js/googleSheetsIntegration.js` to customize:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  webAppUrl: "YOUR_WEB_APP_URL", // Your deployed Web App URL
  enabled: true, // Set to false to disable integration
  useLocalStorageBackup: true, // Keep localStorage as backup
};
```

### Options:

- **enabled**: Set to `false` to temporarily disable Google Sheets integration
- **useLocalStorageBackup**: When `true`, data is saved to both Google Sheets AND localStorage

---

## 🛠️ Troubleshooting

### Issue: "Web App URL not configured" in console

**Solution**: Make sure you replaced `'YOUR_WEB_APP_URL_HERE'` with your actual deployment URL in `googleSheetsIntegration.js`

---

### Issue: Data not appearing in sheet

**Possible causes**:

1. Wrong Web App URL → Re-check the URL in `googleSheetsIntegration.js`
2. Deployment settings incorrect → Make sure "Who has access" is set to **Anyone**
3. Script not saved → Save the Apps Script and re-deploy

**Debug steps**:

1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Submit a form and check for error messages
4. Run `testGoogleSheetsConnection()` in console

---

### Issue: "This app isn't verified" warning

**Solution**: This is normal for personal scripts. Click **Advanced** → **Go to [Project] (unsafe)** → **Allow**

This warning appears because Google hasn't verified your custom script, but it's safe since you wrote it yourself.

---

### Issue: Need to update the script after deployment

**Solution**:

1. Make changes in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click **✏️ Edit** on your existing deployment
4. Change the version to **New version**
5. Click **Deploy**

The Web App URL will remain the same, so you don't need to update your frontend code.

---

## 📱 Testing Checklist

- [ ] Google Sheet created
- [ ] Apps Script code pasted and saved
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL added to `googleSheetsIntegration.js`
- [ ] Test function runs successfully
- [ ] First form submission appears in sheet
- [ ] Timestamp is correctly generated
- [ ] All fields are populated correctly

---

## 🔒 Security Notes

### Is this secure?

✅ **Yes!** Here's why:

1. **No sensitive data**: The form only collects names and phone numbers
2. **Public by design**: The form is meant to be accessible to all students
3. **Google's infrastructure**: Data is stored securely in Google Sheets
4. **No authentication needed**: Students don't need Google accounts to register

### Access Control

- The Web App is set to "Anyone" access (required for public forms)
- Only you (the sheet owner) can view/edit the Google Sheet
- You control who can access the Sheet by adjusting sharing settings

---

## 📈 Viewing Your Data

### In Google Sheets:

1. Open your Google Sheet
2. All registrations appear in real-time
3. Use built-in features:
   - Sort by timestamp, sport, gender, etc.
   - Filter by game type
   - Create charts and analytics
   - Export to CSV/Excel

### Export Options:

- **File** → **Download** → **Microsoft Excel (.xlsx)**
- **File** → **Download** → **Comma-separated values (.csv)**
- **File** → **Download** → **PDF document**

---

## 🎯 Advanced Features

### Adding Email Notifications

Add this function to `Code.gs` to get email notifications on each registration:

```javascript
function sendEmailNotification(data) {
  const recipient = "your-email@example.com";
  const subject = `New Registration: ${data.sportName}`;
  const body = `
    Team: ${data.teamName}
    Sport: ${data.sportName}
    Players: ${data.players.join(", ")}
    Contact: ${data.contact}
  `;

  MailApp.sendEmail(recipient, subject, body);
}
```

Then add this line in the `appendToSheet` function after successful save:

```javascript
sendEmailNotification(data);
```

---

## 💡 Additional Tips

1. **Backup Your Sheet**: Google Sheets auto-saves, but you can also make copies
2. **Multiple Sheets**: Create separate tabs for different sports/categories
3. **Data Validation**: Apps Script can add custom validation rules
4. **Analytics Dashboard**: Use Google Data Studio to visualize registrations

---

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all steps in this guide were completed
3. Run the test function in Apps Script editor
4. Check the Apps Script execution logs: **Executions** tab in Apps Script

---

## ✅ Success!

Once everything is working:

- ✅ Form submissions automatically save to Google Sheets
- ✅ Data is timestamped automatically
- ✅ LocalStorage backup ensures no data loss
- ✅ You can access and export data anytime

**Your registration system is now fully cloud-connected! 🎉**

---

## 📁 File Reference

- Google Apps Script: [`google-apps-script/Code.gs`](file:///Users/yashpal/Documents/Project/bcoe_sports/google-apps-script/Code.gs)
- Integration Config: [`js/googleSheetsIntegration.js`](file:///Users/yashpal/Documents/Project/bcoe_sports/js/googleSheetsIntegration.js)
- Form Handler: [`js/formHandler.js`](file:///Users/yashpal/Documents/Project/bcoe_sports/js/formHandler.js)
- Main HTML: [`index.html`](file:///Users/yashpal/Documents/Project/bcoe_sports/index.html)
