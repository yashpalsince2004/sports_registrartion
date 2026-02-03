// Main Application Controller for Step-Based Registration
// Handles 4-step flow: Select Sport → Player Details → Payment → Review & Submit

// Global state
let currentStep = 1;
const totalSteps = 4;
let selectedSport = null;
let selectedGender = 'boys';
let paymentData = {
  razorpayPaymentId: '',
  status: '', // 'Success' or 'Failed'
  amount: 0
};
let playerData = {};

// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Load sports list for default gender (boys)
  loadSportsList(selectedGender);
  
  // Setup event listeners
  setupEventListeners();
  
  // Update registration count
  updateRegistrationCount();
  
  // Show step 1
  goToStep(1);
  
  console.log('Step-Based Registration System Initialized');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Gender selection
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  genderInputs.forEach(input => {
    input.addEventListener('change', handleGenderChange);
  });
  
  // Step navigation buttons
  document.getElementById('btn-to-step-2')?.addEventListener('click', () => handleStepTransition(1, 2));
  document.getElementById('btn-to-step-3')?.addEventListener('click', () => handleStepTransition(2, 3));
  document.getElementById('btn-to-step-4')?.addEventListener('click', () => handleStepTransition(3, 4));
  
  // Back buttons
  document.getElementById('btn-back-to-step-1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('btn-back-to-step-2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btn-back-to-step-3')?.addEventListener('click', () => goToStep(3));
  
  // Razorpay payment button
  document.getElementById('razorpay-payment-btn')?.addEventListener('click', initializeRazorpayPayment);
  
  // Final submit
  document.getElementById('btn-submit-final')?.addEventListener('click', handleFinalSubmit);
  
  // Modal close
  const modalClose = document.querySelector('#success-modal .modal-close');
  const modalOverlay = document.querySelector('#success-modal .modal-overlay');
  
  if (modalClose) modalClose.addEventListener('click', closeSuccessModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeSuccessModal);
  
  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSuccessModal();
  });
}

/* ============================================
   STEP MANAGEMENT
   ============================================ */

/**
 * Navigate to a specific step
 */
function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > totalSteps) return;
  
  // Hide all steps
  for (let i = 1; i <= totalSteps; i++) {
    const stepEl = document.getElementById(`step-${i}`);
    if (stepEl) stepEl.style.display = 'none';
  }
  
  // Show current step
  const currentStepEl = document.getElementById(`step-${stepNumber}`);
  if (currentStepEl) currentStepEl.style.display = 'block';
  
  // Update progress indicator
  updateProgressIndicator(stepNumber);
  
  currentStep = stepNumber;
  
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update progress step indicator
 */
function updateProgressIndicator(activeStep) {
  document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNum < activeStep) {
      step.classList.add('completed');
    } else if (stepNum === activeStep) {
      step.classList.add('active');
    }
  });
}

/**
 * Handle step transition with validation
 */
function handleStepTransition(fromStep, toStep) {
  let isValid = true;
  
  // Validate based on current step
  if (fromStep === 1) {
    isValid = validateSportSelection();
  } else if (fromStep === 2) {
    isValid = validatePlayerDetails();
  } else if (fromStep === 3) {
    isValid = validatePayment();
  }
  
  if (isValid) {
    // Perform actions before moving to next step
    if (toStep === 2) generatePlayerForm();
    if (toStep === 3) populatePaymentSection();
    if (toStep === 4) generateReviewSection();
    
    goToStep(toStep);
  }
}

/* ============================================
   STEP 1: SPORT SELECTION
   ============================================ */

/**
 * Handle gender selection change
 */
function handleGenderChange(e) {
  selectedGender = e.target.value;
  selectedSport = null;
  hideSelectedSportDisplay();
  loadSportsList(selectedGender);
  document.getElementById('btn-to-step-2').disabled = true;
}

/**
 * Load sports list based on selected gender
 */
function loadSportsList(gender) {
  const outdoorList = document.getElementById('outdoor-sports-list');
  const indoorList = document.getElementById('indoor-sports-list');
  
  if (!outdoorList || !indoorList) return;
  
  // Get outdoor sports
  const outdoorSports = getSportsByGenderAndCategory(gender, 'outdoor');
  outdoorList.innerHTML = outdoorSports.map(sport => createSportRadio(sport)).join('');
  
  // Get indoor sports  
  const indoorSports = getSportsByGenderAndCategory(gender, 'indoor');
  indoorList.innerHTML = indoorSports.map(sport => createSportRadio(sport)).join('');
  
  // Add event listeners to radio buttons
  document.querySelectorAll('input[name="sport"]').forEach(radio => {
    radio.addEventListener('change', handleSportSelection);
  });
}

