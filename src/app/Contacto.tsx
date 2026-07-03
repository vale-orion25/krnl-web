import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight, CheckCircle2, Shield, MessageSquare, Users, Building2,
  Mail, Briefcase, ArrowLeft,
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
  green:       "#22c55e",
  greenSoft:   "#F0FDF4",
};
const GRAD = `linear-gradient(135deg, ${B.magenta} 0%, ${B.purple} 100%)`;
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

// ── Intereses disponibles ─────────────────────────────────────────────────────
const INTERESES = [
  "Conocer KRNL",
  "Implementación",
  "Gobierno IA",
  "Ciberseguridad",
  "Soberanía de datos",
  "AIOps",
  "Otro",
];

// ── Pasos post-contacto ───────────────────────────────────────────────────────
const PASOS = [
  { n: "01", label: "Recibimos tu consulta",              sub: "De forma inmediata" },
  { n: "02", label: "Analizamos tu contexto",             sub: "Mismo día" },
  { n: "03", label: "Te asignamos un especialista",       sub: "En menos de 24 h hábiles" },
  { n: "04", label: "Primer paso juntos",                 sub: "Lo definimos contigo" },
];

const CERTS = ["ISO 27001", "ISO 9001", "26 años", "Casos productivos"];

// ── Input style helper ────────────────────────────────────────────────────────
function useInputStyle(focus: string) {
  return (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "11px 16px",
    fontSize: 14,
    color: B.text,
    border: `1.5px solid ${focus === name ? B.purple : B.border}`,
    borderRadius: 12,
    background: B.surface,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
    boxShadow: focus === name ? `0 0 0 3px ${B.purple}14` : "none",
  });
}

// ── Formulario principal ───────────────────────────────────────────────────────
function FormContacto({ onSend }: { onSend: () => void }) {
  const [focus, setFocus] = useState("");
  const [intereses, setIntereses] = useState<string[]>([]);
  const [form, setForm] = useState({ nombre: "", empresa: "", cargo: "", email: "", mensaje: "" });
  const iS = useInputStyle(focus);

  const toggle = (i: string) =>
    setIntereses(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-[600] mb-1.5" style={{ color: B.textSub }}>Nombre completo *</label>
          <input required value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre"
            style={iS("nombre")} onFocus={() => setFocus("nombre")} onBlur={() => setFocus("")} />
        </div>
        <div>
          <label className="block text-[12px] font-[600] mb-1.5" style={{ color: B.textSub }}>Email corporativo *</label>
          <input required type="email" value={form.email} onChange={set("email")} placeholder="tu@empresa.com"
            style={iS("email")} onFocus={() => setFocus("email")} onBlur={() => setFocus("")} />
        </div>
      </div>

      {/* Empresa + Cargo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-[600] mb-1.5" style={{ color: B.textSub }}>Empresa / Organización *</label>
          <input required value={form.empresa} onChange={set("empresa")} placeholder="Nombre de tu organización"
            style={iS("empresa")} onFocus={() => setFocus("empresa")} onBlur={() => setFocus("")} />
        </div>
        <div>
          <label className="block text-[12px] font-[600] mb-1.5" style={{ color: B.textSub }}>Cargo / Rol</label>
          <input value={form.cargo} onChange={set("cargo")} placeholder="CTO, Director IA, IT Manager…"
            style={iS("cargo")} onFocus={() => setFocus("cargo")} onBlur={() => setFocus("")} />
        </div>
      </div>

      {/* Área de interés */}
      <div>
        <label className="block text-[12px] font-[600] mb-2.5" style={{ color: B.textSub }}>
          ¿Qué te interesa explorar? <span style={{ color: B.textMuted, fontWeight: 400 }}>(elige uno o varios)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTERESES.map(i => {
            const active = intereses.includes(i);
            return (
              <button key={i} type="button"
                className="text-[12px] font-[600] px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: active ? B.purple : B.softBg,
                  color: active ? "#fff" : B.textSub,
                  border: `1.5px solid ${active ? B.purple : B.border}`,
                  boxShadow: active ? `0 2px 10px ${B.purple}35` : "none",
                }}
                onClick={() => toggle(i)}>
                {i}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-[12px] font-[600] mb-1.5" style={{ color: B.textSub }}>
          Mensaje <span style={{ color: B.textMuted, fontWeight: 400 }}>(opcional)</span>
        </label>
        <textarea value={form.mensaje} onChange={set("mensaje")} rows={4}
          placeholder="Cuéntanos sobre tu operación de IA, desafíos actuales o preguntas específicas…"
          style={{ ...iS("mensaje"), resize: "none" } as React.CSSProperties}
          onFocus={() => setFocus("mensaje")} onBlur={() => setFocus("")} />
      </div>

      {/* Aviso */}
      <p className="text-[11px]" style={{ color: B.textMuted }}>
        Al enviar aceptas que el equipo de Orión se comunique contigo. Tus datos se tratan con confidencialidad.
      </p>

      {/* Submit */}
      <button type="submit"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-[600] text-white text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: GRAD, boxShadow: `0 6px 28px ${B.purple}40` }}>
        Hablar con un especialista <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}

