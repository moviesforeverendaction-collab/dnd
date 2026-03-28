import { Link } from 'react-router-dom';
import { Content } from '../../lib/types';

interface ContentCardProps {
  content: Content;
  size?: 'normal' | 'large';
}

export function ContentCard({ content, size = 'normal' }: ContentCardProps) {
  const imageClass = size === 'large' 
    ? 'aspect-[2/3] rounded-lg' 
    : 'aspect-video rounded-md';

  return (
    <Link 
      to={`/watch/${content.slug}`}
      className="group relative cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
    >
      <div className={`relative overflow-hidden bg-surface-card ${imageClass}`}>
        {content.poster_path ? (
          <img
            src={content.poster_path}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-card">
            <svg className="w-12 h-12 text-surface-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth={2} />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white bg-brand px-1.5 py-0.5 rounded">
                {content.type === 'movie' ? 'Movie' : 'Series'}
              </span>
              {content.status === 'broken' && (
                <span className="text-xs text-white bg-red-900 px-1.5 py-0.5 rounded">
                  Unavailable
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-white line-clamp-2">{content.title}</h3>
            <p className="text-xs text-gray-300">{content.year}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded">
                {content.rating.toFixed(1)}★
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}