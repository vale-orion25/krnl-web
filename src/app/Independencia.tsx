import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, Shield, FileText, Activity, Database, Users, Workflow,
  BarChart3, MessageSquare, Bot, Check, X, Globe, Lock, HardDrive,
  TrendingUp, Layers, Eye, AlertTriangle, ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo     from "@/imports/krnl-logo-dark.png";
import krnlIsoWhite from "@/imports/krnl-iso-white.png";
import krnlHeroIso  from "@/imports/krnl-iso.png";
import background2  from "@/imports/background-2.svg";
import KrnlFooter from "./KrnlFooter";
import { krnlNavigate } from "./navigate";
import { SectionBackground } from "./components/SectionBackground";

// ── Brand tokens ──────────────────────────────────────────────────────────────
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
  warnSoft:    "#FFF0F0",
};
const GRAD = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const ease = [0.22, 1, 0.36, 1] as const;
const easeL = [0.4, 0, 0.2, 1] as const;

// ── Shared primitives ─────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-[700] tracking-[0.2em] uppercase mb-3"
      style={{ ...MONO, color: B.magenta }}>{children}</p>
  );
}

// ── 1. HERO — MODEL ROUTER ─────────────────────────────────────────────────────
const MODELS = [
  { name: "ChatGPT",         sub: "OpenAI",    col: "#10A37F", LogoIcon: OpenAIIcon },
  { name: "Claude",          sub: "Anthropic", col: "#C07F56", logo: "https://i.logos-download.com/114232/31117-s2560-aa51d43aaa1664d26ce478638acbf9e7.png/Claude_Logo_2023_icon-s2560.png?dl" },
  { name: "Gemini",          sub: "Google",    col: "#6C63FF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1920px-Google_Gemini_icon_2025.svg.png" },
  { name: "Modelos locales", sub: "On-premise", col: "#2D3748", logo: "https://cdn.simpleicons.org/ollama/2D3748" },
];

const OUTPUTS = [
  { name: "Agentes",         Icon: Bot,          col: B.purple  },
  { name: "Automatizaciones",Icon: Workflow,      col: B.magenta },
  { name: "Dashboards",      Icon: BarChart3,     col: "#0EA5E9" },
  { name: "Usuario final",   Icon: Users,         col: "#22c55e" },
];

