"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

/**
 * Client Booking Page
 * Multi-step booking flow inspired by tatycan.com patterns
 * Allows clients to book grooming appointments
 */
export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Contact Info
    clientName: "",
    clientPhone: "",
    clientEmail: "",

    // Step 2: Pet Info
    petName: "",
    petBreed: "",
    petSize: "" as "small" | "medium" | "large" | "extra_large" | "",

    // Step 3: Service Selection
    serviceId: "",

    // Step 4: Date & Time
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log("Booking submitted:", formData);
    setStep(5); // Success step
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Complete the steps below to schedule your pet's grooming session
          </p>
        </div>

        {/* Progress Bar */}
        {step <= totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        )}

        {/* Step Content */}
        <div className="animate-fade-in">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Contact Information</CardTitle>
                <CardDescription>How can we reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Full Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="John Doe"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone Number *</Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email Address *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>About Your Pet</CardTitle>
                <CardDescription>Tell us about your furry friend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="petName">Pet Name *</Label>
                  <Input
                    id="petName"
                    placeholder="Max"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petBreed">Breed *</Label>
                  <Input
                    id="petBreed"
                    placeholder="Golden Retriever"
                    value={formData.petBreed}
                    onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petSize">Size *</Label>
                  <select
                    id="petSize"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.petSize}
                    onChange={(e) => setFormData({ ...formData, petSize: e.target.value as any })}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (0-20 lbs)</option>
                    <option value="medium">Medium (21-50 lbs)</option>
                    <option value="large">Large (51-90 lbs)</option>
                    <option value="extra_large">Extra Large (90+ lbs)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>Choose the grooming service you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* TODO: Fetch from database */}
                {[
                  { id: "1", name: "Basic Grooming", price: 45, duration: 60 },
                  { id: "2", name: "Full Grooming", price: 75, duration: 90 },
                  { id: "3", name: "Bath & Brush", price: 35, duration: 45 },
                ].map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.serviceId === service.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, serviceId: service.id })}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.duration} minutes</p>
                      </div>
                      <p className="text-lg font-semibold">€{service.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Preferred Date & Time</CardTitle>
                <CardDescription>When would you like to come in?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or concerns?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Request Sent!</h2>
                <p className="text-muted-foreground mb-6">
                  We've received your booking request. Our team will contact you shortly to confirm your appointment.
                </p>
                <Button onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        {step > 0 && step <= totalSteps && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            {step < totalSteps ? (
              <Button onClick={nextStep} className="gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                Submit Booking
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
