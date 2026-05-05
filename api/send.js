// Future optional serverless mail endpoint.
// The current production site uses FormSubmit on GitHub Pages, so this file is kept only as a reusable API reference.
const { Resend } = require('resend');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TO = 'openstorey.design@gmail.com';
const DEFAULT_FROM = 'Open Storey <onboarding@resend.dev>';

function setCorsHeaders(res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (allowedOrigin !== '*') {
    res.setHeader('Vary', 'Origin');
  }
}

function readValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return readValue(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body);
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8'));
  return req.body;
}

function asParagraphs(message) {
  return escapeHtml(message)
    .split(/\n{2,}/)
    .map(function (block) {
      return '<p style="margin:0 0 12px;">' + block.replace(/\n/g, '<br>') + '</p>';
    })
    .join('');
}

function buildTable(rows) {
  return rows
    .map(function (row) {
      return '<tr>' +
        '<td style="padding:10px 14px;border:1px solid #e7dfd5;background:#faf8f4;font:600 12px/1.5 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8c8479;">' + escapeHtml(row.label) + '</td>' +
        '<td style="padding:10px 14px;border:1px solid #e7dfd5;font:400 14px/1.6 Arial,sans-serif;color:#1a1714;">' + row.value + '</td>' +
      '</tr>';
    })
    .join('');
}

function buildContactEmail(body) {
  const name = readValue(body.name);
  const email = readValue(body.email);
  const projectType = readValue(body.project_type) || 'Not specified';
  const message = readValue(body.message) || 'No message provided.';
  const pageUrl = readValue(body.page_url) || 'Unknown';

  if (!name) {
    return { error: 'Please provide your name.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  return {
    replyTo: email,
    subject: 'Open Storey enquiry — ' + name,
    text:
      'Open Storey Contact\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Project Type: ' + projectType + '\n' +
      'Page URL: ' + pageUrl + '\n\n' +
      'Message:\n' + message,
    html:
      '<div style="max-width:680px;margin:0 auto;padding:24px;background:#ffffff;">' +
        '<h1 style="margin:0 0 18px;font:400 28px/1.2 Georgia,serif;color:#1a1714;">New Open Storey enquiry</h1>' +
        '<table style="width:100%;border-collapse:collapse;margin:0 0 18px;">' +
          buildTable([
            { label: 'Name', value: escapeHtml(name) },
            { label: 'Email', value: '<a href="mailto:' + escapeHtml(email) + '" style="color:#c4724a;text-decoration:none;">' + escapeHtml(email) + '</a>' },
            { label: 'Project Type', value: escapeHtml(projectType) },
            { label: 'Page URL', value: '<a href="' + escapeHtml(pageUrl) + '" style="color:#c4724a;text-decoration:none;">' + escapeHtml(pageUrl) + '</a>' }
          ]) +
        '</table>' +
        '<div style="padding:16px 18px;background:#faf8f4;border:1px solid #e7dfd5;">' +
          '<div style="margin:0 0 10px;font:600 12px/1.5 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8c8479;">Project Notes</div>' +
          asParagraphs(message) +
        '</div>' +
      '</div>'
  };
}

function buildNotifyEmail(body) {
  const email = readValue(body.email);
  const pageUrl = readValue(body.page_url) || 'Unknown';

  if (!EMAIL_PATTERN.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  return {
    replyTo: email,
    subject: 'Curated Finds notify request — ' + email,
    text:
      'Curated Finds Notify Request\n\n' +
      'Email: ' + email + '\n' +
      'Page URL: ' + pageUrl,
    html:
      '<div style="max-width:680px;margin:0 auto;padding:24px;background:#ffffff;">' +
        '<h1 style="margin:0 0 18px;font:400 28px/1.2 Georgia,serif;color:#1a1714;">Curated Finds notify request</h1>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          buildTable([
            { label: 'Email', value: '<a href="mailto:' + escapeHtml(email) + '" style="color:#c4724a;text-decoration:none;">' + escapeHtml(email) + '</a>' },
            { label: 'Page URL', value: '<a href="' + escapeHtml(pageUrl) + '" style="color:#c4724a;text-decoration:none;">' + escapeHtml(pageUrl) + '</a>' }
          ]) +
        '</table>' +
      '</div>'
  };
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, message: 'Mail service is not configured yet.' });
  }

  let body;
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, message: 'Request body must be valid JSON.' });
  }

  const submissionType = readValue(body.submission_type);
  const emailData = submissionType === 'contact'
    ? buildContactEmail(body)
    : submissionType === 'curated-notify'
      ? buildNotifyEmail(body)
      : { error: 'Unsupported submission type.' };

  if (emailData.error) {
    return res.status(400).json({ ok: false, message: emailData.error });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: [process.env.CONTACT_TO || DEFAULT_TO],
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    });

    if (response.error) {
      return res.status(502).json({ ok: false, message: 'Email delivery failed.' });
    }

    return res.status(200).json({ ok: true, id: response.data && response.data.id ? response.data.id : null });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Email delivery failed.' });
  }
};