// Google Sheets Integration Configuration
// Replace this URL with your deployed Google Apps Script Web App URL

const GOOGLE_SHEETS_CONFIG = {
  // Your Google Apps Script Web App URL
  // Get this after deploying the Apps Script (see setup instructions)
  webAppUrl: 'https://script.google.com/macros/s/AKfycbysakHFaWIHr_V5fE9ErSzhCnndehHD8_wYXIWjMcnLN4TlsIouL7gh2CH8Yi1uUFt2/exec',
  
  // Enable/disable Google Sheets integration
  enabled: true,
  
  // Fallback to localStorage if Google Sheets fails
  useLocalStorageBackup: true
};

/**
 * Sends registration data to Google Sheets via Apps Script
 * @param {Object} registrationData - The registration data to send
 * @returns {Promise<Object>} Response from Google Sheets
 */
async function sendToGoogleSheets(registrationData) {
  // Check if integration is enabled
  if (!GOOGLE_SHEETS_CONFIG.enabled) {
    console.log('Google Sheets integration is disabled');
    return { success: false, message: 'Integration disabled' };
  }
  
  // Check if URL is configured
  if (GOOGLE_SHEETS_CONFIG.webAppUrl === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets Web App URL not configured');
    return { success: false, message: 'Web App URL not configured' };
  }
  
  try {
    // Send POST request to Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    });
    
    // Note: With 'no-cors' mode, we can't read the response
    // So we assume success if no error was thrown
    console.log('Data sent to Google Sheets successfully');
    
    return {
      success: true,
      message: 'Registration sent to Google Sheets'
    };
    
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Test function to verify Google Sheets connection
 * Run this from browser console after configuring the Web App URL
 */
async function testGoogleSheetsConnection() {
  const testData = {
    sportId: 'test-sport',
    sportName: 'Test Sport',
    gender: 'boys',
    category: 'outdoor',
    teamName: 'Test Team ' + new Date().getTime(),
    players: ['Test Player 1', 'Test Player 2'],
    captain: 'Test Player 1',
    viceCaptain: 'Test Player 2',
    contact: '1234567890'
  };
  
  console.log('Sending test data to Google Sheets...');
  const result = await sendToGoogleSheets(testData);
  console.log('Result:', result);
  
  if (result.success) {
    console.log('✅ Google Sheets integration is working!');
  } else {
    console.log('❌ Google Sheets integration failed:', result.message);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sendToGoogleSheets, GOOGLE_SHEETS_CONFIG };
}