/**
 * Create HTML for sport radio button
 */
function createSportRadio(sport) {
  const gameTypeLabel = sport.gameType === 'individual' ? 'Individual' : 
                         sport.gameType === 'double' ? 'Double' : 
                         sport.gameType === 'team' ? `Team (${sport.playersCount})` : sport.gameType;
  
  return `
    <label class="sport-radio">
      <input 
        type="radio" 
        name="sport"
        value="${sport.id}"
        data-sport='${JSON.stringify(sport)}'
        id="sport-${sport.id}"
      />
      <span class="radio-custom"></span>
      <span class="sport-details">
        <span class="sport-icon">${sport.icon}</span>
        <span class="sport-info">
          <span class="sport-name">${sport.name}</span>
          <span class="sport-type">${gameTypeLabel}</span>
        </span>
        <span class="sport-fee">₹${sport.entryFee}</span>
      </span>
    </label>
  `;
}

/**
 * Handle sport radio button selection
 */
function handleSportSelection(e) {
  try {
    const sportData = e.target.dataset.sport;
    selectedSport = JSON.parse(sportData);
    
    if (selectedSport) {
      showSelectedSportDisplay();
      document.getElementById('btn-to-step-2').disabled = false;
    }
  } catch (error) {
    console.error('Error parsing sport data:', error);
  }
}

/**
 * Show selected sport display
 */
