-- Grooming CRM Database Schema
-- This schema defines all tables, relationships, and security policies for the grooming salon CRM
-- Execute this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
CREATE TYPE pet_size AS ENUM ('small', 'medium', 'large', 'extra_large');

-- =====================================================
-- TABLES
-- =====================================================

/**
 * Profiles table - Extended user information
 * Linked to Supabase auth.users via FK
 */
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * Breeds table - Dog/cat breeds with pricing
 * Allows admin to manage breeds and their associated grooming prices
 */
CREATE TABLE breeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL, -- Price in euros (€)
  size pet_size NOT NULL,
  grooming_notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * Pets table - Pet information for clients
 */
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed_id UUID REFERENCES breeds(id) ON DELETE SET NULL,
  custom_breed TEXT, -- For breeds not in the system
  size pet_size NOT NULL,
  age INTEGER,
  weight DECIMAL(5,2), -- in kg
  special_notes TEXT,
  medical_conditions TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Either breed_id or custom_breed must be set
  CONSTRAINT breed_specification CHECK (
    (breed_id IS NOT NULL) OR (custom_breed IS NOT NULL)
  )
);

/**
 * Services table - Available grooming services
 */
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * Appointments table - Booking records
 */
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_scheduled_datetime CHECK (scheduled_date >= CURRENT_DATE)
);

/**
 * Payments table - Payment records for appointments
 */
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL, -- Amount in euros (€)
  status payment_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT UNIQUE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * Appointment Photos table - Photos uploaded during grooming visits
 * Stored in Backblaze S3
 */
CREATE TABLE appointment_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL, -- Backblaze S3 URL
  photo_key TEXT NOT NULL, -- S3 object key
  thumbnail_url TEXT, -- Optional thumbnail
  caption TEXT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  file_size INTEGER, -- Size in bytes
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_breeds_name ON breeds(name);
CREATE INDEX idx_breeds_is_active ON breeds(is_active);
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_pets_breed_id ON pets(breed_id);
CREATE INDEX idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_staff_id ON appointments(staff_id);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);
CREATE INDEX idx_appointments_scheduled_date ON appointments(scheduled_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_payments_appointment_id ON payments(appointment_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_appointment_photos_appointment_id ON appointment_photos(appointment_id);
CREATE INDEX idx_appointment_photos_uploaded_by ON appointment_photos(uploaded_by);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_photos ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin and staff can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Breeds policies
CREATE POLICY "Anyone can view active breeds" ON breeds
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage breeds" ON breeds
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Pets policies
CREATE POLICY "Pet owners can view their own pets" ON pets
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Pet owners can insert their own pets" ON pets
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Pet owners can update their own pets" ON pets
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Pet owners can delete their own pets" ON pets
  FOR DELETE USING (owner_id = auth.uid());

CREATE POLICY "Admin and staff can view all pets" ON pets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Services policies
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Appointments policies
CREATE POLICY "Clients can view their own appointments" ON appointments
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Clients can create their own appointments" ON appointments
  FOR INSERT WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their pending appointments" ON appointments
  FOR UPDATE USING (
    client_id = auth.uid()
    AND status = 'pending'
  );

CREATE POLICY "Staff and admin can view all appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admin can manage appointments" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Payments policies
CREATE POLICY "Clients can view their own payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = payments.appointment_id
      AND appointments.client_id = auth.uid()
    )
  );

CREATE POLICY "Admin and staff can view all payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Admin and staff can manage payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Appointment Photos policies
CREATE POLICY "Clients can view photos of their appointments" ON appointment_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = appointment_photos.appointment_id
      AND appointments.client_id = auth.uid()
    )
  );

CREATE POLICY "Staff and admin can view all photos" ON appointment_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admin can upload photos" ON appointment_photos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admin can delete photos" ON appointment_photos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- =====================================================
-- FUNCTIONS
-- =====================================================

/**
 * Function to automatically update updated_at timestamp
 */
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_breeds_updated_at BEFORE UPDATE ON breeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

/**
 * Function to create profile on user signup
 */
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'client');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED DATA (Optional)
-- =====================================================

