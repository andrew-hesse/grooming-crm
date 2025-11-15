/**
 * Database TypeScript Types for Grooming CRM
 * Auto-generated types would come from: npx supabase gen types typescript
 * This is a manual definition for now
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * User roles in the system
 */
export type UserRole = 'admin' | 'staff' | 'client';

/**
 * Appointment status types
 */
export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

/**
 * Payment status types
 */
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

/**
 * Pet size categories
 */
export type PetSize = 'small' | 'medium' | 'large' | 'extra_large';

/**
 * Database schema interfaces
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pets: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          breed: string;
          size: PetSize;
          age: number | null;
          weight: number | null;
          special_notes: string | null;
          medical_conditions: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          breed: string;
          size: PetSize;
          age?: number | null;
          weight?: number | null;
          special_notes?: string | null;
          medical_conditions?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          breed?: string;
          size?: PetSize;
          age?: number | null;
          weight?: number | null;
          special_notes?: string | null;
          medical_conditions?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          base_price: number;
          duration_minutes: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          base_price: number;
          duration_minutes: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          base_price?: number;
          duration_minutes?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          pet_id: string;
          client_id: string;
          staff_id: string | null;
          service_id: string;
          scheduled_date: string;
          scheduled_time: string;
          status: AppointmentStatus;
          notes: string | null;
          cancellation_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          pet_id: string;
          client_id: string;
          staff_id?: string | null;
          service_id: string;
          scheduled_date: string;
          scheduled_time: string;
          status?: AppointmentStatus;
          notes?: string | null;
          cancellation_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          pet_id?: string;
          client_id?: string;
          staff_id?: string | null;
          service_id?: string;
          scheduled_date?: string;
          scheduled_time?: string;
          status?: AppointmentStatus;
          notes?: string | null;
          cancellation_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          appointment_id: string;
          amount: number;
          status: PaymentStatus;
          payment_method: string | null;
          transaction_id: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          appointment_id: string;
          amount: number;
          status?: PaymentStatus;
          payment_method?: string | null;
          transaction_id?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          appointment_id?: string;
          amount?: number;
          status?: PaymentStatus;
          payment_method?: string | null;
          transaction_id?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      appointment_status: AppointmentStatus;
      payment_status: PaymentStatus;
      pet_size: PetSize;
    };
  };
}
