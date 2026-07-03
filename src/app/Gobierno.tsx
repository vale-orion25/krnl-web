import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, Shield, Bot, Database, Workflow, DollarSign, FileText,
  Box, Eye, CheckCircle2, AlertTriangle, Lock, Activity, BarChart3,
  Users, Server, Layers, Clock, Settings, RefreshCw, Check, X,
  MessageSquare, Globe,
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
const AUDIT_ROWS = [
  { area: "Finanzas", agent: "Ag. Financiero", model: "ChatGPT",      policy: "Política costos",            status: "Validado",         sc: B.green,   sb: "#F0FDF4" },
  { area: "Legal",    agent: "Ag. Legal",      model: "Claude",  policy: "Política confidencialidad",  status: "Revisión humana",  sc: B.amber,   sb: B.amberSoft },
  { area: "TI",       agent: "Ag. DevOps",     model: "Modelo local", policy: "Política interna",           status: "Aprobado",         sc: B.purple,  sb: B.purpleSoft },
];

const MODEL_BARS = [
  { name: "ChatGPT",    w: "65%", col: B.purple  },
  { name: "Claude",w: "42%", col: B.magenta },
  { name: "Modelo local",w:"28%", col: B.sky     },
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
          <span className="text-[10px] font-[600]" style={{ color: B.green }}>Sistema activo</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 pb-3">
        {[
          { label: "Políticas activas", val: "12", col: B.purple, bg: B.purpleSoft },
          { label: "Guardrails",        val: "8",  col: B.magenta, bg: B.magentaSoft },
          { label: "Agentes activos",   val: "14", col: B.sky, bg: `${B.sky}15` },
        ].map(({ label, val, col, bg }) => (
          <div key={label} className="rounded-xl px-3 py-2.5 text-center"
            style={{ background: bg }}>
            <p className="text-[20px] font-[800]" style={{ color: col }}>{val}</p>
            <p className="text-[9px] font-[500]" style={{ color: B.textMuted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Audit log */}
      <div className="px-4 pb-3">
        <p className="text-[9px] font-[700] tracking-[0.16em] uppercase mb-2" style={{ ...MONO, color: B.textMuted }}>Últimas interacciones auditadas</p>
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${B.borderSoft}` }}>
          {AUDIT_ROWS.map((r, i) => (
            <motion.div key={r.area}
              className="flex items-center gap-3 px-3 py-2"
              style={{ borderBottom: i < AUDIT_ROWS.length - 1 ? `1px solid ${B.borderSoft}` : "none", background: B.surface }}
              initial={{ opacity: 0, x: 10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.1, duration: 0.4, ease }}>
              <div>
                <p className="text-[10px] font-[700]" style={{ color: B.text }}>{r.area} · {r.agent}</p>
                <p className="text-[9px]" style={{ color: B.textMuted }}>{r.model} · {r.policy}</p>
              </div>
              <StatusChip label={r.status} color={r.sc} bg={r.sb} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Model usage */}
      <div className="px-4 pb-4">
        <p className="text-[9px] font-[700] tracking-[0.16em] uppercase mb-2" style={{ ...MONO, color: B.textMuted }}>Uso por modelo</p>
        <div className="flex flex-col gap-1.5">
          {MODEL_BARS.map(({ name, w, col }, i) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-[10px] w-[80px] shrink-0" style={{ color: B.textSub }}>{name}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: B.border }}>
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
      <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl px-3 py-2"
        style={{ background: B.amberSoft, border: `1px solid ${B.amber}25` }}>
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: B.amber }} strokeWidth={1.75} />
        <p className="text-[10px]" style={{ color: B.textSub }}>1 interacción en revisión humana activa</p>
      </div>
    </div>
  );
}

function HeroGobierno() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFBFE 0%, #F5F0FD 45%, #FEFCFE 100%)" }}>
      <div className="absolute -top-20 left-1/4 w-[520px] h-[300px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}80 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-16 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}55 0%, transparent 72%)`, filter: "blur(32px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
            KRNL aplica políticas, validaciones, trazabilidad y supervisión humana sobre cada interacción de IA empresarial.
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
// ── 2. FLUJO GOBERNADO END-TO-END ────────────────────────────────────────────
const FLUJO_STAGES = [
  { label: "Entrada",              detail: "Solicitud del usuario",                          Icon: Users        },
  { label: "Control",              detail: "Policy Engine + RBAC",                           Icon: Shield       },
  { label: "Ejecución",            detail: "Ejecuta con modelo o agente",                     Icon: Box          },
  { label: "Evidencia / Entrega",  detail: "Log inmutable + Supervisión + Resultado",         Icon: CheckCircle2 },
];

function FlujoStageDesktop({ stage, i, inV, reduced }: { stage: typeof FLUJO_STAGES[0]; i: number; inV: boolean; reduced: boolean | null }) {
  const { label, detail, Icon } = stage;
  return (
    <motion.div className="group relative flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.35 + i * 0.16, ease }}>
      <motion.div className="relative z-10 mb-6 shrink-0"
        whileHover={reduced ? {} : { scale: 1.1, transition: { duration: 0.25, ease } }}>
        <Icon className="w-8 h-8" style={{ stroke: "url(#flujoIconGrad)", color: "transparent" }} strokeWidth={1.4} />
      </motion.div>
      <p className="text-[14px] font-[600]" style={{ color: B.text }}>{label}</p>

      {/* Detalle — solo visible en hover, como mini tooltip */}
      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-[-3px] pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
        style={{ width: 190 }}>
        <div className="rounded-lg px-3.5 py-2.5 text-center" style={{ background: B.text, boxShadow: "0 10px 28px rgba(13,21,36,0.28)" }}>
          <p className="text-[11.5px] font-[500] leading-snug" style={{ color: "#fff" }}>{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FlujoStageVertical({ stage, i, inV, isLast }: { stage: typeof FLUJO_STAGES[0]; i: number; inV: boolean; isLast: boolean }) {
  const { label, detail, Icon } = stage;
  return (
    <motion.div className="relative flex gap-5"
      style={{ paddingBottom: isLast ? 0 : 34 }}
      initial={{ opacity: 0, x: -10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.15 + i * 0.13, ease }}>
      <div className="flex flex-col items-center shrink-0">
        <Icon className="w-8 h-8 shrink-0" style={{ stroke: "url(#flujoIconGrad)", color: "transparent" }} strokeWidth={1.4} />
        {!isLast && <div className="w-px flex-1 mt-3" style={{ background: B.borderSoft, minHeight: 30 }} />}
      </div>
      <div className="pt-0.5">
        <p className="text-[15px] font-[600] leading-tight mb-1.5" style={{ color: B.text }}>{label}</p>
        <p className="text-[12.5px] leading-relaxed font-[300]" style={{ color: B.textSub }}>{detail}</p>
      </div>
    </motion.div>
  );
}

function SectionFlujoGobernado() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <section ref={ref} id="gobierno-que-gobierna" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="flujoIconGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4009A" />
            <stop offset="100%" stopColor="#6D2BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20 md:py-36">
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Flujo gobernado</SectionLabel>
          <h2 className="font-[700] mb-6" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Cómo KRNL gobierna cada interacción
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, fontWeight: 300, maxWidth: 560, margin: "0 auto" }}>
            Desde la solicitud hasta el resultado, KRNL controla modelos, agentes, datos y decisiones en cada paso.
          </p>
        </motion.div>

        {/* Desktop — flujo horizontal, 4 etapas */}
        <div className="hidden lg:block relative max-w-[800px] mx-auto">
          <div className="absolute h-px" style={{ top: 16, left: "12%", right: "12%", background: B.borderSoft }} />
          <motion.div className="absolute h-[1.5px]" style={{ top: 16, left: "12%", right: "12%", background: `linear-gradient(90deg, ${B.purple}, ${B.magenta})`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.2, ease: easeL }} />
          {!reduced && (
            <motion.div className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{ top: 16, marginTop: -4, background: B.magenta, boxShadow: `0 0 10px ${B.magenta}` }}
              initial={{ left: "12%", opacity: 0 }}
              animate={inV ? { left: ["12%", "88%"], opacity: [0, 0.9, 0.9, 0] } : {}}
              transition={{ duration: 2.2, delay: 1.6, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }} />
          )}
          <div className="relative grid grid-cols-4 gap-10">
            {FLUJO_STAGES.map((stage, i) => (
              <FlujoStageDesktop key={stage.label} stage={stage} i={i} inV={inV} reduced={reduced} />
            ))}
          </div>
        </div>

        {/* Tablet / mobile — flujo vertical */}
        <div className="lg:hidden flex flex-col max-w-[420px] mx-auto">
          {FLUJO_STAGES.map((stage, i) => (
            <FlujoStageVertical key={stage.label} stage={stage} i={i} inV={inV} isLast={i === FLUJO_STAGES.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. MÓDULO DE GOBIERNO — TABS ──────────────────────────────────────────────
const GOV_TABS = [
  {
    key: "politicas", label: "Políticas", Icon: Shield,
    title: "Políticas antes de que la IA actúe",
    desc: "KRNL aplica reglas por área, usuario, modelo o nivel de riesgo antes de ejecutar cualquier acción.",
    bullets: [
      "Reglas por área, rol, modelo o tipo de dato.",
      "Accesos y modelos permitidos definidos por el administrador.",
      "Chips activos: RBAC, Guardrails, Auditoría, Human in the loop.",
    ],
    visualLabel: "Policy Engine",
    visualRows: [
      { Icon: Users, label: "Usuario / Sistema", tag: "Solicitud" },
      { Icon: Shield, label: "Policy Engine KRNL", tag: "Activo" },
      { Icon: Lock, label: "Guardrails", tag: "Aplicado" },
    ],
  },
  {
    key: "guardrails", label: "Guardrails", Icon: Lock,
    title: "Guardrails para reducir riesgo",
    desc: "Límites de seguridad y condiciones se aplican antes, durante y después de cada interacción.",
    bullets: [
      "Entrada segura: evalúa solicitudes antes de enviarlas al modelo.",
      "Respuesta validada antes de llegar a usuarios o sistemas.",
      "Datos protegidos frente a exposición fuera de política.",
    ],
    visualLabel: "Pipeline de validación",
    visualRows: [
      { Icon: Shield, label: "Entrada segura", tag: "Evaluada" },
      { Icon: CheckCircle2, label: "Respuesta validada", tag: "OK" },
      { Icon: Lock, label: "Datos protegidos", tag: "Seguro" },
    ],
  },
  {
    key: "auditoria", label: "Auditoría", Icon: FileText,
    title: "Cada interacción deja evidencia",
    desc: "Cada entrada, salida, modelo usado y decisión queda registrada en un log inmutable.",
    bullets: [
      "Registro inmutable con contexto, modelo y política aplicada.",
      "Trazabilidad completa de quién, qué y cómo se usó la IA.",
      "Evidencia disponible para auditoría en cualquier momento.",
    ],
    visualLabel: "Últimas interacciones",
    visualRows: [
      { Icon: Clock, label: "Ag. Financiero · ChatGPT", tag: "Validado" },
      { Icon: Clock, label: "Ag. Legal · Claude", tag: "Revisión" },
      { Icon: Clock, label: "Ag. DevOps · Modelo local", tag: "Aprobado" },
    ],
  },
  {
    key: "costos", label: "Costos", Icon: DollarSign,
    title: "Visibilidad total de costos",
    desc: "KRNL entrega visibilidad sobre consumo, uso y eficiencia por modelo, agente o área.",
    bullets: [
      "Consumo por modelo, agente, área o caso de uso.",
      "Alertas de presupuesto antes de exceder límites.",
      "Datos para decidir dónde optimizar o escalar.",
    ],
    visualLabel: "Uso por modelo",
    visualRows: [
      { Icon: Box, label: "ChatGPT", tag: "68%" },
      { Icon: Box, label: "Claude", tag: "45%" },
      { Icon: AlertTriangle, label: "Presupuesto Legal", tag: "Revisar" },
    ],
  },
  {
    key: "control", label: "Control humano", Icon: Eye,
    title: "Aprobaciones y control humano donde importa",
    desc: "Define quién puede crear, aprobar, publicar o revisar agentes y automatizaciones.",
    bullets: [
      "Roles configurables: Admin, Owner, Editor, Viewer, Revisor humano.",
      "Aprobación o rechazo de interacciones críticas.",
      "Escalamiento automático al superar el umbral de riesgo.",
    ],
    visualLabel: "Roles activos",
    visualRows: [
      { Icon: Settings, label: "Admin", tag: "Acceso total" },
      { Icon: FileText, label: "Editor", tag: "Creación" },
      { Icon: Eye, label: "Revisor humano", tag: "Revisión" },
    ],
  },
];

function SectionModuloGobierno() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const tab = GOV_TABS[active];

  return (
    <section ref={ref} id="gobierno-guardrails" style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Capacidades</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Qué incluye el gobierno de KRNL
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Una sola capa de control, con cinco capacidades que trabajan juntas en cada interacción.
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GOV_TABS.map((t, i) => {
            const isActive = active === i;
            return (
              <button key={t.key} onClick={() => setActive(i)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-[600] transition-all duration-200"
                style={{
                  background: isActive ? GRAD : B.surface,
                  color: isActive ? "#fff" : B.textSub,
                  border: isActive ? "none" : `1px solid ${B.borderSoft}`,
                  boxShadow: isActive ? `0 4px 16px ${B.purple}35` : "none",
                }}>
                <t.Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <motion.div key={tab.key} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-2xl p-7 md:p-10"
          style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 36px rgba(109,43,255,0.07)" }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
          <div>
            <p className="text-[19px] font-[800] mb-3 leading-snug" style={{ color: B.text }}>{tab.title}</p>
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: B.textSub }}>{tab.desc}</p>
            <div className="flex flex-col gap-2.5">
              {tab.bullets.map(b => (
                <div key={b} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: B.purpleSoft }}>
                    <Check className="w-2.5 h-2.5" style={{ color: B.purple }} strokeWidth={3} />
                  </div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: B.textSub }}>{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${B.borderSoft}` }}>
            <div className="px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
              <p className="text-[10px] font-[700] tracking-[0.14em] uppercase" style={{ ...MONO, color: B.textMuted }}>{tab.visualLabel}</p>
            </div>
            <div className="p-4 flex flex-col gap-2" style={{ background: B.surface }}>
              {tab.visualRows.map(row => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: B.softBg }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: B.purpleSoft }}>
                    <row.Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
                  </div>
                  <p className="flex-1 text-[12px] font-[600]" style={{ color: B.text }}>{row.label}</p>
                  <span className="text-[10px] font-[700] px-2 py-0.5 rounded-full" style={{ background: B.purpleSoft, color: B.purple }}>{row.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 4. EVIDENCIA OPERATIVA ────────────────────────────────────────────────────
const EVIDENCIA_ROWS = [
  { time: "14:32", area: "Finanzas", agent: "Ag. Financiero",  model: "ChatGPT",      policy: "Política costos",           status: "Validado",        sc: B.green,  sb: "#F0FDF4" },
  { time: "14:28", area: "Legal",    agent: "Ag. Legal",       model: "Claude",  policy: "Política confidencialidad", status: "Revisión humana", sc: B.amber,  sb: B.amberSoft },
  { time: "14:21", area: "TI",       agent: "Ag. DevOps",      model: "Modelo local", policy: "Política interna",          status: "Aprobado",        sc: B.purple, sb: B.purpleSoft },
  { time: "14:09", area: "RRHH",     agent: "Ag. Onboarding",  model: "ChatGPT",      policy: "Política RRHH",             status: "Validado",        sc: B.green,  sb: "#F0FDF4" },
];

function SectionEvidenciaOperativa() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="gobierno-auditoria" ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Evidencia operativa</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Qué evidencia deja cada interacción
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Área, agente, modelo, política aplicada y estado — registrados en tiempo real.
          </p>
        </motion.div>

        <motion.div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 24px rgba(109,43,255,0.06)" }}
          initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <div className="overflow-x-auto">
          <div className="min-w-[680px]">
          <div className="grid px-6 py-3" style={{ gridTemplateColumns: "70px 1fr 1fr 1fr 1fr 120px", borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
            {["Hora", "Área / Agente", "Modelo", "Política", "Estado", "Evidencia"].map((h, i) => (
              <p key={i} className="text-[10px] font-[700] tracking-[0.1em] uppercase" style={{ ...MONO, color: B.textMuted }}>{h}</p>
            ))}
          </div>
          {EVIDENCIA_ROWS.map((r, i) => (
            <motion.div key={i} className="grid px-6 py-3 items-center"
              style={{ gridTemplateColumns: "70px 1fr 1fr 1fr 1fr 120px", borderBottom: i < EVIDENCIA_ROWS.length - 1 ? `1px solid ${B.borderSoft}` : "none" }}
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
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-10 py-16 md:py-28 text-center">
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
            style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
            <Shield className="w-3 h-3" style={{ color: B.purple }} strokeWidth={2} />
            KRNL — Gobierno de IA
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-5"
          style={{ fontSize: "clamp(26px, 3.8vw, 46px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Opera IA con reglas, evidencia y control.
        </motion.h2>
        <motion.p className="leading-relaxed mb-10 mx-auto"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 500 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
          KRNL permite pasar de herramientas dispersas a una operación de IA gobernada, trazable y segura.
        </motion.p>
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button onClick={() => krnlNavigate("producto")}
            className="inline-flex items-center gap-1.5 text-[14px] font-[600] transition-colors hover:underline underline-offset-4"
            style={{ background: "none", border: "none", padding: 0, color: B.purple }}>
            Ver producto <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
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
      <SectionModuloGobierno />
      <SectionEvidenciaOperativa />
      <CTAFinalGobierno />
      <KrnlFooter />
    </div>
  );
}
