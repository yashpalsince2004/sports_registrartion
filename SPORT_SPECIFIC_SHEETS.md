# 📊 Sport-Specific Sheets Feature

## Overview

The Google Sheets integration has been updated to **automatically create separate sheets for each sport**. Instead of one "Registrations" sheet with all sports mixed together, each sport now gets its own dedicated sheet.

---

## How It Works

### Automatic Sheet Creation

When a registration is submitted, the system:

1. Checks if a sheet exists for that sport (e.g., "Cricket", "Football")
2. If the sheet doesn't exist, **creates it automatically**
3. Adds proper headers with sport-specific color coding
4. Saves the registration data to that sport's sheet

### Example Structure

Your Google Spreadsheet will have multiple sheets:

```
📊 BCOE Sports Registration.xlsx
├── Cricket (Blue header)
├── Football (Green header)
├── Basketball (Orange header)
├── Volleyball (Brown header)
├── Badminton (Purple header)
├── Table Tennis (Red header)
└── ... (more sheets as sports are registered)
```

---

## Sheet Structure

### Headers (14 columns per sport)

Each sport sheet has these columns:

1. **Timestamp** - Registration date and time
2. **Category** - Indoor/Outdoor
3. **Gender** - BOYS/GIRLS/OPEN
4. **Game Type** - Individual/Team
5. **Entry Fee** - Amount (₹)
6. **Payment Status** - Success/Failed/Pending
7. **Razorpay Payment ID** - Payment ID from Razorpay
8. **Payment Amount** - Amount paid (₹)
9. **Receipt ID** - Auto-generated receipt ID
10. **Team Name** - Team/participant name
11. **Player Names** - Comma-separated player list
12. **Captain Name** - Captain (for team sports)
13. **Vice-Captain Name** - Vice-captain (for team sports)
14. **Contact Number** - Contact number

> **Note**: "Sport Name" column is removed since the sheet name indicates the sport.

---

## Sport-Specific Colors

Each sport has a unique header color for easy identification:

| Sport          | Color     | Hex Code  |
| -------------- | --------- | --------- |
| Cricket        | Blue      | `#1e3a8a` |
| Football       | Green     | `#15803d` |
| Basketball     | Orange    | `#ea580c` |
| Volleyball     | Brown     | `#7c2d12` |
| Badminton      | Purple    | `#4c1d95` |
| Table Tennis   | Red       | `#be123c` |
| Tennis         | Cyan      | `#0e7490` |
| Hockey         | Dark Blue | `#1e40af` |
| Chess          | Gray      | `#374151` |
| Carrom         | Amber     | `#78350f` |
| Kabaddi        | Dark Red  | `#991b1b` |
| Kho Kho        | Rose      | `#9f1239` |
| Athletics      | Emerald   | `#065f46` |
| Swimming       | Blue      | `#1e40af` |
| Weight Lifting | Red       | `#991b1b` |
| Boxing         | Dark Red  | `#7f1d1d` |
| Wrestling      | Brown     | `#78350f` |
| Yoga           | Green     | `#059669` |

**Unknown sports** default to Navy (`#0A1929`).

---

## Benefits

### 1. **Better Organization**

- Each sport's data is separate and easy to find
- No mixing of different sports in one sheet
- Clear visual distinction with color-coded headers

### 2. **Easier Analysis**

- Quickly see how many registrations per sport
- Export individual sport data
- Share specific sport sheets with sport coordinators

### 3. **Automatic Management**

- No manual sheet creation needed
- System creates sheets on-the-fly
- Consistent formatting across all sheets

### 4. **Scalability**

- Supports unlimited sports
- Clean separation of concerns
- Easy to manage hundreds of registrations

---

## What Changed from Previous Version

### Before (Single Sheet)

```
Registrations Sheet:
- All sports in one sheet
- "Sport Name" column required
- Harder to filter/analyze
- More scrolling needed
```

### After (Sport-Specific Sheets)

```
Individual Sheets per Sport:
- Cricket sheet (only cricket data)
- Football sheet (only football data)
- Basketball sheet (only basketball data)
- Cleaner, more organized
- Easier to analyze per sport
```

---

## Deployment Instructions

### Update Your Google Apps Script

1. **Open Your Google Sheet**
   - Go to your existing BCOE Sports Registration sheet

2. **Open Apps Script Editor**
   - Extensions → Apps Script

3. **Replace Code**
   - Select all existing code in `Code.gs`
   - Delete it
   - Copy the NEW code from:
     `/Users/yashpal/Documents/Project/bcoe_sports/google-apps-script/Code.gs`
   - Paste into Apps Script editor

