import { useState, memo } from "react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "¿Cuánto tiempo dura una sesión de peluquería?",
      answer:
        "Dependiendo del tamaño y tipo de mascota, una sesión completa puede durar entre 1 y 3 horas. Los servicios básicos como corte de uñas pueden tomar 15-30 minutos.",
    },
    {
      id: 2,
      question: "¿Qué debo traer para la cita de mi mascota?",
      answer:
        "Solo necesitas traer a tu mascota con su collar y correa habitual. Nosotros proporcionamos todos los productos y herramientas necesarios.",
    },
    {
      id: 3,
      question: "¿Manejan mascotas nerviosas o agresivas?",
      answer:
        "Sí, tenemos experiencia con mascotas de todos los temperamentos. Utilizamos técnicas de manejo suave y tomamos el tiempo necesario para que tu mascota se sienta cómoda.",
    },
    {
      id: 4,
      question: "¿Ofrecen servicios a domicilio?",
      answer:
        "Actualmente todos nuestros servicios se realizan en nuestro salón en Galapagar, donde contamos con todo el equipamiento profesional necesario.",
    },
    {
      id: 5,
      question: "¿Con qué frecuencia debería traer a mi mascota?",
      answer:
        "Recomendamos cada 6-8 semanas para un mantenimiento completo, aunque depende de la raza y estilo de vida de tu mascota. Te daremos recomendaciones personalizadas.",
    },
    {
      id: 6,
      question: "¿Qué productos utilizan?",
      answer:
        "Trabajamos únicamente con productos profesionales de alta calidad, hipoalergénicos y seguros para mascotas. Podemos adaptar los productos según las necesidades específicas de tu compañero.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="preguntas" className="section bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-dark/90 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(item.id)}
              >
                <span className="font-semibold text-dark">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-accent transition-transform ${
                    openItem === item.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItem === item.id && (
                <div className="px-6 pb-4">
                  <p className="text-dark/90">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-dark/90 mb-4">¿No encuentras la respuesta que buscas?</p>
          <a href="#contacto" className="btn btn-primary">
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(FAQ);
