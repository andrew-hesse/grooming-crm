import contactInfo from "../config/contactInfo";

const StructuredData = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contactInfo.businessName,
    description: contactInfo.description,
    url: contactInfo.website,
    telephone: contactInfo.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.region,
      postalCode: contactInfo.address.postalCode,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contactInfo.geo.latitude,
      longitude: contactInfo.geo.longitude,
    },
    openingHoursSpecification: contactInfo.hours.structured.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours
        .split(" ")[0]
        .split("-")
        .map((day) => {
          const days = {
            Mo: "Monday",
            Tu: "Tuesday",
            We: "Wednesday",
            Th: "Thursday",
            Fr: "Friday",
            Sa: "Saturday",
            Su: "Sunday",
          };
          return days[day];
        }),
      opens: hours.split(" ")[1].split("-")[0],
      closes: hours.split(" ")[1].split("-")[1],
    })),
    image: `${contactInfo.website}/hero.avif`, // Assuming hero image is a good representation
    priceRange: contactInfo.priceRange,
    sameAs: [contactInfo.social.instagram, contactInfo.social.googleMaps],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: contactInfo.website,
    potentialAction: {
      "@type": "SearchAction",
      target: `${contactInfo.website}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default StructuredData;
