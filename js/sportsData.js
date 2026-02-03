// Sports Data Configuration with Entry Fees
// Complete list of all sports with fees, player counts, and game types

const sportsData = [
  // ============ OUTDOOR SPORTS - BOYS ============
  {
    id: 'boys-overarm-cricket',
    name: 'Overarm Cricket',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'boys-only',
    gameType: 'team',
    playersCount: 11,
    entryFee: 250,
    icon: '🏏',
    hasCaptain: true
  },
  {
    id: 'boys-box-cricket',
    name: 'Box Cricket',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 6,
    entryFee: 250,
    icon: '🏏',
    hasCaptain: true
  },
  {
    id: 'boys-volleyball',
    name: 'Volleyball',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'boys-only',
    gameType: 'team',
    playersCount: 6,
    entryFee: 200,
    icon: '🏐',
    hasCaptain: true
  },
  {
    id: 'boys-kabaddi',
    name: 'Kabaddi',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 7,
    entryFee: 200,
    icon: '🤼',
    hasCaptain: true
  },
  {
    id: 'boys-football',
    name: 'Football',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'boys-only',
    gameType: 'team',
    playersCount: 11,
    entryFee: 200,
    icon: '⚽',
    hasCaptain: true
  },
  {
    id: 'boys-tug-of-war',
    name: 'Tug of War',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 8,
    entryFee: 150,
    icon: '💪',
    hasCaptain: true
  },
  {
    id: 'boys-kho-kho',
    name: 'Kho-Kho',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 9,
    entryFee: 200,
    icon: '🏃',
    hasCaptain: true
  },
  {
    id: 'boys-running',
    name: 'Running',
    category: 'outdoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🏃',
    hasCaptain: false
  },

  // ============ OUTDOOR SPORTS - GIRLS ============
  {
    id: 'girls-box-cricket',
    name: 'Box Cricket',
    category: 'outdoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 6,
    entryFee: 250,
    icon: '🏏',
    hasCaptain: true
  },
  {
    id: 'girls-kabaddi',
    name: 'Kabaddi',
    category: 'outdoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 7,
    entryFee: 200,
    icon: '🤼',
    hasCaptain: true
  },
  {
    id: 'girls-tug-of-war',
    name: 'Tug of War',
    category: 'outdoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 8,
    entryFee: 150,
    icon: '💪',
    hasCaptain: true
  },
  {
    id: 'girls-kho-kho',
    name: 'Kho-Kho',
    category: 'outdoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'team',
    playersCount: 9,
    entryFee: 200,
    icon: '🏃‍♀️',
    hasCaptain: true
  },
  {
    id: 'girls-running',
    name: 'Running',
    category: 'outdoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🏃‍♀️',
    hasCaptain: false
  },

  // ============ INDOOR SPORTS - BOYS ============
  {
    id: 'boys-chess',
    name: 'Chess',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '♟️',
    hasCaptain: false
  },
  {
    id: 'boys-table-tennis-single',
    name: 'Table Tennis (Single)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'boys-only',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🏓',
    hasCaptain: false
  },
  {
    id: 'boys-table-tennis-double',
    name: 'Table Tennis (Double)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'boys-only',
    gameType: 'double',
    playersCount: 2,
    entryFee: 100,
    icon: '🏓',
    hasCaptain: false
  },
  {
    id: 'boys-carrom-single',
    name: 'Carrom (Single)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🎯',
    hasCaptain: false
  },
  {
    id: 'boys-carrom-double',
    name: 'Carrom (Double)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'double',
    playersCount: 2,
    entryFee: 100,
    icon: '🎯',
    hasCaptain: false
  },
  {
    id: 'boys-badminton-single',
    name: 'Badminton (Single)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🏸',
    hasCaptain: false
  },
  {
    id: 'boys-badminton-double',
    name: 'Badminton (Double)',
    category: 'indoor',
    gender: 'boys',
    genderRestriction: 'both',
    gameType: 'double',
    playersCount: 2,
    entryFee: 100,
    icon: '🏸',
    hasCaptain: false
  },

  // ============ INDOOR SPORTS - GIRLS ============
  {
    id: 'girls-chess',
    name: 'Chess',
    category: 'indoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '♟️',
    hasCaptain: false
  },
  {
    id: 'girls-carrom-single',
    name: 'Carrom (Single)',
    category: 'indoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🎯',
    hasCaptain: false
  },
  {
    id: 'girls-carrom-double',
    name: 'Carrom (Double)',
    category: 'indoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'double',
    playersCount: 2,
    entryFee: 100,
    icon: '🎯',
    hasCaptain: false
  },
  {
    id: 'girls-badminton-single',
    name: 'Badminton (Single)',
    category: 'indoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'individual',
    playersCount: 1,
    entryFee: 50,
    icon: '🏸',
    hasCaptain: false
  },
  {
    id: 'girls-badminton-double',
    name: 'Badminton (Double)',
    category: 'indoor',
    gender: 'girls',
    genderRestriction: 'both',
    gameType: 'double',
    playersCount: 2,
    entryFee: 100,
    icon: '🏸',
    hasCaptain: false
  }
];

// Helper Functions

/**
 * Get sports filtered by gender and category
 * @param {string} selectedGender - 'boys' or 'girls'
 * @param {string} category - 'outdoor', 'indoor', or 'all'
 * @returns {Array} Filtered sports array
 */
function getSportsByGenderAndCategory(selectedGender, category = 'all') {
  return sportsData.filter(sport => {
    const genderMatch = sport.gender === selectedGender;
    const categoryMatch = category === 'all' || sport.category === category;
    return genderMatch && categoryMatch;
  });
}

/**
 * Get sport by ID
 * @param {string} sportId - Sport ID
 * @returns {Object|null} Sport object or null
 */
function getSportById(sportId) {
  return sportsData.find(sport => sport.id === sportId) || null;
}

/**
 * Get all sports for a specific category
 * @param {string} category - 'outdoor' or 'indoor'
 * @returns {Array} Sports array
 */
function getSportsByCategory(category) {
  return sportsData.filter(sport => sport.category === category);
}

/**
 * Calculate total entry fee for selected sports
 * @param {Array} sportIds - Array of sport IDs
 * @returns {number} Total fee
 */
function calculateTotalFee(sportIds) {
  return sportIds.reduce((total, sportId) => {
    const sport = getSportById(sportId);
    return total + (sport ? sport.entryFee : 0);
  }, 0);
}

/**
 * Get total player count for selected sports
 * @param {Array} sportIds - Array of sport IDs
 * @returns {number} Total players needed
 */
function getTotalPlayerCount(sportIds) {
  return sportIds.reduce((total, sportId) => {
    const sport = getSportById(sportId);
    return total + (sport ? sport.playersCount : 0);
  }, 0);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sportsData,
    getSportsByGenderAndCategory,
    getSportById,
    getSportsByCategory,
    calculateTotalFee,
    getTotalPlayerCount
  };
}
