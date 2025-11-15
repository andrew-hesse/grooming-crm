import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import contactInfo from "../config/contactInfo";

// Navbar component for TATYCAN Grooming Salon (original design)
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const desktopLinks = isHomePage
    ? [
        { label: "Inicio", href: "#inicio", onClick: (e) => handleScroll(e, "inicio") },
        { label: "Servicios", href: "#servicios", onClick: (e) => handleScroll(e, "servicios") },
        { label: "Precios", href: "#precios", onClick: (e) => handleScroll(e, "precios") },
        { label: "Galería", href: "#galeria", onClick: (e) => handleScroll(e, "galeria") },
        { label: "FAQ", href: "#preguntas", onClick: (e) => handleScroll(e, "preguntas") },
        { label: "Contacto", href: "#contacto", onClick: (e) => handleScroll(e, "contacto") },
      ]
    : [
        { label: "Inicio", to: "/" },
        { label: "Servicios", to: "/#servicios" },
        { label: "Galería", to: "/galeria", extraClass: "font-semibold" },
        { label: "Contacto", to: "/#contacto" },
      ];

  return (
    <nav className="bg-white shadow-xs sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Salon Name */}
          <Link to="/" className="flex flex-col items-center">
            <div className="flex items-center">
              <img
                src="/logo.avif"
                alt="TATYCAN Logo"
                className="h-14 w-auto mr-1"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-dark">{contactInfo.businessName}</span>
                <span className="text-xs text-gray-600 font-light">
                  Peluquería Canina Profesional by {contactInfo.owner}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {desktopLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`text-dark hover:text-accent transition-colors ${link.extraClass || ""}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-dark hover:text-accent transition-colors scroll-smooth"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
            <Link
              to="/reserva"
              className="btn btn-primary text-xs uppercase"
            >
              Reservar cita
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link
              to="/reserva"
              className="btn btn-primary text-xs uppercase"
            >
              Reserva
            </Link>
            <button
              className="text-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
                strokeWidth={1.5}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-neutral mt-4">
            <div className="flex flex-col space-y-3">
              {isHomePage ? (
                <>
                  <a
                    href="#inicio"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Inicio
                  </a>
                  <a
                    href="#servicios"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Servicios
                  </a>
                  <a
                    href="#precios"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Precios
                  </a>
                  <a
                    href="#galeria"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Galería
                  </a>
                  <a
                    href="#preguntas"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("preguntas")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    FAQ
                  </a>
                  <a
                    href="#contacto"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Contacto
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/#servicios"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Servicios
                  </Link>
                  <Link
                    to="/galeria"
                    className="text-dark hover:text-accent transition-colors font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Galería
                  </Link>
                  <Link
                    to="/#contacto"
                    className="text-dark hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </Link>
                </>
              )}

              <Link
                to="/reserva"
                className="btn btn-primary text-center text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Reservar cita
              </Link>

              <div className="flex space-x-4 pt-2">
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={contactInfo.social.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="Google Maps"
                >
                  <MapPin size={20} />
                </a>
                <a
                  href={`https://wa.me/${contactInfo.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
              </div>

              <div className="pt-3 text-xs uppercase tracking-widest text-dark/60 space-y-2">
                <Link to="/privacidad" onClick={() => setIsMenuOpen(false)} className="hover:text-dark transition-colors">
                  Política de privacidad
                </Link>
                <Link to="/aviso-legal" onClick={() => setIsMenuOpen(false)} className="hover:text-dark transition-colors">
                  Aviso legal
                </Link>
                <Link to="/politica-cookies" onClick={() => setIsMenuOpen(false)} className="hover:text-dark transition-colors">
                  Política de cookies
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
