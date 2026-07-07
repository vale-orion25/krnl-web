import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { krnlNavigate, pageToHash } from "./navigate";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";

const B = {
  purple:     "#6D2BFF",
  magenta:    "#D4009A",
  text:       "#0D1524",
  textSub:    "#5B657A",
  textMuted:  "#9AA5B8",
  border:     "#E7E1EC",
  borderSoft: "#EFEAF2",
};
const GRAD = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO = { fontFamily: "'JetBrains Mono', monospace" };

const COLS: { title: string; links: { label: string; href: string; external?: boolean; action?: () => void }[] }[] = [
  {
    title: "Plataforma",
    links: [
      { label: "Arquitectura modular", href: `#${pageToHash("producto")}`, action: () => krnlNavigate("producto") },
      { label: "Servicios profesionales", href: `#${pageToHash("producto")}`, action: () => krnlNavigate("producto") },
      { label: "Madurez de adopción", href: `#${pageToHash("producto")}`, action: () => krnlNavigate("producto") },
    ],
  },
  {
    title: "Gobierno",
    links: [
      { label: "Políticas y guardrails", href: `#${pageToHash("gobierno")}`, action: () => krnlNavigate("gobierno") },
      { label: "Auditoría y evidencia", href: `#${pageToHash("gobierno")}`, action: () => krnlNavigate("gobierno") },
      { label: "Control de costos", href: `#${pageToHash("gobierno")}`, action: () => krnlNavigate("gobierno") },
    ],
  },
  {
    title: "Riesgos y soberanía",
    links: [
      { label: "Shadow AI", href: `#${pageToHash("shadowai")}`, action: () => krnlNavigate("shadowai") },
      { label: "Riesgos de IA dispersa", href: `#${pageToHash("shadowai")}`, action: () => krnlNavigate("shadowai") },
      { label: "Independencia de proveedor", href: `#${pageToHash("independencia")}`, action: () => krnlNavigate("independencia") },
      { label: "Modelos y datos propios", href: `#${pageToHash("independencia")}`, action: () => krnlNavigate("independencia") },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Orión", href: "https://www.orion.global", external: true },
      { label: "Contacto", href: `#${pageToHash("contacto")}`, action: () => krnlNavigate("contacto") },
      { label: "info@orion.global", href: "mailto:info@orion.global", external: true },
    ],
  },
];

export default function KrnlFooter() {
  return (
    <footer style={{ background: "#F9F7FE", borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10" style={{ paddingTop: 40, paddingBottom: 32 }}>

        {/* Main grid: brand (wider) + 4 nav columns */}
        <div
          className="grid grid-cols-1 gap-6 md:gap-8"
          style={{ gridTemplateColumns: "repeat(1, 1fr)", marginBottom: 32 }}
        >
          {/* Use a CSS grid only on desktop */}
          <div
            className="hidden lg:grid lg:gap-8"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
          >
            <BrandColumn />
            {COLS.map(col => <NavColumn key={col.title} {...col} />)}
          </div>

          {/* Mobile: stacked, categories collapsed into accordions */}
          <div className="flex flex-col gap-6 lg:hidden">
            <BrandColumn />
            <div style={{ borderTop: `1px solid ${B.borderSoft}` }}>
              {COLS.map(col => <NavColumnAccordion key={col.title} {...col} />)}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center"
          style={{ borderTop: `1px solid ${B.border}`, paddingTop: 16 }}
        >
          <p className="text-xs" style={{ color: B.textMuted }}>
            © 2026 KRNL. Todos los derechos reservados.
          </p>
          <div className="flex items-center">
            {[
              { label: "Privacidad", href: "https://orion.global/politica-de-privacidad/", external: true },
              { label: "Contacto",   href: `#${pageToHash("contacto")}`,                    external: false },
            ].map(({ label, href, external }, i) => (
              <span key={label} className="flex items-center">
                {i > 0 && (
                  <span style={{ color: B.borderSoft, padding: "0 12px", userSelect: "none" }}>|</span>
                )}
                <a
                  href={href}
                  onClick={e => { if (!external) { e.preventDefault(); krnlNavigate("contacto"); } }}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-xs no-underline"
                  style={{ color: B.textMuted, transition: "color 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = B.text; }}
                  onMouseLeave={e => { e.currentTarget.style.color = B.textMuted; }}
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

function BrandColumn() {
  return (
    <div>
      <ImageWithFallback
        src={krnlLogo}
        alt="KRNL"
        style={{ display: "block", width: 110, height: "auto", objectFit: "contain", marginBottom: 16 }}
      />
      <p
        className="text-[13px] leading-relaxed mb-5"
        style={{ color: B.textSub, maxWidth: 260, lineHeight: 1.65 }}
      >
        Plataforma de IA corporativa para conectar agentes, modelos y automatizaciones, con gobierno y trazabilidad de extremo a extremo.
      </p>
      <a
        href={`#${pageToHash("contacto")}`}
        onClick={e => { e.preventDefault(); krnlNavigate("contacto"); }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg no-underline text-[13px] font-[700]"
        style={{
          background: GRAD,
          color: "#fff",
          boxShadow: `0 4px 18px rgba(109,43,255,0.28)`,
          transition: "filter 0.18s, transform 0.18s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = "brightness(1.1)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        Conoce KRNL <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
      </a>
    </div>
  );
}

function NavColumnAccordion({ title, links }: { title: string; links: { label: string; href: string; external?: boolean; action?: () => void }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${B.borderSoft}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between"
        style={{ minHeight: 44, paddingTop: 12, paddingBottom: 12 }}
        aria-expanded={open}
      >
        <span
          className="text-xs font-[700] tracking-[0.2em] uppercase"
          style={{ ...MONO, color: B.textMuted }}
        >
          {title}
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0"
          style={{ color: B.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-col gap-3 pb-4">
              {links.map(({ label, href, external, action }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 text-[13px] no-underline"
                    style={{ color: B.textSub, minHeight: 24 }}
                    onClick={e => { if (!external) { e.preventDefault(); action?.(); } }}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavColumn({ title, links }: { title: string; links: { label: string; href: string; external?: boolean; action?: () => void }[] }) {
  return (
    <div>
      <p
        className="text-xs font-[700] tracking-[0.2em] mb-3 uppercase"
        style={{ ...MONO, color: B.textMuted }}
      >
        {title}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-col gap-2">
        {links.map(({ label, href, external, action }) => (
          <li key={label}>
            <a
              href={href}
              className="inline-flex items-center gap-1 text-[13px] no-underline"
              style={{ color: B.textSub, transition: "color 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.color = B.purple; }}
              onMouseLeave={e => { e.currentTarget.style.color = B.textSub; }}
              onClick={e => { if (!external) { e.preventDefault(); action?.(); } }}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
