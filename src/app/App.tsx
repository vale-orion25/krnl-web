import { useRef, useEffect, useState, type ElementType, type CSSProperties } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, ChevronRight, Scale, BrainCircuit, Box, Database, Lock, Users, Kanban, Workflow,
  Shield, CheckCircle2, FileText, Activity, Eye, EyeOff, ShieldOff, AlertTriangle,
  TrendingUp, Boxes, Link2, Menu, X,
  MinusCircle, Sparkles, ShieldAlert, ShieldCheck, BarChart3, Search, Layers, User, UserCog, Rocket, Share2, Wallet, ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import krnlLogo      from "@/imports/krnl-logo-dark.png";
import krnlLogoWhite from "@/imports/krnl-logo-white.png";
import krnlHeroIso   from "@/imports/krnl-iso.png";
import orionLogo     from "@/imports/Logo_horizontal_color.png";
import PaginaProducto, { OpenAIIcon } from "./Producto";
import PaginaIndependencia from "./Independencia";
import PaginaElProblema from "./ElProblema";
import PaginaGobierno from "./Gobierno";
import PaginaContacto from "./Contacto";
import KrnlFooter from "./KrnlFooter";
import MobileTabletHero from "./MobileTabletHero";
import { krnlNavigate, hashToPage, type PageKey } from "./navigate";

const NAV_ITEM_TO_PAGE: Record<string, PageKey> = {
  "Inicio": "home", "Riesgos": "shadowai", "Producto": "producto",
  "Gobierno": "gobierno", "Soberanía IA": "independencia",
};
const PAGE_TO_NAV_ITEM: Record<PageKey, string> = {
  home: "Inicio", shadowai: "Riesgos", producto: "Producto",
  gobierno: "Gobierno", independencia: "Soberanía IA", contacto: "",
};

// ── Brand tokens ──────────────────────────────────────────────────────────────
export const B = {
  purple:      "#6D2BFF",
  magenta:     "#D4009A",
  text:        "#0D1524",
  textSub:     "#5B657A",
  textMuted:   "#7A86A3",
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
  { eyebrow: "03 / Gobierno",      pre: "KRNL ",        hi: "gobierna",        post: " la IA empresarial.", body: "Cada interacción queda bajo reglas claras y con supervisión activa." },
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
    title: "Capa de operación", sub: "Una capa para integrar y conectar.", tone: "ok",
    items: [
      { Icon: Link2,   t: "Agentes conectados", d: "Agentes que pueden operar bajo gobierno en una capa común." },
      { Icon: Box,     t: "Modelos registrados", d: "Modelos organizables en un catálogo único." },
      { Icon: Boxes,   t: "Sistemas integrados", d: "Sistemas que pueden conectarse de forma segura." },
      { Icon: Workflow, t: "Flujos activos",     d: "Automatizaciones que pueden centralizarse." },
    ],
  },
  {
    title: "Gobierno bajo política", sub: "Reglas y control según política.", tone: "gov",
    items: [
      { Icon: Shield,       t: "Políticas",      d: "Reglas que pueden aplicarse a cada interacción." },
      { Icon: CheckCircle2, t: "Validación",     d: "Respuestas que pueden revisarse bajo política." },
      { Icon: FileText,     t: "Auditoría",      d: "Retención de registros configurable." },
      { Icon: Activity,     t: "Trazabilidad",   d: "Uso que puede quedar registrado y trazado." },
    ],
  },
  {
    title: "Operación estable", sub: "Escala segura y controlada.", tone: "ok",
    items: [
      { Icon: Shield,       t: "Cumplimiento",     d: "Interacciones bajo política." },
      { Icon: Activity,     t: "Interacciones",    d: "Pueden procesarse con trazabilidad de extremo a extremo." },
      { Icon: CheckCircle2, t: "Incidentes",       d: "Incidentes bajo seguimiento continuo." },
      { Icon: Boxes,        t: "Modelos activos",  d: "Modelos que pueden gobernarse y escalar." },
    ],
  },
];

