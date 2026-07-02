import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight, AlertTriangle, EyeOff, ShieldOff, Database, Users, Bot,
  FileText, Activity, Lock, TrendingUp, GitBranch, Layers, CheckCircle2,
  X, Shield, Scale, DollarSign, Server, MessageSquare, Workflow, Eye,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";

// ── Brand tokens ───────────────────────────────────────────────────────────────
const B = {
  purple:      "#6D2BFF",
  magenta:     "#D4009A",
  text:        "#0D1524",
  textSub:     "#5B657A",
  textMuted:   "#9AA5B8",
  surface:     "#FFFFFF",
  softBg:      "#F7F8FA",
  border:      "#E7E1EC",
  borderSoft:  "#EFEAF2",
  purpleSoft:  "#F1EAFB",
  magentaSoft: "#FDE8F6",
  riskSoft:    "#FFF0F4",
  riskBorder:  "#F8C3D0",
  amber:       "#F59E0B",
  amberSoft:   "#FFFBEB",
};
const GRAD    = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO    = { fontFamily: "'JetBrains Mono', monospace" };
const ease    = [0.22, 1, 0.36, 1] as const;
const easeL   = [0.4, 0, 0.2, 1] as const;

// ── Shared primitives ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-[700] tracking-[0.2em] uppercase mb-3"
      style={{ ...MONO, color: B.magenta }}>{children}</p>
  );
}

function RiskChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] font-[700] px-2.5 py-1 rounded-full uppercase tracking-[0.08em]"
      style={{ background: B.riskSoft, color: B.magenta, border: `1px solid ${B.riskBorder}` }}>
      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: B.magenta }} />
      {label}
    </span>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
const DEPTS = [
  { name: "Legal",       Icon: Scale,    col: B.purple,  tool: "Claude 3.5",     warn: "Sin auditoría"    },
  { name: "Finanzas",    Icon: TrendingUp, col: B.magenta, tool: "GPT-4o",       warn: "Sin trazabilidad" },
  { name: "TI",          Icon: Server,   col: "#0EA5E9", tool: "Scripts / APIs",  warn: "Sin control"      },
  { name: "RRHH",        Icon: Users,    col: "#22c55e", tool: "Chatbots",        warn: "Sin política"     },
  { name: "Operaciones", Icon: Workflow, col: B.amber,   tool: "Agentes + Sheets",warn: "Sin visibilidad"  },
];

const FLOAT_DELAYS = [0, 1.1, 0.6, 1.8, 0.4];

