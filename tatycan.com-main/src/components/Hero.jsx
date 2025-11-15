// Hero section component for TATYCAN Grooming Salon (original design)
const Hero = () => {
  return (
    <section
      id="inicio"
      className="bg-gradient-to-b from-primary to-white py-20 md:py-32"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              TATYCAN
            </h1>
            <p className="text-lg md:text-xl text-dark/90 mb-6">
              Peluquería canina profesional en Galapagar. Cuidamos a tu
              mascota con amor y dedicación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contacto" className="btn btn-primary">
                Reservar ahora
              </a>
              <a
                href="#servicios"
                className="btn bg-white border border-accent text-dark hover:bg-neutral"
              >
                Nuestros servicios
              </a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src="/hero.avif"
              alt="Perro feliz después de su sesión de peluquería"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/FFF6ED/947D7A?text=TATYCAN";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
