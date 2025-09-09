import { DomainProgress } from "./DomainProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const domains = [
  {
    domain: "Vida Prática",
    level: 'consolidando' as const,
    progress: 75,
    description: "Organização, cuidado pessoal e autonomia"
  },
  {
    domain: "Sensorial",
    level: 'emergente' as const,
    progress: 45,
    description: "Discriminação visual, tátil e auditiva"
  },
  {
    domain: "Linguagem",
    level: 'explorando' as const,
    progress: 30,
    description: "Comunicação oral e pré-escrita"
  },
  {
    domain: "Matemática",
    level: 'explorando' as const,
    progress: 25,
    description: "Conceitos numéricos e formas geométricas"
  }
];

export function ChildProgress() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-gradient-primary">
          Progresso nos Domínios Montessori
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {domains.map((domain, index) => (
          <DomainProgress
            key={index}
            domain={domain.domain}
            level={domain.level}
            progress={domain.progress}
            description={domain.description}
          />
        ))}
      </CardContent>
    </Card>
  );
}