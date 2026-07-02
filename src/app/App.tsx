import { useRef, useEffect, useState, type ElementType, type CSSProperties } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, ChevronRight, Scale, BrainCircuit, Box, Database, Lock, Users, Kanban, Workflow,
  Shield, CheckCircle2, FileText, Activity, Eye, EyeOff, ShieldOff, AlertTriangle,
  TrendingUp, Boxes, Link2, Menu, X,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo      from "@/imports/krnl-logo-dark.png";
import krnlLogoWhite from "@/imports/krnl-logo-white.png";
import krnlHeroIso   from "@/imports/krnl-iso.png";
import PaginaProducto from "./Producto";
import PaginaIndependencia from "./Independencia";
import PaginaElProblema from "./ElProblema";
import PaginaGobierno from "./Gobierno";
import PaginaContacto from "./Contacto";
import PaginaInsightsIA from "./InsightsIA";
import KrnlFooter from "./KrnlFooter";
import MobileTabletHero from "./MobileTabletHero";

// ── Brand tokens ──────────────────────────────────────────────────────────────
export const B = {
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
  warn:        "#DC2626",
  warnSoft:    "#FEF2F2",
};
export const GRAD = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
export const MONO = { fontFamily: "'JetBrains Mono', monospace" };

// ── Narrative steps ───────────────────────────────────────────────────────────
const STEP_CONTENT = [
  { eyebrow: "01 / IA Dispersa",   pre: "La IA opera ", hi: "fuera del radar", post: ".",                   body: "Agentes, modelos y datos avanzan en distintas áreas del negocio sin una capa común de control." },
  { eyebrow: "02 / Conexión",      pre: "KRNL ",        hi: "conecta",         post: " el ecosistema.",     body: "Centraliza agentes, modelos, datos y sistemas en una única capa operativa. Todo conectado." },
  { eyebrow: "03 / Gobierno",      pre: "KRNL ",        hi: "gobierna",        post: " la IA empresarial.", body: "Aplica reglas, validaciones, trazabilidad y supervisión sobre cada interacción." },
  { eyebrow: "04 / Escala Segura", pre: "Escala ",      hi: "con seguridad",   post: ".",                   body: "La empresa opera y escala IA con visibilidad, control y gobierno central." },
];

// ── Diagram nodes (canvas 760×340, iso center 380,170) ─────────────────────────
const ISO = { x: 380, y: 170 };
const NODES = [
  { id: "legal",  name: "Agente legal",     sub: "Consulta contratos, cláusulas y normativas.", Icon: Scale,    side: "L", iconC: { x: 14, y: 60 },  anchor: { x: 44, y: 60 } },
  { id: "models", name: "Modelos IA",       sub: "Generan respuestas y recomendaciones.",        Icon: Box,      side: "L", iconC: { x: 14, y: 170 }, anchor: { x: 44, y: 170 } },
  { id: "data",   name: "Datos internos",   sub: "Documentos, reportes y sistemas.",             Icon: Database, side: "L", iconC: { x: 14, y: 280 }, anchor: { x: 44, y: 280 } },
  { id: "crm",    name: "CRM",              sub: "Aporta contexto de cliente y negocio.",        Icon: Users,    side: "R", iconC: { x: 520, y: 60 },  anchor: { x: 678, y: 60 } },
  { id: "tasks",  name: "Gestión de tareas", sub: "Estado de proyectos, tickets y flujos.",      Icon: Kanban,   side: "R", iconC: { x: 520, y: 170 }, anchor: { x: 678, y: 170 } },
  { id: "auto",   name: "Automatizaciones", sub: "Ejecutan flujos y acciones sin control.",      Icon: Workflow, side: "R", iconC: { x: 520, y: 280 }, anchor: { x: 678, y: 280 } },
];

// ── Right panel per step (icon + title + desc) ─────────────────────────────────
const PANELS = [
  {
    title: "Riesgos visibles", sub: "Sin gobierno unificado.", tone: "risk",
    items: [
      { Icon: EyeOff,        t: "Sin trazabilidad",   d: "No hay registro de quién, qué y cómo se usa la IA." },
      { Icon: ShieldOff,     t: "Sin validación",     d: "Respuestas y decisiones sin revisión ni políticas." },
      { Icon: AlertTriangle, t: "Sin políticas",      d: "Cada área usa la IA con sus propias reglas." },
      { Icon: TrendingUp,    t: "Riesgos crecientes", d: "Exposición legal, operativa y de seguridad." },
    ],
  },
  {
    title: "Capa de operación", sub: "Todo integrado, todo conectado.", tone: "ok",
    items: [
      { Icon: Link2,   t: "Agentes conectados", d: "12 agentes operando en una capa común." },
      { Icon: Box,     t: "Modelos registrados", d: "8 modelos bajo un catálogo único." },
      { Icon: Boxes,   t: "Sistemas integrados", d: "15 sistemas conectados de forma segura." },
      { Icon: Workflow, t: "Flujos activos",     d: "27 automatizaciones centralizadas." },
    ],
  },
  {
    title: "Gobierno activo", sub: "Reglas y control en tiempo real.", tone: "gov",
    items: [
      { Icon: Shield,       t: "Políticas",      d: "14 reglas aplicadas a cada interacción." },
      { Icon: CheckCircle2, t: "Validación",     d: "99.8% de respuestas revisadas." },
      { Icon: FileText,     t: "Auditoría",      d: "Registro inmutable de 30 días." },
      { Icon: Activity,     t: "Trazabilidad",   d: "12.4k logs de uso registrados." },
      { Icon: Eye,          t: "Control humano", d: "Supervisión activa en decisiones." },
    ],
  },
  {
    title: "Operación estable", sub: "Escala segura y controlada.", tone: "ok",
    items: [
      { Icon: Shield,       t: "Cumplimiento",     d: "100% de interacciones bajo política." },
      { Icon: Activity,     t: "Interacciones",    d: "14.8k procesadas con trazabilidad." },
      { Icon: CheckCircle2, t: "Incidentes",       d: "0 incidentes sin resolver." },
      { Icon: Boxes,        t: "Modelos activos",  d: "12 modelos gobernados y escalando." },
    ],
  },
];

// ── Timeline ─────────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "IA dispersa",   desc: "La IA crece sin control en silos y herramientas desconectadas." },
  { num: "02", title: "Conexión",      desc: "KRNL organiza y conecta agentes, modelos, datos y sistemas." },
  { num: "03", title: "Gobierno",      desc: "KRNL aplica políticas, validaciones, auditoría y control humano." },
  { num: "04", title: "Escala segura", desc: "IA operando con visibilidad, seguridad y control empresarial." },
];
const STEP_TARGETS = [0, 0.32, 0.60, 0.88];

