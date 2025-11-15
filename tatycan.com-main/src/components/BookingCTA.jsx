import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2 } from "lucide-react";

const BookingCTA = () => {
  const benefits = [
    "Selecciona tu raza y ve el precio al instante",
    "Elige tus fechas disponibles",
    "Indica servicios adicionales si deseas",
    "Recibe confirmación por WhatsApp",
  ];

  return (
    <section className="section bg-primary relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <p className="text-accent uppercase tracking-widest text-sm mb-6 font-sans">
              Reserva Online
            </p>
            <h2 className="text-dark mb-6">
              Agenda tu Cita en Minutos
            </h2>
            <p className="text-dark/70 max-w-2xl mx-auto text-base leading-relaxed">
              Nuestro sistema de reservas online te permite solicitar una cita de forma
              rápida y sencilla. Selecciona la raza de tu compañero, elige tus fechas
              preferidas y nos pondremos en contacto contigo para confirmar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif text-dark mb-8">
                Proceso Simple y Transparente
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-accent text-lg" />
                    </div>
                    <p className="text-dark/80 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="bg-secondary border-2 border-accent/20 p-10 relative">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-accent/10 p-4 rounded-full">
                      <CalendarDays className="text-accent text-4xl" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-dark text-center mb-4">
                    Reserva tu Cita Ahora
                  </h3>
                  <p className="text-dark/70 text-center mb-8 text-sm">
                    Completa el formulario en solo 2 minutos y nos pondremos en
                    contacto contigo para confirmar tu cita.
                  </p>

                  <Link
                    to="/reserva"
                    className="btn btn-primary w-full text-center block mb-4"
                  >
                    Comenzar Reserva
                  </Link>

                  <p className="text-xs text-dark/60 text-center">
                    ¿Prefieres hablar directamente?{" "}
                    <a
                      href="#contacto"
                      className="text-accent hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("contacto")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Contáctanos
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-primary/50 border border-neutral/20 p-6 max-w-3xl mx-auto">
              <p className="text-dark/70 text-sm leading-relaxed">
                <strong className="text-dark">Nota importante:</strong> Las fechas
                que selecciones son solo indicativas. Nuestro equipo se pondrá en
                contacto contigo para confirmar disponibilidad y acordar el mejor
                horario para ti y tu compañero.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
