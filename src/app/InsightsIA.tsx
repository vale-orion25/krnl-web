import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight, ArrowLeft, Search, Shield, Database, Box, Lock, FileText,
  CheckCircle2, Workflow, Clock,
} from "lucide-react";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";

// ── Brand tokens ───────────────────────────────────────────────────────────────
const B = {
  purple:      "#6D2BFF",
  magenta:     "#D4009A",
  amber:       "#F59E0B",
  sky:         "#0EA5E9",
  green:       "#22c55e",
  text:        "#0D1524",
  textSub:     "#5B657A",
  textMuted:   "#9AA5B8",
  surface:     "#FFFFFF",
  softBg:      "#F7F8FA",
  border:      "#E7E1EC",
  borderSoft:  "#EFEAF2",
  purpleSoft:  "#F1EAFB",
  magentaSoft: "#FDE8F6",
  amberSoft:   "#FFFBEB",
  skySoft:     "#EFF9FF",
  greenSoft:   "#F0FDF4",
};
const GRAD = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

// ── Category metadata ──────────────────────────────────────────────────────────
const CAT_META: Record<string, { col: string; bg: string }> = {
  "Shadow AI":      { col: B.amber,   bg: B.amberSoft },
  "Soberanía IA":   { col: B.purple,  bg: B.purpleSoft },
  "Gobierno IA":    { col: B.magenta, bg: B.magentaSoft },
  "Producto":       { col: B.purple,  bg: B.purpleSoft },
  "Datos":          { col: B.sky,     bg: B.skySoft },
  "AIOps":          { col: B.green,   bg: B.greenSoft },
  "Ciberseguridad": { col: B.purple,  bg: B.purpleSoft },
  "FDE":            { col: B.magenta, bg: B.magentaSoft },
  "Casos de uso":   { col: B.sky,     bg: B.skySoft },
};
function catMeta(c: string) { return CAT_META[c] ?? { col: B.purple, bg: B.purpleSoft }; }

// ── Data ───────────────────────────────────────────────────────────────────────
const FILTERS = ["Todos", "Gobierno IA", "Shadow AI", "Soberanía IA", "Ciberseguridad", "AIOps", "Casos de uso", "FDE"];

const FEATURED = [
  {
    cat:  "Shadow AI",
    title:"Qué es Shadow AI y por qué preocupa a las empresas",
    desc: "Cómo el uso disperso de herramientas de IA puede afectar datos, costos, trazabilidad y gobierno corporativo.",
    time: "5 min",
    dest: { kind: "page", page: "shadowai" },
  },
  {
    cat:  "Soberanía IA",
    title:"Por qué no conviene depender de un solo modelo",
    desc: "Multi-modelo, portabilidad del contexto y control sobre el conocimiento institucional.",
    time: "6 min",
    dest: { kind: "page", page: "independencia" },
  },
  {
    cat:  "Gobierno IA",
    title:"Cómo gobernar agentes de IA sin frenar la innovación",
    desc: "Políticas, permisos, auditoría y supervisión humana para escalar IA con seguridad.",
    time: "7 min",
    dest: { kind: "page", page: "gobierno" },
  },
];

