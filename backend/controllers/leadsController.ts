import { Request, Response } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  addLeadNote,
  getLeadNotes,
  getStats,
  getAllLeadsForExport,
  LeadStatus,
} from '../database/db.ts';
import { sendLeadNotificationEmail } from '../services/notifications.ts';

// Helper to sanitize strings
function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

const VALID_STATUSES: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PREVIEW_CREATED',
  'PROPOSAL_SENT',
  'WON',
  'LOST',
];

export async function submitLead(req: Request, res: Response) {
  try {
    const body = req.body || {};

    // 1. Honeypot check
    if (body._hp_website_contact && body._hp_website_contact.trim() !== '') {
      console.warn('[Spam Filter] Honeypot field triggered. Discarding submission.');
      return res.status(200).json({
        success: true,
        leadId: 'lead_verified',
      });
    }

    // 2. Validate mandatory fields
    const name = sanitize(body.name);
    const businessName = sanitize(body.businessName || body.business_name);
    const businessType = sanitize(body.businessType || body.business_type);
    const whatsapp = sanitize(body.whatsapp);

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your full name (minimum 2 characters).',
      });
    }

    if (!businessName || businessName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your business name.',
      });
    }

    if (!businessType) {
      return res.status(400).json({
        success: false,
        error: 'Please select your industry/business type.',
      });
    }

    if (!whatsapp || whatsapp.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid WhatsApp phone number.',
      });
    }

    // Clean optional fields
    const currentWebsite = sanitize(body.currentWebsite || body.current_website) || null;
    const requirement = sanitize(body.requirement) || 'New Website';
    const message = sanitize(body.message) || null;

    // Attribution
    let source = sanitize(body.source) || 'direct';
    const utmSource = sanitize(body.utm_source) || null;
    const utmMedium = sanitize(body.utm_medium) || null;
    const utmCampaign = sanitize(body.utm_campaign) || null;
    const utmContent = sanitize(body.utm_content) || null;
    const utmTerm = sanitize(body.utm_term) || null;
    const landingPage = sanitize(body.landingPage || body.landing_page) || '/';

    if (utmSource) {
      source = utmSource.toLowerCase();
    }

    const lead = await createLead({
      name,
      business_name: businessName,
      business_type: businessType,
      whatsapp,
      current_website: currentWebsite,
      requirement,
      message,
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      landing_page: landingPage,
      status: 'NEW',
    });

    // Send async email notification (non-blocking)
    sendLeadNotificationEmail(lead).catch((err) => {
      console.error('Async notification error:', err);
    });

    return res.status(201).json({
      success: true,
      leadId: lead.id,
      message: 'Your website concept request has been received successfully.',
    });
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request. Please try again or message on WhatsApp.',
    });
  }
}

export async function getLeadsList(req: Request, res: Response) {
  try {
    const { page, limit, status, businessType, search } = req.query;

    const result = await getLeads({
      page: page ? parseInt(String(page), 10) : 1,
      limit: limit ? parseInt(String(limit), 10) : 20,
      status: status ? String(status) : undefined,
      businessType: businessType ? String(businessType) : undefined,
      search: search ? String(search) : undefined,
    });

    return res.json({
      success: true,
      data: result.leads,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (err: any) {
    console.error('Error fetching leads:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve leads from database.',
    });
  }
}

export async function getSingleLead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await getLeadById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID '${id}' was not found.`,
      });
    }

    return res.json({
      success: true,
      data: result.lead,
      notes: result.notes,
    });
  } catch (err: any) {
    console.error('Error fetching single lead:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve lead details.',
    });
  }
}

export async function updateLeadStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const updates: any = {};

    if (body.status) {
      const statusUpper = String(body.status).toUpperCase() as LeadStatus;
      if (!VALID_STATUSES.includes(statusUpper)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status '${body.status}'. Allowed values: ${VALID_STATUSES.join(', ')}`,
        });
      }
      updates.status = statusUpper;
    }

    if (body.requirement) updates.requirement = sanitize(body.requirement);
    if (body.message !== undefined) updates.message = sanitize(body.message);
    if (body.current_website !== undefined) updates.current_website = sanitize(body.current_website);

    const updated = await updateLead(id, updates);

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID '${id}' was not found.`,
      });
    }

    return res.json({
      success: true,
      data: updated,
      message: 'Lead updated successfully.',
    });
  } catch (err: any) {
    console.error('Error updating lead:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to update lead.',
    });
  }
}

export async function createNote(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { note, author } = req.body || {};

    if (!note || sanitize(note).length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Note content cannot be empty.',
      });
    }

    // Verify lead exists
    const leadData = await getLeadById(id);
    if (!leadData) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID '${id}' was not found.`,
      });
    }

    const newNote = await addLeadNote(id, sanitize(note), sanitize(author) || 'Udit Das');

    return res.status(201).json({
      success: true,
      data: newNote,
      message: 'Internal note recorded.',
    });
  } catch (err: any) {
    console.error('Error creating note:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to create internal note.',
    });
  }
}

export async function getLeadNotesList(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const notes = await getLeadNotes(id);
    return res.json({
      success: true,
      data: notes,
    });
  } catch (err: any) {
    console.error('Error fetching notes:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve notes.',
    });
  }
}

export async function getCRMStats(req: Request, res: Response) {
  try {
    const stats = await getStats();
    return res.json({
      success: true,
      data: stats,
    });
  } catch (err: any) {
    console.error('Error fetching stats:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to calculate CRM analytics.',
    });
  }
}

export async function exportCSV(req: Request, res: Response) {
  try {
    const { status, businessType, search } = req.query;
    const leads = await getAllLeadsForExport({
      status: status ? String(status) : undefined,
      businessType: businessType ? String(businessType) : undefined,
      search: search ? String(search) : undefined,
    });

    // Generate CSV string with RFC-4180 escaping
    const headers = [
      'ID',
      'Name',
      'Business Name',
      'Industry Type',
      'WhatsApp Phone',
      'Current Website',
      'Requirement',
      'Status',
      'Source',
      'UTM Campaign',
      'Created At',
      'Message',
    ];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((l) => [
      escapeCSV(l.id),
      escapeCSV(l.name),
      escapeCSV(l.business_name),
      escapeCSV(l.business_type),
      escapeCSV(l.whatsapp),
      escapeCSV(l.current_website),
      escapeCSV(l.requirement),
      escapeCSV(l.status),
      escapeCSV(l.source),
      escapeCSV(l.utm_campaign),
      escapeCSV(l.created_at),
      escapeCSV(l.message),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leads_export_${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.status(200).send(csvContent);
  } catch (err: any) {
    console.error('Error exporting CSV:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to export leads to CSV.',
    });
  }
}
