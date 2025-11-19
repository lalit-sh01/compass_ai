import { Share2, Tag } from 'lucide-react';
import DeliverableList from '../ui/DeliverableList';
import type { ShareSection } from '@/lib/types';

interface ShareSectionProps {
  shareSection: ShareSection;
  weekNumber: number;
}

export default function ShareSectionComponent({ shareSection, weekNumber }: ShareSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <Share2 className="w-5 h-5" />
        <h3 className="text-lg font-bold">Share ({shareSection.hours}h)</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-green-50/50 dark:bg-green-950/20">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{shareSection.artifactTitle}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{shareSection.artifactDescription}</p>

          {shareSection.details && shareSection.details.length > 0 && (
            <div className="space-y-1.5 mb-3">
              {shareSection.details.map((detail, index) => (
                <div key={index} className="text-xs text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-700">
                  {detail}
                </div>
              ))}
            </div>
          )}

          {shareSection.tags && shareSection.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-gray-500" />
              {shareSection.tags.map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Share Deliverables (some weeks have these) */}
        {shareSection.deliverables && shareSection.deliverables.length > 0 && (
          <DeliverableList
            deliverables={shareSection.deliverables}
            title="Deliverables"
            weekNumber={weekNumber}
            section="share"
          />
        )}
      </div>
    </div>
  );
}
