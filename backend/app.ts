import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { initDatabase } from './database/db.ts';
import { requireAdminAuth } from './middleware/auth.ts';
import { createRateLimiter } from './middleware/rateLimit.ts';
import {
  submitLead,
  getLeadsList,
  getSingleLead,
  updateLeadStatus,
  createNote,
  getLeadNotesList,
  getCRMStats,
  exportCSV,
} from './controllers/leadsController.ts';
import { loginAdmin, logoutAdmin, getAdminMe } from './controllers/adminController.ts';

dotenv.config();

let dbInitialized = false;
export async function ensureDbReady() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export function createExpressApp() {
  const app = express();

  // Basic Middlewares
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // Ensure DB ready on requests
  app.use(async (req, res, next) => {
    try {
      await ensureDbReady();
      next();
    } catch (err) {
      console.error('Database initialization error:', err);
      next();
    }
  });

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

  return app;
}