// ── Strategic constellation background ───────────────────────────────────────
function ConstellationBg() {
  // Nodes: [x, y, radius] — corners, edges, orbital zone only
  // Title zone (x:340-1100, y:95-195) intentionally left empty
  const nodes: [number, number, number][] = [
    [85,   65,  3.5], // 0  top-left corner
    [1355, 78,  2.8], // 1  top-right corner
    [58,   692, 3.2], // 2  bottom-left corner
    [1382, 678, 2.8], // 3  bottom-right corner
    [28,   248, 2.2], // 4  left edge upper
    [24,   465, 2.5], // 5  left edge lower
    [1416, 235, 2.0], // 6  right edge upper
    [1412, 520, 2.5], // 7  right edge lower
    [178,  52,  2.2], // 8  top edge left
    [1265, 46,  2.5], // 9  top edge right
    [348,  730, 3.0], // 10 bottom left
    [720,  740, 2.5], // 11 bottom center
    [1095, 726, 2.8], // 12 bottom right
    [168,  158, 2.0], // 13 upper-left secondary
    [1275, 150, 2.0], // 14 upper-right secondary
    [138,  565, 2.2], // 15 lower-left secondary
    [1305, 548, 2.0], // 16 lower-right secondary
    [215,  340, 1.8], // 17 left mid-field
    [1228, 322, 1.8], // 18 right mid-field
    [535,  338, 2.5], // 19 ISO orbit left
    [912,  328, 2.5], // 20 ISO orbit right
    [500,  558, 2.2], // 21 ISO orbit lower-left
    [945,  548, 2.2], // 22 ISO orbit lower-right
    [660,  298, 1.8], // 23 ISO orbit upper-left
    [785,  298, 1.8], // 24 ISO orbit upper-right
  ];

  // Selective connections — strategic, not comprehensive
  const edges: [number, number][] = [
    [0, 8], [0, 13],
    [1, 9], [1, 14],
    [2, 5], [2, 15],
    [3, 7], [3, 16],
    [4, 13], [4, 17],
    [5, 15],
    [6, 14], [6, 18],
    [7, 16],
    [10, 11], [11, 12],
    [10, 15], [12, 16],
    [17, 19], [18, 20],
    [15, 21], [16, 22],
    [19, 23], [20, 24],
    [21, 22],
  ];

  // 3 main beams — converging from edges toward ISO orbital zone
  const beams = [
    { d: `M 28 248 C 180 292, 360 328, 535 338`,     col: B.purple,  dur: 4.5, del: 0.0 },
    { d: `M 1416 235 C 1255 286, 1070 320, 912 328`, col: B.magenta, dur: 5.2, del: 1.6 },
    { d: `M 720 740 C 700 672, 650 608, 618 568`,    col: B.purple,  dur: 4.8, del: 3.0 },
  ];

  // Slight curve on each edge for a premium organic feel
  const edgePath = (i: number, j: number) => {
    const [x1, y1] = nodes[i], [x2, y2] = nodes[j];
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    return `M ${x1} ${y1} Q ${(mx - dy * 0.09).toFixed(0)} ${(my + dx * 0.09).toFixed(0)}, ${x2} ${y2}`;
  };

  // Ring pulse on corner + orbital nodes only
  const ringIdxs = [0, 1, 2, 3, 19, 20, 21, 22];

  // ISO approximate center in the 1440×760 SVG canvas
  const ICX = 720, ICY = 402;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={B.purple} />
          <stop offset="100%" stopColor={B.magenta} />
        </linearGradient>
        {/* Mask: dims the title zone (top-center) so heading stays crisp */}
        <radialGradient id="cg-td" cx="50%" cy="14%" r="22%">
          <stop offset="0%"   stopColor="black" stopOpacity="0.92" />
          <stop offset="100%" stopColor="black" stopOpacity="0"    />
        </radialGradient>
        <mask id="cg-m">
          <rect width="1440" height="760" fill="white" />
          <rect width="1440" height="760" fill="url(#cg-td)" />
        </mask>
      </defs>

      {/* ── Masked layer: edges + nodes (hidden in title zone) ── */}
      <g mask="url(#cg-m)">
        {/* Ghost edge connections */}
        {edges.map(([i, j], k) => (
          <motion.path key={k} d={edgePath(i, j)} fill="none"
            stroke="url(#cg)" strokeWidth="0.65" strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.11 }}
            transition={{ duration: 1.4, delay: 0.06 + k * 0.07, ease: "easeIn" }} />
        ))}

        {/* Constellation nodes — pulsing */}
        {nodes.map(([x, y, r], i) => (
          <motion.circle key={i} cx={x} cy={y} r={r}
            fill="url(#cg)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.17, 0.30, 0.17] }}
            transition={{
              duration: 3.2 + (i % 6) * 0.58,
              repeat: Infinity,
              delay: 0.25 + i * 0.06,
              ease: "easeInOut",
            }} />
        ))}

        {/* Pulse rings on corner + orbital nodes */}
        {ringIdxs.map((ni, k) => {
          const [x, y, r] = nodes[ni];
          return (
            <motion.circle key={k} cx={x} cy={y}
              fill="none" stroke="url(#cg)" strokeWidth="0.65"
              animate={{ r: [r + 2, r + 11, r + 2], opacity: [0.20, 0, 0.20] }}
              transition={{ duration: 3.6 + k * 0.55, repeat: Infinity, ease: "easeOut", delay: k * 0.8 }} />
          );
        })}
      </g>

      {/* ── Beams — always visible, curve toward ISO ── */}
      {beams.map((b, k) => (
        <g key={k}>
          {/* Static beam: draws in once */}
          <motion.path d={b.d} fill="none"
            stroke={b.col} strokeWidth="0.9" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.20 }}
            transition={{ duration: 1.8, delay: 0.5 + k * 0.4, ease: [0.4, 0, 0.2, 1] }} />
          {/* Traveling particle dot */}
          <motion.path d={b.d} fill="none"
            stroke={b.col} strokeWidth="4" strokeLinecap="round"
            strokeDasharray="9 900"
            opacity={0.55}
            animate={{ strokeDashoffset: [800, -20] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "linear", delay: b.del }} />
        </g>
      ))}

      {/* ── Orbital ring around ISO center ── */}
      {/* Inner dashed orbit — slowly revolves */}
      <motion.circle cx={ICX} cy={ICY} r={108}
        fill="none" stroke="url(#cg)" strokeWidth="0.7"
        strokeDasharray="3 22"
        opacity={0.10}
        animate={{ strokeDashoffset: [0, -750] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }} />
      {/* Outer breathing ring */}
      <motion.circle cx={ICX} cy={ICY}
        fill="none" stroke={B.purple} strokeWidth="0.5"
        opacity={0.07}
        animate={{ r: [148, 155, 148] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

// ── Atmosphere background — KRNL brand particles ──────────────────────────────
function AtmosphereBg() {
  // Hardcoded particle layout: [x, y, r, colorKey, delay, driftY, driftX]
  const particles: [number, number, number, string, number, number, number][] = [
    [88,   95,  2.8, "#6D2BFF", 0.0, 18, 8],
    [320,  55,  2.0, "#D4009A", 0.9, 14, 12],
    [680,  130, 3.2, "#6D2BFF", 1.7, 22, 6],
    [1040, 72,  2.4, "#D4009A", 2.5, 16, 10],
    [1340, 168, 2.8, "#6D2BFF", 0.6, 20, 8],
    [52,   390, 2.2, "#D4009A", 1.4, 12, 14],
    [230,  545, 3.0, "#6D2BFF", 2.9, 18, 10],
    [510,  680, 2.5, "#D4009A", 0.4, 14, 8],
    [860,  640, 2.8, "#6D2BFF", 1.9, 20, 12],
    [1200, 590, 2.0, "#D4009A", 2.7, 16, 6],
    [1408, 672, 2.6, "#6D2BFF", 1.0, 12, 10],
    [720,  220, 1.8, "#D4009A", 3.3, 10, 16],
    [185,  290, 2.2, "#6D2BFF", 1.6, 16, 8],
    [1145, 365, 2.0, "#D4009A", 0.8, 14, 12],
    [440,  440, 2.8, "#6D2BFF", 2.2, 20, 6],
    [980,  480, 2.4, "#D4009A", 1.3, 18, 10],
    [1310, 440, 2.0, "#6D2BFF", 3.0, 12, 8],
    [620,  360, 1.6, "#D4009A", 0.5, 8,  14],
  ];

  // Connecting thread pairs (indices into particles array)
  const threads: [number, number][] = [
    [0, 2], [1, 3], [2, 4], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 10], [11, 13], [12, 14], [14, 15],
    [3, 11], [4, 16], [15, 16],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="atm-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6D2BFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D4009A" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Connecting threads — very faint */}
      {threads.map(([a, b], k) => {
        const [x1, y1] = particles[a];
        const [x2, y2] = particles[b];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 20;
        return (
          <motion.path
            key={k}
            d={`M ${x1} ${y1} Q ${mx} ${my}, ${x2} ${y2}`}
            fill="none"
            stroke="url(#atm-g)"
            strokeWidth="0.7"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.28, 0.14, 0.28] }}
            transition={{
              duration: 14 + k * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4 + k * 0.35,
            }}
          />
        );
      })}

      {/* Floating particles */}
      {particles.map(([x, y, r, col, del, dY, dX], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={col}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.18, 0.32, 0.18, 0],
            y: [0, -dY * 0.5, -dY, -dY * 0.5, 0],
            x: [0, dX * 0.3, 0, -dX * 0.3, 0],
          }}
          transition={{
            duration: 18 + i * 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: del,
          }}
        />
      ))}

    </svg>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds]       = useState({ start: 0, end: 4000 });
  const [step, setStep]           = useState(0);
  const [activeNav, setActiveNav] = useState("Inicio");
  const [scrolled, setScrolled]  = useState(false);
  const [page, setPage]           = useState<"home" | "producto" | "independencia" | "shadowai" | "gobierno" | "contacto" | "insights">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!scrollRef.current) return;
      const start = scrollRef.current.offsetTop;
      const end   = start + scrollRef.current.offsetHeight - window.innerHeight;
      setBounds({ start, end });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const PAGE_TO_NAV: Record<string, string> = {
      producto: "Producto", independencia: "Soberanía IA",
      shadowai: "Riesgos",  gobierno: "Gobierno",
      contacto: "", insights: "Casos de uso",
    };
    const handler = (e: Event) => {
      const dest = (e as CustomEvent<string>).detail;
      setPage(dest as Parameters<typeof setPage>[0]);
      setActiveNav(PAGE_TO_NAV[dest] ?? "");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("krnl:navigate", handler);
    return () => window.removeEventListener("krnl:navigate", handler);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [bounds.start, bounds.end], [0, 1], { clamp: true });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if      (v < 0.25) setStep(0);
      else if (v < 0.52) setStep(1);
      else if (v < 0.78) setStep(2);
      else               setStep(3);
    });
    return unsub;
  }, [scrollYProgress]);

  const goToStep = (i: number) => {
    const target = bounds.start + STEP_TARGETS[i] * Math.max(bounds.end - bounds.start, 0);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const haloScale = [0.82, 1, 1.05, 1.18][step];
  const haloOpac  = [0.45, 0.7, 0.78, 0.95][step];
  const lineOpac  = [0.5, 0.95, 0.85, 1][step];
  const isoScale  = [0.9, 1, 1.02, 1.1][step];

  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const sc  = STEP_CONTENT[step];
  const pan = PANELS[step] as any;
  const isRisk = pan.tone === "risk";

  return (
    <div className="min-h-screen overflow-x-clip" style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: `radial-gradient(120% 90% at 50% 0%, #FEFAFC 0%, #FAF5FB 50%, #F6F0FC 100%)`,
    }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : B.surface,
          backdropFilter: scrolled ? "blur(18px) saturate(1.3)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.3)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(231,225,236,0.55)" : B.border}`,
          boxShadow: scrolled ? "0 1px 24px rgba(109,43,255,0.06)" : "none",
        }}>
        <div className="grid max-md:flex max-md:justify-between max-md:items-center h-[64px] max-w-[1200px] mx-auto px-6 md:px-10"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          {/* Logo — left */}
          <div className="flex items-center">
            <a href="#" className="flex items-center select-none">
              <ImageWithFallback src={krnlLogo} alt="KRNL" style={{ display: "block", width: 110, height: "auto", objectFit: "contain" }} />
            </a>
          </div>
          {/* Menu — true center */}
          <div className="hidden md:flex items-center gap-1">
            {["Inicio", "Riesgos", "Producto", "Gobierno", "Soberanía IA", "Casos de uso"].map((item) => {
              const isActive = activeNav === item;
              return (
                <a key={item} href="#"
                  onClick={(e) => { e.preventDefault(); setActiveNav(item); setPage(item === "Producto" ? "producto" : item === "Soberanía IA" ? "independencia" : item === "Riesgos" ? "shadowai" : item === "Gobierno" ? "gobierno" : item === "Casos de uso" ? "insights" : "home"); window.scrollTo({ top: 0 }); }}
                  className="px-4 py-2 text-[14px] rounded-full transition-all duration-200"
                  style={{ color: isActive ? B.magenta : B.textSub, background: isActive ? B.magentaSoft : "transparent", fontWeight: isActive ? 500 : 400 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = B.magenta; e.currentTarget.style.background = B.magentaSoft; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? B.magenta : B.textSub; e.currentTarget.style.background = isActive ? B.magentaSoft : "transparent"; }}>
                  {item}
                </a>
              );
            })}
          </div>
          {/* CTA — right */}
          <div className="flex items-center justify-end">
            <button
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[14px] font-[600] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: GRAD, boxShadow: `0 4px 16px ${B.purple}40` }}
              onClick={() => { setActiveNav(""); setPage("contacto"); window.scrollTo({ top: 0 }); }}>
              Conoce KRNL <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ color: "#5B657A" }}
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50"
            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${B.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            <div className="px-6 py-4 flex flex-col gap-1">
              {["Inicio","Riesgos","Producto","Gobierno","Soberanía IA","Casos de uso"].map((item) => {
                const isActive = activeNav === item;
                return (
                  <a key={item} href="#"
                    className="px-4 py-3 text-[15px] rounded-xl transition-all duration-200"
                    style={{ color: isActive ? B.magenta : "#5B657A", background: isActive ? "#FDE8F6" : "transparent", fontWeight: isActive ? 600 : 400, display: "block", minHeight: 44 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setActiveNav(item);
                      setPage(item === "Producto" ? "producto" : item === "Soberanía IA" ? "independencia" : item === "Riesgos" ? "shadowai" : item === "Gobierno" ? "gobierno" : item === "Casos de uso" ? "insights" : "home");
                      window.scrollTo({ top: 0 });
                    }}>
                    {item}
                  </a>
                );
              })}
              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${B.border}` }}>
                <button
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[15px] font-[600] text-white"
                  style={{ background: GRAD, boxShadow: `0 4px 16px ${B.purple}40`, minHeight: 44 }}
                  onClick={() => { setMobileMenuOpen(false); setActiveNav(""); setPage("contacto"); window.scrollTo({ top: 0 }); }}>
                  Conoce KRNL <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {page === "producto" && <PaginaProducto />}
      {page === "independencia" && <PaginaIndependencia />}
      {page === "shadowai" && <PaginaElProblema />}
      {page === "gobierno" && <PaginaGobierno />}
      {page === "contacto" && <PaginaContacto />}
      {page === "insights" && <PaginaInsightsIA />}

      {page === "home" && <>
      {/* ── Mobile/tablet hero — replaces the scroll-jacking desktop hero below lg ── */}
      <MobileTabletHero
        onCTAClick={() => { setActiveNav(""); setPage("contacto"); window.scrollTo({ top: 0 }); }}
      />

      {/* ── Desktop hero (scroll story) — lg and up only ─────────────────────── */}
      <div className="hidden lg:block">
      <motion.div className="fixed top-0 left-0 h-[2px] z-50" style={{ width: progressW, background: GRAD }} />

      {/* ── Scroll story ──────────────────────────────────────────────────── */}
      <div ref={scrollRef} style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* Atmosphere layer — KRNL brand particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            <AtmosphereBg />
          </div>

          {/* Strategic constellation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            <ConstellationBg />
          </div>

          {/* ── Centered title ── */}
          <div className="relative z-10 pt-[144px] px-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ ...MONO, color: B.magenta }}>
                  {sc.eyebrow}
                </p>
                <h1 className="font-[800] leading-[1.13] mb-4" style={{ fontSize: 56, color: "#0F1F4A" }}>
                  {sc.pre}
                  <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{sc.hi}</span>
                  {sc.post}
                </h1>
                <p className="text-[14px] leading-relaxed mx-auto" style={{ color: "#6B7894", maxWidth: 540 }}>
                  {sc.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Diagram + panel ── */}
          <div className="relative z-10 flex-1 flex items-center justify-center gap-4 px-10 pb-2 min-h-0">

            {/* Diagram canvas */}
            <div className="relative shrink-0" style={{ width: 760, height: 340 }}>
              {/* Connectors — behind all node content (z:0) */}
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                style={{ zIndex: 0 }}
                animate={{ opacity: lineOpac }} transition={{ duration: 0.6 }}>
                <defs>
                  <linearGradient id="cL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={B.purple} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={B.magenta} stopOpacity="0.65" />
                  </linearGradient>
                  <linearGradient id="cR" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={B.magenta} stopOpacity="0.65" />
                    <stop offset="100%" stopColor={B.purple} stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                {NODES.map((n, i) => {
                  const isL = n.side === "L";
                  // Custom paths routed to avoid the text label zones of adjacent nodes.
                  // L-side text zones: x 58–230. R-side text zones: x 492–670.
                  // Curves fan out vertically before entering the clear zone x 230–492.
                  const PATHS: Record<string, string> = {
                    legal:  "M 58 60 C 200 60, 290 95, 328 170",
                    models: "M 58 170 C 180 170, 260 170, 328 170",
                    data:   "M 58 280 C 200 280, 290 245, 328 170",
                    crm:    "M 678 60 C 540 60, 455 100, 432 170",
                    tasks:  "M 678 170 C 580 170, 485 170, 432 170",
                    auto:   "M 678 280 C 540 280, 455 240, 432 170",
                  };
                  const d = PATHS[n.id] ?? "";
                  return (
                    <g key={n.id}>
                      {/* Dashed connector */}
                      <motion.path d={d} fill="none" stroke={isL ? "url(#cL)" : "url(#cR)"} strokeWidth="1.5"
                        strokeDasharray="3 6" strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -36] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: i * 0.2 }} />
                      {/* Traveling pulse dot — thinner, softer */}
                      <motion.path d={d} fill="none"
                        stroke={isL ? B.purple : B.magenta}
                        strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray="8 700"
                        opacity={0.45}
                        animate={{ strokeDashoffset: [350, -20] }}
                        transition={{ duration: 2.8 + i * 0.28, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }} />
                      {/* Endpoint dot at KRNL core edge */}
                      <motion.circle
                        cx={isL ? 328 : 432} cy={170} r={2.8}
                        fill={isL ? B.purple : B.magenta}
                        animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.9, 1.3, 0.9] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.38 }} />
                    </g>
                  );
                })}
              </motion.svg>

              {/* Nodes — always above connector SVG (zIndex: 2) */}
              {NODES.map(({ id, name, sub, Icon, iconC, side }, ni) => (
                <div key={id} className="absolute" style={{ top: iconC.y - 22, left: side === "L" ? 0 : 492, width: 230, zIndex: 2 }}>
                  {/* Card — glass node */}
                  <div
                    className={`flex items-center gap-2.5 px-3 py-2.5 transition-all duration-300 ${side === "R" ? "flex-row-reverse text-right" : ""}`}
                    style={{
                      background: "rgba(255,255,255,0.38)",
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      border: "1px solid rgba(109,43,255,0.16)",
                      borderRadius: 20,
                      boxShadow: "0 18px 50px rgba(15,40,112,0.08)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.border = "1px solid rgba(212,0,154,0.28)";
                      e.currentTarget.style.boxShadow = "0 22px 60px rgba(212,0,154,0.14)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.border = "1px solid rgba(109,43,255,0.16)";
                      e.currentTarget.style.boxShadow = "0 18px 50px rgba(15,40,112,0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Icon circle */}
                    <div className="relative shrink-0" style={{ width: 36, height: 36 }}>
                      <motion.div className="absolute rounded-full pointer-events-none"
                        style={{ inset: -6, border: `1px solid ${B.purple}1E`, background: `${B.purple}06` }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: ni * 0.46 }} />
                      <div className="w-9 h-9 rounded-full flex items-center justify-center relative z-10"
                        style={{
                          background: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(109,43,255,0.18)",
                          boxShadow: "0 0 12px rgba(109,43,255,0.14), inset 0 1px 0 rgba(255,255,255,0.90)",
                        }}>
                        <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="min-w-0">
                      <p className="text-[12px] font-[700] leading-tight" style={{ color: "#1C2B57" }}>{name}</p>
                      <p className="text-[10px] leading-snug mt-0.5" style={{ color: "#6B7894" }}>{sub}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Center halo + iso — above SVG (zIndex: 1) */}
              <div className="absolute" style={{ left: ISO.x - 100, top: ISO.y - 100, width: 200, height: 200, zIndex: 1 }}>
                {/* Outer glow */}
                <motion.div className="absolute rounded-full"
                  style={{ inset: -40, background: `radial-gradient(circle, ${B.magenta}2E 0%, ${B.purple}18 55%, transparent 75%)`, filter: "blur(16px)" }}
                  animate={{ scale: [1, 1.24, 1], opacity: [0.72, 0.38, 0.72] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                {/* Main halo */}
                <motion.div className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${B.magenta}50 0%, ${B.purple}30 50%, transparent 72%)` }}
                  animate={{ scale: [haloScale, haloScale * 1.12, haloScale], opacity: [haloOpac, haloOpac * 0.62, haloOpac] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: isoScale }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <ImageWithFallback src={krnlHeroIso} alt="KRNL" className="w-[130px] h-[130px] object-contain" />
                </motion.div>
              </div>
            </div>

            {/* Right panel */}
            <div className="rounded-3xl p-5 shrink-0 self-center relative" style={{ width: 280, background: "linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(247,242,255,0.75) 100%)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1.5px solid rgba(109,43,255,0.16)`, boxShadow: "0 8px 40px rgba(109,43,255,0.10), 0 1px 0 rgba(255,255,255,0.90) inset" }}>
              {/* Gradient defs — persiste entre pasos */}
              <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <defs>
                  <linearGradient id="krnlPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4009A" />
                    <stop offset="100%" stopColor="#6D2BFF" />
                  </linearGradient>
                </defs>
              </svg>
              <AnimatePresence mode="wait">
                <motion.div key={step}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}>
                  <h3 className="text-[16px] font-[800]" style={{ color: "#0F1F4A" }}>{pan.title}</h3>
                  <p className="text-[12px] mb-4 mt-0.5" style={{ color: "#98A2B3" }}>{pan.sub}</p>
                  <div className="flex flex-col gap-4">
                    {pan.items.map((it: any, i: number) => {
                      const iconStyle = isRisk
                        ? { color: B.warn }
                        : { stroke: "url(#krnlPanelGrad)", color: "transparent" };
                      return (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 7 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.52,
                            delay: prefersReducedMotion ? 0 : 0.10 + i * 0.40,
                            ease: [0.2, 0, 0.2, 1],
                          }}
                        >
                          <it.Icon
                            className="w-[18px] h-[18px] shrink-0 mt-[3px]"
                            style={iconStyle}
                            strokeWidth={1.75}
                          />
                          <div>
                            <p className="text-[13.5px] font-[800] leading-tight" style={{ color: isRisk ? B.warn : "#1C2B57" }}>{it.t}</p>
                            <p className="text-[11.5px] leading-snug mt-1" style={{ color: "#98A2B3" }}>{it.d}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="relative z-10 px-10 pb-6">
            <div className="max-w-[1420px] mx-auto rounded-3xl overflow-hidden relative"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,246,255,0.94) 100%)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", border: `1.5px solid rgba(109,43,255,0.13)`, boxShadow: "0 4px 28px rgba(109,43,255,0.07), inset 0 1px 0 rgba(255,255,255,0.80)" }}>
              {/* top progress track */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: B.borderSoft }}>
                <motion.div className="h-full" style={{ width: progressW, background: GRAD }} />
              </div>
              <div className="flex items-stretch">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  const done   = i < step;
                  return (
                    <div key={s.num} className="flex items-center flex-1">
                      <button onClick={() => goToStep(i)} className="text-left px-5 py-4 flex-1 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all text-[12px] font-[700]"
                            style={{
                              ...MONO,
                              background: active ? GRAD : "transparent",
                              border: active ? "none" : `1.5px solid ${done ? B.purple : B.border}`,
                              color: active ? "#fff" : done ? B.purple : B.textMuted,
                            }}>
                            {s.num}
                          </div>
                          <span className="text-[14px] font-[700]" style={{ color: active ? "#0F1F4A" : done ? "#6B7894" : "#98A2B3", opacity: i > step ? 0.7 : 1 }}>{s.title}</span>
                        </div>
                        <p className="text-[11px] leading-snug pl-12" style={{ color: "#98A2B3", opacity: active ? 1 : 0.7 }}>{s.desc}</p>
                      </button>
                      {i < 3 && <ChevronRight className="w-4 h-4 shrink-0" style={{ color: B.border }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>

      {/* ── Home sections ─────────────────────────────────────────────────── */}
      <SectionQueEs />
      <SectionParaQuien />
      <SectionAutonomia />
      <SectionIndependencia />
      <SectionFlujos />
      <SectionBeneficios />
      <SectionGobierno />
      <SectionActivacion />
      <KrnlFooter />
      </>}

    </div>
  );
}

