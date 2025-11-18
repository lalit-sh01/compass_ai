import { BookOpen, CheckCircle2, Circle } from 'lucide-react';
import ResourceLink from '../ui/ResourceLink';
import DeliverableList from '../ui/DeliverableList';
import type { ResearchSection } from '@/lib/types';

interface ResearchSectionProps {
  researchSection: ResearchSection;
}

export default function ResearchSectionComponent({ researchSection }: ResearchSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <BookOpen className="w-5 h-5" />
        <h3 className="text-lg font-bold">Research ({researchSection.hours}h)</h3>
      </div>

      <div className="space-y-6">
        {/* Deep Dive Topics */}
        {researchSection.deepDiveTopics && researchSection.deepDiveTopics.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Deep Dive Topics</h4>
            {researchSection.deepDiveTopics.map((topic, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-950/20 space-y-3"
              >
                <div className="flex items-start gap-3">
                  {topic.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        topic.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Topic Resources */}
                {topic.suggestedResources && topic.suggestedResources.length > 0 && (
                  <div className="ml-8 space-y-1">
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</div>
                    {topic.suggestedResources.map((resource, rIndex) => (
                      <ResourceLink key={rIndex} resource={resource} />
                    ))}
                  </div>
                )}

                {/* Subtasks */}
                {topic.subtasks && topic.subtasks.length > 0 && (
                  <div className="ml-8 space-y-3">
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Subtasks</div>
                    {topic.subtasks.map((subtask, sIndex) => (
                      <div key={sIndex} className="space-y-2">
                        <div className="flex items-start gap-2">
                          {subtask.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {subtask.description}
                          </span>
                        </div>
                        {subtask.suggestedResources && subtask.suggestedResources.length > 0 && (
                          <div className="ml-6 space-y-1">
                            {subtask.suggestedResources.map((resource, rIndex) => (
                              <ResourceLink key={rIndex} resource={resource} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* General Resources */}
        {researchSection.resources && researchSection.resources.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Resources</h4>
            <div className="space-y-1">
              {researchSection.resources.map((resource, index) => (
                <ResourceLink key={index} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Research Deliverables (some weeks have these) */}
        {researchSection.deliverables && researchSection.deliverables.length > 0 && (
          <DeliverableList deliverables={researchSection.deliverables} title="Research Deliverables" />
        )}
      </div>
    </div>
  );
}
