/**
 * UDIT DAS — LOCAL BUSINESS WEBSITE DEMO FUNNEL & LEAD CAPTURE SYSTEM
 * Phase 3 Controller: Lead Capture, Dynamic WhatsApp & Lead Management
 * Production-ready, zero-dependency vanilla JavaScript
 */

/* ==========================================================================
   CENTRALIZED CONFIGURATION & INTEGRATION SETTINGS
   ========================================================================== */

/**
 * Central Business Contact Details
 * Single source of truth referencing /js/config.js
 */
const BUSINESS_CONTACT = (typeof window !== 'undefined' && window.CONTACT) ? window.CONTACT : {
  whatsapp: "919753859045",
  whatsappDisplay: "+91 97538 59045",
  email: "udit.windows8@gmail.com"
};

const WHATSAPP_NUMBER = BUSINESS_CONTACT.whatsapp;

/**
 * 2. Form Backend Endpoint (CRM / Webhook / Serverless)
 * - Defaults to "/api/leads" for real database storage and admin CRM integration.
 * - Supports remote full URLs (e.g., https://your-domain.com/api/leads) or local endpoints.
 */
const FORM_ENDPOINT = "/api/leads";

/**
 * 3. Lead Lifecycle Status Schema (Structured for future CRM / Lead Management)
 */
const LEAD_STATUS = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  PREVIEW_CREATED: 'PREVIEW CREATED',
  PROPOSAL_SENT: 'PROPOSAL SENT',
  WON: 'WON',
  LOST: 'LOST'
};

/* ==========================================================================
   ANALYTICS & CONVERSION EVENT HOOKS
   ========================================================================== */

/**
 * Lightweight unified event tracker.
 * Dispatches a CustomEvent and integrates with Meta Pixel / Google Analytics if present on window.
 */
function trackEvent(eventName, eventData = {}) {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...eventData
    };

    // 1. Dispatch custom DOM event for custom listeners
    window.dispatchEvent(new CustomEvent('funnel_event', { detail: payload }));

    // 2. Integration with Meta Pixel if active
    if (typeof window.fbq === 'function') {
      if (eventName === 'form_success') {
        window.fbq('track', 'Lead', eventData);
      } else if (eventName === 'click_whatsapp') {
        window.fbq('trackCustom', 'WhatsAppClick', eventData);
      } else {
        window.fbq('trackCustom', eventName, eventData);
      }
    }

    // 3. Integration with Google Analytics (gtag) if active
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    }

    // 4. Debug output in development console
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[Funnel Analytics] ${eventName}:`, payload);
    }
  } catch (err) {
    console.warn('[Analytics Error]', err);
  }
}

/* ==========================================================================
   UTM ATTRIBUTION TRACKER
   ========================================================================== */

function getStoredUtmAttribution() {
  try {
    const stored = sessionStorage.getItem('lead_utm_attribution') || localStorage.getItem('lead_utm_attribution');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    // Ignore storage parse exceptions
  }

  // Parse from URL parameters
  const params = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    referrer: document.referrer || ''
  };

  // Persist if any UTM parameter was detected
  if (utmData.utm_source || utmData.utm_medium || utmData.utm_campaign) {
    try {
      sessionStorage.setItem('lead_utm_attribution', JSON.stringify(utmData));
      localStorage.setItem('lead_utm_attribution', JSON.stringify(utmData));
    } catch (e) {
      // Ignore quota exceptions
    }
  }

  return utmData;
}

/* ==========================================================================
   DYNAMIC WHATSAPP URL GENERATOR
   ========================================================================== */

function buildWhatsAppUrl(businessName = '', category = '', requirement = '') {
  const currentContact = (typeof window !== 'undefined' && window.CONTACT) ? window.CONTACT : BUSINESS_CONTACT;
  const cleanNumber = (currentContact.whatsapp || "919753859045").replace(/[^0-9]/g, '');
  
  let msg = '';
  if (businessName) {
    msg = `Hi Udit, I'm interested in getting a website for ${businessName}. I found your website through your website concepts.`;
    if (category) {
      msg += ` I'm interested in a ${category} website.`;
    }
    if (requirement && requirement !== 'Not Sure Yet') {
      msg += ` Need: ${requirement}.`;
    }
  } else if (category) {
    msg = `Hi Udit, I'm interested in getting a website for my business. I found your website through your website concepts. I'm interested in a ${category} website.`;
  } else {
    msg = `Hi Udit, I'm interested in getting a website for my business. I found your website through your website concepts.`;
  }

  const encodedMsg = encodeURIComponent(msg);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

