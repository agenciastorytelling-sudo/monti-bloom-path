import { Heart, Hand, Eye, BookOpen, Brain } from "lucide-react";
import { MissionCard } from "./MissionCard";

const missions = [
  {
    id: 1,
    title: "Movimento",
    description: "15 minutos de atividade física livre",
    icon: Heart,
    color: 'warm' as const,
    completed: false
  },
  {
    id: 2,
    title: "Vida Prática",
    description: "Organizar os brinquedos após usar",
    icon: Hand,
    color: 'garden' as const,
    completed: true
  },
  {
    id: 3,
    title: "Sensorial", 
    description: "Explorar texturas com materiais naturais",
    icon: Eye,
    color: 'sky' as const,
    completed: false
  },
  {
    id: 4,
    title: "Linguagem",
    description: "Contar uma história com suas palavras",
    icon: BookOpen,
    color: 'lavender' as const,
    completed: false
  },
  {
    id: 5,
    title: "Momento Calmo",
    description: "5 minutos de respiração ou contemplação",
    icon: Brain,
    color: 'sky' as const,
    completed: false
  }
];

export function DailyMissions() {
  const handleStartMission = (missionId: number) => {
    console.log(`Iniciando missão ${missionId}`);
    // Aqui será implementada a lógica de iniciar atividade
  };

  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-display font-medium mb-2 text-gradient-primary">
          Missões de Hoje
        </h2>
        <p className="text-muted-foreground">
          {completedCount} de {missions.length} missões concluídas
        </p>
        
        {/* Barra de progresso visual */}
        <div className="w-full max-w-md mx-auto mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-garden transition-all duration-500 ease-out"
            style={{ width: `${(completedCount / missions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            title={mission.title}
            description={mission.description}
            icon={mission.icon}
            color={mission.color}
            completed={mission.completed}
            onStart={() => handleStartMission(mission.id)}
          />
        ))}
      </div>
    </div>
  );
}