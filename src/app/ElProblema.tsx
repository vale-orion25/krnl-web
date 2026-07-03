import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, AlertTriangle, EyeOff, ShieldOff, Database, Users, Bot,
  FileText, Activity, Lock, TrendingUp, GitBranch, Layers, CheckCircle2,
  X, Shield, Scale, DollarSign, Server, MessageSquare, Workflow, Eye,
  ChevronDown,
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

// ── HERO ───────────────────────────────────────────────────────────────────────
const DEPTS = [
  { name: "Legal",       Icon: Scale,    col: B.purple,  tool: "Claude",         warn: "Sin auditoría"    },
  { name: "Finanzas",    Icon: TrendingUp, col: B.magenta, tool: "ChatGPT",       warn: "Sin trazabilidad" },
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
            Equipos usando distintos LLMs, agentes y automatizaciones sin políticas comunes, sin trazabilidad central y sin control real sobre datos, costos y resultados.
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
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
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
  { name: "Legal",       Icon: Scale,      col: B.purple,   tool: "Claude",   x: 16, y: 13 },
  { name: "Finanzas",    Icon: TrendingUp, col: B.magenta,  tool: "ChatGPT",   x: 84, y: 16 },
  { name: "RRHH",        Icon: Users,      col: "#22c55e",  tool: "Chatbots", x: 10, y: 68 },
  { name: "TI",          Icon: Server,     col: "#0EA5E9",  tool: "Scripts",  x: 90, y: 65 },
  { name: "Operaciones", Icon: Workflow,   col: B.amber,    tool: "Agentes",  x: 50, y: 91 },
];
const HUB = { x: 50, y: 42 };