/* ==========================================================================
   INITIALIZATION LIFECYCLE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Capture initial UTM parameters
  getStoredUtmAttribution();

  // Initialize interactive UI components
  initStickyHeader();
  initMobileNavigation();
  initHeroShowcase();
  initIndustrySelector();
  initFeaturedDemos();
  initDemoModal();
  initLeadForm();
  initWhatsAppCTAs();
  initFaqAccordion();
  initSmoothScroll();
  initCtaTracking();
});

/* --------------------------------------------------------------------------
   1. Sticky Header Controller
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer Controller
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('mobile-nav-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta .btn');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Hero Interactive Mockup Showcase Data & Controller
   -------------------------------------------------------------------------- */
const DEMO_DATA = {
  interior: {
    category: 'Interior Design',
    brandName: 'AURA SPACES',
    url: 'https://auraspaces.design',
    image: '/assets/images/demo_interior_luxury_1787014062394.jpg',
    title: 'Minimalist Architecture & Luxury Interior Studio',
    tagline: 'Designing calm, enduring sanctuaries for modern living with travertine stone and warm light.',
    accentColor: '#B89B72',
    stats: [
      { num: '40+', label: 'Curated Portfolios' },
      { num: '100%', label: 'Mobile Optimized' },
      { num: '0.8s', label: 'Fast Load Speed' }
    ],
    features: ['High-res Project Gallery', 'Material Palette Viewer', 'Direct Client Enquiry Flow', 'Travertine & Wood Texture Showcase']
  },
  salon: {
    category: 'Salon & Beauty',
    brandName: 'LUMIÈRE BEAUTY',
    url: 'https://lumierebeauty.co',
    image: '/assets/images/demo_salon_luxury_1787014074819.jpg',
    title: 'Luxury Hair, Skin & Aesthetic Sanctuary',
    tagline: 'Elevating everyday beauty with bespoke treatments, balayage mastery and VIP booking.',
    accentColor: '#D97706',
    stats: [
      { num: '3x', label: 'More Online Bookings' },
      { num: 'Instant', label: 'WhatsApp Schedule' },
      { num: '5★', label: 'Client Experience' }
    ],
    features: ['Service Menu & Pricing', 'Stylist Portfolio Grid', 'One-Tap WhatsApp Booking', 'Glow Skin Treatments Guide']
  },
  restaurant: {
    category: 'Restaurant & Café',
    brandName: 'OSTERIA FLORA',
    url: 'https://osteriaflora.it',
    image: '/assets/images/demo_restaurant_luxury_1787014087345.jpg',
    title: 'Artisan Woodfired Kitchen & Espresso Bar',
    tagline: 'Authentic seasonal Italian dining in a candlelit botanical atmosphere.',
    accentColor: '#DC2626',
    stats: [
      { num: '85%', label: 'Direct Table Bookings' },
      { num: 'Visual', label: 'Interactive Menu' },
      { num: '1-Click', label: 'Google Maps Route' }
    ],
    features: ['Mobile Interactive Menu', 'Reservation Request Engine', 'Location & Hours Widget', 'Chef Tasting Highlights']
  },
  dental: {
    category: 'Dental Clinic',
    brandName: 'APEX DENTAL CARE',
    url: 'https://apexdental.clinic',
    image: '/assets/images/demo_dental_luxury_1787014098266.jpg',
    title: 'Modern Cosmetic & Family Dental Practice',
    tagline: 'Gentle, technology-driven dentistry with radiant smile makeovers and 3D digital scans.',
    accentColor: '#0284C7',
    stats: [
      { num: '+120%', label: 'New Patient Enquiries' },
      { num: 'HIPAA', label: 'Secure Enquiry Flow' },
      { num: 'Clear', label: 'Transparent Pricing' }
    ],
    features: ['Smile Assessment Form', 'Doctor Credentials & Tech', 'Emergency Contact Bar', 'Invisalign 3D Simulator']
  },
  gym: {
    category: 'Gym & Fitness',
    brandName: 'FORGE ATHLETICS',
    url: 'https://forgeathletics.fit',
    image: '/assets/images/demo_gym_luxury_1787014114910.jpg',
    title: 'High-Performance Strength & Conditioning Club',
    tagline: 'Transform your body with elite coaching, Olympic platforms and high-energy community.',
    accentColor: '#16A34A',
    stats: [
      { num: '2.4x', label: 'Free Pass Conversions' },
      { num: 'Live', label: 'Class Timetable' },
      { num: 'Tiered', label: 'Membership Calculator' }
    ],
    features: ['1-Day Free Pass Form', 'Weekly Class Schedule', 'Trainer Profiles & Roster', 'Hyrox & Barbell Programs']
  }
};

