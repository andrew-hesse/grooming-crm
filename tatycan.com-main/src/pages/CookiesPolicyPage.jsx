import { Link } from "react-router-dom";

const CookiesPolicyPage = () => {
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
              <h1 className="text-3xl font-bold text-dark">Política de cookies</h1>
              <p className="text-dark/70 leading-relaxed">
                Esta política explica qué cookies se utilizan en el sitio web, con qué finalidades y cómo pueden gestionarse desde tu navegador.
              </p>
            </div>

            <article className="space-y-10">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">1. ¿Qué es una cookie?</h2>
                <p className="text-sm text-dark/75">
                  Las cookies son pequeños archivos de texto que se descargan en tu dispositivo cuando visitas un sitio web. Permiten almacenar y recuperar información para mejorar la experiencia de navegación o habilitar funciones necesarias.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">2. Cookies utilizadas</h2>
                <p className="text-sm text-dark/75">
                  Actualmente utilizamos exclusivamente cookies propias de carácter técnico y funcional indispensables para el proceso de reserva online:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-dark/75 border border-neutral/20">
                    <thead className="bg-secondary/40 text-dark uppercase tracking-wider text-xs">
                      <tr>
                        <th className="px-4 py-3 border-b border-neutral/20">Nombre</th>
                        <th className="px-4 py-3 border-b border-neutral/20">Titular</th>
                        <th className="px-4 py-3 border-b border-neutral/20">Finalidad</th>
                        <th className="px-4 py-3 border-b border-neutral/20">Tipo</th>
                        <th className="px-4 py-3 border-b border-neutral/20">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3 border-b border-neutral/20 whitespace-nowrap">
                          tatycan_booking_data
                        </td>
                        <td className="px-4 py-3 border-b border-neutral/20 whitespace-nowrap">Propia</td>
                        <td className="px-4 py-3 border-b border-neutral/20">
                          Guardar temporalmente los datos introducidos en el formulario de cita para facilitar futuras gestiones.
                        </td>
                        <td className="px-4 py-3 border-b border-neutral/20 whitespace-nowrap">Funcional</td>
                        <td className="px-4 py-3 border-b border-neutral/20 whitespace-nowrap">90 días</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-dark/60">
                  No se emplean cookies analíticas, publicitarias ni de terceros. Si en el futuro se incorporan nuevas tecnologías de seguimiento, se actualizará esta política y, cuando proceda, se solicitará tu consentimiento.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">3. Cómo gestionar las cookies</h2>
                <p className="text-sm text-dark/75">
                  Puedes permitir, bloquear o eliminar las cookies configurando tu navegador. Los siguientes recursos te muestran cómo hacerlo en los principales navegadores:
                </p>
                <ul className="text-sm text-dark/75 space-y-3 list-disc list-inside">
                  <li>
                    Chrome:{" "}
                    <a
                      href="https://support.google.com/accounts/answer/61416?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      support.google.com/accounts/answer/61416
                    </a>
                  </li>
                  <li>
                    Firefox:{" "}
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-web
                    </a>
                  </li>
                  <li>
                    Safari:{" "}
                    <a
                      href="https://support.apple.com/es-es/HT201265"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      support.apple.com/es-es/HT201265
                    </a>
                  </li>
                  <li>
                    Microsoft Edge:{" "}
                    <a
                      href="https://support.microsoft.com/es-es/help/4468240/microsoft-edge-browsing-data-and-privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      support.microsoft.com/es-es/help/4468240/microsoft-edge-browsing-data-and-privacy
                    </a>
                  </li>
                  <li>
                    Opera:{" "}
                    <a
                      href="http://help.opera.com/Windows/11.50/es-ES/cookies.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      help.opera.com/Windows/11.50/es-ES/cookies.html
                    </a>
                  </li>
                </ul>
                <p className="text-sm text-dark/60">
                  La desactivación de la cookie funcional puede afectar al funcionamiento del formulario de reservas.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-dark">4. Actualizaciones</h2>
                <p className="text-sm text-dark/75">
                  {`Esta política puede actualizarse para adaptarla a cambios legislativos o técnicos. En caso de modificaciones relevantes, se avisará a las personas usuarias a través del sitio web.`}
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicyPage;
