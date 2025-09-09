-- Create custom types
CREATE TYPE public.organization_type AS ENUM ('family', 'school');
CREATE TYPE public.user_role AS ENUM ('admin', 'educator', 'guardian');
CREATE TYPE public.activity_domain AS ENUM ('practical', 'sensory', 'language', 'math', 'life');
CREATE TYPE public.activity_outcome AS ENUM ('exploring', 'emerging', 'consolidating');
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'school');
CREATE TYPE public.subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trialing');

-- Organizations table
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type organization_type NOT NULL,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Organization members table
CREATE TABLE public.org_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'guardian',
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    joined_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(org_id, user_id)
);

-- User profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Children table
CREATE TABLE public.children (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    preferred_name TEXT,
    birthdate DATE NOT NULL,
    notes TEXT,
    special_needs TEXT,
    avatar_theme TEXT DEFAULT 'garden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activities table
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    domain activity_domain NOT NULL,
    age_min INTEGER NOT NULL CHECK (age_min >= 0),
    age_max INTEGER NOT NULL CHECK (age_max >= age_min),
    difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    materials TEXT[],
    steps TEXT[],
    offline_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activity logs table
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_min INTEGER CHECK (duration_min > 0),
    outcome activity_outcome,
    observations_text TEXT,
    media_urls TEXT[],
    created_by_user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sleep logs table
CREATE TABLE public.sleep_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    sleep_start TIME,
    sleep_end TIME,
    naps_count INTEGER DEFAULT 0 CHECK (naps_count >= 0),
    total_hours DECIMAL(4,2) CHECK (total_hours >= 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Movement logs table
CREATE TABLE public.movement_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    min_light INTEGER DEFAULT 0 CHECK (min_light >= 0),
    min_moderate INTEGER DEFAULT 0 CHECK (min_moderate >= 0),
    min_vigorous INTEGER DEFAULT 0 CHECK (min_vigorous >= 0),
    free_play_min INTEGER DEFAULT 0 CHECK (free_play_min >= 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Screen time logs table
CREATE TABLE public.screen_time_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    screen_minutes INTEGER DEFAULT 0 CHECK (screen_minutes >= 0),
    sedentary_minutes INTEGER DEFAULT 0 CHECK (sedentary_minutes >= 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Assessments table
CREATE TABLE public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    domain_scores JSONB,
    habit_balance JSONB,
    narrative TEXT,
    created_by_user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recommendations table
CREATE TABLE public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    items JSONB,
    rationale TEXT,
    generated_by TEXT DEFAULT 'ai',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    plan subscription_plan NOT NULL DEFAULT 'free',
    status subscription_status NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Users can view organizations they belong to" ON public.organizations
    FOR SELECT USING (
        owner_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM public.org_members WHERE org_id = id AND user_id = auth.uid())
    );

CREATE POLICY "Users can create organizations" ON public.organizations
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Organization owners can update their organizations" ON public.organizations
    FOR UPDATE USING (owner_id = auth.uid());

-- RLS Policies for org_members
CREATE POLICY "Users can view org members of their organizations" ON public.org_members
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.organizations WHERE id = org_id AND owner_id = auth.uid()) OR
        user_id = auth.uid()
    );

CREATE POLICY "Organization owners can manage members" ON public.org_members
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.organizations WHERE id = org_id AND owner_id = auth.uid())
    );

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for children
CREATE POLICY "Users can view children in their organizations" ON public.children
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.org_members WHERE org_id = children.org_id AND user_id = auth.uid())
    );

CREATE POLICY "Organization members can manage children" ON public.children
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.org_members WHERE org_id = children.org_id AND user_id = auth.uid())
    );

-- RLS Policies for activities (public read, admin write)
CREATE POLICY "Everyone can view activities" ON public.activities
    FOR SELECT USING (true);

-- RLS Policies for activity_logs
CREATE POLICY "Users can view activity logs for children in their organizations" ON public.activity_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = activity_logs.child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create activity logs for children in their organizations" ON public.activity_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = child_id AND om.user_id = auth.uid()
        ) AND created_by_user_id = auth.uid()
    );

-- Similar policies for other log tables
CREATE POLICY "Users can view sleep logs for children in their organizations" ON public.sleep_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = sleep_logs.child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create sleep logs for children in their organizations" ON public.sleep_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view movement logs for children in their organizations" ON public.movement_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = movement_logs.child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create movement logs for children in their organizations" ON public.movement_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view screen time logs for children in their organizations" ON public.screen_time_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = screen_time_logs.child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create screen time logs for children in their organizations" ON public.screen_time_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = child_id AND om.user_id = auth.uid()
        )
    );

-- Policies for assessments and recommendations
CREATE POLICY "Users can view assessments for children in their organizations" ON public.assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = assessments.child_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view recommendations for children in their organizations" ON public.recommendations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.children c 
            JOIN public.org_members om ON c.org_id = om.org_id 
            WHERE c.id = recommendations.child_id AND om.user_id = auth.uid()
        )
    );

-- Policies for subscriptions
CREATE POLICY "Users can view subscriptions for their organizations" ON public.subscriptions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.org_members WHERE org_id = subscriptions.org_id AND user_id = auth.uid())
    );

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample activities
INSERT INTO public.activities (title, description, domain, age_min, age_max, difficulty, materials, steps) VALUES
('Encaixes Cilíndricos', 'Atividade sensorial com cilindros de diferentes tamanhos', 'sensory', 2, 4, 1, ARRAY['Blocos cilíndricos', 'Base de madeira'], ARRAY['Retire os cilindros', 'Observe as diferenças', 'Encaixe novamente']),
('Torre Rosa', 'Construção com cubos de diferentes tamanhos', 'sensory', 2, 5, 2, ARRAY['Cubos rosa'], ARRAY['Remova os cubos', 'Construa a torre do maior para o menor']),
('Vida Prática - Lavar Mãos', 'Desenvolvimento da autonomia e cuidado pessoal', 'practical', 1, 6, 1, ARRAY['Sabão', 'Toalha', 'Água'], ARRAY['Abra a torneira', 'Ensaboe as mãos', 'Enxágue', 'Seque com a toalha']),
('Letras de Lixa', 'Reconhecimento tátil das letras', 'language', 3, 6, 2, ARRAY['Letras de lixa', 'Papel'], ARRAY['Trace a letra com o dedo', 'Diga o som da letra', 'Pratique a escrita']),
('Barras Vermelhas', 'Conceito de comprimento e seriação', 'math', 3, 5, 2, ARRAY['Barras vermelhas'], ARRAY['Organize por tamanho', 'Compare os comprimentos', 'Construa a escada']);