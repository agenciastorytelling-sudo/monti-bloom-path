interface ProgressRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  color?: 'primary' | 'warm' | 'sky';
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20'
};

const colorMap = {
  primary: 'hsl(var(--primary))',
  warm: 'hsl(var(--warm-coral))',
  sky: 'hsl(var(--secondary))'
};

export function ProgressRing({ progress, size = 'md', label, color = 'primary' }: ProgressRingProps) {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
      <svg 
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 50 50"
      >
        {/* Background circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="hsl(var(--muted))"
          strokeWidth="3"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={colorMap[color]}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {label ? (
          <span className="text-xs font-medium text-center leading-none">
            {label}
          </span>
        ) : (
          <span className="text-sm font-medium">
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
}