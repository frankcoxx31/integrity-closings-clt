import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Initializes Firebase Admin SDK.
 * Primary:  GOOGLE_SERVICE_ACCOUNT_JSON (full JSON blob) — used on Hostinger
 * Fallback: FIREBASE_PROJECT_ID + GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY
 */
const initFirebase = (): admin.app.App | null => {
  if (admin.apps.length) {
    return admin.app();
  }

  // ── Path 1: Full service account JSON (Hostinger production) ──────────────
  const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!fullJson || fullJson === 'undefined' || fullJson === 'null') {
    console.warn('[Firebase] GOOGLE_SERVICE_ACCOUNT_JSON is not set. Trying individual env vars.');
  } else {
    try {
      const credentials = JSON.parse(fullJson);

      if (!credentials.project_id) {
        console.error('[Firebase] FATAL: GOOGLE_SERVICE_ACCOUNT_JSON parsed but project_id is missing. Check the JSON value in Hostinger.');
        return null;
      }
      if (!credentials.client_email) {
        console.error('[Firebase] FATAL: GOOGLE_SERVICE_ACCOUNT_JSON parsed but client_email is missing.');
        return null;
      }
      if (!credentials.private_key) {
        console.error('[Firebase] FATAL: GOOGLE_SERVICE_ACCOUNT_JSON parsed but private_key is missing.');
        return null;
      }

      const app = admin.initializeApp({
        credential: admin.credential.cert(credentials),
        projectId: credentials.project_id,
      });

      console.log(`[Firebase] Admin SDK initialized via GOOGLE_SERVICE_ACCOUNT_JSON. Project: ${credentials.project_id}`);
      return app;

    } catch (e: any) {
      console.error('[Firebase] FATAL: Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:', e.message);
      console.error('[Firebase] Make sure the Hostinger env var contains valid JSON with no extra quotes or escaping.');
      return null;
    }
  }

  // ── Path 2: Individual env vars (local dev / fallback) ────────────────────
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!projectId) {
    console.error('[Firebase] FATAL: FIREBASE_PROJECT_ID is not set and GOOGLE_SERVICE_ACCOUNT_JSON is missing. Firebase cannot initialize.');
    return null;
  }

  if (!clientEmail || !rawPrivateKey) {
    console.error('[Firebase] FATAL: GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY is missing. Firebase cannot initialize.');
    return null;
  }

  try {
    const privateKey = rawPrivateKey.replace(/\\n/g, '\n');
    const app = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
    console.log(`[Firebase] Admin SDK initialized via individual env vars. Project: ${projectId}`);
    return app;
  } catch (e: any) {
    console.error('[Firebase] FATAL: Failed to initialize with individual env vars:', e.message);
    return null;
  }
};

const firebaseApp = initFirebase();

// Always default to the (default) Firestore database unless explicitly set to something else.
// Bug fix: when config comes from SERVICE_ACCOUNT_JSON, firestoreDatabaseId was undefined,
// causing getFirestore(undefined) to be treated as a named DB lookup instead of the default.
const rawDbId = process.env.FIREBASE_DATABASE_ID;
const useDefaultDb =
  !rawDbId ||
  rawDbId.trim() === '' ||
  rawDbId.trim() === '(default)' ||
  rawDbId.trim() === 'undefined' ||
  rawDbId.trim() === 'null';

export const adminDb = firebaseApp
  ? getFirestore(useDefaultDb ? undefined : rawDbId.trim())
  : null;

export const adminAuth = firebaseApp ? admin.auth() : null;

// Loud startup warning so it's impossible to miss in Hostinger logs
if (!firebaseApp) {
  console.error('');
  console.error('══════════════════════════════════════════════════════');
  console.error('[Firebase] FATAL: Admin SDK did NOT initialize.');
  console.error('[Firebase] All Firestore writes will be skipped.');
  console.error('[Firebase] Fix: Set GOOGLE_SERVICE_ACCOUNT_JSON in Hostinger.');
  console.error('══════════════════════════════════════════════════════');
  console.error('');
}

if (firebaseApp && !adminDb) {
  console.error('[Firebase] FATAL: adminDb is null even though app initialized. Check FIREBASE_DATABASE_ID.');
}