const ARTICLES = [
  { cat: "Producto",       title: "De chatbot a operación IA: cómo escalar con control",              desc: "El camino desde un asistente básico hasta una plataforma de agentes gobernada y trazable.",            time: "4 min", dest: { kind: "page",   page: "producto" } },
  { cat: "Soberanía IA",   title: "Soberanía de datos en IA empresarial",                             desc: "Cómo garantizar que el conocimiento corporativo no quede atrapado en proveedores externos.",           time: "5 min", dest: { kind: "page",   page: "independencia" } },
  { cat: "AIOps",          title: "Qué es AIOps y cómo ayuda a observar la operación de IA",          desc: "Observabilidad, alertas y dashboards para mantener modelos y agentes bajo control continuo.",          time: "5 min", dest: { kind: "soon" } },
  { cat: "Ciberseguridad", title: "Ciberseguridad aplicada a agentes y modelos de IA",                desc: "Hardening, cifrado, redes seguras y monitoreo 24/7 para proteger la infraestructura de IA.",          time: "6 min", dest: { kind: "detail", slug: "ciberseguridad" } },
  { cat: "FDE",            title: "Qué es un Forward Deployed Engineer y por qué acelera la adopción",desc: "El rol que combina ingeniería, implementación y acompañamiento estratégico para escalar IA.",         time: "4 min", dest: { kind: "detail", slug: "forward-deployed-engineer" } },
  { cat: "Casos de uso",   title: "Cómo identificar casos de uso de IA con impacto real",             desc: "Marco para priorizar iniciativas de IA según valor, viabilidad y riesgo en entornos enterprise.",    time: "5 min", dest: { kind: "soon" } },
];

const TEMAS = [
  { Icon: Shield,      title: "Gobierno IA",    desc: "Políticas, guardrails, roles, auditoría y supervisión.", col: B.magenta, bg: B.magentaSoft, dest: { kind: "filter", value: "Gobierno IA" } },
  { Icon: Database,    title: "Soberanía IA",   desc: "Datos, modelos, portabilidad e independencia de proveedor.", col: B.purple,  bg: B.purpleSoft, dest: { kind: "filter", value: "Soberanía IA" } },
  { Icon: Box,         title: "Arquitectura IA", desc: "Multi-modelo, RAG, MCP, workflows y operación modular.", col: B.sky,     bg: B.skySoft, dest: { kind: "page", page: "producto" } },
  { Icon: Lock,        title: "Ciberseguridad",  desc: "Hardening, cifrado, monitoreo y seguridad enterprise.",  col: B.purple,  bg: B.purpleSoft, dest: { kind: "filter", value: "Ciberseguridad" } },
  { Icon: FileText,    title: "Casos de uso",    desc: "Aplicaciones por área: Legal, Finanzas, TI, RRHH y Operaciones.", col: B.sky, bg: B.skySoft, dest: { kind: "filter", value: "Casos de uso" } },
];

const GUIAS = [
  { Icon: CheckCircle2, title: "Checklist para detectar Shadow AI",  desc: "Identifica herramientas de IA no gobernadas en tu organización antes de que se vuelvan críticas.", format: "Checklist", col: B.amber,   bg: B.amberSoft, dest: { kind: "page", page: "shadowai" } },
  { Icon: FileText,     title: "Guía de gobierno para agentes IA",   desc: "Marco práctico para definir políticas, permisos, guardrails y auditoría sobre agentes.",           format: "Guía",      col: B.purple,  bg: B.purpleSoft, dest: { kind: "page", page: "gobierno" } },
  { Icon: Workflow,     title: "Roadmap de adopción IA en 5 capas",  desc: "Ruta desde herramientas aisladas hasta una plataforma gobernada, soberana y escalable.",            format: "Roadmap",   col: B.magenta, bg: B.magentaSoft, dest: { kind: "page", page: "producto" } },
];

