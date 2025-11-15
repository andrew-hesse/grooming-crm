import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Calendar, Users, Sparkles } from "lucide-react";

/**
 * Homepage - Public landing page for the Grooming CRM
 * Provides information about the service and navigation to client/admin portals
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
      <header className="container-custom py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">PawFect Grooming</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/client/booking">
              <Button>Book Appointment</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-custom py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Professional Pet Grooming
            <span className="block text-primary">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Book appointments, manage your pet's grooming history, and give your furry friend the care they deserve.
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <Link href="/client/booking">
              <Button size="lg" className="gap-2">
                <Calendar className="h-5 w-5" />
                Book Now
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>
                Schedule appointments in seconds with our intuitive booking system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Pet Profiles</CardTitle>
              <CardDescription>
                Keep track of all your pets and their grooming history in one place
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Premium Service</CardTitle>
              <CardDescription>
                Professional grooming services tailored to your pet's needs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Scissors className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Expert Staff</CardTitle>
              <CardDescription>
                Certified groomers who care about your pet's comfort and safety
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              Join hundreds of happy pet owners who trust us with their furry friends
            </p>
            <Link href="/client/booking">
              <Button size="lg" variant="secondary">
                Book Your First Appointment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container-custom py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 PawFect Grooming CRM. Built with Next.js, Supabase, and shadcn/ui.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/admin/dashboard" className="hover:text-foreground transition-colors">
              Admin Portal
            </Link>
            <Link href="/auth/login" className="hover:text-foreground transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
