import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight, Shield, Bot, Database, Workflow, DollarSign, FileText,
  Box, Eye, CheckCircle2, AlertTriangle, Lock, Activity, BarChart3,
  Users, Server, Layers, Clock, Settings, RefreshCw, Check, X,
  MessageSquare, Globe,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
import KrnlFooter from "./KrnlFooter";

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
  { area: "Finanzas", agent: "Ag. Financiero", model: "GPT-4o",      policy: "Política costos",            status: "Validado",         sc: B.green,   sb: "#F0FDF4" },
  { area: "Legal",    agent: "Ag. Legal",      model: "Claude 3.5",  policy: "Política confidencialidad",  status: "Revisión humana",  sc: B.amber,   sb: B.amberSoft },
  { area: "TI",       agent: "Ag. DevOps",     model: "Llama local", policy: "Política interna",           status: "Aprobado",         sc: B.purple,  sb: B.purpleSoft },
];

const MODEL_BARS = [
  { name: "GPT-4o",    w: "65%", col: B.purple  },
  { name: "Claude 3.5",w: "42%", col: B.magenta },
  { name: "Llama local",w:"28%", col: B.sky     },
];

function GovControlCenter({ inV }: { inV: boolean }) {
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 24px 80px rgba(109,43,255,0.12)" }}>

      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
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
      <div className="grid grid-cols-3 gap-2 p-4 pb-3">
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

      <div className="relative z-10 max-w-[1200px] mx-auto px-10 grid grid-cols-2 gap-14 items-center">
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
            KRNL aplica políticas, guardrails, auditoría, observabilidad y control de costos para que la IA opere con trazabilidad, seguridad y supervisión empresarial.
          </motion.p>

          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.03]"
              style={{ background: GRAD, boxShadow: `0 6px 26px ${B.purple}38` }}>
              Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[500] text-[14px] transition-all hover:scale-[1.02]"
              style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              Ver capa de control
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease }}>
          <GovControlCenter inV={inV} />
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. QUÉ GOBIERNA KRNL ──────────────────────────────────────────────────────
const GOV_CARDS = [
  { Icon: Box,      col: B.purple,  title: "Modelos",          desc: "Controla qué LLM usa cada área, agente o flujo." },
  { Icon: Bot,      col: B.magenta, title: "Agentes",          desc: "Define permisos, estados y reglas para cada agente corporativo." },
  { Icon: Database, col: B.sky,     title: "Datos",            desc: "Aplica acceso seguro a documentos, bases vectoriales y contexto institucional." },
  { Icon: Workflow, col: B.purple,  title: "Automatizaciones", desc: "Supervisa workflows, triggers y acciones ejecutadas en sistemas reales." },
  { Icon: DollarSign, col: B.amber, title: "Costos",           desc: "Observa consumo por modelo, equipo, agente o caso de uso." },
  { Icon: FileText, col: B.magenta, title: "Decisiones",       desc: "Registra entradas, salidas, contexto, modelo usado y resultado." },
];