// ── Insight detail content (topics without a dedicated page) ─────────────────
const INSIGHT_DETAILS: Record<string, {
  cat: string; title: string; time: string; lead: string;
  points: string[]; ctaPage: string; ctaLabel: string;
}> = {
  "ciberseguridad": {
    cat: "Ciberseguridad", time: "6 min",
    title: "Ciberseguridad aplicada a agentes y modelos de IA",
    lead: "Hardening, cifrado, redes seguras y monitoreo 24/7 para proteger la infraestructura de IA.",
    points: [
      "Hardening de agentes y modelos frente a prompt injection y fugas de datos.",
      "Cifrado de datos en tránsito y en reposo en toda la capa de operación de IA.",
      "Redes y accesos segmentados entre agentes, sistemas y proveedores de modelos.",
      "Monitoreo continuo 24/7 con alertas ante comportamiento anómalo.",
    ],
    ctaPage: "gobierno", ctaLabel: "Ver gobierno y guardrails",
  },
  "forward-deployed-engineer": {
    cat: "FDE", time: "4 min",
    title: "Qué es un Forward Deployed Engineer y por qué acelera la adopción",
    lead: "El rol que combina ingeniería, implementación y acompañamiento estratégico para escalar IA.",
    points: [
      "Ingeniería: adapta la plataforma al contexto técnico real de cada cliente.",
      "Implementación: acelera el paso de piloto a operación productiva.",
      "Acompañamiento estratégico: conecta el uso de IA con objetivos de negocio.",
    ],
    ctaPage: "contacto", ctaLabel: "Hablar con el equipo KRNL",
  },
};

function readInsightSlug(): string | null {
  const h = window.location.hash.replace(/^#/, "");
  const parts = h.split("/");
  return parts[0] === "casos-de-uso" && parts[1] ? parts[1] : null;
}
function openInsightDetail(slug: string) {
  window.location.hash = `casos-de-uso/${slug}`;
  window.scrollTo({ top: 0 });
}
function closeInsightDetail() {
  window.location.hash = "casos-de-uso";
  window.scrollTo({ top: 0 });
}

// ── Insight detail view ────────────────────────────────────────────────────────
function InsightDetailView({ data }: { data: typeof INSIGHT_DETAILS[string] }) {
  const m = catMeta(data.cat);
  return (
    <section className="relative overflow-hidden pt-[104px] pb-20" style={{ background: B.surface }}>
      <div className="max-w-[720px] mx-auto px-6 md:px-10">
        <button onClick={closeInsightDetail}
          className="inline-flex items-center gap-1.5 text-[13px] font-[600] mb-8 transition-all"
          style={{ color: B.textSub, background: "none", border: "none", cursor: "pointer" }}>
          <ArrowLeft className="w-4 h-4" strokeWidth={2} /> Volver a recursos
        </button>
        <span className="inline-block text-[10px] font-[800] px-2.5 py-1 rounded-full mb-4 tracking-[0.06em]"
          style={{ background: m.bg, color: m.col }}>{data.cat}</span>
        <h1 className="font-[800] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 38px)", color: B.text }}>
          {data.title}
        </h1>
        <span className="text-[12px] flex items-center gap-1.5 mb-8" style={{ color: B.textMuted }}>
          <Clock className="w-3.5 h-3.5" strokeWidth={1.75} /> {data.time} lectura
        </span>
        <p className="text-[17px] leading-relaxed mb-8" style={{ color: B.textSub }}>{data.lead}</p>
        <div className="flex flex-col gap-4 mb-10">
          {data.points.map(p => (
            <div key={p} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: m.col }} strokeWidth={1.75} />
              <p className="text-[14px] leading-relaxed" style={{ color: B.text }}>{p}</p>
            </div>
          ))}
        </div>
        <div className="pt-8" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
          <button onClick={() => krnlNavigate(data.ctaPage)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.02]"
            style={{ background: GRAD, boxShadow: `0 6px 24px ${B.purple}38` }}>
            {data.ctaLabel} <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Hero editorial visual ──────────────────────────────────────────────────────
