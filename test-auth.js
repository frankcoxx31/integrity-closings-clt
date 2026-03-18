import { google } from 'googleapis';
const credentials = {
  client_email: 'test@example.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n',
  type: 'service_account'
};

try {
  const auth = google.auth.fromJSON(credentials);
  auth.scopes = ['https://www.googleapis.com/auth/calendar'];
  console.log('Auth client created successfully');
  console.log('Scopes:', auth.scopes);
} catch (e) {
  console.error('Error creating auth client:', e.message);
}
