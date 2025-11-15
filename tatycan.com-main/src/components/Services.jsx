import { memo } from "react";

// Services section component for TATYCAN Grooming Salon (original design)
const Services = () => {
  const services = [
    {
      id: 1,
      title: "Corte según raza",
      description:
        "Corte especializado adaptado a cada raza canina siguiendo estándares FCI. Mantenemos las características naturales del pelaje respetando la funcionalidad y estética específica de cada raza.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Baño y secado profesional",
      description:
        "Baño completo con champús especializados según tipo de piel y pelaje. Secado profesional con equipos de última generación que respetan la estructura del pelo. Incluye cepillado y desenredado.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 8,
      title: "Limpieza dental sin anestesia",
      description:
        "Limpieza dental profesional sin anestesia general utilizando técnicas seguras y no invasivas. Incluye eliminación de sarro, placa bacteriana y pulido dental para mantener la salud bucal.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Stripping",
      description:
        "Técnica especializada para razas de pelo duro como Terriers, Schnauzer y Cocker Spaniel. Eliminamos el pelo muerto manualmente para mantener la textura y color natural del manto.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Deslanado",
      description:
        "Eliminación profesional del subpelo muerto en razas de doble manto como Golden Retriever, Pastor Alemán y Husky. Reduce la muda y mejora la salud del pelaje.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Corte de uñas",
      description:
        "Corte profesional de uñas con herramientas especializadas. Mantenemos la longitud adecuada para evitar problemas de movilidad y molestias.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Limpieza de oídos",
      description:
        "Limpieza profesional del canal auditivo con productos específicos. Eliminamos cerumen y restos que puedan causar infecciones.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
    },
    {
      id: 7,
      title: "Asesoramiento personalizado",
      description:
        "Consulta profesional sobre cuidados específicos para tu mascota según su raza y necesidades. Te ayudamos a establecer rutinas de cuidado en casa.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="servicios" className="section bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Nuestros servicios
          </h2>
          <p className="text-lg text-dark/90 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios profesionales para mantener a tu mascota limpia, saludable y feliz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-accent mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-dark mb-3">
                {service.title}
              </h3>
              <p className="text-dark/90">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contacto" className="btn btn-primary">
            Reservar cita
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
