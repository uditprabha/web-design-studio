import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import { initDatabase } from './backend/database/db.ts';
import { requireAdminAuth } from './backend/middleware/auth.ts';
import { createRateLimiter } from './backend/middleware/rateLimit.ts';
import {
  submitLead,
  getLeadsList,
  getSingleLead,
  updateLeadStatus,
  createNote,
  getLeadNotesList,
  getCRMStats,
  exportCSV,
} from './backend/controllers/leadsController.ts';
import { loginAdmin, logoutAdmin, getAdminMe } from './backend/controllers/adminController.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB
  await initDatabase();

  // Basic Middlewares
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // Rate limiters
  const leadSubmitLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many lead submissions from this network. Please try again in a few minutes or chat on WhatsApp.',
  });

  const adminLoginLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: 'Too many login attempts. Please try again in 15 minutes.',
  });

  // Robots.txt Route
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /admin/\nDisallow: /admin\nDisallow: /api/\n');
  });

  // ==========================================
  // Public API Endpoints
  // ==========================================
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Lead capture endpoint
  app.post('/api/leads', leadSubmitLimiter, submitLead);

  // Admin authentication endpoints
  app.post('/api/admin/login', adminLoginLimiter, loginAdmin);
  app.post('/api/admin/logout', logoutAdmin);

  // ==========================================
  // Protected Admin CRM Endpoints
  // ==========================================
  app.get('/api/admin/me', requireAdminAuth, getAdminMe);
  app.get('/api/admin/stats', requireAdminAuth, getCRMStats);
  app.get('/api/admin/export', requireAdminAuth, exportCSV);

  app.get('/api/leads', requireAdminAuth, getLeadsList);
  app.get('/api/leads/:id', requireAdminAuth, getSingleLead);
  app.patch('/api/leads/:id', requireAdminAuth, updateLeadStatus);

  app.get('/api/leads/:id/notes', requireAdminAuth, getLeadNotesList);
  app.post('/api/leads/:id/notes', requireAdminAuth, createNote);

  // ==========================================
  // Frontend Serving (Vite dev or Static dist)
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // Check if requesting an html file specifically
      if (req.path.startsWith('/admin/login')) {
        res.sendFile(path.join(distPath, 'admin/login/index.html'));
      } else if (req.path.startsWith('/admin')) {
        res.sendFile(path.join(distPath, 'admin/index.html'));
      } else if (req.path.startsWith('/privacy')) {
        res.sendFile(path.join(distPath, 'privacy/index.html'));
      } else if (req.path.startsWith('/terms')) {
        res.sendFile(path.join(distPath, 'terms/index.html'));
      } else if (req.path.startsWith('/thank-you')) {
        res.sendFile(path.join(distPath, 'thank-you/index.html'));
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
