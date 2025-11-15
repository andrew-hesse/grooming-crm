import { Link } from "react-router-dom";
import contactInfo from "../config/contactInfo";

const PrivacyPolicyPage = () => {
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
              <h1 className="text-3xl font-bold text-dark">Política de privacidad</h1>
              <p className="text-dark/70 leading-relaxed">
                Esta política describe cómo {contactInfo.businessName} trata los datos personales recogidos a través del sitio web y los canales de contacto asociados. El uso del sitio implica la aceptación de este aviso.
              </p>
            </div>

            <article className="space-y-10">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">1. Responsable del tratamiento</h2>
                <div className="space-y-2 text-sm text-dark/75">
                  <p>
                    <strong>Titular:</strong> {contactInfo.businessName} – {contactInfo.owner}
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
                    <strong>WhatsApp:</strong> {contactInfo.phone}
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">2. Datos tratados</h2>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>
                    <strong>Solicitud de cita online:</strong> nombre y apellidos, teléfono, nombre y características de la mascota, servicios solicitados, horarios preferidos y observaciones.
                  </li>
                  <li>
                    <strong>Comunicaciones directas:</strong> datos incluidos en correos electrónicos, llamadas telefónicas o mensajes de WhatsApp iniciados por la persona interesada.
                  </li>
                  <li>
                    <strong>Navegación y seguridad:</strong> registros técnicos básicos (dirección IP anonimizada, fecha y hora de acceso, navegador y sistema operativo) utilizados para garantizar la operatividad y prevenir incidentes.
                  </li>
                  <li>
                    <strong>Cookies funcionales:</strong> el identificador <code>tatycan_booking_data</code> guarda durante 90 días los datos introducidos en el formulario para agilizar futuras solicitudes de cita.
                  </li>
                </ul>
                <p className="text-sm text-dark/60">
                  No se tratan categorías especiales de datos ni se elaboran perfiles automatizados que produzcan efectos jurídicos.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">3. Finalidades y legitimación</h2>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>Gestionar solicitudes de cita y consultas, incluidas las comunicaciones necesarias para su seguimiento (art. 6.1.b RGPD).</li>
                  <li>Atender las comunicaciones enviadas a través de correo, teléfono o WhatsApp (art. 6.1.b RGPD).</li>
                  <li>Mantener la operatividad del sitio, garantizar la seguridad y prevenir usos fraudulentos (art. 6.1.f RGPD).</li>
                  <li>Cumplir obligaciones legales en materia contable, fiscal o de protección de datos (art. 6.1.c RGPD).</li>
                  <li>Enviar comunicaciones comerciales sólo con consentimiento expreso o cuando exista una relación previa que lo permita (art. 6.1.a y 6.1.f RGPD, art. 21 LSSI).</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">4. Destinatarios y encargados</h2>
                <p className="text-sm text-dark/75">
                  Los datos pueden comunicarse a los siguientes destinatarios para prestar los servicios solicitados o cumplir obligaciones legales:
                </p>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>Proveedores tecnológicos que dan soporte al sitio web (por ejemplo, Vercel Inc. como plataforma de alojamiento).</li>
                  <li>Servicios de mensajería o correo electrónico utilizados para responder a consultas.</li>
                  <li>Telegram Messenger LLP: las solicitudes enviadas desde el formulario se reciben a través de la API oficial de Telegram en un canal privado.</li>
                  <li>Administraciones públicas, fuerzas y cuerpos de seguridad o entidades financieras cuando una norma lo exija.</li>
                </ul>
                <p className="text-sm text-dark/60">
                  Se firman contratos de encargo de tratamiento con proveedores que acceden a datos personales.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">5. Transferencias internacionales</h2>
                <p className="text-sm text-dark/75">
                  El uso de la API de Telegram puede implicar transferencias internacionales fuera del Espacio Económico Europeo. Telegram aplica cláusulas contractuales tipo y medidas adicionales según sus términos de servicio. Puedes contactar por teléfono o correo si prefieres evitar este canal.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">6. Plazos de conservación</h2>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>Solicitudes de cita y comunicaciones: 12 meses desde la última interacción o mientras se mantenga la relación. Posteriormente se conservarán bloqueadas por los plazos de prescripción aplicables.</li>
                  <li>Documentación contable y fiscal: 6 años.</li>
                  <li>Currículums y candidaturas espontáneas: hasta 3 años desde la última actualización.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">7. Derechos de las personas interesadas</h2>
                <p className="text-sm text-dark/75">
                  Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación, portabilidad y a no ser objeto de decisiones automatizadas enviando una solicitud a:
                </p>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>Dirección postal: {contactInfo.address.fullAddress}</li>
                  <li>Correo electrónico: {contactInfo.email}</li>
                </ul>
                <p className="text-sm text-dark/75">
                  Será necesario adjuntar documentación acreditativa de la identidad. Si consideras que tus derechos se han visto vulnerados, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-accent underline">www.aepd.es</a>).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">8. Seguridad</h2>
                <p className="text-sm text-dark/75">
                  Aplicamos medidas técnicas y organizativas apropiadas para proteger los datos personales frente a accesos no autorizados, pérdida o alteración. Solo el personal autorizado y los encargados necesarios acceden a la información.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">9. Cambios en la política</h2>
                <p className="text-sm text-dark/75">
                  {contactInfo.businessName} podrá actualizar esta política para adaptarla a novedades normativas o cambios en la prestación de servicios. Publicaremos cualquier modificación en este mismo apartado, indicando la fecha de la última revisión.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
