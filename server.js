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

  // Helper to load and clean Google Calendar credentials
  const getGoogleCredentials = () => {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    let fallbackStatus = "NOT_USED";
    let fallbackError = null;

    // 1. Try to load from full JSON environment variable first (most reliable)
    if (fullJson) {
      try {
        const credentials = JSON.parse(fullJson);
        privateKey = credentials.private_key;
        clientEmail = credentials.client_email;
        fallbackStatus = "LOADED_FROM_JSON_ENV";
      } catch (e) {
        fallbackError = `JSON_ENV_PARSE_ERROR: ${e.message}`;
      }
    }

    // 2. Handle "undefined" or "null" strings from some environments
    if (privateKey === 'undefined' || privateKey === 'null') privateKey = null;
    if (clientEmail === 'undefined' || clientEmail === 'null') clientEmail = null;

    // 3. Fallback to baked-in credentials if still missing
    if (!privateKey || !clientEmail) {
      fallbackStatus = "ATTEMPTING_FALLBACK_FILE";
      try {
        const cleanEncoded = ENCODED_CREDENTIALS.trim();
        const decoded = Buffer.from(cleanEncoded, 'base64').toString('utf8');
        const credentials = JSON.parse(decoded);
        if (!privateKey) privateKey = credentials.private_key;
        if (!clientEmail) clientEmail = credentials.client_email;
        fallbackStatus = "FALLBACK_FILE_SUCCESS";
      } catch (e) {
        fallbackStatus = "FALLBACK_FILE_FAILED";
        fallbackError = e.message;
      }
    }

    // 4. Clean the private key
    if (privateKey && typeof privateKey === 'string') {
      privateKey = privateKey.replace(/['"]/g, '').trim();
      if (!privateKey.includes('BEGIN PRIVATE KEY')) {
        privateKey = privateKey.replace(/\\n/g, '').replace(/\s/g, '');
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
      } else {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }
    }

    return { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError };
  };

  // API route for health check and environment variable verification
  app.get('/api/health', async (req, res) => {
    const { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError } = getGoogleCredentials();
    const geminiKey = process.env.GEMINI_API_KEY;

    let authTest = "NOT_STARTED";
    let authError = null;

    try {
      if (clientEmail && privateKey && calendarId) {
        const auth = new google.auth.JWT(
          clientEmail,
          null,
          privateKey,
          ['https://www.googleapis.com/auth/calendar']
        );
        
        const token = await auth.authorize();
        authTest = `SUCCESS: Token acquired! (Expires: ${new Date(token.expiry_date).toLocaleTimeString()})`;
        
        const calendar = google.calendar({ version: 'v3', auth });
        const events = await calendar.events.list({ 
          calendarId, 
          maxResults: 1,
          timeMin: new Date().toISOString()
        });
        authTest += ` | Calendar is accessible. Found ${events.data.items?.length || 0} upcoming events.`;
      } else {
        const missing = [];
        if (!clientEmail) missing.push('clientEmail');
        if (!privateKey) missing.push('privateKey');
        if (!calendarId) missing.push('calendarId');
        authTest = `SKIPPED: Missing ${missing.join(', ')}`;
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
      fallback_status: fallbackStatus,
      fallback_error: fallbackError,
      env: {
        GOOGLE_CALENDAR_ID: calendarId ? `${calendarId.substring(0, 5)}...` : 'MISSING',
        GEMINI_API_KEY: geminiKey ? 'CONFIGURED' : 'MISSING',
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? (process.env.GOOGLE_PRIVATE_KEY === 'undefined' ? 'UNDEFINED_STRING' : 'CONFIGURED') : 'MISSING (Using fallback)',
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL === 'undefined' ? 'UNDEFINED_STRING' : 'CONFIGURED') : 'MISSING (Using fallback)',
        GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? 'CONFIGURED' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    });
  });

  // API route to book calendar event
  app.post('/api/book', async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, notes, serviceName, startTime, endTime } = req.body;
      const { privateKey, clientEmail, calendarId } = getGoogleCredentials();

      if (!clientEmail || !privateKey || !calendarId) {
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = new google.auth.JWT(
        clientEmail,
        null,
        privateKey,
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
      
      const { privateKey, clientEmail, calendarId } = getGoogleCredentials();

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
