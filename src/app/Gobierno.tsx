import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, Shield, Bot, Database, Workflow, DollarSign, FileText,
  Box, Eye, CheckCircle2, AlertTriangle, Lock, Activity, BarChart3,
  Users, Server, Layers, Clock, Settings, RefreshCw, Check, X,
  MessageSquare, Globe, ChevronDown, ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
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
  amber:       "#F59E0B",
  amberSoft:   "#FFFBEB",
  green:       "#22c55e",
  greenSoft:   "#F0FDF4",
  sky:         "#0EA5E9",
};
const GRAD  = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO  = { fontFamily: "'JetBrains Mono', monospace" };
const ease  = [0.22, 1, 0.36, 1] as const;
const easeL = [0.4, 0, 0.2, 1] as const;

// ── Shared primitives ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-[700] tracking-[0.2em] uppercase mb-3"
      style={{ ...MONO, color: B.magenta }}>{children}</p>
  );
}

function StatusChip({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] font-[700] px-2.5 py-1 rounded-full"
      style={{ background: bg, color }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

// ── 1. HERO — GOVERNANCE CONTROL CENTER ───────────────────────────────────────
const HERO_PIPELINE = [
  { label: "Entrada",    Icon: Users },
  { label: "Políticas",  Icon: Shield },
  { label: "Validación", Icon: CheckCircle2 },
  { label: "Modelo",     Icon: Box },
  { label: "Respuesta",  Icon: FileText },
  { label: "Evidencia",  Icon: Lock },
];

const MODEL_BARS = [
  { name: "Modelo autorizado", w: "65%", col: B.purple  },
  { name: "Modelo externo",    w: "42%", col: B.magenta },
  { name: "Modelo privado",    w: "28%", col: B.sky     },
];

function GovControlCenter({ inV }: { inV: boolean }) {
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 24px 80px rgba(109,43,255,0.12)" }}>

      {/* Window bar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FC5153" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCBB40" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#33C748" }} />
        <span className="ml-3 text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>KRNL Governance Center</span>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: B.green }}
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-[10px] font-[600]" style={{ color: B.green }}>Capa de gobierno</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-5 pb-3">
        {[
          { label: "Políticas centralizadas",  status: "Activas",  Icon: Shield, col: B.purple, bg: B.purpleSoft },
          { label: "Guardrails configurables", status: "Activos",  Icon: Lock,   col: B.magenta, bg: B.magentaSoft },
          { label: "Agentes gobernados",       status: "Activos",  Icon: Users,  col: B.sky, bg: `${B.sky}15` },
        ].map(({ label, status, Icon, col, bg }) => (
          <div key={label} className="rounded-xl px-3 py-3.5 flex flex-col items-center text-center gap-1.5"
            style={{ background: bg }}>
            <Icon className="w-4 h-4" style={{ color: col }} strokeWidth={1.8} />
            <p className="text-[12px] font-[700] leading-snug" style={{ color: col }}>{label}</p>
            <span className="text-[9px] font-[600] uppercase tracking-wide" style={{ color: B.textMuted }}>{status}</span>
          </div>
        ))}
      </div>

      {/* Pipeline — la ruta que sigue cada interacción, siempre en el mismo orden */}
      <div className="px-4 pb-4">
        <p className="text-[9px] font-[700] tracking-[0.16em] uppercase mb-3" style={{ ...MONO, color: B.textMuted }}>Ruta de cada interacción</p>
        <div className="relative flex items-start justify-between px-1">
          <div className="absolute h-px" style={{ top: 17, left: 15, right: 15, background: B.borderSoft }} />
          {HERO_PIPELINE.map(({ label, Icon }, i) => (
            <motion.div key={label} className="relative z-10 flex flex-col items-center gap-1.5" style={{ width: `${100 / HERO_PIPELINE.length}%` }}
              initial={{ opacity: 0, y: 6 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.07, duration: 0.35, ease }}>
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 34, height: 34, background: B.surface, border: `1.5px solid ${B.purpleSoft}` }}>
                <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.8} />
              </div>
              <span className="text-[9px] font-[600] text-center leading-none" style={{ color: B.textMuted }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Model usage */}
      <div className="px-4 pb-4">
        <p className="text-[9px] font-[700] tracking-[0.16em] uppercase mb-2" style={{ ...MONO, color: B.textMuted }}>Uso por modelo</p>
        <div className="flex flex-col gap-2">
          {MODEL_BARS.map(({ name, w, col }, i) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-[11px] w-[124px] shrink-0 truncate" style={{ color: B.textSub }}>{name}</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: B.border }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: col }}
                  initial={{ width: "0%" }} animate={inV ? { width: w } : {}}
                  transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease: easeL }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: B.amberSoft, border: `1px solid ${B.amber}25` }}>
        <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: B.amber }} strokeWidth={1.75} />
        <p className="text-[11px]" style={{ color: B.textSub }}>1 interacción en revisión humana activa</p>
      </div>
      <p className="px-4 pb-3 text-[9px] font-[500]" style={{ color: B.textMuted }}>Ejemplo conceptual de operación · no corresponde a métricas reales</p>
    </div>
  );
}

