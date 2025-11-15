import { useState, lazy, Suspense } from "react";
import useGalleryImages from "../hooks/useGalleryImages";
import "yet-another-react-lightbox/styles.css";

const Lightbox = lazy(() => import("yet-another-react-lightbox"));

const GalleryPage = () => {
  const { images, loading } = useGalleryImages();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  const lightboxImages = images.map((image) => ({ src: image.src, alt: image.alt }));

  return (
    <div className="pt-16 bg-primary">
      <section className="section container-custom">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-dark mb-4">
            Nuestra galería
          </h1>
          <p className="text-lg text-dark/90 max-w-3xl mx-auto">
            Descubre nuestros mejores trabajos y las mascotas felices que nos visitan.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {open && (
        <Suspense fallback={null}>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={lightboxImages}
            index={photoIndex}
          />
        </Suspense>
      )}
    </div>
  );
};

export default GalleryPage;
