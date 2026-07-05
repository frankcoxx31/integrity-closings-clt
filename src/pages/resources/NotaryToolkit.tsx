import { Star, StarHalf, ShoppingCart, Youtube, Stamp, Laptop, AppWindow, Briefcase } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  stars: number;
  amazonUrl: string;
  image?: string;
  franksPick?: boolean;
  buttonText?: string;
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
        <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
      ))}
      {half && <StarHalf className="w-4 h-4 fill-accent-400 text-accent-400" />}
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
        <div className="bg-accent-500 text-brand-950 text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2">
          <Star className="w-3 h-3 fill-brand-950 text-brand-950" /> Frank's Pick
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
            <ShoppingCart className="w-10 h-10 text-accent-300" />
            <span className="text-xs uppercase tracking-widest">Product Image</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <StarRating rating={product.stars} />
        <h3 className="font-bold text-brand-950 text-base mt-3 mb-2 leading-snug">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{product.description}</p>
        <div className="border-t border-gray-100 pt-4">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-950 text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-lg hover:bg-accent-500 hover:text-brand-950 transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.buttonText || 'Check Price on Amazon'}
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
        name: 'Clever Fox Notary Journal Log Book — 612 Entries, Numbered Pages, Hardcover 8.5x11"',
        description: '612 record entries with numbered pages and a durable hardcover — keeps you legally protected and perfectly organized for every signing. One of the best notary journals on the market.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4dOXhWt',
        image: '/clever-fox-notary-journal.jpg',
      },
      {
        name: 'Linbsunne Gel Pens Black Ink 0.5mm Fine Point — Smooth Writing Retractable (12-Count)',
        description: 'Ultra-fine 0.5mm tip delivers clean, precise signatures every time. Smooth retractable design, great grip, and clients love how they write — a notary bag essential.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4o8lr1E',
        image: '/linbsunne-gel-pens.jpg',
      },
      {
        name: 'Start Your Notary Public & Loan Signing Agent Business — The Insider\'s Guide to a Six-Figure Notary Side Hustle',
        description: 'Everything you need to launch and grow a profitable notary business — all state requirements included. The go-to guide for notaries serious about building real income.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/4ema42H',
        image: '/start-your-notary-business-book.jpg',
      },
      {
        name: 'Amazon Basics Multipurpose Printer Paper — 8.5x11", 20lb, 92 Bright, 8 Reams (4,000 Sheets)',
        description: 'Never run out mid-signing. 4,000 sheets of bright white 92-brightness paper delivers crisp, professional prints every time — stocked in bulk so you\'re always ready for high-volume signing packages.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4g5bUpQ',
        image: '/amazon-basics-printer-paper.jpg',
      },
      {
        name: 'Staples Recycled Legal Size File Folders — 1/3-Cut Tabs, Manila, 100/Box',
        description: 'Legal-size manila folders perfect for organizing signing packages. 30% recycled paper stock, 1/3-cut tabs for easy labeling — stock up and never run out on a busy signing day.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4x8DLvC',
        image: '/staples-file-folders.jpg',
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
        name: 'Certified Trust Delivery Agent',
        description: 'Get certified and stand out from the competition. This training program walks you through everything you need to become a trusted, professional trust delivery agent and grow your notary income.',
        stars: 5.0,
        amazonUrl: 'https://www.skool.com/signup?ref=ab105e0f05d449c1a72769eb3bafead7',
        image: '/certified-trust-delivery-agent.jpg',
        franksPick: true,
        buttonText: 'Enroll Now',
      },
      {
        name: 'High Performance Notary',
        description: 'Take your notary business to the next level. High Performance Notary gives you the systems, strategies, and community to build a thriving, six-figure notary business.',
        stars: 5.0,
        amazonUrl: 'https://www.skool.com/signup?ref=ab105e0f05d449c1a72769eb3bafead7',
        image: '/high-performance-notary.jpg',
        buttonText: 'Enroll Now',
      },
      {
        name: 'AI Content Creators',
        description: 'Learn how to use AI to create content, grow your notary brand online, and attract more clients. Perfect for notaries who want to build a presence on social media and YouTube.',
        stars: 5.0,
        amazonUrl: 'https://www.skool.com/signup?ref=ab105e0f05d449c1a72769eb3bafead7',
        image: '/ai-content-creators.jpg',
        buttonText: 'Join Now',
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
        name: 'VANKEAN Premium Laptop Briefcase — Fits Up to 17.3", Expandable, Water-Repellent',
        description: 'This is what I carry to every signing. Premium business shoulder bag with expandable storage, water-repellent exterior, and enough room for your laptop, journal, stamps, and full signing kit.',
        stars: 5.0,
        amazonUrl: 'https://amzn.to/3RZtyRZ',
        image: '/vankean-laptop-briefcase.jpg',
        franksPick: true,
      },
      {
        name: 'ENGPOW Fireproof File Organizer Bag — 13-Pocket Accordion, Lock & Labels, Portable',
        description: 'Fireproof, lockable, and portable with 13 accordion pockets and labels. Keeps your important notary documents, contracts, and records safe whether you\'re at home or on the road.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4fuP3nH',
        image: '/engpow-file-organizer.jpg',
      },
      {
        name: 'TRUNKCRATEPRO XL Heavy-Duty Trunk Organizer — 6 Adjustable Compartments, Non-Slip Base, Foldable',
        description: 'Built for SUVs and trucks — 6 adjustable compartments with securing straps keep your notary supplies, printer, and signing packages from shifting on the way to every appointment.',
        stars: 4.5,
        amazonUrl: 'https://amzn.to/4eqgVXZ',
        image: '/trunkcratepro-xl.jpg',
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
      <div className="bg-red-600 text-white text-center py-2.5 px-4 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest flex-wrap">
        <Youtube className="w-5 h-5" />
        As Seen On My YouTube Channel
        <a
          href="https://www.youtube.com/@IntegrityClosingsCLT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full text-xs font-extrabold hover:bg-red-50 transition-colors"
        >
          <Youtube className="w-3.5 h-3.5" /> Subscribe
        </a>
      </div>

      {/* Sticky Section Nav */}
      <div className="sticky top-20 z-40 bg-brand-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide py-1">
          <span className="text-accent-400 font-serif italic text-lg whitespace-nowrap pr-4 hidden md:block">The Notary's Toolkit</span>
          <div className="flex gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-white/70 hover:text-accent-400 text-xs font-bold uppercase tracking-wider px-3 py-4 whitespace-nowrap transition-colors"
              >
                {s.label}
              </button>
            ))}
            <a
              href="#yt-cta"
              className="text-white/70 hover:text-accent-400 text-xs font-bold uppercase tracking-wider px-3 py-4 whitespace-nowrap transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-brand-950 pt-16 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(234,179,8,0.12)_0%,transparent_65%)]" />
        <p className="font-serif italic text-accent-400 text-lg tracking-widest mb-4 relative">Frank Coxx · Notary Public</p>
        <h1 className="text-white font-extrabold text-5xl md:text-7xl tracking-tight leading-none mb-4 relative">
          The Notary's <span className="text-accent-400">Toolkit</span>
        </h1>
        <p className="text-white/50 text-lg tracking-wider mb-12 relative">Everything You Need to Run a Professional Notary Business</p>

        {/* Frank Intro Card */}
        <div className="max-w-2xl mx-auto bg-white/5 border border-accent-400/20 rounded-xl p-8 flex gap-6 items-start text-left relative">
          <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center text-brand-950 font-extrabold text-2xl flex-shrink-0">FC</div>
          <div>
            <p className="text-white/75 text-sm leading-relaxed">
              <span className="text-accent-400 font-bold">Hey! I'm Frank</span> — a working notary who has tested and used everything on this page.
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
              <p className="text-accent-500 font-serif italic text-base tracking-widest mb-2">Section {String(idx + 1).padStart(2, '0')}</p>
              <h2 className="text-brand-950 font-extrabold text-4xl tracking-tight flex items-center gap-3 mb-3">
                <span className="text-accent-500">{section.icon}</span>
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
          href="https://www.youtube.com/@IntegrityClosingsCLT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-red-600 font-extrabold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          <Youtube className="w-6 h-6" /> Subscribe on YouTube
        </a>
      </div>

      {/* Footer Disclosure */}
      <div className="bg-brand-950 py-12 px-6 text-center">
        <p className="font-serif italic text-accent-400 text-xl mb-4">The Notary's Toolkit</p>
        <p className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto mb-4">
          <strong className="text-white/50">Affiliate Disclosure:</strong> This page contains affiliate links. As an Amazon Associate and affiliate partner of other services listed, I earn a small commission from qualifying purchases at no additional cost to you. I only recommend products I personally use or genuinely believe in. All opinions are my own.
        </p>
        <p className="text-white/15 text-xs">© 2026 Frank Coxx · Integrity Closings Charlotte · All Rights Reserved</p>
      </div>
    </div>
  );
}
