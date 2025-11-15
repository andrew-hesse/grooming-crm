import { useState } from "react";
import { Instagram, MapPin, MessageCircle, Phone, X } from "lucide-react";
import contactInfo from "../config/contactInfo";

const MobileContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappMessage = encodeURIComponent(contactInfo.whatsapp.default);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phoneRaw}`;
  };
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.phoneClean}?text=${whatsappMessage}`, "_blank");
  };
  const handleInstagram = () => {
    window.open(contactInfo.social.instagram, "_blank");
  };
  const handleGoogleMaps = () => {
    window.open(contactInfo.social.googleMapsAlt, "_blank");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <div
          className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={handleGoogleMaps}
            className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Ver ubicación en Google Maps"
          >
            <MapPin size={16} />
          </button>
          <button
            onClick={handleInstagram}
            className="flex items-center justify-center w-12 h-12 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors"
            aria-label="Seguir en Instagram"
          >
            <Instagram size={18} />
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={20} />
          </button>
          <button
            onClick={handleCall}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            aria-label="Llamar por teléfono"
          >
            <Phone size={16} />
          </button>
        </div>
        <button
          onClick={toggleMenu}
          className={`flex items-center justify-center w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:bg-dark transition-all duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-label="Menú de contacto"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleGoogleMaps}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Ver ubicación en Google Maps"
          >
            <MapPin size={16} />
            <span className="text-sm font-medium">Google Maps</span>
          </button>
          <button
            onClick={handleInstagram}
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
            aria-label="Seguir en Instagram"
          >
            <Instagram size={16} />
            <span className="text-sm font-medium">Instagram</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">WhatsApp</span>
          </button>
          <button
            onClick={handleCall}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            aria-label="Llamar por teléfono"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">Llamar</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileContactButtons;
