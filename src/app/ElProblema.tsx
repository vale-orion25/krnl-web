import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, AlertTriangle, EyeOff, ShieldOff, Database, Users, Bot,
  FileText, Activity, Lock, TrendingUp, GitBranch, Layers, CheckCircle2,
  X, Shield, Scale, DollarSign, Server, MessageSquare, Workflow, Eye,
  ChevronDown, ShieldCheck, Info,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
import krnlIso from "@/imports/krnl-iso.png";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";
import { SectionBackground } from "./components/SectionBackground";

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

// ── HERO ───────────────────────────────────────────────────────────────────────
const DEPTS = [
  { name: "Legal",       Icon: Scale,    col: B.purple,  tool: "Modelo externo",    warn: "Sin auditoría"    },
  { name: "Finanzas",    Icon: TrendingUp, col: B.magenta, tool: "Modelo autorizado", warn: "Sin trazabilidad" },
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
      <div className="flex flex-wrap items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
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
      <div className="flex flex-wrap items-center gap-3 px-4 py-2.5" style={{ borderTop: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        {[["Política central", "Ausente", B.magenta], ["Auditoría", "Desactivada", B.magenta], ["Trazabilidad", "Sin configurar", B.textMuted]].map(([l, v, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="text-[9px]" style={{ color: B.textMuted }}>{l}:</span>
            <span className="text-[9px] font-[700]" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>
      <p className="px-4 py-2 text-[9px] leading-relaxed" style={{ color: B.textMuted, borderTop: `1px solid ${B.borderSoft}` }}>
        Representación conceptual · datos ilustrativos
      </p>
    </div>
  );
}

function HeroElProblema() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFCFE 0%, #FBF3FD 45%, #FEF6FB 100%)" }}>
      <div className="absolute -top-24 left-1/4 w-64 h-40 sm:w-[500px] sm:h-[320px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}70 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-20 right-0 w-36 h-36 sm:w-64 sm:h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}50 0%, transparent 72%)`, filter: "blur(36px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
            Equipos usando distintos modelos de lenguaje (LLMs), agentes y automatizaciones sin políticas comunes, sin trazabilidad central y sin control real sobre datos, costos y resultados.
          </motion.p>

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
    Icon: GitBranch, col: B.purple, bg: B.purpleSoft,
    chip: "Shadow AI",
    title: "Sin gobernanza sobre herramientas",
    desc: "Múltiples LLMs, chatbots y agentes proliferan por áreas sin políticas ni visibilidad central. Cada equipo opera con su propia herramienta, sin estándares.",
    signals: ["Sin visibilidad de qué IA usa cada área", "Sin estándares ni políticas comunes", "El riesgo crece con cada herramienta nueva"],
  },
  {
    Icon: Database, col: B.magenta, bg: B.magentaSoft,
    chip: "Contexto perdido",
    title: "Contexto institucional que se pierde",
    desc: "Cuando una persona sale de la empresa, su contexto, flujos y procesos con IA desaparecen con ella. El conocimiento no queda en la organización.",
    signals: ["Flujos que dependen de una sola persona", "Conocimiento que no queda documentado", "Cada salida reinicia el aprendizaje"],
  },
  {
    Icon: EyeOff, col: B.amber, bg: B.amberSoft,
    chip: "Caja negra",
    title: "AIOps sin dueño ni trazabilidad",
    desc: "Sin visibilidad sobre qué modelos usa cada área, a qué costo, con qué datos y qué resultados. La IA corporativa opera como una caja negra.",
    signals: ["Sin registro de costos por modelo o área", "Sin trazabilidad de qué datos se usan", "Nadie responde por los resultados"],
  },
];

function SectionTresRiesgos() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="riesgos" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Tres señales clave</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Tres señales de que tu IA está creciendo sin control
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {RIESGOS.map(({ Icon, col, bg, chip, title, desc, signals }, i) => (
            <motion.div key={title} className="relative"
              style={{
                background: `linear-gradient(180deg, ${bg} 0%, ${B.surface} 55%)`,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: `${col}30`,
                borderRadius: 6,
                padding: "36px 30px",
                boxShadow: "0 2px 10px rgba(15,10,30,0.03)",
              }}
              initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.14, ease }}
              whileHover={{ borderColor: `${col}55`, transition: { duration: 0.18 } }}>
              {/* Ghost index numeral */}
              <span className="absolute select-none pointer-events-none"
                style={{ ...MONO, top: 10, right: 20, fontSize: 52, fontWeight: 800, color: col, opacity: 0.09, lineHeight: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Category tag */}
              <div className="relative flex items-center gap-2 mb-7">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col }} />
                <span className="text-[10.5px] font-[700] uppercase tracking-[0.16em]" style={{ ...MONO, color: col }}>{chip}</span>
              </div>

              {/* Icon — bare, no box */}
              <Icon className="w-9 h-9 mb-6 relative" style={{ color: col }} strokeWidth={1.4} />

              {/* Title */}
              <h3 className="text-[19px] font-[800] mb-4 leading-snug relative" style={{ color: B.text }}>{title}</h3>

              {/* Divider */}
              <div className="relative mb-4" style={{ width: 32, height: 2, background: col, opacity: 0.55, borderRadius: 2 }} />

              {/* Description */}
              <p className="text-[13.5px] leading-relaxed mb-6 relative" style={{ color: B.textSub }}>{desc}</p>

              {/* Impact signals */}
              <div className="flex flex-col gap-2.5 relative">
                {signals.map(s => (
                  <div key={s} className="flex items-start gap-2.5">
                    <span className="rounded-full shrink-0" style={{ width: 4, height: 4, marginTop: 7, background: col }} />
                    <span className="text-[12.5px] leading-snug font-[500]" style={{ color: B.text }}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3 — MAPA SHADOW AI ────────────────────────────────────────────────
const SHADOW_NODES = [
  { name: "Legal",       Icon: Scale,      col: B.purple,   tool: "Modelo externo",    x: 16, y: 13 },
  { name: "Finanzas",    Icon: TrendingUp, col: B.magenta,  tool: "Modelo autorizado", x: 84, y: 16 },
  { name: "RRHH",        Icon: Users,      col: "#22c55e",  tool: "Chatbots", x: 10, y: 68 },
  { name: "TI",          Icon: Server,     col: "#0EA5E9",  tool: "Scripts",  x: 90, y: 65 },
  { name: "Operaciones", Icon: Workflow,   col: B.amber,    tool: "Agentes",  x: 50, y: 91 },
];
const HUB = { x: 50, y: 42 };

function SiloCard({ node, i, inV, mobile }: { node: typeof SHADOW_NODES[0]; i: number; inV: boolean; mobile?: boolean }) {
  const { name, Icon, col, tool } = node;
  return (
    <motion.div
      className="rounded-xl px-3.5 py-3.5 flex flex-col items-center text-center"
      style={mobile
        ? { width: "100%", maxWidth: 260, background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(15,10,30,0.05)" }
        : { width: 128, background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(15,10,30,0.05)" }}
      initial={{ opacity: 0, scale: 0.9 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.15 + i * 0.09, duration: 0.4, ease }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ background: `${col}16` }}>
        <Icon className="w-4 h-4" style={{ color: col }} strokeWidth={1.9} />
      </div>
      <p className="text-[12.5px] font-[700] mb-1.5 leading-tight" style={{ color: B.text }}>{name}</p>
      <div className="flex items-center gap-1 flex-wrap justify-center">
        <span className="text-[9px] px-1.5 py-[3px] rounded font-[600]" style={{ background: `${col}16`, color: col }}>{tool}</span>
        <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-[3px] rounded font-[700]"
          style={{ background: B.riskSoft, color: B.magenta }}>
          <X className="w-2 h-2 shrink-0" strokeWidth={3} />Aislado
        </span>
      </div>
    </motion.div>
  );
}

// Nodo flotando en su posición orbital (desktop) — con leve deriva vertical propia
function OrbitNode({ node, i, inV }: { node: typeof SHADOW_NODES[0]; i: number; inV: boolean }) {
  return (
    <motion.div className="absolute z-10"
      style={{ left: `${node.x}%`, top: `${node.y}%`, marginLeft: -64, marginTop: -54 }}
      animate={inV ? { y: [0, i % 2 === 0 ? -6 : 6, 0] } : {}}
      transition={{ duration: 4.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
      <SiloCard node={node} i={i} inV={inV} />
    </motion.div>
  );
}

function SectionShadowAIMap() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const consequences = ["Sin auditoría", "Sin control de costos", "Sin políticas compartidas", "Sin trazabilidad"];

  const Hub = (
    <motion.div className="relative z-20 rounded-2xl px-7 py-6"
      style={{ width: 380, maxWidth: "100%", background: "rgba(255,250,251,0.95)", backdropFilter: "blur(6px)", border: `1.5px dashed ${B.riskBorder}`, boxShadow: "0 12px 44px rgba(212,0,154,0.10)" }}
      initial={{ opacity: 0, scale: 0.94 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.5, duration: 0.55, ease }}>
      {/* Halo suave detrás del hub */}
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
        style={{ background: `radial-gradient(60% 80% at 50% 50%, ${B.magenta}1C 0%, transparent 75%)`, filter: "blur(18px)" }}
        animate={inV ? { opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
      <div className="flex items-center gap-3 mb-4">
        <motion.div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.75)" }}
          animate={inV ? { boxShadow: [`0 0 0 0 ${B.magenta}00`, `0 0 0 9px ${B.magenta}14`, `0 0 0 0 ${B.magenta}00`] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
          <EyeOff className="w-5 h-5" style={{ color: B.magenta }} strokeWidth={1.6} />
        </motion.div>
        <p className="text-[18px] font-[800] leading-tight" style={{ color: B.magenta }}>Sin capa común</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {consequences.map(t => (
          <span key={t} className="text-[10.5px] font-[600] px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.75)", color: B.textSub, border: `1px solid ${B.riskBorder}` }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}20 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Shadow AI</SectionLabel>
          <h2 className="font-[800] mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: B.text }}>
            Cuando cada área usa IA por su cuenta, la empresa pierde visibilidad.
          </h2>
          <p style={{ color: B.textSub, fontSize: 15.5, maxWidth: 540, margin: "0 auto" }}>
            Legal, Finanzas, RRHH, TI y Operaciones avanzan rápido, pero sin una capa común la organización no sabe qué se usa, con qué datos ni bajo qué reglas.
          </p>
        </motion.div>

        {/* ── Composición radial — desktop/tablet ── */}
        <div className="hidden md:block relative" style={{ maxWidth: 880, height: 560, margin: "0 auto" }}>
          <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
            {SHADOW_NODES.map((n, i) => (
              <motion.line key={n.name} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y}
                stroke={n.col} strokeWidth={0.35} strokeDasharray="1.6 2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                animate={inV ? { opacity: 0.32, strokeDashoffset: [0, -8.4] } : { opacity: 0 }}
                transition={{ opacity: { duration: 0.6, delay: 0.3 + i * 0.08 }, strokeDashoffset: { duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.6 + i * 0.15 } }} />
            ))}
            {/* partículas viajando hacia el hub — nunca llegan a integrarse, se desvanecen */}
            {SHADOW_NODES.map((n, i) => (
              <motion.circle key={`p-${n.name}`} r={0.7} fill={n.col}
                initial={{ opacity: 0 }}
                animate={inV ? { cx: [n.x, HUB.x], cy: [n.y, HUB.y], opacity: [0, 0.55, 0] } : {}}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.55, repeatDelay: 1.4 }} />
            ))}
          </svg>

          {SHADOW_NODES.map((n, i) => <OrbitNode key={n.name} node={n} i={i} inV={inV} />)}

          <div className="absolute z-20" style={{ left: `${HUB.x}%`, top: `${HUB.y}%`, marginLeft: -190, marginTop: -66 }}>
            {Hub}
          </div>
        </div>

        {/* ── Fallback apilado — mobile ── */}
        <div className="md:hidden flex flex-col items-center gap-6">
          {Hub}
          <div className="flex flex-col items-center gap-3 w-full">
            {SHADOW_NODES.map((n, i) => <SiloCard key={n.name} node={n} i={i} inV={inV} mobile />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3.5 — MARCO REGULATORIO (Ley 21.719) ──────────────────────────────
function SectionMarcoRegulatorio() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="riesgos" />

      {/* Zona de color animada — concentrada abajo, movimiento notorio */}
      <motion.div className="absolute pointer-events-none" style={{
          bottom: "-22%", left: "-10%", width: 480, height: 480, borderRadius: "50%",
          background: `radial-gradient(circle, ${B.magenta}3D 0%, ${B.purple}28 45%, transparent 72%)`,
          filter: "blur(55px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -35, 0], scale: [1, 1.25, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute pointer-events-none" style={{
          bottom: "-24%", right: "-8%", width: 420, height: 420, borderRadius: "50%",
          background: `radial-gradient(circle, ${LAVENDER}3D 0%, ${B.purple}26 45%, transparent 72%)`,
          filter: "blur(55px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1], opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <div className="relative max-w-[900px] mx-auto px-5 md:px-10 pt-14 md:pt-16 pb-8 md:pb-10">
        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="marcoRegulatorioIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div className="relative overflow-hidden rounded-2xl p-6 md:p-9 flex flex-col md:flex-row items-start gap-6 md:gap-9"
          style={{
            background: B.surface,
            border: `1px solid ${B.borderSoft}`,
            boxShadow: "0 4px 24px rgba(109,43,255,0.07)",
          }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>

          {/* Línea lateral con degradado KRNL */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${B.magenta}, ${B.purple})` }} />

          {/* Ícono — sin caja, protagonista, degradado KRNL */}
          <ShieldCheck className="relative w-11 h-11 md:w-12 md:h-12 shrink-0" style={{ stroke: "url(#marcoRegulatorioIconGrad)", color: "transparent" }} strokeWidth={1.5} />

          <div className="relative flex-1 min-w-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10.5px] font-[700] tracking-[0.14em] uppercase mb-4"
              style={{ ...MONO, background: "rgba(255,255,255,0.75)", color: B.magenta, border: `1px solid ${B.magenta}25` }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: B.magenta }} />
              Shadow AI + datos personales
            </span>
            <h3 className="text-[21px] md:text-[25px] font-[800] leading-snug mb-4" style={{ color: B.text }}>
              El Shadow AI también es un riesgo de datos personales.
            </h3>
            <p className="text-[14.5px] leading-relaxed mb-5" style={{ color: B.textSub, maxWidth: 640 }}>
              Cuando cada área usa IA por su cuenta, datos personales de clientes, colaboradores o candidatos pueden terminar en herramientas o cuentas fuera del control corporativo. La Ley 21.719 —vigente desde el 1 de diciembre de 2026— eleva las exigencias sobre el tratamiento de datos personales en Chile. KRNL fortalece la trazabilidad y el control sobre qué agentes y modelos acceden a qué datos, apoyando el gobierno de estos flujos.
            </p>
            <div className="flex items-start gap-2 pt-4" style={{ borderTop: `1px solid ${B.purple}18`, maxWidth: 640 }}>
              <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: B.textMuted }} strokeWidth={1.75} />
              <p className="text-[11.5px] leading-relaxed" style={{ color: B.textMuted }}>
                KRNL es una capa de gobierno operativo; el cumplimiento normativo específico depende de la implementación y del asesoramiento legal de cada organización.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fondo decorativo — red de nodos conectados, muy sutil, solo laterales ─────
// 34 nodos: 17 en el margen izquierdo (0-16), 17 en el margen derecho (17-33).
const MIT_NANDA_NET_NODES: [number, number, number][] = [
  [30, 15, 2.0], [85, 55, 1.6], [20, 100, 2.2], [70, 145, 1.8], [110, 185, 1.6],
  [35, 225, 2.0], [90, 265, 1.7], [18, 310, 2.3], [65, 350, 1.6], [115, 390, 1.8],
  [30, 430, 2.0], [85, 470, 1.7], [20, 515, 2.2], [70, 555, 1.6], [110, 595, 1.8],
  [40, 635, 2.0], [90, 665, 1.6],
  [970, 15, 2.0], [915, 55, 1.6], [980, 100, 2.2], [930, 145, 1.8], [890, 185, 1.6],
  [965, 225, 2.0], [910, 265, 1.7], [982, 310, 2.3], [935, 350, 1.6], [885, 390, 1.8],
  [970, 430, 2.0], [915, 470, 1.7], [980, 515, 2.2], [930, 555, 1.6], [890, 595, 1.8],
  [960, 635, 2.0], [910, 665, 1.6],
];
const MIT_NANDA_NET_EDGES: [number, number][] = [
  // cadena secuencial — margen izquierdo
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
  // enlaces cruzados — margen izquierdo (dan textura de malla, no de escalera)
  [0, 3], [2, 5], [4, 7], [6, 9], [8, 11], [10, 13], [12, 15],
  // cadena secuencial — margen derecho
  [17, 18], [18, 19], [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 25],
  [25, 26], [26, 27], [27, 28], [28, 29], [29, 30], [30, 31], [31, 32], [32, 33],
  // enlaces cruzados — margen derecho
  [17, 20], [19, 22], [21, 24], [23, 26], [25, 28], [27, 30], [29, 32],
];
const MIT_NANDA_NET_PULSE = [1, 5, 9, 13, 18, 22, 26, 30];
const LAVENDER = "#A78BFA";

function MitNandaNetworkBg() {
  const reduced = useReducedMotion();
  const nodeColor = (i: number) => (i % 3 === 0 ? B.magenta : i % 3 === 1 ? B.purple : LAVENDER);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 680"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {MIT_NANDA_NET_EDGES.map(([a, b], i) => {
        const [x1, y1] = MIT_NANDA_NET_NODES[a];
        const [x2, y2] = MIT_NANDA_NET_NODES[b];
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#mitNandaNetGrad)" strokeWidth="0.6" opacity={0.14} />
        );
      })}
      <defs>
        <linearGradient id="mitNandaNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={B.magenta} />
          <stop offset="100%" stopColor={B.purple} />
        </linearGradient>
      </defs>
      {MIT_NANDA_NET_NODES.map(([x, y, r], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r} fill={nodeColor(i)}
          initial={{ opacity: 0.16 }}
          animate={
            reduced || !MIT_NANDA_NET_PULSE.includes(i)
              ? { opacity: 0.16 }
              : { opacity: [0.16, 0.34, 0.16] }
          }
          transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }} />
      ))}
    </svg>
  );
}

// ── SECTION 3.6 — EVIDENCIA DE MERCADO (MIT NANDA) ────────────────────────────
const MIT_NANDA_STATS = [
  { value: "95%",  label: "sin retorno medible en P&L" },
  { value: "5%",   label: "llega a producción con impacto" },
  { value: "300+", label: "iniciativas analizadas" },
];

function SectionMitNanda() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <MitNandaNetworkBg />
      <div className="relative max-w-[980px] mx-auto px-5 md:px-10 pt-8 md:pt-10 pb-8 md:pb-10">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Evidencia de mercado</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(22px, 2.8vw, 34px)", color: B.text, lineHeight: 1.22 }}>
            La adopción de IA no es el problema. El problema es llevarla a producción con impacto.
          </h2>
          <p style={{ color: B.textSub, fontSize: 15.5, lineHeight: 1.65, maxWidth: 720, margin: "0 auto" }}>
            Según MIT NANDA, pese a miles de millones invertidos en GenAI, la mayoría de las organizaciones no logra retorno medible y solo una fracción de herramientas enterprise llega a producción con impacto. La brecha no está en probar IA, sino en operarla con contexto, aprendizaje, integración, trazabilidad y control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          {MIT_NANDA_STATS.map(({ value, label }, i) => (
            <motion.div key={value} className="rounded-2xl p-6 text-center"
              style={{ background: B.surface, border: "1px solid #E6E8F0", boxShadow: "0 2px 12px rgba(15,10,40,0.04)" }}
              initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.22, ease }}>
              <p className="font-[800] mb-2" style={{ fontSize: 40, lineHeight: 1, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</p>
              <p className="text-[12.5px] leading-snug" style={{ color: B.textSub }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] mb-8" style={{ color: B.textMuted }}>
          Fuente: MIT NANDA, State of AI in Business 2025.
        </p>

        <motion.div className="rounded-2xl p-5 md:p-6 flex items-start gap-3 mx-auto"
          style={{ maxWidth: 720, background: B.purpleSoft, border: `1px solid ${B.purple}25` }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.55, ease }}>
          <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: B.purple }} strokeWidth={1.75} />
          <p className="text-[13.5px] leading-relaxed" style={{ color: B.text }}>
            KRNL aborda esta brecha desde gobierno, memoria, control de modelos, trazabilidad y operación integrada.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── SECTION 4 — CONSECUENCIAS ─────────────────────────────────────────────────
const CONSECUENCIAS = [
  {
    Icon: Lock,
    title: "Fuga de información",
    desc: "Datos sensibles pueden terminar en herramientas o cuentas sin control corporativo.",
  },
  {
    Icon: DollarSign,
    title: "Costos invisibles",
    desc: "El consumo de modelos crece sin trazabilidad por área, caso de uso o resultado.",
  },
  {
    Icon: FileText,
    title: "Decisiones sin auditoría",
    desc: "No queda registro claro de entradas, salidas, modelo usado ni contexto de decisión.",
  },
  {
    Icon: Users,
    title: "Dependencia de personas",
    desc: "Prompts, flujos y conocimiento quedan en cuentas individuales, no en la organización.",
  },
];

function SectionConsecuencias() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="riesgos" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 pt-8 md:pt-10 pb-14 md:pb-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Consecuencias para el negocio</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            El riesgo no es usar IA.<br />El riesgo es operarla sin control.
          </h2>
        </motion.div>

        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="consecuenciasIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CONSECUENCIAS.map(({ Icon, title, desc }, i) => (
            <motion.div key={title} className="flex gap-4 rounded-2xl p-5"
              style={{ background: B.surface, border: "1px solid #E6E8F0", boxShadow: "0 2px 12px rgba(15,10,40,0.04)" }}
              initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(15,10,40,0.06)", transition: { duration: 0.18 } }}>
              <Icon className="w-7 h-7 shrink-0 mt-0.5" style={{ stroke: "url(#consecuenciasIconGrad)", color: "transparent" }} strokeWidth={1.5} />
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
  "Auditoría centralizada",
  "Control de costos",
  "Portabilidad del conocimiento",
];

function SectionAntesKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "#FCFCFE", borderTop: `1px solid ${B.border}` }}>
      {/* Glow muy leve, centrado — sin fondo decorativo repetido */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: 520, maxWidth: "70%", height: 260, borderRadius: "50%", background: `radial-gradient(ellipse at center, ${B.purple}0D 0%, transparent 72%)`, filter: "blur(40px)" }} />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 pt-12 md:pt-16 pb-16 md:pb-20">
        <motion.div className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El contraste</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Así se ve la operación real, hoy.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Entre lo que hay hoy y lo que el negocio necesita existe una brecha operativa clara.
          </p>
        </motion.div>

        {/* IA dispersa → KRNL ordena → Operación gobernada — 3 cards + conectores, ancho reducido */}
        <div className="max-w-[980px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">

            {/* Card 1: problema — gris/rojo muy suave */}
            <motion.div className="flex-1 rounded-2xl p-5 md:p-6"
              style={{ background: "#FEFCFC", border: "1px solid #EFDADA" }}
              initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}
              whileHover={{ y: -2, transition: { duration: 0.25, ease } }}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: "1px solid #E7D3D3", background: "#FFF9F9" }}>
                  <ShieldOff className="w-4 h-4" style={{ color: "#B9635D" }} strokeWidth={1.8} />
                </div>
                <p className="text-[15px] font-[800]" style={{ color: B.text }}>Hoy: IA dispersa</p>
              </div>
              <div className="flex flex-col gap-2.5">
                {BEFORE_LEFT.map((item, i) => (
                  <motion.div key={item} className="flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: "1px solid #EFDADA", background: "#FFF9F9" }}>
                      <X className="w-2 h-2" style={{ color: "#B9635D" }} strokeWidth={2.4} />
                    </div>
                    <p className="text-[13px]" style={{ color: B.textSub }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Conector */}
            <div className="flex items-center justify-center shrink-0 py-1 lg:py-0">
              <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" style={{ color: B.textMuted }} strokeWidth={2} />
            </div>

            {/* Centro: iso KRNL — la capa que conecta, sin caja ni fondo sólido */}
            <motion.div className="relative lg:w-[190px] shrink-0 flex flex-col items-center text-center py-2"
              initial={{ opacity: 0, scale: 0.94 }} animate={inV ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.15, ease }}>
              {/* Halo — pulsa en sincro con el flotado del ícono */}
              <motion.div className="absolute pointer-events-none" style={{
                top: "50%", left: "50%", transform: "translate(-50%, -58%)",
                width: 273, height: 273, borderRadius: "50%",
                background: `radial-gradient(circle, ${B.purple}20 0%, ${B.magenta}12 45%, transparent 72%)`,
                filter: "blur(18px)",
              }}
                animate={{ scale: [1, 1.16, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
              <motion.img src={krnlIso} alt="KRNL" className="relative" style={{ width: 116, height: 116, objectFit: "contain" }}
                animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
              <p className="relative font-[700] leading-tight mt-3" style={{ fontSize: 13, color: B.text }}>KRNL ordena</p>
            </motion.div>

            {/* Conector */}
            <div className="flex items-center justify-center shrink-0 py-1 lg:py-0">
              <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" style={{ color: B.textMuted }} strokeWidth={2} />
            </div>

            {/* Card 3: solución — azul/violeta suave, sin verde */}
            <motion.div className="flex-1 rounded-2xl p-5 md:p-6"
              style={{ background: "#F5F5FD", border: "1px solid #DCDDF5" }}
              initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25, ease }}
              whileHover={{ y: -2, transition: { duration: 0.25, ease } }}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: `1px solid ${B.purple}30`, background: "#FBFAFF" }}>
                  <Shield className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.8} />
                </div>
                <p className="text-[15px] font-[800]" style={{ color: B.text }}>Operación gobernada</p>
              </div>
              <div className="flex flex-col gap-2.5">
                {BEFORE_RIGHT.map((item, i) => (
                  <motion.div key={item} className="flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.32 + i * 0.06, duration: 0.35, ease }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: `1px solid ${B.purple}30`, background: "#FBFAFF" }}>
                      <CheckCircle2 className="w-2 h-2" style={{ color: B.purple }} strokeWidth={2.4} />
                    </div>
                    <p className="text-[13px] font-[500]" style={{ color: B.text }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6 — PUNTO DE QUIEBRE ──────────────────────────────────────────────
const MATURITY_STEPS = [
  { num: "01", label: "Experimentos",                 sub: "Pruebas individuales",        Icon: MessageSquare, col: B.purple  },
  { num: "02", label: "Herramientas por equipo",       sub: "Uso fragmentado",             Icon: Layers,        col: B.magenta },
  { num: "03", label: "Agentes por área",              sub: "Decisiones distribuidas",     Icon: Bot,           col: B.amber   },
  { num: "04", label: "Automatizaciones sin control",  sub: "Acciones sin supervisión",    Icon: Workflow,      col: "#F2711A" },
  { num: "05", label: "Operación crítica",             sub: "Riesgo real para el negocio", Icon: AlertTriangle, col: "#E14C63" },
];

function SectionPuntoQuiebre() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <section ref={ref} id="problema-punto-quiebre" className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="riesgos" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El punto de quiebre</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Cuando la IA empieza a escalar, el caos también escala.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
            Un chatbot aislado puede parecer manejable. Pero cuando aparecen agentes, automatizaciones y datos sensibles, la operación necesita gobierno, trazabilidad y control.
          </p>
        </motion.div>

        {/* Maturity line — solo el problema, sin la respuesta mezclada */}
        <div className="relative">
        <div className="overflow-x-auto">
        <div className="relative min-w-[560px] md:min-w-0">
          <div className="absolute top-7 left-0 right-0 h-px" style={{ background: B.border }} />
          <motion.div className="absolute top-7 left-0 h-px"
            style={{ background: `linear-gradient(90deg, ${B.borderSoft}, ${B.textMuted})`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.4, ease: easeL }}
          />
          {!reduced && (
            <motion.div className="absolute top-7 w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{ marginTop: -3, background: B.textMuted, boxShadow: `0 0 5px ${B.textMuted}70` }}
              initial={{ left: "0%", opacity: 0 }}
              animate={inV ? { left: ["0%", "100%"], opacity: [0, 0.5, 0.5, 0] } : {}}
              transition={{ duration: 2.8, delay: 1.8, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />
          )}

          <div className="relative grid grid-cols-5 gap-2">
            {MATURITY_STEPS.map(({ num, label, sub, Icon, col }, i) => {
              const baseDelay = 0.3 + i * 0.12;
              return (
                <div key={num} className="flex flex-col items-center">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center z-10 relative mb-4"
                    style={{ background: B.surface, border: `1.5px solid ${col}45`, boxShadow: `0 0 0 4px ${B.surface}` }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inV ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                    transition={{ delay: baseDelay, duration: 0.4, ease }}
                    whileHover={reduced ? {} : { scale: 1.06, transition: { duration: 0.22, ease } }}>
                    <Icon className="w-6 h-6" style={{ color: col }} strokeWidth={1.6} />
                  </motion.div>
                  <motion.div className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay + 0.16, duration: 0.35, ease }}>
                    <span className="text-[9px] font-[700] mb-1" style={{ ...MONO, color: B.textMuted }}>{num}</span>
                    <p className="text-[11px] font-[700] text-center leading-tight mb-1" style={{ color: B.text }}>{label}</p>
                    <p className="text-[10px] text-center" style={{ color: B.textMuted }}>{sub}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
        {/* Pista de scroll horizontal — solo mobile, donde el timeline no entra completo */}
        <div className="md:hidden pointer-events-none absolute top-0 right-0 h-full" style={{ width: 36, background: `linear-gradient(90deg, transparent, ${B.surface})` }} />
        </div>

        {/* Punto de quiebre — bloque destacado, separado del timeline */}
        <motion.div className="mt-12 md:mt-16 mx-auto rounded-2xl p-6 md:p-8 text-center"
          style={{ maxWidth: 620, background: B.riskSoft, border: `1.5px dashed ${B.riskBorder}` }}
          initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1, ease }}>
          <p className="text-[11px] font-[700] uppercase tracking-[0.16em] mb-3" style={{ ...MONO, color: B.magenta }}>Punto de quiebre</p>
          <p className="text-[15px] leading-relaxed" style={{ color: B.text }}>
            La IA deja de ser una prueba cuando empieza a ejecutar procesos, mover datos o tomar decisiones dentro de la operación.
          </p>
        </motion.div>

        {/* Puente hacia la siguiente sección */}
        <motion.div className="flex flex-col items-center gap-2 mt-6"
          initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1.3 }}>
          <ChevronDown className="w-4 h-4" style={{ color: B.purple }} strokeWidth={2} />
          <p className="text-[13px] font-[600]" style={{ color: B.purple }}>Ahí KRNL entra como capa de gobierno.</p>
        </motion.div>
      </div>
    </section>
  );
}

// ── SECTION 7 — PUENTE HACIA KRNL ────────────────────────────────────────────
const BRIDGE_CARDS = [
  { Icon: Layers,   title: "Centralización",     desc: "Una capa para todos los modelos, agentes y automatizaciones." },
  { Icon: Shield,   title: "Gobierno",           desc: "Políticas y validaciones aplicadas a cada interacción de IA." },
  { Icon: Activity, title: "Trazabilidad",       desc: "Auditoría centralizada, sin perder control ni trazabilidad." },
  { Icon: Database, title: "Soberanía de datos", desc: "Contexto y conocimiento dentro del perímetro corporativo." },
];

function SectionPuente() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="riesgos" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>La solución</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Existe una forma de operar IA con control.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL reúne modelos, agentes y automatizaciones bajo una sola capa corporativa.
          </p>
        </motion.div>

        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="bridgeIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {BRIDGE_CARDS.map(({ Icon, title, desc }, i) => (
            <motion.div key={title} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.90)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(109,43,255,0.05)" }}
              initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
              whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(109,43,255,0.10)", transition: { duration: 0.18 } }}>
              <Icon className="w-[26px] h-[26px] mb-4 block" style={{ stroke: "url(#bridgeIconGrad)", color: "transparent" }} strokeWidth={1.6} />
              <p className="text-[14px] font-[800] mb-2" style={{ color: B.text }}>{title}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
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
        <div className="absolute top-0 left-1/3 w-48 h-48 sm:w-80 sm:h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/3 w-44 h-44 sm:w-72 sm:h-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[640px] mx-auto px-5 md:px-10 py-12 md:py-16 text-center">
        <motion.div className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: B.magenta }} strokeWidth={2} />
          <span className="text-[11px] font-[700] tracking-[0.14em] uppercase" style={{ ...MONO, color: B.magenta }}>
            Shadow AI — Riesgo real
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-3"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          No esperes a que el Shadow AI se vuelva infraestructura crítica.
        </motion.h2>
        <motion.p className="leading-relaxed mb-5 mx-auto"
          style={{ fontSize: 15, color: B.textSub, maxWidth: 460 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
          Ordena el uso de IA antes de que los costos, datos y decisiones queden fuera del radar corporativo.
        </motion.p>
        <motion.div className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-[700] text-white text-[11px] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
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
      <SectionMarcoRegulatorio />
      <SectionMitNanda />
      <SectionConsecuencias />
      <SectionAntesKrnl />
      <SectionPuntoQuiebre />
      <SectionPuente />
      <CTAFinalProblema />
      <KrnlFooter />
    </div>
  );
}
