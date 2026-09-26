import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';

type Submission = {
  form: string;
  replyTo?: string;
  subject?: string;
  fields: [label: string, value: string][];
};

type DeliveryResult = { ok: boolean; channel: 'smtp' | 'file' | 'none' };

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Delivers a form submission.
 * - SMTP_HOST configured → email to FORMS_TO (default info@avanayoga.com).
 * - Development (or FORMS_STORE=file) → appended to ./.data/submissions.jsonl.
 * - Production without SMTP → reports failure so the UI can offer direct contact details.
 */
export async function deliverSubmission(submission: Submission): Promise<DeliveryResult> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, FORMS_TO, FORMS_FROM, FORMS_STORE } = process.env;
  const to = FORMS_TO || 'info@avanayoga.com';
  const subject = submission.subject ?? `Website: ${submission.form}`;
  const text = submission.fields.map(([label, value]) => `${label}:\n${value || '(not provided)'}`).join('\n\n');
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${submission.fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #e9dcc8;color:#30332d">${escapeHtml(label)}</th><td style="border-bottom:1px solid #e9dcc8">${escapeHtml(value || '(not provided)').replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('')}</table>`;

  if (SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 465),
        secure: (SMTP_SECURE ?? 'true') !== 'false',
        auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      });
      await transporter.sendMail({ from: FORMS_FROM || to, to, replyTo: submission.replyTo, subject, text, html });
      return { ok: true, channel: 'smtp' };
    } catch (error) {
      console.error('[forms] SMTP delivery failed:', error);
      return { ok: false, channel: 'smtp' };
    }
  }

  if (process.env.NODE_ENV !== 'production' || FORMS_STORE === 'file') {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, 'submissions.jsonl'), `${JSON.stringify({ receivedAt: new Date().toISOString(), ...submission })}\n`);
    console.info(`[forms] "${submission.form}" stored in .data/submissions.jsonl. Set SMTP_HOST to deliver by email.`);
    return { ok: true, channel: 'file' };
  }

  console.error('[forms] SMTP_HOST is not configured; submission could not be delivered.');
  return { ok: false, channel: 'none' };
}