function SiloCard({ node, i, inV }: { node: typeof SHADOW_NODES[0]; i: number; inV: boolean }) {
  const { name, Icon, col, tool } = node;
  return (
    <motion.div
      className="rounded-xl px-3.5 py-3.5 flex flex-col items-center text-center"
      style={{ width: 128, background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(15,10,30,0.05)" }}
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
          <div className="flex flex-wrap justify-center gap-4">
            {SHADOW_NODES.map((n, i) => <SiloCard key={n.name} node={n} i={i} inV={inV} />)}
          </div>
        </div>
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
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
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
  "Auditoría completa",
  "Control de costos",
  "Portabilidad del conocimiento",
];

function SectionAntesKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${B.softBg} 0%, ${B.purpleSoft} 100%)`, borderTop: `1px solid ${B.border}` }}>
      {/* Halo muy sutil detrás del bloque comparativo — sin partículas ni mallas */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: 760, maxWidth: "92%", height: 420, borderRadius: "50%", background: `radial-gradient(ellipse at center, ${B.purple}22 0%, transparent 72%)`, filter: "blur(38px)" }} />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
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

        {/* Un solo sistema comparativo — no dos cards sueltas */}
        <motion.div className="relative rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: "1px solid #E6E8F0", boxShadow: "0 4px 28px rgba(15,10,40,0.05)" }}
          initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>

          {/* Glow tenue en el eje divisor */}
          <motion.div className="absolute top-0 bottom-0 hidden lg:block pointer-events-none"
            style={{ left: "50%", width: 160, marginLeft: -80, background: `radial-gradient(ellipse at center, ${B.purple}10 0%, transparent 70%)` }}
            animate={inV ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

          <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <defs>
              <linearGradient id="contrasteIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4009A" />
                <stop offset="100%" stopColor="#6D2BFF" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: IA dispersa */}
            <motion.div className="p-7 md:p-9 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "#E6E8F0" }}
              whileHover={{ y: -2, transition: { duration: 0.25, ease } }}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: "1px solid #E2E5EC" }}>
                  <ShieldOff className="w-6 h-6" style={{ stroke: "url(#contrasteIconGrad)", color: "transparent" }} strokeWidth={1.5} />
                </div>
                <p className="text-[16px] font-[800]" style={{ color: B.text }}>IA dispersa</p>
              </div>
              <motion.div className="h-px rounded-full mb-6"
                style={{ background: "#E2E5EC", width: 28, marginLeft: 48 }}
                initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease }} />
              <div className="flex flex-col gap-4">
                {BEFORE_LEFT.map((item, i) => (
                  <motion.div key={item} className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.28 + i * 0.07, duration: 0.4, ease }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: "1px solid #E2E5EC" }}>
                      <X className="w-2.5 h-2.5" style={{ color: "#8A93A8" }} strokeWidth={2.2} />
                    </div>
                    <p className="text-[13.5px]" style={{ color: B.textSub }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Lo que el negocio necesita */}
            <motion.div className="p-7 md:p-9"
              style={{ background: "#FBFAFF" }}
              whileHover={{ y: -2, transition: { duration: 0.25, ease } }}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: `1px solid ${B.purple}30` }}>
                  <Shield className="w-6 h-6" style={{ stroke: "url(#contrasteIconGrad)", color: "transparent" }} strokeWidth={1.5} />
                </div>
                <p className="text-[16px] font-[800]" style={{ color: B.text }}>Lo que el negocio necesita</p>
              </div>
              <motion.div className="h-px rounded-full mb-6"
                style={{ background: GRAD, width: 28, marginLeft: 48 }}
                initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4, ease }} />
              <div className="flex flex-col gap-4">
                {BEFORE_RIGHT.map((item, i) => (
                  <motion.div key={item} className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.07, duration: 0.4, ease }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: `1px solid ${B.purple}35` }}>
                      <CheckCircle2 className="w-2.5 h-2.5" style={{ color: B.purple }} strokeWidth={2.2} />
                    </div>
                    <p className="text-[13.5px] font-[500]" style={{ color: B.text }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── SECTION 6 — PUNTO DE QUIEBRE ──────────────────────────────────────────────
const MATURITY_STEPS = [
  { num: "01", label: "Experimentos",                 sub: "Pruebas individuales",        Icon: MessageSquare },
  { num: "02", label: "Herramientas por equipo",       sub: "Uso fragmentado",             Icon: Layers        },
  { num: "03", label: "Agentes por área",              sub: "Decisiones distribuidas",     Icon: Bot           },
  { num: "04", label: "Automatizaciones sin control",  sub: "Acciones sin supervisión",    Icon: Workflow      },
  { num: "05", label: "Operación crítica",             sub: "Riesgo real para el negocio", Icon: AlertTriangle },
];

function SectionPuntoQuiebre() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <section ref={ref} id="problema-punto-quiebre" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
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
            {MATURITY_STEPS.map(({ num, label, sub, Icon }, i) => {
              const baseDelay = 0.3 + i * 0.12;
              return (
                <div key={num} className="flex flex-col items-center">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center z-10 relative mb-4"
                    style={{ background: B.softBg, border: `1.5px solid ${B.border}` }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inV ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                    transition={{ delay: baseDelay, duration: 0.4, ease }}
                    whileHover={reduced ? {} : { scale: 1.06, transition: { duration: 0.22, ease } }}>
                    <Icon className="w-6 h-6" style={{ color: B.textSub }} strokeWidth={1.6} />
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
  { Icon: Activity, title: "Trazabilidad",       desc: "Auditoría completa e inmutable de toda la operación." },
  { Icon: Database, title: "Soberanía de datos", desc: "Contexto y conocimiento dentro del perímetro corporativo." },
];

function SectionPuente() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
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
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-10 py-16 md:py-28 text-center">
        <motion.div className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: B.magenta }} strokeWidth={2} />
          <span className="text-[11px] font-[700] tracking-[0.14em] uppercase" style={{ ...MONO, color: B.magenta }}>
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
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button onClick={() => krnlNavigate("producto")}
            className="inline-flex items-center gap-1.5 text-[14px] font-[600] transition-colors hover:underline underline-offset-4"
            style={{ background: "none", border: "none", padding: 0, color: B.purple }}>
            Ver arquitectura <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
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