function showSelectedSportDisplay() {
  if (!selectedSport) return;
  
  const display = document.getElementById('selected-sport-display');
  const gameType = selectedSport.gameType === 'individual' ? 'Individual' : 
                   selectedSport.gameType === 'double' ? 'Double' : 
                   selectedSport.gameType === 'team' ? `Team (${selectedSport.playersCount} players)` : '';
  
  document.getElementById('selected-icon').textContent = selectedSport.icon;
  document.getElementById('selected-name').textContent = selectedSport.name;
  document.getElementById('selected-meta').textContent = 
    `${selectedSport.category.charAt(0).toUpperCase() + selectedSport.category.slice(1)} • ${gameType}`;
  document.getElementById('selected-fee').textContent = `₹${selectedSport.entryFee}`;
  
  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hide selected sport display
 */
function hideSelectedSportDisplay() {
  document.getElementById('selected-sport-display').style.display = 'none';
}

/**
 * Validate sport selection
 */
function validateSportSelection() {
  if (!selectedSport) {
    alert('Please select a sport to continue');
    return false;
  }
  return true;
}

/* ============================================
   STEP 2: PLAYER DETAILS
   ============================================ */

/**
 * Generate player details form based on selected sport
 */
function generatePlayerForm() {
  if (!selectedSport) return;
  
  // Update team label
  const teamLabel = document.getElementById('team-label');
  if (teamLabel) {
    teamLabel.textContent = selectedSport.gameType === 'team' ? 'Team Name' : 'Participant Name';
  }
  
  // Generate player input fields
  const container = document.getElementById('player-inputs-container');
  container.innerHTML = generatePlayerInputs(selectedSport);
  
  // Show/hide captain section
  const captainSection = document.getElementById('captain-section');
  if (captainSection) {
    captainSection.style.display = selectedSport.hasCaptain ? 'block' : 'none';
  }
  
  // Setup player input listeners
  setupPlayerInputListeners();
}

/**
 * Generate player input HTML
 */
function generatePlayerInputs(sport) {
  let html = '';
  
  for (let i = 1; i <= sport.playersCount; i++) {
    html += `
      <div class="player-input-group">
        <span class="player-number">${i}</span>
        <input
          type="text"
          name="player_${i}"
          data-player-index="${i}"
          placeholder="Player ${i} name"
          class="player-input"
          required
          autocomplete="off"
        />
      </div>
    `;
  }
  
  return html;
}

/**
 * Setup player input listeners for captain dropdown
 */
function setupPlayerInputListeners() {
  const playerInputs = document.querySelectorAll('.player-input');
  playerInputs.forEach(input => {
    input.addEventListener('input', updateCaptainDropdowns);
  });
}

/**
 * Update captain and vice-captain dropdowns
 */
function updateCaptainDropdowns() {
  const captainSelect = document.getElementById('captain');
  const viceCaptainSelect = document.getElementById('vice-captain');
  
  if (!captainSelect || !viceCaptainSelect) return;
  
  const currentCaptain = captainSelect.value;
  const currentViceCaptain = viceCaptainSelect.value;
  
  // Clear options
  captainSelect.innerHTML = '<option value="">Choose captain</option>';
  viceCaptainSelect.innerHTML = '<option value="">Choose vice-captain</option>';
  
  // Get all player names
  const playerInputs = document.querySelectorAll('.player-input');
  
  playerInputs.forEach((input, index) => {
    const playerName = input.value.trim();
    if (playerName) {
      const value = `player_${index + 1}`;
      captainSelect.add(new Option(playerName, value));
      viceCaptainSelect.add(new Option(playerName, value));
    }
  });
  
  // Restore selections if still valid
  if (currentCaptain && Array.from(captainSelect.options).some(opt => opt.value === currentCaptain)) {
    captainSelect.value = currentCaptain;
  }
  if (currentViceCaptain && Array.from(viceCaptainSelect.options).some(opt => opt.value === currentViceCaptain)) {
    viceCaptainSelect.value = currentViceCaptain;
  }
}

/**
 * Validate player details
 */
function validatePlayerDetails() {
  const errors = [];
  
  // Validate team name
  const teamName = document.getElementById('team-name').value.trim();
  if (!teamName) {
    errors.push('Team/Participant name is required');
  }
  
  // Validate contact number
  const contact = document.getElementById('contact').value.trim();
  if (!contact || !/^[0-9]{10}$/.test(contact)) {
    errors.push('Contact number must be exactly 10 digits');
  }
  
  // Validate player names
  const playerInputs = document.querySelectorAll('.player-input');
  const playerNames = [];
  let hasEmpty = false;
  
  playerInputs.forEach(input => {
    const playerName = input.value.trim();
    if (!playerName) {
      hasEmpty = true;
    } else {
      const lowerName = playerName.toLowerCase();
      if (playerNames.includes(lowerName)) {
        errors.push(`Duplicate player name: "${playerName}"`);
      }
      playerNames.push(lowerName);
    }
  });
  
  if (hasEmpty) {
    errors.push('All player fields must be filled');
  }
  
  // Validate captain selection for team sports
  if (selectedSport && selectedSport.hasCaptain) {
    const captain = document.getElementById('captain').value;
    const viceCaptain = document.getElementById('vice-captain').value;
    
    if (!captain) errors.push('Please select a captain');
    if (!viceCaptain) errors.push('Please select a vice-captain');
    if (captain && viceCaptain && captain === viceCaptain) {
      errors.push('Captain and Vice-Captain must be different players');
    }
  }
  
  if (errors.length > 0) {
    showFormError(errors.join('<br>'));
    return false;
  }
  
  hideFormError();
  return true;
}

/* ============================================
   STEP 3: RAZORPAY PAYMENT
   ============================================ */

/**
 * Populate payment section with sport details
 */
function populatePaymentSection() {
  if (!selectedSport) return;
  
  document.getElementById('payment-sport-name').textContent = selectedSport.name;
  document.getElementById('payment-sport-category').textContent = 
    `${selectedSport.category.charAt(0).toUpperCase() + selectedSport.category.slice(1)} • ${selectedSport.gameType}`;
  document.getElementById('payment-fee').textContent = selectedSport.entryFee;
  document.getElementById('razorpay-amount').textContent = selectedSport.entryFee;
  
  // Reset payment displays
  document.getElementById('payment-success-display').style.display = 'none';
  document.getElementById('payment-failure-display').style.display = 'none';
  document.getElementById('razorpay-payment-btn').style.display = 'flex';
  
  // Reset payment data
  paymentData = {
    razorpayPaymentId: '',
    status: '',
    amount: 0
  };
}

/**
 * Initialize Razorpay payment
 */
function initializeRazorpayPayment() {
  if (!selectedSport || !window.RAZORPAY_CONFIG) {
    alert('Payment system is not configured. Please contact support.');
    return;
  }
  
  // Check if Razorpay is loaded
  if (typeof Razorpay === 'undefined') {
    alert('Payment gateway failed to load. Please refresh the page.');
    return;
  }
  
  const amount = selectedSport.entryFee * 100; // Convert to paise
  
  const options = {
    key: window.RAZORPAY_CONFIG.getKeyId(),
    amount: amount,
    currency: window.RAZORPAY_CONFIG.options.currency,
    name: window.RAZORPAY_CONFIG.options.name,
    description: `${selectedSport.name} Entry Fee`,
    image: window.RAZORPAY_CONFIG.options.image,
    theme: window.RAZORPAY_CONFIG.options.theme,
    notes: {
      ...window.RAZORPAY_CONFIG.options.notes,
      sport_id: selectedSport.id,
      sport_name: selectedSport.name,
      category: selectedSport.category,
      game_type: selectedSport.gameType
    },
    handler: handlePaymentSuccess,
    modal: {
      ondismiss: handlePaymentDismiss,
      confirm_close: true
    },
    retry: window.RAZORPAY_CONFIG.options.retry
  };
  
  try {
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    
    // Show loading overlay
    document.getElementById('payment-loading').style.display = 'flex';
    
    // Hide loading after a delay (Razorpay modal will show)
    setTimeout(() => {
      document.getElementById('payment-loading').style.display = 'none';
    }, 1000);
    
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    alert('Failed to initialize payment. Please try again.');
  }
}

/**
 * Handle successful payment
 */
function handlePaymentSuccess(response) {
  console.log('Payment successful:', response);
  
  // Store payment data
  paymentData = {
    razorpayPaymentId: response.razorpay_payment_id,
    status: 'Success',
    amount: selectedSport.entryFee
  };
  
  // Hide payment button
  document.getElementById('razorpay-payment-btn').style.display = 'none';
  
  // Show success message
  const successDisplay = document.getElementById('payment-success-display');
  document.getElementById('razorpay-transaction-id').textContent = response.razorpay_payment_id;
  document.getElementById('razorpay-paid-amount').textContent = selectedSport.entryFee;
  successDisplay.style.display = 'flex';
  
  // Generate receipt automatically
  setTimeout(() => {
    generateAndStoreReceipt(response.razorpay_payment_id);
  }, 500);
  
  // Enable next button after a short delay
  setTimeout(() => {
    document.getElementById('btn-to-step-4').disabled = false;
  }, 500);
}

/**
 * Generate receipt and store data
 * @param {string} razorpayPaymentId - Razorpay payment ID
 */
function generateAndStoreReceipt(razorpayPaymentId) {
  // Prepare registration data for receipt
  const players = [];
  document.querySelectorAll('.player-input').forEach(input => {
    const playerName = input.value.trim();
    if (playerName) players.push(playerName);
  });
  
  let captain = 'N/A';
  let viceCaptain = 'N/A';
  
  if (selectedSport.hasCaptain) {
    const captainValue = document.getElementById('captain').value;
    const viceCaptainValue = document.getElementById('vice-captain').value;
    
    if (captainValue) {
      const captainIndex = parseInt(captainValue.replace('player_', '')) - 1;
      captain = players[captainIndex] || 'N/A';
    }
    
    if (viceCaptainValue) {
      const viceCaptainIndex = parseInt(viceCaptainValue.replace('player_', '')) - 1;
      viceCaptain = players[viceCaptainIndex] || 'N/A';
    }
  }
  
  const registrationData = {
    sportName: selectedSport.name,
    category: selectedSport.category,
    gender: selectedSport.gender,
    gameType: selectedSport.gameType,
    entryFee: selectedSport.entryFee,
    teamName: document.getElementById('team-name').value.trim(),
    contact: document.getElementById('contact').value,
    players: players,
    playersString: players.join(', '),
    captain: captain,
    viceCaptain: viceCaptain
  };
  
  // Check if receipt generator is available
  if (typeof window.receiptGenerator !== 'undefined') {
    const receipt = window.receiptGenerator.generateReceipt(registrationData, paymentData);
    
    if (receipt) {
      // Store receipt data globally
      window.lastGeneratedReceipt = receipt;
      window.lastRegistrationData = registrationData;
      
      // Show download button
      window.receiptGenerator.showDownloadReceiptButton(receipt.receiptId);
      
      console.log('✅ Receipt generated:', receipt.receiptId);
    }
  } else {
    console.warn('Receipt generator not available');
  }
}

/**
 * Handle payment dismissal/cancellation
 */
function handlePaymentDismiss() {
  console.log('Payment dismissed or cancelled');
  
  // Update payment data
  paymentData = {
    razorpayPaymentId: '',
    status: 'Failed',
    amount: 0
  };
  
  // Show failure message
  const failureDisplay = document.getElementById('payment-failure-display');
  failureDisplay.style.display = 'flex';
  
  // Hide failure message after 5 seconds
  setTimeout(() => {
    failureDisplay.style.display = 'none';
  }, 5000);
}

/**
 * Validate payment completion
 */
function validatePayment() {
  if (!paymentData.razorpayPaymentId || paymentData.status !== 'Success') {
    alert('Payment is required to proceed. Please complete the payment.');
    return false;
  }
  
  return true;
}

/* ============================================
   STEP 4: REVIEW & SUBMIT
   ============================================ */

/**
 * Generate review section with all details
 */
function generateReviewSection() {
  const container = document.getElementById('review-container');
  
  // Collect player names
  const playerNames = [];
  document.querySelectorAll('.player-input').forEach(input => {
    const name = input.value.trim();
    if (name) playerNames.push(name);
  });
  
  // Get captain/vice-captain names
  const captainValue = document.getElementById('captain')?.value;
  const viceCaptainValue = document.getElementById('vice-captain')?.value;
  
  let captainName = 'N/A';
  let viceCaptainName = 'N/A';
  
  if (captainValue && selectedSport.hasCaptain) {
    const captainIndex = parseInt(captainValue.replace('player_', '')) - 1;
    captainName = playerNames[captainIndex] || 'N/A';
  }
  
  if (viceCaptainValue && selectedSport.hasCaptain) {
    const viceCaptainIndex = parseInt(viceCaptainValue.replace('player_', '')) - 1;
    viceCaptainName = playerNames[viceCaptainIndex] || 'N/A';
  }
  
  const html = `
    <div class="review-section">
      
      <div class="review-card">
        <h4>Sport Details</h4>
        <div class="review-item">
          <span class="label">Sport:</span>
          <span class="value">${selectedSport.icon} ${selectedSport.name}</span>
        </div>
        <div class="review-item">
          <span class="label">Category:</span>
          <span class="value">${selectedSport.category.charAt(0).toUpperCase() + selectedSport.category.slice(1)}</span>
        </div>
        <div class="review-item">
          <span class="label">Game Type:</span>
          <span class="value">${selectedSport.gameType}</span>
        </div>
        <div class="review-item">
          <span class="label">Entry Fee:</span>
          <span class="value">₹${selectedSport.entryFee}</span>
        </div>
      </div>
      
      <div class="review-card">
        <h4>Player Details</h4>
        <div class="review-item">
          <span class="label">Team/Participant:</span>
          <span class="value">${document.getElementById('team-name').value}</span>
        </div>
        <div class="review-item">
          <span class="label">Contact:</span>
          <span class="value">${document.getElementById('contact').value}</span>
        </div>
        <div class="review-item">
          <span class="label">Players:</span>
          <span class="value">${playerNames.join(', ')}</span>
        </div>
        ${selectedSport.hasCaptain ? `
          <div class="review-item">
            <span class="label">Captain:</span>
            <span class="value">${captainName}</span>
          </div>
          <div class="review-item">
            <span class="label">Vice-Captain:</span>
            <span class="value">${viceCaptainName}</span>
          </div>
        ` : ''}
      </div>
      
      <div class="review-card highlight">
        <h4>💳 Payment Details</h4>
        <div class="review-item">
          <span class="label">Razorpay Payment ID:</span>
          <span class="value">${paymentData.razorpayPaymentId}</span>
        </div>
        <div class="review-item">
          <span class="label">Payment Status:</span>
          <span class="value badge ${paymentData.status.toLowerCase()}">${paymentData.status}</span>
        </div>
        <div class="review-item total">
          <span class="label">Total Amount Paid:</span>
          <span class="value">₹${selectedSport.entryFee}</span>
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

/* ============================================
   SUBMISSION
   ============================================ */

/**
 * Handle final submission
 */
async function handleFinalSubmit() {
  const submitBtn = document.getElementById('btn-submit-final');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';
  
  try {
    // Prepare registration data
    const registrationData = prepareRegistrationData();
    console.log('📦 Registration Data Prepared:', registrationData);
    
    // Send to Google Sheets
    if (typeof sendToGoogleSheets === 'function') {
      console.log('📊 Sending to Google Sheets...');
      try {
        const sheetsResult = await sendToGoogleSheets(registrationData);
        console.log('✅ Google Sheets Result:', sheetsResult);
      } catch (error) {
        console.error('❌ Google Sheets Error:', error);
        console.error('Error details:', error.message);
        // Continue anyway - don't block registration
      }
    } else {
      console.warn('⚠️ sendToGoogleSheets function not found');
    }
    
    // Save to localStorage
    const result = saveRegistration(registrationData);
    
    if (result.success) {
      updateRegistrationCount();
      showSuccessModal(registrationData);
    } else {
      alert('Failed to save registration. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
    
  } catch (error) {
    console.error('Submission error:', error);
    alert('An error occurred. Please try again.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }
}

/**
 * Prepare registration data for submission
 */
function prepareRegistrationData() {
  // Collect player data
  const players = [];
  document.querySelectorAll('.player-input').forEach(input => {
    const playerName = input.value.trim();
    if (playerName) players.push(playerName);
  });
  
  // Get captain info
  let captain = 'N/A';
  let viceCaptain = 'N/A';
  
  if (selectedSport.hasCaptain) {
    const captainValue = document.getElementById('captain').value;
    const viceCaptainValue = document.getElementById('vice-captain').value;
    
    if (captainValue) {
      const captainIndex = parseInt(captainValue.replace('player_', '')) - 1;
      captain = players[captainIndex] || 'N/A';
    }
    
    if (viceCaptainValue) {
      const viceCaptainIndex = parseInt(viceCaptainValue.replace('player_', '')) - 1;
      viceCaptain = players[viceCaptainIndex] || 'N/A';
    }
  }
  
  return {
    id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    submittedAt: formatDate(new Date()),
    sportId: selectedSport.id,
    sportName: selectedSport.name,
    category: selectedSport.category,
    gender: selectedSport.gender,
    gameType: selectedSport.gameType,
    entryFee: selectedSport.entryFee,
    paymentStatus: paymentData.status,
    razorpayPaymentId: paymentData.razorpayPaymentId,
    paymentAmount: paymentData.amount,
    teamName: document.getElementById('team-name').value.trim(),
    players: players,
    playersString: players.join(', '),
    captain: captain,
    viceCaptain: viceCaptain,
    contact: document.getElementById('contact').value,
    receiptId: window.lastGeneratedReceipt ? window.lastGeneratedReceipt.receiptId : 'N/A',
    receiptGeneratedAt: window.lastGeneratedReceipt ? window.lastGeneratedReceipt.generatedAt : ''
  };
}

/**
 * Format date for display
 */
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString('en-IN', options);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Show form error message
 */
function showFormError(message) {
  const errorDiv = document.getElementById('form-error');
  if (!errorDiv) return;
  
  errorDiv.innerHTML = `<strong>⚠️ Error:</strong> ${message}`;
  errorDiv.style.display = 'block';
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 8000);
}

/**
 * Hide form error message
 */
function hideFormError() {
  const errorDiv = document.getElementById('form-error');
  if (errorDiv) errorDiv.style.display = 'none';
}

/**
 * Show success message modal
 */
function showSuccessModal(registrationData) {
  const modal = document.getElementById('success-modal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <div class="success-message">
      <div class="success-icon">✓</div>
      <h3>Registration Successful!</h3>
      <p>Your registration for <strong>${registrationData.sportName}</strong> has been submitted successfully.</p>
      <div class="success-details">
        <div class="success-detail-item">
          <span class="detail-label">Entry Fee:</span>
          <span class="detail-value">₹${registrationData.entryFee}</span>
        </div>
        <div class="success-detail-item">
          <span class="detail-label">Razorpay Payment ID:</span>
          <span class="detail-value">${registrationData.razorpayPaymentId}</span>
        </div>
      </div>
      <p class="success-note">
        <strong>To register for another sport, start a new registration.</strong>
      </p>
      <small>Good luck with your event! 🎉</small>
    </div>
  `;
  
  modal.classList.add('active');
}

/**
 * Close success modal
 */
function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.remove('active');
  
  setTimeout(() => {
    resetApplication();
  }, 300);
}

/**
 * Reset application to initial state
 */
function resetApplication() {
  // Reset state
  selectedSport = null;
  paymentData = { razorpayPaymentId: '', status: '', amount: 0 };
  playerData = {};
  
  // Reset forms
  document.getElementById('player-details-form')?.reset();
  document.querySelectorAll('input[name="sport"]').forEach(radio => {
    radio.checked = false;
  });
  
  // Go to step 1
  goToStep(1);
  
  // Reload sports
  loadSportsList(selectedGender);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update count
  updateRegistrationCount();
}

/**
 * Update registration count from localStorage
 */
function updateRegistrationCount() {
  const stats = getRegistrationStats();
  const countElement = document.getElementById('registration-count');
  if (countElement && stats) {
    countElement.textContent = stats.total || 0;
  }
}

// Export globals
if (typeof window !== 'undefined') {
  window.showSuccessModal = showSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
  window.updateRegistrationCount = updateRegistrationCount;
}
