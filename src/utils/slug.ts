export default function slug (s:string) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

