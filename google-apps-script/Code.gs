/**
 * College Sports Event Registration - Google Apps Script (Single-Sport with Payment)
 *
 * Handles single-sport registration form submissions with payment tracking
 * and stores them in Google Sheets with transaction details.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Create a new Google Sheet or use existing one
 * 2. Open Extensions > Apps Script
 * 3. Paste this code into Code.gs
 * 4. Click Deploy > New deployment (or Manage deployments to update)
 * 5. Select "Web app" as deployment type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web App URL
 */

/**
 * Handles incoming POST requests from the registration form
 * @param {Object} e - Event object containing POST data
 * @returns {TextOutput} JSON response
 */
function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);

    Logger.log("Received registration data: " + JSON.stringify(data));

    // Validate required fields
    if (!validateData(data)) {
      return formatResponse(false, "Invalid data format");
    }

    // Append data to sheet
    const result = appendToSheet(data);

    if (result.success) {
      return formatResponse(true, "Registration saved successfully!");
    } else {
      return formatResponse(false, result.message);
    }
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return formatResponse(false, "Server error: " + error.toString());
  }
}

/**
 * Validates incoming registration data
 * @param {Object} data - Registration data
 * @returns {boolean} True if valid
 */
function validateData(data) {
  // Check required fields for single-sport registration with Razorpay payment
  const required = [
    "sportName",
    "category",
    "gender",
    "gameType",
    "entryFee",
    "paymentStatus",
    "razorpayPaymentId",
    "teamName",
    "contact",
  ];

  for (let field of required) {
    if (!data[field]) {
      Logger.log("Missing required field: " + field);
      return false;
    }
  }

  // Validate players array
  if (!Array.isArray(data.players) || data.players.length === 0) {
    Logger.log("Invalid players array");
    return false;
  }

  return true;
}

/**
 * Appends registration data to the Google Sheet
 * @param {Object} data - Registration data
 * @returns {Object} Result object with success status
 */
function appendToSheet(data) {
  try {
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Registrations");

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet("Registrations");

      // Add headers for single-sport with Razorpay payment
      const headers = [
        "Timestamp",
        "Sport Name",
        "Indoor / Outdoor",
        "Gender",
        "Game Type",
        "Entry Fee",
        "Payment Status",
        "Razorpay Payment ID",
        "Payment Amount",
        "Receipt ID",
        "Team Name",
        "Player Names",
        "Captain Name",
        "Vice-Captain Name",
        "Contact Number",
      ];

      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format header row
      sheet
        .getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0A1929")
        .setFontColor("#FFFFFF")
        .setHorizontalAlignment("center");

      // Freeze header row
      sheet.setFrozenRows(1);
    }

    // Prepare row data
    const timestamp = new Date();
    const sportName = data.sportName || "";
    const category =
      (data.category || "N/A").charAt(0).toUpperCase() +
      (data.category || "N/A").slice(1);
    const gender = (data.gender || "N/A").toUpperCase();
    const gameType = data.gameType || "N/A";
    const entryFee = data.entryFee || 0;
    const paymentStatus = data.paymentStatus || "Pending";
    const razorpayPaymentId = data.razorpayPaymentId || "N/A";
    const paymentAmount = data.paymentAmount || data.entryFee || 0;
    const receiptId = data.receiptId || "N/A";
    const teamName = data.teamName || "";
    const playerNames =
      data.playersString ||
      (Array.isArray(data.players) ? data.players.join(", ") : "");
    const captain = data.captain || "N/A";
    const viceCaptain = data.viceCaptain || "N/A";
    const contact = data.contact || "";

    // Create row array
    const rowData = [
      timestamp,
      sportName,
      category,
      gender,
      gameType,
      entryFee,
      paymentStatus,
      razorpayPaymentId,
      paymentAmount,
      receiptId,
      teamName,
      playerNames,
      captain,
      viceCaptain,
      contact,
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Format the new row
    const lastRow = sheet.getLastRow();

    // Format entry fee column as currency
    sheet.getRange(lastRow, 6).setNumberFormat("₹#,##0");

    // Color code payment status
    const statusCell = sheet.getRange(lastRow, 7);
    if (paymentStatus === "Paid") {
      statusCell.setBackground("#D4EDDA").setFontColor("#155724");
    } else {
      statusCell.setBackground("#F8D7DA").setFontColor("#721C24");
    }

    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 15);

    // Add alternating row colors for readability
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, 15).setBackground("#F8F9FA");
    }

    Logger.log(
      "Successfully added registration for: " +
        sportName +
        " (₹" +
        entryFee +
        ") - Razorpay ID: " +
        razorpayPaymentId,
    );

    return {
      success: true,
      message: "Data saved successfully",
    };
  } catch (error) {
    Logger.log("Error in appendToSheet: " + error.toString());
    return {
      success: false,
      message: error.toString(),
    };
  }
}

/**
 * Formats the response as JSON
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @returns {TextOutput} JSON response
 */
function formatResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
  };

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * Test function to verify script works with payment data
 * Can be run from Apps Script editor
 */
function testScript() {
  const testData = {
    sportName: "Football",
    category: "outdoor",
    gender: "boys",
    gameType: "team",
    entryFee: 200,
    paymentStatus: "Paid",
    transactionId: "UPI123456789",
    teamName: "Warriors FC",
    players: [
      "Player 1",
      "Player 2",
      "Player 3",
      "Player 4",
      "Player 5",
      "Player 6",
      "Player 7",
      "Player 8",
      "Player 9",
      "Player 10",
      "Player 11",
    ],
    playersString:
      "Player 1, Player 2, Player 3, Player 4, Player 5, Player 6, Player 7, Player 8, Player 9, Player 10, Player 11",
    captain: "Player 1",
    viceCaptain: "Player 2",
    contact: "9876543210",
  };

  const result = appendToSheet(testData);
  Logger.log(result);
}

/**
 * Get registration statistics
 * Can be called from menu or triggers
 */
function getStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Registrations");

  if (!sheet) {
    Logger.log("No registrations yet");
    return;
  }

  const lastRow = sheet.getLastRow();
  const totalRegistrations = lastRow - 1; // Exclude header

  if (totalRegistrations === 0) {
    Logger.log("No registrations yet");
    return;
  }

  // Get payment data
  const paymentRange = sheet.getRange(2, 6, lastRow - 1, 2).getValues(); // Fee and Status

  let totalRevenue = 0;
  let paidCount = 0;
  let pendingCount = 0;

  paymentRange.forEach((row) => {
    const fee = row[0] || 0;
    const status = row[1] || "Pending";

    if (status === "Paid") {
      totalRevenue += fee;
      paidCount++;
    } else {
      pendingCount++;
    }
  });

  Logger.log("Total Registrations: " + totalRegistrations);
  Logger.log("Paid Registrations: " + paidCount);
  Logger.log("Pending Registrations: " + pendingCount);
  Logger.log("Total Revenue (Paid): ₹" + totalRevenue);
  Logger.log(
    "Pending Revenue: ₹" +
      paymentRange.reduce(
        (sum, row) => sum + (row[1] !== "Paid" ? row[0] : 0),
        0,
      ),
  );

  return {
    totalRegistrations: totalRegistrations,
    paidCount: paidCount,
    pendingCount: pendingCount,
    totalRevenue: totalRevenue,
  };
}
