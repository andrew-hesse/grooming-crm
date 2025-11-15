import { useState, useEffect } from 'react';
import contactInfo from '../config/contactInfo';

/**
 * Custom hook to load gallery images using Vite's import.meta.glob
 * @param {number} limit - Maximum number of images to load (0 for all)
 * @returns {Object} - { images, loading, error }
 */
const useGalleryImages = (limit = 0) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Use Vite's import.meta.glob to load images
        const imageContext = import.meta.glob('/src/assets/images/*.avif');

        // Load all images in parallel and sort by filename for stable ordering
        const imageEntries = Object.entries(imageContext).sort(([pathA], [pathB]) =>
          pathA.localeCompare(pathB)
        );

        const entriesToLoad =
          limit > 0 ? imageEntries.slice(0, limit) : imageEntries;

        const loadedImages = await Promise.all(
          entriesToLoad.map(async ([path, loader]) => {
            const module = await loader();
            const fileNameMatch = path.match(/\/([^/]+)\.\w+$/);
            const fileName = fileNameMatch ? fileNameMatch[1] : '';

            return {
              src: module.default,
              alt: `${contactInfo.businessName} - ${fileName.replace(/[-_]+/g, ' ')}`,
              id: fileName,
            };
          })
        );

        // If no images found, use placeholders
        if (loadedImages.length === 0) {
          const placeholderCount = limit || 12;
          const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
            src: `https://placehold.co/600x400/FFF6ED/947D7A?text=${contactInfo.businessName}+${i + 1}`,
            alt: `Ejemplo de trabajo en ${contactInfo.businessName} ${i + 1}`,
            id: `placeholder-${i + 1}`
          }));
          setImages(placeholders);
        } else {
          setImages(loadedImages);
        }
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Error al cargar las imágenes');

        // Fallback to placeholders on error
        const placeholderCount = limit || 12;
        const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
          src: `https://placehold.co/600x400/FFF6ED/947D7A?text=${contactInfo.businessName}+${i + 1}`,
          alt: `Ejemplo de trabajo en ${contactInfo.businessName} ${i + 1}`,
          id: `placeholder-${i + 1}`
        }));
        setImages(placeholders);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [limit]);

  return { images, loading, error };
};

export default useGalleryImages;
