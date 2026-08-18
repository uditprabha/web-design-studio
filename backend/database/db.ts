import pg from 'pg';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PREVIEW_CREATED'
  | 'PROPOSAL_SENT'
  | 'WON'
  | 'LOST';

export interface Lead {
  id: string;
  name: string;
  business_name: string;
  business_type: string;
  whatsapp: string;
  current_website?: string | null;
  requirement?: string | null;
  message?: string | null;
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  landing_page?: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  note: string;
  author: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  last_login?: string | null;
}

let pool: pg.Pool | null = null;
let usePostgres = false;

// Local fallback storage path
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'leads_storage.json');

interface LocalStorageData {
  leads: Lead[];
  notes: LeadNote[];
  admin: AdminUser[];
}

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const defaultPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'AdminSecret2026!', 10);
    const initialData: LocalStorageData = {
      leads: [
        {
          id: 'lead_seed_001',
          name: 'Sarah Jenkins',
          business_name: 'Luxe Haven Interiors',
          business_type: 'Interior Design',
          whatsapp: '+1 (555) 234-8901',
          current_website: 'https://luxehaven.example.com',
          requirement: 'Website Redesign',
          message: 'Looking to upgrade our current portfolio site into a high-end conversion funnel for residential design clients.',
          source: 'facebook',
          utm_source: 'facebook',
          utm_medium: 'paid_social',
          utm_campaign: 'interior_demo_ads',
          utm_content: 'ad_lux_01',
          utm_term: 'luxury interior web design',
          landing_page: '/#industry-selector',
          status: 'NEW',
          created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
          id: 'lead_seed_002',
          name: 'Dr. Marcus Vance',
          business_name: 'Apex Dental Care',
          business_type: 'Dental Clinic',
          whatsapp: '+1 (555) 876-5432',
          current_website: null,
          requirement: 'New Website',
          message: 'Opening a new modern cosmetic clinic next month. Need fast appointment booking integration.',
          source: 'instagram',
          utm_source: 'instagram',
          utm_medium: 'paid_social',
          utm_campaign: 'dental_funnel_campaign',
          utm_content: 'video_story_02',
          utm_term: 'dental website designer',
          landing_page: '/#industry-selector',
          status: 'CONTACTED',
          created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 20).toISOString(),
        },
        {
          id: 'lead_seed_003',
          name: 'Elena Rostova',
          business_name: 'Aura Hair & Day Spa',
          business_type: 'Salon & Beauty',
          whatsapp: '+1 (555) 432-1098',
          current_website: 'https://aurasalon.example.com',
          requirement: 'Website Upgrade',
          message: 'Want to showcase our stylists and allow easy Instagram DM / WhatsApp booking.',
          source: 'direct',
          utm_source: null,
          utm_medium: null,
          utm_campaign: null,
          utm_content: null,
          utm_term: null,
          landing_page: '/',
          status: 'QUALIFIED',
          created_at: new Date(Date.now() - 3600000 * 52).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
        },
        {
          id: 'lead_seed_004',
          name: 'Chef Antonio Rossi',
          business_name: 'Trattoria Bella Vista',
          business_type: 'Restaurant & Café',
          whatsapp: '+1 (555) 321-9876',
          current_website: null,
          requirement: 'New Website',
          message: 'Need an online table reservation menu website with luxury aesthetic.',
          source: 'google',
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: 'restaurant_web_design',
          utm_content: 'search_ad_01',
          utm_term: 'restaurant website designer',
          landing_page: '/#industry-selector',
          status: 'PROPOSAL_SENT',
          created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        }
      ],
      notes: [
        {
          id: 'note_seed_001',
          lead_id: 'lead_seed_002',
          note: 'Called on WhatsApp. Dr. Marcus Vance is available Thursday 3 PM for concept review.',
          author: 'Udit Das',
          created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
        },
        {
          id: 'note_seed_002',
          lead_id: 'lead_seed_004',
          note: 'Sent comprehensive proposal ($1,450) with 3-day turnaround. Awaiting confirmation.',
          author: 'Udit Das',
          created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        }
      ],
      admin: [
        {
          id: 'admin_001',
          email: (process.env.ADMIN_EMAIL || 'admin@uditdas.com').toLowerCase(),
          password_hash: defaultPasswordHash,
          name: 'Udit Das',
          created_at: new Date().toISOString(),
          last_login: null,
        }
      ]
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readLocalStorage(): LocalStorageData {
  ensureDataDirectory();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local storage data file:', err);
    return { leads: [], notes: [], admin: [] };
  }
}

function writeLocalStorage(data: LocalStorageData): void {
  ensureDataDirectory();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local storage data file:', err);
  }
}

