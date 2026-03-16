const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace <Link to="/booking" ...> ... </Link>
  content = content.replace(/<Link\s+to="\/booking"([^>]*)>([\s\S]*?)<\/Link>/g, '<a href="PASTE_MY_BOOKING_URL_HERE" target="_blank" rel="noopener noreferrer"$1>$2</a>');

  // For multiline <Link to="/booking" ...> in Hero.tsx and WelcomePopup.tsx
  content = content.replace(/<Link([\s\S]*?)to="\/booking"([\s\S]*?)>([\s\S]*?)<\/Link>/g, '<a$1href="PASTE_MY_BOOKING_URL_HERE" target="_blank" rel="noopener noreferrer"$2>$3</a>');

  // Navbar handleNavigation('/booking')
  content = content.replace(/handleNavigation\('\/booking'\)/g, "window.open('PASTE_MY_BOOKING_URL_HERE', '_blank')");

  // AIChatbot markdown link
  content = content.replace(/\[Book Online\]\(\/booking\)/g, '[Book Online](PASTE_MY_BOOKING_URL_HERE)');
  content = content.replace(/props\.href === '\/booking'/g, "props.href === 'PASTE_MY_BOOKING_URL_HERE'");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walk('./src');
