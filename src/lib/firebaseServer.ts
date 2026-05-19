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
      return JSON.parse(content);
    } catch (e) {
      console.warn('Failed to parse firebase-applet-config.json:', e);
    }
  }

  // 2. Fallback to environment variables for production (Hostinger/Cloud Run)
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
    firestoreDatabaseId: process.env.FIREBASE_DATABASE_ID || '(default)'
  };
};

const config = getFirebaseConfig();

// Initialize Firebase Admin
if (!admin.apps.length && config.projectId) {
  try {
    admin.initializeApp({
      projectId: config.projectId
    });
    console.log(`Firebase Admin initialized for project: ${config.projectId}`);
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
} else if (!config.projectId) {
  console.warn('Firebase Project ID missing. Database features will be unavailable.');
}

export const adminDb = config.projectId 
  ? getFirestore(config.firestoreDatabaseId === '(default)' ? undefined : config.firestoreDatabaseId)
  : null;
export const adminAuth = config.projectId ? admin.auth() : null;
