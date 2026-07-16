import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found | ${businessConfig.name}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "The page you're looking for doesn't exist or may have moved.");
    }
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, follow');
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-sans">Page Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist or may have moved. If you need a mobile notary in Charlotte, NC, we're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <a
              href={`tel:${businessConfig.phone.tel}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-600 text-brand-600 font-bold rounded-lg hover:bg-brand-50 transition-colors"
            >
              Call {businessConfig.phone.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
