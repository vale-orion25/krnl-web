import './SectionBackground.css';

export type SectionBackgroundVariant = 'riesgos' | 'producto' | 'gobierno' | 'soberania';

const VARIANT_LAYERS: Record<SectionBackgroundVariant, string[]> = {
  riesgos: ['dots', 'dots-b', 'lines'],
  producto: ['dotgrid', 'wave-a', 'wave-b'],
  gobierno: ['grid', 'sweep'],
  soberania: ['layers', 'glow'],
};

interface SectionBackgroundProps {
  /** riesgos · producto · gobierno · soberania */
  variant: SectionBackgroundVariant;
  className?: string;
}

/**
 * Fondo animado sutil, solo CSS (sin SVG), para secciones de contenido KRNL.
 * Debe ir como primer hijo de una `<section>` con `position: relative; overflow: hidden;`,
 * y el contenedor de contenido de esa sección debe llevar `position: relative` para pintarse encima.
 */
export function SectionBackground({ variant, className = '' }: SectionBackgroundProps) {
  return (
    <div className={`krnl-section-bg krnl-bg-${variant} ${className}`} aria-hidden="true">
      {VARIANT_LAYERS[variant].map((layer) => (
        <div key={layer} className={`krnl-section-bg__layer krnl-section-bg__layer--${layer}`} />
      ))}
    </div>
  );
}
