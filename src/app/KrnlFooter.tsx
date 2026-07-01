import { ArrowRight } from "lucide-react";
import { krnlNavigate } from "./navigate";
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

const COLS: { title: string; links: { label: string; external?: boolean; action?: () => void }[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Plataforma" },
      { label: "Arquitectura modular" },
      { label: "Agentes IA" },
      { label: "Automatizaciones" },
      { label: "Dashboards" },
      { label: "Soberanía IA" },
    ],
  },
  {
    title: "Gobierno",
    links: [
      { label: "Gobierno de IA" },
      { label: "Guardrails" },
      { label: "Auditoría y trazabilidad" },
      { label: "Ciberseguridad Orión" },
      { label: "Control de costos" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Guías" },
      { label: "Casos de uso" },
      { label: "Arquitectura IA" },
      { label: "Ciberseguridad" },
      { label: "Insights IA", action: () => krnlNavigate("insights") },
      { label: "Casos de éxito" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Orión Global" },
      { label: "Contacto" },
      { label: "LinkedIn", external: true },
    ],
  },
];

export default function KrnlFooter() {
  return (
    <footer style={{ background: "#F9F7FE", borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10" style={{ paddingTop: 72, paddingBottom: 56 }}>

        {/* Main grid: brand (wider) + 4 nav columns */}
        <div
          className="grid grid-cols-1 gap-10 md:gap-12"
          style={{ gridTemplateColumns: "repeat(1, 1fr)", marginBottom: 56 }}
        >
          {/* Use a CSS grid only on desktop */}
          <div
            className="hidden md:grid md:gap-12"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
          >
            <BrandColumn />
            {COLS.map(col => <NavColumn key={col.title} {...col} />)}
          </div>

          {/* Mobile: stacked */}
          <div className="flex flex-col gap-8 md:hidden">
            <BrandColumn />
            {COLS.map(col => <NavColumn key={col.title} {...col} />)}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center"
          style={{ borderTop: `1px solid ${B.border}`, paddingTop: 24 }}
        >
          <p className="text-[12px]" style={{ color: B.textMuted }}>
            © 2026 KRNL. Todos los derechos reservados.
          </p>
          <div className="flex items-center">
            {["Privacidad", "Términos", "Contacto"].map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && (
                  <span style={{ color: B.borderSoft, padding: "0 12px", userSelect: "none" }}>|</span>
                )}
                <a
                  href="#"
                  className="text-[12px] no-underline"
                  style={{ color: B.textMuted, transition: "color 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = B.text; }}
                  onMouseLeave={e => { e.currentTarget.style.color = B.textMuted; }}
                >
                  {l}
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
        style={{ display: "block", width: 110, height: "auto", objectFit: "contain", marginBottom: 20 }}
      />
      <p
        className="text-[14px] leading-relaxed mb-7"
        style={{ color: B.textSub, maxWidth: 260, lineHeight: 1.75 }}
      >
        Plataforma de IA corporativa para centralizar, gobernar y operar agentes, modelos y automatizaciones con seguridad, trazabilidad y control.
      </p>
      <a
        href="#"
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

function NavColumn({ title, links }: { title: string; links: { label: string; external?: boolean; action?: () => void }[] }) {
  return (
    <div>
      <p
        className="text-[10px] font-[700] tracking-[0.2em] mb-5 uppercase"
        style={{ ...MONO, color: B.textMuted }}
      >
        {title}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-col gap-3">
        {links.map(({ label, external, action }) => (
          <li key={label}>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[13px] no-underline"
              style={{ color: B.textSub, transition: "color 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.color = B.purple; }}
              onMouseLeave={e => { e.currentTarget.style.color = B.textSub; }}
              onClick={e => { if (!external) { e.preventDefault(); action?.(); } }}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
              {external && (
                <span style={{ fontSize: 9, opacity: 0.55, marginLeft: 1 }}>↗</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
