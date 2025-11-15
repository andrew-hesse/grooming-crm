import { memo } from "react";
import { Palette, PawPrint, Scissors, Sparkles } from "lucide-react";

const groomingPrices = [
  { breed: "Chihuahua (<3 kg)", price: "26€" },
  { breed: "Chihuahua (estándar)", price: "30€" },
  { breed: "Bulldog Francés, Carlino", price: "35€" },
  { breed: "Jack Russell (pelo corto)", price: "35€" },
  { breed: "Jack Russell (pelo duro, stripping)", price: "45€" },
  { breed: "Spitz Pomeranian (hasta 4 kg)", price: "45€" },
  { breed: "Spitz Pomeranian (más de 4 kg)", price: "50€" },
  { breed: "Spitz Alemán y Japonés", price: "50€" },
  { breed: "Yorkshire Terrier", price: "45€" },
  { breed: "Bichón Maltés", price: "45€" },
  { breed: "Bichón Frisé", price: "50€" },
  { breed: "Shih Tzu", price: "45€" },
  { breed: "Schnauzer Mediano (corte)", price: "55€" },
  { breed: "Schnauzer Mediano (stripping)", price: "65€" },
  { breed: "Schnauzer Grande (corte)", price: "65€" },
  { breed: "Schnauzer Grande (stripping)", price: "75€" },
  { breed: "Cocker Americano (corte comercial con máquina)", price: "50€" },
  { breed: "Cocker Americano (corte de raza, stripping)", price: "65€" },
  { breed: "Cocker Inglés (corte comercial con máquina)", price: "50€" },
  { breed: "Cocker Inglés (corte de raza, stripping)", price: "65€" },
  { breed: "Border Collie", price: "60€" },
  { breed: "Boyero de Berna", price: "75€" },
  { breed: "Labrador Retriever", price: "55€" },
  { breed: "Golden Retriever", price: "65€" },
  { breed: "Perro de Agua Español", price: "Según estilo" },
];

const otherServices = [
  {
    service: "Limpieza dental sin anestesia",
    price: "Desde 70€",
    icon: <Sparkles size={24} className="text-accent" />,
  },
  {
    service: "Colorimetría con tintes seguros",
    price: "Desde 50€",
    icon: <Palette size={24} className="text-accent" />,
  },
];

const nailServices = [
  { size: "Perros pequeños y gatos", price: "5€" },
  { size: "Perros medianos", price: "8€" },
  { size: "Perros grandes y gigantes", price: "10€" },
];

const PriceCard = ({ title, icon, items, keyName, valueName }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-accent/20 rounded-full mr-4">{icon}</div>
        <h3 className="text-2xl font-bold text-dark">{title}</h3>
      </div>
      <ul className="space-y-3 text-gray-900">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="font-medium">{item[keyName]}</span>
            <span className="font-bold text-dark">{item[valueName]}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const PriceList = () => {
  return (
    <section id="precios" className="bg-light py-16">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-dark mb-12">
          Nuestra lista de precios
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-accent/20 rounded-full mr-4">
                <Scissors className="text-accent" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-dark">
                Tarifas orientativas por razas — Otoño 2025
              </h3>
            </div>
            <ul className="space-y-4 text-gray-900 columns-1 md:columns-2">
              {groomingPrices.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center pr-4 border-b border-gray-200 py-3 hover:bg-gray-50 rounded transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.breed}</span>
                  <span className="font-bold text-dark text-lg">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {otherServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full mr-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-dark">{service.service}</h3>
              </div>
              <p className="text-4xl font-bold text-right text-accent mt-4">
                {service.price}
              </p>
            </div>
          ))}

          <PriceCard
            title="Corte de uñas con pulido"
            icon={<PawPrint className="text-accent" size={28} />}
            items={nailServices}
            keyName="size"
            valueName="price"
          />
        </div>

        <div className="mt-12 space-y-4">
          <div className="bg-secondary/30 rounded-lg p-6">
            <h4 className="font-bold text-dark mb-3 text-lg">
              Todos los servicios incluyen:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Cepillado y desenredado</li>
              <li>Corte de uñas con lima</li>
              <li>Limpieza de oídos</li>
              <li>Corte higiénico según necesidad</li>
              <li>Baño con cosmética de alta calidad</li>
            </ul>
          </div>
          <p className="text-center text-gray-600 text-sm">
            <strong>Nota:</strong> Exceso de nudos y muda: a partir de 10€ adicionales.
            Perros con más peso del estándar: precio ajustado tras evaluación.
          </p>
          <p className="text-center text-gray-500 text-sm">
            Los precios son orientativos y pueden variar según el estado del manto y el comportamiento de la mascota. Para un presupuesto exacto, consúltanos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(PriceList);
