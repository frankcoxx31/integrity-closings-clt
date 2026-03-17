import AdmZip from 'adm-zip';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const zip = new AdmZip();
  const distPath = path.join(__dirname, 'dist');
  const outputPath = path.join(__dirname, '.tmp', 'website-build.zip');

  // Add all files from the dist folder directly to the root of the zip
  zip.addLocalFolder(distPath);

  // Write the zip file to disk
  zip.writeZip(outputPath);
  
  console.log('Successfully created zip file at:', outputPath);
} catch (error) {
  console.error('Error creating zip:', error);
}
