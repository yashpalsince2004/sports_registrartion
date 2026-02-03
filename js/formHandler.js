// Form Handler for Single-Sport Registration with Payment
// Handles form validation, data preparation, and submission

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('main-registration-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Ensure payment is confirmed
  if (!window.paymentConfirmed) {
    showFormError('Payment not confirmed. Please go back and confirm payment first.');
    return;
  }
  
  // Validate form
  const validation = validateRegistrationForm(formData);
  if (!validation.valid) {
    showFormError(validation.errors.join('<br>'));
    return;
  }
  
  // Prepare registration data
  const registrationData = prepareRegistrationData(formData);
  
  // Disable submit button
  const submitBtn = form.querySelector('.submit-btn');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';
  
  try {
    // Send to Google Sheets
    if (typeof sendToGoogleSheets === 'function') {
      await sendToGoogleSheets(registrationData).catch(error => {
        console.warn('Google Sheets submission failed:', error);
      });
    }
    
    // Save to localStorage
    const result = saveRegistration(registrationData);
    
    if (result.success) {
      // Update registration count
      if (typeof updateRegistrationCount === 'function') {
        updateRegistrationCount();
      }
      
      // Show success modal
      showSuccessModal(registrationData);
      
      // Reset form
      form.reset();
    } else {
      showFormError('Failed to save registration. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
    
  } catch (error) {
    console.error('Submission error:', error);
    showFormError('An error occurred. Please try again.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }
}

/**
 * Validate registration form
 */
function validateRegistrationForm(formData) {
  const errors = [];
  
  // Check if sport is selected
  if (!window.selectedSport) {
    errors.push('No sport selected');
    return { valid: false, errors: errors };
  }
  
  // Validate payment data
  if (!window.paymentData || !window.paymentData.transactionId) {
    errors.push('Payment information missing');
  }
  
  // Validate team name
  const teamName = formData.get('teamName');
  if (!teamName || teamName.trim() === '') {
    errors.push('Team/Participant name is required');
  }
  
  // Validate contact number
  const contact = formData.get('contact');
  if (!contact || !/^[0-9]{10}$/.test(contact)) {
    errors.push('Contact number must be exactly 10 digits');
  }
  
  // Validate player names
  const playerInputs = document.querySelectorAll('.player-input');
  const playerNames = [];
  let hasEmpty = false;
  let hasDuplicate = false;
  
  playerInputs.forEach(input => {
    const playerName = input.value.trim();
    if (!playerName) {
      hasEmpty = true;
    } else {
      const lowerName = playerName.toLowerCase();
      if (playerNames.includes(lowerName)) {
        hasDuplicate = true;
        errors.push(`Duplicate player name: "${playerName}"`);
      }
      playerNames.push(lowerName);
    }
  });
  
  if (hasEmpty) {
    errors.push('All player fields must be filled');
  }
  
  // Validate captain selection for team sports
  const sport = window.selectedSport;
  if (sport && sport.hasCaptain) {
    const captain = formData.get('captain');
    const viceCaptain = formData.get('viceCaptain');
    
    if (!captain || captain === '') {
      errors.push('Please select a captain');
    }
    
    if (!viceCaptain || viceCaptain === '') {
      errors.push('Please select a vice-captain');
    }
    
    if (captain && viceCaptain && captain === viceCaptain) {
      errors.push('Captain and Vice-Captain must be different players');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Prepare registration data for submission
 */
function prepareRegistrationData(formData) {
  const sport = window.selectedSport;
  const paymentInfo = window.paymentData;
  
  // Collect player data
  const players = [];
  const playerInputs = document.querySelectorAll('.player-input');
  playerInputs.forEach(input => {
    const playerName = input.value.trim();
    if (playerName) {
      players.push(playerName);
    }
  });
  
  // Get captain info
  let captain = 'N/A';
  let viceCaptain = 'N/A';
  
  if (sport.hasCaptain) {
    const captainValue = formData.get('captain');
    const viceCaptainValue = formData.get('viceCaptain');
    
    if (captainValue) {
      const captainIndex = parseInt(captainValue.replace('player_', '')) - 1;
      captain = players[captainIndex] || 'N/A';
    }
    
    if (viceCaptainValue) {
      const viceCaptainIndex = parseInt(viceCaptainValue.replace('player_', '')) - 1;
      viceCaptain = players[viceCaptainIndex] || 'N/A';
    }
  }
  
  // Prepare final data
  const registrationData = {
    id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    submittedAt: formatDate(new Date()),
    
    // Sport details
    sportId: sport.id,
    sportName: sport.name,
    category: sport.category, // indoor/outdoor
    gender: sport.gender,
    gameType: sport.gameType,
    
    // Payment details
    entryFee: sport.entryFee,
    paymentStatus: paymentInfo.paymentStatus,
    transactionId: paymentInfo.transactionId,
    
    // Team details
    teamName: formData.get('teamName').trim(),
    players: players,
    playersString: players.join(', '),
    
    // Captain details
    captain: captain,
    viceCaptain: viceCaptain,
    
    // Contact
    contact: formData.get('contact')
  };
  
  return registrationData;
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

/**
 * Show form error message
 */
function showFormError(message) {
  const errorDiv = document.getElementById('form-error');
  if (!errorDiv) return;
  
  errorDiv.innerHTML = `<strong>⚠️ Error:</strong> ${message}`;
  errorDiv.style.display = 'block';
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide after 8 seconds
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 8000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateRegistrationForm,
    prepareRegistrationData
  };
}
