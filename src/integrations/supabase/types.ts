export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          age_max: number
          age_min: number
          created_at: string | null
          description: string | null
          difficulty: number | null
          domain: Database["public"]["Enums"]["activity_domain"]
          id: string
          materials: string[] | null
          offline_required: boolean | null
          steps: string[] | null
          title: string
        }
        Insert: {
          age_max: number
          age_min: number
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          domain: Database["public"]["Enums"]["activity_domain"]
          id?: string
          materials?: string[] | null
          offline_required?: boolean | null
          steps?: string[] | null
          title: string
        }
        Update: {
          age_max?: number
          age_min?: number
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          domain?: Database["public"]["Enums"]["activity_domain"]
          id?: string
          materials?: string[] | null
          offline_required?: boolean | null
          steps?: string[] | null
          title?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          activity_id: string | null
          child_id: string | null
          created_at: string | null
          created_by_user_id: string | null
          date: string
          duration_min: number | null
          id: string
          media_urls: string[] | null
          observations_text: string | null
          outcome: Database["public"]["Enums"]["activity_outcome"] | null
        }
        Insert: {
          activity_id?: string | null
          child_id?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          date?: string
          duration_min?: number | null
          id?: string
          media_urls?: string[] | null
          observations_text?: string | null
          outcome?: Database["public"]["Enums"]["activity_outcome"] | null
        }
        Update: {
          activity_id?: string | null
          child_id?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          date?: string
          duration_min?: number | null
          id?: string
          media_urls?: string[] | null
          observations_text?: string | null
          outcome?: Database["public"]["Enums"]["activity_outcome"] | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          child_id: string | null
          created_at: string | null
          created_by_user_id: string | null
          date: string
          domain_scores: Json | null
          habit_balance: Json | null
          id: string
          narrative: string | null
        }
        Insert: {
          child_id?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          date?: string
          domain_scores?: Json | null
          habit_balance?: Json | null
          id?: string
          narrative?: string | null
        }
        Update: {
          child_id?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          date?: string
          domain_scores?: Json | null
          habit_balance?: Json | null
          id?: string
          narrative?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          avatar_theme: string | null
          birthdate: string
          created_at: string | null
          full_name: string
          id: string
          notes: string | null
          org_id: string | null
          preferred_name: string | null
          special_needs: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_theme?: string | null
          birthdate: string
          created_at?: string | null
          full_name: string
          id?: string
          notes?: string | null
          org_id?: string | null
          preferred_name?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_theme?: string | null
          birthdate?: string
          created_at?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          org_id?: string | null
          preferred_name?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_logs: {
        Row: {
          child_id: string | null
          created_at: string | null
          date: string
          free_play_min: number | null
          id: string
          min_light: number | null
          min_moderate: number | null
          min_vigorous: number | null
          notes: string | null
        }
        Insert: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          free_play_min?: number | null
          id?: string
          min_light?: number | null
          min_moderate?: number | null
          min_vigorous?: number | null
          notes?: string | null
        }
        Update: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          free_play_min?: number | null
          id?: string
          min_light?: number | null
          min_moderate?: number | null
          min_vigorous?: number | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movement_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          id: string
          invited_at: string | null
          joined_at: string | null
          org_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          org_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          org_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          child_id: string | null
          created_at: string | null
          date: string
          generated_by: string | null
          id: string
          items: Json | null
          rationale: string | null
        }
        Insert: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          generated_by?: string | null
          id?: string
          items?: Json | null
          rationale?: string | null
        }
        Update: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          generated_by?: string | null
          id?: string
          items?: Json | null
          rationale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      screen_time_logs: {
        Row: {
          child_id: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          screen_minutes: number | null
          sedentary_minutes: number | null
        }
        Insert: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          screen_minutes?: number | null
          sedentary_minutes?: number | null
        }
        Update: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          screen_minutes?: number | null
          sedentary_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "screen_time_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_logs: {
        Row: {
          child_id: string | null
          created_at: string | null
          date: string
          id: string
          naps_count: number | null
          notes: string | null
          sleep_end: string | null
          sleep_start: string | null
          total_hours: number | null
        }
        Insert: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          naps_count?: number | null
          notes?: string | null
          sleep_end?: string | null
          sleep_start?: string | null
          total_hours?: number | null
        }
        Update: {
          child_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          naps_count?: number | null
          notes?: string | null
          sleep_end?: string | null
          sleep_start?: string | null
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sleep_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          org_id: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          org_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          org_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_domain: "practical" | "sensory" | "language" | "math" | "life"
      activity_outcome: "exploring" | "emerging" | "consolidating"
      organization_type: "family" | "school"
      subscription_plan: "free" | "pro" | "school"
      subscription_status: "active" | "cancelled" | "expired" | "trialing"
      user_role: "admin" | "educator" | "guardian"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_domain: ["practical", "sensory", "language", "math", "life"],
      activity_outcome: ["exploring", "emerging", "consolidating"],
      organization_type: ["family", "school"],
      subscription_plan: ["free", "pro", "school"],
      subscription_status: ["active", "cancelled", "expired", "trialing"],
      user_role: ["admin", "educator", "guardian"],
    },
  },
} as const
