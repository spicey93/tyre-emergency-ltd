// src/utils/schema.ts
interface Company {
  name: string;
  phone: string;
  website: string;
  showAddress?: boolean;
  address: {
    houseNo: string;
    streetAddress: string;
    city: string;
    county?: string;
    postcode: string;
    latitude: number | string;
    longitude: number | string;
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

  // Convert coordinates to numbers if they're strings
  const latitude = typeof company.address.latitude === 'string' 
    ? parseFloat(company.address.latitude) 
    : company.address.latitude;
  const longitude = typeof company.address.longitude === 'string'
    ? parseFloat(company.address.longitude)
    : company.address.longitude;

  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": company.name,
    "image": "",
    "@id": "",
    "url": company.website,
    "telephone": company.phone,
    ...(company.showAddress !== false && company.address.houseNo && company.address.streetAddress ? {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": `${company.address.houseNo} ${company.address.streetAddress}`,
        "addressLocality": company.address.county || company.address.city,
        "postalCode": company.address.postcode,
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      }
    } : {}),
    "openingHoursSpecification": openingHoursSpec,
    "sameAs": sameAs
  };
}