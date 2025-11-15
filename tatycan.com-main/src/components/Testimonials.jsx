import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "El nivel de cuidado y atención al detalle es extraordinario. Nuestro Golden Retriever nunca se ha visto mejor, y toda la experiencia se siente hecha a nuestra medida.",
      author: "María González",
      location: "Galapagar",
    },
    {
      id: 2,
      quote: "TATYCAN transforma la peluquería en un arte. La técnica de stripping manual que usan en nuestro Schnauzer preserva perfectamente la textura natural de su pelaje.",
      author: "Carlos Jiménez",
      location: "Madrid",
    },
    {
      id: 3,
      quote: "Una experiencia verdaderamente boutique. Los peluqueros entienden los estándares de raza al más alto nivel, y su profesionalismo es evidente en cada detalle.",
      author: "Isabel Moreno",
      location: "Las Rozas",
    },
  ];

  return (
    <section id="testimonios" className="section bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-6 font-sans">
            Testimonios
          </p>
          <h2 className="text-dark mb-6">
            Experiencias de Nuestros Clientes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="bg-primary border border-neutral/20 p-8"
            >
              <div className="mb-8">
                <svg
                  className="w-8 h-8 text-accent/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-dark/80 leading-relaxed mb-8 text-sm italic">
                {testimonial.quote}
              </p>
              <div className="border-t border-neutral/20 pt-6">
                <p className="text-dark font-serif text-base mb-1">
                  {testimonial.author}
                </p>
                <p className="text-dark/50 text-xs uppercase tracking-wider">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