function HeroRouter() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 20px 72px rgba(109,43,255,0.10)" }}>
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FC5153" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCBB40" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#33C748" }} />
        <span className="ml-3 text-[11px] font-[500]" style={{ ...MONO, color: B.textMuted }}>KRNL — Model Router</span>
      </div>

      {/* Diagram */}
      <div className="overflow-x-auto">
      <div className="p-6 grid items-center gap-0 min-w-[600px] md:min-w-0"
        style={{ gridTemplateColumns: "1fr 32px 200px 32px 1fr" }}>

        {/* Left: models */}
        <div className="flex flex-col gap-2.5">
          {MODELS.map((m, i) => (
            <motion.div key={m.name}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2"
              style={{ background: B.softBg, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, x: -12 }} animate={inV ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease }}>
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                {m.LogoIcon ? (
                  <m.LogoIcon className="w-full h-full" style={{ color: m.col }} />
                ) : (
                  <img src={m.logo} alt={m.name} className="w-full h-full object-contain" />
                )}
              </div>
              <p className="text-[12px] font-[500]" style={{ color: B.text }}>{m.name}</p>
              <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-[600]"
                style={{ background: `${m.col}18`, color: m.col }}>OK</span>
            </motion.div>
          ))}
        </div>

        {/* Left connectors */}
        <div className="flex flex-col gap-2.5 px-1">
          {MODELS.map((m, i) => (
            <div key={i} className="flex items-center" style={{ height: 38 }}>
              <motion.div className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${m.col}40, ${B.purple}60)` }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={inV ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: easeL }} />
            </div>
          ))}
        </div>

        {/* Center: KRNL Core */}
        <motion.div className="relative flex flex-col items-center justify-center rounded-2xl p-5 text-center"
          style={{ background: `linear-gradient(145deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1.5px solid ${B.purple}30`, boxShadow: `0 8px 40px ${B.purple}22` }}
          initial={{ opacity: 0, scale: 0.88 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.4, ease }}>
          {/* Halo */}
          <motion.div className="absolute rounded-2xl pointer-events-none"
            style={{ inset: -8, background: `radial-gradient(circle, ${B.purple}18 0%, transparent 70%)`, filter: "blur(8px)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative z-10">
            <img src={krnlHeroIso} alt="KRNL" style={{ display: "block", width: 64, height: "auto", objectFit: "contain", margin: "0 auto 10px" }} />
            <p className="text-[9px] font-[600] tracking-[0.1em] uppercase mb-3" style={{ ...MONO, color: B.purple }}>Core operativo</p>
            {["Gobierno", "Trazabilidad", "Costos", "Guardrails"].map(f => (
              <div key={f} className="flex items-center gap-1.5 text-left mb-1">
                <Check className="w-2.5 h-2.5 shrink-0" style={{ color: B.purple }} strokeWidth={2.5} />
                <span className="text-[10px]" style={{ color: B.textSub }}>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right connectors */}
        <div className="flex flex-col gap-4 px-1">
          {OUTPUTS.map((o, i) => (
            <div key={i} className="flex items-center" style={{ height: 40 }}>
              <motion.div className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${B.purple}60, ${o.col}40)` }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={inV ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.09, duration: 0.4, ease: easeL }} />
            </div>
          ))}
        </div>

        {/* Right: outputs */}
        <div className="flex flex-col gap-2.5">
          {OUTPUTS.map(({ name, Icon, col }, i) => (
            <motion.div key={name}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, x: 12 }} animate={inV ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.09, duration: 0.4, ease }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ background: `${col}18` }}>
                <Icon className="w-3 h-3" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <p className="text-[12px] font-[500]" style={{ color: B.text }}>{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-3" style={{ borderTop: `1px solid ${B.borderSoft}`, background: B.softBg }}>
        {[["Modelo activo", "ChatGPT", B.purple], ["Política", "Aplicada", "#22c55e"], ["Trazabilidad", "Activa", B.magenta]].map(([l, v, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="text-[9px]" style={{ color: B.textMuted }}>{l}:</span>
            <span className="text-[9px] font-[700]" style={{ color: c }}>{v}</span>
          </div>
        ))}
        <span className="ml-auto text-[9px] font-[500]" style={{ ...MONO, color: B.textMuted }}>Cambia el modelo sin reconfigurar</span>
      </div>
    </div>
  );
}

