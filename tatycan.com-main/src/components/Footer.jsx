import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import contactInfo from "../config/contactInfo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{contactInfo.businessName}</h2>
            <p className="text-white/70 mb-4">{contactInfo.description}</p>
            <div className="flex space-x-4">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={contactInfo.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
                aria-label="Google Maps"
              >
                <MapPin size={20} />
              </a>
              <a
                href={`https://wa.me/${contactInfo.phoneClean}?text=${encodeURIComponent(contactInfo.whatsapp.default)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-white/70 hover:text-accent transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white/70 hover:text-accent transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-white/70 hover:text-accent transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-white/70 hover:text-accent transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <Link to="/reserva" className="text-white/70 hover:text-accent transition-colors">
                  Solicitar cita
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-white/70">Corte según raza</li>
              <li className="text-white/70">Baño y secado</li>
              <li className="text-white/70">Stripping y deslanado</li>
              <li className="text-white/70">Corte de uñas</li>
              <li className="text-white/70">Tratamientos especiales</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-white/70">
              <li>{contactInfo.address.fullAddress}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
              <li>{contactInfo.hours.weekdays}</li>
              <li>{contactInfo.hours.saturday}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 space-y-3">
          <p>© {currentYear} {contactInfo.businessName}. Todos los derechos reservados.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-xs uppercase tracking-widest text-white/60">
            <Link to="/privacidad" className="hover:text-accent transition-colors">
              Política de privacidad
            </Link>
            <span className="hidden sm:block">•</span>
            <Link to="/aviso-legal" className="hover:text-accent transition-colors">
              Aviso legal
            </Link>
            <span className="hidden sm:block">•</span>
            <Link to="/politica-cookies" className="hover:text-accent transition-colors">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
