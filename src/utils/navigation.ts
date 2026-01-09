// src/utils/navigation.ts
export interface NavLink {
  href: string;
  label: string;
}

export const quickLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/get-quote", label: "Get a Quote" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];