function HeroIndependencia() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-20"
      style={{ background: "linear-gradient(160deg, #FEFAFC 0%, #F5F0FD 45%, #FEF6FB 100%)" }}>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-40 sm:w-[600px] sm:h-[340px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}85 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="absolute top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magentaSoft}55 0%, transparent 72%)`, filter: "blur(32px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Badge */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[600] tracking-[0.14em] uppercase"
            style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
            Independencia IA
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-center font-[800] leading-[1.06] mb-5"
          style={{ fontSize: "clamp(30px, 4.2vw, 56px)", color: B.text, maxWidth: 760, margin: "0 auto 20px" }}
          initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          No quedes atrapado{" "}
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            en un solo modelo.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="text-center mb-10 mx-auto"
          style={{ fontSize: 17, color: B.textSub, maxWidth: 620, lineHeight: 1.65 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          KRNL permite operar con ChatGPT, Claude, Gemini y modelos locales desde una capa común, manteniendo el control sobre tus datos, agentes, flujos y conocimiento.
        </motion.p>


        {/* Hero diagram */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.38, ease }}>
          <HeroRouter />
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. EL RIESGO DEL LOCK-IN ──────────────────────────────────────────────────
function SectionLockIn() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const risks = [
    {
      Icon: TrendingUp, tagCol: "#DC2626",
      title: "Cambios de precio",
      desc: "Un proveedor puede cambiar tarifas, límites o condiciones y afectar toda la operación de IA del negocio.",
      tag: "Riesgo comercial",
    },
    {
      Icon: Eye, tagCol: B.magenta,
      title: "Caja negra",
      desc: "Cada proveedor guarda el contexto y los datos a su manera: cambiar de modelo implica reconstruir la operación desde cero.",
      tag: "Riesgo operativo",
    },
    {
      Icon: Database, tagCol: "#F59E0B",
      title: "Contexto perdido",
      desc: "El conocimiento queda amarrado a herramientas, cuentas personales o configuraciones difíciles de migrar.",
      tag: "Riesgo estratégico",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>El problema</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Cuando la IA depende de un proveedor,<br />el negocio pierde control.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Quedar atado a un proveedor no es solo un problema técnico. Afecta costos, visibilidad y la capacidad de tu empresa para cambiar de rumbo.
          </p>
        </motion.div>

        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="lockinIconGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {risks.map(({ Icon, tagCol, title, desc, tag }, i) => (
            <motion.div key={title}
              className={`group relative flex flex-col py-6 md:py-0 md:px-10 ${i === 0 ? "md:pl-0" : "md:border-l"} ${i === risks.length - 1 ? "md:pr-0" : ""}`}
              style={{ borderColor: B.borderSoft }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.13, ease }}>
              <Icon className="w-9 h-9 mb-5" style={{ stroke: "url(#lockinIconGrad)", color: "transparent" }} strokeWidth={1.5} />
              <p className="text-[17px] font-[800] mb-3 leading-snug" style={{ color: B.text }}>{title}</p>
              <div className="h-px rounded-full mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: GRAD, width: 32, transformOrigin: "left" }} />
              <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: B.textSub }}>{desc}</p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tagCol }} />
                <span className="text-[10px] font-[700] uppercase tracking-[0.08em]" style={{ color: tagCol }}>{tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. CAPA AGNÓSTICA MULTI-MODELO ────────────────────────────────────────────
function OpenAIIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 256 260" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M239.184 106.203a64.72 64.72 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.72 64.72 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.67 64.67 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.77 64.77 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483m-97.56 136.338a48.4 48.4 0 0 1-31.105-11.255l1.535-.87l51.67-29.825a8.6 8.6 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601M37.158 197.93a48.35 48.35 0 0 1-5.781-32.589l1.534.921l51.722 29.826a8.34 8.34 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803M23.549 85.38a48.5 48.5 0 0 1 25.58-21.333v61.39a8.29 8.29 0 0 0 4.195 7.316l62.874 36.272l-21.845 12.636a.82.82 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405zm179.466 41.695l-63.08-36.63L161.73 77.86a.82.82 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.54 8.54 0 0 0-4.4-7.213m21.742-32.69l-1.535-.922l-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.72.72 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391zM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87l-51.67 29.825a8.6 8.6 0 0 0-4.246 7.367zm11.868-25.58L128.067 97.3l28.188 16.218v32.434l-28.086 16.218l-28.188-16.218z" />
    </svg>
  );
}

const MODEL_DETAILS = [
  { name: "ChatGPT", sub: "OpenAI",    col: "#10A37F", LogoIcon: OpenAIIcon,
    uso: "Análisis complejo, redacción y razonamiento avanzado.",                cost: "$0.0050/1k", precision: 96 },
  { name: "Claude",  sub: "Anthropic", col: "#C07F56", logo: "https://i.logos-download.com/114232/31117-s2560-aa51d43aaa1664d26ce478638acbf9e7.png/Claude_Logo_2023_icon-s2560.png?dl",
    uso: "Documentos largos, síntesis y tareas de revisión extensa.",            cost: "$0.0030/1k", precision: 94 },
  { name: "Gemini",  sub: "Google",    col: "#6C63FF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1920px-Google_Gemini_icon_2025.svg.png",
    uso: "Análisis de datos, código y contenido multimedia empresarial.",        cost: "$0.0035/1k", precision: 93 },
  { name: "Modelos locales", sub: "On-premise", col: "#2D3748", logo: "https://cdn.simpleicons.org/ollama/2D3748",
    uso: "Máxima soberanía de datos: modelos open source u on-premise, sin salida de información del perímetro.", cost: "Sin costo API", precision: 85 },
];

