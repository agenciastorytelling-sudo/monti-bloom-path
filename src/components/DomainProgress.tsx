import { ProgressRing } from "./ProgressRing";
import { Badge } from "@/components/ui/badge";

interface DomainProgressProps {
  domain: string;
  level: 'explorando' | 'emergente' | 'consolidando';
  progress: number;
  description: string;
}

const levelConfig = {
  explorando: {
    color: 'warm' as const,
    label: 'Explorando',
    bg: 'bg-warm-peach/20',
    text: 'text-warm-coral'
  },
  emergente: {
    color: 'sky' as const,
    label: 'Emergente', 
    bg: 'bg-secondary/20',
    text: 'text-secondary-foreground'
  },
  consolidando: {
    color: 'primary' as const,
    label: 'Consolidando',
    bg: 'bg-primary-soft/20',
    text: 'text-primary'
  }
};

export function DomainProgress({ domain, level, progress, description }: DomainProgressProps) {
  const config = levelConfig[level];
  
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30">
      <ProgressRing 
        progress={progress}
        color={config.color}
        size="md"
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-display font-medium">{domain}</h4>
          <Badge variant="secondary" className={`${config.bg} ${config.text} border-0`}>
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}