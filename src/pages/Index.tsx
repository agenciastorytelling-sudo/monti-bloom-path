import { MontessoriGarden } from "@/components/MontessoriGarden";
import { DailyMissions } from "@/components/DailyMissions";
import { ChildProgress } from "@/components/ChildProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, User, Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-garden rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white font-display font-medium">M</span>
            </div>
            <div>
              <h1 className="font-display font-medium text-lg">Jardim Montessori</h1>
              <p className="text-sm text-muted-foreground">Olá, Maria! 👋</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="outline" asChild>
              <a href="/login">Entrar</a>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Jardim Gamificado */}
      <section>
        <MontessoriGarden />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-garden rounded-xl mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-display font-medium text-lg">4</span>
              </div>
              <h3 className="font-display font-medium mb-1">Atividades Hoje</h3>
              <p className="text-sm text-muted-foreground">1 concluída</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-warm-coral/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-sunrise rounded-xl mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-display font-medium text-lg">7</span>
              </div>
              <h3 className="font-display font-medium mb-1">Dias Consecutivos</h3>
              <p className="text-sm text-muted-foreground">Parabéns! 🌱</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-secondary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-sky rounded-xl mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-display font-medium text-lg">✨</span>
              </div>
              <h3 className="font-display font-medium mb-1">Nível Jardim</h3>
              <p className="text-sm text-muted-foreground">Florescendo</p>
            </CardContent>
          </Card>
        </div>

        {/* Missões do Dia */}
        <section className="animate-fade-in-up">
          <DailyMissions />
        </section>

        {/* Progresso da Criança */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <ChildProgress />
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="font-display font-medium mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📝 Registrar Atividade
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  😴 Log de Sono
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏃 Movimento do Dia
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="font-display font-medium mb-4">Próximas Recomendações</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-primary-soft/20 rounded-lg">
                  <p className="font-medium text-primary">Encaixes Cilíndricos</p>
                  <p className="text-muted-foreground">Sugerido porque mostrou interesse em formas</p>
                </div>
                <div className="p-3 bg-warm-peach/20 rounded-lg">
                  <p className="font-medium text-warm-coral">Cuidar das Plantas</p>
                  <p className="text-muted-foreground">Desenvolvimento de responsabilidade</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
