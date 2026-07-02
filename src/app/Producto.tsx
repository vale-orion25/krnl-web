import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight, Shield, FileText, Activity, Eye, Lock, Database,
  Users, Workflow, BarChart3, MessageSquare, Bot, Plug, Server,
  CheckCircle2, AlertTriangle, Layers, Cpu, Settings2, Check,
  TrendingUp, Globe, Zap, Building2, Key, Network, HardDrive,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo from "@/imports/krnl-logo-dark.png";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";

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

  const models  = ["GPT-4o", "Claude 3.5", "Gemini 1.5", "Llama 3.1"];
  const agents  = [
    { name: "Agente Legal",    s: "Activo",   c: "#22c55e" },
    { name: "Agente Finanzas", s: "Activo",   c: "#22c55e" },
    { name: "Agente RRHH",     s: "Revisión", c: B.magenta },
    { name: "Agente TI",       s: "Activo",   c: "#22c55e" },
  ];
  const stats = [
    { label: "Agentes activos",       value: "12" },
    { label: "Políticas aplicadas",   value: "14" },
    { label: "Automatizaciones",      value: "27" },
    { label: "Dashboards",            value: "8"  },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFAFC 0%, #F7F3FD 45%, #FEF6FB 100%)" }}>
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[660px] h-[360px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}90 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-14 -right-16 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}60 0%, transparent 72%)`, filter: "blur(32px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-10">
        {/* Badge */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <Badge>Producto KRNL</Badge>
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-center font-[800] leading-[1.06] mb-5"
          style={{ fontSize: "clamp(30px, 4vw, 54px)", color: B.text, maxWidth: 800, margin: "0 auto 20px" }}
          initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          La arquitectura operativa<br />
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            para tu IA empresarial
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="text-center mb-10 mx-auto"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 620, lineHeight: 1.65 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          KRNL conecta LLMs, agentes, automatizaciones y dashboards en una misma capa, con los componentes listos para escalar tu operación.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3, ease }}>
          <button onClick={() => krnlNavigate("contacto")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: GRAD, boxShadow: `0 6px 28px ${B.purple}40` }}>
            Conoce KRNL <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[500] text-[15px] transition-all hover:scale-[1.02]"
            style={{ background: B.surface, border: `1.5px solid ${B.border}`, color: B.text, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            Ver arquitectura
          </button>
        </motion.div>

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
              <span className="text-[10px]" style={{ color: B.textMuted }}>En vivo</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
            {/* Sidebar */}
            <div className="py-4 px-3" style={{ borderRight: `1px solid ${B.borderSoft}` }}>
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
              <div className="flex items-center gap-2 mb-5">
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
              <div className="grid grid-cols-4 gap-3 mb-5">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl p-3" style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}>
                    <p className="text-[9px] mb-1" style={{ color: B.textMuted }}>{s.label}</p>
                    <p className="text-[20px] font-[800]" style={{ color: B.text }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Bottom 2-col */}
              <div className="grid grid-cols-2 gap-3">
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
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. PROBLEMA QUE RESUELVE ──────────────────────────────────────────────────
function SectionProblema() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    {
      Icon: AlertTriangle, col: "#DC2626",
      title: "Sin gobernanza sobre herramientas",
      desc: "Múltiples LLMs, chatbots y agentes proliferan por áreas sin políticas ni visibilidad central.",
      mini: ["Herramientas fragmentadas", "Shadow AI activo", "Sin políticas comunes"],
    },
    {
      Icon: Eye, col: B.magenta,
      title: "Contexto institucional que se pierde",
      desc: "Cuando una persona sale de la empresa, su contexto, flujos y procesos con IA desaparecen con ella.",
      mini: ["Conocimiento no persistido", "Flujos personales", "Sin traspaso"],
    },
    {
      Icon: TrendingUp, col: "#F59E0B",
      title: "AIOps sin dueño ni trazabilidad",
      desc: "Sin visibilidad sobre qué modelos usa cada área, a qué costo, con qué datos y qué resultados.",
      mini: ["Costos sin control", "Modelos sin gobierno", "Sin auditoría"],
    },
  ];

  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El problema</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            La IA empresarial crece sin control
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Sin una capa corporativa, la IA avanza de forma dispersa, opaca y con riesgo creciente.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {problems.map(({ Icon, col, title, desc, mini }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
              whileHover={{ y: -4, boxShadow: "0 14px 40px rgba(0,0,0,0.07)", transition: { duration: 0.2 } }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${col}60, transparent)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${col}12`, border: `1px solid ${col}25` }}>
                <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <p className="text-[15px] font-[700] mb-2 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: B.textSub }}>{desc}</p>
              <div className="flex flex-col gap-1.5 pt-4" style={{ borderTop: `1px solid ${B.borderSoft}` }}>
                {mini.map(m => (
                  <div key={m} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `${col}70` }} />
                    <p className="text-[11px]" style={{ color: B.textMuted }}>{m}</p>
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
      title: "Trazabilidad total, sin dependencia de proveedor",
      desc: "Visibilidad completa sobre modelos, costos, resultados y riesgos en tiempo real, con independencia de cualquier LLM o herramienta.",
      chips: ["Multi-modelo", "Control de costos", "AIOps activo"],
    },
  ];

  return (
    <section id="producto-plataforma" ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}35 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magenta}07 0%, transparent 72%)` }} />
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Propuesta de valor</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Una plataforma que trabaja para la empresa, no para el proveedor
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
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

// ── 4. ARQUITECTURA MODULAR ───────────────────────────────────────────────────
function SectionArquitectura() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const layers = [
    {
      label: "Modelos de lenguaje",
      items: [
        { name: "GPT-4o",       col: "#10A37F" },
        { name: "Claude 3.5",   col: "#C07F56" },
        { name: "Gemini 1.5",   col: "#4285F4" },
        { name: "Llama 3.1",    col: "#7C3AED" },
        { name: "Modelos locales", col: B.textMuted },
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
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="producto-arquitectura">Arquitectura</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Una capa única que conecta todo
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            KRNL se posiciona entre los modelos de IA y el usuario final, orquestando enrutamiento, contexto y ejecución en cada capa.
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
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: GRAD, boxShadow: `0 2px 12px ${B.purple}50` }}>
                        <Shield className="w-4 h-4 text-white" strokeWidth={1.75} />
                      </div>
                      <img src={krnlLogo} alt="KRNL" style={{ display: "block", maxWidth: 80, height: "auto", objectFit: "contain" }} />
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-[700]"
                        style={{ ...MONO, background: B.purple, color: "#fff" }}>Enterprise AI OS</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
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
                  /* Models row */
                  <div className="flex items-center justify-center gap-3">
                    {items.map(({ name, col }) => (
                      <div key={name} className="px-4 py-2.5 rounded-xl text-center"
                        style={{ background: B.surface, border: `1.5px solid ${col}30`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", minWidth: 110 }}>
                        <div className="w-5 h-5 rounded-md mx-auto mb-1.5" style={{ background: `${col}30` }} />
                        <p className="text-[11px] font-[600]" style={{ color: B.text }}>{name}</p>
                      </div>
                    ))}
                  </div>
                ) : variant === "products" ? (
                  /* Products row */
                  <div className="grid grid-cols-4 gap-3">
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

// ── 5. SERVICIOS PROFESIONALES ORIÓN ─────────────────────────────────────────
function SectionServicios() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      Icon: Settings2,
      title: "Implementación",
      desc: "Orión despliega KRNL en tu infraestructura, configura integraciones con tus sistemas y deja la plataforma operativa desde el día 1.",
      chips: ["Despliegue cloud / on-premise", "Integración de sistemas"],
    },
    {
      Icon: Activity,
      title: "Monitoreo 24/7",
      desc: "Supervisión continua de la operación de IA: rendimiento, costos, alertas y respuesta a incidentes en tiempo real.",
      chips: ["NOC dedicado", "Alertas proactivas"],
    },
    {
      Icon: Shield,
      title: "Ciberseguridad",
      desc: "Equipo especializado en seguridad IA: auditorías, hardening de políticas, respuesta a incidentes y cumplimiento regulatorio.",
      chips: ["Auditoría de seguridad", "Cumplimiento normativo"],
    },
    {
      Icon: Users,
      title: "Gestión del cambio",
      desc: "Acompañamiento organizacional para adopción de IA: capacitación, comunicación y gestión del cambio cultural en equipos.",
      chips: ["Formación de equipos", "Adoption plan"],
    },
    {
      Icon: Cpu,
      title: "FDE as a Service",
      desc: "Forward Deployed Engineer dedicado: ingeniería in-situ para resolver desafíos técnicos específicos y acelerar la madurez IA.",
      chips: ["Ingeniero dedicado", "Aceleración operativa"],
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.purple}06 0%, transparent 72%)` }} />
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Servicios profesionales</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Orión implementa, integra y acompaña
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Más allá de la plataforma, Orión ofrece un servicio profesional completo para operar IA empresarial con éxito desde el primer día.
          </p>
        </motion.div>

        <div className="grid grid-cols-5 gap-4">
          {services.map(({ Icon, title, desc, chips }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 12px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.09, ease }}
              whileHover={{ y: -4, boxShadow: `0 14px 40px rgba(109,43,255,0.10)`, transition: { duration: 0.2 } }}>
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${B.purple}0A 0%, transparent 70%)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.border}` }}>
                <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[13px] font-[700] mb-2 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: B.textSub }}>{desc}</p>
              <div className="flex flex-col gap-1">
                {chips.map(c => (
                  <span key={c} className="text-[9px] font-[500]" style={{ color: B.purple }}>· {c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6. CAMINO PROGRESIVO DE ADOPCIÓN ─────────────────────────────────────────
function SectionCamino() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const layers = [
    { num: "01", title: "Acceso oficial a LLMs",     sub: "Gobernanza base",               desc: "Acceso controlado a GPT, Claude, Gemini y locales bajo política corporativa unificada.",   Icon: Globe    },
    { num: "02", title: "RAG y conocimiento",        sub: "Agentes con contexto propio",    desc: "Knowledge base interna: documentos, bases vectoriales y fuentes propietarias persistentes.", Icon: Database },
    { num: "03", title: "Tools y sistemas reales",   sub: "Agentes que actúan",             desc: "Integración via MCP con CRM, ERP, SAP y sistemas internos. Los agentes ejecutan acciones.", Icon: Plug     },
    { num: "04", title: "Equipos de agentes",        sub: "Workflows colaborativos",        desc: "Múltiples agentes coordinados en flujos continuos para procesos complejos de alto valor.",  Icon: Workflow },
    { num: "05", title: "Fuerza laboral digital",    sub: "Agentes autónomos 24/7",         desc: "Flota de agentes operando de forma autónoma con supervisión, trazabilidad y gobierno activo.", Icon: Layers  },
  ];

  return (
    <section ref={ref} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel id="producto-agentes">Madurez de adopción</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            De un agente a una flota gobernada
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            KRNL crece con tu organización. Empieza con acceso controlado y escala hasta una fuerza laboral digital autónoma.
          </p>
        </motion.div>

        {/* Animated progress bar */}
        <div className="relative h-px mx-[4%] mb-8">
          <div className="absolute inset-0" style={{ background: B.borderSoft }} />
          <motion.div className="absolute inset-y-0 left-0"
            style={{ background: GRAD }}
            initial={{ width: "0%" }} animate={inV ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.6, delay: 0.3, ease: easeL }} />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {layers.map(({ num, title, sub, desc, Icon }, i) => (
            <motion.div key={num} className="relative rounded-2xl p-5"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 12px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.12, ease }}
              whileHover={{ y: -4, boxShadow: `0 14px 40px rgba(109,43,255,0.10)`, transition: { duration: 0.2 } }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: GRAD, boxShadow: `0 2px 10px ${B.purple}40` }}>
                  <span className="text-[10px] font-[700] text-white">{num}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{ background: B.purpleSoft, border: `1px solid ${B.border}` }}>
                <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[13px] font-[700] mb-0.5 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[10px] font-[600] mb-2" style={{ color: B.magenta }}>{sub}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
              <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: B.borderSoft }}>
                <motion.div className="h-full rounded-full" style={{ background: GRAD }}
                  initial={{ width: "0%" }} animate={inV ? { width: `${(i + 1) * 20}%` } : { width: "0%" }}
                  transition={{ duration: 0.8, delay: 0.65 + i * 0.12, ease }} />
              </div>
            </motion.div>
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
      title: "Licencia anual sin límites",
      desc: "Precio predecible por año, sin coste por usuario, por consulta ni por modelo. Toda la plataforma, toda la empresa.",
      stat: "1 precio, todo incluido",
    },
    {
      Icon: HardDrive,
      title: "On-premise o tu cloud, siempre tuyo",
      desc: "KRNL se despliega en tu infraestructura. Tus datos nunca salen de tu entorno. Soberanía real, sin dependencia de proveedor.",
      stat: "Soberanía de datos garantizada",
    },
    {
      Icon: Cpu,
      title: "Forward Deployed Engineer",
      desc: "Un ingeniero de Orión embebido en tu operación: resuelve, construye y acelera la madurez de IA desde dentro de tu equipo.",
      stat: "Experto dedicado in-situ",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Por qué KRNL</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Diseñado para la empresa, no para el proveedor
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          {reasons.map(({ Icon, title, desc, stat }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 20px rgba(109,43,255,0.06)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.13, ease }}
              whileHover={{ y: -5, boxShadow: `0 16px 48px rgba(109,43,255,0.11)`, transition: { duration: 0.22 } }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${B.purple}09 0%, transparent 70%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.border}` }}>
                <Icon className="w-5 h-5" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[16px] font-[700] mb-3 leading-snug" style={{ color: B.text }}>{title}</p>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: B.textSub }}>{desc}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: B.purpleSoft, border: `1px solid ${B.borderSoft}` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
                <span className="text-[11px] font-[600]" style={{ color: B.purple }}>{stat}</span>
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
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 72%)`, opacity: 0.7 }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 72%)`, opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-[720px] mx-auto px-10 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <Badge>KRNL Enterprise AI OS</Badge>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mt-6 mb-5"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Construye tu arquitectura de IA empresarial
        </motion.h2>
        <motion.p className="leading-relaxed mb-10"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 520, margin: "0 auto 40px" }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          Deja las herramientas aisladas atrás y dale a tu IA una capa operativa lista para escalar.
        </motion.p>
        <motion.div className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3, ease }}>
          <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.03] active:scale-[0.98]"
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
export default function PaginaProducto() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroProducto />
      <SectionProblema />
      <SectionPropuesta />
      <SectionArquitectura />
      <SectionServicios />
      <SectionCamino />
      <SectionPorQueKrnl />
      <CTAFinal />
      <KrnlFooter />
    </div>
  );
}