function HeroEditorialVisual({ inV }: { inV: boolean }) {
  return (
    <div className="relative w-full" style={{ maxWidth: 520, height: 340, margin: "0 auto" }}>
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 55% 45%, #EDE9FA 0%, #FDF6FC 55%, transparent 80%)" }} />

      {/* Main card */}
      <motion.div className="absolute" style={{ left: 0, top: 20, width: 260, zIndex: 3 }}
        initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.25, ease }}>
        <div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 12px 40px rgba(109,43,255,0.13)" }}>
          <div className="h-1" style={{ background: "linear-gradient(90deg, #F59E0B, #FBB040)" }} />
          <div className="p-4">
            <span className="inline-block text-[9px] font-[800] px-2 py-0.5 rounded-full mb-2.5"
              style={{ background: B.amberSoft, color: B.amber, letterSpacing: "0.05em" }}>
              Shadow AI
            </span>
            <p className="text-[12px] font-[700] leading-snug mb-3" style={{ color: B.text }}>
              Qué es Shadow AI y por qué preocupa a las empresas
            </p>
            <div className="flex items-center gap-1 mb-3">
              <div className="flex gap-0.5">
                {[0,1,2,3].map(i => (
                  <div key={i} className="rounded-sm" style={{ width: 28+i*8, height: 4, background: i < 3 ? B.purpleSoft : B.borderSoft }} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2.5" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
              <span className="text-[9px] flex items-center gap-1.5" style={{ color: B.textMuted }}>
                <Clock className="w-2.5 h-2.5" strokeWidth={1.75} /> 5 min
              </span>
              <span className="text-[9px] font-[700]" style={{ color: B.purple }}>Leer →</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top-right card */}
      <motion.div className="absolute" style={{ right: 0, top: 0, width: 210, zIndex: 2 }}
        initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.38, ease }}>
        <div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 6px 20px rgba(212,0,154,0.09)" }}>
          <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${B.magenta}, ${B.purple})` }} />
          <div className="p-3.5">
            <span className="inline-block text-[8px] font-[800] px-1.5 py-0.5 rounded-full mb-2"
              style={{ background: B.magentaSoft, color: B.magenta }}>Gobierno IA</span>
            <p className="text-[10px] font-[700] leading-snug mb-1.5" style={{ color: B.text }}>
              Cómo gobernar agentes sin frenar la innovación
            </p>
            <div className="flex gap-0.5 mb-1.5">
              {[0,1,2].map(i => <div key={i} className="rounded-sm" style={{ width: 20+i*14, height: 3, background: B.magentaSoft }} />)}
            </div>
            <span className="text-[8px] flex items-center gap-1" style={{ color: B.textMuted }}>
              <Clock className="w-2 h-2" strokeWidth={1.75} /> 7 min
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right card */}
      <motion.div className="absolute" style={{ right: 0, top: 140, width: 210, zIndex: 2 }}
        initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.48, ease }}>
        <div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 6px 20px rgba(109,43,255,0.09)" }}>
          <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${B.purple}, ${B.magenta})` }} />
          <div className="p-3.5">
            <span className="inline-block text-[8px] font-[800] px-1.5 py-0.5 rounded-full mb-2"
              style={{ background: B.purpleSoft, color: B.purple }}>Soberanía IA</span>
            <p className="text-[10px] font-[700] leading-snug mb-1.5" style={{ color: B.text }}>
              Por qué no depender de un solo modelo
            </p>
            <div className="flex gap-0.5 mb-1.5">
              {[0,1,2].map(i => <div key={i} className="rounded-sm" style={{ width: 24+i*10, height: 3, background: B.purpleSoft }} />)}
            </div>
            <span className="text-[8px] flex items-center gap-1" style={{ color: B.textMuted }}>
              <Clock className="w-2 h-2" strokeWidth={1.75} /> 6 min
            </span>
          </div>
        </div>
      </motion.div>

      {/* Mini search bar mockup */}
      <motion.div className="absolute" style={{ left: 0, right: 0, bottom: 0, zIndex: 4 }}
        initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.58, ease }}>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: B.surface, border: `1px solid ${B.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: B.textMuted }} strokeWidth={1.75} />
          <span className="text-[11px]" style={{ color: B.textMuted }}>Buscar por tema, área o tecnología…</span>
          <div className="ml-auto flex gap-1.5 shrink-0">
            {["Gobierno IA", "AIOps"].map(c => (
              <span key={c} className="text-[8px] font-[700] px-2 py-0.5 rounded-full"
                style={{ ...MONO, background: B.purpleSoft, color: B.purple }}>{c}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroInsights({ onExplorar, onCasos }: { onExplorar: () => void; onCasos: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-16"
      style={{ background: "linear-gradient(160deg, #FEFBFE 0%, #F5F0FD 50%, #FEFCFE 100%)" }}>
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[560px] h-[280px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}70 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: content */}
          <div>
            <motion.div className="flex mb-5"
              initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
                style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
                Recursos KRNL
              </span>
            </motion.div>
            <motion.h1 className="font-[800] leading-tight mb-5"
              style={{ fontSize: "clamp(26px, 3.6vw, 46px)", color: B.text }}
              initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
              La biblioteca de recursos{" "}
              <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                para operar IA
              </span>{" "}
              con criterio
            </motion.h1>
            <motion.p style={{ fontSize: 16, color: B.textSub, lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}
              initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
              Guías, casos de uso y análisis prácticos para adoptar y escalar IA en entornos corporativos.
            </motion.p>
            <motion.div className="flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.26, ease }}>
              <button onClick={onExplorar}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.02]"
                style={{ background: GRAD, boxShadow: `0 6px 24px ${B.purple}38` }}>
                Explorar guías <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </button>
              <button onClick={onCasos}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-[14px] transition-all hover:scale-[1.02]"
                style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.textSub, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                Ver casos de uso
              </button>
            </motion.div>
          </div>
          {/* Right: editorial visual */}
          <motion.div initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15, ease }}>
            <HeroEditorialVisual inV={inV} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Search + filters ───────────────────────────────────────────────────────────
function SectionBuscador({ filter, setFilter, search, setSearch }: {
  filter: string; setFilter: (f: string) => void;
  search: string; setSearch: (s: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        <motion.div className="relative mb-5"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: B.textMuted }} strokeWidth={1.75} />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por tema, área o tecnología"
            className="w-full pl-11 pr-4 py-3 rounded-xl text-[14px]"
            style={{ border: `1.5px solid ${B.border}`, background: B.softBg, color: B.text, outline: "none", fontFamily: "inherit", transition: "border-color 0.15s, box-shadow 0.15s" }}
            onFocus={e => { e.currentTarget.style.borderColor = B.purple; e.currentTarget.style.boxShadow = `0 0 0 3px ${B.purple}14`; }}
            onBlur={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.boxShadow = "none"; }}
          />
        </motion.div>
        <motion.div className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.12, ease }}>
          {FILTERS.map(f => {
            const active = f === filter;
            return (
              <button key={f}
                onClick={() => setFilter(f)}
                className="text-[12px] font-[600] px-4 py-1.5 rounded-full transition-all"
                style={{
                  background: active ? GRAD : B.surface,
                  color: active ? "#fff" : B.textSub,
                  border: `1.5px solid ${active ? "transparent" : B.border}`,
                  boxShadow: active ? `0 3px 14px ${B.purple}35` : "none",
                  transition: "all 0.18s",
                }}>
                {f}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Featured card ──────────────────────────────────────────────────────────────
function FeaturedCard({ art, i, inV }: { art: typeof FEATURED[0]; i: number; inV: boolean }) {
  const m = catMeta(art.cat);
  const go = () => {
    if (art.dest.kind === "page") krnlNavigate(art.dest.page);
    else if (art.dest.kind === "detail") openInsightDetail(art.dest.slug);
  };
  return (
    <motion.div
      role="button" tabIndex={0} onClick={go}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }}
      className="flex flex-col rounded-2xl overflow-hidden h-full cursor-pointer"
      style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 20px rgba(109,43,255,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
      initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(109,43,255,0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(109,43,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${m.col}, ${m.col}80)` }} />
      <div className="flex flex-col flex-1 p-6">
        <span className="inline-block text-[10px] font-[800] px-2.5 py-1 rounded-full mb-4 self-start tracking-[0.06em]"
          style={{ background: m.bg, color: m.col }}>{art.cat}</span>
        <h3 className="font-[800] mb-3 leading-snug" style={{ fontSize: 18, color: B.text }}>{art.title}</h3>
        <p className="text-[14px] leading-relaxed flex-1" style={{ color: B.textSub }}>{art.desc}</p>
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
          <span className="text-[12px] flex items-center gap-1.5" style={{ color: B.textMuted }}>
            <Clock className="w-3.5 h-3.5" strokeWidth={1.75} /> {art.time} lectura
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-[700]" style={{ color: m.col }}>
            Leer insight <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Featured section ───────────────────────────────────────────────────────────
