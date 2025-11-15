import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Promotion = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
  });

  // Calculate time until end of summer (August 31st)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endOfSummer = new Date("2025-08-31T23:59:59");
      const now = new Date();
      const difference = endOfSummer - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeLeft({ days });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 3600000); // Update every hour
    return () => clearInterval(timer);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection =
      document.getElementById("contact") || document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section
      id="promotion"
      className="py-3 bg-gradient-to-r from-accent-light via-secondary to-accent-light relative overflow-hidden border-b border-accent/40"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between text-dark">
          {/* Left side - Promotion text */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="text-2xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✂️
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-dark">
                🏷️ Promoción de Verano - Corte de Uñas GRATIS
              </h3>
              <p className="text-sm opacity-85 hidden md:block text-dark/85">
                Para perros y gatos • Conoce nuestra peluquería profesional
              </p>
            </div>
          </motion.div>

          {/* Center - Countdown */}
          <motion.div
            className="hidden sm:flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-dark">
              ⏰ Quedan {timeLeft.days} días
            </span>
          </motion.div>

          {/* Right side - CTA */}
          <motion.button
            onClick={handleContactClick}
            className="bg-accent text-white font-bold py-2 px-4 md:px-6 rounded-full text-sm md:text-base hover:bg-dark transition-all duration-300 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Reservar Gratis
          </motion.button>
        </div>

        {/* Mobile countdown */}
        <motion.div
          className="sm:hidden mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="text-sm bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-accent/30 text-dark shadow-sm">
            ⏰ Quedan {timeLeft.days} días
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Promotion;
