// src/utils/format.ts
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/\s+/g, '');
}

export function formatAddress(address: {
  houseNo: string;
  streetAddress: string;
  city: string;
  county?: string;
  postcode: string;
}, options: { includeCounty?: boolean, separator?: string } = {}): string {
  const { includeCounty = true, separator = ', ' } = options;
  const parts = [
    `${address.houseNo} ${address.streetAddress}`,
    address.city,
  ];
  
  if (includeCounty && address.county) {
    parts.push(address.county);
  }
  
  parts.push(address.postcode);
  return parts.join(separator);
}