-- Insert default services (prices in euros €)
INSERT INTO services (name, description, base_price, duration_minutes) VALUES
  ('Basic Grooming', 'Bath, brush, nail trim, and ear cleaning', 45.00, 60),
  ('Full Grooming', 'Complete grooming package including haircut', 75.00, 90),
  ('Bath & Brush', 'Basic bath and brushing service', 35.00, 45),
  ('Nail Trim', 'Quick nail trimming service', 15.00, 15),
  ('Teeth Cleaning', 'Professional dental cleaning', 50.00, 30),
  ('De-shedding Treatment', 'Special treatment for heavy shedders', 65.00, 75);

-- Insert common dog breeds with prices in euros (€)
INSERT INTO breeds (name, description, base_price, size, grooming_notes) VALUES
  -- Small breeds
  ('Chihuahua', 'Small toy breed with short or long coat', 35.00, 'small', 'Minimal grooming required for short coat'),
  ('Yorkshire Terrier', 'Small terrier with long silky coat', 45.00, 'small', 'Requires regular brushing and trimming'),
  ('Pomeranian', 'Small fluffy breed with thick double coat', 50.00, 'small', 'Heavy shedding, needs regular brushing'),
  ('Maltese', 'Small breed with long white coat', 45.00, 'small', 'Coat requires daily brushing'),
  ('Shih Tzu', 'Small companion breed with long coat', 50.00, 'small', 'High-maintenance coat'),

  -- Medium breeds
  ('Beagle', 'Medium hunting breed with short coat', 50.00, 'medium', 'Easy to groom, moderate shedding'),
  ('Cocker Spaniel', 'Medium breed with long silky coat', 65.00, 'medium', 'Requires regular grooming'),
  ('French Bulldog', 'Medium compact breed with short coat', 45.00, 'medium', 'Easy grooming, facial folds need attention'),
  ('Border Collie', 'Medium herding breed with medium coat', 60.00, 'medium', 'Regular brushing needed'),
  ('Bulldog', 'Medium breed with short coat and wrinkles', 50.00, 'medium', 'Special attention to skin folds'),

  -- Large breeds
  ('Labrador Retriever', 'Large sporting breed with short coat', 70.00, 'large', 'Heavy shedding, water-resistant coat'),
  ('Golden Retriever', 'Large breed with long golden coat', 80.00, 'large', 'Requires regular brushing'),
  ('German Shepherd', 'Large working breed with medium coat', 75.00, 'large', 'Heavy seasonal shedding'),
  ('Boxer', 'Large breed with short coat', 65.00, 'large', 'Minimal grooming required'),
  ('Rottweiler', 'Large working breed with short coat', 70.00, 'large', 'Easy to groom'),

  -- Extra Large breeds
  ('Great Dane', 'Giant breed with short coat', 90.00, 'extra_large', 'Size requires special handling'),
  ('Saint Bernard', 'Giant breed with thick coat', 110.00, 'extra_large', 'Heavy shedding, requires regular grooming'),
  ('Newfoundland', 'Giant breed with thick water-resistant coat', 120.00, 'extra_large', 'High-maintenance coat'),
  ('Bernese Mountain Dog', 'Giant breed with long tri-color coat', 115.00, 'extra_large', 'Heavy shedding'),

  -- Popular Poodle mixes
  ('Poodle (Toy)', 'Small poodle with curly hypoallergenic coat', 55.00, 'small', 'Requires regular professional grooming'),
  ('Poodle (Standard)', 'Large poodle with curly coat', 85.00, 'large', 'High-maintenance coat'),
  ('Goldendoodle', 'Golden Retriever-Poodle mix', 90.00, 'large', 'Wavy to curly coat needs regular grooming'),
  ('Labradoodle', 'Labrador-Poodle mix', 90.00, 'large', 'Low-shedding coat requires grooming'),
  ('Cockapoo', 'Cocker Spaniel-Poodle mix', 60.00, 'medium', 'Curly coat needs regular maintenance');

-- Comments for documentation
COMMENT ON TABLE profiles IS 'User profiles with extended information beyond auth.users';
COMMENT ON TABLE breeds IS 'Dog and cat breeds with pricing in euros (€)';
COMMENT ON TABLE pets IS 'Pet information managed by clients';
COMMENT ON TABLE services IS 'Available grooming services with pricing in euros (€)';
COMMENT ON TABLE appointments IS 'Appointment bookings linking pets, clients, and services';
COMMENT ON TABLE payments IS 'Payment records for completed appointments in euros (€)';
COMMENT ON TABLE appointment_photos IS 'Photos uploaded during grooming visits, stored in Backblaze S3';
