import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MissionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'garden' | 'warm' | 'sky' | 'lavender';
  completed?: boolean;
  onStart?: () => void;
}

const colorMap = {
  garden: 'text-primary',
  warm: 'text-warm-coral',
  sky: 'text-secondary-foreground', 
  lavender: 'text-warm-lavender'
};

const gradientMap = {
  garden: 'bg-gradient-garden',
  warm: 'bg-gradient-sunrise',
  sky: 'bg-gradient-sky',
  lavender: 'bg-gradient-lavender'
};

export function MissionCard({ title, description, icon: Icon, color, completed = false, onStart }: MissionCardProps) {
  return (
    <Card className="mission-card group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${gradientMap[color]} flex items-center justify-center shadow-soft`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {completed ? (
              <span className="text-sm text-primary font-medium">✨ Concluída!</span>
            ) : (
              <span className="text-sm text-muted-foreground">Pronta para começar</span>
            )}
          </div>
          
          <Button 
            variant={completed ? "secondary" : "mission"}
            size="sm"
            onClick={onStart}
            className="transition-organic"
          >
            {completed ? "Ver detalhes" : "Iniciar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}