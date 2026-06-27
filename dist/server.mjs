// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { google } from "googleapis";

// src/lib/firebaseServer.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
function parseServiceAccountJson() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  const attempts = [
    () => JSON.parse(raw),
    () => JSON.parse(raw.replace(/\\{/g, "{").replace(/\\}/g, "}")),
    () => JSON.parse(raw.replace(/\\{/g, "{").replace(/\\}/g, "}").replace(/\\"/g, '"')),
    () => JSON.parse(raw.replace(/\\([^"\\\/bfnrtu])/g, "$1"))
  ];
  for (let i = 0; i < attempts.length; i++) {
    try {
      const result = attempts[i]();
      console.log(`[Firebase] JSON parsed successfully on attempt ${i + 1}`);
      return result;
    } catch (e) {
      console.warn(`[Firebase] Parse attempt ${i + 1} failed`);
    }
  }
  throw new Error("All JSON parse attempts failed for GOOGLE_SERVICE_ACCOUNT_JSON");
}
function fixPrivateKey(key) {
  if (!key) return key;
  key = key.replace(/\\n/g, "\n");
  if (key.includes("-----BEGIN RSA PRIVATE KEY-----") || key.includes("-----BEGIN PRIVATE KEY-----")) {
    const header = key.match(/-----BEGIN [^-]+-----/)?.[0] || "-----BEGIN PRIVATE KEY-----";
    const footer = key.match(/-----END [^-]+-----/)?.[0] || "-----END PRIVATE KEY-----";
    const body = key.replace(/-----BEGIN [^-]+-----/, "").replace(/-----END [^-]+-----/, "").replace(/\s+/g, "");
    const lines = body.match(/.{1,64}/g)?.join("\n") || body;
    return `${header}
${lines}
${footer}`;
  }
  return key;
}
var adminDb = null;
try {
  const serviceAccount = parseServiceAccountJson();
  serviceAccount.private_key = fixPrivateKey(serviceAccount.private_key);
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount) });
  }
  const rawDbId = process.env.FIREBASE_DATABASE_ID || "";
  const useDefault = !rawDbId || ["", "(default)", "undefined", "null"].includes(rawDbId.trim());
  adminDb = useDefault ? getFirestore() : getFirestore(rawDbId.trim());
  console.log(
    `[Firebase] Connected to Firestore: ${useDefault ? "default" : rawDbId.trim()}`
  );
} catch (e) {
  console.error("[Firebase] Failed to initialize:", e?.message || e);
}

// server.ts
import { Resend } from "resend";
var resend = new Resend(process.env.RESEND_API_KEY);
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(express.json());
  const getGoogleCredentials = async () => {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let calendarId = process.env.GOOGLE_CALENDAR_ID;
    const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    let fallbackStatus = "NOT_USED";
    let fallbackError = null;
    let source = "ENV";
    if (fullJson && fullJson !== "undefined" && fullJson !== "null") {
      try {
        const credentials = JSON.parse(fullJson);
        privateKey = credentials.private_key;
        clientEmail = credentials.client_email;
        source = "JSON_ENV";
        fallbackStatus = "LOADED_FROM_JSON_ENV";
      } catch (e) {
        fallbackError = `JSON_ENV_PARSE_ERROR: ${e.message}`;
      }
    }
    if (privateKey === "undefined" || privateKey === "null" || !privateKey) privateKey = null;
    if (clientEmail === "undefined" || clientEmail === "null" || !clientEmail) clientEmail = null;
    if (calendarId === "undefined" || calendarId === "null" || !calendarId) calendarId = null;
    const isServiceAccountEmail = clientEmail && clientEmail.includes(".gserviceaccount.com");
    let credentialsObj = null;
    if (!privateKey || !isServiceAccountEmail || privateKey && privateKey.length < 100) {
      fallbackStatus = "FALLBACK_FILE_MISSING_OR_INVALID";
    }
    if (privateKey && typeof privateKey === "string") {
      const cleanKey = (key) => {
        if (!key) return key;
        let processed = key.trim();
        while (processed.startsWith('"') && processed.endsWith('"') || processed.startsWith("'") && processed.endsWith("'")) {
          processed = processed.substring(1, processed.length - 1).trim();
        }
        processed = processed.replace(/\\n/g, "\n");
        const headerPattern = /-----[\s]*BEGIN[\s]+(?:RSA[\s]+)?PRIVATE[\s]+KEY[\s]*-----/i;
        const footerPattern = /-----[\s]*END[\s]+(?:RSA[\s]+)?PRIVATE[\s]+KEY[\s]*-----/i;
        let body = processed;
        const headerMatch = processed.match(headerPattern);
        const footerMatch = processed.match(footerPattern);
        if (headerMatch && footerMatch) {
          const start = headerMatch.index + headerMatch[0].length;
          const end = footerMatch.index;
          body = processed.substring(start, end);
        }
        const cleanBody = body.replace(/[^A-Za-z0-9+/=]/g, "");
        return `-----BEGIN PRIVATE KEY-----
${cleanBody}
-----END PRIVATE KEY-----
`;
      };
      privateKey = cleanKey(privateKey);
    }
    if (calendarId && typeof calendarId === "string") {
      calendarId = calendarId.replace(/['"]/g, "").trim();
    }
    if (clientEmail && typeof clientEmail === "string") {
      clientEmail = clientEmail.replace(/['"]/g, "").trim();
    }
    if (!credentialsObj && privateKey && clientEmail) {
      credentialsObj = {
        client_email: clientEmail,
        private_key: privateKey,
        type: "service_account"
      };
    }
    return { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj };
  };
  const getGoogleAuth = (credentialsObj) => {
    if (!credentialsObj || !credentialsObj.private_key || !credentialsObj.client_email) {
      return null;
    }
    const auth = new google.auth.JWT({
      email: credentialsObj.client_email,
      key: credentialsObj.private_key,
      scopes: ["https://www.googleapis.com/auth/calendar"]
    });
    return auth;
  };
  app.get("/api/health", async (req, res) => {
    const { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj } = await getGoogleCredentials();
    const geminiKey = process.env.GEMINI_API_KEY;
    let authTest = "NOT_STARTED";
    let authError = null;
    let keyPreview = "NONE";
    if (privateKey) {
      const head = privateKey.substring(0, 30);
      const tail = privateKey.substring(privateKey.length - 30);
      keyPreview = `HEAD: [${head}] ... TAIL: [${tail}] (Total Length: ${privateKey.length})`;
    }
    try {
      if (credentialsObj && calendarId) {
        const auth = getGoogleAuth(credentialsObj);
        if (!auth) throw new Error("Could not initialize auth client");
        const token = await auth.authorize();
        authTest = `SUCCESS: Token acquired! (Expires: ${new Date(token.expiry_date || 0).toLocaleTimeString()})`;
        const calendar = google.calendar({ version: "v3", auth });
        const calendarInfo = await calendar.calendars.get({ calendarId });
        const events = await calendar.events.list({
          calendarId,
          maxResults: 1,
          timeMin: (/* @__PURE__ */ new Date()).toISOString()
        });
        authTest = `SUCCESS: Connected to "${calendarInfo.data.summary}"! (Expires: ${new Date(token.expiry_date || 0).toLocaleTimeString()})`;
        authTest += ` | Found ${events.data.items?.length || 0} upcoming events.`;
      } else {
        const missing = [];
        if (!clientEmail) missing.push("clientEmail");
        if (!privateKey) missing.push("privateKey");
        if (!calendarId) missing.push("calendarId");
        authTest = `SKIPPED: Missing ${missing.join(", ")}`;
      }
    } catch (error) {
      authTest = "FAILED: Authentication or Permission error";
      authError = error.message;
      console.error("Health Check Auth Error:", error);
    }
    let firebaseStatus = "NOT_CONFIGURED";
    let firebaseError = null;
    try {
      if (adminDb) {
        const collections = await adminDb.listCollections();
        firebaseStatus = `CONNECTED: Found ${collections.length} collections`;
      } else {
        firebaseStatus = "SKIPPED: Firebase Admin not initialized";
      }
    } catch (e) {
      firebaseStatus = "ERROR: " + e.message;
      firebaseError = e.message;
    }
    res.json({
      status: "ok",
      firebase: firebaseStatus,
      firebase_error: firebaseError,
      google_auth_test: authTest,
      google_auth_error: authError,
      fallback_status: fallbackStatus,
      fallback_error: fallbackError,
      auth_source: source,
      using_email: clientEmail,
      key_preview: keyPreview,
      env: {
        GOOGLE_CALENDAR_ID: calendarId ? `${calendarId.substring(0, 5)}...` : "MISSING",
        GEMINI_API_KEY: geminiKey ? "CONFIGURED" : "MISSING",
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY === "undefined" ? "UNDEFINED_STRING" : "CONFIGURED" : "MISSING",
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL === "undefined" ? "UNDEFINED_STRING" : "CONFIGURED" : "MISSING",
        GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? "CONFIGURED" : "MISSING",
        NODE_ENV: process.env.NODE_ENV || "development"
      }
    });
  });
  const CRM_CUSTOMER_COLLECTION = "customers";
  const ENABLE_CRM_SYNC = true;
  function generateCrmId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  async function syncToCrm(customerData) {
    const ownerUserId = process.env.CRM_OWNER_USER_ID;
    console.log(`[CRM] syncToCrm called for: ${customerData.email || "no-email"}`);
    if (!adminDb) {
      console.error("[CRM] ERROR: Firestore Admin SDK (adminDb) is not initialized.");
      return null;
    }
    if (!ENABLE_CRM_SYNC) {
      console.log("[CRM] Sync skipped: ENABLE_CRM_SYNC is false.");
      return null;
    }
    if (!ownerUserId) {
      console.error("[CRM] CONFIG ERROR: CRM_OWNER_USER_ID is missing from environment variables. CRM sync failed.");
      return null;
    }
    console.log(`[CRM] Using Owner UID: ${ownerUserId}`);
    try {
      const { email, phone, firstName, lastName } = customerData;
      let existingDoc = null;
      if (email) {
        console.log(`[CRM] Searching for existing customer with email: ${email}`);
        const emailQuery = await adminDb.collection(CRM_CUSTOMER_COLLECTION).where("userId", "==", ownerUserId).where("email", "==", email).limit(1).get();
        if (!emailQuery.empty) {
          existingDoc = emailQuery.docs[0];
          console.log(`[CRM] Found match by email: ${existingDoc.id}`);
        }
      }
      if (!existingDoc && phone) {
        console.log(`[CRM] Searching for existing customer with phone: ${phone}`);
        const phoneQuery = await adminDb.collection(CRM_CUSTOMER_COLLECTION).where("userId", "==", ownerUserId).where("phone", "==", phone).limit(1).get();
        if (!phoneQuery.empty) {
          existingDoc = phoneQuery.docs[0];
          console.log(`[CRM] Found match by phone: ${existingDoc.id}`);
        }
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const fullName = `${firstName || ""} ${lastName || ""}`.trim();
      const payload = {
        userId: ownerUserId,
        firstName: firstName || "",
        lastName: lastName || "",
        fullName: fullName || "",
        email: email || "",
        phone: phone || "",
        address: customerData.streetAddress || customerData.address || "",
        city: customerData.city || "",
        state: customerData.state || "",
        zip: customerData.zip || "",
        notes: customerData.notes || "",
        customerType: customerData.customerType || "General Client",
        source: "website",
        status: "new",
        updatedAt: now,
        updatedBy: "website-form"
      };
      if (existingDoc) {
        console.log(`[CRM] Updating existing customer record: ${existingDoc.id}`);
        await existingDoc.ref.update(payload);
        return existingDoc.id;
      } else {
        const customId = generateCrmId();
        console.log(`[CRM] Creating NEW customer record with ID: ${customId}`);
        await adminDb.collection(CRM_CUSTOMER_COLLECTION).doc(customId).set({
          ...payload,
          id: customId,
          createdAt: now,
          createdBy: "website-form",
          tags: ["website-lead"]
        });
        console.log(`[CRM] Successfully created customer: ${customId}`);
        return customId;
      }
    } catch (error) {
      console.error("[CRM] Sync Error Exception:", error);
      throw error;
    }
  }
  app.post("/api/contact", async (req, res) => {
    console.log("[API] Received POST /api/contact");
    console.log("[API] Request Body:", JSON.stringify(req.body, null, 2));
    try {
      const { firstName, lastName, email, phone, message } = req.body;
      if (!firstName || !lastName || !email) {
        console.warn("[API] Validation failed: Missing required fields");
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (adminDb) {
        console.log('[API] Saving to "messages" collection...');
        await adminDb.collection("messages").add({
          firstName,
          lastName,
          email,
          phone: phone || "",
          message: message || "",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log('[API] Saved to "messages" successfully.');
      } else {
        console.warn('[API] adminDb not available for "messages" save.');
      }
      console.log("[API] Initiating CRM sync...");
      const customerId = await syncToCrm({
        firstName,
        lastName,
        email,
        phone: phone || "",
        notes: message || "",
        customerType: "General Client"
      });
      console.log(`[API] CRM sync completed. CustomerID: ${customerId || "NONE"}`);
      res.json({ success: true, customerId });
    } catch (error) {
      console.error("[API] Contact API Error Exception:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  });
  app.post("/api/book", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, notes, serviceName, startTime, endTime } = req.body;
      const { credentialsObj, calendarId } = await getGoogleCredentials();
      if (!credentialsObj || !calendarId) {
        return res.status(500).json({ error: "Calendar credentials not configured" });
      }
      const auth = getGoogleAuth(credentialsObj);
      if (!auth) return res.status(500).json({ error: "Failed to initialize calendar auth" });
      const calendar = google.calendar({ version: "v3", auth });
      const event = {
        summary: `Notary Booking: ${firstName} ${lastName}`,
        location: address,
        description: `Service: ${serviceName}
Phone: ${phone}
Email: ${email}
Address: ${address}

Notes: ${notes}`,
        start: {
          dateTime: startTime,
          timeZone: "America/New_York"
        },
        end: {
          dateTime: endTime,
          timeZone: "America/New_York"
        }
      };
      const calendarEvent = await calendar.events.insert({
        calendarId,
        requestBody: event
      });
      const googleCalendarEventId = calendarEvent.data.id || "";
      console.log(`[API] Google Calendar event created. ID: ${googleCalendarEventId}`);
      try {
        if (adminDb) {
          await adminDb.collection("bookings").add({
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phone || "",
            address: address || "",
            notes: notes || "",
            service_name: serviceName,
            start_time: startTime,
            end_time: endTime,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
            // Using ISO string for now to match rules isValidBooking check
          });
          console.log("Booking saved to Firebase successfully");
        } else {
          console.warn("Firebase Admin not initialized, skipping DB save");
        }
      } catch (fbE) {
        console.error("Firebase Booking Error (Non-blocking):", fbE);
      }
      try {
        if (adminDb) {
          const ownerUserId = process.env.CRM_OWNER_USER_ID;
          if (!ownerUserId) {
            console.error("[CRM] CRM_OWNER_USER_ID missing \u2014 skipping appointment write.");
          } else {
            const startDate = new Date(startTime);
            const dateStr = startDate.toLocaleDateString("en-CA", {
              timeZone: "America/New_York"
            });
            const timeStr = startDate.toLocaleTimeString("en-US", {
              timeZone: "America/New_York",
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            });
            const sortableDateTime = startDate.toISOString();
            const appointmentId = generateCrmId();
            const now = (/* @__PURE__ */ new Date()).toISOString();
            const appointmentRecord = {
              id: appointmentId,
              userId: ownerUserId,
              firstName: firstName || "",
              lastName: lastName || "",
              customerName: `${firstName || ""} ${lastName || ""}`.trim(),
              email: email || "",
              phone: phone || "",
              address: address || "",
              city: "",
              state: "",
              zip: "",
              location: address || "",
              date: dateStr,
              time: timeStr,
              sortableDateTime,
              notes: notes || "",
              signingType: serviceName || "General Notary",
              actType: "",
              docType: "",
              docs: [],
              status: "Scheduled",
              fee: 0,
              agreedFee: 0,
              offeredFee: 0,
              amountCollected: 0,
              amountOutstanding: 0,
              estimatedProfit: 0,
              totalJobCost: 0,
              travelCost: 0,
              printingCost: 0,
              otherSigningCost: 0,
              parkingTollsCost: 0,
              milesDriven: 0,
              mileageRate: 0.725,
              roundTripMiles: true,
              profitMarginPercent: 0,
              paymentStatus: "Not Sent",
              paymentMethod: "",
              paymentDueDate: "",
              invoiceNumber: "",
              invoiceSent: false,
              scanbackStatus: "Not Required",
              companyId: "",
              companyName: "",
              signingCompany: "",
              signers: [
                {
                  id: generateCrmId(),
                  firstName: firstName || "",
                  lastName: lastName || "",
                  email: email || "",
                  phone: phone || "",
                  address: address || "",
                  city: "",
                  state: "",
                  zip: ""
                }
              ],
              googleCalendarEventId,
              source: "website",
              createdBy: "website-form",
              createdAt: now,
              updatedAt: now
            };
            await adminDb.collection("appointments").doc(appointmentId).set(appointmentRecord);
            console.log(`[CRM] Appointment created successfully. ID: ${appointmentId}`);
          }
        }
      } catch (apptE) {
        console.error("[CRM] Appointment write error (non-blocking):", apptE.message);
      }
      try {
        const startFormatted = new Date(startTime).toLocaleString("en-US", {
          timeZone: "America/New_York",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        });
        await resend.emails.send({
          from: "Integrity Closings CLT <noreply@integrityclosingsclt.com>",
          to: "fcoxx@integrityclosingsclt.com",
          subject: `New Booking: ${firstName} ${lastName} \u2014 ${startFormatted}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
              <div style="background:#172554;padding:20px 24px;border-radius:6px 6px 0 0;">
                <h1 style="color:#ffffff;margin:0;font-size:20px;">New Appointment Booked</h1>
                <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:14px;">Integrity Closings CLT</p>
              </div>
              <div style="background:#ffffff;padding:24px;border-radius:0 0 6px 6px;border:1px solid #e2e8f0;border-top:none;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;width:140px;">Client Name</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;"><a href="tel:${phone}" style="color:#2563eb;">${phone}</a></td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Service</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;">${serviceName}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Date & Time</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;">${startFormatted}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Address</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;">${address || "Not provided"}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;font-size:14px;vertical-align:top;">Notes</td><td style="padding:10px 0;font-weight:600;color:#0f172a;">${notes || "None"}</td></tr>
                </table>
                <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:6px;border-left:4px solid #2563eb;">
                  <p style="margin:0;font-size:14px;color:#1e40af;">This appointment has been added to your Google Calendar automatically.</p>
                </div>
              </div>
            </div>
          `
        });
        console.log("[EMAIL] Booking notification sent to fcoxx@integrityclosingsclt.com");
      } catch (emailErr) {
        console.error("[EMAIL] Notification failed (non-blocking):", emailErr);
      }
      res.json({ success: true });
      try {
        await syncToCrm({
          firstName,
          lastName,
          email,
          phone: phone || "",
          notes: notes || "",
          customerType: "General Client",
          streetAddress: address || "",
          city: "",
          state: "",
          zip: ""
        });
      } catch (crmE) {
        console.error("[CRM] Non-blocking CRM sync error during booking:", crmE);
      }
    } catch (error) {
      console.error("Calendar API Error:", error);
      res.status(500).json({ error: "Failed to create calendar event" });
    }
  });
  app.post("/api/availability", async (req, res) => {
    try {
      const { date } = req.body;
      console.log("Checking availability for date:", date);
      const { credentialsObj, calendarId } = await getGoogleCredentials();
      if (!credentialsObj || !calendarId) {
        return res.status(500).json({ error: "Calendar credentials not configured" });
      }
      const auth = getGoogleAuth(credentialsObj);
      if (!auth) return res.status(500).json({ error: "Failed to initialize calendar auth" });
      const calendar = google.calendar({ version: "v3", auth });
      const baseDate = new Date(date);
      const timeMin = new Date(baseDate.getTime());
      timeMin.setUTCHours(0, 0, 0, 0);
      const queryMin = new Date(timeMin.getTime() - 12 * 60 * 60 * 1e3);
      const queryMax = new Date(timeMin.getTime() + 36 * 60 * 60 * 1e3);
      console.log("Querying FreeBusy range:", { min: queryMin.toISOString(), max: queryMax.toISOString() });
      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: queryMin.toISOString(),
          timeMax: queryMax.toISOString(),
          timeZone: "America/New_York",
          items: [{ id: calendarId }]
        }
      });
      const calendarData = response.data.calendars[calendarId];
      const busySlots = calendarData ? calendarData.busy || [] : [];
      console.log("Found busy slots:", busySlots.length);
      res.json({ busy: busySlots });
    } catch (error) {
      console.error("Availability API Error:", error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });
  app.get("/api/config", (req, res) => {
    res.json({
      geminiKey: process.env.GEMINI_API_KEY || ""
    });
  });
  app.get("/notary-service-locations-nc", (req, res) => {
    const filePath = path.join(process.cwd(), "dist", "notary-service-locations-nc.html");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("Page not found");
    }
  });
  app.get("/website-build.zip", (req, res) => {
    const zipPath = path.join(__dirname, ".tmp", "website-build.zip");
    if (fs.existsSync(zipPath)) {
      res.setHeader("Content-Disposition", 'attachment; filename="website-build.zip"');
      res.setHeader("Content-Type", "application/zip");
      res.sendFile(zipPath);
    } else {
      res.status(404).send("Build zip not found. Please wait for it to be generated.");
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    console.log("[Setup] Production mode detected");
    console.log("[Setup] Working directory:", process.cwd());
    console.log("[Setup] Serving static files from:", distPath);
    if (!fs.existsSync(distPath)) {
      console.error("[Error] dist directory not found at", distPath);
    }
    app.use(express.static(distPath));
    const pageMeta = {
      "/nursing-home-notary-charlotte-nc": {
        title: "Nursing Home Notary Charlotte NC | Mobile Notary for Assisted Living | Integrity Closings CLT",
        description: "Need a notary at a nursing home or assisted living facility in Charlotte, NC? Integrity Closings CLT sends a commissioned notary directly to residents in Mecklenburg, Union, and Cabarrus counties.",
        canonical: "https://www.integrityclosingsclt.com/nursing-home-notary-charlotte-nc"
      },
      "/hospital-notary-charlotte-nc": {
        title: "Hospital & Bedside Notary Charlotte NC | Mobile Notary for Patients | Integrity Closings CLT",
        description: "Need a notary at a hospital in Charlotte, NC? We provide mobile bedside notary services for patients and families at Atrium, Novant, and care facilities.",
        canonical: "https://www.integrityclosingsclt.com/hospital-notary-charlotte-nc"
      },
      "/mobile-notary-charlotte-nc": {
        title: "Mobile Notary Services in Charlotte, NC | Integrity Closings CLT",
        description: "Integrity Closings CLT provides professional mobile notary services throughout Charlotte, NC. We come to your home, office, hospital, or care facility \u2014 same-day appointments available.",
        canonical: "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc"
      },
      "/estate-planning-notary-charlotte-nc": {
        title: "Estate & Trust Notarization Charlotte NC | Mobile Notary | Integrity Closings CLT",
        description: "Professional mobile notary for estate planning and trust documents in Charlotte, NC. We travel to homes, hospitals, and nursing homes for Wills, Trusts, and POA.",
        canonical: "https://www.integrityclosingsclt.com/estate-planning-notary-charlotte-nc"
      },
      "/after-hours-mobile-notary-charlotte-nc": {
        title: "After-Hours Mobile Notary Charlotte NC | Evening & Weekend Notary | Integrity Closings CLT",
        description: "Need a notary after hours in Charlotte, NC? Integrity Closings CLT offers evening and weekend mobile notary appointments \u2014 available when banks and UPS stores are closed.",
        canonical: "https://www.integrityclosingsclt.com/after-hours-mobile-notary-charlotte-nc"
      },
      "/loan-signing-agent-charlotte-nc": {
        title: "Loan Signing Agent Charlotte NC | Certified Mobile Notary | Integrity Closings CLT",
        description: "Certified loan signing agent serving Charlotte, NC and surrounding areas. Professional, accurate, and reliable closings at your home, office, or any location.",
        canonical: "https://www.integrityclosingsclt.com/loan-signing-agent-charlotte-nc"
      },
      "/areas-served": {
        title: "Mobile Notary Service Areas | Charlotte NC & Surrounding Counties | Integrity Closings CLT",
        description: "Integrity Closings CLT provides mobile notary services across Mecklenburg, Union, and Cabarrus counties including Mint Hill, Matthews, Huntersville, Monroe, and more.",
        canonical: "https://www.integrityclosingsclt.com/areas-served"
      }
    };
    app.get("*", (req, res) => {
      res.setHeader("X-Served-By", "express-node");
      const indexPath = path.join(distPath, "index.html");
      if (!fs.existsSync(indexPath)) {
        console.error("[Error] index.html not found at", indexPath);
        res.status(404).send("index.html not found. Check server logs.");
        return;
      }
      const meta = pageMeta[req.path];
      if (!meta) {
        res.sendFile(indexPath);
        return;
      }
      let html = fs.readFileSync(indexPath, "utf-8");
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${meta.title}</title>`
      );
      html = html.replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${meta.description}"`
      );
      html = html.replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${meta.canonical}"`
      );
      res.send(html);
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("!!! FATAL SERVER ERROR ON STARTUP !!!");
  console.error(err);
  process.exit(1);
});
//# sourceMappingURL=server.mjs.map