4. **Save**
   - Click Save (💾 icon)
   - Name: "BCOE Sports Registration"

5. **Deploy New Version**
   - Click **Deploy** → **Manage deployments**
   - Click ✏️ (Edit) on existing deployment
   - Under "Version": Select **"New version"**
   - Description: "Sport-specific sheets implementation"
   - Click **Deploy**

6. **Copy Deployment URL**
   - Copy the new Web App URL
   - Update in `js/googleSheetsIntegration.js` if needed

---

## Testing the New Feature

### Test Case 1: Cricket Registration

1. Complete registration for Cricket
2. Make payment
3. Submit form
4. **Check Google Sheet**:
   - New sheet "Cricket" created
   - Blue header
   - One row with cricket data

### Test Case 2: Football Registration

1. Complete registration for Football
2. Make payment
3. Submit form
4. **Check Google Sheet**:
   - New sheet "Football" created
   - Green header
   - One row with football data

### Test Case 3: Multiple Sports

1. Register for Cricket, Football, Basketball
2. **Check Google Sheet**:
   - Three separate sheets created
   - Each with own color
   - Data separated by sport

---

## Viewing Your Data

### Option 1: By Sport (Recommended)

- Click on any sport's sheet tab at bottom
- View all registrations for that sport only
- Headers color-coded for quick identification

### Option 2: Summary View (Manual)

You can create a summary sheet manually:

1. Add new sheet called "Summary"
2. Use formulas to count registrations:
   ```
   =COUNTA(Cricket!A:A)-1  // Cricket registrations
   =COUNTA(Football!A:A)-1  // Football registrations
   ```

### Option 3: Export Individual Sport

- Right-click on sport sheet tab
- "Copy to" → New spreadsheet
- Share with sport coordinator

---

## Frequently Asked Questions

### Q: What happens to existing data in "Registrations" sheet?

**A**: The new code won't touch it. It will create new sport-specific sheets. You can:

- Keep the old "Registrations" sheet for reference
- Delete it if no longer needed
- Archive it to another spreadsheet

### Q: Can I rename the sport sheets?

**A**: Not recommended. The system creates sheets based on exact sport names from your app. If you rename them, new registrations will create duplicate sheets.

### Q: What if I have a sport with a special character?

**A**: Google Sheets will handle it, but sheet names have some restrictions:

- No `:`, `?`, `*`, `[`, `]`, `/`, `\`
- Keep sports names simple (e.g., "Table Tennis" not "Table-Tennis!")

### Q: Can I customize the header colors?

**A**: Yes! Edit the `getSportColor()` function in Code.gs:

```javascript
const colors = {
  Cricket: "#1e3a8a", // Change this hex code
  Football: "#15803d",
  // ...
};
```

### Q: How do I delete a sport sheet?

**A**: Right-click the sheet tab → "Delete". But be careful—this deletes all data for that sport!

---

## Troubleshooting

### Issue: Sheet not created for my sport

**Cause**: Sport name might not match exactly.

**Solution**:

1. Check `js/sportsData.js` for exact sport name
2. Ensure `data.sportName` is sent correctly
3. Check Apps Script logs for errors

### Issue: Data going to wrong sheet

**Cause**: Sport name mismatch or typo.

**Solution**:

1. Verify `sportName` field in form data
2. Check JavaScript console during submission
3. Review Apps Script logs

### Issue: Can't see new sheets

**Cause**: Script failed to create sheet.

**Solution**:

1. Check Apps Script permissions
2. View Apps Script logs (View → Logs)
3. Ensure deployment is latest version

---

## Advanced: Data Validation

Want to add data validation per sport? You can modify the script:

```javascript
// In getSportSheet() function, add:
if (sportName === "Football") {
  // Validate that playerNames has 11 players
  sheet
    .getRange(2, 11, sheet.getMaxRows(), 1)
    .setDataValidation(/* your validation rule */);
}
```

---

## Summary

✅ **Automatic Sport-Specific Sheets**  
✅ **Color-Coded Headers**  
✅ **14 Columns per Sport**  
✅ **Clean Organization**  
✅ **Easy to Manage**

**Deployment**: Update Code.gs and redeploy Web App  
**Compatibility**: Works with all existing features (payment, receipts, etc.)  
**Benefit**: Much cleaner data organization per sport

---

**Last Updated**: February 3, 2026  
**Version**: 2.0 (Sport-Specific Sheets)