function SectionMultiModelo() {
  const [sel, setSel] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const m = MODEL_DETAILS[sel];

  return (
    <section ref={ref} id="independencia-arquitectura" className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}30 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Capa multi-modelo</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Un solo lugar para operar múltiples cerebros de IA.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            KRNL permite elegir el modelo correcto para cada tarea sin rediseñar la operación ni perder contexto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Model tabs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease }}>
            <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-4" style={{ ...MONO, color: B.textMuted }}>Modelos disponibles</p>
            <div className="flex flex-col gap-2.5">
              {MODEL_DETAILS.map((md, i) => (
                <motion.button key={md.name}
                  className="relative flex items-center gap-4 rounded-2xl px-5 py-4 text-left w-full transition-all"
                  style={{
                    background: sel === i ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.60)",
                    border: `1.5px solid ${sel === i ? md.col + "40" : B.borderSoft}`,
                    boxShadow: sel === i ? `0 4px 20px ${md.col}18` : "none",
                  }}
                  onClick={() => setSel(i)}
                  whileHover={{ y: -1, transition: { duration: 0.15 } }}>
                  {/* Logo */}
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 p-1.5"
                    style={{ background: `${md.col}12` }}>
                    {md.LogoIcon ? (
                      <md.LogoIcon className="w-full h-full" style={{ color: md.col }} />
                    ) : (
                      <img src={md.logo} alt={md.name} className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-[700] mb-0.5" style={{ color: B.text }}>{md.name}</p>
                    <p className="text-[10px] font-[600] mb-1" style={{ color: B.textMuted }}>{md.sub}</p>
                    <p className="text-[11px] leading-snug" style={{ color: B.textSub }}>{md.uso}</p>
                  </div>
                  {sel === i && (
                    <ChevronRight className="w-4 h-4 shrink-0" style={{ color: md.col }} strokeWidth={2} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mockup right */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25, ease }}>
            <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-4" style={{ ...MONO, color: B.textMuted }}>Vista KRNL</p>
            <motion.div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.94)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.08)" }}
              key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }}>
              {/* Mock top bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                <span className="text-[10px] font-[500]" style={{ ...MONO, color: B.textMuted }}>Configuración activa</span>
              </div>
              <div className="p-5">
                {/* Selected model */}
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4"
                  style={{ background: `${m.col}10`, border: `1px solid ${m.col}30` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 p-1.5"
                    style={{ background: "#fff" }}>
                    {m.LogoIcon ? (
                      <m.LogoIcon className="w-full h-full" style={{ color: m.col }} />
                    ) : (
                      <img src={m.logo} alt={m.name} className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-[700]" style={{ color: B.text }}>{m.name}</p>
                    <p className="text-[9px]" style={{ color: B.textMuted }}>{m.sub}</p>
                  </div>
                </div>

                {/* Info rows */}
                <div className="flex flex-col gap-2.5 mb-4">
                  {[
                    { label: "Política aplicada",  val: "RBAC área Legal + Guardrail activo" },
                    { label: "Agente asociado",    val: "Agente Legal v2 · Activo" },
                    { label: "Costo estimado",     val: m.cost },
                    { label: "Registro activo",    val: "Auditoría activa" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between py-2"
                      style={{ borderBottom: `1px solid ${B.borderSoft}` }}>
                      <span className="text-[11px]" style={{ color: B.textMuted }}>{label}</span>
                      <span className="text-[11px] font-[600]" style={{ color: B.text }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Precision bar */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[10px]" style={{ color: B.textMuted }}>Precisión operativa</span>
                    <span className="text-[10px] font-[700]" style={{ color: m.col }}>{m.precision}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: B.border }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: m.col }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${m.precision}%` }}
                      transition={{ duration: 0.8, ease: easeL }} />
                  </div>
                </div>

                {/* Note */}
                <div className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5"
                  style={{ background: B.purpleSoft }}>
                  <Check className="w-3 h-3 shrink-0" style={{ color: B.purple }} strokeWidth={2.5} />
                  <p className="text-[10px]" style={{ color: B.purple }}>
                    Cambia el modelo sin reconfigurar agentes, políticas ni flujos.
                  </p>
                </div>
              </div>
            </motion.div>
            <p className="text-[9px] mt-2 text-center" style={{ color: B.textMuted }}>
              Vista referencial · datos ilustrativos
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4. TU CONOCIMIENTO SIGUE SIENDO TUYO ─────────────────────────────────────
const VAULT_ITEMS = [
  { label: "Documentos",       Icon: FileText,   col: B.purple  },
  { label: "Bases vectoriales", Icon: Database,  col: B.magenta },
  { label: "Agentes",          Icon: Bot,        col: "#0EA5E9" },
  { label: "Workflows",        Icon: Workflow,   col: "#22c55e" },
  { label: "Logs & auditoría", Icon: Activity,  col: "#F59E0B" },
];

function SectionKnowledge() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const bullets = [
    "Bases de conocimiento propias y portables",
    "Contexto persistente independiente del modelo",
    "Trazabilidad propia, no atada al proveedor",
    "Instalación en servidores o cloud del cliente",
    "Exportación y migración controlada en todo momento",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <SectionBackground variant="soberania" className="opacity-70" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease }}>
            <SectionLabel>Soberanía de datos</SectionLabel>
            <h2 className="font-[800] mb-5 leading-tight"
              style={{ fontSize: "clamp(24px, 3vw, 38px)", color: B.text }}>
              El contexto no vive en el proveedor.<br />Vive en tu organización.
            </h2>
            <p className="mb-7 leading-relaxed" style={{ color: B.textSub, fontSize: 16 }}>
              KRNL mantiene el conocimiento, documentos, agentes y flujos dentro de la infraestructura del cliente, con bases portables y trazabilidad propia independiente de cualquier LLM.
            </p>
            <div className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <motion.div key={b} className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: B.purpleSoft, border: `1px solid ${B.borderSoft}` }}>
                    <Check className="w-3 h-3" style={{ color: B.purple }} strokeWidth={2.5} />
                  </div>
                  <p className="text-[14px] leading-snug" style={{ color: B.textSub }}>{b}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Knowledge Vault visual */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease }}>
            <div className="relative rounded-2xl p-6"
              style={{ background: `linear-gradient(145deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.purple}20`, boxShadow: `0 8px 36px ${B.purple}14` }}>
              <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-5 text-center" style={{ ...MONO, color: B.purple }}>Knowledge Vault</p>

              {/* Hub: KRNL center */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <motion.div className="absolute rounded-full"
                    style={{ inset: -8, background: `radial-gradient(circle, ${B.purple}22 0%, transparent 70%)` }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: GRAD, boxShadow: `0 4px 20px ${B.purple}50` }}>
                    <img src={krnlIsoWhite} alt="KRNL" style={{ display: "block", width: 44, height: 44, objectFit: "contain" }} />
                  </div>
                </div>
              </div>

              {/* Knowledge items arranged around hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {VAULT_ITEMS.slice(0, 4).map(({ label, Icon, col }, i) => (
                  <motion.div key={label}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(255,255,255,0.80)", border: `1px solid ${B.borderSoft}` }}
                    initial={{ opacity: 0, scale: 0.9 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${col}18` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: col }} strokeWidth={1.75} />
                    </div>
                    <p className="text-[11px] font-[500]" style={{ color: B.text }}>{label}</p>
                  </motion.div>
                ))}
              </div>
              {(() => { const v5 = VAULT_ITEMS[4]; const V5Icon = v5.Icon; return (
              <motion.div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.80)", border: `1px solid ${B.borderSoft}` }}
                initial={{ opacity: 0, scale: 0.9 }} animate={inV ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.72, duration: 0.4, ease }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${v5.col}18` }}>
                  <V5Icon className="w-3.5 h-3.5" style={{ color: v5.col }} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-[500]" style={{ color: B.text }}>{v5.label}</p>
                <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full font-[600]"
                  style={{ background: B.purpleSoft, color: B.purple }}>Inmutables</span>
              </motion.div>
              ); })()}

              {/* Bottom note */}
              <div className="mt-4 rounded-xl px-3 py-2.5 text-center"
                style={{ background: "rgba(255,255,255,0.60)" }}>
                <p className="text-[10px] font-[600]" style={{ color: B.purple }}>
                  Todo conectado a KRNL · No a OpenAI, Google ni Anthropic
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 5. CAMBIA DE MODELO SIN CAMBIAR TU OPERACIÓN ─────────────────────────────
// ── Low-poly node network background (decorative, scoped to this section) ─────
function NetworkMeshBg({ mouse, reduced }: { mouse: { x: number; y: number }; reduced: boolean }) {
  // Nodes hug the outer edges/bottom band — center stays clear behind the title and cards.
  const nodes: [number, number][] = [
    [10, 10], [40, 70], [110, 160], [60, 270], [130, 350], [50, 450],
    [300, 465], [480, 435], [650, 470], [820, 445], [950, 465],
    [1140, 460], [1080, 400], [1150, 300], [1090, 180], [1160, 80], [1190, 20],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [1, 3], [3, 4], [3, 5], [4, 6], [5, 6],
    [6, 7], [7, 8], [8, 9], [7, 9], [9, 10], [10, 11], [11, 12], [10, 12],
    [12, 13], [13, 14], [14, 15], [12, 14], [15, 16],
  ];
  const colors = ["#B8A6F0", "#9B7FE8", "#F0A8D4", "#AEC2F5"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true"
      style={{
        transform: reduced ? undefined : `translate3d(${mouse.x * 6}px, ${mouse.y * 5}px, 0)`,
        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}>
      <motion.div className="w-full h-full" style={{ opacity: 0.9 }}
        animate={reduced ? {} : { x: [0, 6, -6, 0], y: [0, -5, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
        <svg className="w-full h-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          {edges.map(([a, b], i) => {
            const [x1, y1] = nodes[a];
            const [x2, y2] = nodes[b];
            return (
              <motion.line key={`e-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={colors[i % colors.length]} strokeWidth={0.6}
                initial={{ opacity: 0 }}
                animate={reduced ? { opacity: 0.1 } : { opacity: [0.08, 0.14, 0.08] }}
                transition={reduced ? { duration: 0.6 } : { duration: 14 + (i % 6) * 1.6, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.6 }} />
            );
          })}
          {nodes.map(([x, y], i) => {
            const isFar = i % 4 === 0;
            return (
              <motion.circle key={`n-${i}`} cx={x} cy={y} r={isFar ? 2.4 : 1.3} fill={colors[i % colors.length]}
                style={isFar ? { filter: "blur(1.2px)" } : undefined}
                initial={{ opacity: 0 }}
                animate={reduced ? { opacity: 0.15 } : { opacity: [0.12, 0.22, 0.12] }}
                transition={reduced ? { duration: 0.6 } : { duration: 12 + (i % 5) * 2.2, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.5 }} />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

function SectionCambioModelo() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const sinKrnl = [
    "Cada área usa herramientas separadas y aisladas",
    "El contexto queda disperso en cuentas personales",
    "Cambiar de modelo implica reconstruir todo",
    "Cada proveedor impone sus propias reglas y límites",
  ];
  const conKrnl = [
    "Modelos conectados a una misma capa operativa",
    "Agentes, flujos y contexto permanecen intactos",
    "La trazabilidad se mantiene al cambiar el modelo",
    "El negocio conserva control y visibilidad total",
  ];

  return (
    <section ref={ref} onMouseMove={handleMove} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}25 100%)`, borderTop: `1px solid ${B.border}` }}>
      <NetworkMeshBg mouse={mouse} reduced={!!reduced} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-20 md:py-32">
        <motion.div className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Portabilidad</SectionLabel>
          <h2 className="font-[800] mb-5" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Cambia el modelo. Mantén la operación.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Con KRNL, cambiar de proveedor o modelo no implica reconstruir. Tu operación sigue intacta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Sin KRNL */}
          <motion.div className="rounded-2xl p-6"
            style={{ background: "#FFF8F8", border: `1px solid #DC262618` }}
            initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "#FEF2F2", border: "1px solid #DC262625" }}>
                <X className="w-4 h-4" style={{ color: "#DC2626" }} strokeWidth={2} />
              </div>
              <p className="text-[15px] font-[700]" style={{ color: B.text }}>Sin KRNL</p>
            </div>
            <div className="flex flex-col gap-4">
              {sinKrnl.map((item, i) => (
                <motion.div key={item} className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.09, duration: 0.4, ease }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "#FEF2F2", border: "1px solid #DC262625" }}>
                    <X className="w-2.5 h-2.5" style={{ color: "#DC2626" }} strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px] leading-snug" style={{ color: B.textSub }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Con KRNL */}
          <motion.div className="rounded-2xl p-6"
            style={{ background: `linear-gradient(145deg, ${B.purpleSoft}, ${B.magentaSoft}80)`, border: `1px solid ${B.purple}22`, boxShadow: `0 14px 40px ${B.purple}14` }}
            initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: GRAD, boxShadow: `0 2px 10px ${B.purple}40` }}>
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-[15px] font-[700]" style={{ color: B.text }}>Con KRNL</p>
              <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full font-[700]"
                style={{ background: B.purple, color: "#fff" }}>Recomendado</span>
            </div>
            <div className="flex flex-col gap-4">
              {conKrnl.map((item, i) => (
                <motion.div key={item} className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.4, ease }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.80)", border: `1px solid ${B.purple}30` }}>
                    <Check className="w-2.5 h-2.5" style={{ color: B.purple }} strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px] leading-snug" style={{ color: B.textSub }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 6. INDEPENDENCIA OPERACIONAL ──────────────────────────────────────────────
