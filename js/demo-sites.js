/**
 * Full Website UI Demo Engine
 * Generates complete, multi-section, interactive luxury websites for each industry.
 * Each site includes full navigation, hero, interactive services/menu/timetable/quiz,
 * customer proof, booking engines, and realistic footers.
 */

window.DemoSitesEngine = (function() {
  'use strict';

  // Demo 1: Aura Spaces (Luxury Interior Design Studio)
  function renderInteriorSite() {
    return `
      <div class="demo-site-wrapper site-interior" id="demo-site-interior">
        <!-- Site Header / Sticky Navigation -->
        <header class="ds-header">
          <div class="ds-container ds-header-inner">
            <div class="ds-logo">
              <span class="ds-logo-mark">◆</span>
              <div class="ds-logo-text">
                <span class="ds-logo-title">AURA SPACES</span>
                <span class="ds-logo-sub">STUDIO MILANO · NEW YORK</span>
              </div>
            </div>
            <nav class="ds-nav">
              <a href="#int-portfolio" class="ds-nav-link">Portfolio</a>
              <a href="#int-materials" class="ds-nav-link">Material Lab</a>
              <a href="#int-philosophy" class="ds-nav-link">Philosophy</a>
              <a href="#int-estimator" class="ds-nav-link">Design Brief</a>
            </nav>
            <div class="ds-header-cta">
              <button type="button" class="ds-btn ds-btn-outline ds-btn-sm" onclick="DemoSitesEngine.scrollToSection('int-estimator')">Book Brief</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="ds-hero" style="background: linear-gradient(rgba(18, 16, 14, 0.72), rgba(18, 16, 14, 0.85)), url('/assets/images/interior.jpg') center/cover no-repeat;">
          <div class="ds-container ds-hero-content">
            <div class="ds-badge ds-badge-gold">✦ 2026 ARCHITECTURAL DIGEST WINNER</div>
            <h1 class="ds-hero-title">Harmonious Sanctuaries Designed for Modern Living</h1>
            <p class="ds-hero-subtitle">Bespoke residential interiors & architectural spaces sculpted with Roman travertine, brushed brass millwork, and warm ambient light.</p>
            <div class="ds-hero-actions">
              <button type="button" class="ds-btn ds-btn-gold" onclick="DemoSitesEngine.scrollToSection('int-portfolio')">Explore 2026 Portfolio ↓</button>
              <button type="button" class="ds-btn ds-btn-ghost" onclick="DemoSitesEngine.scrollToSection('int-estimator')">Start Design Brief →</button>
            </div>
            <div class="ds-hero-stats-row">
              <div class="ds-hero-stat">
                <span class="ds-stat-num">140+</span>
                <span class="ds-stat-txt">Residences Completed</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">$48M+</span>
                <span class="ds-stat-txt">Property Value Created</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">4.97 ★</span>
                <span class="ds-stat-txt">Architectural Rating</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Portfolio Showcase -->
        <section class="ds-section" id="int-portfolio">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow">CURATED WORKS</span>
              <h2 class="ds-title">Selected Architectural Projects</h2>
              <p class="ds-lead">Filter our signature residential and commercial commissions by spatial typology.</p>
            </div>

            <!-- Filter Tabs -->
            <div class="ds-filter-tabs" id="int-filter-tabs">
              <button type="button" class="ds-filter-btn active" data-filter="all">All Projects (6)</button>
              <button type="button" class="ds-filter-btn" data-filter="penthouse">Penthouses</button>
              <button type="button" class="ds-filter-btn" data-filter="villa">Minimalist Villas</button>
              <button type="button" class="ds-filter-btn" data-filter="commercial">Commercial Lounges</button>
            </div>

            <!-- Portfolio Grid -->
            <div class="ds-portfolio-grid" id="int-portfolio-grid">
              <div class="ds-portfolio-card" data-cat="penthouse">
                <div class="ds-portfolio-img" style="background-image: url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80')">
                  <span class="ds-portfolio-tag">Manhattan Penthouse</span>
                </div>
                <div class="ds-portfolio-meta">
                  <h3>The Tribeca Sky Residence</h3>
                  <p>4,800 sq ft · Fluted travertine fireplace, custom smoked oak cabinetry, floor-to-ceiling city panoramic glass.</p>
                </div>
              </div>

              <div class="ds-portfolio-card" data-cat="villa">
                <div class="ds-portfolio-img" style="background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80')">
                  <span class="ds-portfolio-tag">Lake Como Villa</span>
                </div>
                <div class="ds-portfolio-meta">
                  <h3>Villa Bellagio Sanctuary</h3>
                  <p>6,200 sq ft · Open-concept living pavilion, bespoke brushed brass lighting, neutral linen textiles.</p>
                </div>
              </div>

              <div class="ds-portfolio-card" data-cat="commercial">
                <div class="ds-portfolio-img" style="background-image: url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80')">
                  <span class="ds-portfolio-tag">Milan Boutique</span>
                </div>
                <div class="ds-portfolio-meta">
                  <h3>Galleria Private Members Lounge</h3>
                  <p>3,100 sq ft · Acoustic fluted acoustic panels, Calacatta marble cocktail counter, ambient downlighting.</p>
                </div>
              </div>

              <div class="ds-portfolio-card" data-cat="penthouse">
                <div class="ds-portfolio-img" style="background-image: url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80')">
                  <span class="ds-portfolio-tag">Dubai Marina</span>
                </div>
                <div class="ds-portfolio-meta">
                  <h3>The Palm Panoramic Duplex</h3>
                  <p>5,400 sq ft · Double-height architectural staircase, integrated climate wine cellar, bespoke boucle seating.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Material & Texture Lab -->
        <section class="ds-section ds-bg-alt" id="int-materials">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow">TACTILE HARMONY</span>
              <h2 class="ds-title">The Material & Texture Lab</h2>
              <p class="ds-lead">Click any signature material to preview our palette synergy and curated specifications.</p>
            </div>

            <div class="ds-material-interactive-box">
              <div class="ds-material-chips">
                <button type="button" class="ds-mat-chip active" data-mat="travertine">
                  <span class="ds-mat-dot" style="background:#E2D7C3;"></span> Roman Travertine Stone
                </button>
                <button type="button" class="ds-mat-chip" data-mat="brass">
                  <span class="ds-mat-dot" style="background:#C5A880;"></span> Brushed Champagne Brass
                </button>
                <button type="button" class="ds-mat-chip" data-mat="oak">
                  <span class="ds-mat-dot" style="background:#4A3F35;"></span> Smoked European Oak
                </button>
                <button type="button" class="ds-mat-chip" data-mat="linen">
                  <span class="ds-mat-dot" style="background:#F2EEE9;"></span> Belgian Raw Linen
                </button>
              </div>

              <div class="ds-material-display" id="int-mat-display">
                <div class="ds-mat-info">
                  <h3 id="int-mat-title">Tivoli Roman Travertine</h3>
                  <p id="int-mat-desc">Unfilled, honed surface imported directly from Italian quarries. Infuses monolithic warmth and enduring geological character into fireplace mantels, kitchen islands, and floating vanity slabs.</p>
                  <ul class="ds-mat-specs" id="int-mat-specs">
                    <li><strong>Origin:</strong> Tivoli, Rome, Italy</li>
                    <li><strong>Finish:</strong> Matte Honed & Micro-Sealed</li>
                    <li><strong>Acoustic Rating:</strong> High Mass Thermal Buffering</li>
                  </ul>
                </div>
                <div class="ds-mat-preview-swatch" id="int-mat-swatch" style="background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80');">
                  <span class="ds-swatch-badge">Specification Sample</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Design Brief & Project Estimator -->
        <section class="ds-section" id="int-estimator">
          <div class="ds-container">
            <div class="ds-brief-card">
              <div class="ds-brief-info">
                <span class="ds-eyebrow" style="color:var(--ds-gold);">PROJECT INITIATION</span>
                <h2>Request a Private Studio Brief</h2>
                <p>Tell us about your spatial ambition. We provide a preliminary spatial evaluation and concept scope within 48 business hours.</p>
                
                <div class="ds-contact-direct">
                  <div><strong>Milan Studio:</strong> Via Montenapoleone 14</div>
                  <div><strong>New York Studio:</strong> 432 Park Avenue</div>
                  <div><strong>Direct Line:</strong> +1 (212) 840-2090</div>
                </div>
              </div>

              <form class="ds-brief-form" onsubmit="event.preventDefault(); alert('Thank you! Aura Spaces studio has received your project brief. We will contact you within 24 hours.');">
                <div class="ds-form-group">
                  <label>Your Name</label>
                  <input type="text" class="ds-input" placeholder="e.g. Julian Henderson" required />
                </div>
                <div class="ds-form-group">
                  <label>Email Address</label>
                  <input type="email" class="ds-input" placeholder="julian@example.com" required />
                </div>
                <div class="ds-form-group">
                  <label>Project Typology</label>
                  <select class="ds-input">
                    <option>Full Residence / Penthouse ($250k+ Scope)</option>
                    <option>Boutique Hospitality & Dining</option>
                    <option>Architectural Renovation & Millwork</option>
                  </select>
                </div>
                <button type="submit" class="ds-btn ds-btn-gold" style="width:100%;">Submit Private Brief →</button>
              </form>
            </div>
          </div>
        </section>

        <!-- Studio Footer -->
        <footer class="ds-footer">
          <div class="ds-container ds-footer-inner">
            <div class="ds-footer-brand">
              <span class="ds-footer-logo">AURA SPACES</span>
              <p>Enduring architectural interiors tailored to extraordinary lifestyles worldwide.</p>
            </div>
            <div class="ds-footer-links">
              <span>© 2026 Aura Spaces Inc.</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  // Demo 2: Lumière Beauty Lounge (Salon & Aesthetics Sanctuary)
  function renderSalonSite() {
    return `
      <div class="demo-site-wrapper site-salon" id="demo-site-salon">
        <!-- Top Notification Hotline -->
        <div class="ds-top-alert">
          <span>✦ Beverly Hills VIP Sanctuary · Open Mon–Sat 9AM–8PM · Concierge: +1 (310) 902-8811</span>
        </div>

        <!-- Sticky Header -->
        <header class="ds-header ds-salon-header">
          <div class="ds-container ds-header-inner">
            <div class="ds-logo">
              <span class="ds-logo-title" style="letter-spacing:0.18em; font-weight:800;">LUMIÈRE BEAUTY</span>
              <span class="ds-logo-sub" style="color:#D97706;">HAUTE COIFFURE & AESTHETICS</span>
            </div>
            <nav class="ds-nav">
              <a href="#sal-services" class="ds-nav-link">Treatments</a>
              <a href="#sal-stylists" class="ds-nav-link">Master Artists</a>
              <a href="#sal-transformations" class="ds-nav-link">Transformations</a>
              <a href="#sal-booking" class="ds-nav-link">VIP Booking</a>
            </nav>
            <div class="ds-header-cta">
              <button type="button" class="ds-btn ds-btn-salon" onclick="DemoSitesEngine.scrollToSection('sal-booking')">Book Online</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="ds-hero" style="background: linear-gradient(rgba(24, 18, 14, 0.75), rgba(24, 18, 14, 0.85)), url('/assets/images/salon.jpg') center/cover no-repeat;">
          <div class="ds-container ds-hero-content">
            <div class="ds-badge" style="background: rgba(217, 119, 6, 0.2); color:#FBBF24; border:1px solid rgba(217, 119, 6, 0.4);">✦ BEVERLY HILLS PREMIER SANCTUARY</div>
            <h1 class="ds-hero-title">Bespoke Hair Mastery & Radiant Aesthetic Care</h1>
            <p class="ds-hero-subtitle">From multi-dimensional sunkissed balayage to medical-grade hydra-glow facials, discover transformative artistry crafted by celebrity colorists.</p>
            <div class="ds-hero-actions">
              <button type="button" class="ds-btn ds-btn-salon" onclick="DemoSitesEngine.scrollToSection('sal-booking')">Book VIP Appointment →</button>
              <button type="button" class="ds-btn ds-btn-ghost" onclick="DemoSitesEngine.scrollToSection('sal-services')">View Treatment Menu ↓</button>
            </div>
            <div class="ds-hero-stats-row">
              <div class="ds-hero-stat">
                <span class="ds-stat-num">4.9 ★</span>
                <span class="ds-stat-txt">420+ Verified Reviews</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">12+</span>
                <span class="ds-stat-txt">Master Colorists</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">100%</span>
                <span class="ds-stat-txt">Organic Cruelty-Free</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Treatment Menu with Live Tab Switcher -->
        <section class="ds-section" id="sal-services">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#D97706;">HAUTE CARE SPECTRUM</span>
              <h2 class="ds-title">Signature Services & Transparent Pricing</h2>
              <p class="ds-lead">Select a category to explore our bespoke salon and medical aesthetics treatments.</p>
            </div>

            <!-- Tab Switcher -->
            <div class="ds-filter-tabs" id="sal-service-tabs">
              <button type="button" class="ds-filter-btn active" data-tab="hair">Hair & Balayage</button>
              <button type="button" class="ds-filter-btn" data-tab="skin">Glow Skincare</button>
              <button type="button" class="ds-filter-btn" data-tab="bridal">Bridal & VIP</button>
              <button type="button" class="ds-filter-btn" data-tab="laser">Medical Aesthetics</button>
            </div>

            <!-- Service Items Grid -->
            <div class="ds-services-grid" id="sal-services-container">
              <!-- Rendered via JS based on active tab -->
            </div>
          </div>
        </section>

        <!-- Interactive Master Stylist Team -->
        <section class="ds-section ds-bg-alt" id="sal-stylists">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#D97706;">THE ARTISTS</span>
              <h2 class="ds-title">Meet Our Master Stylists</h2>
              <p class="ds-lead">Trained in Paris, London, and New York with decades of red-carpet artistry.</p>
            </div>

            <div class="ds-team-grid">
              <div class="ds-team-card">
                <div class="ds-team-img" style="background-image: url('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80')"></div>
                <div class="ds-team-info">
                  <h4>Camille Laurent</h4>
                  <span class="ds-team-role">Creative Director & Master Colorist</span>
                  <p>Specializes in French balayage, dimensional brunette contouring, and precision scissor architecture.</p>
                  <button type="button" class="ds-btn ds-btn-sm ds-btn-outline" onclick="DemoSitesEngine.preselectStylist('Camille Laurent')">Book with Camille</button>
                </div>
              </div>

              <div class="ds-team-card">
                <div class="ds-team-img" style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')"></div>
                <div class="ds-team-info">
                  <h4>Elena Rostova, NP</h4>
                  <span class="ds-team-role">Lead Aesthetic Specialist</span>
                  <p>Expert in medical HydraFacial protocols, collagen microneedling, and natural barrier restoration.</p>
                  <button type="button" class="ds-btn ds-btn-sm ds-btn-outline" onclick="DemoSitesEngine.preselectStylist('Elena Rostova')">Book with Elena</button>
                </div>
              </div>

              <div class="ds-team-card">
                <div class="ds-team-img" style="background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80')"></div>
                <div class="ds-team-info">
                  <h4>Marcus Vance</h4>
                  <span class="ds-team-role">Senior Texture & Extension Artist</span>
                  <p>Certified in invisible bead extensions, keratin smoothing, and structural blowout finishing.</p>
                  <button type="button" class="ds-btn ds-btn-sm ds-btn-outline" onclick="DemoSitesEngine.preselectStylist('Marcus Vance')">Book with Marcus</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive 1-Click VIP Booking Widget -->
        <section class="ds-section" id="sal-booking">
          <div class="ds-container">
            <div class="ds-booking-widget-box">
              <div class="ds-booking-header">
                <span class="ds-eyebrow" style="color:#D97706;">ONLINE SCHEDULING</span>
                <h2>Book Your Salon Experience</h2>
                <p>Select your desired service, date, and preferred time slot for instant booking confirmation.</p>
              </div>

              <form class="ds-booking-form" onsubmit="event.preventDefault(); alert('Appointment Confirmed! We have reserved your time at Lumière Beauty. Confirmation sent via SMS.');">
                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Choose Service</label>
                    <select class="ds-input" id="sal-selected-service">
                      <option>French Balayage & Gloss ($285 · 2.5 hrs)</option>
                      <option>Signature Hydra-Glow Facial ($195 · 60 mins)</option>
                      <option>Precision Cut & Luxury Blowout ($130 · 60 mins)</option>
                      <option>Keratin Smoothing Therapy ($340 · 3 hrs)</option>
                    </select>
                  </div>
                  <div class="ds-form-group">
                    <label>Preferred Stylist</label>
                    <select class="ds-input" id="sal-selected-stylist">
                      <option>Any Available Master Artist</option>
                      <option>Camille Laurent (Creative Director)</option>
                      <option>Elena Rostova, NP (Aesthetics)</option>
                      <option>Marcus Vance (Extensions)</option>
                    </select>
                  </div>
                </div>

                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Select Date</label>
                    <input type="date" class="ds-input" value="2026-08-20" required />
                  </div>
                  <div class="ds-form-group">
                    <label>Preferred Time Slot</label>
                    <div class="ds-time-chips">
                      <button type="button" class="ds-time-chip active">10:00 AM</button>
                      <button type="button" class="ds-time-chip">1:30 PM</button>
                      <button type="button" class="ds-time-chip">4:00 PM</button>
                      <button type="button" class="ds-time-chip">6:30 PM</button>
                    </div>
                  </div>
                </div>

                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Your Full Name</label>
                    <input type="text" class="ds-input" placeholder="e.g. Sophia Montgomery" required />
                  </div>
                  <div class="ds-form-group">
                    <label>Mobile Number (For SMS reminder)</label>
                    <input type="tel" class="ds-input" placeholder="+1 (310) 555-0199" required />
                  </div>
                </div>

                <button type="submit" class="ds-btn ds-btn-salon" style="width:100%; margin-top:1rem;">Confirm VIP Reservation →</button>
              </form>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="ds-footer">
          <div class="ds-container ds-footer-inner">
            <div class="ds-footer-brand">
              <span class="ds-footer-logo" style="color:#D97706;">LUMIÈRE BEAUTY LOUNGE</span>
              <p>9680 Wilshire Blvd, Beverly Hills, CA 90212 · Valet Parking Available</p>
            </div>
            <div class="ds-footer-links">
              <span>© 2026 Lumière Beauty Lounge.</span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  // Demo 3: Osteria Flora (Artisan Restaurant & Wine Bar)
  function renderRestaurantSite() {
    return `
      <div class="demo-site-wrapper site-restaurant" id="demo-site-restaurant">
        <!-- Sticky Navigation -->
        <header class="ds-header ds-dining-header">
          <div class="ds-container ds-header-inner">
            <div class="ds-logo">
              <span class="ds-logo-title" style="font-family: serif; letter-spacing:0.1em; font-weight:700;">OSTERIA FLORA</span>
              <span class="ds-logo-sub" style="color:#DC2626;">TRATTORIA · ENOTECA · FORNO</span>
            </div>
            <nav class="ds-nav">
              <a href="#rest-menu" class="ds-nav-link">Menu & Wines</a>
              <a href="#rest-chef" class="ds-nav-link">Chef's Table</a>
              <a href="#rest-reserve" class="ds-nav-link">Reservations</a>
              <a href="#rest-hours" class="ds-nav-link">Hours & Location</a>
            </nav>
            <div class="ds-header-cta">
              <button type="button" class="ds-btn ds-btn-dining" onclick="DemoSitesEngine.scrollToSection('rest-reserve')">Reserve Table</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="ds-hero" style="background: linear-gradient(rgba(20, 14, 14, 0.78), rgba(20, 14, 14, 0.88)), url('/assets/images/restaurant.jpg') center/cover no-repeat;">
          <div class="ds-container ds-hero-content">
            <div class="ds-badge" style="background: rgba(220, 38, 38, 0.2); color:#FCA5A5; border:1px solid rgba(220, 38, 38, 0.4);">✦ MICHELIN GUIDE SELECTED 2026</div>
            <h1 class="ds-hero-title">Handcrafted Pasta, Woodfired Hearth & Rare Italian Wines</h1>
            <p class="ds-hero-subtitle">Heirloom culinary traditions from Emilia-Romagna and Tuscany, prepared with locally harvested organic produce in a romantic candlelit botanical setting.</p>
            <div class="ds-hero-actions">
              <button type="button" class="ds-btn ds-btn-dining" onclick="DemoSitesEngine.scrollToSection('rest-reserve')">Reserve a Table Tonight →</button>
              <button type="button" class="ds-btn ds-btn-ghost" onclick="DemoSitesEngine.scrollToSection('rest-menu')">Explore Seasonal Menu ↓</button>
            </div>
            <div class="ds-hero-stats-row">
              <div class="ds-hero-stat">
                <span class="ds-stat-num">100%</span>
                <span class="ds-stat-txt">Handmade Pasta Daily</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">280+</span>
                <span class="ds-stat-txt">Curated Wine Cellar</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">4.9 ★</span>
                <span class="ds-stat-txt">580+ Guest Reviews</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Seasonal Food & Wine Menu -->
        <section class="ds-section" id="rest-menu">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#DC2626;">STAGIONALE 2026</span>
              <h2 class="ds-title">Artisan Dinner & Enoteca Menu</h2>
              <p class="ds-lead">Every course is hand-shaped and cooked to order over our olive-wood grill.</p>
            </div>

            <!-- Tab Switcher -->
            <div class="ds-filter-tabs" id="rest-menu-tabs">
              <button type="button" class="ds-filter-btn active" data-tab="antipasti">Antipasti & Crudo</button>
              <button type="button" class="ds-filter-btn" data-tab="primi">Primi (Handmade Pasta)</button>
              <button type="button" class="ds-filter-btn" data-tab="secondi">Woodfired Secondi</button>
              <button type="button" class="ds-filter-btn" data-tab="dolci">Dolci & Vini</button>
            </div>

            <!-- Menu Items Grid -->
            <div class="ds-menu-grid" id="rest-menu-container">
              <!-- Rendered via JS -->
            </div>
          </div>
        </section>

        <!-- Interactive Live Table Reservation Widget -->
        <section class="ds-section ds-bg-alt" id="rest-reserve">
          <div class="ds-container">
            <div class="ds-reservation-box">
              <div class="ds-reservation-header">
                <span class="ds-eyebrow" style="color:#DC2626;">ONLINE DINING RESERVATIONS</span>
                <h2>Book Your Table at Osteria Flora</h2>
                <p>Instant table availability for dinner service and weekend brunch.</p>
                <div class="ds-res-alert">✦ Only 3 tables remaining for 7:30 PM prime seating tonight.</div>
              </div>

              <form class="ds-reservation-form" onsubmit="event.preventDefault(); alert('Table Confirmed! We look forward to hosting you at Osteria Flora tonight.');">
                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Party Size</label>
                    <select class="ds-input">
                      <option>2 Guests (Standard Table)</option>
                      <option>4 Guests (Booth Seating)</option>
                      <option>6 Guests (Patio Garden)</option>
                      <option>8+ Guests (Chef's Tasting Room)</option>
                    </select>
                  </div>
                  <div class="ds-form-group">
                    <label>Dining Date</label>
                    <input type="date" class="ds-input" value="2026-08-20" required />
                  </div>
                </div>

                <div class="ds-form-group">
                  <label>Select Seating Time</label>
                  <div class="ds-time-chips">
                    <button type="button" class="ds-time-chip">5:30 PM</button>
                    <button type="button" class="ds-time-chip active">7:00 PM (Prime)</button>
                    <button type="button" class="ds-time-chip">8:30 PM</button>
                    <button type="button" class="ds-time-chip">9:45 PM</button>
                  </div>
                </div>

                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Guest Name</label>
                    <input type="text" class="ds-input" placeholder="e.g. Marco Rossi" required />
                  </div>
                  <div class="ds-form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="ds-input" placeholder="+1 (212) 555-8930" required />
                  </div>
                </div>

                <button type="submit" class="ds-btn ds-btn-dining" style="width:100%; margin-top:1rem;">Confirm Table Reservation →</button>
              </form>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="ds-footer" id="rest-hours">
          <div class="ds-container ds-footer-inner">
            <div class="ds-footer-brand">
              <span class="ds-footer-logo" style="color:#DC2626;">OSTERIA FLORA</span>
              <p>284 Bleecker Street, West Village, New York, NY 10014 · Dinner: 5PM–11PM Daily</p>
            </div>
            <div class="ds-footer-links">
              <span>© 2026 Osteria Flora LLC.</span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  // Demo 4: Apex Dental Care (Cosmetic & Family Dentistry)
  function renderDentalSite() {
    return `
      <div class="demo-site-wrapper site-dental" id="demo-site-dental">
        <!-- Emergency Hotline Topbar -->
        <div class="ds-top-alert" style="background:#0369A1;">
          <span>✦ Emergency 24/7 Hotline: +1 (800) 555-APEX · In-Network with Delta, MetLife, Cigna & Top 25 Insurers</span>
        </div>

        <!-- Sticky Header -->
        <header class="ds-header ds-dental-header">
          <div class="ds-container ds-header-inner">
            <div class="ds-logo">
              <span class="ds-logo-title" style="color:#0284C7; font-weight:800;">APEX DENTAL</span>
              <span class="ds-logo-sub" style="color:#0369A1;">COSMETIC & FAMILY DENTISTRY</span>
            </div>
            <nav class="ds-nav">
              <a href="#dent-quiz" class="ds-nav-link">Smile Quiz</a>
              <a href="#dent-treatments" class="ds-nav-link">Treatments</a>
              <a href="#dent-tech" class="ds-nav-link">3D Technology</a>
              <a href="#dent-booking" class="ds-nav-link">Book Scan</a>
            </nav>
            <div class="ds-header-cta">
              <button type="button" class="ds-btn ds-btn-dental" onclick="DemoSitesEngine.scrollToSection('dent-booking')">Book Free Scan</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="ds-hero" style="background: linear-gradient(rgba(10, 25, 40, 0.78), rgba(10, 25, 40, 0.88)), url('/assets/images/dental.jpg') center/cover no-repeat;">
          <div class="ds-container ds-hero-content">
            <div class="ds-badge" style="background: rgba(2, 132, 199, 0.25); color:#7DD3FC; border:1px solid rgba(2, 132, 199, 0.5);">✦ 3D DIGITAL DENTISTRY & INVISALIGN DIAMOND CLINIC</div>
            <h1 class="ds-hero-title">Gentle, High-Tech Dentistry for Your Healthiest Smile</h1>
            <p class="ds-hero-subtitle">Experience zero-anxiety dental care with radiation-free 3D iTero scans, same-day ceramic crowns, and discreet clear aligners with 0% financing.</p>
            <div class="ds-hero-actions">
              <button type="button" class="ds-btn ds-btn-dental" onclick="DemoSitesEngine.scrollToSection('dent-booking')">Claim Free 3D Smile Scan →</button>
              <button type="button" class="ds-btn ds-btn-ghost" onclick="DemoSitesEngine.scrollToSection('dent-quiz')">Take 60-Sec Smile Quiz ↓</button>
            </div>
            <div class="ds-hero-stats-row">
              <div class="ds-hero-stat">
                <span class="ds-stat-num">10,000+</span>
                <span class="ds-stat-txt">Smiles Transformed</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">0% APR</span>
                <span class="ds-stat-txt">Financing from $49/mo</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">100%</span>
                <span class="ds-stat-txt">Pain-Free Protocol</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Smile Assessment Quiz -->
        <section class="ds-section" id="dent-quiz">
          <div class="ds-container">
            <div class="ds-quiz-box">
              <div class="ds-section-header">
                <span class="ds-eyebrow" style="color:#0284C7;">INTERACTIVE SMILE ASSESSMENT</span>
                <h2 class="ds-title">Discover Your Smile Makeover Options</h2>
                <p class="ds-lead">Answer 2 quick questions to calculate your personalized treatment path & savings.</p>
              </div>

              <div class="ds-quiz-step-card" id="dent-quiz-step-1">
                <h4>1. What is your primary dental aspiration?</h4>
                <div class="ds-quiz-options">
                  <button type="button" class="ds-quiz-btn" onclick="DemoSitesEngine.handleDentalQuiz('invisalign')">
                    <strong>Discreet Straightening</strong>
                    <span>Invisalign clear aligners without metal brackets</span>
                  </button>
                  <button type="button" class="ds-quiz-btn" onclick="DemoSitesEngine.handleDentalQuiz('veneers')">
                    <strong>Radiant Porcelain Veneers</strong>
                    <span>Fix chips, gaps & deep discoloration permanently</span>
                  </button>
                  <button type="button" class="ds-quiz-btn" onclick="DemoSitesEngine.handleDentalQuiz('implants')">
                    <strong>Missing Tooth Replacement</strong>
                    <span>Permanent titanium implants & ceramic crowns</span>
                  </button>
                  <button type="button" class="ds-quiz-btn" onclick="DemoSitesEngine.handleDentalQuiz('cleaning')">
                    <strong>Gentle Checkup & Whitening</strong>
                    <span>Deep polish, laser whitening & exam</span>
                  </button>
                </div>
              </div>

              <div class="ds-quiz-result-card" id="dent-quiz-result" style="display:none;">
                <div class="ds-result-badge">✦ YOUR PERSONALIZED RECOMMENDATION</div>
                <h3 id="dent-result-title">Invisalign Diamond Plan</h3>
                <p id="dent-result-desc">Comprehensive clear aligner treatment with 3D digital simulation and complimentary professional teeth whitening.</p>
                <div class="ds-result-pricing">
                  <span>Estimated Investment: <strong>$49/mo (0% APR)</strong></span>
                  <span>Duration: <strong>4–9 Months</strong></span>
                </div>
                <button type="button" class="ds-btn ds-btn-dental" onclick="DemoSitesEngine.scrollToSection('dent-booking')">Claim Free 3D Scan & Simulation →</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Treatments Spectrum -->
        <section class="ds-section ds-bg-alt" id="dent-treatments">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#0284C7;">COMPREHENSIVE CARE</span>
              <h2 class="ds-title">State-of-the-Art Dental Treatments</h2>
            </div>

            <div class="ds-treatments-grid">
              <div class="ds-treatment-card">
                <div class="ds-t-icon">🦷</div>
                <h3>Invisalign Clear Aligners</h3>
                <p>Straighten teeth invisibly without metal wires. Custom 3D digital planning with progress scans every 6 weeks.</p>
              </div>

              <div class="ds-treatment-card">
                <div class="ds-t-icon">✨</div>
                <h3>Porcelain Veneers</h3>
                <p>Ultra-thin handcrafted ceramic laminates designed to create flawless symmetry, shade, and radiant proportion.</p>
              </div>

              <div class="ds-treatment-card">
                <div class="ds-t-icon">⚡</div>
                <h3>Same-Day Digital Crowns</h3>
                <p>Milled in-office in 45 minutes using CEREC 3D technology. No messy impressions or temporary crowns required.</p>
              </div>

              <div class="ds-treatment-card">
                <div class="ds-t-icon">🛡️</div>
                <h3>Gentle Family & Pediatric</h3>
                <p>Compassionate preventive cleanings, sealants, and cavity defense in a relaxing spa-like environment.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Booking Widget -->
        <section class="ds-section" id="dent-booking">
          <div class="ds-container">
            <div class="ds-booking-widget-box">
              <div class="ds-booking-header">
                <span class="ds-eyebrow" style="color:#0284C7;">APPOINTMENT SCHEDULER</span>
                <h2>Schedule Your Dental Visit</h2>
                <p>Complimentary 3D iTero smile scan included with all initial cosmetic consultations.</p>
              </div>

              <form class="ds-booking-form" onsubmit="event.preventDefault(); alert('Appointment Reserved! Apex Dental team will contact you to confirm insurance coverage.');">
                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Treatment Desired</label>
                    <select class="ds-input">
                      <option>Free 3D Smile Scan & Invisalign Consultation</option>
                      <option>Cosmetic Veneer Consultation</option>
                      <option>Routine Exam, X-Rays & Gentle Cleaning</option>
                      <option>Urgent / Emergency Dental Care</option>
                    </select>
                  </div>
                  <div class="ds-form-group">
                    <label>Insurance Provider</label>
                    <select class="ds-input">
                      <option>Delta Dental</option>
                      <option>Cigna Dental</option>
                      <option>MetLife</option>
                      <option>Guardian / Aetna</option>
                      <option>Self-Pay / 0% Financing</option>
                    </select>
                  </div>
                </div>

                <div class="ds-form-row">
                  <div class="ds-form-group">
                    <label>Your Name</label>
                    <input type="text" class="ds-input" placeholder="e.g. Dr. Nathan Brooks" required />
                  </div>
                  <div class="ds-form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="ds-input" placeholder="+1 (415) 555-0182" required />
                  </div>
                </div>

                <button type="submit" class="ds-btn ds-btn-dental" style="width:100%; margin-top:1rem;">Confirm Appointment Request →</button>
              </form>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="ds-footer">
          <div class="ds-container ds-footer-inner">
            <div class="ds-footer-brand">
              <span class="ds-footer-logo" style="color:#0284C7;">APEX DENTAL CLINIC</span>
              <p>550 Montgomery St, Suite 400, San Francisco, CA · ADA Member Practice</p>
            </div>
            <div class="ds-footer-links">
              <span>© 2026 Apex Dental Care.</span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  // Demo 5: Forge Athletics (Strength & Conditioning Gym)
  function renderGymSite() {
    return `
      <div class="demo-site-wrapper site-gym" id="demo-site-gym">
        <!-- Live Gym Capacity Bar -->
        <div class="ds-top-alert" style="background:#15803D;">
          <span>⚡ LIVE CAPACITY: 42% (Optimal Training Floor Space) · TODAY'S WOD: OLYMPIC METCON & DEADLIFTS</span>
        </div>

        <!-- Sticky Header -->
        <header class="ds-header ds-gym-header">
          <div class="ds-container ds-header-inner">
            <div class="ds-logo">
              <span class="ds-logo-title" style="color:#22C55E; font-weight:900; letter-spacing:0.08em;">FORGE ATHLETICS</span>
              <span class="ds-logo-sub" style="color:#86EFAC;">HIGH-PERFORMANCE CLUB</span>
            </div>
            <nav class="ds-nav">
              <a href="#gym-schedule" class="ds-nav-link">Timetable</a>
              <a href="#gym-pricing" class="ds-nav-link">Memberships</a>
              <a href="#gym-coaches" class="ds-nav-link">Coaches</a>
              <a href="#gym-pass" class="ds-nav-link">Free Pass</a>
            </nav>
            <div class="ds-header-cta">
              <button type="button" class="ds-btn ds-btn-gym" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Claim 1-Day Pass</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="ds-hero" style="background: linear-gradient(rgba(10, 16, 12, 0.78), rgba(10, 16, 12, 0.88)), url('/assets/images/gym.jpg') center/cover no-repeat;">
          <div class="ds-container ds-hero-content">
            <div class="ds-badge" style="background: rgba(34, 197, 94, 0.2); color:#4ADE80; border:1px solid rgba(34, 197, 94, 0.4);">✦ ELITE STRENGTH & HYROX CONDITIONING CLUB</div>
            <h1 class="ds-hero-title">Forge Your Peak Athletic Potential</h1>
            <p class="ds-hero-subtitle">18,000 sq ft of Olympic Eleiko lifting platforms, specialized Hyrox turf conditioning tracks, ice recovery plunges, and championship coaching.</p>
            <div class="ds-hero-actions">
              <button type="button" class="ds-btn ds-btn-gym" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Claim Free 1-Day Pass →</button>
              <button type="button" class="ds-btn ds-btn-ghost" onclick="DemoSitesEngine.scrollToSection('gym-schedule')">View Class Schedule ↓</button>
            </div>
            <div class="ds-hero-stats-row">
              <div class="ds-hero-stat">
                <span class="ds-stat-num">18,000</span>
                <span class="ds-stat-txt">Sq Ft Training Arena</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">85+</span>
                <span class="ds-stat-txt">Weekly Classes</span>
              </div>
              <div class="ds-hero-stat">
                <span class="ds-stat-num">14</span>
                <span class="ds-stat-txt">Certified CSCS Coaches</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Weekly Class Timetable -->
        <section class="ds-section" id="gym-schedule">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#22C55E;">TRAIN WITH INTENSITY</span>
              <h2 class="ds-title">Weekly Class Timetable</h2>
              <p class="ds-lead">Select your training day to view coaching slots, intensity levels, and open platforms.</p>
            </div>

            <!-- Day Selector -->
            <div class="ds-filter-tabs" id="gym-day-tabs">
              <button type="button" class="ds-filter-btn active" data-day="mon">Monday</button>
              <button type="button" class="ds-filter-btn" data-day="tue">Tuesday</button>
              <button type="button" class="ds-filter-btn" data-day="wed">Wednesday</button>
              <button type="button" class="ds-filter-btn" data-day="thu">Thursday</button>
              <button type="button" class="ds-filter-btn" data-day="fri">Friday</button>
              <button type="button" class="ds-filter-btn" data-day="sat">Saturday</button>
            </div>

            <!-- Class Schedule Table -->
            <div class="ds-schedule-table" id="gym-schedule-container">
              <!-- Rendered via JS -->
            </div>
          </div>
        </section>

        <!-- Membership Tiers Comparison Matrix -->
        <section class="ds-section ds-bg-alt" id="gym-pricing">
          <div class="ds-container">
            <div class="ds-section-header">
              <span class="ds-eyebrow" style="color:#22C55E;">MEMBERSHIP TIERS</span>
              <h2 class="ds-title">Transparent Monthly Plans</h2>
              <p class="ds-lead">No lock-in contracts. Full facility access with sauna and towel service included.</p>
            </div>

            <div class="ds-pricing-grid">
              <div class="ds-pricing-card">
                <h3>Open Gym Athlete</h3>
                <div class="ds-price">$79<span>/mo</span></div>
                <p>Full 24/7 access to Olympic lifting platforms, free weights, and cardio deck.</p>
                <ul class="ds-price-features">
                  <li>✓ 24/7 Facility Keycard Access</li>
                  <li>✓ Eleiko Olympic Platforms</li>
                  <li>✓ Locker & Steam Sauna Access</li>
                  <li>✕ Group Classes Excluded</li>
                </ul>
                <button type="button" class="ds-btn ds-btn-outline ds-btn-sm" style="width:100%;" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Join Open Gym</button>
              </div>

              <div class="ds-pricing-card featured">
                <div class="ds-card-badge">MOST POPULAR</div>
                <h3>Forge Unlimited</h3>
                <div class="ds-price">$139<span>/mo</span></div>
                <p>Unlimited group classes, Hyrox conditioning, and recovery plunge access.</p>
                <ul class="ds-price-features">
                  <li>✓ All Open Gym Privileges</li>
                  <li>✓ Unlimited Daily Group Classes</li>
                  <li>✓ Hyrox & Olympic Lifting Coaching</li>
                  <li>✓ Cold Plunge & Contrast Therapy</li>
                  <li>✓ InBody Body Composition Scans</li>
                </ul>
                <button type="button" class="ds-btn ds-btn-gym ds-btn-sm" style="width:100%;" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Get Unlimited Pass</button>
              </div>

              <div class="ds-pricing-card">
                <h3>VIP Elite Performance</h3>
                <div class="ds-price">$219<span>/mo</span></div>
                <p>Personalized programming with dedicated 1-on-1 monthly strength coaching.</p>
                <ul class="ds-price-features">
                  <li>✓ All Unlimited Features</li>
                  <li>✓ 2x Monthly 1-on-1 Coaching Sessions</li>
                  <li>✓ Custom Macro & Nutrition Plan</li>
                  <li>✓ Reserved Platform Priority Booking</li>
                </ul>
                <button type="button" class="ds-btn ds-btn-outline ds-btn-sm" style="width:100%;" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Join VIP Coaching</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 1-Day Free Trial Pass Generator -->
        <section class="ds-section" id="gym-pass">
          <div class="ds-container">
            <div class="ds-pass-box">
              <div class="ds-pass-content">
                <span class="ds-eyebrow" style="color:#22C55E;">TEST DRIVE OUR CLUB</span>
                <h2>Claim Your 1-Day VIP Training Pass</h2>
                <p>Experience our facility, attend any group class, and try our cold recovery plunges for free.</p>
                
                <form class="ds-pass-form" onsubmit="event.preventDefault(); alert('VIP Pass Issued! Check your SMS for your access QR code barcode.');">
                  <div class="ds-form-row">
                    <div class="ds-form-group">
                      <label>Athlete Name</label>
                      <input type="text" class="ds-input" placeholder="e.g. Alex Thorne" required />
                    </div>
                    <div class="ds-form-group">
                      <label>Mobile Number (For Pass SMS)</label>
                      <input type="tel" class="ds-input" placeholder="+1 (512) 555-0912" required />
                    </div>
                  </div>
                  <div class="ds-form-group">
                    <label>Preferred Visit Date</label>
                    <input type="date" class="ds-input" value="2026-08-20" required />
                  </div>
                  <button type="submit" class="ds-btn ds-btn-gym" style="width:100%; margin-top:1rem;">Generate Instant VIP Pass →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="ds-footer">
          <div class="ds-container ds-footer-inner">
            <div class="ds-footer-brand">
              <span class="ds-footer-logo" style="color:#22C55E;">FORGE ATHLETICS CLUB</span>
              <p>1200 Industrial Parkway, Austin, TX 78701 · Mon–Fri: 5AM–11PM · Sat–Sun: 7AM–9PM</p>
            </div>
            <div class="ds-footer-links">
              <span>© 2026 Forge Athletics LLC.</span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  // Dynamic Data & Interactive Controllers
  const SALON_DATA = {
    hair: [
      { name: 'French Dimensional Balayage', time: '2.5 hrs', price: '$285', desc: 'Hand-painted multi-tonal lightness with customized gloss toning and bond protection.' },
      { name: 'Precision Architecture Cut & Blowout', time: '60 mins', price: '$130', desc: 'Dry-cutting customized to face shape, includes scalp massage and styling.' },
      { name: 'Full Foil Highlights & Shadow Root', time: '2 hrs', price: '$240', desc: 'Maximum blonde saturation with melted seamless natural root transition.' },
      { name: 'Organic Keratin Smoothing Infusion', time: '3 hrs', price: '$340', desc: 'Eliminates 95% of frizz while maintaining natural body and glossy shine.' }
    ],
    skin: [
      { name: 'Signature Medical HydraFacial', time: '60 mins', price: '$195', desc: 'Vortex suction extraction, peptide infusion, and LED collagen light therapy.' },
      { name: 'Glass Skin Microneedling & Exosomes', time: '75 mins', price: '$310', desc: 'Stimulates elastin production with stem-cell growth factor serum.' },
      { name: '24K Gold Lift & Sculpt Facial', time: '90 mins', price: '$260', desc: 'Microcurrent facial toning paired with pure gold sheet firming treatment.' }
    ],
    bridal: [
      { name: 'VIP Bridal Couture Hair & Glow Makeup', time: '3 hrs', price: '$450', desc: 'Includes trial run, champagne concierge, veil placement and touch-up kit.' },
      { name: 'Bridesmaid Glow Package', time: '90 mins', price: '$180', desc: 'Curated styling and camera-ready soft glam aesthetic.' }
    ],
    laser: [
      { name: 'Gentle Laser Skin Resurfacing', time: '45 mins', price: '$350', desc: 'Corrects sun damage, hyperpigmentation, and fine texture with zero downtime.' },
      { name: 'Radiofrequency Skin Tightening', time: '60 mins', price: '$275', desc: 'Thermal collagen remodeling for jawline definition and neck smoothing.' }
    ]
  };

  const REST_DATA = {
    antipasti: [
      { name: 'Burrata Pugliese con Fichi', price: '$24', desc: 'Imported fresh burrata, caramelized black mission figs, aged Modena balsamic, grilled sourdough.' },
      { name: 'Carpaccio di Manzo Scottato', price: '$26', desc: 'Thinly sliced prime beef tenderloin, crispy capers, shaved 24-month Parmigiano, truffle aioli.' },
      { name: 'Polpo alla Griglia su Crema di Ceci', price: '$28', desc: 'Charred Mediterranean octopus, rosemary chickpea puree, pickled shallot, smoked paprika oil.' }
    ],
    primi: [
      { name: 'Tagliolini al Tartufo Nero Estivo', price: '$38', desc: 'Hand-rolled egg yolk pasta, alpine butter, freshly shaved Umbrian black winter truffles.' },
      { name: 'Pappardelle al Ragù di Cinghiale', price: '$34', desc: 'Slow-braised wild boar ragù, Chianti wine reduction, juniper berries, pecorino toscano.' },
      { name: 'Ravioli di Zucca e Amaretto', price: '$30', desc: 'Roasted butternut squash, brown butter sage emulsion, crushed amaretti cookie dust.' }
    ],
    secondi: [
      { name: 'Bistecca alla Fiorentina (Dry-Aged 45 Days)', price: '$68', desc: 'Woodfired T-bone steak over olive wood coals, rosemary sea salt, charred lemon.' },
      { name: 'Branzino Intero al Forno a Legna', price: '$46', desc: 'Whole Mediterranean sea bass roasted with caper berries, thyme, and roasted fennel.' }
    ],
    dolci: [
      { name: 'Tiramisù Tradizionale al Pistacchio', price: '$16', desc: 'Espresso-soaked savoiardi, Bronte pistachio mascarpone, Valrhona cocoa.' },
      { name: 'Torta Caprese al Cioccolato Fondente', price: '$15', desc: 'Flourless dark chocolate almond cake with fior di latte gelato.' }
    ]
  };

  const GYM_DATA = {
    mon: [
      { time: '06:00 AM', name: 'Metcon Conditioning & Engine Lab', coach: 'Coach Dave (CSCS)', intensity: '●●●●●', spots: '3 spots left' },
      { time: '09:00 AM', name: 'Olympic Weightlifting & Snatch PRs', coach: 'Coach Sarah', intensity: '●●●●○', spots: '5 spots left' },
      { time: '12:00 PM', name: 'Lunch Hour Express HIIT', coach: 'Coach Marcus', intensity: '●●●●○', spots: 'Open' },
      { time: '06:30 PM', name: 'Hyrox Competition Simulation', coach: 'Head Coach Dave', intensity: '●●●●●', spots: 'Filling Fast' }
    ],
    tue: [
      { time: '06:30 AM', name: 'Upper Body Hypertrophy & Shoulders', coach: 'Coach Elena', intensity: '●●●●○', spots: '4 spots left' },
      { time: '09:30 AM', name: 'Mobility, Foam Rolling & Core', coach: 'Coach Marcus', intensity: '●●○○○', spots: 'Open' },
      { time: '06:00 PM', name: 'Squat Heavy Day & Power Development', coach: 'Coach Dave', intensity: '●●●●●', spots: '2 spots left' }
    ],
    wed: [
      { time: '06:00 AM', name: 'Row & Ski-Erg Aerobic Threshold', coach: 'Coach Sarah', intensity: '●●●●●', spots: 'Open' },
      { time: '12:00 PM', name: 'Deadlift Technique & Posterior Chain', coach: 'Coach Dave', intensity: '●●●●○', spots: '6 spots left' },
      { time: '06:30 PM', name: 'Forge Team Metcon Challenge', coach: 'Coach Marcus', intensity: '●●●●●', spots: 'Filling Fast' }
    ],
    thu: [
      { time: '07:00 AM', name: 'Kettlebell Flow & Explosive Power', coach: 'Coach Elena', intensity: '●●●●○', spots: 'Open' },
      { time: '06:00 PM', name: 'Olympic Clean & Jerk Workshop', coach: 'Coach Sarah', intensity: '●●●●●', spots: '3 spots left' }
    ],
    fri: [
      { time: '06:00 AM', name: 'Friday Benchmark Hero WOD', coach: 'All Coaches', intensity: '●●●●●', spots: 'High Energy' },
      { time: '05:30 PM', name: 'Barbells & Beers Social Lift', coach: 'Coach Dave', intensity: '●●●○○', spots: 'Open' }
    ],
    sat: [
      { time: '08:00 AM', name: 'Saturday Community Partner Workout', coach: 'Head Coach Dave', intensity: '●●●●●', spots: '80+ Athletes' },
      { time: '10:30 AM', name: 'Hyrox Race Simulation (90 Mins)', coach: 'Coach Sarah', intensity: '●●●●●', spots: 'Registration Req' }
    ]
  };

  function bindInteractiveEvents() {
    // 1. Interior: Portfolio Filter Tabs
    const intTabs = document.querySelectorAll('#int-filter-tabs .ds-filter-btn');
    intTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        intTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        const cards = document.querySelectorAll('#int-portfolio-grid .ds-portfolio-card');
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-cat') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Interior: Material Chips
    const matChips = document.querySelectorAll('.ds-mat-chip');
    matChips.forEach(chip => {
      chip.addEventListener('click', () => {
        matChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const mat = chip.getAttribute('data-mat');
        const titleEl = document.getElementById('int-mat-title');
        const descEl = document.getElementById('int-mat-desc');
        const swatchEl = document.getElementById('int-mat-swatch');

        if (mat === 'travertine' && titleEl && descEl && swatchEl) {
          titleEl.textContent = 'Tivoli Roman Travertine';
          descEl.textContent = 'Unfilled, honed surface imported directly from Italian quarries. Infuses monolithic warmth and enduring geological character into fireplace mantels, kitchen islands, and floating vanity slabs.';
          swatchEl.style.backgroundImage = "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80')";
        } else if (mat === 'brass' && titleEl && descEl && swatchEl) {
          titleEl.textContent = 'Brushed Champagne Brass';
          descEl.textContent = 'Custom hand-finished architectural hardware and recessed linear insets that catch ambient light with soft metallic glow.';
          swatchEl.style.backgroundImage = "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80')";
        } else if (mat === 'oak' && titleEl && descEl && swatchEl) {
          titleEl.textContent = 'Smoked European White Oak';
          descEl.textContent = 'Deep brushed grain treated with natural organic matte oils for low-sheen organic flooring and fluted millwork.';
          swatchEl.style.backgroundImage = "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80')";
        } else if (mat === 'linen' && titleEl && descEl && swatchEl) {
          titleEl.textContent = 'Belgian Raw Heavy Linen';
          descEl.textContent = 'Breathable, tactile organic weave used for floor-to-ceiling drapery and sculptural low-slung lounge upholstery.';
          swatchEl.style.backgroundImage = "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80')";
        }
      });
    });

    // 2. Salon: Service Tabs
    const salTabs = document.querySelectorAll('#sal-service-tabs .ds-filter-btn');
    if (salTabs.length > 0) {
      renderSalonTab('hair');
      salTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          salTabs.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.getAttribute('data-tab');
          renderSalonTab(tab);
        });
      });
    }

    // 3. Restaurant: Menu Tabs
    const restTabs = document.querySelectorAll('#rest-menu-tabs .ds-filter-btn');
    if (restTabs.length > 0) {
      renderRestTab('antipasti');
      restTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          restTabs.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.getAttribute('data-tab');
          renderRestTab(tab);
        });
      });
    }

    // 4. Gym: Day Tabs
    const gymTabs = document.querySelectorAll('#gym-day-tabs .ds-filter-btn');
    if (gymTabs.length > 0) {
      renderGymDay('mon');
      gymTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          gymTabs.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const day = btn.getAttribute('data-day');
          renderGymDay(day);
        });
      });
    }

    // Time Chips selection
    document.querySelectorAll('.ds-time-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = chip.closest('.ds-time-chips');
        if (parent) {
          parent.querySelectorAll('.ds-time-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });
  }

  function renderSalonTab(tabKey) {
    const container = document.getElementById('sal-services-container');
    if (!container) return;
    const items = SALON_DATA[tabKey] || SALON_DATA.hair;
    container.innerHTML = items.map(item => `
      <div class="ds-service-card">
        <div class="ds-svc-header">
          <h4>${item.name}</h4>
          <span class="ds-svc-price">${item.price}</span>
        </div>
        <div class="ds-svc-duration">⏱ ${item.time}</div>
        <p class="ds-svc-desc">${item.desc}</p>
        <button type="button" class="ds-btn ds-btn-sm ds-btn-salon" style="margin-top:auto;" onclick="DemoSitesEngine.preselectSalonService('${item.name}')">Select & Book Service →</button>
      </div>
    `).join('');
  }

  function renderRestTab(tabKey) {
    const container = document.getElementById('rest-menu-container');
    if (!container) return;
    const items = REST_DATA[tabKey] || REST_DATA.antipasti;
    container.innerHTML = items.map(item => `
      <div class="ds-menu-item-card">
        <div class="ds-menu-top">
          <h4>${item.name}</h4>
          <span class="ds-menu-price">${item.price}</span>
        </div>
        <p class="ds-menu-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  function renderGymDay(dayKey) {
    const container = document.getElementById('gym-schedule-container');
    if (!container) return;
    const items = GYM_DATA[dayKey] || GYM_DATA.mon;
    container.innerHTML = items.map(item => `
      <div class="ds-schedule-row">
        <div class="ds-sched-time">${item.time}</div>
        <div class="ds-sched-class">
          <strong>${item.name}</strong>
          <span>${item.coach}</span>
        </div>
        <div class="ds-sched-intensity">
          <span>Intensity</span>
          <span style="color:#22C55E; letter-spacing:2px;">${item.intensity}</span>
        </div>
        <div class="ds-sched-spots">
          <span class="ds-spot-badge">${item.spots}</span>
        </div>
        <button type="button" class="ds-btn ds-btn-sm ds-btn-gym" onclick="DemoSitesEngine.scrollToSection('gym-pass')">Reserve Spot</button>
      </div>
    `).join('');
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function preselectStylist(name) {
    scrollToSection('sal-booking');
    const sel = document.getElementById('sal-selected-stylist');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.includes(name.split(' ')[0])) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
  }

  function preselectSalonService(name) {
    scrollToSection('sal-booking');
    const sel = document.getElementById('sal-selected-service');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.includes(name.substring(0, 10))) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
  }

  function handleDentalQuiz(type) {
    const step1 = document.getElementById('dent-quiz-step-1');
    const res = document.getElementById('dent-quiz-result');
    const title = document.getElementById('dent-result-title');
    const desc = document.getElementById('dent-result-desc');

    if (!res || !title || !desc) return;

    if (type === 'invisalign') {
      title.textContent = 'Invisalign Diamond Plan';
      desc.textContent = 'Discreet clear aligner treatment with 3D digital simulation and complimentary professional teeth whitening.';
    } else if (type === 'veneers') {
      title.textContent = 'Handcrafted Porcelain Veneers';
      desc.textContent = 'Custom ultra-thin ceramic shells crafted to permanently refine symmetry, shade, and radiant proportion.';
    } else if (type === 'implants') {
      title.textContent = 'Titanium Implant & 3D Ceramic Crown';
      desc.textContent = 'Permanent tooth replacement designed to restore 100% natural bite strength and aesthetics.';
    } else {
      title.textContent = 'Gentle Preventive Polish & Laser Glow';
      desc.textContent = 'Ultrasonic gentle cleaning, digital caries scan, and in-office LED enamel whitening.';
    }

    if (step1) step1.style.display = 'none';
    res.style.display = 'block';
  }

  return {
    renderInteriorSite,
    renderSalonSite,
    renderRestaurantSite,
    renderDentalSite,
    renderGymSite,
    bindInteractiveEvents,
    scrollToSection,
    preselectStylist,
    preselectSalonService,
    handleDentalQuiz
  };
})();
