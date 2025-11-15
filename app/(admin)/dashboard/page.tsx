import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react";

/**
 * Admin Dashboard Page
 * Displays key metrics and overview of the grooming business
 */
export default function AdminDashboardPage() {
  // TODO: Fetch real data from Supabase
  const stats = {
    todayAppointments: 8,
    weeklyRevenue: 1250, // in euros (€)
    activeClients: 45,
    completionRate: 94,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.weeklyRevenue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+5</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+2%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Upcoming appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* TODO: Replace with real data */}
            {[
              { time: "09:00 AM", pet: "Max", owner: "John Doe", service: "Full Grooming", status: "confirmed" },
              { time: "10:30 AM", pet: "Bella", owner: "Jane Smith", service: "Bath & Brush", status: "confirmed" },
              { time: "02:00 PM", pet: "Charlie", owner: "Bob Johnson", service: "Nail Trim", status: "pending" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{appointment.time}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.pet} - {appointment.owner}
                  </p>
                  <p className="text-xs text-muted-foreground">{appointment.service}</p>
                </div>
                <Badge variant={appointment.status === "confirmed" ? "success" : "outline"}>
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