function SectionIndependenciaOp() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  const pillars = [
    {
      Icon: Globe,    col: B.purple,
      title: "Modelos",
      desc: "Elige el LLM adecuado para cada tarea: precisión, costo, confidencialidad o contexto específico.",
      mini: ["ChatGPT", "Claude", "Gemini", "Local"],
    },
    {
      Icon: Database, col: B.magenta,
      title: "Datos",
      desc: "Mantén documentos, vectores y contexto dentro de tu infraestructura. Sin salida del perímetro.",
      mini: ["RAG propio", "BYOK", "On-premise"],
    },
    {
      Icon: Bot,      col: "#0EA5E9",
      title: "Agentes",
      desc: "Conserva agentes, flujos y expertise aunque cambies de proveedor o modelo subyacente.",
      mini: ["Contexto persistente", "Portabilidad", "Multi-LLM"],
    },
    {
      Icon: BarChart3, col: "#22c55e",
      title: "Costos",
      desc: "Observa consumo, uso y eficiencia por área, agente o modelo. Optimiza sin sorpresas.",
      mini: ["Trazabilidad de gasto", "Control granular"],
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={background2} alt="" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <SectionLabel>Independencia operacional</SectionLabel>
          <h2 className="font-[800] mb-4" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: B.text }}>
            Independencia no es solo elegir modelos.<br />Es controlar toda la operación.
          </h2>
          <p style={{ color: B.textSub, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            KRNL te da independencia real sobre los modelos, los datos, los agentes y los costos de tu operación de IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(({ Icon, col, title, desc, mini }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 14px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.12, ease }}
              whileHover={{ y: -5, boxShadow: `0 14px 40px rgba(109,43,255,0.10)`, borderColor: `${col}30`, transition: { duration: 0.2 } }}>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${col}0D 0%, transparent 70%)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${col}18`, border: `1px solid ${col}28` }}>
                <Icon className="w-5 h-5" style={{ color: col }} strokeWidth={1.75} />
              </div>
              <p className="text-[16px] font-[800] mb-2"
                style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {title}
              </p>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: B.textSub }}>{desc}</p>
              <div className="flex flex-col gap-1">
                {mini.map(m => (
                  <div key={m} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: col }} />
                    <span className="text-[10px]" style={{ color: B.textMuted }}>{m}</span>
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

// ── 7. CTA FINAL ──────────────────────────────────────────────────────────────
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
            KRNL — Independencia IA
          </span>
        </motion.div>
        <motion.h2 className="font-[800] leading-tight mb-3"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Recupera el control de tu estrategia de IA.
        </motion.h2>
        <motion.p className="leading-relaxed mb-5 mx-auto"
          style={{ fontSize: 15, color: B.textSub, maxWidth: 460 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          KRNL permite operar IA empresarial sin depender de un único proveedor, herramienta o cuenta aislada.
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
export default function PaginaIndependencia() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroIndependencia />
      <SectionLockIn />
      <SectionMultiModelo />
      <SectionKnowledge />
      <SectionCambioModelo />
      <SectionIndependenciaOp />
      <CTAFinal />
      <KrnlFooter />
    </div>
  );
}
