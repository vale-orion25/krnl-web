import { motion } from "motion/react";
import {
  ArrowRight, Boxes, Link2, Shield,
  EyeOff, ShieldOff, AlertTriangle, TrendingUp,
} from "lucide-react";
import { B, GRAD, MONO } from "./App";

// ── Simplified narrative flow (mobile/tablet only) ─────────────────────────────
const FLOW = [
  { Icon: Boxes, title: "IA dispersa",   desc: "Agentes y datos operan sin una capa común de control." },
  { Icon: Link2, title: "KRNL organiza", desc: "Conecta agentes, modelos y sistemas en un solo lugar." },
  { Icon: Shield, title: "IA gobernada", desc: "Políticas, validación y trazabilidad en cada paso." },
];

// ── Risk chips (mobile/tablet only) ────────────────────────────────────────────
const RISKS = [
  { Icon: EyeOff,        label: "Sin trazabilidad" },
  { Icon: ShieldOff,     label: "Sin validación" },
  { Icon: AlertTriangle, label: "Sin políticas" },
  { Icon: TrendingUp,    label: "Riesgos crecientes" },
];

export default function MobileTabletHero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section
      className="lg:hidden relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FEFAFC 0%, #F8F3FC 100%)" }}
    >
      <div className="relative px-5 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-16">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ ...MONO, color: B.magenta }}
        >
          01 / IA Dispersa
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-[800] leading-[1.18] mb-4"
          style={{ fontSize: "clamp(28px, 7.5vw, 38px)", color: "#0F1F4A" }}
        >
          La IA opera{" "}
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            fuera del radar
          </span>
          .
        </motion.h1>

        {/* Bajada */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[15px] leading-relaxed mb-9"
          style={{ color: "#6B7894", maxWidth: 480 }}
        >
          Agentes, modelos y datos avanzan en distintas áreas del negocio sin una capa común de control.
        </motion.p>

        {/* Simplified vertical flow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl p-4 sm:p-5 mb-8"
          style={{
            background: "rgba(255,255,255,0.75)",
            border: `1px solid ${B.borderSoft}`,
            boxShadow: "0 12px 40px rgba(109,43,255,0.07)",
          }}
        >
          {FLOW.map((step, i) => (
            <div key={step.title} className="relative flex gap-3.5">
              {/* Icon + connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: `1px solid rgba(109,43,255,0.18)`,
                    boxShadow: "0 0 12px rgba(109,43,255,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <step.Icon className="w-[18px] h-[18px]" style={{ color: B.purple }} strokeWidth={1.75} />
                </div>
                {i < FLOW.length - 1 && (
                  <div className="w-px flex-1 my-1" style={{ background: B.border, minHeight: 22 }} />
                )}
              </div>
              {/* Text */}
              <div className={i < FLOW.length - 1 ? "pb-5" : ""}>
                <p className="text-[14px] font-[700] leading-tight pt-2" style={{ color: "#1C2B57" }}>{step.title}</p>
                <p className="text-[12.5px] leading-snug mt-1" style={{ color: "#98A2B3" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Risk chips */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-9"
        >
          {RISKS.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-full text-[12.5px] font-[600]"
              style={{ background: B.warnSoft, color: B.warn, border: `1px solid ${B.warn}22`, minHeight: 36 }}
            >
              <Icon className="w-[14px] h-[14px] shrink-0" strokeWidth={2} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onClick={onCTAClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 rounded-full text-[15px] font-[600] text-white active:scale-[0.98] transition-transform"
          style={{ background: GRAD, boxShadow: `0 4px 16px ${B.purple}40`, minHeight: 50 }}
        >
          Conoce KRNL <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