// ── Timeline ─────────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "IA dispersa",   desc: "La IA crece sin control en silos y herramientas desconectadas." },
  { num: "02", title: "Conexión",      desc: "KRNL propone organizar y conectar agentes, modelos, datos y sistemas." },
  { num: "03", title: "Gobierno",      desc: "La operación puede gobernarse con reglas claras y supervisión humana." },
  { num: "04", title: "Escala segura", desc: "IA que puede operar con visibilidad, seguridad y control empresarial." },
];
const STEP_TARGETS = [0, 0.21, 0.39, 0.56];

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
  const [page, setPage]           = useState<PageKey>(() => hashToPage(window.location.hash));
  const [activeNav, setActiveNav] = useState(() => PAGE_TO_NAV_ITEM[hashToPage(window.location.hash)]);
  const [scrolled, setScrolled]  = useState(false);
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
    const handler = () => {
      const dest = hashToPage(window.location.hash);
      setPage(dest);
      setActiveNav(PAGE_TO_NAV_ITEM[dest] ?? "");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [bounds.start, bounds.end], [0, 1], { clamp: true });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Step 04 ("Escala segura") keeps a much longer dwell range so the
      // sticky hero doesn't release into the next section before it's read.
      if      (v < 0.163) setStep(0);
      else if (v < 0.339) setStep(1);
      else if (v < 0.509) setStep(2);
      else                setStep(3);
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
        <div className="grid max-lg:flex max-lg:justify-between max-lg:items-center h-[64px] max-w-[1200px] mx-auto px-6 md:px-10"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          {/* Logo — left */}
          <div className="flex items-center">
            <a href="#" onClick={e => { e.preventDefault(); krnlNavigate("home"); }} className="flex items-center select-none">
              <ImageWithFallback src={krnlLogo} alt="KRNL" style={{ display: "block", width: 110, height: "auto", objectFit: "contain" }} />
            </a>
          </div>
          {/* Menu — true center */}
          <div className="hidden lg:flex items-center gap-1">
            {["Inicio", "Riesgos", "Producto", "Gobierno", "Soberanía IA"].map((item) => {
              const isActive = activeNav === item;
              return (
                <a key={item} href="#"
                  onClick={(e) => { e.preventDefault(); krnlNavigate(NAV_ITEM_TO_PAGE[item] ?? "home"); }}
                  className="px-3 lg:px-4 py-2 text-[14px] rounded-full transition-all duration-200"
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
              className="hidden lg:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-full text-[14px] font-[600] text-white whitespace-nowrap shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: GRAD, boxShadow: `0 4px 16px ${B.purple}40` }}
              onClick={() => krnlNavigate("contacto")}>
              Conoce KRNL <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg"
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
          <div className="lg:hidden absolute top-full left-0 right-0 z-50"
            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${B.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            <div className="px-6 py-4 flex flex-col gap-1">
              {["Inicio","Riesgos","Producto","Gobierno","Soberanía IA"].map((item) => {
                const isActive = activeNav === item;
                return (
                  <a key={item} href="#"
                    className="px-4 py-3 text-[15px] rounded-xl transition-all duration-200"
                    style={{ color: isActive ? B.magenta : "#5B657A", background: isActive ? "#FDE8F6" : "transparent", fontWeight: isActive ? 600 : 400, display: "block", minHeight: 44 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      krnlNavigate(NAV_ITEM_TO_PAGE[item] ?? "home");
                    }}>
                    {item}
                  </a>
                );
              })}
              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${B.border}` }}>
                <button
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[15px] font-[600] text-white"
                  style={{ background: GRAD, boxShadow: `0 4px 16px ${B.purple}40`, minHeight: 44 }}
                  onClick={() => { setMobileMenuOpen(false); krnlNavigate("contacto"); }}>
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

      {page === "home" && <>
      {/* ── Mobile/tablet hero — replaces the scroll-jacking desktop hero below lg ── */}
      <MobileTabletHero
        onCTAClick={() => krnlNavigate("contacto")}
      />

      {/* ── Desktop hero (scroll story) — lg and up only ─────────────────────── */}
      <div className="hidden lg:block">
      <motion.div className="fixed top-0 left-0 h-[2px] z-50" style={{ width: progressW, background: GRAD }} />

      {/* ── Scroll story ──────────────────────────────────────────────────── */}
      {/* Extra height vs. the original 400vh is dwell time for step 04 only — steps 01-03 keep their original scroll length. */}
      <div ref={scrollRef} style={{ height: "560vh" }}>
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
              <p className="text-[9px] mt-3 pt-2 leading-snug" style={{ color: "#98A2B3", opacity: 0.75, borderTop: "1px solid rgba(152,162,179,0.25)" }}>
                Ejemplo conceptual de operación · no corresponde a métricas reales
              </p>
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
      {/* Shared gradient def for Home icons (.home-icon-gradient) */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="krnlIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4009A" />
            <stop offset="100%" stopColor="#6D2BFF" />
          </linearGradient>
        </defs>
      </svg>
      <SectionQueEs />
      <SectionRespaldoOrion />
      <SectionTecnologiasCompatibles />
      <SectionParaQuien />
      <SectionGobierno />
      <SectionMarcoRegulatorio />
      <SectionBeneficios />
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
  const sources    = ["Agentes IA", "Modelos", "Datos", "Sistemas"];
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
        {sources.map((_, i) => (
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

      {/* Flecha: agentes, datos y sistemas convergen hacia KRNL */}
      <div className="flex justify-center" style={{ marginTop: -7, marginBottom: -1, position: "relative", zIndex: 1 }}>
        <ChevronDown className="w-3.5 h-3.5" style={{ color: `${B.purple}70` }} strokeWidth={2.5} />
      </div>

      {/* KRNL hub — núcleo / capa central del sistema */}
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.div className="absolute pointer-events-none"
          style={{ inset: -10, borderRadius: 22, background: `radial-gradient(circle at 50% 50%, ${B.purple}3E 0%, transparent 70%)`, filter: "blur(18px)" }}
          animate={inView ? { opacity: [0.55, 1, 0.55], scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="rounded-xl py-7 text-center relative"
          style={{ background: GRAD, border: "1.5px solid rgba(255,255,255,0.32)", boxShadow: `0 16px 52px rgba(109,43,255,0.40), 0 4px 12px rgba(212,0,154,0.24)` }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.6, delay: 0.52, ease }}>
          <img
            src={krnlLogoWhite}
            alt="KRNL"
            style={{ display: "block", maxWidth: 136, height: "auto", objectFit: "contain", margin: "0 auto" }}
          />
          <p style={{ ...MONO, color: "rgba(255,255,255,0.6)", fontSize: 9, marginTop: 8, letterSpacing: "0.16em" }}>CAPA DE OPERACIÓN Y GOBERNANZA</p>
        </motion.div>
      </div>
      <p style={{ fontSize: 9, color: B.textMuted, ...MONO, marginTop: 14, opacity: 0.75 }}>Representación conceptual · datos ilustrativos</p>
    </div>
  );
}

// ── Section: Qué es KRNL ──────────────────────────────────────────────────────
function SectionQueEs() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-100px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  return (
    <section ref={sRef} className="relative overflow-hidden" style={{ background: B.softBg, borderTop: `1px solid ${B.border}` }}>
      {/* Corner blobs */}
      <div className="absolute -top-24 -right-24 w-56 h-56 sm:w-96 sm:h-96 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 68%)`, opacity: 0.65 }} />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 sm:w-64 sm:h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 70%)`, opacity: 0.4 }} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="rounded-[28px] p-6 md:p-10" style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 24px 64px rgba(109,43,255,0.09), 0 4px 16px rgba(0,0,0,0.04)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-center">
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: inV ? 1 : 0 }}
                transition={{ duration: 0.6 }}>
                <SectionMarker label="Qué es KRNL" />
              </motion.div>
              <h2 className="text-[34px] font-[800] leading-[1.1] mt-4 mb-5" style={{ color: B.text }}>
                <motion.span style={{ display: "block" }}
                  initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.72, delay: 0.14, ease }}>
                  De herramientas aisladas a
                </motion.span>
                <motion.span style={{ display: "block" }}
                  initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.72, delay: 0.32, ease }}>
                  una operación de IA gobernada.
                </motion.span>
              </h2>
              <motion.p className="text-[17px] leading-relaxed" style={{ color: B.textSub, maxWidth: 440 }}
                initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.78, delay: 0.28, ease }}>
                KRNL propone una capa para conectar agentes, modelos, datos y sistemas, y operar IA con reglas, evidencia y supervisión humana.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: inV ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}>
              <SystemMapVisual inView={inV} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Tecnologías compatibles ──────────────────────────────────────────
// Solo marcas/modelos de IA con los que KRNL es compatible — no son clientes ni partners de Orión.
// Logos reutilizados de la sección Arquitectura (Producto.tsx) — ninguno nuevo/inventado.
const TECNOLOGIAS_COMPATIBLES = [
  { label: "OpenAI / ChatGPT",   alt: "OpenAI",    LogoIcon: OpenAIIcon, col: "#10A37F",
    desc: "Modelos avanzados para comprensión y generación de texto.", badge: "API Cloud" },
  { label: "Anthropic / Claude", alt: "Anthropic", logo: "https://i.logos-download.com/114232/31117-s2560-aa51d43aaa1664d26ce478638acbf9e7.png/Claude_Logo_2023_icon-s2560.png?dl", col: "#C07F56",
    desc: "Razonamiento avanzado y análisis de contexto seguro.", badge: "API Cloud" },
  { label: "Google / Gemini",    alt: "Google",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1920px-Google_Gemini_icon_2025.svg.png", col: "#6C63FF",
    desc: "Modelos multimodales para datos y experiencias unificadas.", badge: "API Cloud" },
  { label: "Modelos locales / on-premise", alt: "Ollama", logo: "https://cdn.simpleicons.org/ollama/2D3748", col: "#2D3748",
    desc: "Ejecución segura dentro de tu infraestructura y red.", badge: "On-premise" },
];

const COMPAT_BENEFITS = [
  { label: "Gobierno corporativo", Icon: Shield },
  { label: "Trazabilidad completa", Icon: Share2 },
  { label: "Control y seguridad",   Icon: Lock },
];

const compatEase = [0.2, 0, 0.2, 1] as const;
const compatEaseHover = [0.16, 1, 0.3, 1] as const;
const COMPAT_NODE_X = [120, 360, 600, 840] as const; // centros aprox. de las 4 columnas del grid (viewBox 960 = max-w-[960px])
const COMPAT_TRUNK_X = 480;
const COMPAT_BUS_Y = 64;

// Halo (mancha de luz difuminada) + badge de logo flotante — sin líneas propias: la conexión
// "de sistema" ahora la da el conector de la cápsula (CompatConnector), no un anillo por card.
function CompatLogoStage({ col, i, hovered, reduced, LogoIcon, logo, alt }: { col: string; i: number; hovered: boolean; reduced: boolean; LogoIcon?: ElementType; logo?: string; alt: string }) {
  const floatDuration = 3.8 + i * 0.6, floatDelay = i * 0.45;
  const haloDuration  = 4.6 + i * 0.5, haloDelay  = i * 0.35;
  return (
    <div className="relative flex items-center justify-center mb-5" style={{ width: 136, height: 136 }}>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 172, height: 172, background: `radial-gradient(circle, ${col}59 0%, ${col}26 40%, transparent 72%)`, filter: "blur(28px)", zIndex: 0 }}
        animate={
          reduced ? { scale: hovered ? 1.3 : 1, opacity: hovered ? 0.95 : 0.6 }
          : hovered ? { scale: 1.3, opacity: 0.95 }
          : { scale: [1, 1.14, 1], opacity: [0.55, 0.85, 0.55] }
        }
        transition={
          reduced || hovered ? { duration: 0.4, ease: "easeOut" }
          : { duration: haloDuration, delay: haloDelay, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 92, height: 92, zIndex: 20,
          background: "linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 100%)",
          border: `1px solid ${col}40`,
          boxShadow: `0 10px 24px -6px ${col}4D, inset 0 1px 0 rgba(255,255,255,0.7)`,
        }}
        animate={
          reduced ? { y: 0, scale: hovered ? 1.08 : 1 }
          : hovered ? { y: -2, scale: 1.08 }
          : { y: [0, -7, 0] }
        }
        transition={
          reduced || hovered ? { duration: 0.35, ease: "easeOut" }
          : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="w-[42px] h-[42px] flex items-center justify-center">
          {LogoIcon
            ? <LogoIcon className="w-full h-full" style={{ color: col }} role="img" aria-label={alt} />
            : logo
            ? <img src={logo} alt={alt} className="w-full h-full object-contain" />
            : null}
        </span>
      </motion.div>
    </div>
  );
}

function CompatCard({ item, i, inV, reduced }: { item: typeof TECNOLOGIAS_COMPATIBLES[number]; i: number; inV: boolean; reduced: boolean }) {
  const { label, alt, LogoIcon, logo, col, desc, badge } = item;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative flex flex-col items-center justify-start text-center" translate="no"
      style={{
        borderRadius: 24,
        padding: "36px 18px 26px",
        background: `linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.58) 100%), radial-gradient(130% 100% at 50% -10%, ${col}22 0%, transparent 60%)`,
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: `1px solid ${hovered ? `${col}59` : `${col}2E`}`,
        boxShadow: hovered
          ? `0 1px 2px rgba(13,21,36,0.05), 0 22px 48px -14px ${col}5C, 0 32px 64px -28px rgba(13,21,36,0.20)`
          : `0 1px 2px rgba(13,21,36,0.04), 0 10px 28px -10px ${col}3D, 0 20px 44px -24px rgba(13,21,36,0.12)`,
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.55 + i * 0.08, ease: compatEase }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: compatEaseHover } }}
    >
      <CompatLogoStage col={col} i={i} hovered={hovered} reduced={reduced} LogoIcon={LogoIcon} logo={logo} alt={alt} />
      <span className="text-[13.5px] font-[700] leading-snug" style={{ color: B.text }}>{label}</span>
      <p className="text-[11.5px] leading-snug mt-2" style={{ color: B.textSub }}>{desc}</p>
      <span className="inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 rounded-full text-[9.5px] font-[700] uppercase tracking-[0.06em]"
        style={{ background: `${col}12`, color: col }}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col }} />
        {badge}
      </span>
    </motion.div>
  );
}

// Cápsula "[logo KRNL] · Plataforma de agentes" — el orquestador, visualmente arriba del sistema.
function CompatCapsule({ inV }: { inV: boolean }) {
  return (
    <motion.div
      className="relative z-10 flex justify-center mb-5 md:mb-0"
      initial={{ opacity: 0, y: -8 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: compatEase }}
    >
      {/* Halo muy sutil detrás de la cápsula, para que se sienta la capa central del sistema */}
      <div className="absolute pointer-events-none" style={{
        width: 240, height: 90, top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${B.purple}20 0%, transparent 70%)`,
        filter: "blur(26px)", zIndex: 0,
      }} />
      <div className="relative inline-flex items-center gap-3 rounded-full" style={{
        padding: "9px 22px 9px 16px",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${B.purple}2A`,
        boxShadow: "0 6px 20px rgba(109,43,255,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
      }}>
        <span className="relative flex items-center justify-center shrink-0" style={{ width: 7, height: 7 }}>
          <motion.span className="absolute inset-0 rounded-full" style={{ background: B.purple }}
            animate={{ opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
        <img src={krnlLogo} alt="KRNL" style={{ height: 17, width: "auto", display: "block" }} />
        <span className="shrink-0" style={{ width: 1, height: 14, background: B.border }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: B.textSub, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
          Plataforma de agentes
        </span>
      </div>
    </motion.div>
  );
}

// Conector: un tronco que se bifurca en 2 brazos curvos, cada uno terminando en línea recta
// (el mismo trazo hace de "rama que baja" y de "bus entre las 2 cards de su lado" — sin líneas extra).
// Solo desktop: en 2 columnas los nodos ya no corresponden a nada visualmente.
function CompatConnector({ inV, reduced }: { inV: boolean; reduced: boolean }) {
  return (
    <svg
      className="hidden md:block mx-auto w-full max-w-[960px]"
      viewBox="0 0 960 64" preserveAspectRatio="none" width="100%" height={64}
      style={{ overflow: "visible" }} aria-hidden="true"
    >
      <motion.path
        d={`M${COMPAT_TRUNK_X},0 L${COMPAT_TRUNK_X},14`}
        fill="none" stroke={`${B.purple}4D`} strokeWidth={1.5}
        strokeLinecap="round" strokeDasharray="1.5 6"
        initial={{ pathLength: 0 }}
        animate={inV ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, ease: compatEase }}
      />
      <circle cx={COMPAT_TRUNK_X} cy={14} r={2} fill={B.purple} fillOpacity={0.4} />

      <motion.path
        d={`M${COMPAT_TRUNK_X},14 C${COMPAT_TRUNK_X},32 404,64 360,64 L120,64`}
        fill="none" stroke={`${B.purple}33`} strokeWidth={1.25}
        strokeLinecap="round" strokeDasharray="1.5 6"
        initial={{ pathLength: 0 }}
        animate={inV ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: compatEase }}
      />
      <motion.path
        d={`M${COMPAT_TRUNK_X},14 C${COMPAT_TRUNK_X},32 556,64 600,64 L840,64`}
        fill="none" stroke={`${B.purple}33`} strokeWidth={1.25}
        strokeLinecap="round" strokeDasharray="1.5 6"
        initial={{ pathLength: 0 }}
        animate={inV ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: compatEase }}
      />

      {COMPAT_NODE_X.map((x, i) => (
        <g key={x}>
          <motion.circle
            cx={x} cy={COMPAT_BUS_Y} r={3.5} fill="none" stroke={B.purple} strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={
              reduced ? { opacity: 0 }
              : inV ? { r: [3.5, 8], opacity: [0.35, 0] } : { opacity: 0 }
            }
            transition={
              reduced ? { duration: 0 }
              : { duration: 2.6, delay: 0.7 + i * 0.4, repeat: Infinity, ease: "easeOut" }
            }
          />
          <motion.circle
            cx={x} cy={COMPAT_BUS_Y} r={3} fill={B.surface} stroke={B.purple} strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inV ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.08, ease: compatEase }}
          />
        </g>
      ))}
    </svg>
  );
}

function SectionTecnologiasCompatibles() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const reduced = !!useReducedMotion();
  return (
    <section ref={sRef} className="relative overflow-hidden" style={{ background: B.softBg, borderTop: `1px solid ${B.border}` }}>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-14">
        <motion.div className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: compatEase }}>
          <SectionMarker label="Compatibilidad" />
          <h2 className="font-[800] mt-3 mb-2.5" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", color: B.text }}>
            Compatible con los modelos y herramientas que tu empresa ya usa
          </h2>
          <p style={{ color: B.textSub, fontSize: 14.5, maxWidth: 560, margin: "0 auto" }}>
            KRNL permite operar agentes, modelos y automatizaciones sobre tecnologías conocidas, manteniendo gobierno, trazabilidad y control.
          </p>
        </motion.div>

        <div className="relative max-w-[1020px] mx-auto">
          <CompatCapsule inV={inV} />
          <CompatConnector inV={inV} reduced={reduced} />

          <div className="relative overflow-hidden" style={{
            borderRadius: 32,
            border: `1px solid ${B.purple}1F`,
            background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(252,250,255,0.5) 100%)",
          }}>
            <span className="hidden sm:inline" style={{
              position: "absolute", top: 16, left: 26,
              ...MONO, fontSize: 9.5, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: `${B.purple}73`,
            }}>
              Capa de compatibilidad
            </span>

            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute", inset: "-15% 5%",
                background: `radial-gradient(ellipse 60% 100% at 50% 45%, ${B.purple}14 0%, ${B.magenta}0D 45%, transparent 72%)`,
                filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
              }}
              animate={reduced ? { opacity: 0.85 } : { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
              transition={{ duration: 22, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 pt-10 pb-7 px-5 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[960px] mx-auto">
                {TECNOLOGIAS_COMPATIBLES.map((item, i) => (
                  <CompatCard key={item.label} item={item} i={i} inV={inV} reduced={reduced} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 pt-6"
                style={{ borderTop: `1px solid ${B.purple}1A` }}>
                {COMPAT_BENEFITS.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: B.purple }} strokeWidth={1.75} />
                    <span className="text-[13px] font-[600]" style={{ color: B.textSub }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Para quién es ────────────────────────────────────────────────────
// Unifica el flujo "necesidad → agente gobernado" (protagonista) con los roles que
// participan (bloque de apoyo, en chips — no otra tanda de cards grandes).
function SectionParaQuien() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  const steps = [
    { n: "01", Icon: Search,      title: "Detecta una necesidad", desc: "Un equipo identifica una tarea, consulta o proceso repetitivo." },
    { n: "02", Icon: UserCog,     title: "Configura un agente",   desc: "Define qué debe hacer, con qué contexto y bajo qué reglas." },
    { n: "03", Icon: ShieldCheck, title: "Opera con gobierno",    desc: "La operación puede aplicar trazabilidad, políticas, auditoría y supervisión humana." },
  ];
  const roles = [
    { Icon: User,       label: "Usuarios de negocio" },
    { Icon: Workflow,   label: "Operaciones" },
    { Icon: Boxes,      label: "TI y Data" },
    { Icon: Shield,     label: "Legal y Compliance" },
    { Icon: TrendingUp, label: "Líderes de área" },
    { Icon: Wallet,     label: "Finanzas" },
  ];
  return (
    <section ref={sRef} style={{ background: "#FCFAFD", borderTop: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
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

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-24" style={{ position: "relative", zIndex: 10 }}>
        <motion.div className="text-center" style={{ margin: "0 auto 48px" }}
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.72, ease }}>
          <SectionMarker label="Para quién es" />
          <h2 className="font-[800] leading-[1.15] mt-4 mb-3 mx-auto" style={{ fontSize: "clamp(26px, 3.2vw, 38px)", color: B.text, maxWidth: 760 }}>
            Usuarios creando agentes, con gobierno desde el inicio.
          </h2>
          <p style={{ color: B.textSub, fontSize: 15.5, maxWidth: 560, margin: "0 auto" }}>
            KRNL permite que personas de distintas áreas pasen de una necesidad operativa a un agente gobernado, sin convertir cada solicitud en un proyecto de desarrollo.
          </p>
        </motion.div>

        {/* Bloque principal: flujo de 3 pasos — protagonista de la sección */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-3 max-w-[980px] mx-auto mb-12 md:mb-16">
          {steps.map(({ n, Icon, title, desc }, i) => (
            <div key={n} className="flex flex-col md:flex-row items-center gap-4 md:gap-3" style={{ flex: 1 }}>
              <motion.div className="w-full rounded-2xl"
                style={{ background: B.surface, border: "1px solid #EDE7F7", boxShadow: "0 2px 14px rgba(109,43,255,0.05)" }}
                initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center rounded-full shrink-0" style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${B.magentaSoft} 0%, ${B.purpleSoft} 100%)`, border: `1px solid ${B.purple}25` }}>
                      <Icon className="w-[22px] h-[22px] home-icon-gradient" strokeWidth={1.9} />
                    </span>
                    <span style={{ ...MONO, fontSize: 11, fontWeight: 700, color: B.textMuted }}>{n}</span>
                  </div>
                  <p className="text-[15.5px] font-[800] mb-2" style={{ color: "#0F2870" }}>{title}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#6B7894" }}>{desc}</p>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 shrink-0 rotate-90 md:rotate-0" style={{ color: `${B.magenta}70` }} />
              )}
            </div>
          ))}
        </div>

        {/* Bloque secundario: roles involucrados — apoyo, no otra tanda de cards grandes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, delay: 0.65, ease }}>
          <p className="text-center text-[11px] font-[700] tracking-[0.16em] uppercase mb-4" style={{ ...MONO, color: B.magenta }}>
            Usuarios que pueden generar valor
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-[820px] mx-auto">
            {roles.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-[600]"
                style={{ background: "#F8F5FD", border: `1px solid ${B.purple}30`, color: B.text }}>
                <Icon className="w-4 h-4 shrink-0 home-icon-gradient" strokeWidth={2} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Respaldo institucional Orión ─────────────────────────────────────
// Franja compacta tipo "sello de confianza" — no una sección narrativa. Credenciales
// confirmadas (mismas que ya se usan en Producto.tsx/Contacto.tsx, ninguna inventada).
const RESPALDO_CREDENCIALES = ["+25 años", "ISO 27001", "ISO 9001", "Empresa B", "EFY", "Ciberseguridad"];

function SectionRespaldoOrion() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  return (
    <section ref={sRef} style={{ background: "#E6E0EF", borderTop: `1px solid ${B.border}`, borderBottom: `1px solid #D9CFE8` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <motion.div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-7 md:gap-14"
          initial={{ opacity: 0, y: 8 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <ImageWithFallback src={orionLogo} alt="Orión" className="w-[56px] md:w-[80px] shrink-0" style={{ height: "auto", display: "block" }} />
            <span className="hidden md:block shrink-0" style={{ width: 1, height: 24, background: `${B.purple}35` }} />
            <p className="text-[15px] font-[700] shrink-0" style={{ color: B.text }}>
              KRNL cuenta con el respaldo de Orión
            </p>
          </div>
          <span className="hidden md:block shrink-0" style={{ width: 1, height: 24, background: `${B.purple}35` }} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {RESPALDO_CREDENCIALES.map(item => (
              <span key={item} className="inline-flex items-center px-4 py-1.5 rounded-full text-[11.5px] font-[600]" translate="no"
                style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${B.purple}25`, color: B.textSub }}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Beneficios ───────────────────────────────────────────────────────
function SectionBeneficios() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  const rows = [
    { sin: { Icon: ShieldAlert, t: "Acciones sin validación" },      con: { Icon: ShieldCheck, t: "Reglas antes de ejecutar" },       resultado: { Icon: BarChart3, t: "Menos riesgo operativo" } },
    { sin: { Icon: EyeOff,      t: "Decisiones invisibles" },        con: { Icon: FileText,    t: "Registro completo" },              resultado: { Icon: Search,    t: "Mayor trazabilidad" } },
    { sin: { Icon: Users,       t: "Uso aislado por áreas" },        con: { Icon: Layers,      t: "Reglas comunes para todos" },          resultado: { Icon: Link2,     t: "Menos dependencia" } },
    { sin: { Icon: User,        t: "Supervisión manual informal" },  con: { Icon: UserCog,     t: "Supervisión centralizada" },         resultado: { Icon: ShieldCheck, t: "Mayor confianza" } },
    { sin: { Icon: TrendingUp,  t: "Pilotos difíciles de escalar" }, con: { Icon: Share2,      t: "Flujos coordinados" },               resultado: { Icon: Rocket,    t: "IA lista para crecer" } },
  ];
  const Cell = ({ Icon, text, badgeBg, iconC, textC, weight }: { Icon: ElementType; text: string; badgeBg: string; iconC: string; textC: string; weight: number }) => (
    <div className="flex items-center gap-3 px-6 py-4">
      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: badgeBg }}>
        <Icon className="w-5 h-5" style={{ color: iconC }} strokeWidth={1.8} />
      </div>
      <p className="text-[14px] leading-snug" style={{ color: textC, fontWeight: weight }}>{text}</p>
    </div>
  );
  const CellMobile = ({ Icon, label, text, badgeBg, iconC, labelC, textC, weight }: { Icon: ElementType; label: string; text: string; badgeBg: string; iconC: string; labelC: string; textC: string; weight: number }) => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: badgeBg }}>
        <Icon className="w-[18px] h-[18px]" style={{ color: iconC }} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[10px] font-[700] uppercase tracking-[0.08em] mb-0.5" style={{ color: labelC }}>{label}</p>
        <p className="text-[14px] leading-snug" style={{ color: textC, fontWeight: weight }}>{text}</p>
      </div>
    </div>
  );
  return (
    <section ref={sRef} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-28">
        {/* Header centrado */}
        <motion.div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}
          initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.72, ease }}>
          <SectionMarker label="Beneficios" />
          <h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-5" style={{ color: B.text }}>
            Qué gana<br />tu organización.
          </h2>
          <p className="text-[16px] leading-relaxed" style={{ color: B.textSub }}>
            KRNL transforma IA dispersa en una operación ordenada, trazable y lista para escalar.
          </p>
        </motion.div>

        {/* ── Matriz comparativa — desktop / tablet ── */}
        <motion.div className="hidden md:block rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${B.border}`, boxShadow: "0 8px 32px rgba(109,43,255,0.08)" }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, delay: 0.15, ease }}>
          <div className="grid grid-cols-3">
            <div className="flex items-center justify-center gap-2 px-6 py-5" style={{ background: B.softBg, borderBottom: `1px solid ${B.border}` }}>
              <MinusCircle className="w-[18px] h-[18px]" style={{ color: B.textSub }} strokeWidth={2} />
              <span className="text-[13px] font-[800] tracking-[0.04em]" style={{ color: B.text }}>SIN KRNL</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-6 py-5" style={{ background: B.magentaSoft, borderBottom: `1px solid ${B.border}` }}>
              <Sparkles className="w-[18px] h-[18px]" style={{ color: B.magenta }} strokeWidth={2} />
              <span className="text-[13px] font-[800] tracking-[0.04em]" style={{ color: B.magenta }}>CON KRNL</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-6 py-5" style={{ background: B.purpleSoft, borderBottom: `1px solid ${B.border}` }}>
              <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: B.purple }} strokeWidth={2} />
              <span className="text-[13px] font-[800] tracking-[0.04em]" style={{ color: B.purple }}>RESULTADO</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <motion.div key={row.resultado.t} className="grid grid-cols-3"
              style={{ borderTop: i > 0 ? `1px solid ${B.borderSoft}` : "none" }}
              initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.30 + i * 0.08 }}>
              <Cell Icon={row.sin.Icon} text={row.sin.t} badgeBg={B.softBg} iconC={B.textSub} textC={B.textSub} weight={400} />
              <Cell Icon={row.con.Icon} text={row.con.t} badgeBg={B.magentaSoft} iconC={B.magenta} textC={B.text} weight={400} />
              <Cell Icon={row.resultado.Icon} text={row.resultado.t} badgeBg={B.purpleSoft} iconC={B.purple} textC={B.text} weight={600} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Cards apiladas por fila — mobile ── */}
        <div className="md:hidden flex flex-col gap-4">
          {rows.map((row, i) => (
            <motion.div key={row.resultado.t} className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ background: B.surface, border: `1px solid ${B.border}`, boxShadow: "0 2px 12px rgba(109,43,255,0.05)" }}
              initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease }}>
              <CellMobile Icon={row.sin.Icon} label="Sin KRNL" text={row.sin.t} badgeBg={B.softBg} iconC={B.textSub} labelC={B.textMuted} textC={B.textSub} weight={400} />
              <CellMobile Icon={row.con.Icon} label="Con KRNL" text={row.con.t} badgeBg={B.magentaSoft} iconC={B.magenta} labelC={B.magenta} textC={B.text} weight={400} />
              <CellMobile Icon={row.resultado.Icon} label="Resultado" text={row.resultado.t} badgeBg={B.purpleSoft} iconC={B.purple} labelC={B.purple} textC={B.text} weight={600} />
            </motion.div>
          ))}
        </div>

        {/* ── Tagline de cierre ── */}
        <motion.div className="flex flex-col items-center"
          initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}>
          <div style={{ width: 220, height: 1, background: B.borderSoft, marginTop: 40, marginBottom: 28 }} />
          <div className="flex items-center gap-3 px-4 text-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: B.magentaSoft }}>
              <Sparkles className="w-4 h-4" style={{ color: B.magenta }} strokeWidth={2} />
            </div>
            <p className="text-[15px] leading-relaxed text-left" style={{ color: B.textSub }}>
              Menos riesgo, más control, mayor claridad y una IA que <span style={{ color: B.magenta, fontWeight: 700 }}>escala contigo</span>.
            </p>
          </div>
        </motion.div>
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
          <Icon className="w-6 h-6 home-icon-gradient" />
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
      <div className="absolute -top-24 -left-24 w-48 h-48 sm:w-80 sm:h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.purple}07 0%, transparent 72%)` }} />
      <div className="absolute -bottom-12 right-0 w-40 h-40 sm:w-64 sm:h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B.magenta}06 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-24">

        {/* Header */}
        <div className="max-w-[720px] mb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <SectionMarker label="Operación centralizada" />
          </motion.div>
          <motion.h2 className="text-[38px] font-[800] leading-[1.08] mt-4 mb-4"
            style={{ color: B.text }}
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.12, ease: ec }}>
            Tu IA, con gobierno<br />centralizado y trazable.
          </motion.h2>
          <motion.p className="text-[17px] leading-relaxed"
            style={{ color: B.textSub, maxWidth: 620 }}
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.65, delay: 0.24, ease: ec }}>
            Antes de llegar a un usuario o sistema, las respuestas pasan por una validación interna configurable.
          </motion.p>
        </div>

        {/* Flow diagram */}
        <motion.div className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.07)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.3, ease: ec }}>
          <p className="text-[10px] font-[700] tracking-[0.18em] uppercase mb-5" style={{ ...MONO, color: B.textMuted }}>Flujo operativo</p>
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
                  <Icon className="w-6 h-6 home-icon-gradient" />
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


