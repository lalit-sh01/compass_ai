interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({ completed, total, percentage, showLabel = true, size = 'md' }: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const getProgressColor = () => {
    if (percentage >= 75) return 'bg-green-600';
    if (percentage >= 50) return 'bg-blue-600';
    if (percentage >= 25) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className={`flex justify-between mb-1 ${textClasses[size]} text-gray-700 dark:text-gray-300`}>
          <span>Progress</span>
          <span className="font-semibold">
            {completed}/{total} ({percentage}%)
          </span>
        </div>
      )}
      <div className={`w-full ${heightClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${heightClasses[size]} ${getProgressColor()} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
