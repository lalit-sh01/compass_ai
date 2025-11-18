import { ExternalLink } from 'lucide-react';
import { getResourceTypeColor } from '@/lib/roadmap-utils';
import type { Resource } from '@/lib/types';

interface ResourceLinkProps {
  resource: Resource;
  showType?: boolean;
}

export default function ResourceLink({ resource, showType = true }: ResourceLinkProps) {
  const { title, type, url } = resource;

  const content = (
    <div className="flex items-start gap-2 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </span>
          {showType && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getResourceTypeColor(type)}`}>
              {type}
            </span>
          )}
        </div>
      </div>
      {url && (
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {content}
      </a>
    );
  }

  return <div className="p-2">{content}</div>;
}
