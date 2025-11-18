import { CheckCircle2, Circle } from 'lucide-react';
import type { Deliverable, Subtask } from '@/lib/types';

interface DeliverableListProps {
  deliverables: Deliverable[] | Subtask[];
  title?: string;
}

export default function DeliverableList({ deliverables, title }: DeliverableListProps) {
  if (!deliverables || deliverables.length === 0) return null;

  const renderSubtasks = (subtasks: Subtask[] | undefined) => {
    if (!subtasks || subtasks.length === 0) return null;

    return (
      <ul className="ml-8 mt-2 space-y-2">
        {subtasks.map((subtask, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {subtask.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
              {subtask.description}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-3">
      {title && <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>}
      <ul className="space-y-3">
        {deliverables.map((item, index) => (
          <li key={index} className="space-y-2">
            <div className="flex items-start gap-3">
              {item.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm leading-relaxed ${
                  item.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.description}
              </span>
            </div>
            {'subtasks' in item && renderSubtasks(item.subtasks)}
          </li>
        ))}
      </ul>
    </div>
  );
}
