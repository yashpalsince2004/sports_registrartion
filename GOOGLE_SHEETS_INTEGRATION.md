# 📊 Google Sheets Integration - Quick Reference

## Example JavaScript fetch() Code

This is the actual implementation used in the project. The code is already integrated in `js/googleSheetsIntegration.js` and `js/formHandler.js`.

### Configuration (googleSheetsIntegration.js)

```javascript
const GOOGLE_SHEETS_CONFIG = {
  // Replace with your Web App URL after deployment
  webAppUrl: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
  enabled: true,
  useLocalStorageBackup: true,
};

/**
 * Sends registration data to Google Sheets
 */
async function sendToGoogleSheets(registrationData) {
  if (!GOOGLE_SHEETS_CONFIG.enabled) {
    return { success: false, message: "Integration disabled" };
  }

  if (GOOGLE_SHEETS_CONFIG.webAppUrl === "YOUR_WEB_APP_URL_HERE") {
    return { success: false, message: "Web App URL not configured" };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    return {
      success: true,
      message: "Registration sent to Google Sheets",
    };
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}
```

### Form Submission Handler (formHandler.js)

```javascript
async function handleFormSubmit(form, sport) {
  // ... form validation code ...

  const registration = {
    sportId: sport.id,
    sportName: sport.name,
    gender: sport.gender,
    category: sport.category,
    teamName: formData.get("teamName").trim(),
    players: players,
    captain: captainName,
    viceCaptain: viceCaptainName,
    contact: formData.get("contact"),
  };

  // Send to Google Sheets (async, fire and forget)
  if (typeof sendToGoogleSheets === "function") {
    sendToGoogleSheets(registration).catch((error) => {
      console.warn("Google Sheets submission failed:", error);
    });
  }

  // Save to LocalStorage as backup
  saveRegistration(registration);

  // Show success message
  showSuccessMessage(sport.name);
}
```

---

## Sample Data Structure

This is what gets sent to Google Sheets:

```json
{
  "sportId": "boys-football",
  "sportName": "Football",
  "gender": "boys",
  "category": "outdoor",
  "teamName": "Champions FC",
  "players": [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
    "Tom Brown",
    "Emily Davis",
    "Chris Wilson",
    "Anna Martinez",
    "David Garcia",
    "Lisa Rodriguez",
    "James Anderson"
  ],
  "captain": "John Doe",
  "viceCaptain": "Jane Smith",
  "contact": "9876543210"
}
```

---

## Google Sheets Column Mapping

| Google Sheet Column | Data Source               | Example Value             |
| ------------------- | ------------------------- | ------------------------- |
| Timestamp           | `new Date()`              | 2/2/2026 10:30:45 PM      |
| Gender              | `data.gender`             | boys                      |
| Game Type           | `data.category`           | outdoor                   |
| Sport Name          | `data.sportName`          | Football                  |
| Team Name           | `data.teamName`           | Champions FC              |
| Number of Players   | `data.players.length`     | 11                        |
| Player Names        | `data.players.join(', ')` | John Doe, Jane Smith, ... |
| Captain Name        | `data.captain`            | John Doe                  |
| Vice-Captain Name   | `data.viceCaptain`        | Jane Smith                |
| Contact Number      | `data.contact`            | 9876543210                |

---

## Apps Script Response Format

The Apps Script returns JSON responses:

### Success Response:

```json
{
  "success": true,
  "message": "Registration saved successfully!",
  "timestamp": "2026-02-02T17:00:45.123Z"
}
```

### Error Response:

```json
{
  "success": false,
  "message": "Error description here",
  "timestamp": "2026-02-02T17:00:45.123Z"
}
```

---

## CORS Handling

The integration uses `mode: 'no-cors'` to bypass CORS restrictions:

```javascript
fetch(url, {
  method: "POST",
  mode: "no-cors", // Critical for Google Apps Script
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

> **Note**: With `no-cors` mode, you cannot read the response body, but the request will succeed if the Apps Script is properly deployed.

---

## Testing the Integration

### Method 1: Browser Console Test

```javascript
// Open browser console and run:
testGoogleSheetsConnection();
```

### Method 2: Manual Test Data

```javascript
const testData = {
  sportId: "test-sport",
  sportName: "Test Sport",
  gender: "boys",
  category: "outdoor",
  teamName: "Test Team",
  players: ["Player 1", "Player 2"],
  captain: "Player 1",
  viceCaptain: "Player 2",
  contact: "1234567890",
};

sendToGoogleSheets(testData).then((result) => {
  console.log("Result:", result);
});
```

---

## Deployment Checklist

- [ ] Created Google Sheet
- [ ] Pasted Apps Script code in Code.gs
- [ ] Deployed as Web App with "Anyone" access
- [ ] Copied Web App deployment URL
- [ ] Updated `webAppUrl` in `googleSheetsIntegration.js`
- [ ] Tested with `testGoogleSheetsConnection()`
- [ ] Verified data appears in Google Sheet
- [ ] Confirmed timestamp is generated correctly

---

## Files Modified

| File                            | Purpose       | Changes Made                                           |
| ------------------------------- | ------------- | ------------------------------------------------------ |
| `index.html`                    | Main HTML     | Added script reference to `googleSheetsIntegration.js` |
| `js/googleSheetsIntegration.js` | **NEW**       | Configuration and fetch() implementation               |
| `js/formHandler.js`             | Form handling | Updated to call `sendToGoogleSheets()`                 |
| `google-apps-script/Code.gs`    | **NEW**       | Google Apps Script Web App handler                     |

---

## Next Steps After Setup

1. **Share the form**: Send the `index.html` file or host it on a web server
2. **Monitor submissions**: Check Google Sheet regularly for new registrations
3. **Export data**: Download as Excel/CSV when needed
4. **Add analytics**: Create charts in Google Sheets to visualize data

---

## Useful Apps Script Functions

### Get Total Registrations

```javascript
function getTotalRegistrations() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
  return sheet.getLastRow() - 1; // Subtract header row
}
```

### Clear All Data (Use with caution!)

```javascript
function clearAllRegistrations() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 10).clearContent();
}
```

---

## Support & Resources

- **Google Apps Script Documentation**: https://developers.google.com/apps-script
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Fetch API MDN**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

**Ready to collect registrations! 🎉**