export async function initDatabase(): Promise<void> {
  ensureDataDirectory();

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      pool = new Pool({
        connectionString: dbUrl,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      });

      // Test connection
      const client = await pool.connect();
      usePostgres = true;
      console.log('Connected successfully to PostgreSQL database.');

      // Initialize schema if not present
      await client.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          business_name VARCHAR(255) NOT NULL,
          business_type VARCHAR(100) NOT NULL,
          whatsapp VARCHAR(50) NOT NULL,
          current_website VARCHAR(255),
          requirement VARCHAR(100) DEFAULT 'New Website',
          message TEXT,
          source VARCHAR(100) DEFAULT 'direct',
          utm_source VARCHAR(100),
          utm_medium VARCHAR(100),
          utm_campaign VARCHAR(100),
          utm_content VARCHAR(100),
          utm_term VARCHAR(100),
          landing_page VARCHAR(255),
          status VARCHAR(50) NOT NULL DEFAULT 'NEW',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS lead_notes (
          id VARCHAR(64) PRIMARY KEY,
          lead_id VARCHAR(64) NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
          note TEXT NOT NULL,
          author VARCHAR(255) DEFAULT 'Udit Das',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS admin_users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(255) DEFAULT 'Udit Das',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP WITH TIME ZONE
        );

        CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
        CREATE INDEX IF NOT EXISTS idx_leads_business_type ON leads(business_type);
        CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
      `);

      // Ensure default admin exists
      const adminEmail = (process.env.ADMIN_EMAIL || 'admin@uditdas.com').toLowerCase();
      const adminCheck = await client.query('SELECT id FROM admin_users WHERE email = $1', [adminEmail]);
      if (adminCheck.rows.length === 0) {
        const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'AdminSecret2026!', 10);
        await client.query(
          'INSERT INTO admin_users (id, email, password_hash, name) VALUES ($1, $2, $3, $4)',
          ['admin_' + crypto.randomBytes(4).toString('hex'), adminEmail, hash, 'Udit Das']
        );
      }

      client.release();
    } catch (err) {
      console.warn('PostgreSQL connection attempt failed. Falling back to local persistent store:', (err as Error).message);
      usePostgres = false;
      pool = null;
    }
  } else {
    console.log('No DATABASE_URL configured. Operating on local file-persisted storage.');
    usePostgres = false;
  }
}

export async function createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
  const id = 'lead_' + Date.now().toString(36) + '_' + crypto.randomBytes(3).toString('hex');
  const now = new Date().toISOString();

  const newLead: Lead = {
    ...leadData,
    id,
    status: leadData.status || 'NEW',
    created_at: now,
    updated_at: now,
  };

  if (usePostgres && pool) {
    const query = `
      INSERT INTO leads (
        id, name, business_name, business_type, whatsapp, current_website, requirement,
        message, source, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
        landing_page, status, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) RETURNING *
    `;
    const values = [
      newLead.id,
      newLead.name,
      newLead.business_name,
      newLead.business_type,
      newLead.whatsapp,
      newLead.current_website || null,
      newLead.requirement || 'New Website',
      newLead.message || null,
      newLead.source || 'direct',
      newLead.utm_source || null,
      newLead.utm_medium || null,
      newLead.utm_campaign || null,
      newLead.utm_content || null,
      newLead.utm_term || null,
      newLead.landing_page || '/',
      newLead.status,
      newLead.created_at,
      newLead.updated_at,
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
  } else {
    const store = readLocalStorage();
    store.leads.unshift(newLead);
    writeLocalStorage(store);
    return newLead;
  }
}

export interface GetLeadsOptions {
  page?: number;
  limit?: number;
  status?: string;
  businessType?: string;
  search?: string;
}

export async function getLeads(options: GetLeadsOptions = {}): Promise<{
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(options.limit) || 20));
  const offset = (page - 1) * limit;

  if (usePostgres && pool) {
    const conditions: string[] = [];
    const values: any[] = [];
    let valIndex = 1;

    if (options.status && options.status !== 'ALL') {
      conditions.push(`status = $${valIndex++}`);
      values.push(options.status);
    }

    if (options.businessType && options.businessType !== 'ALL') {
      conditions.push(`business_type = $${valIndex++}`);
      values.push(options.businessType);
    }

    if (options.search && options.search.trim()) {
      const term = `%${options.search.trim()}%`;
      conditions.push(`(name ILIKE $${valIndex} OR business_name ILIKE $${valIndex} OR whatsapp ILIKE $${valIndex} OR requirement ILIKE $${valIndex})`);
      values.push(term);
      valIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Count total
    const countRes = await pool.query(`SELECT COUNT(*) FROM leads ${whereClause}`, values);
    const total = parseInt(countRes.rows[0].count, 10);

    // Fetch page
    const query = `
      SELECT * FROM leads 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${valIndex++} OFFSET $${valIndex++}
    `;
    const pageValues = [...values, limit, offset];
    const res = await pool.query(query, pageValues);

    return {
      leads: res.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  } else {
    const store = readLocalStorage();
    let filtered = [...store.leads];

    if (options.status && options.status !== 'ALL') {
      filtered = filtered.filter((l) => l.status === options.status);
    }

    if (options.businessType && options.businessType !== 'ALL') {
      filtered = filtered.filter((l) => l.business_type.toLowerCase() === options.businessType?.toLowerCase());
    }

    if (options.search && options.search.trim()) {
      const q = options.search.trim().toLowerCase();
      filtered = filtered.filter((l) =>
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.business_name && l.business_name.toLowerCase().includes(q)) ||
        (l.whatsapp && l.whatsapp.toLowerCase().includes(q)) ||
        (l.requirement && l.requirement.toLowerCase().includes(q))
      );
    }

    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      leads: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }
}

export async function getLeadById(id: string): Promise<{ lead: Lead; notes: LeadNote[] } | null> {
  if (usePostgres && pool) {
    const leadRes = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (leadRes.rows.length === 0) return null;

    const notesRes = await pool.query('SELECT * FROM lead_notes WHERE lead_id = $1 ORDER BY created_at DESC', [id]);
    return {
      lead: leadRes.rows[0],
      notes: notesRes.rows,
    };
  } else {
    const store = readLocalStorage();
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) return null;

    const notes = store.notes.filter((n) => n.lead_id === id).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return { lead, notes };
  }
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const now = new Date().toISOString();

  if (usePostgres && pool) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, val] of Object.entries(updates)) {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${idx++}`);
        values.push(val);
      }
    }

    if (fields.length === 0) {
      const res = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
      return res.rows[0] || null;
    }

    fields.push(`updated_at = $${idx++}`);
    values.push(now);
    values.push(id);

    const query = `UPDATE leads SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
  } else {
    const store = readLocalStorage();
    const index = store.leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updated: Lead = {
      ...store.leads[index],
      ...updates,
      id,
      created_at: store.leads[index].created_at,
      updated_at: now,
    };

    store.leads[index] = updated;
    writeLocalStorage(store);
    return updated;
  }
}

export async function addLeadNote(leadId: string, noteText: string, author = 'Udit Das'): Promise<LeadNote> {
  const id = 'note_' + Date.now().toString(36) + '_' + crypto.randomBytes(3).toString('hex');
  const now = new Date().toISOString();

  const note: LeadNote = {
    id,
    lead_id: leadId,
    note: noteText,
    author,
    created_at: now,
  };

  if (usePostgres && pool) {
    const res = await pool.query(
      'INSERT INTO lead_notes (id, lead_id, note, author, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [note.id, note.lead_id, note.note, note.author, note.created_at]
    );
    return res.rows[0];
  } else {
    const store = readLocalStorage();
    store.notes.unshift(note);
    writeLocalStorage(store);
    return note;
  }
}

export async function getLeadNotes(leadId: string): Promise<LeadNote[]> {
  if (usePostgres && pool) {
    const res = await pool.query('SELECT * FROM lead_notes WHERE lead_id = $1 ORDER BY created_at DESC', [leadId]);
    return res.rows;
  } else {
    const store = readLocalStorage();
    return store.notes.filter((n) => n.lead_id === leadId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export interface CRMStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  previewCreated: number;
  proposalSent: number;
  won: number;
  lost: number;
  byBusinessType: Record<string, number>;
  bySource: Record<string, number>;
}

export async function getStats(): Promise<CRMStats> {
  if (usePostgres && pool) {
    const totalRes = await pool.query('SELECT COUNT(*) FROM leads');
    const total = parseInt(totalRes.rows[0].count, 10);

    const statusRes = await pool.query('SELECT status, COUNT(*) as count FROM leads GROUP BY status');
    const statusCounts: Record<string, number> = {};
    for (const row of statusRes.rows) {
      statusCounts[row.status] = parseInt(row.count, 10);
    }

    const typeRes = await pool.query('SELECT business_type, COUNT(*) as count FROM leads GROUP BY business_type ORDER BY count DESC');
    const byBusinessType: Record<string, number> = {};
    for (const row of typeRes.rows) {
      byBusinessType[row.business_type] = parseInt(row.count, 10);
    }

    const sourceRes = await pool.query('SELECT COALESCE(source, \'direct\') as source, COUNT(*) as count FROM leads GROUP BY source');
    const bySource: Record<string, number> = {};
    for (const row of sourceRes.rows) {
      bySource[row.source] = parseInt(row.count, 10);
    }

    return {
      total,
      new: statusCounts['NEW'] || 0,
      contacted: statusCounts['CONTACTED'] || 0,
      qualified: statusCounts['QUALIFIED'] || 0,
      previewCreated: statusCounts['PREVIEW_CREATED'] || 0,
      proposalSent: statusCounts['PROPOSAL_SENT'] || 0,
      won: statusCounts['WON'] || 0,
      lost: statusCounts['LOST'] || 0,
      byBusinessType,
      bySource,
    };
  } else {
    const store = readLocalStorage();
    const leads = store.leads;

    const stats: CRMStats = {
      total: leads.length,
      new: 0,
      contacted: 0,
      qualified: 0,
      previewCreated: 0,
      proposalSent: 0,
      won: 0,
      lost: 0,
      byBusinessType: {},
      bySource: {},
    };

    for (const lead of leads) {
      if (lead.status === 'NEW') stats.new++;
      else if (lead.status === 'CONTACTED') stats.contacted++;
      else if (lead.status === 'QUALIFIED') stats.qualified++;
      else if (lead.status === 'PREVIEW_CREATED') stats.previewCreated++;
      else if (lead.status === 'PROPOSAL_SENT') stats.proposalSent++;
      else if (lead.status === 'WON') stats.won++;
      else if (lead.status === 'LOST') stats.lost++;

      const bType = lead.business_type || 'Other';
      stats.byBusinessType[bType] = (stats.byBusinessType[bType] || 0) + 1;

      const src = lead.source || 'direct';
      stats.bySource[src] = (stats.bySource[src] || 0) + 1;
    }

    return stats;
  }
}

export async function getAllLeadsForExport(options: { status?: string; businessType?: string; search?: string } = {}): Promise<Lead[]> {
  if (usePostgres && pool) {
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (options.status && options.status !== 'ALL') {
      conditions.push(`status = $${idx++}`);
      values.push(options.status);
    }
    if (options.businessType && options.businessType !== 'ALL') {
      conditions.push(`business_type = $${idx++}`);
      values.push(options.businessType);
    }
    if (options.search && options.search.trim()) {
      const term = `%${options.search.trim()}%`;
      conditions.push(`(name ILIKE $${idx} OR business_name ILIKE $${idx} OR whatsapp ILIKE $${idx})`);
      values.push(term);
      idx++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const res = await pool.query(`SELECT * FROM leads ${whereClause} ORDER BY created_at DESC`, values);
    return res.rows;
  } else {
    const store = readLocalStorage();
    let leads = [...store.leads];

    if (options.status && options.status !== 'ALL') {
      leads = leads.filter((l) => l.status === options.status);
    }
    if (options.businessType && options.businessType !== 'ALL') {
      leads = leads.filter((l) => l.business_type.toLowerCase() === options.businessType?.toLowerCase());
    }
    if (options.search && options.search.trim()) {
      const q = options.search.trim().toLowerCase();
      leads = leads.filter((l) =>
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.business_name && l.business_name.toLowerCase().includes(q)) ||
        (l.whatsapp && l.whatsapp.toLowerCase().includes(q))
      );
    }

    leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return leads;
  }
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (usePostgres && pool) {
    const res = await pool.query('SELECT * FROM admin_users WHERE email = $1', [cleanEmail]);
    return res.rows[0] || null;
  } else {
    const store = readLocalStorage();
    const admin = store.admin.find((a) => a.email.toLowerCase() === cleanEmail);
    if (!admin && cleanEmail === (process.env.ADMIN_EMAIL || 'admin@uditdas.com').toLowerCase()) {
      const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'AdminSecret2026!', 10);
      const newAdmin: AdminUser = {
        id: 'admin_default',
        email: cleanEmail,
        password_hash: hash,
        name: 'Udit Das',
        created_at: new Date().toISOString(),
        last_login: null,
      };
      store.admin.push(newAdmin);
      writeLocalStorage(store);
      return newAdmin;
    }
    return admin || null;
  }
}

export async function updateAdminLastLogin(adminId: string): Promise<void> {
  const now = new Date().toISOString();
  if (usePostgres && pool) {
    await pool.query('UPDATE admin_users SET last_login = $1 WHERE id = $2', [now, adminId]);
  } else {
    const store = readLocalStorage();
    const admin = store.admin.find((a) => a.id === adminId);
    if (admin) {
      admin.last_login = now;
      writeLocalStorage(store);
    }
  }
}
