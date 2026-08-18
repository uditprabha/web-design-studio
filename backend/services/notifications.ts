import nodemailer from 'nodemailer';
import { Lead } from '../database/db.ts';

export async function sendLeadNotificationEmail(lead: Lead): Promise<boolean> {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const to = process.env.NOTIFICATION_EMAIL || 'udit.windows8@gmail.com';

  // Check if SMTP is configured
  if (!host || !user || !pass || !to) {
    console.log(`[Notification Service] SMTP not configured. Lead '${lead.business_name}' saved to database without email dispatch.`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const adminUrl = `${appUrl}/admin/`;

    const subject = `New Website Lead — ${lead.business_name} (${lead.business_type})`;
    const text = `
New website enquiry received.

Name: ${lead.name}
Business: ${lead.business_name}
Type: ${lead.business_type}
Requirement: ${lead.requirement || 'New Website'}
WhatsApp: ${lead.whatsapp}
Website: ${lead.current_website || 'None'}
Source: ${lead.source || 'direct'}
Campaign: ${lead.utm_campaign || 'N/A'}
Message: ${lead.message || 'No additional message.'}

CRM Dashboard:
${adminUrl}
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">UDIT DAS &bull; NEW LEAD</h2>
        </div>
        <div style="padding: 24px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">${lead.business_name}</h3>
          <p style="margin-bottom: 20px; font-size: 14px; color: #64748b;">A new prospective client has requested a free website concept preview.</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #475569;">Contact Name:</td>
              <td style="padding: 10px 0; color: #0f172a;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Business Type:</td>
              <td style="padding: 10px 0; color: #0f172a;">${lead.business_type}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Requirement:</td>
              <td style="padding: 10px 0; color: #0f172a;">${lead.requirement || 'New Website'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">WhatsApp:</td>
              <td style="padding: 10px 0; color: #2563eb; font-weight: 600;">${lead.whatsapp}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Current Website:</td>
              <td style="padding: 10px 0; color: #0f172a;">${lead.current_website || 'None'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Marketing Source:</td>
              <td style="padding: 10px 0; color: #0f172a;">${lead.source || 'direct'} ${lead.utm_campaign ? `(${lead.utm_campaign})` : ''}</td>
            </tr>
            ${lead.message ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #475569; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #334155; font-style: italic;">"${lead.message}"</td>
            </tr>` : ''}
          </table>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${adminUrl}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
              Open Lead in Admin CRM &rarr;
            </a>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Udit Das Freelance Web Design Lead Funnel
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Lead Funnel" <${user}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`[Notification Service] Email notification successfully sent to ${to} for lead ${lead.id}`);
    return true;
  } catch (err) {
    console.error('[Notification Service] Failed to send email notification:', err);
    return false;
  }
}
