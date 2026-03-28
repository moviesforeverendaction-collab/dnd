import { Link } from 'react-router-dom';
import { Content } from '../../lib/types';

interface HeroBannerProps {
  content: Content;
}

export function HeroBanner({ content }: HeroBannerProps) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-surface-card">
      {content.backdrop_path ? (
        <img
          src={content.backdrop_path}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-card" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-gray-300 mb-4 line-clamp-3">{content.overview}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="text-white">{content.year}</span>
            <span>•</span>
            <span>{content.type === 'movie' ? 'Movie' : 'TV Series'}</span>
            <span>•</span>
            <span>{content.rating.toFixed(1)}★</span>
            {content.genres.length > 0 && (
              <>
                <span>•</span>
                <span>{content.genres.join(', ')}</span>
              </>
            )}
          </div>
          <Link
            to={`/watch/${content.slug}`}
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded font-semibold transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}