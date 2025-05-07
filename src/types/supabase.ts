export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon?: string | null
          category: string
          path: string
          img: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          category: string
          path: string
          img?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          category?: string
          path?: string
          img?: string | null
          created_at?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          id: string
          name: string
          profession: string
          description: string
          location: string
          address: string | null
          city: string | null
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          rating: number
          image: string | null
          slug: string
          user_id: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          profession: string
          description: string
          location: string
          address?: string | null
          city?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number
          image?: string | null
          slug: string
          user_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          profession?: string
          description?: string
          location?: string
          address?: string | null
          city?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number
          image?: string | null
          slug?: string
          user_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "providers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_categories: {
        Row: {
          id: string
          provider_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          category_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_categories_provider_id_fkey"
            columns: ["provider_id"]
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          provider_id: string
          user_id: string | null
          name: string
          rating: number
          comment: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          user_id?: string | null
          name: string
          rating: number
          comment: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          user_id?: string | null
          name?: string
          rating?: number
          comment?: string
          date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
