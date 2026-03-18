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

  // API route for health check and environment variable verification
  app.get('/api/health', async (req, res) => {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const geminiKey = process.env.GEMINI_API_KEY;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    let authTest = "NOT_STARTED";
    let authError = null;

    try {
      if (!privateKey || !clientEmail) {
        // Scrub spaces from base64 string before decoding
        const cleanEncoded = ENCODED_CREDENTIALS.replace(/\s/g, '');
        const decoded = Buffer.from(cleanEncoded, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        privateKey = parsed.private_key;
        clientEmail = parsed.client_email;
      }

      if (privateKey) {
        // Deep clean the private key
        privateKey = privateKey.replace(/['"]/g, '').trim();
        
        // If it's the raw base64-ish string without headers
        if (!privateKey.includes('BEGIN PRIVATE KEY')) {
          privateKey = privateKey.replace(/\\n/g, '').replace(/\s/g, '');
          // Reconstruct PEM format
          privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
        } else {
          // It has headers, just fix the newlines
          privateKey = privateKey.replace(/\\n/g, '\n');
        }
      }

      if (clientEmail && privateKey && calendarId) {
        const auth = new google.auth.JWT(
          clientEmail,
          null,
          privateKey,
          ['https://www.googleapis.com/auth/calendar']
        );
        
        // Test 1: Can we get a token?
        const token = await auth.authorize();
        authTest = `SUCCESS: Token acquired! (Expires: ${new Date(token.expiry_date).toLocaleTimeString()})`;
        
        // Test 2: Can we actually see the calendar?
        const calendar = google.calendar({ version: 'v3', auth });
        await calendar.events.list({ 
          calendarId, 
          maxResults: 1,
          timeMin: new Date().toISOString()
        });
        authTest += " | Calendar is visible and readable.";
      } else {
        authTest = "SKIPPED: Missing credentials or Calendar ID";
      }
    } catch (error) {
      authTest = "FAILED: Authentication or Permission error";
      authError = error.message;
      console.error('Health Check Auth Error:', error);
    }

    res.json({
      status: 'ok',
      google_auth_test: authTest,
      google_auth_error: authError,
      env: {
        GOOGLE_CALENDAR_ID: calendarId ? `${calendarId.substring(0, 3)}...` : 'MISSING',
        GEMINI_API_KEY: geminiKey ? 'CONFIGURED' : 'MISSING',
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? 'CONFIGURED' : 'MISSING (Using fallback)',
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'CONFIGURED' : 'MISSING (Using fallback)',
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    });
  });

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
        ['https://www.googleapis.com/auth/calendar']
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

  // API route to check calendar availability
  app.post('/api/availability', async (req, res) => {
    try {
      const { date } = req.body; // e.g., "2023-10-25"
      console.log('Checking availability for date:', date);
      
      let privateKey = process.env.GOOGLE_PRIVATE_KEY;
      let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      console.log('Credentials check:', { 
        hasPrivateKey: !!privateKey, 
        hasClientEmail: !!clientEmail, 
        hasCalendarId: !!calendarId 
      });
      
      if (!privateKey || !clientEmail) {
        console.log('Using baked-in credentials fallback');
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
        if (privateKey.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(privateKey);
            if (parsed.private_key) privateKey = parsed.private_key;
          } catch (e) {}
        }
        privateKey = privateKey.replace(/['"]/g, '').trim();
        if (!privateKey.includes('BEGIN PRIVATE KEY')) {
          privateKey = privateKey.replace(/\\n/g, '');
          privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
        } else {
          privateKey = privateKey.replace(/\\n/g, '\n');
        }
      }

      if (!clientEmail || !privateKey || !calendarId) {
        console.error('Missing configuration:', { clientEmail: !!clientEmail, privateKey: !!privateKey, calendarId: !!calendarId });
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = new google.auth.JWT(
        clientEmail,
        null,
        privateKey,
        ['https://www.googleapis.com/auth/calendar']
      );

      const calendar = google.calendar({ version: 'v3', auth });

      // Set time range for the requested date (from midnight to midnight next day)
      const timeMin = new Date(date);
      timeMin.setHours(0, 0, 0, 0);
      
      const timeMax = new Date(date);
      timeMax.setHours(23, 59, 59, 999);

      console.log('Querying freebusy for:', { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString() });

      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          timeZone: 'America/New_York',
          items: [{ id: calendarId }]
        }
      });

      const busySlots = response.data.calendars[calendarId].busy || [];
      console.log('Found busy slots:', busySlots.length);
      res.json({ busy: busySlots });
    } catch (error) {
      console.error('Availability API Error:', error);
      res.status(500).json({ error: 'Failed to fetch availability', details: error.message });
    }
  });

  // API route to provide config to the frontend (e.g. Gemini key)
  app.get('/api/config', (req, res) => {
    res.json({
      geminiKey: process.env.GEMINI_API_KEY || ''
    });
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
