export type PageKey =
  | "home" | "producto" | "independencia" | "shadowai"
  | "gobierno" | "contacto";

const PAGE_TO_HASH: Record<PageKey, string> = {
  home:          "inicio",
  shadowai:      "riesgos",
  producto:      "producto",
  gobierno:      "gobierno",
  independencia: "soberania-ia",
  contacto:      "contacto",
};

const HASH_TO_PAGE: Record<string, PageKey> = Object.fromEntries(
  (Object.entries(PAGE_TO_HASH) as [PageKey, string][]).map(([page, hash]) => [hash, page])
);

export function pageToHash(page: PageKey): string {
  return PAGE_TO_HASH[page] ?? "inicio";
}

export function hashToPage(hash: string): PageKey {
  const clean = hash.replace(/^#/, "").split("/")[0];
  return HASH_TO_PAGE[clean] ?? "home";
}

export function krnlNavigate(pageKey: string): void {
  window.location.hash = pageToHash(pageKey as PageKey);
  window.scrollTo({ top: 0 });
}
