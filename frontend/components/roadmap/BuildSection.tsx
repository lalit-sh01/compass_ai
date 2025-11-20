import { Hammer, Package } from 'lucide-react';
import DeliverableList from '../ui/DeliverableList';
import type { BuildSection } from '@/lib/types';

interface BuildSectionProps {
  buildSection: BuildSection;
  weekNumber: number;
}

export default function BuildSectionComponent({ buildSection, weekNumber }: BuildSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
        <Hammer className="w-5 h-5" />
        <h3 className="text-lg font-bold">Build ({buildSection.hours}h)</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">{buildSection.projectTitle}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{buildSection.description}</p>
        </div>

        {buildSection.technicalStack && buildSection.technicalStack.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Technical Stack</h5>
            <div className="flex flex-wrap gap-2">
              {buildSection.technicalStack.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {buildSection.components && buildSection.components.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Components
            </h5>
            <ul className="space-y-1.5">
              {buildSection.components.map((component, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-orange-300 dark:border-orange-700">
                  {component}
                </li>
              ))}
            </ul>
          </div>
        )}


        {buildSection.deliverables && buildSection.deliverables.length > 0 && (
          <DeliverableList
            deliverables={buildSection.deliverables}
            title="Deliverables"
            weekNumber={weekNumber}
            section="build"
          />
        )}
      </div>
    </div>
  );
}
