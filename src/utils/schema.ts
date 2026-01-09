// src/utils/schema.ts
interface Company {
  name: string;
  phone: string;
  website: string;
  address: {
    houseNo: string;
    streetAddress: string;
    city: string;
    county?: string;
    postcode: string;
    latitude: number;
    longitude: number;
  };
  openingHours: {
    [key: string]: { opens: string; closes: string };
  };
}

interface Social {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  [key: string]: string | undefined;
}

export function generateLocalBusinessSchema(company: Company, social: Social) {
  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const openingHoursSpec = daysOrder.map((day) => {
    const hours = company.openingHours[day];
    return {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
      "opens": hours.opens,
      "closes": hours.closes
    };
  });

  const sameAs = Object.entries(social)
    .filter(([_, url]) => url && url !== "#")
    .map(([_, url]) => url);

  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": company.name,
    "image": "",
    "@id": "",
    "url": company.website,
    "telephone": company.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${company.address.houseNo} ${company.address.streetAddress}`,
      "addressLocality": company.address.county || company.address.city,
      "postalCode": company.address.postcode,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": company.address.latitude,
      "longitude": company.address.longitude
    },
    "openingHoursSpecification": openingHoursSpec,
    "sameAs": sameAs
  };
}