function ChaosMapVisual({ inV }: { inV: boolean }) {
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 24px 80px rgba(109,43,255,0.10)" }}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FC5153" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCBB40" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#33C748" }} />
        <span className="ml-3 text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>Radar de IA corporativa</span>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.span className="w-1.5 h-1.5 rounded-full"
            style={{ background: B.magenta }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
          <span className="text-[10px] font-[600]" style={{ color: B.magenta }}>Sin monitoreo</span>
        </div>
      </div>

      {/* Warning banner */}
      <motion.div className="flex items-center gap-2.5 px-4 py-2"
        style={{ background: `${B.magenta}0C`, borderBottom: `1px dashed ${B.riskBorder}` }}
        initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.5 }}>
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: B.magenta }} strokeWidth={1.75} />
        <p className="text-[10px] font-[600]" style={{ color: B.magenta }}>
          {DEPTS.length} áreas operando IA sin gobierno unificado
        </p>
      </motion.div>

      {/* 2×2 grid top */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {DEPTS.slice(0, 4).map((d, i) => {
          const DeptIcon = d.Icon;
          return (
            <motion.div key={d.name}
              className="rounded-xl p-3"
              style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: [0, -3, 0] } : {}}
              transition={inV ? {
                opacity: { delay: 0.3 + i * 0.08, duration: 0.4 },
                y: { delay: FLOAT_DELAYS[i], duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
              } : {}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${d.col}18` }}>
                  <DeptIcon className="w-3 h-3" style={{ color: d.col }} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-[700]" style={{ color: B.text }}>{d.name}</p>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-[500] mr-1"
                style={{ background: `${d.col}15`, color: d.col }}>{d.tool}</span>
              <div className="mt-2 flex items-center gap-1">
                <X className="w-2.5 h-2.5 shrink-0" style={{ color: B.magenta }} strokeWidth={2} />
                <span className="text-[9px]" style={{ color: B.magenta }}>{d.warn}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom row: Operaciones + Warning */}
        {(() => {
          const d = DEPTS[4];
          const OpIcon = d.Icon;
          return (
            <motion.div key={d.name}
              className="rounded-xl p-3"
              style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: [0, -3, 0] } : {}}
              transition={inV ? {
                opacity: { delay: 0.62, duration: 0.4 },
                y: { delay: FLOAT_DELAYS[4], duration: 4.3, repeat: Infinity, ease: "easeInOut" },
              } : {}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${d.col}18` }}>
                  <OpIcon className="w-3 h-3" style={{ color: d.col }} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-[700]" style={{ color: B.text }}>{d.name}</p>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-[500]"
                style={{ background: `${d.col}15`, color: d.col }}>{d.tool}</span>
              <div className="mt-2 flex items-center gap-1">
                <X className="w-2.5 h-2.5 shrink-0" style={{ color: B.magenta }} strokeWidth={2} />
                <span className="text-[9px]" style={{ color: B.magenta }}>{d.warn}</span>
              </div>
            </motion.div>
          );
        })()}

        {/* Central void */}
        <motion.div className="rounded-xl p-3 flex flex-col items-center justify-center text-center"
          style={{ background: B.riskSoft, border: `1px dashed ${B.riskBorder}` }}
          initial={{ opacity: 0, scale: 0.94 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.72, duration: 0.5, ease }}>
          <EyeOff className="w-5 h-5 mb-1.5" style={{ color: B.magenta }} strokeWidth={1.5} />
          <p className="text-[10px] font-[700] mb-0.5" style={{ color: B.magenta }}>Sin visibilidad central</p>
          <p className="text-[9px] leading-relaxed" style={{ color: B.textMuted }}>No existe capa de gobierno unificado</p>
        </motion.div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderTop: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        {[["Política central", "Ausente", B.magenta], ["Auditoría", "Desactivada", B.magenta], ["Trazabilidad", "Sin configurar", B.textMuted]].map(([l, v, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="text-[9px]" style={{ color: B.textMuted }}>{l}:</span>
            <span className="text-[9px] font-[700]" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroElProblema() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFCFE 0%, #FBF3FD 45%, #FEF6FB 100%)" }}>
      <div className="absolute -top-24 left-1/4 w-[500px] h-[320px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}70 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}50 0%, transparent 72%)`, filter: "blur(36px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-10 grid grid-cols-2 gap-14 items-center">
        {/* Left: text */}
        <div>
          <motion.div className="mb-5"
            initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
              style={{ ...MONO, background: B.riskSoft, color: B.magenta, border: `1px solid ${B.riskBorder}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.magenta }} />
              Riesgos de la IA dispersa
            </span>
          </motion.div>

          <motion.h1 className="font-[800] leading-[1.06] mb-5"
            style={{ fontSize: "clamp(26px, 3.4vw, 46px)", color: B.text }}
            initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
            La IA ya opera en tu empresa.{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              El problema es que nadie la está gobernando.
            </span>
          </motion.h1>

          <motion.p className="mb-9 leading-relaxed"
            style={{ fontSize: 16, color: B.textSub, maxWidth: 460 }}
            initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
            Equipos usando distintos LLMs, agentes y automatizaciones sin políticas comunes, sin trazabilidad central y sin control real sobre datos, costos y resultados.
          </motion.p>

          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
            <button onClick={() => krnlNavigate("contacto")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.03]"
              style={{ background: GRAD, boxShadow: `0 6px 26px ${B.purple}38` }}>
              Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[500] text-[14px] transition-all hover:scale-[1.02]"
              style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              Ver cómo se ordena
            </button>
          </motion.div>
        </div>

        {/* Right: chaos visual */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease }}>
          <ChaosMapVisual inV={inV} />
        </motion.div>
      </div>
    </section>
  );
}

// ── SECTION 2 — TRES RIESGOS ───────────────────────────────────────────────────
const RIESGOS = [
  {
    Icon: GitBranch, col: B.purple, bg: B.purpleSoft, border: `${B.purple}22`,
    chip: "Shadow AI",
    title: "Sin gobernanza sobre herramientas",
    desc: "Múltiples LLMs, chatbots y agentes proliferan por áreas sin políticas ni visibilidad central. Cada equipo opera con su propia herramienta, sin estándares.",
  },
  {
    Icon: Database, col: B.magenta, bg: B.magentaSoft, border: `${B.magenta}22`,
    chip: "Contexto perdido",
    title: "Contexto institucional que se pierde",
    desc: "Cuando una persona sale de la empresa, su contexto, flujos y procesos con IA desaparecen con ella. El conocimiento no queda en la organización.",
  },
  {
    Icon: EyeOff, col: B.amber, bg: B.amberSoft, border: "#F59E0B22",
    chip: "Caja negra",
    title: "AIOps sin dueño ni trazabilidad",
    desc: "Sin visibilidad sobre qué modelos usa cada área, a qué costo, con qué datos y qué resultados. La IA corporativa opera como una caja negra.",
  },
];

function SectionTresRiesgos() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Tres señales clave</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Tres señales de que tu IA está creciendo sin control
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {RIESGOS.map(({ Icon, col, bg, border, chip, title, desc }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.14, ease }}
              whileHover={{ y: -5, boxShadow: `0 16px 44px rgba(109,43,255,0.09)`, transition: { duration: 0.2 } }}>
              {/* Top color accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${col}60, transparent)` }} />
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: bg, border: `1px solid ${border}` }}>
                  <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <RiskChip label={chip} />
              </div>
              <h3 className="text-[16px] font-[800] mb-3 leading-snug" style={{ color: B.text }}>{title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3 — MAPA SHADOW AI ────────────────────────────────────────────────
const SHADOW_NODES = [
  { name: "Legal",        Icon: Scale,    col: B.purple,  tool: "Claude",      pos: "col-start-1 row-start-1" },
  { name: "Finanzas",     Icon: TrendingUp, col: B.magenta, tool: "GPT-4o",   pos: "col-start-3 row-start-1" },
  { name: "RRHH",         Icon: Users,    col: "#22c55e", tool: "Chatbots",    pos: "col-start-1 row-start-2" },
  { name: "TI",           Icon: Server,   col: "#0EA5E9", tool: "Scripts",     pos: "col-start-3 row-start-2" },
  { name: "Operaciones",  Icon: Workflow, col: B.amber,   tool: "Agentes",     pos: "col-start-2 row-start-3" },
];

function SectionShadowAIMap() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}20 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Shadow AI</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Cuando cada área resuelve sola, la empresa pierde visibilidad
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            La productividad individual mejora, pero la operación corporativa queda fragmentada.
          </p>
        </motion.div>

        {/* Diagram: 3-col × 3-row grid */}
        <div className="relative grid gap-4" style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto auto", maxWidth: 720, margin: "0 auto" }}>
          {SHADOW_NODES.map(({ name, Icon, col, tool, pos }, i) => (
            <motion.div key={name}
              className={`${pos} rounded-2xl p-4 flex flex-col items-center text-center`}
              style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, scale: 0.92 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease }}
              // Micro-pulse
            >
              <motion.div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${col}18`, border: `1px solid ${col}28` }}
                animate={inV ? { boxShadow: [`0 0 0 0 ${col}00`, `0 0 0 6px ${col}16`, `0 0 0 0 ${col}00`] } : {}}
                transition={{ duration: 2.5, delay: 0.8 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
                <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
              </motion.div>
              <p className="text-[13px] font-[700] mb-1" style={{ color: B.text }}>{name}</p>
              <span className="text-[9px] px-2 py-0.5 rounded font-[600] mb-2"
                style={{ background: `${col}15`, color: col }}>{tool}</span>
              <div className="flex items-center gap-1">
                <X className="w-2.5 h-2.5 shrink-0" style={{ color: B.magenta }} strokeWidth={2.2} />
                <span className="text-[9px]" style={{ color: B.magenta }}>Aislado</span>
              </div>
            </motion.div>
          ))}

          {/* Center VOID — row 2, col 2 */}
          <motion.div className="col-start-2 row-start-2 rounded-2xl p-4 flex flex-col items-center justify-center text-center"
            style={{ background: B.riskSoft, border: `1.5px dashed ${B.riskBorder}` }}
            initial={{ opacity: 0, scale: 0.9 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.5, ease }}>
            <EyeOff className="w-6 h-6 mb-2" style={{ color: B.magenta, opacity: 0.7 }} strokeWidth={1.5} />
            <p className="text-[10px] font-[800] mb-2" style={{ color: B.magenta }}>Sin capa común</p>
            {["Sin auditoría", "Sin control de costos", "Sin políticas compartidas"].map(t => (
              <p key={t} className="text-[9px] leading-tight mb-1" style={{ color: B.textMuted }}>{t}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4 — CONSECUENCIAS ─────────────────────────────────────────────────
const CONSECUENCIAS = [
  {
    Icon: Lock, col: "#DC2626", bg: "#FFF0F0", border: "#DC262618",
    title: "Fuga de información",
    desc: "Datos sensibles pueden terminar en herramientas o cuentas sin control corporativo.",
  },
  {
    Icon: DollarSign, col: B.amber, bg: B.amberSoft, border: "#F59E0B22",
    title: "Costos invisibles",
    desc: "El consumo de modelos crece sin trazabilidad por área, caso de uso o resultado.",
  },
  {
    Icon: FileText, col: B.purple, bg: B.purpleSoft, border: `${B.purple}20`,
    title: "Decisiones sin auditoría",
    desc: "No queda registro claro de entradas, salidas, modelo usado ni contexto de decisión.",
  },
  {
    Icon: Users, col: B.magenta, bg: B.magentaSoft, border: `${B.magenta}22`,
    title: "Dependencia de personas",
    desc: "Prompts, flujos y conocimiento quedan en cuentas individuales, no en la organización.",
  },
];

function SectionConsecuencias() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Consecuencias para el negocio</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            El riesgo no es usar IA.<br />El riesgo es operarla sin control.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {CONSECUENCIAS.map(({ Icon, col, bg, border, title, desc }, i) => (
            <motion.div key={title} className="relative overflow-hidden flex gap-5 rounded-2xl p-5"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease }}
              whileHover={{ y: -3, boxShadow: "0 12px 36px rgba(109,43,255,0.07)", transition: { duration: 0.18 } }}>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                style={{ background: `linear-gradient(180deg, ${col}50, transparent)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-[15px] font-[700] mb-1.5" style={{ color: B.text }}>{title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5 — ANTES DE KRNL ─────────────────────────────────────────────────
const BEFORE_LEFT = [
  "Herramientas por área",
  "Modelos sin estándar",
  "Datos en cuentas individuales",
  "Sin trazabilidad",
  "Costos difíciles de justificar",
  "Conocimiento no portable",
];
const BEFORE_RIGHT = [
  "Gobierno central",
  "Políticas compartidas",
  "Contexto institucional",
  "Auditoría completa",
  "Control de costos",
  "Portabilidad del conocimiento",
];

function SectionAntesKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El contraste</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Así se ve una operación de IA sin capa común
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Entre lo que hay hoy y lo que el negocio necesita existe una brecha operativa clara.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {/* Left: IA dispersa */}
          <motion.div className="rounded-2xl p-7"
            style={{ background: "#FFF8FA", border: `1px solid ${B.riskBorder}` }}
            initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.12, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: B.riskSoft, border: `1px solid ${B.riskBorder}` }}>
                <ShieldOff className="w-4 h-4" style={{ color: B.magenta }} strokeWidth={1.75} />
              </div>
              <p className="text-[15px] font-[800]" style={{ color: B.text }}>IA dispersa</p>
            </div>
            <div className="flex flex-col gap-3.5">
              {BEFORE_LEFT.map((item, i) => (
                <motion.div key={item} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.38, ease }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: B.riskSoft, border: `1px solid ${B.riskBorder}` }}>
                    <X className="w-2.5 h-2.5" style={{ color: B.magenta }} strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px]" style={{ color: B.textSub }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Lo que el negocio necesita */}
          <motion.div className="rounded-2xl p-7"
            style={{ background: `linear-gradient(145deg, ${B.purpleSoft}, rgba(255,255,255,0.95))`, border: `1px solid ${B.purple}20` }}
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: B.purpleSoft, border: `1px solid ${B.purple}25` }}>
                <Shield className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[15px] font-[800]" style={{ color: B.text }}>Lo que el negocio necesita</p>
            </div>
            <div className="flex flex-col gap-3.5">
              {BEFORE_RIGHT.map((item, i) => (
                <motion.div key={item} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.07, duration: 0.38, ease }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: B.purpleSoft, border: `1px solid ${B.purple}30` }}>
                    <CheckCircle2 className="w-2.5 h-2.5" style={{ color: B.purple }} strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px]" style={{ color: B.textSub }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6 — PUNTO DE QUIEBRE ──────────────────────────────────────────────