function HeroGobierno() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFBFE 0%, #F5F0FD 45%, #FEFCFE 100%)" }}>
      <div className="absolute -top-20 left-1/4 w-64 h-40 sm:w-[520px] sm:h-[300px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}80 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-16 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}55 0%, transparent 72%)`, filter: "blur(32px)" }} />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
        <div>
          <motion.div className="mb-5"
            initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
              style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
              Gobierno de IA empresarial
            </span>
          </motion.div>

          <motion.h1 className="font-[800] leading-[1.06] mb-5"
            style={{ fontSize: "clamp(26px, 3.4vw, 46px)", color: B.text }}
            initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
            Controla cada interacción, modelo y agente{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              desde una sola capa.
            </span>
          </motion.h1>

          <motion.p className="mb-9 leading-relaxed"
            style={{ fontSize: 16, color: B.textSub, maxWidth: 460 }}
            initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
            KRNL propone una capa de políticas, validaciones, trazabilidad y supervisión humana sobre cada interacción de IA empresarial.
          </motion.p>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease }}>
          <GovControlCenter inV={inV} />
        </motion.div>
      </div>
    </section>
  );
}
// ── 2. EL FLUJO GOBERNADO — bloque protagonista de la página ─────────────────
const FLUJO_STAGES = [
  { num: "01", label: "Usuario / Sistema",   detail: "Cualquier persona, agente o sistema puede iniciar una solicitud.", Icon: Users        },
  { num: "02", label: "Policy Engine KRNL",  detail: "Revisa permisos y nivel de riesgo antes de continuar.",           Icon: Shield       },
  { num: "03", label: "Modelo autorizado",        detail: "La solicitud puede enrutarse al modelo autorizado según la política aplicable.", Icon: Box          },
  { num: "04", label: "Validación bajo política", detail: "La respuesta puede pasar por una verificación antes de salir.",                 Icon: CheckCircle2 },
  { num: "05", label: "Registro auditable",       detail: "Cada interacción puede quedar registrada, con evidencia disponible después.",   Icon: FileText     },
];

const FLUJO_ARROW_POSITIONS = [24.8, 41.6, 58.4, 75.2]; // % — puntos medios entre los 5 nodos (línea 8%–92%)

const DECISION_ROWS: { label: string; value: string; isStatus?: boolean; sc?: string; sb?: string }[] = [
  { label: "Política aplicada", value: "Confidencialidad Legal" },
  { label: "Modelo autorizado", value: "Modelo externo" },
  { label: "Riesgo detectado",  value: "Medio",            isStatus: true, sc: B.amber, sb: B.amberSoft },
  { label: "Acción",            value: "Revisión humana",  isStatus: true, sc: B.amber, sb: B.amberSoft },
  { label: "Evidencia",         value: "Log generado",     isStatus: true, sc: B.green, sb: B.greenSoft },
];

function FlujoNodo({ stage, i, inV }: { stage: typeof FLUJO_STAGES[0]; i: number; inV: boolean }) {
  const { num, label, detail, Icon } = stage;
  return (
    <motion.div className="relative flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease }}>
      <span className="text-[9px] font-[700] mb-2.5" style={{ ...MONO, color: B.textMuted }}>{num}</span>
      <motion.div className="relative z-10 flex items-center justify-center rounded-2xl mb-3.5 shrink-0"
        style={{
          width: 60, height: 60,
          background: `linear-gradient(150deg, ${B.purpleSoft} 0%, ${B.magentaSoft} 100%)`,
          border: `1.5px solid ${B.purple}25`,
          boxShadow: `0 6px 18px ${B.purple}18`,
        }}
        whileHover={{ scale: 1.06, borderColor: `${B.magenta}45`, transition: { duration: 0.2 } }}>
        <Icon className="w-[26px] h-[26px]" style={{ color: B.purple }} strokeWidth={1.6} />
      </motion.div>
      <p className="text-[14px] font-[700] mb-1.5 leading-snug" style={{ color: B.text }}>{label}</p>
      <p className="text-[11px] leading-relaxed" style={{ color: B.textSub }}>{detail}</p>
    </motion.div>
  );
}

