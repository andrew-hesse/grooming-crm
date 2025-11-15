import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const groomingPrices = [
    { breed: "Chihuahua (menos de 3kg)", price: "26€" },
    { breed: "Chihuahua (estándar)", price: "30€" },
    { breed: "Bulldog Francés, Pug", price: "35€" },
    { breed: "Jack Russell (pelo corto)", price: "35€" },
    { breed: "Jack Russell (pelo duro, stripping manual)", price: "45€" },
    { breed: "Pomerania (hasta 4kg)", price: "45€" },
    { breed: "Pomerania (más de 4kg)", price: "50€" },
    { breed: "Spitz Alemán y Japonés", price: "50€" },
    { breed: "Yorkshire Terrier", price: "45€" },
    { breed: "Maltés", price: "45€" },
    { breed: "Bichón Frisé", price: "50€" },
    { breed: "Shih Tzu", price: "45€" },
    { breed: "Schnauzer Mediano (corte con máquina)", price: "55€" },
    { breed: "Schnauzer Mediano (stripping manual)", price: "65€" },
    { breed: "Schnauzer Gigante (corte con máquina)", price: "65€" },
    { breed: "Schnauzer Gigante (stripping manual)", price: "75€" },
    { breed: "Cocker Americano (corte comercial)", price: "50€" },
    { breed: "Cocker Americano (estándar de raza, stripping manual)", price: "65€" },
    { breed: "Cocker Inglés (corte comercial)", price: "50€" },
    { breed: "Cocker Inglés (estándar de raza, stripping manual)", price: "65€" },
    { breed: "Border Collie", price: "60€" },
    { breed: "Boyero de Berna", price: "75€" },
    { breed: "Labrador Retriever", price: "55€" },
    { breed: "Golden Retriever", price: "65€" },
    { breed: "Perro de Agua Español", price: "Requiere consulta" },
  ];

  const additionalServices = [
    {
      service: "Limpieza Dental sin Anestesia con Pulido",
      price: "Desde 70€",
      description: "Cuidado dental profesional usando técnicas suaves y no invasivas",
    },
    {
      service: "Estilismo Creativo y Color",
      price: "Desde 50€",
      description: "Opciones de coloración segura y peluquería creativa",
    },
    {
      service: "Corte de Uñas con Pulido",
      size: "Perros pequeños y gatos",
      price: "5€",
    },
    {
      service: "Corte de Uñas con Pulido",
      size: "Perros medianos",
      price: "8€",
    },
    {
      service: "Corte de Uñas con Pulido",
      size: "Perros grandes y gigantes",
      price: "10€",
    },
  ];

  const includedInAllServices = [
    "Cepillado profesional y desenredado",
    "Cuidado de uñas con pulido",
    "Limpieza de oídos",
    "Corte higiénico según necesidad",
    "Baño con productos premium",
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <div className="section">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-20"
          >
            <Link
              to="/"
              className="text-accent uppercase tracking-widest text-xs mb-6 inline-block hover:text-dark transition-colors duration-300"
            >
              ← Volver al Inicio
            </Link>
            <h1 className="text-dark mb-6">Lista Completa de Precios</h1>
            <p className="text-dark/70 max-w-2xl mx-auto text-base leading-relaxed">
              Precios transparentes para nuestros servicios completos de peluquería. Todos los precios
              son indicativos y pueden variar según la condición del pelaje y requisitos específicos.
            </p>
            <p className="text-accent text-sm mt-4 uppercase tracking-wider">
              Otoño 2025
            </p>
          </motion.div>

          {/* Main Grooming Prices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-primary border border-neutral/20 p-12 mb-12"
          >
            <h2 className="text-2xl text-dark font-serif mb-8 text-center">
              Peluquería Específica por Raza
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl mx-auto">
              {groomingPrices.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline border-b border-neutral/10 pb-3"
                >
                  <span className="text-dark/80 text-sm">{item.breed}</span>
                  <span className="text-dark font-serif ml-4">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-primary border border-neutral/20 p-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg text-dark font-serif mb-2">
                      {service.service}
                    </h3>
                    {service.size && (
                      <p className="text-dark/50 text-xs uppercase tracking-wider">
                        {service.size}
                      </p>
                    )}
                    {service.description && (
                      <p className="text-dark/60 text-sm mt-2">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <span className="text-dark font-serif text-xl ml-4">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="bg-primary border border-neutral/20 p-12 mb-12"
          >
            <h3 className="text-xl text-dark font-serif mb-6 text-center">
              Incluido en Todos los Servicios de Peluquería
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {includedInAllServices.map((item, index) => (
                <li key={index} className="flex items-start text-dark/70 text-sm">
                  <span className="text-accent mr-3">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl mx-auto space-y-6 text-center"
          >
            <div className="bg-primary/50 border border-neutral/20 p-8">
              <h4 className="text-dark font-serif mb-4 text-base">
                Consideraciones Adicionales
              </h4>
              <div className="space-y-3 text-sm text-dark/70">
                <p>
                  Enredos excesivos o mudas pueden incurrir un cargo adicional desde 10€
                </p>
                <p>
                  Compañeros por encima del peso estándar de raza se cotizarán por separado
                </p>
                <p>
                  Los precios son indicativos y pueden variar según condición del pelaje, temperamento
                  y requisitos específicos
                </p>
              </div>
            </div>

            <p className="text-dark/60 text-xs uppercase tracking-widest">
              Para presupuestos precisos, le invitamos a programar una consulta
            </p>

            <Link to="/reserva" className="btn btn-primary inline-block mt-8">
              Reservar Cita
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
