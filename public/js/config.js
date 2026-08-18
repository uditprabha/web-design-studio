/**
 * CENTRAL CONTACT CONFIGURATION
 * Single source of truth for all business contact details.
 *
 * WhatsApp: +91 97538 59045
 * wa.me format: https://wa.me/919753859045
 * Email: udit.windows8@gmail.com
 */
const CONTACT = {
  whatsapp: "919753859045",
  whatsappDisplay: "+91 97538 59045",
  email: "udit.windows8@gmail.com"
};

// Expose globally in browser environment
if (typeof window !== 'undefined') {
  window.CONTACT = CONTACT;
}

// Expose for CommonJS / Node environments if imported
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONTACT };
}