function FlujoStageVertical({ stage, i, inV, isLast }: { stage: typeof FLUJO_STAGES[0]; i: number; inV: boolean; isLast: boolean }) {
  const { num, label, detail, Icon } = stage;
  return (
    <motion.div className="relative flex gap-4"
      style={{ paddingBottom: isLast ? 0 : 26 }}
      initial={{ opacity: 0, x: -10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease }}>
      <div className="flex flex-col items-center shrink-0">
        <div className="relative z-10 flex items-center justify-center rounded-2xl shrink-0"
          style={{
            width: 56, height: 56,
            background: `linear-gradient(150deg, ${B.purpleSoft} 0%, ${B.magentaSoft} 100%)`,
            border: `1.5px solid ${B.purple}25`,
            boxShadow: `0 6px 18px ${B.purple}18`,
          }}>
          <Icon className="w-[22px] h-[22px]" style={{ color: B.purple }} strokeWidth={1.7} />
        </div>
        {!isLast && <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(180deg, ${B.purple}45, ${B.magenta}20)`, minHeight: 26 }} />}
      </div>
      <div className="pt-1.5 pb-2">
        <span className="text-[9px] font-[700]" style={{ ...MONO, color: B.textMuted }}>{num}</span>
        <p className="text-[14.5px] font-[700] leading-tight mb-1" style={{ color: B.text }}>{label}</p>
        <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{detail}</p>
      </div>
    </motion.div>
  );
}

function SectionFlujoGobernado() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <section ref={ref} id="gobierno-que-gobierna" className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-8 md:pb-10">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Flujo gobernado</SectionLabel>
          <h2 className="font-[700] mb-6" style={{ fontSize: "clamp(26px, 3.4vw, 42px)", color: B.text }}>
            El flujo gobernado
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, fontWeight: 300, maxWidth: 560, margin: "0 auto" }}>
            Cada solicitud puede seguir un circuito de gobierno antes de llegar a un resultado: puede validarse, ejecutarse y quedar registrada según políticas.
          </p>
        </motion.div>

        {/* Tablet / desktop — un solo panel de sistema con 5 nodos (3 columnas en tablet, 5 en desktop) */}
        <div className="hidden md:block rounded-3xl p-8 lg:p-10"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 28px rgba(109,43,255,0.06)" }}>
          <div className="relative">
            {/* La línea queda tapada por el ícono opaco de cada nodo — nunca cruza ni toca el ícono */}
            <div className="hidden lg:block absolute h-px" style={{ top: 50, left: "8%", right: "8%", background: B.borderSoft }} />
            <motion.div className="hidden lg:block absolute h-[1.5px]" style={{ top: 50, left: "8%", right: "8%", background: `linear-gradient(90deg, ${B.purple}, ${B.magenta})`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.2, ease: easeL }} />
            {!reduced && (
              <motion.div className="hidden lg:block absolute w-2 h-2 rounded-full pointer-events-none"
                style={{ top: 50, marginTop: -4, background: B.magenta, boxShadow: `0 0 10px ${B.magenta}` }}
                initial={{ left: "8%", opacity: 0 }}
                animate={inV ? { left: ["8%", "92%"], opacity: [0, 0.9, 0.9, 0] } : {}}
                transition={{ duration: 2.4, delay: 1.6, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }} />
            )}
            {/* Flechas sutiles entre pasos — solo desktop, donde la grilla es exactamente 5 columnas */}
            {FLUJO_ARROW_POSITIONS.map((pos, i) => (
              <motion.div key={pos} className="hidden lg:flex absolute items-center justify-center rounded-full pointer-events-none"
                style={{ top: 50, left: `${pos}%`, marginTop: -9, marginLeft: -9, width: 18, height: 18, background: B.surface, border: `1px solid ${B.borderSoft}` }}
                initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}>
                <ChevronRight className="w-3 h-3" style={{ color: B.purple }} strokeWidth={2.5} />
              </motion.div>
            ))}
            <div className="relative grid grid-cols-3 lg:grid-cols-5 gap-6">
              {FLUJO_STAGES.map((stage, i) => (
                <FlujoNodo key={stage.label} stage={stage} i={i} inV={inV} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — timeline vertical con cards apiladas */}
        <div className="md:hidden flex flex-col max-w-[420px] mx-auto">
          {FLUJO_STAGES.map((stage, i) => (
            <FlujoStageVertical key={stage.label} stage={stage} i={i} inV={inV} isLast={i === FLUJO_STAGES.length - 1} />
          ))}
        </div>

        {/* Puente narrativo — conecta el circuito con su resultado operativo */}
        <motion.div className="flex flex-col items-center gap-2 mt-8 md:mt-10"
          initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.42 }}>
          <ChevronDown className="w-4 h-4" style={{ color: B.purple }} strokeWidth={2} />
          <p className="text-[13px] font-[600]" style={{ color: B.purple }}>Así queda registrado el resultado de cada circuito.</p>
        </motion.div>

        {/* Panel "Decisión tomada por KRNL" — resultado operativo del circuito, misma jerarquía que el panel del hero */}
        <motion.div className="mt-5 md:mt-6 max-w-[720px] mx-auto rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.border}`, boxShadow: "0 14px 44px rgba(109,43,255,0.11)" }}
          initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.5, ease }}>
          <div className="flex items-center gap-2.5 px-6 py-4 md:py-5"
            style={{ background: `linear-gradient(135deg, ${B.text} 0%, #1B2438 100%)` }}>
            <motion.span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }}
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <p className="text-[11.5px] font-[700] uppercase tracking-[0.16em]" style={{ ...MONO, color: "#fff" }}>Ejemplo de decisión gobernada</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 px-6 md:px-8 py-3">
            {DECISION_ROWS.map(({ label, value, isStatus, sc, sb }) => (
              <div key={label} className="flex items-center justify-between py-4" style={{ borderBottom: `1px solid ${B.borderSoft}` }}>
                <span className="text-[12.5px]" style={{ color: B.textMuted }}>{label}</span>
                {isStatus ? (
                  <StatusChip label={value} color={sc!} bg={sb!} />
                ) : (
                  <span className="text-[13.5px] font-[700]" style={{ color: B.text }}>{value}</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-6 md:px-8 py-3" style={{ borderTop: `1px solid ${B.borderSoft}`, background: B.softBg }}>
            <p className="text-[10px]" style={{ color: B.textMuted }}>Ejemplo conceptual de operación · no corresponde a métricas reales</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-[600]" style={{ color: B.purple }}>
              Ver evidencia <ArrowRight className="w-3 h-3" strokeWidth={2.2} />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2.5 GOBIERNO PREPARADO PARA AUDITORÍA, DATOS Y CONTROL EMPRESARIAL ────────
const GOBIERNO_PILARES = [
  { Icon: Shield,   title: "Políticas",    desc: "Puede definir qué hace cada agente, modelo o flujo de trabajo." },
  { Icon: Lock,     title: "Accesos",      desc: "Permite controlar quién usa qué datos, modelos, agentes o herramientas." },
  { Icon: Activity, title: "Trazabilidad", desc: "Cada interacción puede quedar registrada, con modelo y regla asociados." },
  { Icon: FileText, title: "Evidencia",    desc: "Puede dejar registros disponibles para revisión interna, TI, legal, compliance o auditoría." },
];

const EVIDENCIA_DISPONIBLE = [
  { Icon: MessageSquare, title: "Registro de interacciones", desc: "Quién usó qué agente, cuándo y para qué." },
  { Icon: Shield,         title: "Política aplicada",         desc: "Qué regla permitió, bloqueó o derivó una acción." },
  { Icon: Box,            title: "Modelo utilizado",           desc: "Qué modelo intervino en cada ejecución." },
  { Icon: Eye,            title: "Revisión disponible",        desc: "Evidencia consultable para TI, legal, compliance o auditoría interna." },
];

function SectionGobiernoPreparado() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="gobierno" />
      <div className="relative max-w-[1160px] mx-auto px-5 md:px-10 pt-6 md:pt-8 pb-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">

          {/* Columna izquierda — narrativa + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
            <SectionLabel>Preparación regulatoria</SectionLabel>
            <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: B.text, lineHeight: 1.22 }}>
              Gobierno de IA preparado para auditoría, datos y control empresarial.
            </h2>
            <p className="mb-7" style={{ color: B.textSub, fontSize: 15.5, lineHeight: 1.65 }}>
              KRNL permite definir políticas, registrar interacciones, controlar accesos y generar evidencia sobre el uso de agentes, modelos y datos. Esto ayuda a las organizaciones a operar IA con mayor trazabilidad y prepararse para mayores exigencias regulatorias sobre tratamiento de datos personales.
            </p>
            <button onClick={() => krnlNavigate("contacto")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-[600] text-white text-[13px] transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: GRAD, boxShadow: `0 6px 20px ${B.purple}35` }}>
              Conoce cómo funciona KRNL <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
            </button>
          </motion.div>

          {/* Columna derecha — pilares + evidencia */}
          <div className="flex flex-col gap-5">
            <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
              <defs>
                <linearGradient id="gobiernoPilarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4009A" />
                  <stop offset="100%" stopColor="#6D2BFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOBIERNO_PILARES.map(({ Icon, title, desc }, i) => (
                <motion.div key={title} className="rounded-xl p-5"
                  style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 1px 2px rgba(13,21,36,0.03)" }}
                  initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.22, ease }}
                  whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(13,21,36,0.06)", transition: { duration: 0.2 } }}>
                  <Icon className="w-8 h-8 mb-4" style={{ stroke: "url(#gobiernoPilarGrad)", color: "transparent" }} strokeWidth={1.6} />
                  <p className="text-[13.5px] font-[700] mb-1.5" style={{ color: B.text }}>{title}</p>
                  <p className="text-[11.5px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Qué evidencia puede dejar KRNL */}
            <motion.div className="rounded-2xl p-6"
              style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.45, ease }}>
              <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-4" style={{ ...MONO, color: B.textMuted }}>
                Qué evidencia puede dejar KRNL
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EVIDENCIA_DISPONIBLE.map(({ Icon, title, desc }, i) => (
                  <motion.div key={title} className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease }}>
                    <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: B.surface, border: `1px solid ${B.borderSoft}` }}>
                      <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-[700] mb-0.5" style={{ color: B.textSub }}>{title}</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: B.textMuted }}>{desc}</p>
                    </div>
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

