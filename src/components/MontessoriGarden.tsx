import { Flower, Bug, Sun, TreePine } from "lucide-react";

export function MontessoriGarden() {
  return (
    <div className="garden-container min-h-96 p-8 relative overflow-hidden">
      {/* Elementos flutuantes da natureza */}
      <div className="absolute top-6 right-8 floating-element">
        <Sun className="w-12 h-12 text-warm-peach/70" />
      </div>
      
      <div className="absolute top-16 left-12 floating-element sparkle" style={{ animationDelay: '1s' }}>
        <Bug className="w-8 h-8 text-warm-lavender" />
      </div>
      
      <div className="absolute bottom-8 left-8 floating-element" style={{ animationDelay: '2s' }}>
        <TreePine className="w-10 h-10 text-primary" />
      </div>
      
      <div className="absolute bottom-12 right-16 floating-element sparkle" style={{ animationDelay: '3s' }}>
        <Flower className="w-6 h-6 text-warm-coral" />
      </div>
      
      {/* Conteúdo central */}
      <div className="relative z-10 text-center pt-12">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-4 text-gradient-primary">
          Bem-vindo ao seu Jardim Montessori
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Um espaço acolhedor onde cada criança pode explorar, aprender e crescer no seu próprio ritmo.
        </p>
      </div>
      
      {/* Efeitos visuais adicionais */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-warm-peach/20 rounded-full blur-xl floating-element" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-primary-soft/30 rounded-full blur-2xl floating-element" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-warm-lavender/25 rounded-full blur-lg floating-element" style={{ animationDelay: '2.5s' }}></div>
      </div>
    </div>
  );
}