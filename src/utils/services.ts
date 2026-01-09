// src/utils/services.ts
import type { pages } from "../data/config.json";

type ServicePages = typeof pages.services;

interface Service {
  isProvided: boolean;
  pageTitle: string;
  [key: string]: any;
}

export function getAllServices(serviceGroups: ServicePages): Service[] {
  if (!Array.isArray(serviceGroups)) return [];
  return serviceGroups.flatMap((group) => Object.values(group));
}

export function getProvidedServices(serviceGroups: ServicePages): Service[] {
  return getAllServices(serviceGroups).filter((s) => s.isProvided);
}

export function getNavServices(serviceGroups: ServicePages) {
  return getProvidedServices(serviceGroups).map((s) => ({
    title: s.pageTitle,
    slug: slugify(s.pageTitle),
  }));
}

function slugify(s: string): string {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}