// ── 3. QUÉ CONTROLA KRNL — capacidades, no proceso ────────────────────────────
const CONTROLA_ITEMS = [
  { Icon: Shield,     title: "Políticas",      desc: "Permite definir qué agentes, modelos y datos puede usar cada área." },
  { Icon: Lock,       title: "Guardrails",     desc: "Ayuda a frenar acciones fuera de regla antes de que lleguen al usuario o sistema." },
  { Icon: FileText,   title: "Auditoría",      desc: "Entradas, salidas, modelos usados y decisiones pueden quedar registrados." },
  { Icon: DollarSign, title: "Costos",         desc: "Permite ver consumo por modelo, agente, área o caso de uso." },
  { Icon: Eye,        title: "Control humano", desc: "Puede escalar acciones críticas a revisión antes de ejecutarlas." },
];

function SectionQueControlaKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} id="gobierno-guardrails" className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="relative max-w-[1160px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Capacidades</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Qué controla KRNL
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            Cinco capacidades que trabajan juntas, no por separado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CONTROLA_ITEMS.map(({ Icon, title, desc }, i) => (
            <motion.div key={title} className="rounded-xl p-6"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 1px 2px rgba(13,21,36,0.03)" }}
              initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.22, ease }}
              whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(13,21,36,0.07)", transition: { duration: 0.2 } }}>
              <Icon className="w-8 h-8 mb-4" style={{ color: B.magenta }} strokeWidth={1.6} />
              <p className="text-[13.5px] font-[700] mb-1.5" style={{ color: B.text }}>{title}</p>
              <p className="text-[11.5px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. EVIDENCIA OPERATIVA ────────────────────────────────────────────────────
