// LocalStorage Management Module
// Handles all data persistence operations

const STORAGE_KEY = 'bcoe_sports_registrations';

// Save a new registration
function saveRegistration(registration) {
  try {
    const registrations = getAllRegistrations();
    
    // Add timestamp and unique ID
    const newRegistration = {
      ...registration,
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };
    
    registrations.push(newRegistration);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    
    return { success: true, data: newRegistration };
  } catch (error) {
    console.error('Error saving registration:', error);
    return { success: false, error: error.message };
  }
}

// Get all registrations
function getAllRegistrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving registrations:', error);
    return [];
  }
}

// Get registrations by sport ID
function getRegistrationsBySport(sportId) {
  const allRegistrations = getAllRegistrations();
  return allRegistrations.filter(reg => reg.sportId === sportId);
}

// Get registrations by gender
function getRegistrationsByGender(gender) {
  const allRegistrations = getAllRegistrations();
  return allRegistrations.filter(reg => reg.gender === gender);
}

// Delete a registration by ID
function deleteRegistration(id) {
  try {
    const registrations = getAllRegistrations();
    const filtered = registrations.filter(reg => reg.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (error) {
    console.error('Error deleting registration:', error);
    return { success: false, error: error.message };
  }
}

// Clear all registrations (admin function)
function clearAllRegistrations() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error clearing registrations:', error);
    return { success: false, error: error.message };
  }
}

// Generate unique ID
function generateUniqueId() {
  return `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get registration statistics
function getRegistrationStats() {
  const registrations = getAllRegistrations();
  
  return {
    total: registrations.length,
    boys: registrations.filter(r => r.gender === 'boys').length,
    girls: registrations.filter(r => r.gender === 'girls').length,
    bySport: registrations.reduce((acc, reg) => {
      acc[reg.sportName] = (acc[reg.sportName] || 0) + 1;
      return acc;
    }, {})
  };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    saveRegistration,
    getAllRegistrations,
    getRegistrationsBySport,
    getRegistrationsByGender,
    deleteRegistration,
    clearAllRegistrations,
    getRegistrationStats
  };
}
