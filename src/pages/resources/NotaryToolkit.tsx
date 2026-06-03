import { Star, StarHalf, ShoppingCart, Youtube, Stamp, Laptop, Package, AppWindow, Briefcase, ExternalLink } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  stars: number;
  amazonUrl: string;
  image?: string;
  franksPick?: boolean;
}

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  products: Product[];
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {half && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="text-sm text-gray-500 ml-1">({rating.toFixed(1)} / 5)</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Frank's Pick badge */}
      {product.franksPick && (
        <div className="bg-yellow-500 text-blue-950 text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2">
          <Star className="w-3 h-3 fill-blue-950 text-blue-950" /> Frank's Pick
        </div>
      )}

      {/* Image */}
      <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ShoppingCart className="w-10 h-10 text-yellow-300" />
            <span className="text-xs uppercase tracking-widest">Product Image</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <StarRating rating={product.stars} />
        <h3 className="font-bold text-blue-950 text-base mt-3 mb-2 leading-snug">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{product.description}</p>
        <div className="border-t border-gray-100 pt-4">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-950 text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-lg hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Check Price on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

const sections: Section[] = [
  {
    id: 'printers',
    label: 'Printers & Scanners',
    icon: <Stamp className="w-6 h-6" />,
    description: 'Best printers and scanners for home office notaries — tested gear that handles high-volume signing packages without missing a beat.',
    products: [
      {
        name: 'Brother HL-L5210DWT Business Monochrome Laser Printer',
        description: 'Dual paper trays, wireless & Gigabit Ethernet networking, built-in duplex printing, and large paper capacity — built for high-volume notary signings at home or the office.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4ei5vGF',
        image: '/brother-hl-l5210dwt.jpg',
        franksPick: true,
      },
      {
        name: 'HP LaserJet M602X CE993A Laser Printer (Renewed) — Budget Friendly',
        description: 'A certified renewed workhorse that delivers professional laser-quality prints at a fraction of the cost. Perfect for notaries who need reliable output without breaking the bank.',
        stars: 4.0,
        amazonUrl: 'https://amzn.to/3Siusco',
        image: '/hp-laserjet-m602x.jpg',
      },
      {
        name: 'Plustek PS186 Desktop Document Scanner',
        description: '50-page Auto Document Feeder scans entire signing packages in minutes. Compatible with Windows 7/8/10/11 — a must-have for digitizing and archiving your notary documents fast.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4obZ5fM',
        image: '/plustek-ps186.jpg',
      },
    ],
  },
  {
    id: 'computers',
    label: 'Computers & Tablets',
    icon: <Laptop className="w-6 h-6" />,
    description: 'Best laptops and iPads for notaries — fast, reliable, and built for the road.',
    products: [
      {
        name: 'Microsoft Surface Pro 7+ 2-in-1 Tablet — Intel Core i7, 16GB RAM, 512GB SSD (Renewed)',
        description: 'A powerhouse 2-in-1 tablet for notaries who need desktop performance on the road. 12.3" touchscreen, Windows 11 Pro, and all-day battery — perfect for RON sessions and document management.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4x629xR',
        image: '/microsoft-surface-pro-7.jpg',
        franksPick: true,
      },
      {
        name: 'Apple iPad 11-inch (A16) — 128GB, Wi-Fi 6, Liquid Retina Display, Silver',
        description: 'The latest iPad with A16 chip, 12MP front and back cameras, Touch ID, and all-day battery life. Lightweight and powerful — ideal for mobile notaries handling digital documents and RON sessions.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/3PVCDL8',
        image: '/apple-ipad-11.jpg',
      },
      {
        name: 'Dell 24 All-in-One Desktop — Intel Core 3, 8GB DDR5, 512GB SSD, Windows 11 Home',
        description: '23.8-inch FHD display, Intel Core 3 processor, and a clean all-in-one design — perfect for a home office notary who wants a powerful workstation without the clutter of a tower.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4e9WbDI',
        image: '/dell-24-all-in-one.jpg',
      },
    ],
  },
  {
    id: 'supplies',
    label: 'Notary Supplies',
    icon: <Stamp className="w-6 h-6" />,
    description: 'Stamps, journals, pens, embossers, and folders — the essentials every notary needs in their bag.',
    products: [
      {
        name: 'ExcelMark Notary Stamp — Official State Seal, All 50 States',
        description: 'Clean, professional impressions every time. Available for all 50 states with the official state seal — a must-have for every notary who wants to look sharp and stay compliant.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/4oePhSc',
        image: '/excelmark-notary-stamp.jpg',
        franksPick: true,
      },
      {
        name: 'Notary Journal — 496 Entries',
        description: 'A proper hard-cover notary journal with 496 entries. Keeps you legally protected and organized for every single signing appointment.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
      {
        name: 'SKILCRAFT B3 Aviator Multi-Color Pen (12-Pack)',
        description: 'The signing pen of choice for professionals. Smooth black ink, comfortable grip, and clients actually comment on how nice they write.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
      {
        name: 'Notary Embosser Seal',
        description: 'Adds a professional raised seal impression to your documents. Clients love the look and adds an extra layer of credibility to every notarization.',
        stars: 4.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
      {
        name: 'Professional Document Presentation Folders',
        description: 'Present signing packages like a pro. These two-pocket folders keep documents organized and leave a polished impression with every client.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
    ],
  },
  {
    id: 'software',
    label: 'Software & Apps',
    icon: <AppWindow className="w-6 h-6" />,
    description: 'Signing software, scheduling tools, and e-notary platforms that keep your business running smoothly.',
    products: [
      {
        name: 'Notarize.com (RON Platform)',
        description: 'My top pick for Remote Online Notarization. Easy to use, compliant in most states, and keeps a secure digital audit trail for every session.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
        franksPick: true,
      },
      {
        name: 'Notary Gadget (Business Management Software)',
        description: 'Built specifically for notaries. Track signings, mileage, income, and expenses all in one place. Makes tax time a breeze.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
      {
        name: 'DocuSign eSignature',
        description: 'The industry-standard for digital signatures. Clients already trust it and it integrates with almost every platform notaries work with.',
        stars: 4.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
    ],
  },
  {
    id: 'bags',
    label: 'Bags & Organization',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Notary bags, document organizers, and car accessories — stay mobile and look professional on every job.',
    products: [
      {
        name: 'Solo New York Pro Slim Laptop Briefcase',
        description: 'Professional, lightweight, and fits a 15.6" laptop plus all your notary supplies. This is what I carry to every single signing appointment.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
        franksPick: true,
      },
      {
        name: 'Expanding File Accordion Document Organizer',
        description: 'Keep multiple signing packages organized and separated. Color-coded tabs make it easy to grab the right documents at any appointment.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
      {
        name: 'Car Seat Back Organizer with Work Surface',
        description: 'Turns your backseat into a mobile office. Organize supplies, hold documents, and have a flat surface ready before you walk into a signing.',
        stars: 4.0,
        amazonUrl: 'https://amzn.to/PLACEHOLDER',
      },
    ],
  },
];

export default function NotaryToolkit() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* YouTube Banner */}
      <div className="bg-red-600 text-white text-center py-2.5 px-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest">
        <Youtube className="w-5 h-5" />
        As Seen On My YouTube Channel
        <Youtube className="w-5 h-5" />
      </div>

      {/* Sticky Section Nav */}
      <div className="sticky top-20 z-40 bg-blue-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide py-1">
          <span className="text-yellow-400 font-serif italic text-lg whitespace-nowrap pr-4 hidden md:block">The Notary's Toolkit</span>
          <div className="flex gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-white/70 hover:text-yellow-400 text-xs font-bold uppercase tracking-wider px-3 py-4 whitespace-nowrap transition-colors"
              >
                {s.label}
              </button>
            ))}
            <a
              href="#yt-cta"
              className="text-white/70 hover:text-yellow-400 text-xs font-bold uppercase tracking-wider px-3 py-4 whitespace-nowrap transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-blue-950 pt-16 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(234,179,8,0.12)_0%,transparent_65%)]" />
        <p className="font-serif italic text-yellow-400 text-lg tracking-widest mb-4 relative">Frank Coxx · Notary Public</p>
        <h1 className="text-white font-extrabold text-5xl md:text-7xl tracking-tight leading-none mb-4 relative">
          The Notary's <span className="text-yellow-400">Toolkit</span>
        </h1>
        <p className="text-white/50 text-lg tracking-wider mb-12 relative">Everything You Need to Run a Professional Notary Business</p>

        {/* Frank Intro Card */}
        <div className="max-w-2xl mx-auto bg-white/5 border border-yellow-400/20 rounded-xl p-8 flex gap-6 items-start text-left relative">
          <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-blue-950 font-extrabold text-2xl flex-shrink-0">FC</div>
          <div>
            <p className="text-white/75 text-sm leading-relaxed">
              <span className="text-yellow-400 font-bold">Hey! I'm Frank</span> — a working notary who has tested and used everything on this page.
              These are my personal recommendations to help you run a smooth, professional notary business.
              I only recommend products I actually use or genuinely believe in.
            </p>
            <p className="text-white/30 text-xs italic mt-3">
              ℹ️ Some links are affiliate links. I may earn a small commission at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, idx) => (
        <div key={section.id} id={section.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-yellow-500 font-serif italic text-base tracking-widest mb-2">Section {String(idx + 1).padStart(2, '0')}</p>
              <h2 className="text-blue-950 font-extrabold text-4xl tracking-tight flex items-center gap-3 mb-3">
                <span className="text-yellow-500">{section.icon}</span>
                {section.label}
              </h2>
              <p className="text-gray-500 text-base max-w-xl">{section.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {section.products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* YouTube CTA */}
      <div id="yt-cta" className="bg-red-600 py-24 px-6 text-center">
        <p className="font-serif italic text-white/70 text-lg tracking-widest mb-4">Join the Community</p>
        <h2 className="text-white font-extrabold text-4xl md:text-5xl tracking-tight leading-tight mb-4">
          Watch Me Work.<br />Learn the Business.
        </h2>
        <p className="text-white/75 text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Subscribe to my YouTube channel for real notary tips, gear reviews, signing walkthroughs, and everything I wish I knew when I started.
        </p>
        <a
          href="https://youtube.com/@PLACEHOLDER"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-red-600 font-extrabold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          <Youtube className="w-6 h-6" /> Subscribe on YouTube
        </a>
      </div>

      {/* Footer Disclosure */}
      <div className="bg-blue-950 py-12 px-6 text-center">
        <p className="font-serif italic text-yellow-400 text-xl mb-4">The Notary's Toolkit</p>
        <p className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto mb-4">
          <strong className="text-white/50">Affiliate Disclosure:</strong> This page contains affiliate links. As an Amazon Associate and affiliate partner of other services listed, I earn a small commission from qualifying purchases at no additional cost to you. I only recommend products I personally use or genuinely believe in. All opinions are my own.
        </p>
        <p className="text-white/15 text-xs">© 2026 Frank Coxx · Integrity Closings Charlotte · All Rights Reserved</p>
      </div>
    </div>
  );
}
