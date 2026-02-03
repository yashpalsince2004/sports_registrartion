/**
 * Razorpay Configuration Template
 * 
 * IMPORTANT: This is a template file for demonstration purposes.
 * DO NOT commit actual API keys to Git!
 * 
 * Instructions:
 * 1. Copy this file to 'razorpay-config.js'
 * 2. Replace placeholder keys with your actual Razorpay keys
 * 3. razorpay-config.js is gitignored to protect your keys
 */

const RAZORPAY_CONFIG = {
  // Test Mode Keys (for development and demonstration)
  test: {
    keyId: 'rzp_test_XXXXXXXXXXXXXX',      // ← Replace with your test Key ID
    keySecret: 'XXXXXXXXXXXXXXXXXXXXXX'     // ← Key Secret (backend only, not used in frontend)
  },
  
  // Live Mode Keys (for production)
  live: {
    keyId: 'rzp_live_XXXXXXXXXXXXXX',      // ← Replace with your live Key ID
    keySecret: 'XXXXXXXXXXXXXXXXXXXXXX'     // ← Key Secret (backend only, not used in frontend)
  },
  
  // Current mode: 'test' or 'live'
  mode: 'test',
  
  // Razorpay Checkout Options
  options: {
    currency: 'INR',
    name: 'BCOE Sports Registration',
    description: 'Sports Event Entry Fee',
    image: 'assets/logo.png', // Student Council Logo
    theme: {
      color: '#FF6B35', // Brand color - matches your site theme
      backdrop_color: 'rgba(0, 0, 0, 0.8)'
    },
    notes: {
      organizer: 'Student Council',
      event: 'College Sports Event 2026'
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    readonly: {
      contact: false,
      email: false,
      name: false
    },
    hidden: {
      contact: false,
      email: false
    },
    retry: {
      enabled: true,
      max_count: 3
    },
    timeout: 900, // 15 minutes
    remember_customer: false
  },
  
  /**
   * Get the current Key ID based on mode
   */
  getKeyId: function() {
    return this.mode === 'live' ? this.live.keyId : this.test.keyId;
  },
  
  /**
   * Check if in test mode
   */
  isTestMode: function() {
    return this.mode === 'test';
  },
  
  /**
   * Payment method configuration
   */
  paymentMethods: {
    card: true,
    netbanking: true,
    wallet: true,
    upi: true,
    paylater: true,
    cardless_emi: false
  },
  
  /**
   * Test cards for testing in test mode
   * These cards only work in TEST MODE
   */
  testCards: {
    success: {
      number: '4111 1111 1111 1111',
      cvv: '123',
      expiry: '12/25',
      description: 'Always succeeds'
    },
    failure: {
      number: '4000 0000 0000 0002',
      cvv: '123',
      expiry: '12/25',
      description: 'Always fails'
    },
    visa: {
      number: '4012 8888 8888 1881',
      cvv: '123',
      expiry: '12/25',
      description: 'Visa card success'
    },
    mastercard: {
      number: '5555 5555 5555 4444',
      cvv: '123',
      expiry: '12/25',
      description: 'Mastercard success'
    }
  }
};

// Make config available globally
window.RAZORPAY_CONFIG = RAZORPAY_CONFIG;

// Log mode on load (helps with debugging)
console.log(`Razorpay Mode: ${RAZORPAY_CONFIG.mode.toUpperCase()}`);
if (RAZORPAY_CONFIG.isTestMode()) {
  console.log('🧪 Test Mode Active - Use test cards for payment');
  console.log('Test Card:', RAZORPAY_CONFIG.testCards.success.number);
}