const MATURITY_STEPS = [
  { num: "01", label: "Experimentos",           sub: "Individuales",      col: B.textMuted, active: false },
  { num: "02", label: "Herramientas",           sub: "Por equipo",        col: B.textMuted, active: false },
  { num: "03", label: "Agentes",               sub: "Por área",          col: B.amber,     active: false },
  { num: "04", label: "Automatizaciones",       sub: "Sin control",       col: B.magenta,   active: false },
  { num: "05", label: "Operación crítica",      sub: "Riesgo real",       col: B.magenta,   active: false },
  { num: "06", label: "Gobierno KRNL",          sub: "Capa corporativa",  col: B.purple,    active: true  },
];

function SectionPuntoQuiebre() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El punto de quiebre</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Cuando la IA empieza a escalar, el caos también escala.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
            Un chatbot aislado puede parecer manejable. Diez agentes, múltiples modelos, automatizaciones y datos sensibles requieren una capa de operación, gobierno y trazabilidad.
          </p>
        </motion.div>

        {/* Maturity line */}
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-5 left-0 right-0 h-px" style={{ background: B.border }} />
          {/* Animated progress fill */}
          <motion.div className="absolute top-5 left-0 h-px"
            style={{ background: `linear-gradient(90deg, ${B.amber}, ${B.magenta}, ${B.purple})`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease: easeL }}
          />

          {/* Nodes */}
          <div className="relative grid grid-cols-6 gap-2">
            {MATURITY_STEPS.map(({ num, label, sub, col, active }, i) => (
              <motion.div key={num} className="flex flex-col items-center"
                initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.45, ease }}>
                {/* Dot */}
                <motion.div className="w-10 h-10 rounded-full flex items-center justify-center z-10 relative mb-4"
                  style={{
                    background: active ? GRAD : i > 2 ? B.riskSoft : B.softBg,
                    border: `2px solid ${active ? B.purple : i > 2 ? B.riskBorder : B.border}`,
                    boxShadow: active ? `0 4px 20px ${B.purple}40` : "none",
                  }}
                  animate={active && inV ? { boxShadow: [`0 4px 20px ${B.purple}40`, `0 4px 32px ${B.purple}60`, `0 4px 20px ${B.purple}40`] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
                  <span className="text-[10px] font-[700]" style={{ ...MONO, color: active ? "#fff" : col }}>{num}</span>
                </motion.div>
                {/* Labels */}
                <p className="text-[11px] font-[700] text-center leading-tight mb-1"
                  style={{ color: active ? B.purple : B.text }}>{label}</p>
                <p className="text-[10px] text-center" style={{ color: B.textMuted }}>{sub}</p>
                {/* KRNL tag */}
                {active && (
                  <motion.span className="mt-2 text-[9px] px-2 py-0.5 rounded-full font-[700]"
                    style={{ background: B.purple, color: "#fff" }}
                    initial={{ opacity: 0, scale: 0.8 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.8, duration: 0.4, ease }}>
                    KRNL
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 7 — PUENTE HACIA KRNL ────────────────────────────────────────────
const BRIDGE_CARDS = [
  { Icon: Layers,   col: B.purple,  title: "Centralización",     desc: "Una capa para todos los modelos, agentes y automatizaciones." },
  { Icon: Shield,   col: B.purple,  title: "Gobierno",           desc: "Políticas y validaciones aplicadas a cada interacción de IA." },
  { Icon: Activity, col: B.magenta, title: "Trazabilidad",       desc: "Auditoría completa e inmutable de toda la operación." },
  { Icon: Database, col: B.purple,  title: "Soberanía de datos", desc: "Contexto y conocimiento dentro del perímetro corporativo." },
];

function SectionPuente() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>La solución</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            KRNL convierte IA dispersa en operación gobernada.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Centraliza modelos, agentes, automatizaciones y dashboards en una capa corporativa con soberanía, control y trazabilidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {BRIDGE_CARDS.map(({ Icon, col, title, desc }, i) => (
            <motion.div key={title} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.90)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(109,43,255,0.05)" }}
              initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
              whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(109,43,255,0.10)", transition: { duration: 0.18 } }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${col}18`, border: `1px solid ${col}25` }}>
                <Icon className="w-4.5 h-4.5" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <p className="text-[14px] font-[800] mb-2" style={{ color: B.text }}>{title}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.55, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03]"
            style={{ background: GRAD, boxShadow: `0 6px 28px ${B.purple}38` }}>
            Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-[500] text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            Ver producto
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── CTA FINAL ─────────────────────────────────────────────────────────────────
function CTAFinalProblema() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #FBF8FF 0%, #FFF5FC 50%, #F8F4FF 100%)", borderTop: `1px solid ${B.border}` }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[720px] mx-auto px-10 py-28 text-center">
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
            style={{ ...MONO, background: B.riskSoft, color: B.magenta, border: `1px solid ${B.riskBorder}` }}>
            <AlertTriangle className="w-3 h-3" style={{ color: B.magenta }} strokeWidth={2} />
            Shadow AI — Riesgo real
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-5"
          style={{ fontSize: "clamp(26px, 3.8vw, 46px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          No esperes a que el Shadow AI se vuelva infraestructura crítica.
        </motion.h2>
        <motion.p className="leading-relaxed mb-10 mx-auto"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 520 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
          Ordena el uso de IA antes de que los costos, datos y decisiones queden fuera del radar corporativo.
        </motion.p>
        <motion.div className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[500] text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            Ver arquitectura
          </button>
        </motion.div>
      </div>
    </section>
  );
}


// ── Page export ────────────────────────────────────────────────────────────────
export default function PaginaElProblema() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroElProblema />
      <SectionTresRiesgos />
      <SectionShadowAIMap />
      <SectionConsecuencias />
      <SectionAntesKrnl />
      <SectionPuntoQuiebre />
      <SectionPuente />
      <CTAFinalProblema />
      <KrnlFooter />
    </div>
  );
}
