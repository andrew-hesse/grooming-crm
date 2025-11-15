import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BookingCalendar from "../components/BookingCalendar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { groomingPrices, additionalServices } from "../data/bookingData";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";

// Cookie utility functions
const COOKIE_NAME = "tatycan_booking_data";
const COOKIE_EXPIRY_DAYS = 90; // 3 months

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    petName: "",
    breed: "",
    customBreed: "",
    price: null,
    includeGrooming: false,
    extras: [],
    slots: [], // Changed from dates to slots (date + time)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  // Load saved data from cookies on mount
  useEffect(() => {
    const savedData = getCookie(COOKIE_NAME);
    if (savedData) {
      // Load user info and breed, but not the entire booking
      const newFormData = {
        ...formData,
        name: savedData.name || "",
        phone: savedData.phone || "",
        petName: savedData.petName || "",
        breed: savedData.breed || "",
        customBreed: savedData.customBreed || "",
      };

      // If breed is saved and not custom, also restore the price
      if (savedData.breed && savedData.breed !== "custom") {
        const selectedBreed = groomingPrices.find((b) => b.breed === savedData.breed);
        if (selectedBreed) {
          newFormData.price = selectedBreed.price;
        }
      }

      setFormData(newFormData);
    }
  }, []);

  // Save user info and breed to cookies whenever they change
  useEffect(() => {
    const dataToSave = {
      name: formData.name,
      phone: formData.phone,
      petName: formData.petName,
      breed: formData.breed,
      customBreed: formData.customBreed,
    };
    setCookie(COOKIE_NAME, dataToSave, COOKIE_EXPIRY_DAYS);
  }, [formData.name, formData.phone, formData.petName, formData.breed, formData.customBreed]);

  // Form validation
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Por favor, introduce tu nombre";
      }
      if (!formData.petName.trim()) {
        newErrors.petName = "Por favor, introduce el nombre de tu mascota";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Por favor, introduce tu teléfono";
      } else {
        const cleanPhone = formData.phone.replace(/\s/g, "");
        if (cleanPhone.length !== 9) {
          newErrors.phone = "El teléfono debe tener 9 dígitos";
        } else if (!/^[6-9]/.test(cleanPhone)) {
          newErrors.phone = "El teléfono debe empezar con 6, 7, 8 o 9";
        } else if (!/^\d+$/.test(cleanPhone)) {
          newErrors.phone = "El teléfono solo debe contener números";
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.breed && !formData.customBreed) {
        newErrors.breed = "Por favor, selecciona o introduce una raza";
      }
    }

    if (currentStep === 3) {
      if (formData.slots.length === 0) {
        newErrors.slots = "Por favor, selecciona al menos una fecha y horario";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSlotsChange = (slots) => {
    setFormData((prev) => ({ ...prev, slots }));
  };

  const handleExtraToggle = (serviceId) => {
    setFormData((prev) => {
      const extras = [...prev.extras];
      const index = extras.indexOf(serviceId);

      if (index > -1) {
        extras.splice(index, 1);
      } else {
        extras.push(serviceId);
      }

      return { ...prev, extras };
    });
  };

  const handleBreedChange = (value) => {
    if (value === "custom") {
      setFormData({ ...formData, breed: "", price: null, includeGrooming: false });
    } else {
      const selectedBreed = groomingPrices.find((b) => b.breed === value);
      const newPrice = selectedBreed?.price || null;
      setFormData({
        ...formData,
        breed: value,
        customBreed: "",
        price: newPrice,
        // Reset includeGrooming if the new breed has no price
        includeGrooming: newPrice !== null ? formData.includeGrooming : false,
      });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (formData.includeGrooming && formData.price) {
      total = formData.price;
    }
    formData.extras.forEach((extraId) => {
      const extra = additionalServices.find((s) => s.id === extraId);
      if (extra) total += extra.price;
    });
    return total;
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    const bookingData = {
      name: formData.name,
      petName: formData.petName,
      phone: formData.phone,
      breed: formData.customBreed || formData.breed,
      includeGrooming: formData.includeGrooming,
      price: formData.includeGrooming ? formData.price : null,
      extras: formData.extras.map((id) => {
        const service = additionalServices.find((s) => s.id === id);
        return service?.service;
      }),
      slots: formData.slots.map((slot) => {
        const [date, time] = slot.split('T');
        return `${format(new Date(date), "dd/MM/yyyy", { locale: es })} a las ${time}`;
      }),
      total: calculateTotal(),
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setStep(5); // Success step
      } else {
        throw new Error("Error al enviar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 2:
        return (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handleBreedChange={handleBreedChange}
            handleExtraToggle={handleExtraToggle}
            errors={errors}
          />
        );
      case 3:
        return <Step3 formData={formData} handleSlotsChange={handleSlotsChange} errors={errors} />;
      case 4:
        return <Step4 formData={formData} calculateTotal={calculateTotal} />;
      case 5:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary pt-20 pb-12">
      <div className="container-custom max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="text-accent uppercase tracking-widest text-xs inline-block hover:text-dark transition-colors duration-300 mb-6"
          >
            ← Volver al Inicio
          </Link>
          <h1 className="text-dark mb-4">Solicitud de Cita</h1>
          <p className="text-dark/70">
            Completa los siguientes pasos y nos pondremos en contacto contigo lo antes posible.
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step <= totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                    s <= step ? "bg-accent" : "bg-neutral/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-dark/60">
              Paso {step} de {totalSteps}
            </p>
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step <= totalSteps && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            {step < totalSteps ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1: Contact Information
const Step1 = ({ formData, setFormData, errors, setErrors }) => {
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Limit to 9 digits
    const limited = digits.slice(0, 9);

    // Format as XXX XXX XXX
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  // Clear error when user modifies a field
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  const isPhoneValid = () => {
    if (!formData.phone) return false;
    const digits = formData.phone.replace(/\s/g, "");
    return digits.length === 9 && /^[6-9]/.test(digits) && /^\d+$/.test(digits);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Contacto</CardTitle>
        <CardDescription>
          ¿Cómo podemos contactarte?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del propietario *</Label>
          <Input
            id="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              clearError('name');
            }}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="petName">Nombre de la mascota *</Label>
          <Input
            id="petName"
            placeholder="Nombre de tu mascota"
            value={formData.petName}
            onChange={(e) => {
              setFormData({ ...formData, petName: e.target.value });
              clearError('petName');
            }}
            className={errors.petName ? "border-red-500" : ""}
          />
          {errors.petName && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.petName}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono Móvil *</Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="600 000 000"
              value={formData.phone}
              onChange={(e) => {
                handlePhoneChange(e);
                clearError('phone');
              }}
              className={`pr-10 ${errors.phone ? "border-red-500" : isPhoneValid() ? "border-green-500" : ""}`}
            />
            {isPhoneValid() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          <p className="text-xs text-dark/60">
            Formato: XXX XXX XXX (9 dígitos, sin prefijo)
          </p>
          {errors.phone && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Step 2: Breed Selection and Pricing
const Step2 = ({ formData, setFormData, handleBreedChange, handleExtraToggle, errors }) => {
  const selectedBreed = groomingPrices.find((b) => b.breed === formData.breed);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Selecciona la raza de tu mascota 🐩😽</CardTitle>
          <CardDescription>
            Elige la raza de tu perro o introduce una personalizada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="breed">Raza *</Label>
            <Select value={formData.breed || "custom"} onValueChange={handleBreedChange}>
              <SelectTrigger className={errors.breed ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu raza o especifica una a continuación" />
              </SelectTrigger>
              <SelectContent>
                {groomingPrices.map((item) => (
                  <SelectItem key={item.breed} value={item.breed}>
                    {item.breed}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Otra raza (especificar)</SelectItem>
              </SelectContent>
            </Select>
            {errors.breed && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.breed}
              </p>
            )}
          </div>

          {(!formData.breed || formData.breed === "custom") && (
            <div className="space-y-2">
              <Label htmlFor="customBreed">Especifica la Raza *</Label>
              <Input
                id="customBreed"
                placeholder="Nombre de la raza"
                value={formData.customBreed}
                onChange={(e) =>
                  setFormData({ ...formData, customBreed: e.target.value })
                }
              />
            </div>
          )}

          {selectedBreed && selectedBreed.price !== null && (
            <div className="space-y-3">
              <div
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                  formData.includeGrooming
                    ? "border-accent bg-accent/10"
                    : "border-neutral/30 hover:border-accent/50"
                }`}
                onClick={() =>
                  setFormData({ ...formData, includeGrooming: !formData.includeGrooming })
                }
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    formData.includeGrooming
                      ? "border-accent bg-accent"
                      : "border-neutral/30"
                  }`}
                >
                  {formData.includeGrooming && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <p className="text-sm font-medium text-dark">Incluir servicio de peluquería</p>
              </div>

              {formData.includeGrooming && (
                <div className="bg-secondary p-4 rounded-md">
                  <p className="text-sm text-dark/70 mb-2">Precio indicativo:</p>
                  <p className="text-2xl font-serif text-dark">{selectedBreed.price}€</p>
                  <p className="text-xs text-dark/60 mt-2">
                    Este precio es orientativo y puede variar según la condición del pelaje
                    y requisitos específicos. El precio final se discutirá durante la consulta.
                  </p>
                </div>
              )}
            </div>
          )}

          {formData.customBreed && (
            <div className="bg-secondary p-4 rounded-md">
              <p className="text-sm text-dark/70">
                Como tu raza no está en nuestra lista, te contactaremos para discutir
                el precio específico según las características de tu perro.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servicios Adicionales (Opcional)</CardTitle>
          <CardDescription>Selecciona los extras que desees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
                formData.extras.includes(service.id)
                  ? "border-accent bg-accent/10"
                  : "border-neutral/30 hover:border-accent/50"
              }`}
              onClick={() => handleExtraToggle(service.id)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-dark">{service.service}</p>
                {service.id === "dental" && (
                  <p className="text-xs text-dark/60 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    El servicio se confirmará después de revisar a tu perrito
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-dark font-serif">Desde {service.price}€</span>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    formData.extras.includes(service.id)
                      ? "border-accent bg-accent"
                      : "border-neutral/30"
                  }`}
                >
                  {formData.extras.includes(service.id) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

// Step 3: Calendar Selection
const Step3 = ({ formData, handleSlotsChange, errors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecciona tus Fechas y Horarios</CardTitle>
        <CardDescription>
          Elige las fechas y horarios en los que estarías disponible. Estas son
          solo indicativas y nos ayudan a planificar. Te contactaremos para
          confirmar la cita definitiva.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BookingCalendar
          selectedSlots={formData.slots}
          onSlotsChange={handleSlotsChange}
        />
        {errors.slots && (
          <p className="text-red-500 text-sm flex items-center gap-1 mt-4">
            <AlertCircle className="h-3 w-3" />
            {errors.slots}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Step 4: Confirmation
const Step4 = ({ formData, calculateTotal }) => {
  const selectedExtras = formData.extras.map((id) => {
    const service = additionalServices.find((s) => s.id === id);
    return service;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirma tu Solicitud</CardTitle>
        <CardDescription>
          Revisa la información antes de enviar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dark/60 uppercase tracking-wider">Propietario</p>
            <p className="text-dark font-medium">{formData.name}</p>
            <p className="text-dark/70">{formData.phone}</p>
          </div>

          <div>
            <p className="text-sm text-dark/60 uppercase tracking-wider">Mascota</p>
            <p className="text-dark font-medium">{formData.petName}</p>
            <p className="text-dark/70">Raza: {formData.customBreed || formData.breed}</p>
          </div>

          {formData.includeGrooming && formData.price !== null && (
            <div>
              <p className="text-sm text-dark/60 uppercase tracking-wider">
                Precio Base de Peluquería (Indicativo)
              </p>
              <p className="text-dark font-serif text-xl">{formData.price}€</p>
            </div>
          )}

          {selectedExtras.length > 0 && (
            <div>
              <p className="text-sm text-dark/60 uppercase tracking-wider mb-2">
                Servicios Adicionales
              </p>
              {selectedExtras.map((extra) => (
                <div key={extra.id} className="flex justify-between text-sm">
                  <span className="text-dark/70">{extra.service}</span>
                  <span className="text-dark">Desde {extra.price}€</span>
                </div>
              ))}
            </div>
          )}

          {(formData.includeGrooming || selectedExtras.length > 0) && (
            <div className="border-t border-neutral/30 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-dark font-medium">Total Estimado</p>
                <p className="text-2xl font-serif text-dark">{calculateTotal()}€</p>
              </div>
              <p className="text-xs text-dark/60 mt-2">
                Este precio es orientativo y será confirmado durante la consulta
              </p>
            </div>
          )}

          <div>
            <p className="text-sm text-dark/60 uppercase tracking-wider mb-2">
              Fechas y Horarios Seleccionados ({formData.slots.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.slots.map((slot) => {
                const [date, time] = slot.split('T');
                return (
                  <span
                    key={slot}
                    className="px-3 py-1 bg-secondary text-dark text-sm rounded-full"
                  >
                    {format(new Date(date), "dd MMM", { locale: es })} • {time}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 p-4 rounded-md">
          <p className="text-sm text-dark/80">
            Al enviar esta solicitud, un miembro de nuestro equipo se pondrá en
            contacto contigo lo antes posible para confirmar la cita y discutir
            cualquier detalle adicional.
          </p>
        </div>

        <p className="text-xs text-dark/50 leading-relaxed">
          Al continuar aceptas nuestra{" "}
          <Link to="/privacidad" className="text-accent underline">
            Política de Privacidad
          </Link>{" "}
          y confirmas que has leído el{" "}
          <Link to="/politica-cookies" className="text-accent underline">
            uso de cookies
          </Link>
          . Esta solicitud se envía de forma segura a nuestro canal privado de Telegram exclusivamente para su gestión.
        </p>
      </CardContent>
    </Card>
  );
};

// Success Step
const SuccessStep = () => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-serif text-dark mb-4">
          ¡Solicitud Enviada!
        </h2>
        <p className="text-dark/70 mb-6 max-w-md mx-auto">
          Hemos recibido tu solicitud de cita. Nos pondremos en contacto contigo
          lo antes posible para confirmar los detalles.
        </p>
        <Link to="/" className="btn btn-primary inline-block">
          Volver al Inicio
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default BookingPage;
