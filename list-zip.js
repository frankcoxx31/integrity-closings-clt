import AdmZip from 'adm-zip';
const zip = new AdmZip('.tmp/website-build.zip');
const entries = zip.getEntries();
entries.forEach(entry => console.log(entry.entryName));