// ── Estado de éxito ────────────────────────────────────────────────────────────
function SuccessCard({ onBack }: { onBack: () => void }) {
  return (
    <motion.div className="flex flex-col items-center text-center py-14 px-6"
      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease }}>
      <motion.div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: B.greenSoft, border: `2px solid ${B.green}40` }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 260 }}>
        <CheckCircle2 className="w-8 h-8" style={{ color: B.green }} strokeWidth={1.75} />
      </motion.div>
      <h3 className="text-[22px] font-[800] mb-3" style={{ color: B.text }}>¡Gracias por contactarnos!</h3>
      <p className="text-[15px] leading-relaxed mb-8" style={{ color: B.textSub, maxWidth: 400 }}>
        Tu consulta fue recibida. El equipo de Orión se comunicará contigo en menos de 24 horas hábiles para dar el siguiente paso.
      </p>
      <button onClick={onBack}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-[500] text-[14px] transition-all hover:scale-[1.02]"
        style={{ background: B.softBg, border: `1.5px solid ${B.border}`, color: B.textSub }}>
        <ArrowLeft className="w-4 h-4" strokeWidth={2} /> Volver al formulario
      </button>
    </motion.div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroContacto() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true });
  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] pb-10"
      style={{ background: "linear-gradient(160deg, #FEFBFE 0%, #F5F0FD 50%, #FEFCFE 100%)" }}>
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${B.purpleSoft}75 0%, transparent 72%)`, filter: "blur(48px)" }} />
      <div className="relative z-10 max-w-[720px] mx-auto px-10 text-center">
        <motion.div className="flex justify-center mb-5"
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[0.14em] uppercase"
            style={{ ...MONO, background: B.purpleSoft, color: B.purple, border: `1px solid ${B.borderSoft}` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.purple }} />
            Contacto
          </span>
        </motion.div>
        <motion.h1 className="font-[800] leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", color: B.text }}
          initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }}>
          Habla con el{" "}
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            equipo KRNL
          </span>
        </motion.h1>
        <motion.p style={{ fontSize: 17, color: B.textSub, lineHeight: 1.65 }}
          initial={{ opacity: 0, y: 12 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease }}>
          Cuéntanos sobre tu operación de IA y te conectamos con el especialista correcto.
        </motion.p>
      </div>
    </section>
  );
}

// ── Sección principal: formulario + info ──────────────────────────────────────
function SectionFormulario() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  const [sent, setSent] = useState(false);

  return (
    <section ref={ref} style={{ background: B.softBg, borderTop: `1px solid ${B.border}` }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">

          {/* Form card */}
          <motion.div className="rounded-2xl overflow-hidden"
            style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 8px 40px rgba(109,43,255,0.07)" }}
            initial={{ opacity: 0, y: 22 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>

            <div className="flex items-center gap-2 px-6 py-4" style={{ borderBottom: `1px solid ${B.borderSoft}`, background: B.softBg }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: B.purpleSoft }}>
                <MessageSquare className="w-3.5 h-3.5" style={{ color: B.purple }} strokeWidth={1.75} />
              </div>
              <p className="text-[13px] font-[700]" style={{ color: B.text }}>Formulario de contacto</p>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.green }} />
                <span className="text-[10px]" style={{ color: B.textMuted }}>Orión responde en ≤ 24 h hábiles</span>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {sent
                  ? <SuccessCard key="success" onBack={() => setSent(false)} />
                  : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}>
                      <FormContacto onSend={() => setSent(true)} />
                    </motion.div>
                }
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-5">
            {/* Qué pasa después */}
            <motion.div className="rounded-2xl p-5"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}`, boxShadow: "0 4px 16px rgba(109,43,255,0.05)" }}
              initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }}>
              <p className="text-[12px] font-[700] mb-4" style={{ color: B.text }}>¿Qué pasa después?</p>
              <div className="flex flex-col gap-0">
                {PASOS.map(({ n, label, sub }, i) => (
                  <div key={n}>
                    <motion.div className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 8 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.28 + i * 0.1, duration: 0.38, ease }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: B.purpleSoft, border: `1.5px solid ${B.purple}30` }}>
                        <span className="text-[9px] font-[800]" style={{ ...MONO, color: B.purple }}>{n}</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-[700]" style={{ color: B.text }}>{label}</p>
                        <p className="text-[10px]" style={{ color: B.textMuted }}>{sub}</p>
                      </div>
                    </motion.div>
                    {i < PASOS.length - 1 && (
                      <div className="flex justify-start pl-3 py-1.5">
                        <div className="w-px h-4" style={{ background: B.borderSoft }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Respaldo Orión */}
            <motion.div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: `linear-gradient(145deg, ${B.purpleSoft}, ${B.magentaSoft}60)`, border: `1px solid ${B.purple}20` }}
              initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: GRAD, boxShadow: `0 2px 10px ${B.purple}40` }}>
                  <Shield className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
                </div>
                <p className="text-[13px] font-[800]" style={{ color: B.text }}>Respaldado por Orión</p>
              </div>
              <p className="text-[12px] leading-relaxed mb-4" style={{ color: B.textSub }}>
                Implementación, ciberseguridad y operación continua de KRNL con 26 años de experiencia enterprise.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CERTS.map(c => (
                  <span key={c} className="text-[9px] font-[700] px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.75)", color: B.purple, border: `1px solid ${B.purple}25` }}>
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Usos frecuentes */}
            <motion.div className="rounded-2xl p-5"
              style={{ background: B.surface, border: `1px solid ${B.borderSoft}` }}
              initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4, ease }}>
              <p className="text-[12px] font-[700] mb-3" style={{ color: B.text }}>Motivos frecuentes de contacto</p>
              {[
                "Evaluar KRNL para mi organización",
                "Entender la capa de gobierno",
                "Conocer implementación Orión",
                "Integración con mi infraestructura",
              ].map((m, i) => (
                <div key={m} className="flex items-center gap-2 py-1.5"
                  style={{ borderBottom: i < 3 ? `1px solid ${B.borderSoft}` : "none" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: B.purple }} />
                  <p className="text-[11px]" style={{ color: B.textSub }}>{m}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ── Page export ────────────────────────────────────────────────────────────────
export default function PaginaContacto() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <HeroContacto />
      <SectionFormulario />
      <KrnlFooter />
    </div>
  );
}
