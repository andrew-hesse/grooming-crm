import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import useGalleryImages from "../hooks/useGalleryImages";
import contactInfo from "../config/contactInfo";

const GALLERY_PREVIEW_LIMIT = 3;

const GalleryPreview = () => {
  const { images, loading, error } = useGalleryImages(GALLERY_PREVIEW_LIMIT);

  return (
    <section id="galeria" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Nuestra galería
          </h2>
          <p className="text-lg text-dark/90 max-w-3xl mx-auto">
            Echa un vistazo a algunos de nuestros trabajos y clientes felices.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SkeletonLoader type="gallery" count={6} />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-red-500 text-6xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Error al cargar la galería</h3>
              <p className="text-dark/70 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
                aria-label="Recargar página para reintentar"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/FFF6ED/947D7A?text=${contactInfo.businessName}+Grooming`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" aria-hidden="true"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/galeria" className="btn btn-primary">
                Ver galería completa
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryPreview;
