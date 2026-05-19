import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to get config safely
const getFirebaseConfig = () => {
  // 1. Try to find the platform-injected config
  const configPath = path.resolve(__dirname, '../../firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, 'utf8');
      return { ...JSON.parse(content), source: 'APPLET_CONFIG' };
    } catch (e) {
      console.warn('Failed to parse firebase-applet-config.json:', e);
    }
  }

  // 2. Try to load from GOOGLE_SERVICE_ACCOUNT_JSON env var (very common on Hostinger/Cloud Run)
  const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (fullJson && fullJson !== 'undefined' && fullJson !== 'null') {
    try {
      const credentials = JSON.parse(fullJson);
      return {
        projectId: credentials.project_id,
        credential: admin.credential.cert(credentials),
        source: 'SERVICE_ACCOUNT_JSON'
      };
    } catch (e) {
      console.warn('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON for Firebase:', e);
    }
  }

  // 3. Fallback to individual environment variables
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
    firestoreDatabaseId: process.env.FIREBASE_DATABASE_ID || '(default)',
    source: 'ENV_VARS'
  };
};

const config = getFirebaseConfig();

// Initialize Firebase Admin
if (!admin.apps.length && config.projectId) {
  try {
    const initOptions: any = {
      projectId: config.projectId
    };
    if (config.credential) {
      initOptions.credential = config.credential;
    }
    
    admin.initializeApp(initOptions);
    console.log(`[Firebase] Admin initialized using ${config.source} for project: ${config.projectId}`);
  } catch (error) {
    console.error('[Firebase] Admin initialization error:', error);
  }
} else if (!config.projectId) {
  console.warn('[Firebase] Project ID missing. Database features will be unavailable.');
}

export const adminDb = config.projectId 
  ? getFirestore(config.firestoreDatabaseId === '(default)' ? undefined : config.firestoreDatabaseId)
  : null;
export const adminAuth = config.projectId ? admin.auth() : null;