// ── Editorial marker component ────────────────────────────────────────────────
function SectionMarker({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      background: `linear-gradient(135deg, #D4009A 0%, #6D2BFF 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {label}
    </span>
  );
}

// ── Dot-mesh background ───────────────────────────────────────────────────────
function DotMesh() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(109,43,255,0.065) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
      aria-hidden="true"
    />
  );
}

// ── System map visual ─────────────────────────────────────────────────────────
function SystemMapVisual({ inView }: { inView: boolean }) {
  const sources    = ["Agentes IA", "Datos", "Sistemas"];
  const outputs    = ["Control", "Trazabilidad", "Supervisión"];
  const ease       = [0.2, 0, 0.2, 1] as const;
  const indicators = [
    { label: "Validación activa", dot: "#22c55e" },
    { label: "Políticas: 14",    dot: B.purple },
    { label: "Registro en curso", dot: B.magenta },
  ];
  return (
    <div className="relative rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 16px 56px rgba(109,43,255,0.08), 0 2px 8px rgba(109,43,255,0.04)" }}>

      {/* Dashboard status indicators */}
      <div className="flex flex-wrap gap-2 mb-5">
        {indicators.map(({ label, dot }, i) => (
          <motion.div key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: `${dot}10`, border: `1px solid ${dot}28` }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.08, ease }}>
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: dot }}
              animate={inView ? { opacity: [1, 0.35, 1] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: dot, ...MONO }}>{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Source chips */}
      <div className="flex gap-2.5 mb-0.5">
        {sources.map((s, i) => (
          <motion.div key={s} className="flex-1 py-2.5 px-2 rounded-lg text-center"
            style={{ border: `1px solid ${B.border}`, background: B.surface, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: [0, -4, 0] } : { opacity: 0, y: -10 }}
            transition={{
              opacity: { duration: 0.45, delay: 0.28 + i * 0.1, ease },
              y: { duration: 2.8 + i * 0.5, delay: 0.28 + i * 0.1, repeat: Infinity, ease: "easeInOut" }
            }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: B.textSub, ...MONO }}>{s}</p>
          </motion.div>
        ))}
      </div>

      {/* Connector lines — top */}
      <div className="flex gap-2.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 flex justify-center relative" style={{ height: 20 }}>
            <motion.div style={{ width: 1, height: "100%", background: `linear-gradient(180deg, ${B.border} 0%, ${B.purple}3A 100%)`, transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 0.28, delay: 0.50 + i * 0.07, ease: "easeOut" }} />
            {inView && (
              <motion.div style={{ position: "absolute", top: 0, left: "50%", width: 4, height: 4, borderRadius: "50%", background: B.purple, transform: "translateX(-50%)", boxShadow: `0 0 6px ${B.purple}90` }}
                animate={{ y: [0, 20], opacity: [0, 1, 0.7, 0] }}
                transition={{ duration: 0.8, delay: 1.1 + i * 0.45, repeat: Infinity, repeatDelay: 1.6 + i * 0.4, ease: "easeIn" }} />
            )}
          </div>
        ))}
      </div>

      {/* KRNL hub */}
      <div className="relative">
        <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${B.purple}2E 0%, transparent 68%)`, filter: "blur(12px)" }}
          animate={inView ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="rounded-xl py-5 text-center relative"
          style={{ background: GRAD, boxShadow: `0 10px 40px rgba(109,43,255,0.32), 0 2px 8px rgba(212,0,154,0.20)` }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.6, delay: 0.52, ease }}>
          <img
            src={krnlLogoWhite}
            alt="KRNL"
            style={{ display: "block", maxWidth: 120, height: "auto", objectFit: "contain", margin: "0 auto" }}
          />
          <p style={{ ...MONO, color: "rgba(255,255,255,0.45)", fontSize: 8.5, marginTop: 6, letterSpacing: "0.26em" }}>GOVERNANCE LAYER</p>
        </motion.div>
      </div>

      {/* Connector lines — bottom */}
      <div className="flex gap-2.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 flex justify-center relative" style={{ height: 20 }}>
            <motion.div style={{ width: 1, height: "100%", background: `linear-gradient(180deg, ${B.purple}3A 0%, ${B.border} 100%)`, transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 0.28, delay: 0.68 + i * 0.07, ease: "easeOut" }} />
            {inView && (
              <motion.div style={{ position: "absolute", top: 0, left: "50%", width: 4, height: 4, borderRadius: "50%", background: B.magenta, transform: "translateX(-50%)", boxShadow: `0 0 6px ${B.magenta}90` }}
                animate={{ y: [0, 20], opacity: [0, 1, 0.7, 0] }}
                transition={{ duration: 0.8, delay: 1.7 + i * 0.45, repeat: Infinity, repeatDelay: 2 + i * 0.35, ease: "easeIn" }} />
            )}
          </div>
        ))}
      </div>

      {/* Output chips */}
      <div className="flex gap-2.5 mt-0.5">
        {outputs.map((o, i) => (
          <motion.div key={o} className="flex-1 py-2.5 px-2 rounded-lg text-center"
            style={{ border: `1px solid ${B.purple}30`, background: B.purpleSoft, boxShadow: "0 1px 4px rgba(109,43,255,0.08)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: [0, 4, 0] } : { opacity: 0, y: 10 }}
            transition={{
              opacity: { duration: 0.45, delay: 0.82 + i * 0.1, ease },
              y: { duration: 3.2 + i * 0.4, delay: 0.82 + i * 0.1, repeat: Infinity, ease: "easeInOut" }
            }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: B.purple, ...MONO }}>{o}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Section: Qué es KRNL ──────────────────────────────────────────────────────
function SectionQueEs() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-100px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  return (
    <section ref={sRef} className="relative overflow-hidden" style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      {/* Corner blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 68%)`, opacity: 0.65 }} />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 70%)`, opacity: 0.4 }} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: inV ? 1 : 0 }}
              transition={{ duration: 0.6 }}>
              <SectionMarker label="Qué es KRNL" />
            </motion.div>
            <h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-6" style={{ color: B.text }}>
              <motion.span style={{ display: "block" }}
                initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.72, delay: 0.14, ease }}>
                Una capa de gobierno
              </motion.span>
              <motion.span style={{ display: "block" }}
                initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.72, delay: 0.32, ease }}>
                para operar IA empresarial.
              </motion.span>
            </h2>
            <motion.p className="text-[17px] leading-relaxed" style={{ color: B.textSub, maxWidth: 440 }}
              initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.78, delay: 0.28, ease }}>
              KRNL conecta agentes, modelos, datos y sistemas para que la empresa pueda usar IA con control, trazabilidad y supervisión humana.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: inV ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}>
            <SystemMapVisual inView={inV} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Para quién es ────────────────────────────────────────────────────
function SectionParaQuien() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  const profiles = [
    { Icon: Boxes,      role: "Equipos de TI y Data",  desc: "Orquestan agentes, conectan APIs y gestionan modelos sin crear dependencias nuevas." },
    { Icon: Workflow,   role: "Operaciones",            desc: "Automatizan flujos críticos con validación, trazabilidad y supervisión humana integrada." },
    { Icon: Shield,     role: "Legal y Compliance",    desc: "Auditan cada interacción de IA con registros inmutables y políticas aplicadas en tiempo real." },
    { Icon: TrendingUp, role: "Líderes de negocio",   desc: "Escalan IA sin depender de una sola herramienta ni perder visibilidad de la operación." },
  ];
  return (
    <section ref={sRef} style={{ background: "#FCFAFD", borderTop: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
      {/* ── Topographic wave mesh ────────────────────────────────────────── */}
      {/* ── Ambient glows ────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {/* Glow magenta — esquina superior derecha */}
        <motion.div style={{
          position: "absolute", top: "-20%", right: "-15%",
          width: "55%", height: "70%",
          background: `radial-gradient(ellipse at center, rgba(212,0,154,0.07) 0%, transparent 68%)`,
          filter: "blur(32px)",
        }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }} />

        {/* Glow violeta — esquina inferior izquierda */}
        <motion.div style={{
          position: "absolute", bottom: "-18%", left: "-12%",
          width: "60%", height: "72%",
          background: `radial-gradient(ellipse at center, rgba(109,43,255,0.07) 0%, transparent 65%)`,
          filter: "blur(36px)",
        }}
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.65, 1] }}
          transition={{ duration: 26, ease: "easeInOut", repeat: Infinity, delay: 8 }} />

        {/* Glow lavanda — centro-inferior, casi imperceptible */}
        <motion.div style={{
          position: "absolute", bottom: "-10%", left: "30%", right: "30%",
          height: "55%",
          background: `radial-gradient(ellipse at center, rgba(168,126,255,0.05) 0%, transparent 70%)`,
          filter: "blur(28px)",
        }}
          animate={{ scale: [1.02, 1.05, 1.02], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 19, ease: "easeInOut", repeat: Infinity, delay: 4 }} />
      </div>
      {/* ─────────────────────────────────────────────────────────────────── */}

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28" style={{ position: "relative", zIndex: 10 }}>
        <motion.div style={{ maxWidth: 520, marginBottom: 72 }}
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.72, ease }}>
          <SectionMarker label="Para quién es" />
          <h2 className="text-[38px] font-[800] leading-[1.08] mt-4" style={{ color: B.text }}>
            Diseñado para equipos<br />que operan IA.
          </h2>
        </motion.div>
        {/* Shared gradient def for card icons */}
        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="krnlIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {profiles.map(({ Icon, role, desc }, i) => (
            <motion.div key={role}
              className="relative overflow-hidden"
              style={{ borderRadius: 20, padding: "28px 24px", background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid #E8DDF4", boxShadow: "0 2px 16px rgba(109,43,255,0.05), 0 1px 3px rgba(0,0,0,0.03)" }}
              initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.18 + i * 0.13, ease }}
              whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(109,43,255,0.10), 0 2px 8px rgba(109,43,255,0.05)", borderColor: "rgba(109,43,255,0.18)", transition: { duration: 0.22, ease: "easeOut" } }}>
              <Icon className="w-[34px] h-[34px] mb-5"
                style={{ stroke: "url(#krnlIconGrad)", color: "transparent", display: "block" }}
                strokeWidth={1.4} />
              <p className="text-[15px] font-[800] mb-2" style={{ color: "#0F2870" }}>{role}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "#6B7894" }}>{desc}</p>
              <div className="mt-5 h-px rounded-full overflow-hidden" style={{ background: "#EDE8F5" }}>
                <motion.div className="h-full" style={{ background: GRAD }}
                  initial={{ width: "0%" }}
                  animate={inV ? { width: `${38 + i * 14}%` } : { width: "0%" }}
                  transition={{ duration: 0.9, delay: 0.52 + i * 0.13, ease }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Beneficios ───────────────────────────────────────────────────────
function SectionBeneficios() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  const benefits = [
    { Icon: Shield,      title: "Menos riesgo operativo",                 desc: "Toda acción de IA pasa por validación antes de ejecutarse. Sin excepciones ni bypasses." },
    { Icon: FileText,    title: "Trazabilidad completa",                  desc: "Registro inmutable de cada decisión, respuesta y flujo ejecutado por cualquier agente." },
    { Icon: Eye,         title: "Control humano configurable",            desc: "Define en qué pasos interviene una persona y en cuáles la IA puede operar autónomamente." },
    { Icon: Link2,       title: "Independencia de herramientas aisladas", desc: "KRNL opera sobre lo que ya existe. No reemplaza sistemas, los conecta y los gobierna." },
    { Icon: TrendingUp,  title: "IA lista para escalar",                  desc: "Más flujos, más agentes, más volumen — sin perder gobernabilidad ni crear deuda operativa." },
  ];
  const renderBenefit = ({ Icon, title, desc }: typeof benefits[0], i: number) => (
    <motion.div key={title} className="flex gap-5 py-5 px-3 rounded-xl"
      style={{ borderTop: `1px solid ${B.border}` }}
      initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, delay: 0.18 + i * 0.10, ease }}
      whileHover={{ background: B.purpleSoft, transition: { duration: 0.15 } }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.border}` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: B.purple }} strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-[700] mb-1" style={{ color: B.text }}>{title}</p>
        <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
      </div>
    </motion.div>
  );
  return (
    <section ref={sRef} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28">
        {/* Header centrado */}
        <motion.div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 64px" }}
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.72, ease }}>
          <SectionMarker label="Beneficios" />
          <h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-5" style={{ color: B.text }}>
            Qué gana<br />tu organización.
          </h2>
          <p className="text-[16px] leading-relaxed" style={{ color: B.textSub }}>
            Operar IA sin gobierno es un pasivo. KRNL convierte ese pasivo en activo operativo.
          </p>
        </motion.div>
        {/* Beneficios: 2 columnas iguales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          <div>
            {benefits.slice(0, 3).map((b, i) => renderBenefit(b, i))}
            <div style={{ borderTop: `1px solid ${B.border}` }} />
          </div>
          <div>
            {benefits.slice(3).map((b, i) => renderBenefit(b, i + 3))}
            <div style={{ borderTop: `1px solid ${B.border}` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Autonomía Operativa ─────────────────────────────────────────────
function DataLockIcon({ className, style, strokeWidth }: { className?: string; style?: CSSProperties; strokeWidth?: number }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <Database className={className} style={style} strokeWidth={strokeWidth} />
      <Lock style={{ ...style, position: "absolute", bottom: -3, right: -5, width: 12, height: 12 }} strokeWidth={2.2} />
    </span>
  );
}

function SectionAutonomia() {
  const items = [
    { Icon: BrainCircuit as ElementType, name: "Agentes IA",       desc: "Orquesta agentes especializados desde una capa central de control." },
    { Icon: Box          as ElementType, name: "Modelos",           desc: "Gestiona, versiona y audita modelos con trazabilidad completa." },
    { Icon: DataLockIcon as ElementType, name: "Datos internos",    desc: "Integra documentos, reportes y sistemas sin dependencias externas." },
    { Icon: Workflow     as ElementType, name: "Automatizaciones",  desc: "Centraliza flujos y acciones con gobierno unificado y supervisión." },
  ];
  return (
    <section style={{ background: B.surface, borderTop: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes krnl-organic-drift {
          0%   { transform: translate(   0px,   0px); }
          38%  { transform: translate( 260px,  90px); }
          72%  { transform: translate( 100px, -65px); }
          100% { transform: translate(   0px,   0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .krnl-organic { animation: none !important; }
        }
      `}</style>
      {/* ── Background organic layer ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <svg className="krnl-organic"
          style={{ position: "absolute", inset: "-6%", width: "112%", height: "112%", animation: "krnl-organic-drift 7s ease-in-out infinite" }}
          viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">

          {/* ── Top edge — full width, above content ─────────────────── */}
          <path d="M 0 58 C 320 18, 725 78, 1125 28 C 1285 8, 1392 50, 1440 38"
            fill="none" stroke="#6D2BFF" strokeWidth="0.90" opacity="0.11" />
          <path d="M 0 58 C 320 18, 725 78, 1125 28 C 1285 8, 1392 50, 1440 38"
            fill="none" stroke="#6D2BFF" strokeWidth="1.5" strokeDasharray="2.5 20" opacity="0.10" />

          {/* ── Bottom edge — full width, below content ───────────────── */}
          <path d="M 0 575 C 355 538, 762 605, 1112 555 C 1288 528, 1388 570, 1440 552"
            fill="none" stroke="#D4009A" strokeWidth="1.2" opacity="0.22" />
          <path d="M 0 575 C 355 538, 762 605, 1112 555 C 1288 528, 1388 570, 1440 552"
            fill="none" stroke="#D4009A" strokeWidth="1.8" strokeDasharray="2 22" opacity="0.18" />

          {/* ── Right-side curves (panel zone x > 680) ───────────────── */}
          <path d="M 702 0 C 862 115, 998 72, 1162 192 C 1292 278, 1388 178, 1440 258"
            fill="none" stroke="#D4009A" strokeWidth="1.1" opacity="0.22" />
          <path d="M 1112 105 C 1208 222, 1265 322, 1355 440 C 1405 510, 1440 548, 1440 600"
            fill="none" stroke="#A87EFF" strokeWidth="1.0" opacity="0.20" />
          <path d="M 682 640 C 822 558, 972 618, 1122 518 C 1272 438, 1385 498, 1440 428"
            fill="none" stroke="#6D2BFF" strokeWidth="1.0" opacity="0.20" />

          {/* ── Right-side dotted olitas ──────────────────────────────── */}
          <path d="M 632 148 C 812 98, 1012 198, 1212 118 C 1328 68, 1405 138, 1440 118"
            fill="none" stroke="#6D2BFF" strokeWidth="2.0" strokeDasharray="2.5 18" opacity="0.22" />
          <path d="M 708 495 C 908 445, 1112 525, 1308 462 C 1395 435, 1440 462, 1440 462"
            fill="none" stroke="#D4009A" strokeWidth="1.8" strokeDasharray="2 20" opacity="0.20" />
          <path d="M 862 328 C 1012 272, 1172 352, 1332 290 C 1412 262, 1440 288, 1440 288"
            fill="none" stroke="#A87EFF" strokeWidth="1.6" strokeDasharray="2 24" opacity="0.18" />

          {/* ── Crossing curve (behind left text) ────────────────────── */}
          <path d="M 0 290 C 325 228, 658 365, 965 262 C 1162 202, 1345 305, 1440 262"
            fill="none" stroke="#6D2BFF" strokeWidth="0.8" opacity="0.10" />

          {/* ── Nodes — right side + edges, very sparse on left ──────── */}
          <circle cx="725"  cy="65"  r="2.8" fill="#6D2BFF" opacity="0.13" />
          <circle cx="1128" cy="28"  r="2.5" fill="#6D2BFF" opacity="0.12" />
          <circle cx="285"  cy="25"  r="1.8" fill="#6D2BFF" opacity="0.07" />
          <circle cx="762"  cy="592" r="2.8" fill="#D4009A" opacity="0.13" />
          <circle cx="1115" cy="555" r="2.5" fill="#D4009A" opacity="0.12" />
          <circle cx="352"  cy="560" r="1.8" fill="#D4009A" opacity="0.07" />
          <circle cx="1162" cy="192" r="3.0" fill="#D4009A" opacity="0.14" />
          <circle cx="862"  cy="125" r="2.6" fill="#6D2BFF" opacity="0.13" />
          <circle cx="1298" cy="268" r="2.5" fill="#D4009A" opacity="0.12" />
          <circle cx="1112" cy="105" r="2.5" fill="#A87EFF" opacity="0.12" />
          <circle cx="1265" cy="418" r="2.4" fill="#6D2BFF" opacity="0.11" />
          <circle cx="968"  cy="268" r="2.2" fill="#6D2BFF" opacity="0.11" />
          <circle cx="862"  cy="330" r="2.0" fill="#A87EFF" opacity="0.10" />
          <circle cx="1012" cy="492" r="2.2" fill="#D4009A" opacity="0.11" />
          <circle cx="185"  cy="45"  r="1.6" fill="#6D2BFF" opacity="0.06" />
          <circle cx="85"   cy="545" r="1.6" fill="#D4009A" opacity="0.06" />
        </svg>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16 items-center">
          <div>
            <SectionMarker label="Autonomía Operativa" />
            <h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-6" style={{ color: B.text }}>
              Opera IA sin depender<br />de terceros.
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: B.textSub, maxWidth: 420 }}>
              KRNL permite orquestar agentes, modelos, datos y automatizaciones desde una capa propia de operación y control.
            </p>
          </div>
          {/* Stack operativo */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #C9BFDF", boxShadow: "0 6px 36px rgba(109,43,255,0.12), 0 2px 8px rgba(0,0,0,0.05)" }}>
            {/* Franja KRNL — parte integral del panel */}
            <div style={{ height: 4, background: GRAD }} />
            {/* Layers */}
            <div style={{ background: "linear-gradient(160deg, #F3EDF9 0%, #EAE1F3 100%)", position: "relative", padding: "6px 0" }}>
              {/* Línea conectora: left = paddingLeft(28) + iconHalf(24) - 1 = 51 */}
              {/* top/bottom = containerPad(6) + itemPadTop(22) + iconHalf(24) = 52        */}
              <div style={{ position: "absolute", left: 51, top: 52, bottom: 52, width: 1, background: `linear-gradient(to bottom, rgba(109,43,255,0.25), rgba(212,0,154,0.22))`, zIndex: 0 }} />
              {items.map(({ Icon, name, desc }, i) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 20, padding: "22px 28px", borderBottom: i < items.length - 1 ? "1px solid rgba(109,43,255,0.09)" : "none", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.95)", border: "1px solid rgba(109,43,255,0.16)", boxShadow: "0 2px 12px rgba(109,43,255,0.10)", position: "relative", zIndex: 2 }}>
                    <Icon className="w-[22px] h-[22px]" style={{ color: B.purple }} strokeWidth={1.55} />
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#0F2870", lineHeight: 1.2, margin: 0 }}>{name}</p>
                    <p style={{ fontSize: 13, color: "#5B6880", lineHeight: 1.55, marginTop: 4 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Independencia Total ──────────────────────────────────────────────
function SectionIndependencia() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  const proofs = [
    { Icon: Shield,       title: "Sin exposición operativa",  desc: "Cada flujo pasa por una capa de validación antes de ejecutarse en cualquier sistema." },
    { Icon: Link2,        title: "Ecosistema centralizado",   desc: "Agentes, modelos y sistemas en una única capa de gobierno integrada y controlada." },
    { Icon: CheckCircle2, title: "Control total del ciclo",   desc: "Desde el diseño hasta la ejecución, todo opera bajo tus reglas y políticas propias." },
  ];
  return (
    <section ref={sRef} className="relative overflow-hidden" style={{ background: `radial-gradient(80% 80% at 50% 50%, #EEECF7 0%, ${B.softBg} 65%)` }}>
      <FlowingCurves />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-36">
        {/* Centered full-width headline — deliberately different from all 2-col sections */}
        <motion.div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 72px" }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.82, ease }}>
          <SectionMarker label="Independencia Total" />
          <h2 className="font-[800] leading-[1.08] mt-4 mb-6" style={{ fontSize: 38, color: B.text }}>
            Tú defines los permisos,<br />los límites y las condiciones.
          </h2>
          <p className="text-[18px] leading-relaxed" style={{ color: B.textSub, maxWidth: 520, margin: "0 auto" }}>
            Evita quedar atado a herramientas aisladas o flujos sin gobierno. KRNL centraliza el ecosistema y protege la operación.
          </p>
        </motion.div>
        {/* Proof points — 3-col glass cards */}
        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <linearGradient id="krnlIndepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4009A" />
              <stop offset="100%" stopColor="#6D2BFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofs.map(({ Icon, title, desc }, i) => (
            <motion.div key={title}
              className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.70)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 20px rgba(109,43,255,0.07)" }}
              initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.15, ease }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(109,43,255,0.12)`, transition: { duration: 0.2 } }}>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${B.magenta}0E 0%, transparent 70%)` }} />
              <Icon className="w-[22px] h-[22px] mb-4 block"
                style={{ stroke: "url(#krnlIndepGrad)", color: "transparent" }}
                strokeWidth={1.6} />
              <p className="text-[15px] font-[700] mb-2" style={{ color: B.text }}>{title}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Flujos Inteligentes ──────────────────────────────────────────────
function SectionFlujos() {
  const steps = [
    { num: "01", Icon: Box,          title: "Diseña",    desc: "Define flujos con agentes, modelos y contexto de datos." },
    { num: "02", Icon: Link2,        title: "Conecta",   desc: "Integra sistemas, fuentes y automatizaciones en cada paso." },
    { num: "03", Icon: CheckCircle2, title: "Valida",    desc: "Aplica políticas y reglas antes de ejecutar cualquier acción." },
    { num: "04", Icon: Activity,     title: "Supervisa", desc: "Monitorea en tiempo real con trazabilidad y control total." },
  ];
  return (
    <section style={{ background: B.softBg, borderTop: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
      {/* ── Background: diagonal channel lines — geometric/sequential contrast to Independencia's organic curves ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1440 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="fl-ch-a" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6D2BFF" stopOpacity="0" />
            <stop offset="22%"  stopColor="#6D2BFF" stopOpacity="1" />
            <stop offset="78%"  stopColor="#8844DD" stopOpacity="1" />
            <stop offset="100%" stopColor="#8844DD" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fl-ch-b" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#9040D0" stopOpacity="0" />
            <stop offset="22%"  stopColor="#9040D0" stopOpacity="1" />
            <stop offset="78%"  stopColor="#D4009A" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4009A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 5 parallel diagonal channel lines — straight, static, direction left→right */}
        {/* Slope ≈ 21°: each line spans 1600px horizontally for 580px vertically */}
        <line x1="-400" y1="580" x2="1200" y2="-40"
          stroke="url(#fl-ch-a)" strokeWidth="0.90" strokeDasharray="11 37" opacity="0.085" />
        <line x1="-80"  y1="580" x2="1520" y2="-40"
          stroke="url(#fl-ch-a)" strokeWidth="0.80" strokeDasharray="11 37" opacity="0.075" />
        <line x1="240"  y1="580" x2="1840" y2="-40"
          stroke="url(#fl-ch-b)" strokeWidth="0.75" strokeDasharray="11 37" opacity="0.068" />
        <line x1="560"  y1="580" x2="2160" y2="-40"
          stroke="url(#fl-ch-b)" strokeWidth="0.80" strokeDasharray="11 37" opacity="0.072" />
        <line x1="880"  y1="580" x2="2480" y2="-40"
          stroke="url(#fl-ch-a)" strokeWidth="0.85" strokeDasharray="11 37" opacity="0.078" />

        {/* Small waypoint dots at mid-height along three channels */}
        <circle cx="396"  cy="272" r="2.8" fill="#6D2BFF" opacity="0.075" />
        <circle cx="716"  cy="272" r="2.8" fill="#8040D8" opacity="0.070" />
        <circle cx="1036" cy="272" r="2.8" fill="#A030C8" opacity="0.065" />

        {/* Tiny directional chevrons along the mid-channel — hint at flow direction */}
        <path d="M 228 388 L 240 375 L 252 362" fill="none" stroke="#6D2BFF" strokeWidth="0.75" opacity="0.068" strokeLinejoin="round" />
        <path d="M 548 388 L 560 375 L 572 362" fill="none" stroke="#8040D8" strokeWidth="0.70" opacity="0.062" strokeLinejoin="round" />
        <path d="M 868 388 L 880 375 L 892 362" fill="none" stroke="#B020B8" strokeWidth="0.65" opacity="0.058" strokeLinejoin="round" />
      </svg>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28">
        <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 80px" }}>
          <SectionMarker label="Flujos Inteligentes" />
          <h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-5" style={{ color: B.text }}>
            De tareas sueltas a flujos<br />con control humano.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: B.textSub }}>
            Diseña, conecta y supervisa procesos con IA, integrando validación, contexto y trazabilidad en cada paso.
          </p>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Line grows left→right on scroll */}
          <motion.div className="absolute pointer-events-none hidden md:block"
            style={{ top: 22, left: "13%", right: "13%", height: 1, transformOrigin: "left",
              background: `linear-gradient(90deg, ${B.purple}30 0%, ${B.magenta}50 50%, ${B.purple}30 100%)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
          {steps.map(({ num, Icon, title, desc }, i) => (
            <motion.div key={num} className="relative z-10 flex flex-col items-center text-center px-2 md:px-4"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.3 + i * 0.28, ease: [0.2, 0, 0.2, 1] }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                style={{ background: GRAD, boxShadow: `0 4px 18px ${B.purple}35` }}>
                <Icon className="w-5 h-5" style={{ color: "#fff" }} strokeWidth={1.75} />
              </div>
              <p className="text-[11px] font-[700] tracking-[0.15em] mb-2" style={{ ...MONO, color: B.textMuted }}>{num}</p>
              <p className="text-[17px] font-[800] mb-2" style={{ color: B.text }}>{title}</p>
              <p className="text-[13px] leading-snug" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Count-up — triggered by parent inView, not its own observer ───────────────
function CountUp({ to, suffix = "", decimals = 0, duration = 1300, inView }: {
  to: number; suffix?: string; decimals?: number; duration?: number; inView: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span>{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

// ── Pillar card — receives inView from parent for coordinated sequencing ───────
function PillarCard({ Icon, title, desc, delay, inView, chip }: {
  Icon: ElementType; title: string; desc: string; delay: number; inView: boolean; chip?: string;
}) {
  return (
    <motion.div className="relative overflow-hidden rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 16px rgba(109,43,255,0.05)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0, 0.2, 1] }}
      whileHover={{ y: -5, boxShadow: `0 14px 36px rgba(109,43,255,0.11)`, transition: { duration: 0.22, ease: "easeOut" } }}>
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.purple}0B 0%, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.border}` }}>
          <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
        </div>
        {chip && (
          <span className="text-[9px] px-2 py-0.5 rounded-full font-[600]"
            style={{ background: B.purpleSoft, color: B.purple }}>{chip}</span>
        )}
      </div>
      <p className="text-[14px] font-[700] mb-2" style={{ color: B.text }}>{title}</p>
      <p className="text-[13px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
    </motion.div>
  );
}

