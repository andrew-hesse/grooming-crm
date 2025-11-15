import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

/**
 * Admin Breeds Management Page
 * Allows admin to view, add, edit, and manage dog/cat breeds with Euro pricing
 */
export default function BreedsPage() {
  // TODO: Fetch breeds from Supabase
  const breeds = [
    { id: '1', name: 'Labrador Retriever', size: 'large', basePrice: 70, isActive: true },
    { id: '2', name: 'Yorkshire Terrier', size: 'small', basePrice: 45, isActive: true },
    { id: '3', name: 'Golden Retriever', size: 'large', basePrice: 80, isActive: true },
    { id: '4', name: 'Chihuahua', size: 'small', basePrice: 35, isActive: true },
    { id: '5', name: 'Poodle (Standard)', size: 'large', basePrice: 85, isActive: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Breed Management</h1>
          <p className="text-muted-foreground">
            Manage dog and cat breeds with pricing in euros (€)
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Breed
        </Button>
      </div>

      {/* Breeds Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {breeds.map((breed) => (
          <Card key={breed.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{breed.name}</CardTitle>
                <Badge variant={breed.isActive ? "success" : "outline"}>
                  {breed.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>
                Size: {breed.size.charAt(0).toUpperCase() + breed.size.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">€{breed.basePrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Base grooming price</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Breed Statistics</CardTitle>
          <CardDescription>Overview of breed categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Small Breeds</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Medium Breeds</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Large Breeds</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
