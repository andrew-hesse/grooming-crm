// Centralized contact information for TATYCAN
// Edit this file to update contact info across the entire website

const contactInfo = {
  // Business Details
  businessName: "TATYCAN",
  owner: "Tatiana Platitsyna",
  taxId: "Y9472688Z",
  description:
    "Peluquería canina profesional en Galapagar, Madrid. Cuidamos a tu mascota con amor y dedicación.",

  // Contact Details
  phone: "+34 614 753 089",
  phoneRaw: "+34614753089", // For tel: and WhatsApp links
  phoneClean: "34614753089", // Pre-computed without special characters
  email: "info@tatycan.com",

  // Address
  address: {
    street: "Calle San Gregorio 49 1a",
    city: "Galapagar",
    region: "Madrid",
    postalCode: "28260",
    country: "España",
    fullAddress: "Calle San Gregorio 49 1a, 28260 Galapagar, Madrid",
  },

  // Geolocation (for structured data)
  geo: {
    latitude: "40.5767",
    longitude: "-4.0061",
    radius: "20000", // Service area radius in meters
  },

  // Business Hours
  hours: {
    weekdays: "Lunes a Viernes: 9:00 - 19:00",
    saturday: "Sábado: 9:00 - 14:00",
    sunday: "Cerrado",
    structured: ["Mo-Fr 09:00-19:00", "Sa 09:00-14:00"], // For schema.org
  },

  // Social Media & External Links
  social: {
    instagram: "https://www.instagram.com/tatycan.galapagar/",
    googleMaps: "https://maps.app.goo.gl/tKiFMCWViZYsHzqd8",
    googleMapsAlt: "https://maps.app.goo.gl/qfRLHbG28tP79r9M6", // Alternative link
  },

  // WhatsApp Messages
  whatsapp: {
    default:
      "Hola! Me gustaría reservar una cita para mi mascota en TATYCAN.",
    detailed:
      "Hola! Me gustaría reservar una cita para mi mascota en TATYCAN. ¿Podrían ayudarme con la información sobre sus servicios?",
  },

  // Website
  website: "https://tatycan.com",

  // Price Range (for schema.org)
  priceRange: "€€",
};

export default contactInfo;
