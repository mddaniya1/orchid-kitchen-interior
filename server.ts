import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INQUIRIES_FILE = '/tmp/orchid-kitchen-inquiries.json';

interface InquiryRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  budget: string;
  message: string;
  serviceInterest?: string;
  createdAt: string;
}

function readInquiries(): InquiryRecord[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveInquiry(record: InquiryRecord): void {
  const existing = readInquiries();
  existing.unshift(record);
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'orchid-kitchen-interior' });
  });

  app.get('/api/inquiries', (_req, res) => {
    const records = readInquiries();
    res.json({ count: records.length, inquiries: records });
  });

  app.post('/api/inquiries', (req, res) => {
    const body = req.body ?? {};
    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
    const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const location = typeof body.location === 'string' ? body.location.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const serviceInterest =
      typeof body.serviceInterest === 'string' ? body.serviceInterest.trim() : '';

    const errors: Record<string, string> = {};
    if (!firstName) errors.firstName = 'First name is required.';
    if (!lastName) errors.lastName = 'Last name is required.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!location) errors.location = 'Project location in Karachi is required.';
    if (!message || message.length < 10) {
      errors.message = 'Please share a brief description of your kitchen or interior project (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Validation failed. Please review the highlighted fields.',
        fields: errors,
      });
      return;
    }

    const id = `OK-${Date.now().toString(36).toUpperCase()}`;
    const record: InquiryRecord = {
      id,
      firstName,
      lastName,
      email,
      phone,
      location,
      budget: budget || 'To be discussed',
      message,
      serviceInterest: serviceInterest || undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      saveInquiry(record);
      res.status(201).json({
        ok: true,
        inquiry: record,
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'Unable to store your inquiry right now. Please contact us directly via WhatsApp or phone.',
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Orchid Kitchen & Interior server listening on port ${PORT}`);
  });
}

startServer();
