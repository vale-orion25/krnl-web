export function krnlNavigate(pageKey: string): void {
  window.dispatchEvent(new CustomEvent("krnl:navigate", { detail: pageKey }));
  window.scrollTo({ top: 0 });
}