// ── Section: Marco regulatorio (Ley 21.719) ───────────────────────────────────
const MARCO_REGULATORIO_CHIPS = [
  { Icon: FileText, label: "Ley 21.719" },
  { Icon: Database, label: "Datos personales" },
  { Icon: Activity, label: "Trazabilidad" },
  { Icon: Shield,   label: "Gobierno IA" },
];

function SectionMarcoRegulatorio() {
  const sRef = useRef<HTMLElement>(null);
  const inV  = useInView(sRef, { once: true, margin: "-80px" });
  const ease = [0.2, 0, 0.2, 1] as const;
  return (
    <section ref={sRef} style={{ background: B.surface, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <motion.div className="relative overflow-hidden rounded-[28px]"
          style={{
            background: `linear-gradient(155deg, #FFFFFF 0%, ${B.purpleSoft}60 55%, ${B.magentaSoft}45 100%)`,
            border: `1px solid ${B.purple}22`,
            boxShadow: `0 24px 64px ${B.purple}0F, 0 4px 16px rgba(13,21,36,0.04)`,
          }}
          initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>

          {/* ── Decorative layer — dot mesh + soft blobs + fine data lines, low opacity ── */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
            <DotMesh />
          </div>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${B.magentaSoft} 0%, transparent 70%)`, opacity: 0.6 }} />
          <div className="absolute -bottom-20 right-1/4 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${B.purpleSoft} 0%, transparent 70%)`, opacity: 0.5 }} />
          <svg className="absolute right-0 top-0 h-full pointer-events-none hidden lg:block" width="180" height="100%"
            viewBox="0 0 180 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ opacity: 0.4 }}>
            <path d="M20 0 C 90 90, 40 180, 110 260 S 170 340, 150 400" stroke={B.purple} strokeWidth="1" strokeDasharray="2 6" />
            <path d="M60 -20 C 120 100, 70 200, 140 280" stroke={B.magenta} strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="110" cy="260" r="2.5" fill={B.purple} opacity="0.5" />
            <circle cx="140" cy="280" r="2" fill={B.magenta} opacity="0.5" />
          </svg>

          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10">

              {/* ── Icon column — sello de protección/gobierno ── */}
              <div className="flex md:block justify-center shrink-0">
                <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
                  <motion.div className="absolute rounded-full pointer-events-none"
                    style={{ inset: -16, background: `radial-gradient(circle, ${B.magenta}18 0%, ${B.purple}12 55%, transparent 75%)`, filter: "blur(14px)" }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="absolute rounded-full pointer-events-none"
                    style={{ inset: -6, border: `1px solid ${B.purple}30` }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.2, 0.55] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="absolute rounded-full pointer-events-none"
                    style={{ inset: 4, border: `1px dashed ${B.magenta}35` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${B.purpleSoft}, ${B.magentaSoft})`, border: `1px solid ${B.purple}30`, boxShadow: `0 10px 28px ${B.purple}22, inset 0 1px 0 rgba(255,255,255,0.85)` }}>
                    <ShieldCheck className="w-8 h-8 home-icon-gradient" strokeWidth={1.6} />
                  </div>
                </div>
              </div>

              {/* ── Content column ── */}
              <div className="flex-1 min-w-0">
                <SectionMarker label="Nuevo estándar de datos" />
                <h3 className="font-[800] leading-[1.15] mt-3 mb-4" style={{ fontSize: "clamp(24px, 2.6vw, 32px)", color: B.text, maxWidth: 760 }}>
                  Chile eleva el estándar de protección de datos personales.
                </h3>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {MARCO_REGULATORIO_CHIPS.map(({ Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[600]"
                      style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${B.purple}28`, color: B.text }}>
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: B.purple }} strokeWidth={1.8} />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Descripción — fecha destacada inline */}
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: B.textSub, maxWidth: 760 }}>
                  La Ley 21.719 entra en vigencia el{" "}
                  <span style={{ color: B.magenta, fontWeight: 700 }}>1 de diciembre de 2026</span>{" "}
                  y establece nuevas exigencias sobre el tratamiento de datos personales en Chile. KRNL apoya el gobierno de la IA empresarial —centralizando agentes, modelos y datos bajo políticas, trazabilidad y control— y ayuda a las organizaciones a prepararse para este nuevo estándar.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 mb-7">
                  <button onClick={() => krnlNavigate("contacto")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-[600] text-white text-[14px] transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                    style={{ background: GRAD, boxShadow: `0 6px 24px ${B.purple}35` }}>
                    Preparar gobierno de IA <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                  </button>
                  <button onClick={() => krnlNavigate("gobierno")}
                    className="inline-flex items-center justify-center sm:justify-start gap-1.5 py-2 rounded-full font-[600] text-[13.5px] transition-all"
                    style={{ color: B.text }}>
                    Conocer enfoque de gobierno <ChevronRight className="w-4 h-4" style={{ color: B.purple }} strokeWidth={2.2} />
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 pt-4" style={{ borderTop: `1px solid ${B.purple}18` }}>
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: B.textMuted }} strokeWidth={1.75} />
                  <p className="text-[12px] leading-relaxed" style={{ color: B.textMuted, maxWidth: 760 }}>
                    KRNL es una capa de gobierno operativo; el cumplimiento normativo específico depende de la implementación y del asesoramiento legal de cada organización.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
      <div className="relative z-10 text-center px-5 md:px-10 py-12 md:py-16" style={{ maxWidth: 640, margin: "0 auto" }}>
        <span className="block mb-4 text-[11px] font-[700] tracking-[0.22em] uppercase"
          style={{ ...MONO, color: B.magenta }}>
          Activación
        </span>
        <h2 className="font-[800] leading-tight mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: B.text }}>
          Empieza a ordenar tu<br />operación de IA.
        </h2>
        <p className="leading-relaxed mb-5 mx-auto" style={{ fontSize: 15, color: B.textSub, maxWidth: 460 }}>
          Conecta agentes, modelos y datos en un mismo lugar, con trazabilidad y supervisión humana.
        </p>
        <button
          onClick={() => krnlNavigate("contacto")}
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-[700] text-white text-[11px] transition-all hover:scale-[1.03] active:scale-[0.98]"
          style={{ background: GRAD, boxShadow: `0 8px 32px ${B.purple}40` }}>
          Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}

