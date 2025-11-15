import { motion } from "framer-motion";

const Philosophy = () => {
  return (
    <section id="filosofia" className="section bg-secondary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <p className="text-accent uppercase tracking-widest text-sm mb-6 font-sans">
              Nuestra Filosofía
            </p>
            <h2 className="text-dark mb-8">
              La Diferencia TATYCAN
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="prose prose-lg mx-auto text-center"
          >
            <p className="text-dark/80 text-lg leading-relaxed mb-8">
              En TATYCAN creemos que la peluquería excepcional es una forma de arte.
              Cada compañero canino recibe atención personalizada en nuestro atelier íntimo,
              donde técnicas consagradas se encuentran con el lujo contemporáneo.
            </p>
            <p className="text-dark/80 text-lg leading-relaxed mb-8">
              Aceptamos un número limitado de citas diarias, asegurando que cada
              visita sea una experiencia de tranquilidad y refinamiento tanto para usted
              como para su querido compañero.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-12 mt-20"
          >
            <div className="text-center">
              <div className="w-16 h-px bg-accent mx-auto mb-6"></div>
              <h3 className="text-xl mb-4 text-dark font-serif">Experiencia</h3>
              <p className="text-dark/70 text-sm leading-relaxed">
                Peluqueros expertos con formación extensiva y certificaciones en estilismo específico por razas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-px bg-accent mx-auto mb-6"></div>
              <h3 className="text-xl mb-4 text-dark font-serif">Exclusividad</h3>
              <p className="text-dark/70 text-sm leading-relaxed">
                Solo con cita previa, con consultas personalizadas para cada cliente canino
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-px bg-accent mx-auto mb-6"></div>
              <h3 className="text-xl mb-4 text-dark font-serif">Excelencia</h3>
              <p className="text-dark/70 text-sm leading-relaxed">
                Productos premium y atención meticulosa al detalle en cada servicio
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
