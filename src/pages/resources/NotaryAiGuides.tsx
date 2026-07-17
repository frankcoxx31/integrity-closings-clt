import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageMeta } from '../../seo/pageMeta';
import { usePageMeta } from '../../hooks/usePageMeta';

interface Guide {
  title: string;
  description: string;
  file: string;
  cover: string;
}

const guides: Guide[] = [
  {
    title: 'Prompting Claude for Notaries',
    description: 'A practical guide to using Claude for day-to-day notary work — drafting client messages, organizing signing packages, and answering procedural questions.',
    file: '/downloads/prompting-claude-for-notaries.pdf',
    cover: '/downloads/covers/cover-prompting-claude-for-notaries.jpg',
  },
  {
    title: 'Prompting ChatGPT for Notaries',
    description: 'Get more useful answers out of ChatGPT for scheduling, client communication, and general notary business tasks.',
    file: '/downloads/prompting-chatgpt-for-notaries.pdf',
    cover: '/downloads/covers/cover-prompting-chatgpt-for-notaries.jpg',
  },
  {
    title: 'Prompting Gemini for Notaries',
    description: "Tips for getting the most out of Google's Gemini for everyday notary business writing and organization.",
    file: '/downloads/prompting-gemini-for-notaries.pdf',
    cover: '/downloads/covers/cover-prompting-gemini-for-notaries.jpg',
  },
  {
    title: 'Prompting Perplexity for Notaries',
    description: 'Use Perplexity for research and fact-checking — verifying notary requirements, document rules, and state guidelines with cited sources.',
    file: '/downloads/prompting-perplexity-for-notaries.pdf',
    cover: '/downloads/covers/cover-prompting-perplexity-for-notaries.jpg',
  },
  {
    title: 'Prompting Google AI Studio for Notaries',
    description: "A free research sandbox for notaries who want to experiment with AI without a paid subscription.",
    file: '/downloads/prompting-google-ai-studio-for-notaries.pdf',
    cover: '/downloads/covers/cover-prompting-google-ai-studio-for-notaries.jpg',
  },
  {
    title: 'Designing with Claude Design for Notaries',
    description: 'Create simple flyers and social graphics to promote your notary business, no design experience required.',
    file: '/downloads/designing-with-claude-design-for-notaries.pdf',
    cover: '/downloads/covers/cover-designing-with-claude-design-for-notaries.jpg',
  },
];

export default function NotaryAiGuides() {
  usePageMeta(pageMeta['/resources/notary-ai-guides']);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-brand-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-brand-200 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-accent-400" />
            <h1 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight">
              Notary AI Guides
            </h1>
          </div>
          <p className="text-lg text-brand-100 max-w-2xl">
            Free, downloadable guides to help you use AI tools in your notary business — no signup, no email required.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="bg-slate-100 flex items-center justify-center p-4">
                <img
                  src={guide.cover}
                  alt={`${guide.title} — guide cover`}
                  className="h-56 w-auto object-contain shadow-md rounded"
                  width="400"
                  height="518"
                  loading="lazy"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{guide.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow mb-6">
                  {guide.description}
                </p>
                <a
                  href={guide.file}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Free Guide
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
