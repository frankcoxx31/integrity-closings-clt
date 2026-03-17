import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import { google } from 'googleapis';
import { ENCODED_CREDENTIALS } from './calendar-secret.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API route to book calendar event
  app.post('/api/book', async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, notes, serviceName, startTime, endTime } = req.body;

      let privateKey = process.env.GOOGLE_PRIVATE_KEY;
      let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      
      // Fallback to baked-in credentials if Hostinger environment variables are missing
      if (!privateKey || !clientEmail) {
        try {
          const decoded = Buffer.from(ENCODED_CREDENTIALS, 'base64').toString('utf-8');
          const parsed = JSON.parse(decoded);
          privateKey = parsed.private_key;
          clientEmail = parsed.client_email;
        } catch (e) {
          console.error('Failed to parse baked-in credentials');
        }
      }

      if (privateKey) {
        // If the user pasted the entire JSON string, parse it out
        if (privateKey.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(privateKey);
            if (parsed.private_key) {
              privateKey = parsed.private_key;
            }
          } catch (e) {
            console.error('Failed to parse JSON private key');
          }
        }

        // Clean up any accidental spaces or quotes the user might have pasted
        privateKey = privateKey.replace(/['"]/g, '').trim();

        // If the user pasted the raw key without the BEGIN/END tags, add them back!
        if (!privateKey.includes('BEGIN PRIVATE KEY')) {
          // Remove any \n literals if they accidentally included them
          privateKey = privateKey.replace(/\\n/g, '');
          // Reconstruct the proper PEM format Google requires
          privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
        } else {
          // Standard replacement if they managed to paste the whole thing with \n
          privateKey = privateKey.replace(/\\n/g, '\n');
        }
      }

      const credentials = {
        client_email: clientEmail,
        private_key: privateKey,
      };

      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      if (!credentials.client_email || !credentials.private_key || !calendarId) {
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/calendar.events']
      );

      const calendar = google.calendar({ version: 'v3', auth });

      const event = {
        summary: `Notary Booking: ${firstName} ${lastName}`,
        location: address,
        description: `Service: ${serviceName}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\n\nNotes: ${notes}`,
        start: {
          dateTime: startTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endTime,
          timeZone: 'America/New_York',
        },
      };

      await calendar.events.insert({
        calendarId: calendarId,
        resource: event,
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Calendar API Error:', error);
      res.status(500).json({ error: 'Failed to create calendar event' });
    }
  });

  // API route to download the build
  app.get('/website-build.zip', (req, res) => {
    const zipPath = path.join(__dirname, '.tmp', 'website-build.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="website-build.zip"');
      res.setHeader('Content-Type', 'application/zip');
      res.sendFile(zipPath);
    } else {
      res.status(404).send('Build zip not found. Please wait for it to be generated.');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
