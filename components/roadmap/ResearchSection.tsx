import ResourceList from '../ui/ResourceList';
import DeliverableList from '../ui/DeliverableList';
import { EditableTopic } from '../viewer/editable/EditableTopic';
import { useRoadmapMutations } from '@/hooks/useRoadmapMutations';
import type { ResearchSection } from '@/lib/types';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface ResearchSectionProps {
  researchSection: ResearchSection;
  weekNumber: number;
}

export default function ResearchSectionComponent({ researchSection, weekNumber }: ResearchSectionProps) {
  const { toggleTopic, updateTopic, removeTopic } = useRoadmapMutations();

  const handleToggleTopic = async (id: string, checked: boolean) => {
    // ID format: w{weekNumber}-topic-{index}-research
    // We need to extract the index
    const parts = id.split('-');
    const indexStr = parts[2]; // w1-topic-0-research -> 0
    const index = parseInt(indexStr);

    if (!isNaN(index)) {
      await toggleTopic(weekNumber, index, checked);
    }
  };

  const handleSaveTopic = async (id: string, newDescription: string) => {
    const parts = id.split('-');
    const indexStr = parts[2];
    const index = parseInt(indexStr);

    if (!isNaN(index)) {
      await updateTopic(weekNumber, index, newDescription);
    }
  };

  const handleRemoveTopic = async (index: number) => {
    await removeTopic(weekNumber, index);
  };

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
                <EditableTopic
                  topic={topic}
                  weekNumber={weekNumber}
                  index={index}
                  isCompleted={topic.isCompleted}
                  onToggle={handleToggleTopic}
                  onSave={handleSaveTopic}
                  onDelete={() => handleRemoveTopic(index)}
                />

                {/* Topic Resources */}
                <div className="ml-8">
                  <ResourceList
                    resources={topic.suggestedResources || []}
                    weekNumber={weekNumber}
                    topicIndex={index}
                    topicDescription={topic.description}
                  />
                </div>

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
                            className={`text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'
                              }`}
                          >
                            {subtask.description}
                          </span>
                        </div>
                        {/* Subtask resources are read-only for now as we don't have mutation support yet */}
                        {subtask.suggestedResources && subtask.suggestedResources.length > 0 && (
                          <div className="ml-6 space-y-1">
                            <ResourceList
                              resources={subtask.suggestedResources}
                              weekNumber={weekNumber}
                              topicIndex={-1} // Read-only
                              topicDescription="Subtask Resource"
                            />
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
            {/* General resources are read-only for now */}
            <div className="space-y-1">
              <ResourceList
                resources={researchSection.resources}
                weekNumber={weekNumber}
                topicIndex={-1} // Read-only
                topicDescription="General Resources"
              />
            </div>
          </div>
        )}

        {/* Research Deliverables (some weeks have these) */}
        {researchSection.deliverables && researchSection.deliverables.length > 0 && (
          <DeliverableList
            deliverables={researchSection.deliverables}
            title="Research Deliverables"
            weekNumber={weekNumber}
            section="research"
          />
        )}
      </div>
    </div>
  );
}