const EVIDENCIA_ROWS = [
  { time: "14:32", area: "Legal",    agent: "Agente Contratos", model: "Modelo externo",    policy: "Confidencialidad Legal",     status: "Revisión humana", sc: B.amber,   sb: B.amberSoft },
  { time: "14:21", area: "Finanzas", agent: "Análisis Gastos",  model: "Modelo autorizado", policy: "Política de costos",         status: "Permitido",       sc: B.green,   sb: B.greenSoft },
  { time: "14:09", area: "RR.HH.",   agent: "Onboarding",       model: "Modelo privado",    policy: "Política de RR.HH.",         status: "Permitido",       sc: B.green,   sb: B.greenSoft },
  { time: "13:54", area: "Soporte",  agent: "Agente Tickets",   model: "Modelo autorizado", policy: "Política de acceso a datos", status: "Bloqueado",       sc: B.magenta, sb: B.magentaSoft },
];

function SectionEvidenciaOperativa() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="gobierno-auditoria" ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <motion.div className="text-center mb-8"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Evidencia operativa</SectionLabel>
          <h2 className="font-[800] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}>
            Trazabilidad diseñada para cada decisión
          </h2>
          <p style={{ color: B.textSub, fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
            KRNL propone un modelo de trazabilidad de quién ejecutó qué, con qué modelo, bajo qué política y con qué resultado.
          </p>
        </motion.div>

        <motion.div className="relative rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 16px rgba(109,43,255,0.05)" }}
          initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          {/* Pista de scroll horizontal — solo mobile, donde la tabla no entra completa */}
          <div className="md:hidden pointer-events-none absolute top-0 right-0 z-10" style={{ width: 32, height: "100%", background: `linear-gradient(90deg, transparent, ${B.surface})` }} />
          <div className="overflow-x-auto">
          <div className="min-w-[680px]">
          <div className="grid px-6 py-3" style={{ gridTemplateColumns: "70px 1fr 1fr 1fr 1fr 120px", borderBottom: `1.5px solid ${B.borderSoft}`, background: B.softBg }}>
            {["Hora", "Área / Agente", "Modelo", "Política", "Estado", "Evidencia"].map((h, i) => (
              <p key={i} className="text-[10px] font-[700] tracking-[0.1em] uppercase" style={{ ...MONO, color: B.textMuted }}>{h}</p>
            ))}
          </div>
          {EVIDENCIA_ROWS.map((r, i) => (
            <motion.div key={i} className="grid px-6 py-3.5 items-center"
              style={{
                gridTemplateColumns: "70px 1fr 1fr 1fr 1fr 120px",
                borderBottom: i < EVIDENCIA_ROWS.length - 1 ? `1px solid ${B.borderSoft}` : "none",
                borderLeft: `3px solid ${r.sc}`,
              }}
              initial={{ opacity: 0, x: -8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease }}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 shrink-0" style={{ color: B.textMuted }} strokeWidth={1.75} />
                <span className="text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>{r.time}</span>
              </div>
              <div>
                <p className="text-[12px] font-[700]" style={{ color: B.text }}>{r.area}</p>
                <p className="text-[10px]" style={{ color: B.textMuted }}>{r.agent}</p>
              </div>
              <span className="inline-flex items-center justify-center text-[11px] font-[600] px-3 rounded-full w-fit justify-self-start"
                style={{ background: B.purpleSoft, color: B.purple, height: 30 }}>{r.model}</span>
              <p className="text-[11px]" style={{ color: B.textSub }}>{r.policy}</p>
              <StatusChip label={r.status} color={r.sc} bg={r.sb} />
              <div className="flex items-center gap-1 justify-end">
                <span className="text-[10px]" style={{ color: B.textMuted }}>Log</span>
                <Check className="w-3 h-3" style={{ color: B.green }} strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
          </div>
          </div>
        </motion.div>
        <p className="text-center mt-3 text-[10px]" style={{ color: B.textMuted }}>
          Ejemplo conceptual de operación · no corresponde a métricas reales
        </p>
      </div>
    </section>
  );
}

// ── 9. CTA FINAL ──────────────────────────────────────────────────────────────
function CTAFinalGobierno() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #FBF8FF 0%, #FFF5FC 50%, #F8F4FF 100%)", borderTop: `1px solid ${B.border}` }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-80 sm:h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-64 sm:h-64 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[640px] mx-auto px-5 md:px-10 py-12 md:py-16 text-center">
        <motion.div className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
            style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
            <Shield className="w-3 h-3" style={{ color: B.purple }} strokeWidth={2} />
            KRNL — Gobierno de IA
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-3"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Opera IA con reglas, evidencia y control.
        </motion.h2>
        <motion.p className="leading-relaxed mb-5 mx-auto"
          style={{ fontSize: 15, color: B.textSub, maxWidth: 460 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
          KRNL permite pasar de herramientas dispersas a una operación de IA gobernada, trazable y segura.
        </motion.p>
        <motion.div className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-[700] text-white text-[11px] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}


// ── Page export ────────────────────────────────────────────────────────────────
export default function PaginaGobierno() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroGobierno />
      <SectionFlujoGobernado />
      <SectionGobiernoPreparado />
      <SectionQueControlaKrnl />
      <SectionEvidenciaOperativa />
      <CTAFinalGobierno />
      <KrnlFooter />
    </div>
  );
}
