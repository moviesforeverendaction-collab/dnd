import { ContentCard } from './ContentCard';
import { Content } from '../../lib/types';

interface ContentRowProps {
  title: string;
  contents: Content[];
}

export function ContentRow({ title, contents }: ContentRowProps) {
  if (contents.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {contents.map((content) => (
          <div key={content.slug} className="w-[280px] flex-shrink-0">
            <ContentCard content={content} />
          </div>
        ))}
      </div>
    </div>
  );
}