function SectionQueGobierna() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="gobierno-costos">Alcance del gobierno</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Gobierno sobre toda la operación de IA
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL no gobierna solo respuestas. Gobierna modelos, agentes, datos, flujos, costos y decisiones.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {GOV_CARDS.map(({ Icon, col, title, desc }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.1, ease }}
              whileHover={{ y: -5, borderColor: `${col}40`, boxShadow: `0 14px 40px rgba(109,43,255,0.10)`, transition: { duration: 0.2 } }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${col}55, transparent)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${col}18`, border: `1px solid ${col}28` }}>
                <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <h3 className="text-[15px] font-[800] mb-2" style={{ color: B.text }}>{title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. POLICY ENGINE ──────────────────────────────────────────────────────────
const FLOW_STEPS = [
  { label: "Usuario / Sistema",   sub: "Solicitud entrante",     col: B.textSub,  Icon: Users,       isCore: false },
  { label: "Policy Engine KRNL",  sub: "Reglas y permisos",      col: B.purple,   Icon: Shield,      isCore: true  },
  { label: "Validación RBAC",     sub: "Acceso y roles",         col: B.purple,   Icon: CheckCircle2,isCore: false },
  { label: "Guardrails",          sub: "Seguridad y límites",    col: B.magenta,  Icon: Lock,        isCore: false },
  { label: "Modelo IA",           sub: "Generación controlada",  col: B.sky,      Icon: Box,         isCore: false },
  { label: "Respuesta auditada",  sub: "Log inmutable",          col: B.green,    Icon: FileText,    isCore: false },
  { label: "Supervisión humana",  sub: "Si aplica",              col: B.amber,    Icon: Eye,         isCore: false },
];

const POLICY_CHIPS = ["RBAC", "Guardrails", "Auditoría", "Human in the loop"];

function SectionPolicyEngine() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Policy Engine</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Políticas antes de que la IA actúe
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Define reglas por área, usuario, agente, modelo, tipo de dato o nivel de riesgo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-14 items-start">
          {/* Left: flow */}
          <div>
            <div className="flex flex-col">
              {FLOW_STEPS.map((step, i) => {
                const StepIcon = step.Icon;
                return (
                  <div key={step.label}>
                    <motion.div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: step.isCore ? GRAD : "rgba(255,255,255,0.88)",
                        border: step.isCore ? "none" : `1px solid ${B.borderSoft}`,
                        boxShadow: step.isCore ? `0 6px 24px ${B.purple}35` : "none",
                      }}
                      initial={{ opacity: 0, x: -12 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: step.isCore ? "rgba(255,255,255,0.22)" : `${step.col}18` }}>
                        <StepIcon className="w-4 h-4" style={{ color: step.isCore ? "#fff" : step.col }} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] font-[700]"
                          style={{ color: step.isCore ? "#fff" : B.text }}>{step.label}</p>
                        <p className="text-[10px]"
                          style={{ color: step.isCore ? "rgba(255,255,255,0.72)" : B.textMuted }}>{step.sub}</p>
                      </div>
                      {step.isCore && (
                        <span className="text-[9px] font-[700] px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.22)", color: "#fff" }}>Core</span>
                      )}
                    </motion.div>

                    {i < FLOW_STEPS.length - 1 && (
                      <motion.div className="flex justify-start pl-7 py-0.5"
                        style={{ transformOrigin: "top" }}
                        initial={{ opacity: 0, scaleY: 0 }} animate={inV ? { opacity: 1, scaleY: 1 } : {}}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.28, ease: easeL }}>
                        <div className="w-px h-5" style={{ background: `linear-gradient(180deg, ${step.isCore ? B.purple : B.border}, ${B.border})` }} />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chips */}
            <motion.div className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.4, ease }}>
              {POLICY_CHIPS.map(chip => (
                <span key={chip} className="text-[11px] font-[700] px-3 py-1.5 rounded-full"
                  style={{ background: B.purpleSoft, color: B.purple, border: `1px solid ${B.purple}25` }}>
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: description cards */}
          <motion.div className="flex flex-col gap-4 pt-2"
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25, ease }}>
            {[
              { Icon: Shield,   col: B.purple,  title: "Gobierno por área y rol", desc: "Cada área puede tener sus propias reglas, modelos permitidos y niveles de acceso definidos por el administrador." },
              { Icon: Lock,     col: B.magenta, title: "Guardrails configurables", desc: "Las reglas se aplican antes y después de cada respuesta, reduciendo exposición de datos y respuestas fuera de política." },
              { Icon: FileText, col: B.sky,     title: "Auditoría automática",    desc: "Cada interacción genera un registro inmutable con contexto, modelo, política aplicada y estado final." },
              { Icon: Eye,      col: B.amber,   title: "Revisión humana activa",  desc: "Cuando una acción supera el umbral de riesgo configurado, KRNL pausa y escala para revisión humana antes de proceder." },
            ].map(({ Icon, col, title, desc }, i) => (
              <motion.div key={title} className="flex gap-4 rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}` }}
                initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.4, ease }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${col}18`, border: `1px solid ${col}25` }}>
                  <Icon className="w-4 h-4" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[13px] font-[700] mb-1" style={{ color: B.text }}>{title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4. GUARDRAILS ─────────────────────────────────────────────────────────────
const GUARDRAIL_BLOCKS = [
  { Icon: Shield,   col: B.purple,  title: "Entrada segura",       desc: "Evalúa solicitudes antes de enviarlas al modelo. Detecta contenido fuera de política antes del procesamiento." },
  { Icon: CheckCircle2, col: B.green, title: "Respuesta validada", desc: "Revisa salidas antes de que lleguen a usuarios o sistemas. Garantiza coherencia con las reglas configuradas." },
  { Icon: Lock,     col: B.magenta, title: "Datos protegidos",    desc: "Evita exposición de información sensible fuera de las políticas configuradas por el equipo de seguridad." },
  { Icon: Eye,      col: B.amber,   title: "Acciones controladas", desc: "Aplica revisión humana cuando una acción impacta sistemas críticos o supera el umbral de riesgo definido." },
];

const PIPELINE_STAGES = [
  { label: "Solicitud entrante", status: "check",  note: "Evaluada" },
  { label: "Análisis de contenido", status: "check", note: "Limpio" },
  { label: "Generación de respuesta", status: "warn", note: "En revisión" },
  { label: "Verificación de datos", status: "check", note: "Seguro" },
];

function SectionGuardrails() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="gobierno-guardrails">Guardrails y seguridad</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Guardrails para reducir riesgo antes, durante y después de la interacción
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 items-start">
          {/* Left: 4 blocks */}
          <div className="flex flex-col gap-4">
            {GUARDRAIL_BLOCKS.map(({ Icon, col, title, desc }, i) => (
              <motion.div key={title} className="flex gap-4 rounded-2xl p-5"
                style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                initial={{ opacity: 0, x: -12 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.45, ease }}
                whileHover={{ x: 3, borderColor: `${col}35`, transition: { duration: 0.18 } }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${col}18`, border: `1px solid ${col}25` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[14px] font-[700] mb-1" style={{ color: B.text }}>{title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: validation pipeline visual */}
          <motion.div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 36px rgba(109,43,255,0.08)" }}
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }}>
            <div className="px-5 py-4" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
              <p className="text-[11px] font-[600]" style={{ ...MONO, color: B.textMuted }}>Pipeline de validación KRNL</p>
            </div>
            <div className="p-5 flex flex-col gap-0">
              {PIPELINE_STAGES.map(({ label, status, note }, i) => (
                <div key={label}>
                  <motion.div className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: status === "warn" ? `${B.amber}0C` : `${B.green}0C`, border: `1px solid ${status === "warn" ? B.amber + "25" : B.green + "25"}` }}
                    initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: status === "warn" ? B.amberSoft : B.greenSoft }}>
                      {status === "warn"
                        ? <AlertTriangle className="w-3.5 h-3.5" style={{ color: B.amber }} strokeWidth={2} />
                        : <Check className="w-3.5 h-3.5" style={{ color: B.green }} strokeWidth={2.5} />}
                    </div>
                    <p className="flex-1 text-[12px] font-[600]" style={{ color: B.text }}>{label}</p>
                    <span className="text-[10px] font-[700] px-2 py-0.5 rounded-full"
                      style={{ background: status === "warn" ? B.amberSoft : B.greenSoft, color: status === "warn" ? B.amber : B.green }}>
                      {note}
                    </span>
                  </motion.div>
                  {i < PIPELINE_STAGES.length - 1 && (
                    <motion.div className="flex justify-start pl-7 py-1"
                      style={{ transformOrigin: "top" }}
                      initial={{ opacity: 0, scaleY: 0 }} animate={inV ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.25, ease: easeL }}>
                      <div className="w-px h-4" style={{ background: B.border }} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <div className="mx-5 mb-5 rounded-xl px-4 py-3" style={{ background: B.purpleSoft }}>
              <p className="text-[11px] font-[600]" style={{ color: B.purple }}>
                Cada etapa se configura por área, modelo y nivel de riesgo desde el Policy Engine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4b. CIBERSEGURIDAD ORIÓN ──────────────────────────────────────────────────
const CIBER_CARDS = [
  { Icon: Lock,     col: B.purple,  bg: B.purpleSoft,  title: "Hardening de accesos",  desc: "Control de permisos, roles, accesos seguros y configuración de privilegios para usuarios, agentes y administradores." },
  { Icon: Globe,    col: B.sky,     bg: `${B.sky}15`,  title: "Protección de redes",   desc: "Configuración segura para entornos cloud, on-premise o infraestructura híbrida del cliente." },
  { Icon: Database, col: B.magenta, bg: B.magentaSoft, title: "Cifrado corporativo",   desc: "Protección de documentos, bases de conocimiento, contexto institucional y registros de interacción." },
  { Icon: Activity, col: B.green,   bg: "#F0FDF4",     title: "Monitoreo 24/7",        desc: "Observabilidad técnica sobre disponibilidad, latencia, eventos críticos y continuidad operacional." },
];

const SEC_LAYERS = [
  { label: "Usuario / Agente", Icon: Users,    col: B.textSub, note: "Origen",     isCore: false },
  { label: "Accesos",          Icon: Lock,     col: B.purple,  note: "Hardening",  isCore: false },
  { label: "Red",              Icon: Globe,    col: B.sky,     note: "Segura",     isCore: false },
  { label: "Cifrado",          Icon: Database, col: B.magenta, note: "E2E",        isCore: false },
  { label: "Monitoreo",        Icon: Activity, col: B.green,   note: "24/7",       isCore: false },
  { label: "KRNL Core",        Icon: Shield,   col: B.purple,  note: "Gobernado",  isCore: true  },
];

const CERT_CHIPS = ["ISO 27001", "ISO 9001", "26 años", "Casos productivos"];

function SectionCiberseguridad() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="gobierno-ciberseguridad" ref={ref} style={{ background: `linear-gradient(160deg, #FDFAFF 0%, ${B.purpleSoft}28 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Ciberseguridad Orión</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Ciberseguridad integrada al gobierno de IA
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 580, margin: "0 auto" }}>
            KRNL se implementa con el respaldo de Orión, incorporando hardening de accesos, redes, cifrado, monitoreo y prácticas de seguridad enterprise desde la infraestructura del cliente.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Left: 2×2 cards + respaldo */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {CIBER_CARDS.map(({ Icon, col, bg, title, desc }, i) => {
                const CIcon = Icon;
                return (
                  <motion.div key={title} className="relative overflow-hidden rounded-2xl p-5"
                    style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(109,43,255,0.04)" }}
                    initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
                    whileHover={{ y: -4, borderColor: `${col}35`, boxShadow: `0 12px 36px rgba(109,43,255,0.09)`, transition: { duration: 0.2 } }}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${col}55, transparent)` }} />
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: bg, border: `1px solid ${col}25` }}>
                      <CIcon className="w-4 h-4" style={{ color: col }} strokeWidth={1.75} />
                    </div>
                    <p className="text-[14px] font-[800] mb-2" style={{ color: B.text }}>{title}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Respaldo institucional */}
            <motion.div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: B.surface, border: `1px solid ${B.purple}22`, boxShadow: "0 4px 20px rgba(109,43,255,0.07)" }}
              initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.58, ease }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: GRAD }} />
              <div className="ml-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: B.purpleSoft }}>
                    <Shield className="w-3.5 h-3.5" style={{ color: B.purple }} strokeWidth={1.75} />
                  </div>
                  <p className="text-[13px] font-[800]" style={{ color: B.text }}>Respaldado por Orión</p>
                </div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: B.textSub }}>
                  Orión aporta experiencia en implementación, integración, ciberseguridad y operación continua, con certificaciones ISO 27001 e ISO 9001, 26 años de experiencia y casos productivos como Salfa Corp.
                </p>
                <div className="flex flex-wrap gap-2">
                  {CERT_CHIPS.map(c => (
                    <span key={c} className="text-[10px] font-[700] px-2.5 py-1 rounded-full"
                      style={{ background: B.purpleSoft, color: B.purple, border: `1px solid ${B.purple}25` }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Security Layer visual */}
          <motion.div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.93)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.08)" }}
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25, ease }}>
            <div className="px-5 py-3.5" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
              <p className="text-[11px] font-[600]" style={{ ...MONO, color: B.textMuted }}>Orión Security Layer — KRNL</p>
            </div>
            <div className="p-5 flex flex-col">
              {SEC_LAYERS.map(({ label, Icon, col, note, isCore }, i) => {
                const SIcon = Icon;
                return (
                  <div key={label}>
                    <motion.div className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: isCore ? GRAD : `${col}0A`,
                        border: isCore ? "none" : `1px solid ${col}22`,
                        boxShadow: isCore ? `0 4px 20px ${B.purple}30` : "none",
                      }}
                      initial={{ opacity: 0, x: 10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.09, duration: 0.4, ease }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: isCore ? "rgba(255,255,255,0.20)" : `${col}22` }}>
                        <SIcon className="w-4 h-4" style={{ color: isCore ? "#fff" : col }} strokeWidth={1.75} />
                      </div>
                      <p className="flex-1 text-[13px] font-[700]"
                        style={{ color: isCore ? "#fff" : B.text }}>{label}</p>
                      <span className="text-[9px] font-[700] px-2 py-0.5 rounded-full"
                        style={{ background: isCore ? "rgba(255,255,255,0.22)" : `${col}18`, color: isCore ? "#fff" : col }}>
                        {note}
                      </span>
                    </motion.div>
                    {i < SEC_LAYERS.length - 1 && (
                      <motion.div className="flex justify-start pl-7 py-1"
                        style={{ transformOrigin: "top" }}
                        initial={{ opacity: 0, scaleY: 0 }} animate={inV ? { opacity: 1, scaleY: 1 } : {}}
                        transition={{ delay: 0.58 + i * 0.09, duration: 0.28, ease: easeL }}>
                        <div className="w-px h-5" style={{ background: B.border }} />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mx-5 mb-5 rounded-xl px-3 py-2.5" style={{ background: B.purpleSoft }}>
              <p className="text-[10px] font-[600]" style={{ color: B.purple }}>
                Cada capa se configura e implementa según la infraestructura y política de seguridad del cliente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 5. AUDITORÍA Y TRAZABILIDAD ───────────────────────────────────────────────
const AUDIT_TABLE = [
  { time: "14:32", area: "Finanzas", agent: "Ag. Financiero",   model: "GPT-4o",       policy: "Política costos",           status: "Validado",        sc: B.green,  sb: "#F0FDF4" },
  { time: "14:28", area: "Legal",    agent: "Ag. Legal",        model: "Claude 3.5",   policy: "Política confidencialidad", status: "Revisión humana", sc: B.amber,  sb: B.amberSoft },
  { time: "14:21", area: "TI",       agent: "Ag. DevOps",       model: "Llama local",  policy: "Política interna",          status: "Aprobado",        sc: B.purple, sb: B.purpleSoft },
  { time: "14:09", area: "RRHH",     agent: "Ag. Onboarding",   model: "GPT-4o",       policy: "Política RRHH",             status: "Validado",        sc: B.green,  sb: "#F0FDF4" },
  { time: "13:58", area: "Ops",      agent: "Ag. Operaciones",  model: "Gemini 1.5",   policy: "Política operaciones",      status: "Aprobado",        sc: B.purple, sb: B.purpleSoft },
];

function SectionAuditoria() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="gobierno-auditoria" ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}20 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Auditoría y trazabilidad</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Cada interacción deja evidencia
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL registra qué ocurrió, quién participó, qué modelo respondió, con qué contexto y bajo qué reglas.
          </p>
        </motion.div>

        <motion.div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.07)" }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
          {/* Table header */}
          <div className="grid px-6 py-3" style={{ gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 130px", borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
            {["Hora", "Área / Agente", "Modelo", "Política", "Estado", ""].map((h, i) => (
              <p key={i} className="text-[10px] font-[700] tracking-[0.12em] uppercase" style={{ ...MONO, color: B.textMuted }}>{h}</p>
            ))}
          </div>
          {/* Rows */}
          {AUDIT_TABLE.map((r, i) => (
            <motion.div key={i} className="grid px-6 py-3.5 items-center"
              style={{ gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 130px", borderBottom: i < AUDIT_TABLE.length - 1 ? `1px solid ${B.borderSoft}` : "none" }}
              initial={{ opacity: 0, x: -8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.38, ease }}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 shrink-0" style={{ color: B.textMuted }} strokeWidth={1.75} />
                <span className="text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>{r.time}</span>
              </div>
              <div>
                <p className="text-[12px] font-[700]" style={{ color: B.text }}>{r.area}</p>
                <p className="text-[10px]" style={{ color: B.textMuted }}>{r.agent}</p>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded font-[600] inline-block"
                style={{ background: B.purpleSoft, color: B.purple }}>{r.model}</span>
              <p className="text-[11px]" style={{ color: B.textSub }}>{r.policy}</p>
              <StatusChip label={r.status} color={r.sc} bg={r.sb} />
              <div className="flex items-center gap-1 justify-end">
                <span className="text-[10px]" style={{ color: B.textMuted }}>Log disponible</span>
                <Check className="w-3 h-3" style={{ color: B.green }} strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div className="flex items-center justify-center gap-6 mt-6"
          initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ delay: 0.65, duration: 0.4 }}>
          {[["Validado", B.green, "#F0FDF4"], ["Revisión humana", B.amber, B.amberSoft], ["Aprobado", B.purple, B.purpleSoft]].map(([l, c, bg]) => (
            <StatusChip key={l} label={l} color={c} bg={bg} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 6. OBSERVABILIDAD Y CONTROL DE COSTOS ─────────────────────────────────────
const MODEL_USAGE = [
  { name: "GPT-4o",      w: "68%", col: B.purple  },
  { name: "Claude 3.5",  w: "45%", col: B.magenta },
  { name: "Gemini 1.5",  w: "30%", col: B.sky     },
  { name: "Llama local", w: "22%", col: B.amber   },
];
const AREA_USAGE = [
  { name: "Legal",       w: "58%", col: B.purple  },
  { name: "Finanzas",    w: "50%", col: B.magenta },
  { name: "TI",          w: "42%", col: B.sky     },
  { name: "Operaciones", w: "32%", col: B.amber   },
  { name: "RRHH",        w: "24%", col: B.green   },
];

function SectionObservabilidad() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Observabilidad y costos</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Gobierno también es saber cuánto cuesta operar IA
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL entrega visibilidad sobre consumo, uso, latencia y eficiencia por modelo, agente o área.
          </p>
        </motion.div>

        <motion.div className="rounded-2xl overflow-hidden"
          style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 36px rgba(109,43,255,0.07)" }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
          {/* Dashboard top bar */}
          <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
            <BarChart3 className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
            <span className="text-[12px] font-[600]" style={{ color: B.text }}>AIOps Dashboard</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.green }} />
              <span className="text-[10px]" style={{ color: B.textMuted }}>Tiempo real</span>
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-4 gap-px" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.border }}>
            {[
              { label: "Modelos activos",   val: "4",   Icon: Box,      col: B.purple  },
              { label: "Áreas con uso",     val: "5",   Icon: Users,    col: B.magenta },
              { label: "Agentes operando",  val: "14",  Icon: Bot,      col: B.sky     },
              { label: "Alertas activas",   val: "1",   Icon: AlertTriangle, col: B.amber },
            ].map(({ label, val, Icon, col }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4" style={{ background: B.surface }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${col}15` }}>
                  <Icon className="w-4 h-4" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[18px] font-[800]" style={{ color: col }}>{val}</p>
                  <p className="text-[10px]" style={{ color: B.textMuted }}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-0" style={{ borderBottom: `1px solid ${B.borderSoft}` }}>
            {/* Model usage */}
            <div className="px-6 py-5" style={{ borderRight: `1px solid ${B.borderSoft}` }}>
              <p className="text-[11px] font-[700] mb-4 uppercase tracking-[0.12em]" style={{ ...MONO, color: B.textMuted }}>Uso por modelo</p>
              <div className="flex flex-col gap-3">
                {MODEL_USAGE.map(({ name, w, col }, i) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-[500]" style={{ color: B.textSub }}>{name}</span>
                      <span className="text-[10px] font-[600]" style={{ color: col }}>Activo</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: B.border }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${col}aa, ${col})` }}
                        initial={{ width: "0%" }} animate={inV ? { width: w } : {}}
                        transition={{ duration: 1.0, delay: 0.4 + i * 0.1, ease: easeL }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Area consumption */}
            <div className="px-6 py-5">
              <p className="text-[11px] font-[700] mb-4 uppercase tracking-[0.12em]" style={{ ...MONO, color: B.textMuted }}>Consumo por área</p>
              <div className="flex flex-col gap-3">
                {AREA_USAGE.map(({ name, w, col }, i) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-[500]" style={{ color: B.textSub }}>{name}</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: B.border }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${col}aa, ${col})` }}
                        initial={{ width: "0%" }} animate={inV ? { width: w } : {}}
                        transition={{ duration: 1.0, delay: 0.5 + i * 0.1, ease: easeL }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latency + Budget alerts */}
          <div className="grid grid-cols-2 gap-px" style={{ background: B.border }}>
            <div className="flex items-center gap-3 px-6 py-4" style={{ background: B.surface }}>
              <Activity className="w-4 h-4 shrink-0" style={{ color: B.purple }} strokeWidth={1.75} />
              <div>
                <p className="text-[12px] font-[700]" style={{ color: B.text }}>Latencia promedio</p>
                <p className="text-[11px]" style={{ color: B.textSub }}>Dentro de los umbrales configurados</p>
              </div>
              <span className="ml-auto text-[10px] font-[700] px-2 py-0.5 rounded-full"
                style={{ background: B.greenSoft, color: B.green }}>Normal</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4" style={{ background: B.surface }}>
              <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: B.amber }} strokeWidth={1.75} />
              <div>
                <p className="text-[12px] font-[700]" style={{ color: B.text }}>Alerta de presupuesto</p>
                <p className="text-[11px]" style={{ color: B.textSub }}>Área Legal próxima al límite configurado</p>
              </div>
              <span className="ml-auto text-[10px] font-[700] px-2 py-0.5 rounded-full"
                style={{ background: B.amberSoft, color: B.amber }}>Revisar</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 7. ROLES Y SUPERVISIÓN HUMANA ─────────────────────────────────────────────
const ROLES = [
  {
    Icon: Settings, col: B.purple,  chip: "Acceso total",
    name: "Admin",
    perms: ["Crear y eliminar políticas", "Gestionar usuarios y áreas", "Ver todos los logs y costos"],
    scope: "Sistema completo",
  },
  {
    Icon: Shield,   col: B.magenta, chip: "Gestión",
    name: "Owner",
    perms: ["Publicar y aprobar agentes", "Modificar configuraciones", "Ver costos por área"],
    scope: "Área asignada",
  },
  {
    Icon: FileText, col: B.sky,     chip: "Creación",
    name: "Editor",
    perms: ["Crear y editar agentes", "Configurar flujos", "Gestionar bajo política activa"],
    scope: "Proyectos asignados",
  },
  {
    Icon: Eye,      col: B.green,   chip: "Lectura",
    name: "Viewer",
    perms: ["Ver interacciones y resultados", "Consultar métricas", "Sin capacidad de modificación"],
    scope: "Vista de solo lectura",
  },
  {
    Icon: CheckCircle2, col: B.amber, chip: "Revisión",
    name: "Revisor humano",
    perms: ["Aprobar o rechazar interacciones críticas", "Escalar para decisión ejecutiva"],
    scope: "Flujos marcados para revisión",
  },
];

const LIFECYCLE = [
  { label: "Borrador",          Icon: FileText,   col: B.textMuted },
  { label: "Validación",        Icon: Shield,     col: B.purple    },
  { label: "Producción",        Icon: Activity,   col: B.green     },
  { label: "Monitoreo",         Icon: Eye,        col: B.sky       },
  { label: "Mejora continua",   Icon: RefreshCw,  col: B.magenta   },
];

function SectionRoles() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Roles y supervisión humana</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            Control humano donde importa
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL permite definir quién puede crear, aprobar, publicar, ejecutar o revisar agentes y automatizaciones.
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-5 gap-3 mb-12">
          {ROLES.map(({ Icon, col, chip, name, perms, scope }, i) => (
            <motion.div key={name} className="rounded-2xl p-4 flex flex-col"
              style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 10px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.45, ease }}
              whileHover={{ y: -4, borderColor: `${col}35`, boxShadow: `0 12px 32px rgba(109,43,255,0.10)`, transition: { duration: 0.18 } }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${col}18`, border: `1px solid ${col}25` }}>
                  <Icon className="w-4 h-4" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <span className="text-[9px] font-[700] px-2 py-0.5 rounded-full"
                  style={{ background: `${col}18`, color: col }}>{chip}</span>
              </div>
              <p className="text-[13px] font-[800] mb-2" style={{ color: B.text }}>{name}</p>
              <div className="flex flex-col gap-1.5 flex-1 mb-3">
                {perms.map(p => (
                  <div key={p} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: col }} strokeWidth={2.5} />
                    <p className="text-[10px] leading-snug" style={{ color: B.textSub }}>{p}</p>
                  </div>
                ))}
              </div>
              <p className="text-[9px] px-2 py-1 rounded-lg text-center"
                style={{ background: B.softBg, color: B.textMuted }}>{scope}</p>
            </motion.div>
          ))}
        </div>

        {/* Lifecycle flow */}
        <div className="relative">
          <p className="text-center text-[11px] font-[700] tracking-[0.18em] uppercase mb-8" style={{ ...MONO, color: B.textMuted }}>Ciclo de vida del agente</p>
          <div className="absolute top-[72px] left-0 right-0 h-px" style={{ background: B.border }} />
          <motion.div className="absolute top-[72px] left-0 h-px"
            style={{ background: `linear-gradient(90deg, ${B.purple}, ${B.magenta})`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: easeL }} />
          <div className="relative grid grid-cols-5">
            {LIFECYCLE.map(({ label, Icon, col }, i) => {
              const LIcon = Icon;
              return (
                <motion.div key={label} className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.4, ease }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center z-10 mb-4"
                    style={{ background: B.surface, border: `2px solid ${col}`, boxShadow: `0 2px 10px ${col}30` }}>
                    <LIcon className="w-4 h-4" style={{ color: col }} strokeWidth={1.75} />
                  </div>
                  <p className="text-[11px] font-[700] text-center" style={{ color: B.text }}>{label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 8. GOBIERNO EN EL CORE KRNL ───────────────────────────────────────────────
const LLM_MODELS   = ["GPT-4o", "Claude 3.5", "Gemini 1.5", "Llama 3.1", "Locales"];
const CORE_ITEMS   = [
  { Icon: Shield,    label: "Gobierno & Guardrails", col: B.purple  },
  { Icon: FileText,  label: "Auditoría & Logs",      col: B.magenta },
  { Icon: Activity,  label: "AIOps & Observabilidad",col: B.sky     },
  { Icon: DollarSign,label: "Control de Costos",     col: B.amber   },
];
const OUTPUT_ITEMS = [
  { Icon: MessageSquare, label: "Chat Multi-LLM", col: B.purple  },
  { Icon: Bot,           label: "Agentes",         col: B.magenta },
  { Icon: Workflow,      label: "Automatizaciones", col: B.sky     },
  { Icon: BarChart3,     label: "Dashboards",      col: B.green   },
];

function Connector({ inV, delay }: { inV: boolean; delay: number }) {
  return (
    <div className="flex justify-center py-3">
      <motion.div style={{ transformOrigin: "top" }}
        initial={{ opacity: 0, scaleY: 0 }} animate={inV ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.45, delay, ease: easeL }}>
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${B.border}, ${B.purple}50)` }} />
          <div className="w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${B.purple}60` }} />
        </div>
      </motion.div>
    </div>
  );
}

function SectionCoreKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[960px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Gobierno en el core</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            El gobierno no es una capa externa.<br />Es parte del core operativo.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            KRNL integra gobierno, guardrails, auditoría, AIOps y control de costos en el centro de la operación de IA empresarial.
          </p>
        </motion.div>

        {/* Tier 1: Models */}
        <motion.div className="flex justify-center gap-2 flex-wrap"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1, ease }}>
          {LLM_MODELS.map((m, i) => (
            <motion.div key={m} className="rounded-xl px-4 py-2.5 text-center"
              style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.38, ease }}>
              <p className="text-[12px] font-[700]" style={{ color: B.text }}>{m}</p>
              <p className="text-[9px]" style={{ color: B.textMuted }}>Modelo LLM</p>
            </motion.div>
          ))}
        </motion.div>

        <Connector inV={inV} delay={0.45} />

        {/* Tier 2: KRNL Core */}
        <motion.div className="rounded-2xl overflow-hidden"
          style={{ background: GRAD, boxShadow: `0 12px 48px ${B.purple}40` }}
          initial={{ opacity: 0, scale: 0.94 }} animate={inV ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.55, ease }}>
          <div className="px-8 py-5 text-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-white" strokeWidth={1.75} />
              <p className="text-[16px] font-[800] text-white">KRNL Core Operativo</p>
            </div>
            <p className="text-[11px] text-white" style={{ opacity: 0.75 }}>Gobierno · Trazabilidad · Soberanía · Control</p>
          </div>
          <div className="grid grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.15)" }}>
            {CORE_ITEMS.map(({ Icon, label }, i) => {
              const CIcon = Icon;
              return (
                <motion.div key={label} className="flex flex-col items-center gap-2 px-4 py-5"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                  initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.08, duration: 0.4, ease }}>
                  <CIcon className="w-5 h-5 text-white" strokeWidth={1.75} />
                  <p className="text-[11px] font-[700] text-center text-white">{label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <Connector inV={inV} delay={0.9} />

        {/* Tier 3: Outputs */}
        <motion.div className="flex justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1.0, ease }}>
          {OUTPUT_ITEMS.map(({ Icon, label, col }, i) => {
            const OIcon = Icon;
            return (
              <motion.div key={label} className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 10px rgba(109,43,255,0.05)" }}
                initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.05 + i * 0.08, duration: 0.38, ease }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${col}18` }}>
                  <OIcon className="w-3.5 h-3.5" style={{ color: col }} strokeWidth={1.75} />
                </div>
                <p className="text-[12px] font-[700]" style={{ color: B.text }}>{label}</p>
              </motion.div>
            );
          })}
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
      <div className="relative z-10 max-w-[720px] mx-auto px-10 py-28 text-center">
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
        <motion.div className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28, ease }}>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03]"
            style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
            Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[500] text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            Ver producto
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
      <SectionQueGobierna />
      <SectionPolicyEngine />
      <SectionGuardrails />
      <SectionCiberseguridad />
      <SectionAuditoria />
      <SectionObservabilidad />
      <SectionRoles />
      <SectionCoreKrnl />
      <CTAFinalGobierno />
      <KrnlFooter />
    </div>
  );
}
