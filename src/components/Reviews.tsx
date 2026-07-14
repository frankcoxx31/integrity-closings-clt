import { Star } from 'lucide-react';
import reviewsData from '../data/reviews.json';

const AVATAR_COLORS = ['bg-purple-500', 'bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-600'];

function avatarColorFor(name: string) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function StarRow({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) {
  return (
    <div className="flex text-accent-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < Math.round(rating) ? 'fill-current' : ''}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { rating, userRatingsTotal, reviews } = reviewsData;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Our Clients Say</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-slate-700">Excellent</span>
            {rating != null && <StarRow rating={rating} size="w-5 h-5" />}
            {rating != null && <span className="text-lg text-slate-600">{rating.toFixed(1)} out of 5</span>}
          </div>
          <p className="mt-2 text-slate-500">
            {userRatingsTotal != null ? `Based on ${userRatingsTotal} Google Reviews` : 'Based on Google Reviews'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${avatarColorFor(review.authorName)}`}>
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-slate-900">{review.authorName}</h3>
                  <p className="text-sm text-slate-500">{review.relativeTimeDescription}</p>
                </div>
                <div className="ml-auto">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <StarRow rating={review.rating} />
              </div>
              <p className="text-slate-600 leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
