import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import autoPosts from '../data/auto-blog-posts.json';
import { manualBlogPosts } from '../data/manual-blog-posts';

export default function Blog() {
  const posts = [
    // Newest posts (data-driven, from src/data/auto-blog-posts.json) appear first.
    ...autoPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      excerpt: p.excerpt,
      imageUrl: p.imageUrl,
    })),
    ...manualBlogPosts,
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Image Section */}
      <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
          alt="Integrity Closings Blog Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Blog Header Content */}
      <div className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-brand-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">Insights & Expert Advice</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Helpful articles, guides, and insights about notary services, loan signings, and more.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post, index) => (
            <Link 
              key={index} 
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-64 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors font-serif">
                  {post.title}
                </h2>
                <p className="text-slate-600 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-brand-600 font-semibold group-hover:text-brand-700">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
