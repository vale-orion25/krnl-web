import { useRef, useState, useEffect, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Shield, FileText, Activity, Lock, Database,
  Users, Workflow, BarChart3, MessageSquare, Bot, Plug, Server,
  CheckCircle2, Layers, Cpu, Settings2, Check,
  TrendingUp, Globe, Zap, Building2, Key, Network, HardDrive,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
import krnlHeroIso from "@/imports/krnl-iso.png";
import orionLogo from "@/imports/orion-logo.png";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";
import { SectionBackground } from "./components/SectionBackground";

// ── Brand tokens (mirror App.tsx) ─────────────────────────────────────────────
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
};
const GRAD  = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO  = { fontFamily: "'JetBrains Mono', monospace" };
const ease  = [0.22, 1, 0.36, 1] as const;
const easeL = [0.4, 0, 0.2, 1]  as const;

// ── Shared primitives ──────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[600] tracking-[0.14em] uppercase"
      style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-[700] tracking-[0.2em] uppercase mb-3"
      style={{ ...MONO, color: B.magenta }}>{children}</p>
  );
}

function Chip({ label, color = B.purple }: { label: string; color?: string }) {
  return (
    <span className="text-[9px] px-2.5 py-1 rounded-full font-[700]"
      style={{ background: `${color}16`, color }}>{label}</span>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────
function HeroProducto() {
  const [selModel, setSelModel] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  const models  = ["Modelo autorizado", "Modelo externo", "Modelo alterno", "Modelo privado"];
  const agents  = [
    { name: "Agente Legal",    s: "Activo",   c: "#22c55e" },
    { name: "Agente Finanzas", s: "Activo",   c: "#22c55e" },
    { name: "Agente RRHH",     s: "Revisión", c: B.magenta },
    { name: "Agente TI",       s: "Activo",   c: "#22c55e" },
  ];
  const stats = [
    { label: "Agentes gobernados",      status: "Activos", Icon: Bot },
    { label: "Políticas centralizadas", status: "Activas", Icon: Shield },
    { label: "Flujos centralizados",    status: "Activos", Icon: Workflow },
    { label: "Dashboards conectados",   status: "Activos", Icon: BarChart3 },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFAFC 0%, #F7F3FD 45%, #FEF6FB 100%)" }}>
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-64 h-40 sm:w-[660px] sm:h-[360px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}90 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-14 -right-16 w-36 h-36 sm:w-60 sm:h-60 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}60 0%, transparent 72%)`, filter: "blur(32px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Badge */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <Badge>Producto KRNL</Badge>
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-center font-[800] leading-[1.06] mb-5"
          style={{ fontSize: "clamp(30px, 4vw, 54px)", color: B.text, maxWidth: 800, margin: "0 auto 20px" }}
          initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Todo lo que tu empresa necesita<br />
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            para operar IA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="text-center mb-10 mx-auto"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 620, lineHeight: 1.65 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          KRNL conecta modelos de IA, agentes, automatizaciones y dashboards en un mismo lugar, listo para crecer con tu operación.
        </motion.p>

        {/* Control center mockup */}
        <motion.div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 24px 80px rgba(109,43,255,0.10)" }}
          initial={{ opacity: 0, y: 32 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.4, ease }}>
          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FC5153" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCBB40" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#33C748" }} />
              <span className="ml-3 text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>KRNL Control Center</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-[10px]" style={{ color: B.textMuted }}>Conceptual</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <div className="py-4 px-3 md:border-r" style={{ borderColor: B.borderSoft }}>
              <p className="text-[9px] font-[700] tracking-[0.18em] uppercase px-2 mb-3" style={{ ...MONO, color: B.textMuted }}>Agentes</p>
              {agents.map((a, i) => (
                <motion.div key={a.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 cursor-pointer"
                  style={{ background: i === 0 ? B.purpleSoft : "transparent" }}
                  initial={{ opacity: 0, x: -8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.07, duration: 0.35, ease }}
                  whileHover={{ background: B.purpleSoft }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.c }} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-[500] truncate" style={{ color: i === 0 ? B.purple : B.text }}>{a.name}</p>
                    <p className="text-[9px]" style={{ color: B.textMuted }}>{a.s}</p>
                  </div>
                </motion.div>
              ))}

              <div className="mt-4 px-2">
                <p className="text-[9px] font-[700] tracking-[0.18em] uppercase mb-2" style={{ ...MONO, color: B.textMuted }}>Trazabilidad</p>
                <div className="flex flex-col gap-1.5">
                  {[["Auditoría", "#22c55e"], ["Guardrails", B.purple], ["Costos", B.magenta]].map(([l, c]) => (
                    <div key={l} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ background: c }} />
                      <span className="text-[10px]" style={{ color: B.textSub }}>{l}</span>
                      <span className="ml-auto text-[9px] font-[600]" style={{ color: c }}>ON</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main area */}
            <div className="p-5">
              {/* Model selector */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <p className="text-[10px] font-[600] mr-1" style={{ ...MONO, color: B.textMuted }}>LLM activo:</p>
                {models.map((m, i) => (
                  <button key={m} onClick={() => setSelModel(i)}
                    className="px-3 py-1 rounded-full text-[11px] font-[500] transition-all"
                    style={{ background: selModel === i ? GRAD : B.softBg, color: selModel === i ? "#fff" : B.textSub, border: `1px solid ${selModel === i ? "transparent" : B.border}` }}>
                    {m}
                  </button>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl p-3 flex flex-col items-center text-center gap-1.5" style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}>
                    <s.Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
                    <p className="text-[11px] font-[700] leading-snug" style={{ color: B.text }}>{s.label}</p>
                    <span className="text-[9px] font-[600] uppercase tracking-wide" style={{ color: B.textMuted }}>{s.status}</span>
                  </div>
                ))}
              </div>

              {/* Bottom 2-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: B.purpleSoft, border: `1px solid ${B.borderSoft}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-3 h-3" style={{ color: B.purple }} strokeWidth={1.75} />
                    <p className="text-[10px] font-[600]" style={{ color: B.purple }}>Políticas activas</p>
                  </div>
                  {["Filtro contenido sensible", "RBAC por área", "Guardrail de salida"].map(p => (
                    <div key={p} className="flex items-center gap-1.5 mb-1">
                      <Check className="w-2.5 h-2.5 shrink-0" style={{ color: "#22c55e" }} strokeWidth={2.5} />
                      <p className="text-[10px]" style={{ color: B.textSub }}>{p}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3" style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3 h-3" style={{ color: B.magenta }} strokeWidth={1.75} />
                    <p className="text-[10px] font-[600]" style={{ color: B.text }}>AIOps en tiempo real</p>
                  </div>
                  {[
                    { t: "Revisión contrato CL-2024", s: "Validado",   c: B.purple  },
                    { t: "Reporte Q2 Finanzas",       s: "Activo",     c: "#22c55e" },
                    { t: "Ticket TI-442",             s: "En revisión", c: B.magenta },
                  ].map(r => (
                    <div key={r.t} className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] truncate mr-2" style={{ color: B.textSub }}>{r.t}</p>
                      <Chip label={r.s} color={r.c} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="px-5 py-2.5 text-[9px]" style={{ color: B.textMuted, borderTop: `1px solid ${B.borderSoft}` }}>
            Ejemplo conceptual de operación · no corresponde a métricas reales
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. PROBLEMA QUE RESUELVE ──────────────────────────────────────────────────
function SectionSolucion() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const blocks = [
    {
      num: "01", Icon: Layers,
      title: "Centraliza modelos y agentes",
      desc: "Conecta distintos modelos, agentes y herramientas desde una capa común de operación.",
    },
    {
      num: "02", Icon: Shield,
      title: "Aplica políticas y trazabilidad",
      desc: "Cada interacción puede operar bajo reglas, permisos, auditoría y evidencia.",
    },
    {
      num: "03", Icon: Workflow,
      title: "Orquesta flujos con control humano",
      desc: "Automatiza procesos sin perder supervisión, validación ni gobierno operativo.",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="producto" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Cómo KRNL lo resuelve</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            KRNL convierte IA dispersa en operación gobernada.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
            Centraliza modelos, agentes, automatizaciones y dashboards en una capa corporativa con soberanía, control y trazabilidad.
          </p>
        </motion.div>

        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="solucionIconGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[#EFEAF2]">
          {blocks.map(({ num, Icon, title, desc }, i) => (
            <motion.div key={title} className="flex flex-col items-center text-center px-6 py-6 md:py-0"
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.14, ease }}>
              <Icon className="w-9 h-9 mb-5" style={{ stroke: "url(#solucionIconGrad)", color: "transparent" }} strokeWidth={1.5} />
              <span className="text-[10.5px] font-[700] uppercase tracking-[0.14em] mb-2" style={{ ...MONO, color: B.textMuted }}>Paso {num}</span>
              <p className="text-[16px] font-[800] mb-2.5 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: B.textSub, maxWidth: 280 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. PROPUESTA DE VALOR ─────────────────────────────────────────────────────
function SectionPropuesta() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const values = [
    {
      Icon: Shield, gradient: `linear-gradient(135deg, ${B.purple}18, ${B.magenta}12)`, borderCol: `${B.purple}30`,
      title: "Gobernanza centralizada sobre toda tu IA",
      desc: "KRNL es la capa corporativa que aplica políticas, guardrails y auditoría sobre cada LLM, agente y flujo operativo. Sin fragmentación.",
      chips: ["Políticas unificadas", "RBAC granular", "Auditoría inmutable"],
    },
    {
      Icon: Database, gradient: `linear-gradient(135deg, ${B.magenta}18, ${B.purple}12)`, borderCol: `${B.magenta}30`,
      title: "Tu conocimiento siempre es tuyo",
      desc: "Los flujos, el contexto y el conocimiento institucional quedan en la plataforma. No dependen de personas ni de proveedores externos.",
      chips: ["Soberanía de datos", "Contexto persistente", "BYOK / On-premise"],
    },
    {
      Icon: Activity, gradient: `linear-gradient(135deg, ${B.purple}14, ${B.magenta}18)`, borderCol: `${B.purple}25`,
      title: "Trazabilidad extendida, sin dependencia de proveedor",
      desc: "Visibilidad centralizada sobre modelos, costos, resultados y riesgos en tiempo real, sin atarte a un LLM o herramienta en particular.",
      chips: ["Multi-modelo", "Control de costos", "AIOps activo"],
    },
  ];

  return (
    <section id="producto-plataforma" ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}35 100%)`, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="producto" />
      <div className="absolute -top-20 right-0 w-48 h-48 sm:w-80 sm:h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magenta}07 0%, transparent 72%)` }} />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Propuesta de valor</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Una plataforma que trabaja para la empresa, no para el proveedor
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {values.map(({ Icon, gradient, borderCol, title, desc, chips }, i) => (
            <motion.div key={title} className="rounded-2xl p-6"
              style={{ background: gradient, border: `1px solid ${borderCol}` }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${B.borderSoft}` }}>
                <Icon className="w-5 h-5" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[15px] font-[700] mb-3 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: B.textSub }}>{desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {chips.map(c => (
                  <span key={c} className="text-[10px] px-2.5 py-0.5 rounded-full font-[500]"
                    style={{ background: "rgba(255,255,255,0.70)", color: B.purple, border: `1px solid ${B.borderSoft}` }}>{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Ícono OpenAI inline — no está disponible en el CDN de Simple Icons, se embebe localmente
export function OpenAIIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 256 260" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M239.184 106.203a64.72 64.72 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.72 64.72 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.67 64.67 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.77 64.77 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483m-97.56 136.338a48.4 48.4 0 0 1-31.105-11.255l1.535-.87l51.67-29.825a8.6 8.6 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601M37.158 197.93a48.35 48.35 0 0 1-5.781-32.589l1.534.921l51.722 29.826a8.34 8.34 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803M23.549 85.38a48.5 48.5 0 0 1 25.58-21.333v61.39a8.29 8.29 0 0 0 4.195 7.316l62.874 36.272l-21.845 12.636a.82.82 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405zm179.466 41.695l-63.08-36.63L161.73 77.86a.82.82 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.54 8.54 0 0 0-4.4-7.213m21.742-32.69l-1.535-.922l-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.72.72 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391zM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87l-51.67 29.825a8.6 8.6 0 0 0-4.246 7.367zm11.868-25.58L128.067 97.3l28.188 16.218v32.434l-28.086 16.218l-28.188-16.218z" />
    </svg>
  );
}

// Ícono Gemini inline — Simple Icons solo da color plano; acá se aplica el degradé azul → violeta pedido
// ── 4. ARQUITECTURA MODULAR ───────────────────────────────────────────────────
function SectionArquitectura() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const layers = [
    {
      label: "Modelos de lenguaje",
      items: [
        { name: "ChatGPT", sub: "OpenAI",    col: "#10A37F", LogoIcon: OpenAIIcon },
        { name: "Claude",  sub: "Anthropic", col: "#C07F56", logo: "https://i.logos-download.com/114232/31117-s2560-aa51d43aaa1664d26ce478638acbf9e7.png/Claude_Logo_2023_icon-s2560.png?dl" },
        { name: "Gemini", sub: "Google", col: "#6C63FF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1920px-Google_Gemini_icon_2025.svg.png" },
        { name: "Modelos locales", sub: "On-premise", col: "#2D3748", logo: "https://cdn.simpleicons.org/ollama/2D3748" },
      ],
      variant: "models",
    },
    {
      label: "KRNL — Core Operativo",
      items: [
        { name: "Gobierno & Guardrails", Icon: Shield,    col: B.purple  },
        { name: "Auditoría & Logs",      Icon: FileText,  col: B.magenta },
        { name: "AIOps & Observabilidad", Icon: Activity,  col: "#0EA5E9" },
        { name: "Control de Costos",     Icon: TrendingUp, col: "#22c55e" },
      ],
      variant: "core",
    },
    {
      label: "Productos KRNL",
      items: [
        { name: "Chat Multi-LLM",     Icon: MessageSquare, col: B.purple  },
        { name: "Agentes Inteligentes", Icon: Bot,         col: B.magenta },
        { name: "Automatizaciones",   Icon: Workflow,      col: "#0EA5E9" },
        { name: "Dashboards",         Icon: BarChart3,     col: "#22c55e" },
      ],
      variant: "products",
    },
    {
      label: "Cliente / Usuario final",
      items: [{ name: "Interacción segura, trazable y gobernada", Icon: CheckCircle2, col: "#22c55e" }],
      variant: "output",
    },
  ];

  const Connector = ({ delay }: { delay: number }) => (
    <div className="flex items-center justify-center py-2">
      <motion.div className="flex flex-col items-center gap-0.5"
        initial={{ opacity: 0, scaleY: 0 }} animate={inV ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.45, delay, ease: easeL }} style={{ transformOrigin: "top" }}>
        <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${B.purple}50, ${B.magenta}50)` }} />
        <div className="w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${B.purple}60` }} />
      </motion.div>
    </div>
  );

  return (
    <section ref={ref} id="producto-arquitectura" className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-24 -left-24 w-64 h-64 sm:w-[420px] sm:h-[420px] rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purple}38 0%, transparent 70%)`, filter: "blur(50px)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-28 -right-28 w-72 h-72 sm:w-[460px] sm:h-[460px] rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magenta}32 0%, transparent 70%)`, filter: "blur(55px)" }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 pt-14 md:pt-20 pb-8 md:pb-10">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="producto-arquitectura">Arquitectura</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Una capa única que conecta todo
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            KRNL se ubica entre los modelos de IA y el usuario final, decidiendo qué modelo usar, con qué contexto y bajo qué reglas.
          </p>
        </motion.div>

        <div className="max-w-[760px] mx-auto">
          {layers.map(({ label, items, variant }, li) => (
            <div key={label}>
              {li > 0 && <Connector delay={0.25 + li * 0.12} />}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + li * 0.14, ease }}>
                <p className="text-center text-[10px] font-[700] tracking-[0.18em] uppercase mb-3"
                  style={{ ...MONO, color: variant === "core" ? B.purple : B.textMuted }}>{label}</p>

                {variant === "core" ? (
                  /* KRNL Core — special gradient card */
                  <div className="rounded-2xl p-5"
                    style={{ background: `linear-gradient(135deg, ${B.purpleSoft} 0%, ${B.magentaSoft} 100%)`, border: `1.5px solid ${B.purple}30`, boxShadow: `0 8px 36px ${B.purple}18` }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
                      <img src={krnlLogo} alt="KRNL" style={{ display: "block", maxWidth: 92, height: "auto", objectFit: "contain" }} />
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: B.purple, opacity: 0.4 }} />
                      <span className="text-[10px] px-3 py-1 rounded-full font-[700] tracking-[0.04em]"
                        style={{ ...MONO, background: "rgba(255,255,255,0.72)", color: B.purple, border: `1px solid ${B.purple}25` }}>Enterprise AI OS</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {items.map(({ name, Icon, col }) => (
                        <div key={name} className="rounded-xl p-3 text-center"
                          style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${B.borderSoft}` }}>
                          {Icon && <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: col }} strokeWidth={1.75} />}
                          <p className="text-[10px] font-[600] leading-snug" style={{ color: B.text }}>{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : variant === "models" ? (
                  /* Models row — proveedores/ecosistemas, no versiones específicas */
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {items.map(({ name, sub, col, logo, LogoIcon }) => (
                      <div key={name} className="flex flex-col items-center justify-center text-center rounded-xl px-5 py-4"
                        style={{ background: B.surface, border: `1px solid ${col}25`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)", width: 132, minHeight: 140 }}>
                        <div className="w-11 h-11 flex items-center justify-center mb-3 shrink-0">
                          {LogoIcon
                            ? <LogoIcon className="w-full h-full" style={{ color: col }} />
                            : <img src={logo} alt={name} className="w-full h-full object-contain" />}
                        </div>
                        <p className="text-[13px] font-[700] leading-tight text-center" translate="no" style={{ color: B.text }}>{name}</p>
                        <p className="text-[10px] mt-0.5 text-center" translate="no" style={{ color: B.textMuted }}>{sub}</p>
                      </div>
                    ))}
                  </div>
                ) : variant === "products" ? (
                  /* Products row */
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {items.map(({ name, Icon, col }) => (
                      <div key={name} className="rounded-xl p-4 text-center"
                        style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 8px rgba(109,43,255,0.04)" }}>
                        {Icon && <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: col }} strokeWidth={1.75} />}
                        <p className="text-[11px] font-[600]" style={{ color: B.text }}>{name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Output */
                  <div className="rounded-2xl p-4 flex items-center justify-center gap-3"
                    style={{ background: "#F0FDF4", border: `1.5px solid #22c55e30` }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "#22c55e" }} strokeWidth={1.75} />
                    <p className="text-[14px] font-[600]" style={{ color: B.text }}>
                      {items[0].name}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4.5 CONSUMO GOBERNADO ─────────────────────────────────────────────────────
const COSTOS_CAPACIDADES = [
  { Icon: Bot,       title: "Consumo por agente",           desc: "Identifica qué agentes concentran mayor uso." },
  { Icon: Users,     title: "Consumo por equipo",            desc: "Observa patrones por área, unidad o flujo de trabajo." },
  { Icon: BarChart3, title: "Comparación por modelo",        desc: "Evalúa costo, rendimiento y conveniencia según tarea." },
  { Icon: Activity,  title: "Trazabilidad por caso de uso",  desc: "Relaciona consumo con operación, contexto y resultado esperado." },
];

function SectionCostosGobernados() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="costosIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4009A" />
            <stop offset="100%" stopColor="#6D2BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative max-w-[1160px] mx-auto px-5 md:px-10 pt-8 md:pt-10 pb-14 md:pb-20">
        <motion.div className="text-center mb-12 max-w-[720px] mx-auto"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Consumo gobernado</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
            De gasto invisible a consumo gobernado.
          </h2>
          <p style={{ color: B.textSub, fontSize: 15.5, lineHeight: 1.65 }}>
            KRNL separa el costo de plataforma del consumo variable de modelos y tokens, permitiendo monitorear uso por agente, equipo, modelo o caso de negocio. El objetivo no es prometer ahorro absoluto, sino entregar visibilidad, trazabilidad y control para decidir dónde conviene usar cada modelo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {COSTOS_CAPACIDADES.map(({ Icon, title, desc }, i) => (
            <motion.div key={title} className="rounded-xl p-5"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 1px 2px rgba(13,21,36,0.03)" }}
              initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.22, ease }}
              whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(13,21,36,0.06)", transition: { duration: 0.2 } }}>
              <Icon className="w-8 h-8 mb-4" style={{ stroke: "url(#costosIconGrad)", color: "transparent" }} strokeWidth={1.6} />
              <p className="text-[13.5px] font-[700] mb-1.5" style={{ color: B.text }}>{title}</p>
              <p className="text-[11.5px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11.5px]" style={{ color: B.textMuted, maxWidth: 620, margin: "0 auto" }}>
          El consumo de modelos o tokens depende del proveedor, volumen de uso, configuración y tipo de tarea.
        </p>
      </div>
    </section>
  );
}

// ── 5. SERVICIOS PROFESIONALES ORIÓN ─────────────────────────────────────────
const TRUST_ITEMS = ["+25 años de experiencia", "ISO 27001", "ISO 9001", "Ciberseguridad", "Implementación enterprise", "Acompañamiento experto", "Empresa B", "EFY / Employers for Youth"];

function SectionServicios() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      Icon: Settings2,
      title: "Implementación",
      desc: "Orión despliega KRNL en tu infraestructura con acompañamiento experto desde el inicio.",
      chips: ["Despliegue cloud / on-premise", "Integración de sistemas"],
    },
    {
      Icon: Activity,
      title: "Monitoreo continuo",
      desc: "Supervisión continua de rendimiento, costos y alertas en tiempo real.",
      chips: ["NOC dedicado", "Alertas proactivas"],
    },
    {
      Icon: Shield,
      title: "Ciberseguridad",
      desc: "Auditorías, hardening y respuesta a incidentes para tu operación de IA.",
      chips: ["Auditoría de seguridad", "Cumplimiento normativo"],
    },
    {
      Icon: Users,
      title: "Gestión del cambio",
      desc: "Capacitación y acompañamiento para que tus equipos adopten IA con confianza.",
      chips: ["Formación de equipos", "Adoption plan"],
    },
    {
      Icon: Cpu,
      title: "FDE as a Service",
      desc: "Un ingeniero dedicado, in-situ, para resolver desafíos técnicos y acelerar tu madurez de IA.",
      chips: ["Ingeniero dedicado", "Aceleración operativa"],
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}18 100%)`, borderTop: `1px solid ${B.border}` }}>
      {/* Background — muy sutil: solo textura de puntos + un halo suave y centrado detrás del sello Orión */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: `radial-gradient(circle, ${B.textMuted}14 1px, transparent 1px)`, backgroundSize: "30px 30px", opacity: 0.3 }} />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[160px] sm:w-[560px] sm:h-[280px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}80 0%, transparent 72%)` }} />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-[960px] mx-auto">

          {/* Bloque institucional Orión — horizontal en desktop: logo a la izquierda, contenido a la derecha */}
          <motion.div className="relative mb-14 rounded-3xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.96)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 20px 56px rgba(109,43,255,0.12)" }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={inV ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.55, delay: 0.06, ease }}>

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 px-7 py-9 sm:px-10 md:px-12 md:py-12 text-center md:text-left">
              {/* Izquierda: logo con presencia */}
              <div className="flex items-center justify-center md:justify-start md:shrink-0" style={{ width: "auto" }}>
                <img src={orionLogo} alt="Orión" style={{ height: 104, width: "auto", display: "block" }} />
              </div>

              {/* Derecha: eyebrow, título, descripción y CTA */}
              <div className="flex-1">
                <SectionLabel>Servicios profesionales</SectionLabel>
                <h2 className="font-[800] mt-3 mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: B.text }}>
                  Respaldado e implementado por Orión
                </h2>
                <p style={{ color: B.textSub, fontSize: 15.5, maxWidth: 460 }} className="mx-auto md:mx-0">
                  +25 años de experiencia en tecnología, ciberseguridad e integración empresarial.
                </p>

                <a href="https://www.orion.global" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-full text-[13px] font-[600] no-underline transition-all"
                  style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = B.purple; e.currentTarget.style.color = B.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.color = B.text; }}>
                  Visitar orion.global <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Franja de confianza institucional */}
            <div className="px-7 py-7 sm:px-10 md:px-12" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                {TRUST_ITEMS.map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-[11px] font-[600] px-3 py-1.5 rounded-full"
                    style={{ background: B.softBg, color: B.textSub }}>
                    <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: B.textMuted }} strokeWidth={2} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bloques de servicio — composición editorial 3 + 2, alineada al mismo ancho del bloque Orión */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {services.slice(0, 3).map(({ Icon, title, desc, chips }, i) => (
                <motion.div key={title} className="rounded-xl p-6"
                  style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 1px 2px rgba(13,21,36,0.03)" }}
                  initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
                  whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(13,21,36,0.06)", transition: { duration: 0.2 } }}>
                  <div className="flex items-center justify-center rounded-lg mb-4" style={{ width: 34, height: 34, background: B.softBg }}>
                    <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.6} />
                  </div>
                  <p className="text-[14px] font-[700] mb-2" style={{ color: B.text }}>{title}</p>
                  <p className="text-[12px] leading-relaxed mb-4" style={{ color: B.textSub }}>{desc}</p>
                  <div className="flex flex-col gap-1 pt-3" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
                    {chips.map(c => (
                      <span key={c} className="text-[10px]" style={{ color: B.textMuted }}>{c}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.slice(3, 5).map(({ Icon, title, desc, chips }, i) => (
                <motion.div key={title} className="rounded-xl p-6"
                  style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 1px 2px rgba(13,21,36,0.03)" }}
                  initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.34 + i * 0.08, ease }}
                  whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(13,21,36,0.06)", transition: { duration: 0.2 } }}>
                  <div className="flex items-center justify-center rounded-lg mb-4" style={{ width: 34, height: 34, background: B.softBg }}>
                    <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.6} />
                  </div>
                  <p className="text-[14px] font-[700] mb-2" style={{ color: B.text }}>{title}</p>
                  <p className="text-[12px] leading-relaxed mb-4" style={{ color: B.textSub }}>{desc}</p>
                  <div className="flex flex-col gap-1 pt-3" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
                    {chips.map(c => (
                      <span key={c} className="text-[10px]" style={{ color: B.textMuted }}>{c}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── 6. CAMINO PROGRESIVO DE ADOPCIÓN ─────────────────────────────────────────
const CAMINO_STAGES = [
  { title: "Acceso oficial a LLMs",     sub: "Gobernanza base",               desc: "Acceso controlado a ChatGPT, Claude, Gemini y modelos locales bajo política corporativa unificada.",   Icon: Globe    },
  { title: "RAG y conocimiento",        sub: "Agentes con contexto propio",    desc: "Knowledge base interna: documentos, bases vectoriales y fuentes propietarias persistentes.", Icon: Database },
  { title: "Tools y sistemas reales",   sub: "Agentes que actúan",             desc: "Integración vía MCP con CRM, ERP, SAP y sistemas internos. Los agentes pueden ejecutar acciones bajo supervisión.", Icon: Plug     },
  { title: "Equipos de agentes",        sub: "Workflows colaborativos",        desc: "Múltiples agentes que pueden coordinarse en flujos continuos para procesos complejos de alto valor.",  Icon: Workflow },
  { title: "Fuerza laboral digital",    sub: "Agentes autónomos 24/7",         desc: "Flota de agentes que puede operar de forma autónoma bajo supervisión, trazabilidad y gobierno.", Icon: Layers  },
];
const CAMINO_CENTER = 2;

function CaminoStageDesktop({ stage, i, inV, reduced }: { stage: typeof CAMINO_STAGES[0]; i: number; inV: boolean; reduced: boolean | null }) {
  const { title, sub, desc, Icon } = stage;
  const isCenter = i === CAMINO_CENTER;
  return (
    <motion.div className="relative flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + i * 0.14, ease }}>
      {/* Node — opaque circle masks the connecting line behind the icon */}
      <motion.div className="relative z-10 flex items-center justify-center rounded-full shrink-0 mb-8"
        style={{ width: 64, height: 64, background: B.surface, boxShadow: `0 0 0 1px ${B.borderSoft}` }}
        whileHover={reduced ? {} : { scale: 1.06, transition: { duration: 0.25, ease } }}>
        {isCenter && (
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ inset: -12, background: `radial-gradient(circle, ${B.purple}22 0%, transparent 72%)` }}
            animate={!reduced ? { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
        )}
        <Icon className="relative w-9 h-9" style={{ stroke: "url(#caminoIconGrad)", color: "transparent" }} strokeWidth={1.4} />
      </motion.div>
      <p className="text-[14.5px] font-[600] mb-1.5 leading-snug" style={{ color: B.text }}>{title}</p>
      <p className="text-[10.5px] font-[500] mb-3" style={{ color: B.magenta, opacity: 0.7 }}>{sub}</p>
      <p className="text-[12px] leading-relaxed font-[300]" style={{ color: B.textSub }}>{desc}</p>
    </motion.div>
  );
}

function CaminoStageVertical({ stage, i, inV, isLast }: { stage: typeof CAMINO_STAGES[0]; i: number; inV: boolean; isLast: boolean }) {
  const { title, sub, desc, Icon } = stage;
  return (
    <motion.div className="relative flex gap-5"
      style={{ paddingBottom: isLast ? 0 : 40 }}
      initial={{ opacity: 0, x: -10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}>
      <div className="flex flex-col items-center shrink-0">
        <div className="relative z-10 flex items-center justify-center rounded-full shrink-0"
          style={{ width: 56, height: 56, background: B.surface, boxShadow: `0 0 0 1px ${B.borderSoft}` }}>
          <Icon className="w-8 h-8" style={{ stroke: "url(#caminoIconGrad)", color: "transparent" }} strokeWidth={1.4} />
        </div>
        {!isLast && <div className="w-px flex-1 mt-3" style={{ background: B.borderSoft, minHeight: 32 }} />}
      </div>
      <div className="pt-3">
        <p className="text-[15px] font-[600] mb-1.5 leading-snug" style={{ color: B.text }}>{title}</p>
        <p className="text-[10.5px] font-[500] mb-2" style={{ color: B.magenta, opacity: 0.7 }}>{sub}</p>
        <p className="text-[12.5px] leading-relaxed font-[300]" style={{ color: B.textSub }}>{desc}</p>
      </div>
    </motion.div>
  );
}

function SectionCamino() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="producto" />
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="caminoIconGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4009A" />
            <stop offset="100%" stopColor="#6D2BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-20 md:py-36">
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="producto-agentes">Madurez de adopción</SectionLabel>
          <h2 className="font-[700] mb-6" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            De un agente a una flota gobernada
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, fontWeight: 300, maxWidth: 520, margin: "0 auto" }}>
            KRNL puede crecer con tu organización: empieza con acceso controlado y llega hasta equipos de agentes que pueden operar de forma autónoma y supervisada.
          </p>
        </motion.div>

        {/* Desktop — timeline horizontal */}
        <div className="hidden lg:block relative">
          <div className="absolute h-px" style={{ top: 32, left: "10%", right: "10%", background: B.borderSoft }} />
          <motion.div className="absolute h-[1.5px]" style={{ top: 32, left: "10%", right: "10%", background: `linear-gradient(90deg, ${B.purple}, ${B.magenta})`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: easeL }} />
          {!reduced && (
            <motion.div className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{ top: 32, marginTop: -4, background: B.magenta, boxShadow: `0 0 8px ${B.magenta}90` }}
              initial={{ left: "10%", opacity: 0 }}
              animate={inV ? { left: ["10%", "90%"], opacity: [0, 0.85, 0.85, 0] } : {}}
              transition={{ duration: 3.2, delay: 1.8, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }} />
          )}
          <div className="relative grid grid-cols-5 gap-8">
            {CAMINO_STAGES.map((stage, i) => (
              <CaminoStageDesktop key={stage.title} stage={stage} i={i} inV={inV} reduced={reduced} />
            ))}
          </div>
        </div>

        {/* Tablet / mobile — timeline vertical */}
        <div className="lg:hidden flex flex-col max-w-[440px] mx-auto">
          {CAMINO_STAGES.map((stage, i) => (
            <CaminoStageVertical key={stage.title} stage={stage} i={i} inV={inV} isLast={i === CAMINO_STAGES.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 7. POR QUÉ KRNL ──────────────────────────────────────────────────────────
function SectionPorQueKrnl() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    {
      Icon: Key,
      label: "Modelo predecible",
      title: "Licencia anual, modelo predecible",
      bullets: ["Precio anual predecible, pensado para escalar con tu operación.", "Cobertura de plataforma que crece con tu empresa, sin perder control ni trazabilidad."],
    },
    {
      Icon: HardDrive,
      label: "Tu entorno",
      title: "On-premise o tu cloud, siempre tuyo",
      bullets: ["KRNL se despliega en tu infraestructura o cloud.", "Tus datos permanecen dentro de tu entorno.", "Mantienes control operativo sobre integraciones, políticas y ejecución."],
    },
    {
      Icon: Cpu,
      label: "A tu lado",
      title: "Acompañamiento experto desde el primer día",
      bullets: ["Orión acompaña la implementación y adopción.", "Tu equipo no opera solo la plataforma.", "La madurez de IA avanza con soporte experto."],
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}35 100%)`, borderTop: `1px solid ${B.border}` }}>
      {/* Halo de fondo — ahora con respiración sutil */}
      <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <div style={{ width: 640, maxWidth: "90%", height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${B.purple}16 0%, transparent 70%)`, filter: "blur(50px)" }} />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>

          {/* KRNL iso — protagonista de la sección, sin contenedor ni badge */}
          <motion.div className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.75 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease }}>
            <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
              <motion.div className="absolute rounded-full pointer-events-none"
                style={{ inset: 8, background: `radial-gradient(circle, ${B.magenta}22 0%, ${B.purple}18 55%, transparent 75%)`, filter: "blur(18px)" }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="relative"
                animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
                <ImageWithFallback src={krnlHeroIso} alt="KRNL" style={{ display: "block", width: 76, height: "auto", objectFit: "contain" }} />
              </motion.div>
            </div>
          </motion.div>

          <SectionLabel>Por qué KRNL</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Lo que hace que valga la pena elegir KRNL
          </h2>
        </motion.div>

        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="porqueIconGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reasons.map(({ Icon, label, title, bullets }, i) => (
            <motion.div key={title} className="relative rounded-2xl p-8 md:p-9 h-full flex flex-col"
              style={{ background: "rgba(255,255,255,0.92)", border: "1px solid #E7E5F0", boxShadow: "0 2px 16px rgba(109,43,255,0.05)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.13, ease }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(109,43,255,0.09)", transition: { duration: 0.25, ease } }}>
              <span className="text-[10.5px] font-[700] uppercase tracking-[0.14em] mb-5" style={{ ...MONO, color: B.magenta }}>{label}</span>
              <Icon className="w-9 h-9 mb-5" style={{ stroke: "url(#porqueIconGrad)", color: "transparent" }} strokeWidth={1.5} />
              <p className="text-[19px] font-[800] mb-5 leading-snug" style={{ color: B.text }}>{title}</p>
              <div className="flex flex-col gap-3">
                {bullets.map(b => (
                  <div key={b} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: B.purpleSoft }}>
                      <Check className="w-2.5 h-2.5" style={{ color: B.purple }} strokeWidth={3} />
                    </div>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: B.textSub }}>{b}</p>
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

// ── 8. CTA FINAL ──────────────────────────────────────────────────────────────
function CTAFinal() {
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
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
            KRNL Enterprise AI OS
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-3"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Construye tu arquitectura de IA empresarial
        </motion.h2>
        <motion.p className="leading-relaxed mb-5 mx-auto"
          style={{ fontSize: 15, color: B.textSub, maxWidth: 460 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          Deja las herramientas aisladas atrás y dale a tu IA una capa operativa lista para escalar.
        </motion.p>
        <motion.div className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3, ease }}>
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
export default function PaginaProducto() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroProducto />
      <SectionSolucion />
      <SectionPropuesta />
      <SectionArquitectura />
      <SectionCostosGobernados />
      <SectionServicios />
      <SectionCamino />
      <SectionPorQueKrnl />
      <CTAFinal />
      <KrnlFooter />
    </div>
  );
}
