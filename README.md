# Local Business Website Demo Funnel & Lead CRM

A high-converting, luxury-styled freelance web design lead generation funnel and real-time CRM lead management system for **Udit Das**.

---

## 🚀 Live Features Overview

### 1. High-Converting Landing Page & Portfolio Funnel
- **Hero & Value Proposition**: Clear messaging targeted at local business owners (Interior Designers, Salons, Restaurants, Dental Clinics, Gyms, etc.).
- **Interactive Full-Site Demos**: Immersive full-screen luxury previews, device toggles (Desktop/Tablet/Mobile), live URL links, and feature callouts.
- **Conversion Flow**: Seamless jump from demo inspection directly to free website concept request.
- **Privacy & Terms**: Production-ready legal and transparency policies.

### 2. Robust Lead Capture & Validation
- **Client Form**: Captures name, business name, business type, requirement, WhatsApp phone number, optional current website URL, and custom message.
- **Honeypot Anti-Spam**: Invisible field `_hp_website_contact` to filter bots silently.
- **Marketing Attribution**: Captures source, referrer, and UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`).
- **Dynamic WhatsApp Actions**: Pre-fills messages with client's business name and inquiry details.

### 3. Real Lead Storage & Database
- **PostgreSQL / Relational Support**: Connect to any PostgreSQL instance (AWS RDS, Supabase, Neon, Railway, Cloud SQL, Hostinger VPS) via `DATABASE_URL`.
- **Local Fallback Mode**: If `DATABASE_URL` is not provided, automatically persists structured records to `/data/leads_storage.json` without failing.
- **Lead Lifecycle Management**: Tracks lead status through defined pipeline stages:
  `NEW` &rarr; `CONTACTED` &rarr; `QUALIFIED` &rarr; `PREVIEW_CREATED` &rarr; `PROPOSAL_SENT` &rarr; `WON` / `LOST`.

### 4. Secure Admin CRM Dashboard
- **Access Route**: `/admin/` (or `/admin/login/` when unauthenticated).
- **Default Credentials**:
  - **Email**: `admin@uditdas.com`
  - **Password**: `AdminSecret2026!`
- **Capabilities**:
  - **Metrics Overview**: Real-time counter of total leads, new enquiries, contacted, qualified, proposals, won deals, and win rate %.
  - **Pipeline Funnel**: Visual progression of leads through stages.
  - **Industry Breakdown**: Volume distribution across business types.
  - **Leads Table**: Search by query, filter by status pills, filter by industry, and pagination.
  - **Slide-over Lead Drawer**: Complete customer details, full UTM marketing attribution, direct WhatsApp follow-up action, and interactive status changer.
  - **Internal Private Notes**: Add confidential follow-up logs, call summaries, and price quotes.
  - **CSV Export**: Download complete RFC-4180 compliant CSV of all captured leads.

### 5. Email Notifications (Optional SMTP)
- Sends HTML email notification upon every new lead submission when SMTP environment variables are configured.

---

## 🛠️ Environment Configuration

Create a `.env` file (or set variables in your cloud hosting provider):

```env
# Optional: PostgreSQL Connection
DATABASE_URL="postgresql://user:password@hostname:5432/dbname"

# Admin Authentication
ADMIN_EMAIL="admin@uditdas.com"
ADMIN_PASSWORD="AdminSecret2026!"
SESSION_SECRET="your_custom_jwt_secret_key_here"

# SMTP Email Notifications (Optional)
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_USER="postmaster@yourdomain.com"
EMAIL_PASSWORD="your_smtp_password"
NOTIFICATION_EMAIL="udit.windows8@gmail.com"

# WhatsApp Contact
WHATSAPP_PHONE_NUMBER="919753859045"
```

---

## 📦 Deployment Instructions

### Hostinger VPS / Ubuntu / Docker / Node.js
1. Clone this repository.
2. Run `npm install`.
3. Set your environment variables in `.env`.
4. Run `npm run build`.
5. Start the server with `npm start` (or manage with PM2: `pm2 start dist/server.cjs --name "lead-funnel"`).
6. Set up an Nginx reverse proxy routing port 80/443 to `http://127.0.0.1:3000`.

### Render / Railway
1. Set the build command to `npm run build`.
2. Set the start command to `npm start`.
3. Provide your environment variables in the dashboard.
