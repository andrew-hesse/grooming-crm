import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import contactInfo from "../config/contactInfo";

const Contact = () => {
  const whatsappMessage = encodeURIComponent(contactInfo.whatsapp.detailed);

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${contactInfo.phoneClean}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phoneRaw}`;
  };

  return (
    <section id="contacto" className="section bg-primary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Contacto
          </h2>
          <p className="text-lg text-dark/90 max-w-3xl mx-auto">
            Reserva tu cita o contáctanos para cualquier consulta sobre nuestros servicios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-dark mb-6">
              Información de contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-accent mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark">Dirección</h4>
                  <p className="text-dark/90">{contactInfo.address.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-accent mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark">Teléfono</h4>
                  <p className="text-dark/90">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-accent mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark">Email</h4>
                  <p className="text-dark/90">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-accent mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark">Horario</h4>
                  <p className="text-dark/90">{contactInfo.hours.weekdays}</p>
                  <p className="text-dark/90">{contactInfo.hours.saturday}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-dark mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={contactInfo.social.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="Google Maps"
                >
                  <MapPin size={24} />
                </a>
                <a
                  href={`https://wa.me/${contactInfo.phoneClean}?text=${encodeURIComponent(contactInfo.whatsapp.default)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-dark mb-6">
              Reserva tu cita
            </h3>

            <div className="text-center space-y-6">
              <p className="text-lg text-dark/90">
                Contáctanos directamente por WhatsApp o teléfono, o solicita tu cita online.
              </p>

              <Link
                to="/reserva"
                className="w-full bg-accent hover:bg-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg shadow-lg"
              >
                Solicitar cita online
              </Link>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-3 text-lg"
              >
                <MessageCircle size={24} />
                <span>Reservar por WhatsApp</span>
              </button>

              <button
                onClick={handlePhoneClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-3 text-lg"
              >
                <Phone size={20} />
                <span>Llamar ahora</span>
              </button>

              <div className="mt-8 p-6 bg-primary/10 rounded-lg text-left space-y-2">
                <h4 className="text-lg font-semibold text-dark">
                  ¿Qué información necesitamos?
                </h4>
                <ul className="text-dark/90 space-y-2">
                  <li>• Nombre de tu mascota</li>
                  <li>• Tipo y tamaño del animal</li>
                  <li>• Servicio que necesitas</li>
                  <li>• Fecha y hora preferida</li>
                  <li>• Cualquier necesidad especial</li>
                </ul>
              </div>

              <div className="mt-4 text-sm text-dark/70">
                <p>
                  <strong>Horario de atención:</strong>
                  <br />
                  {contactInfo.hours.weekdays}
                  <br />
                  {contactInfo.hours.saturday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
