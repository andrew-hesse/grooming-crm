import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Admin Layout - Shared layout for all admin pages
 * Includes navigation sidebar and header
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Admin Portal</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/appointments">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="h-5 w-5" />
                Appointments
              </Button>
            </Link>
            <Link href="/admin/clients">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Clients & Pets
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>

          {/* Footer */}
          <div className="border-t px-3 py-4">
            <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="container-custom py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