function normalizeCategoryKey(rawCategory) {
  if (!rawCategory) return 'interior';
  const clean = String(rawCategory).toLowerCase().trim();
  if (clean.includes('interior')) return 'interior';
  if (clean.includes('salon') || clean.includes('beauty')) return 'salon';
  if (clean.includes('restaurant') || clean.includes('caf') || clean.includes('food')) return 'restaurant';
  if (clean.includes('dental') || clean.includes('clinic')) return 'dental';
  if (clean.includes('gym') || clean.includes('fitness')) return 'gym';
  return DEMO_DATA[clean] ? clean : 'interior';
}

function initHeroShowcase() {
  const tabs = document.querySelectorAll('.showcase-tab');
  const addressUrl = document.getElementById('hero-address-url');
  const screens = document.querySelectorAll('.concept-preview-screen');
  const deviceBtns = document.querySelectorAll('.device-btn');
  const mockupContainer = document.querySelector('.mockup-container');
  const heroMockupOpenBtn = document.getElementById('hero-mockup-open-btn');
  const heroMockupViewport = document.getElementById('hero-mockup-viewport');

  let currentActiveCategory = 'interior';

  if (!tabs.length) return;

  const setActiveCategory = (category) => {
    const normKey = normalizeCategoryKey(category);
    currentActiveCategory = normKey;

    // Track tab switch
    trackEvent('view_demo', { category: normKey, trigger: 'hero_tab' });

    // Update tabs
    tabs.forEach(t => {
      const tKey = normalizeCategoryKey(t.getAttribute('data-category'));
      const isActive = tKey === normKey;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update URL in address bar
    if (addressUrl && DEMO_DATA[normKey]) {
      addressUrl.textContent = DEMO_DATA[normKey].url;
    }

    // Update preview screens
    screens.forEach(screen => {
      const sKey = normalizeCategoryKey(screen.getAttribute('data-screen'));
      screen.classList.toggle('active', sKey === normKey);
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      if (category) setActiveCategory(category);
    });
  });

  // Hero Mockup "View Demo ↗" button in browser chrome
  if (heroMockupOpenBtn) {
    heroMockupOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      trackEvent('click_demo', { category: currentActiveCategory, source: 'hero_mockup_button' });
      openDemoModalWithCategory(currentActiveCategory);
    });
  }

  // Click on Hero Mockup viewport to inspect full demo
  if (heroMockupViewport) {
    heroMockupViewport.addEventListener('click', () => {
      trackEvent('click_demo', { category: currentActiveCategory, source: 'hero_mockup_viewport' });
      openDemoModalWithCategory(currentActiveCategory);
    });
  }

  // Device switcher
  if (deviceBtns.length && mockupContainer) {
    deviceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = btn.getAttribute('data-mode');
        deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (mode === 'mobile') {
          mockupContainer.style.maxWidth = '420px';
        } else {
          mockupContainer.style.maxWidth = '1080px';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Industry Selector Grid Controller
   -------------------------------------------------------------------------- */
function initIndustrySelector() {
  const cards = document.querySelectorAll('.industry-card');
  cards.forEach(card => {
    const handleOpen = (e) => {
      const targetCard = e.currentTarget || card;
      const rawCat = targetCard.getAttribute('data-category');
      const category = normalizeCategoryKey(rawCat);
      trackEvent('click_industry', { category });
      openDemoModalWithCategory(category);
    };

    card.addEventListener('click', handleOpen);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View ${card.querySelector('.industry-card-title')?.textContent || 'Industry'} Website Demo`);
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen(e);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Featured Demos Actions & Form Autofill Controller
   -------------------------------------------------------------------------- */
function initFeaturedDemos() {
  // "Get Similar Concept" buttons pre-select category in the lead form
  const similarBtns = document.querySelectorAll('.btn-select-category');
  const businessTypeSelect = document.getElementById('business-type');
  const leadSection = document.getElementById('lead-form-section');

  similarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const categoryVal = btn.getAttribute('data-category-val');
      trackEvent('click_free_concept', { source: 'demo_card_similar', category: categoryVal });
      
      if (businessTypeSelect && categoryVal) {
        businessTypeSelect.value = categoryVal;
      }
      if (leadSection) {
        leadSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // "View Full Site Demo" buttons open the interactive preview modal
  const viewDemoBtns = document.querySelectorAll('.btn-open-demo');
  viewDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const el = e.currentTarget || btn;
      const rawCat = el.getAttribute('data-category') || el.closest('[data-category]')?.getAttribute('data-category');
      const category = normalizeCategoryKey(rawCat);
      trackEvent('click_demo', { category, source: 'featured_section_btn' });
      openDemoModalWithCategory(category);
    });
  });

  // Entire preview windows and image frames in showcase cards also open demo on click
  const previewWindows = document.querySelectorAll('.concept-item-card .concept-preview-window');
  previewWindows.forEach(win => {
    win.style.cursor = 'pointer';
    win.setAttribute('title', 'Click to open full website demo');
    win.addEventListener('click', (e) => {
      // Avoid double trigger if clicking directly on a button inside
      if (e.target.closest('.btn-open-demo') || e.target.closest('.btn-select-category')) {
        return;
      }
      const card = win.closest('.concept-item-card');
      const rawCat = card?.querySelector('.btn-open-demo')?.getAttribute('data-category') || card?.id?.replace('demo-', '');
      const category = normalizeCategoryKey(rawCat);
      trackEvent('click_demo', { category, source: 'featured_window_click' });
      openDemoModalWithCategory(category);
    });
  });
}

/* --------------------------------------------------------------------------
   6. Interactive Demo Modal Controller
   -------------------------------------------------------------------------- */
function initDemoModal() {
  const modalBackdrop = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('demo-modal-close');
  const modalCtaBtn = document.getElementById('demo-modal-cta');

  if (!modalBackdrop) return;

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', () => {
      trackEvent('click_free_concept', { source: 'modal_topbar_cta' });
      closeModal();
      const leadSection = document.getElementById('lead-form-section');
      if (leadSection) {
        leadSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

function openDemoModalWithCategory(category) {
  const modalBackdrop = document.getElementById('demo-modal');
  const modalCategoryBadge = document.getElementById('demo-modal-cat');
  const modalTitle = document.getElementById('demo-modal-title');
  const modalViewport = document.getElementById('demo-modal-body');
  const businessTypeSelect = document.getElementById('business-type');

  if (!modalBackdrop) return;

  const normKey = normalizeCategoryKey(category);
  const data = DEMO_DATA[normKey] || DEMO_DATA.interior;

  if (modalCategoryBadge) modalCategoryBadge.textContent = data.category;
  if (modalTitle) modalTitle.textContent = data.brandName + ' — Concept Preview';

  // Populate interactive simulated viewport
  if (modalViewport) {
    modalViewport.innerHTML = generateSimulatedPageHtml(normKey, data);
    
    // Attach listener to internal modal action buttons
    const modalActionCta = modalViewport.querySelector('.modal-action-cta-btn');
    if (modalActionCta) {
      modalActionCta.addEventListener('click', () => {
        trackEvent('click_free_concept', { source: 'modal_inner_cta', category: normKey });
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        const leadSection = document.getElementById('lead-form-section');
        if (leadSection) {
          leadSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const nameInput = document.getElementById('business-name');
            if (nameInput) nameInput.focus();
          }, 450);
        }
      });
    }
  }

  // Pre-set select in lead form
  if (businessTypeSelect) {
    const map = {
      interior: 'Interior Design',
      salon: 'Salon & Beauty',
      restaurant: 'Restaurant & Café',
      dental: 'Dental',
      gym: 'Gym & Fitness'
    };
    if (map[normKey]) {
      businessTypeSelect.value = map[normKey];
    }
  }

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function generateSimulatedPageHtml(category, data) {
  const statsHtml = data.stats.map(s => `
    <div class="modal-stat-pill">
      <div class="modal-stat-num">${s.num}</div>
      <div class="modal-stat-label">${s.label}</div>
    </div>
  `).join('');

  const featuresHtml = data.features.map(f => `
    <span class="modal-feature-tag">✦ ${f}</span>
  `).join('');

  const waUrl = buildWhatsAppUrl('', data.category);

  return `
    <div class="modal-fullsite-container">
      <div class="modal-fullsite-banner">
        <div class="modal-fullsite-meta">
          <h3>${data.brandName}</h3>
          <p>${data.tagline}</p>
        </div>
        <div class="modal-fullsite-stats">
          ${statsHtml}
        </div>
      </div>
      
      <div class="modal-fullsite-viewport">
        <div class="modal-fullsite-img-frame">
          <img 
            src="${data.image}" 
            alt="${data.title} Luxury Website Demo" 
            class="modal-fullsite-img" 
            referrerPolicy="no-referrer" 
            loading="lazy"
          />
        </div>
      </div>

      <div class="modal-fullsite-footer">
        <div class="modal-feature-tags">
          ${featuresHtml}
        </div>
        <div class="modal-cta-button-group" style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
          <a 
            href="${waUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-whatsapp btn-sm dynamic-whatsapp-link"
            style="padding:0.45rem 1rem; font-size:0.8125rem; text-decoration:none;"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Ask on WhatsApp
          </a>
          <button 
            type="button" 
            class="btn btn-primary btn-sm modal-action-cta-btn"
            style="padding:0.45rem 1.1rem; font-size:0.8125rem;"
          >
            Get a Similar Website Concept →
          </button>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   7. Phase 3 Lead Generation Form Controller & Validation Engine
   -------------------------------------------------------------------------- */
function initLeadForm() {
  const form = document.getElementById('lead-form');
  const successCard = document.getElementById('lead-form-success');
  const errorCard = document.getElementById('lead-form-error');
  const resetBtn = document.getElementById('form-reset-btn');
  const retryBtn = document.getElementById('form-retry-btn');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  // Track user engagement when they first focus into any form field
  let hasStartedForm = false;
  const formInputs = form.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!hasStartedForm) {
        hasStartedForm = true;
        trackEvent('start_form', { first_field: input.name || input.id });
      }
    }, { once: true });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Check honeypot field (anti-spam bot detection)
    const hpField = form.querySelector('input[name="_hp_website_contact"]');
    if (hpField && hpField.value.trim().length > 0) {
      console.warn('[Anti-Spam] Honeypot triggered. Aborting submission.');
      return;
    }

    // 2. Field references
    const nameInput = document.getElementById('client-name');
    const businessInput = document.getElementById('business-name');
    const businessTypeSelect = document.getElementById('business-type');
    const whatsappInput = document.getElementById('whatsapp-number');
    const websiteInput = document.getElementById('current-website');
    const requirementRadios = document.querySelectorAll('input[name="requirement"]:checked');
    const messageInput = document.getElementById('client-message');

    let isValid = true;

    // Validate Full Name
    if (!nameInput || !nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Business Name
    if (!businessInput || !businessInput.value.trim()) {
      showError(businessInput, 'Please enter your business name');
      isValid = false;
    } else {
      clearError(businessInput);
    }

    // Validate Business Type
    if (!businessTypeSelect || !businessTypeSelect.value) {
      showError(businessTypeSelect, 'Please select your business type');
      isValid = false;
    } else {
      clearError(businessTypeSelect);
    }

    // Validate WhatsApp Number (allow international format, must have at least 7 digits)
    const rawPhone = whatsappInput ? whatsappInput.value.trim() : '';
    const phoneDigits = rawPhone.replace(/[^0-9]/g, '');
    if (!phoneDigits || phoneDigits.length < 7) {
      showError(whatsappInput, 'Please enter a valid WhatsApp number (e.g. +91 98765 43210)');
      isValid = false;
    } else {
      clearError(whatsappInput);
    }

    // Validate Website URL format if provided (optional)
    const rawWebsite = websiteInput ? websiteInput.value.trim() : '';
    if (rawWebsite) {
      const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/.*)?$/i;
      if (!urlPattern.test(rawWebsite)) {
        showError(websiteInput, 'Please enter a valid website URL (e.g. https://yourbusiness.com)');
        isValid = false;
      } else {
        clearError(websiteInput);
      }
    } else if (websiteInput) {
      clearError(websiteInput);
    }

    if (!isValid) {
      // Scroll smoothly to first error element
      const firstError = form.querySelector('.form-input.error, .form-select.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 3. UI Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation:spin 1s linear infinite; width:18px; height:18px; margin-right:8px; display:inline-block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Sending request...
      `;
    }

    // Hide any prior error banner
    if (errorCard) errorCard.classList.remove('active');

    // 4. Construct Full Lead Data Payload (Structured for CRM / Webhook)
    const utms = getStoredUtmAttribution();
    const hpInput = document.getElementById('hp-contact-field');
    const leadPayload = {
      name: nameInput.value.trim(),
      businessName: businessInput.value.trim(),
      businessType: businessTypeSelect.value,
      whatsapp: rawPhone,
      currentWebsite: rawWebsite ? (rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`) : '',
      requirement: requirementRadios.length ? requirementRadios[0].value : 'New Website',
      message: messageInput ? messageInput.value.trim() : '',
      _hp_website_contact: hpInput ? hpInput.value.trim() : '',
      source: utms.utm_source || 'website_funnel',
      landingPage: window.location.href,
      timestamp: new Date().toISOString(),
      utm_source: utms.utm_source || '',
      utm_medium: utms.utm_medium || '',
      utm_campaign: utms.utm_campaign || '',
      utm_content: utms.utm_content || '',
      utm_term: utms.utm_term || '',
      referrer: utms.referrer || document.referrer || '',
      status: LEAD_STATUS.NEW
    };

    trackEvent('submit_form', { businessType: leadPayload.businessType, requirement: leadPayload.requirement });

    try {
      if (FORM_ENDPOINT && FORM_ENDPOINT.trim() !== '') {
        // Live Submission to configured API endpoint
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(leadPayload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          throw new Error(errJson.error || `Server responded with status ${response.status}`);
        }

        const data = await response.json().catch(() => ({}));
        if (data.leadId) {
          leadPayload.id = data.leadId;
        }
      } else {
        // Safe Local Demo Simulation
        await new Promise(resolve => setTimeout(resolve, 650));
      }

      // Store in localStorage for client persistence
      try {
        const existing = JSON.parse(localStorage.getItem('local_leads') || '[]');
        existing.unshift(leadPayload);
        localStorage.setItem('local_leads', JSON.stringify(existing.slice(0, 50)));
      } catch (e) {}

      // 5. Success Flow
      trackEvent('form_success', leadPayload);

      // Update Dynamic WhatsApp links in Success Card & page
      updateDynamicWhatsAppLinks(leadPayload.businessName, leadPayload.businessType, leadPayload.requirement);

      // Switch to In-Page Success State
      form.style.display = 'none';
      if (errorCard) errorCard.classList.remove('active');
      if (successCard) {
        successCard.classList.add('active');
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (err) {
      console.error('[Form Submission Error]', err);
      trackEvent('form_error', { error_message: err.message });

      // Show Error State without clearing user inputs
      if (errorCard) {
        errorCard.classList.add('active');
        errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Update Error Card's WhatsApp CTA with what the user entered
      updateDynamicWhatsAppLinks(
        businessInput ? businessInput.value.trim() : '',
        businessTypeSelect ? businessTypeSelect.value : '',
        requirementRadios.length ? requirementRadios[0].value : ''
      );

      // Restore submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'TRY AGAIN <span class="btn-icon">→</span>';
      }
    }
  });

  // Retry Button on error
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      if (errorCard) errorCard.classList.remove('active');
      const submitBtn = document.getElementById('form-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'GET MY FREE WEBSITE CONCEPT <span class="btn-icon">→</span>';
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Reset button in success state
  if (resetBtn && successCard) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'GET MY FREE WEBSITE CONCEPT <span class="btn-icon">→</span>';
      }
      successCard.classList.remove('active');
      if (errorCard) errorCard.classList.remove('active');
      form.style.display = 'block';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function showError(inputElement, message) {
  if (!inputElement) return;
  inputElement.classList.add('error');
  const parent = inputElement.closest('.form-group');
  if (parent) {
    const errorMsg = parent.querySelector('.form-error-msg');
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.add('visible');
    }
  }
}

function clearError(inputElement) {
  if (!inputElement) return;
  inputElement.classList.remove('error');
  const parent = inputElement.closest('.form-group');
  if (parent) {
    const errorMsg = parent.querySelector('.form-error-msg');
    if (errorMsg) {
      errorMsg.classList.remove('visible');
    }
  }
}

/* --------------------------------------------------------------------------
   8. WhatsApp CTA Controller & Dynamic Links
   -------------------------------------------------------------------------- */
function updateDynamicWhatsAppLinks(businessName = '', category = '', requirement = '') {
  const dynamicLinks = document.querySelectorAll('.dynamic-whatsapp-link');
  const url = buildWhatsAppUrl(businessName, category, requirement);

  dynamicLinks.forEach(link => {
    link.setAttribute('href', url);
  });
}

function initWhatsAppCTAs() {
  // Initialize default WhatsApp URL across all dynamic links
  updateDynamicWhatsAppLinks();

  // WhatsApp Fallback Button under form
  const fallbackBtn = document.getElementById('btn-whatsapp-fallback');
  if (fallbackBtn) {
    fallbackBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('client-name');
      const businessInput = document.getElementById('business-name');
      const businessTypeSelect = document.getElementById('business-type');
      const requirementRadios = document.querySelectorAll('input[name="requirement"]:checked');

      const businessName = businessInput ? businessInput.value.trim() : '';
      const category = businessTypeSelect ? businessTypeSelect.value : '';
      const req = requirementRadios.length ? requirementRadios[0].value : '';

      trackEvent('click_whatsapp', { source: 'form_fallback', businessName, category });

      const url = buildWhatsAppUrl(businessName, category, req);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Success Card WhatsApp CTA click tracker
  const successWhatsAppBtn = document.getElementById('success-whatsapp-btn');
  if (successWhatsAppBtn) {
    successWhatsAppBtn.addEventListener('click', () => {
      trackEvent('click_whatsapp', { source: 'success_card' });
    });
  }
}

/* --------------------------------------------------------------------------
   9. CTA Button Event Tracking Initializer
   -------------------------------------------------------------------------- */
function initCtaTracking() {
  const heroPrimaryBtn = document.getElementById('hero-primary-cta');
  if (heroPrimaryBtn) {
    heroPrimaryBtn.addEventListener('click', () => {
      trackEvent('click_free_concept', { source: 'hero_primary' });
    });
  }

  const headerCtaBtn = document.getElementById('header-cta-btn');
  if (headerCtaBtn) {
    headerCtaBtn.addEventListener('click', () => {
      trackEvent('click_free_concept', { source: 'header_btn' });
    });
  }

  const finalCtaBtn = document.getElementById('final-cta-btn');
  if (finalCtaBtn) {
    finalCtaBtn.addEventListener('click', () => {
      trackEvent('click_free_concept', { source: 'final_cta_section' });
    });
  }
}

/* --------------------------------------------------------------------------
   10. FAQ Accordion Controller
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a tidy single-open accordion feel
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. Smooth Scroll with Header Offset
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