// ── Section: Gobierno Empresarial ─────────────────────────────────────────────
function SectionGobierno() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const ec: [number,number,number,number] = [0.2, 0, 0.2, 1];

  const indicators = [
    { Icon: Shield,       title: "Políticas configurables",  desc: "Reglas por agente, modelo, flujo y área del negocio.",           chip: "Activo",            chipC: B.purple  },
    { Icon: CheckCircle2, title: "Validación previa",        desc: "Respuestas revisadas antes de llegar a usuarios o sistemas.",     chip: "Configurable",      chipC: "#22c55e" },
    { Icon: FileText,     title: "Auditoría persistente",    desc: "Registro trazable de entradas, salidas y decisiones.",           chip: "Trazable",          chipC: B.magenta },
    { Icon: Eye,          title: "Supervisión humana",       desc: "Intervención configurable en acciones críticas o de alto riesgo.", chip: "Humano en el loop", chipC: "#0EA5E9" },
  ];

  const flowSteps = [
    { label: "Entrada",         sub: "Usuario / Sistema", col: B.purple  },
    { label: "Políticas KRNL",  sub: "Reglas activas",    col: B.purple  },
    { label: "Validación",      sub: "Revisión output",   col: B.magenta },
    { label: "Modelo IA",       sub: "Respuesta",         col: "#0EA5E9" },
    { label: "Respuesta auditada", sub: "Trazada",        col: "#22c55e" },
    { label: "Supervisión",     sub: "Si aplica",         col: B.magenta },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.softBg} 0%, ${B.purpleSoft}50 100%)`, borderTop: `1px solid ${B.border}` }}>
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.purple}07 0%, transparent 72%)` }} />
      <div className="absolute -bottom-12 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magenta}06 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-24">

        {/* Header */}
        <div className="max-w-[720px] mb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <SectionMarker label="Gobierno Empresarial" />
          </motion.div>
          <motion.h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-4"
            style={{ color: B.text }}
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.12, ease: ec }}>
            KRNL valida, aplica políticas<br />y registra cada interacción.
          </motion.h2>
          <motion.p className="text-[17px] leading-relaxed"
            style={{ color: B.textSub, maxWidth: 620 }}
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.65, delay: 0.24, ease: ec }}>
            KRNL aplica reglas, valida respuestas, registra decisiones y permite supervisión humana antes de que la IA llegue a usuarios o sistemas críticos.
          </motion.p>
        </div>

        {/* Flow diagram */}
        <motion.div className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.07)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.3, ease: ec }}>
          <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-5" style={{ ...MONO, color: B.textMuted }}>Flujo de gobierno</p>
          <div className="flex items-center gap-0 overflow-x-auto">
            {flowSteps.map(({ label, sub, col }, i) => (
              <div key={label} className="flex items-center shrink-0">
                <motion.div className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: 0.44 + i * 0.09, ease: ec }}>
                  <div className="px-4 py-2.5 rounded-xl text-center"
                    style={{ background: i === 0 || i === 5 ? `${col}12` : i === 2 || i === 4 ? `${col}12` : B.purpleSoft, border: `1.5px solid ${col}30`, minWidth: 110 }}>
                    <p className="text-[12px] font-[700] leading-snug" style={{ color: i === 1 ? B.purple : B.text }}>{label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: B.textMuted }}>{sub}</p>
                  </div>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center mx-1 shrink-0">
                    <motion.div className="h-px"
                      style={{ background: GRAD, width: 24, opacity: 0.45 }}
                      initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.35, delay: 0.5 + i * 0.09, ease: ec }} />
                    <span className="text-[10px] px-0.5" style={{ color: B.textMuted }}>›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 indicator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {indicators.map(({ Icon, title, desc, chip, chipC }, i) => (
            <motion.div key={title} className="relative overflow-hidden rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.90)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 2px 12px rgba(109,43,255,0.04)" }}
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: 0.52 + i * 0.10, ease: ec }}
              whileHover={{ y: -4, boxShadow: `0 12px 36px rgba(109,43,255,0.09)`, transition: { duration: 0.2 } }}>
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${chipC}0F 0%, transparent 70%)` }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.border}` }}>
                  <Icon className="w-4 h-4" style={{ color: B.purple }} strokeWidth={1.75} />
                </div>
                <span className="text-[9px] px-2.5 py-1 rounded-full font-[700]"
                  style={{ background: `${chipC}15`, color: chipC }}>{chip}</span>
              </div>
              <p className="text-[13px] font-[700] mb-1.5" style={{ color: B.text }}>{title}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: B.textSub }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom capability cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { Icon: Shield,       title: "Define reglas",       desc: "Configura políticas por agente, modelo, área o flujo de trabajo.",         chip: "Políticas"         },
            { Icon: CheckCircle2, title: "Valida respuestas",   desc: "Revisa salidas antes de enviarlas a usuarios o sistemas externos.",        chip: "Validación"        },
            { Icon: FileText,     title: "Registra decisiones", desc: "Guarda entradas, salidas, modelo usado y contexto de cada ejecución.",     chip: "Auditoría"         },
            { Icon: Eye,          title: "Escala a humano",     desc: "Activa revisión manual en acciones sensibles o de alto impacto.",          chip: "Human in the loop" },
          ].map(({ Icon, title, desc, chip }, i) => (
            <PillarCard key={title} Icon={Icon} title={title} desc={desc}
              delay={0.7 + i * 0.1} inView={inView} chip={chip} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Animated background: flowing ribbon curves ────────────────────────────────
function FlowingCurves() {
  // 3 ribbon spines: each is 4 parallel paths spaced ~9px apart.
  // Opacity capped at 0.13 — intended as whisper-level texture behind content.
  const W = [0.30, 0.42, 0.42, 0.30]; // strokeWidths inner→outer
  const O = [0.05, 0.13, 0.13, 0.05]; // opacities inner→outer

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ filter: "blur(0.7px)" }}
    >
      <defs>
        <linearGradient id="fc-a" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#D4009A" stopOpacity="0" />
          <stop offset="15%"  stopColor="#D4009A" stopOpacity="1" />
          <stop offset="82%"  stopColor="#6D2BFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#6D2BFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fc-b" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#6D2BFF" stopOpacity="0" />
          <stop offset="17%"  stopColor="#6D2BFF" stopOpacity="1" />
          <stop offset="78%"  stopColor="#D4009A" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4009A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Spine A — upper, flows left→right */}
      <motion.g animate={{ y: [0,-13,6,0], x: [0,8,-4,0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}>
        {[-13,-4,4,13].map((o,i)=>(
          <path key={i}
            d={`M -80 ${130+o} C 340 ${50+o}, 800 ${215+o}, 1140 ${95+o} C 1320 ${58+o}, 1470 ${148+o}, 1520 ${165+o}`}
            fill="none" stroke="url(#fc-a)" strokeWidth={W[i]} opacity={O[i]} />
        ))}
      </motion.g>

      {/* Spine B — mid, flows right→left (counter-crossing) */}
      <motion.g animate={{ y: [0,16,-9,0], x: [0,-10,5,0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 7 }}>
        {[-12,-4,4,12].map((o,i)=>(
          <path key={i}
            d={`M 1520 ${300+o} C 1100 ${195+o}, 680 ${408+o}, 300 ${265+o} C 100 ${210+o}, -55 ${308+o}, -80 ${325+o}`}
            fill="none" stroke="url(#fc-b)" strokeWidth={W[i]} opacity={O[i]} />
        ))}
      </motion.g>

      {/* Spine C — lower accent */}
      <motion.g animate={{ y: [0,-9,12,0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut", delay: 15 }}>
        {[-10,0,10].map((o,i)=>(
          <path key={i}
            d={`M -80 ${440+o} C 260 ${338+o}, 680 ${502+o}, 1040 ${378+o} C 1230 ${318+o}, 1440 ${420+o}, 1520 ${438+o}`}
            fill="none" stroke="url(#fc-a)"
            strokeWidth={[0.27,0.38,0.27][i]} opacity={[0.04,0.09,0.04][i]} />
        ))}
      </motion.g>
    </svg>
  );
}

// ── Section: Activación ───────────────────────────────────────────────────────
function SectionActivacion() {
  return (
    <section className="relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #FBF8FF 0%, #FFF5FC 50%, #F8F4FF 100%)", borderTop: `1px solid ${B.border}` }}>
      {/* Breathing glow — center bottom */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(72% 82% at 50% 118%, ${B.magenta}14 0%, ${B.purple}0A 50%, transparent 72%)` }}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }} />
      {/* Slow drift — top-left */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(46% 56% at 10% 16%, ${B.purple}0D 0%, transparent 62%)` }}
        animate={{ x: [0, 24, 0], y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3.5 }} />
      {/* Magenta accent — bottom-right */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(36% 44% at 88% 92%, ${B.magenta}0C 0%, transparent 58%)` }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6.5 }} />
      <div className="relative z-10 text-center px-5 md:px-10 py-16 md:py-[120px]" style={{ maxWidth: 720, margin: "0 auto" }}>
        <span className="block mb-6 text-[11px] font-[700] tracking-[0.22em] uppercase"
          style={{ ...MONO, color: B.magenta }}>
          Activación
        </span>
        <h2 className="font-[900] leading-[1.06] mb-5" style={{ fontSize: 44, color: B.text }}>
          Empieza a gobernar tu<br />operación de IA.
        </h2>
        <p className="text-[17px] leading-relaxed" style={{ color: B.textSub, maxWidth: 560, margin: "0 auto 40px" }}>
          Conecta agentes, modelos y datos desde una capa central de control, trazabilidad y supervisión humana.
        </p>
        <button
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-[700] transition-all hover:scale-[1.03] active:scale-[0.98]"
          style={{ fontSize: 15, color: "#fff", background: GRAD, boxShadow: `0 8px 32px ${B.purple}38` }}>
          Hablar con un especialista <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