function SectionDestacados() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.softBg, borderBottom: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-3"
            style={{ ...MONO, color: B.textMuted }}>Lecturas recomendadas</p>
          <h2 className="font-[800]" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: B.text }}>
            Empieza por aquí
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED.map((art, i) => <FeaturedCard key={art.title} art={art} i={i} inV={inV} />)}
        </div>
      </div>
    </section>
  );
}

// ── Article card ───────────────────────────────────────────────────────────────
function ArticleCard({ art, i, inV }: { art: typeof ARTICLES[0]; i: number; inV: boolean }) {
  const m = catMeta(art.cat);
  const soon = art.dest.kind === "soon";
  const go = () => {
    if (art.dest.kind === "page") krnlNavigate(art.dest.page);
    else if (art.dest.kind === "detail") openInsightDetail(art.dest.slug);
  };
  return (
    <motion.div
      role={soon ? undefined : "button"} tabIndex={soon ? undefined : 0} onClick={soon ? undefined : go}
      onKeyDown={soon ? undefined : (e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } })}
      className={`flex flex-col rounded-xl overflow-hidden h-full ${soon ? "" : "cursor-pointer"}`}
      style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s, transform 0.2s", opacity: soon ? 0.72 : 1 }}
      initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: soon ? 0.72 : 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: 0.08 + i * 0.1, ease }}
      onMouseEnter={e => { if (soon) return; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(109,43,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { if (soon) return; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${m.col}, ${m.col}60)` }} />
      <div className="flex flex-col flex-1 p-5">
        <span className="inline-block text-[9px] font-[800] px-2 py-0.5 rounded-full mb-3 self-start"
          style={{ background: m.bg, color: m.col }}>{art.cat}</span>
        <h4 className="font-[700] mb-2 leading-snug" style={{ fontSize: 14, color: B.text }}>{art.title}</h4>
        <p className="text-[13px] leading-relaxed flex-1" style={{ color: B.textSub }}>{art.desc}</p>
        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
          <span className="text-[11px] flex items-center gap-1" style={{ color: B.textMuted }}>
            <Clock className="w-3 h-3" strokeWidth={1.75} /> {art.time}
          </span>
          {soon ? (
            <span className="text-[11px] font-[700]" style={{ color: B.textMuted }}>Próximamente</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[12px] font-[700]" style={{ color: B.purple }}>
              Leer insight <ArrowRight className="w-3 h-3" strokeWidth={2.2} />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Insights grid ──────────────────────────────────────────────────────────────
function SectionGridInsights({ filter, search, onClear }: {
  filter: string; search: string; onClear: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const q = search.toLowerCase().trim();
  const visible = ARTICLES.filter(art => {
    const matchFilter = filter === "Todos" || art.cat === filter;
    const matchSearch = !q ||
      art.title.toLowerCase().includes(q) ||
      art.desc.toLowerCase().includes(q) ||
      art.cat.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <section id="insights-grid" ref={ref} style={{ background: B.surface }}>
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <motion.div className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <div>
            <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-2"
              style={{ ...MONO, color: B.textMuted }}>Biblioteca</p>
            <h2 className="font-[800]" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: B.text }}>
              Todos los insights
            </h2>
          </div>
          {filter !== "Todos" && (
            <button onClick={onClear}
              className="text-[12px] font-[600] px-4 py-2 rounded-full transition-all hover:scale-[1.02]"
              style={{ background: B.softBg, border: `1.5px solid ${B.border}`, color: B.textSub }}>
              Limpiar filtro
            </button>
          )}
        </motion.div>

        {visible.length === 0 ? (
          <motion.div className="flex flex-col items-center py-20 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <p className="text-[16px] font-[600] mb-2" style={{ color: B.textSub }}>Sin resultados para esta búsqueda</p>
            <p className="text-[14px] mb-6" style={{ color: B.textMuted }}>Prueba otros términos o limpia los filtros</p>
            <button onClick={onClear}
              className="px-5 py-2.5 rounded-full text-[13px] font-[600] transition-all"
              style={{ background: GRAD, color: "#fff", boxShadow: `0 4px 16px ${B.purple}35` }}>
              Ver todos los insights
            </button>
          </motion.div>
        ) : (
          <motion.div key={`${filter}|${search}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
            {visible.map((art, i) => <ArticleCard key={art.title} art={art} i={i} inV={inV} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Topics section ─────────────────────────────────────────────────────────────
function SectionPorTemas({ applyFilter }: { applyFilter: (f: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="insights-temas" ref={ref} style={{ background: "linear-gradient(160deg, #FEFBFE 0%, #F5F0FD 60%, #FEFCFE 100%)", borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-2"
            style={{ ...MONO, color: B.textMuted }}>Categorías</p>
          <h2 className="font-[800]" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: B.text }}>
            Explora por tema
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TEMAS.map((tema, i) => {
            const TIcon = tema.Icon;
            const go = () => {
              if (tema.dest.kind === "filter") applyFilter(tema.dest.value);
              else if (tema.dest.kind === "page") krnlNavigate(tema.dest.page);
            };
            return (
              <motion.div key={tema.title}
                role="button" tabIndex={0} onClick={go}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }}
                className="flex flex-col p-5 rounded-2xl cursor-pointer"
                style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.2s" }}
                initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${tema.col}22`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: tema.bg }}>
                  <TIcon className="w-4.5 h-4.5" style={{ color: tema.col }} strokeWidth={1.75} />
                </div>
                <p className="text-[13px] font-[700] mb-1.5" style={{ color: B.text }}>{tema.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: B.textMuted }}>{tema.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Mid CTA ────────────────────────────────────────────────────────────────────
function CTAIntermedio() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, ease }}>
            <h2 className="font-[800] mb-4 leading-tight" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: B.text }}>
              ¿Tu empresa ya está usando IA{" "}
              <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                sin una capa común?
              </span>
            </h2>
            <p style={{ fontSize: 15, color: B.textSub, lineHeight: 1.7 }}>
              Conoce los riesgos de operar modelos, agentes y automatizaciones sin gobierno central.
            </p>
          </motion.div>
          <motion.div className="flex gap-3 flex-wrap md:justify-end"
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.12, ease }}>
            <button onClick={() => krnlNavigate("shadowai")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.02]"
              style={{ background: GRAD, boxShadow: `0 6px 24px ${B.purple}35` }}>
              Ver riesgos <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <button onClick={() => krnlNavigate("producto")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-[14px] transition-all hover:scale-[1.02]"
              style={{ background: B.softBg, border: `1.5px solid ${B.border}`, color: B.textSub }}>
              Ver producto
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Guide card ─────────────────────────────────────────────────────────────────
function GuiaCard({ guia, i, inV }: { guia: typeof GUIAS[0]; i: number; inV: boolean }) {
  const GIcon = guia.Icon;
  const go = () => { if (guia.dest.kind === "page") krnlNavigate(guia.dest.page); };
  return (
    <motion.div
      className="flex flex-col p-6 rounded-2xl"
      style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)", transition: "all 0.2s" }}
      initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.12 + i * 0.12, ease }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 36px ${guia.col}22`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: guia.bg }}>
          <GIcon className="w-5 h-5" style={{ color: guia.col }} strokeWidth={1.75} />
        </div>
        <span className="text-[9px] font-[800] px-2.5 py-1 rounded-full"
          style={{ ...MONO, background: guia.bg, color: guia.col, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {guia.format}
        </span>
      </div>
      <h4 className="font-[800] mb-2.5 leading-snug" style={{ fontSize: 15, color: B.text }}>{guia.title}</h4>
      <p className="text-[13px] leading-relaxed flex-1 mb-5" style={{ color: B.textSub }}>{guia.desc}</p>
      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-[700] transition-all hover:scale-[1.02] self-start"
        style={{ background: guia.bg, color: guia.col, border: `1.5px solid ${guia.col}25` }}
        onClick={go}>
        Ver guía <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
      </button>
    </motion.div>
  );
}

// ── Guides section ─────────────────────────────────────────────────────────────
function SectionGuias() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="insights-guias" ref={ref} style={{ background: B.softBg, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-2"
            style={{ ...MONO, color: B.textMuted }}>Recursos</p>
          <h2 className="font-[800] mb-3" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: B.text }}>
            Guías para avanzar con IA empresarial
          </h2>
          <p style={{ fontSize: 15, color: B.textSub }}>
            Recursos prácticos para que tu organización adopte IA con orden.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIAS.map((guia, i) => <GuiaCard key={guia.title} guia={guia} i={i} inV={inV} />)}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────
function CTAFinalInsights() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F5F0FD 0%, #FDF0FA 50%, #F1EAFB 100%)", borderTop: `1px solid ${B.border}` }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${B.purpleSoft}80 0%, transparent 60%)` }} />
      <div className="relative z-10 max-w-[720px] mx-auto px-10 py-20 text-center">
        <motion.h2 className="font-[800] mb-5 leading-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 38px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
          De la guía a tu{" "}
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            propia operación de IA
          </span>
        </motion.h2>
        <motion.p style={{ fontSize: 16, color: B.textSub, lineHeight: 1.7, marginBottom: 36 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.12, ease }}>
          Habla con el equipo KRNL para llevar estas prácticas y casos de uso a tu empresa.
        </motion.p>
        <motion.div className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.22, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: GRAD, boxShadow: `0 8px 28px ${B.purple}40` }}>
            Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.75)", border: `1.5px solid ${B.border}`, color: B.textSub, backdropFilter: "blur(8px)" }}>
            Hablar con un especialista
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page export ────────────────────────────────────────────────────────────────
export default function PaginaInsightsIA() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(() => readInsightSlug());

  useEffect(() => {
    const h = () => setActiveSlug(readInsightSlug());
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  const clearAll = () => { setFilter("Todos"); setSearch(""); };
  const scrollToGuias = () => { setTimeout(() => document.getElementById("insights-guias")?.scrollIntoView({ behavior: "smooth" }), 80); };
  const applyFilter = (f: string) => {
    setFilter(f);
    setTimeout(() => document.getElementById("insights-grid")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const detail = activeSlug ? INSIGHT_DETAILS[activeSlug] : null;
  if (detail) {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <InsightDetailView data={detail} />
        <KrnlFooter />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroInsights onExplorar={scrollToGuias} onCasos={() => applyFilter("Casos de uso")} />
      <SectionBuscador filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
      <SectionDestacados />
      <SectionGridInsights filter={filter} search={search} onClear={clearAll} />
      <SectionPorTemas applyFilter={applyFilter} />
      <CTAIntermedio />
      <SectionGuias />
      <CTAFinalInsights />
      <KrnlFooter />
    </div>
  );
}
