import { Link } from "react-router-dom";
import contactInfo from "../config/contactInfo";

const LegalNoticePage = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="section">
        <div className="container-custom max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-accent uppercase tracking-widest text-xs mb-6 inline-block hover:text-dark transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-dark">Aviso legal</h1>
              <p className="text-dark/70 leading-relaxed">
                El uso de este sitio web atribuye la condición de persona usuaria e implica la aceptación plena de las condiciones que se detallan a continuación.
              </p>
            </div>

            <article className="space-y-10">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">1. Datos identificativos</h2>
                <div className="space-y-2 text-sm text-dark/75">
                  <p>
                    <strong>Titular del sitio:</strong> {contactInfo.businessName} – {contactInfo.owner}
                  </p>
                  {contactInfo.taxId && (
                    <p>
                      <strong>Identificador fiscal:</strong> {contactInfo.taxId}
                    </p>
                  )}
                  <p>
                    <strong>Domicilio profesional:</strong> {contactInfo.address.fullAddress}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {contactInfo.phone}
                  </p>
                  <p>
                    <strong>Correo electrónico:</strong> {contactInfo.email}
                  </p>
                  <p>
                    <strong>Sitio web:</strong>{" "}
                    <a
                      href={contactInfo.website}
                      className="text-accent underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactInfo.website}
                    </a>
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">2. Condiciones de uso</h2>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>El acceso al sitio es libre y gratuito. El uso indebido de los contenidos o servicios es responsabilidad exclusivamente de la persona usuaria.</li>
                  <li>El titular se reserva el derecho a modificar la presentación, configuración y contenidos del sitio, así como a interrumpir temporalmente el servicio por motivos técnicos o de mantenimiento.</li>
                  <li>La navegación por determinadas secciones puede requerir el uso de cookies técnicas. Para más información, consulta la Política de Cookies.</li>
                  <li>El uso continuado del sitio implica la aceptación de la Política de Privacidad y de las actualizaciones que puedan realizarse.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">3. Propiedad intelectual e industrial</h2>
                <p className="text-sm text-dark/75">
                  Todos los contenidos (textos, imágenes, logotipos, diseños, combinaciones de colores y software) son titularidad de {contactInfo.businessName} o se utilizan con autorización de sus propietarios. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin consentimiento previo y por escrito, salvo autorización expresa o amparo legal.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">4. Enlaces</h2>
                <p className="text-sm text-dark/75">
                  El sitio puede contener enlaces hacia páginas externas gestionadas por terceros. {contactInfo.businessName} no se hace responsable del contenido ni de las medidas de seguridad adoptadas en dichos sitios, por lo que la persona usuaria accede bajo su exclusiva responsabilidad.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">5. Responsabilidad</h2>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>{contactInfo.businessName} no garantiza la ausencia de errores o interrupciones del servicio, si bien aplicará las medidas oportunas para evitarlos o subsanarlos.</li>
                  <li>No se responsabiliza de los daños derivados del uso de versiones no actualizadas del navegador, de configuraciones inadecuadas, de la presencia de malware o de cualquier incidencia imputable a terceros.</li>
                  <li>La persona usuaria se compromete a no utilizar el sitio con finalidades ilícitas o lesivas para los derechos e intereses de terceros.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">6. Legislación y jurisdicción aplicables</h2>
                <p className="text-sm text-dark/75">
                  Este aviso legal se rige por la legislación española. Para la resolución de conflictos derivados del uso del sitio, las partes se someten a los juzgados y tribunales competentes de Madrid, salvo que la normativa en materia de consumidores y usuarios establezca otro fuero imperativo.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalNoticePage;
