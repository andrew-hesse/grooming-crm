import { motion } from "framer-motion";

const Team = () => {
  const team = [
    {
      id: 1,
      name: "Tatyana",
      title: "Peluquera Maestra y Fundadora",
      credentials: "Certificada FCI · Especialista en Razas",
      description: "Con más de una década de experiencia en peluquería canina, Tatyana aporta artesanía y precisión a cada cita.",
    },
  ];

  return (
    <section id="equipo" className="section bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-6 font-sans">
            Nuestra Experiencia
          </p>
          <h2 className="text-dark mb-6">
            Peluqueros Maestros
          </h2>
          <p className="text-dark/70 max-w-2xl mx-auto text-base leading-relaxed">
            Conozca a la artesana detrás de la distinguida reputación de TATYCAN
            por el excepcional cuidado canino.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-secondary border border-neutral/20 p-12 text-center"
            >
              <div className="mb-8">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/20">
                    <img
                    src="/groomer.jpg"
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl text-dark font-serif mb-2">
                  {member.name}
                </h3>
                <p className="text-dark/70 mb-2">{member.title}</p>
                <p className="text-accent text-sm uppercase tracking-wider font-sans">
                  {member.credentials}
                </p>
              </div>
              <div className="w-16 h-px bg-accent/30 mx-auto mb-8"></div>
              <p className="text-dark/70 leading-relaxed text-base max-w-xl mx-auto">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
