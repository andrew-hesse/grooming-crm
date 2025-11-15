/**
 * Central export for all TypeScript types
 */

export * from './database.types';

/**
 * Client-side types for form data and UI state
 */

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  petId?: string;
  petName?: string;
  petBreed?: string;
  petSize?: 'small' | 'medium' | 'large' | 'extra_large';
  serviceId: string;
  preferredDate: Date;
  preferredTime: string;
  notes?: string;
}

export interface PetFormData {
  name: string;
  breed: string;
  size: 'small' | 'medium' | 'large' | 'extra_large';
  age?: number;
  weight?: number;
  specialNotes?: string;
  medicalConditions?: string;
}

export interface ServiceWithDetails {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
  durationMinutes: number;
  isActive: boolean;
}

export interface AppointmentWithDetails {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  pet: {
    id: string;
    name: string;
    breed: string;
  };
  client: {
    id: string;
    fullName: string | null;
    phone: string | null;
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
  staff?: {
    id: string;
    fullName: string | null;
  } | null;
}

/**
 * Dashboard statistics types
 */
export interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeClients: number;
  totalPets: number;
}
