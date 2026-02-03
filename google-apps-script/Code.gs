/**
 * College Sports Event Registration - Google Apps Script (Sport-Specific Sheets)
 *
 * Handles sport registration form submissions with payment tracking.
 * Each sport gets its own dedicated sheet (e.g., Cricket, Football, Basketball).
 *
 * FEATURES:
 * - Automatically creates sport-specific sheets
 * - Separate registration tracking per sport
 * - Payment and receipt tracking
 * - Professional formatting and color coding
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

    // Append data to sport-specific sheet
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
 * Get or create sport-specific sheet
 * @param {string} sportName - Name of the sport
 * @returns {Sheet} Google Sheet object
 */
function getSportSheet(sportName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sportName);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sportName);

    // Add headers for sport-specific registration
    const headers = [
      "Timestamp",
      "Category",
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

    // Format header row with sport-specific color
    const headerColor = getSportColor(sportName);
    sheet
      .getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground(headerColor)
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center")
      .setFontSize(11);

    // Freeze header row
    sheet.setFrozenRows(1);

    Logger.log(`Created new sheet for sport: ${sportName}`);
  }

  return sheet;
}

/**
 * Get sport-specific header color
 * @param {string} sportName - Name of the sport
 * @returns {string} Hex color code
 */
function getSportColor(sportName) {
  const colors = {
    Cricket: "#1e3a8a", // Blue
    Football: "#15803d", // Green
    Basketball: "#ea580c", // Orange
    Volleyball: "#7c2d12", // Brown
    Badminton: "#4c1d95", // Purple
    "Table Tennis": "#be123c", // Red
    Tennis: "#0e7490", // Cyan
    Hockey: "#1e40af", // Dark Blue
    Chess: "#374151", // Gray
    Carrom: "#78350f", // Amber
    Kabaddi: "#991b1b", // Dark Red
    Kho: "#9f1239", // Rose
    Athletics: "#065f46", // Emerald
    Swimming: "#1e40af", // Blue
    "Weight Lifting": "#991b1b", // Red
    Boxing: "#7f1d1d", // Dark Red
    Wrestling: "#78350f", // Brown
    Yoga: "#059669", // Green
  };

  return colors[sportName] || "#0A1929"; // Default navy color
}

/**
 * Appends registration data to sport-specific sheet
 * @param {Object} data - Registration data
 * @returns {Object} Success status and message
 */
function appendToSheet(data) {
  try {
    const sportName = data.sportName || "Unknown Sport";
    const sheet = getSportSheet(sportName);

    // Prepare row data (sport name not needed since it's the sheet name)
    const timestamp = new Date();
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

    // Create row array (14 columns - sport name excluded)
    const rowData = [
      timestamp,
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

    // Format entry fee column as currency (column 5 now)
    sheet.getRange(lastRow, 5).setNumberFormat("₹#,##0");

    // Color code payment status (column 6 now)
    const statusCell = sheet.getRange(lastRow, 6);
    if (paymentStatus === "Success") {
      statusCell.setBackground("#D4EDDA").setFontColor("#155724");
    } else if (paymentStatus === "Failed") {
      statusCell.setBackground("#F8D7DA").setFontColor("#721C24");
    } else {
      statusCell.setBackground("#FFF3CD").setFontColor("#856404");
    }

    // Auto-resize columns for better readability (14 columns)
    sheet.autoResizeColumns(1, 14);

    // Add alternating row colors for readability
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, 14).setBackground("#F8F9FA");
    }

    Logger.log(
      "Successfully added registration for: " +
        sportName +
        " (₹" +
        entryFee +
        ") - Razorpay ID: " +
        razorpayPaymentId +
        " to sheet: " +
        sportName,
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
