# Auditoría UX/UI asistida por IA – KRNL

## 1. Contexto

Antes de enviar el sitio KRNL a revisión ejecutiva, se realizó una auditoría integral de experiencia de usuario e interfaz, con foco en cuatro dimensiones: claridad comercial del copy, consistencia visual entre secciones, comportamiento responsive (desktop/mobile), y estabilidad técnica del build de producción. El objetivo fue dejar el sitio en condiciones de ser revisado por el equipo ejecutivo sin riesgos evidentes de contenido o de presentación.

## 2. Objetivo de la auditoría

- Validar que el sitio esté en buen estado para revisión ejecutiva.
- Detectar problemas visuales o de contenido antes del envío.
- Reducir riesgos derivados de copy comercial absoluto que pudiera chocar con pricing, propuesta comercial o validación legal.
- Verificar el comportamiento del sitio en desktop y mobile.
- Confirmar que el build de producción se genere sin errores.

## 3. Alcance revisado

Se revisaron las siguientes páginas del sitio:

- Inicio
- Riesgos
- Producto
- Gobierno
- Soberanía IA
- Contacto

La revisión visual se realizó en dos viewports: desktop (1400 px de ancho) y mobile (390 px de ancho), verificando ambos comportamientos en cada página cuando correspondía. No se realizó una pasada dedicada en viewport tablet en esta ronda; queda como no validado si se requiere en una siguiente iteración.

## 4. Metodología

El proceso de auditoría se realizó en las siguientes etapas:

1. **Auditoría de copy comercial riesgoso**: revisión de los seis archivos de página en busca de frases absolutas de precio, licencia, cobertura o capacidad. Los hallazgos se evaluaron individualmente antes de aplicar cualquier cambio, para distinguir entre promesas comerciales riesgosas y descripciones técnicas legítimas.
2. **Revisión visual desktop/mobile**: captura y revisión de pantallas de cada página en ambos viewports, sección por sección.
3. **Validación de layout**: revisión de overflow horizontal, cortes de texto, alturas de tarjetas, saltos de línea y jerarquía visual.
4. **Revisión de frases absolutas o riesgosas**: verificación cruzada de que el copy corregido no reintrodujera lenguaje de riesgo similar.
5. **Verificación manual de hallazgos automatizados**: antes de reportar cualquier hallazgo, se verificó manualmente para descartar falsos positivos (por ejemplo, elementos aún en proceso de animación al momento de la captura, o contenido correctamente clasificado como no comercial).
6. **Ejecución de `pnpm run build`**: se ejecutó en múltiples etapas del proceso (tras la corrección de copy comercial y tras la corrección final de los hallazgos de severidad media) para confirmar que el sitio compila sin errores.
7. **Clasificación de hallazgos por severidad**: Alta (bloquea envío), Media (conviene corregir antes de enviar) y Baja (puede quedar para una segunda iteración).

## 5. Cambios aplicados

Como resultado del proceso de auditoría y de iteraciones previas sobre la página de Inicio, el sitio incorpora los siguientes cambios principales:

- Reducción de redundancias en Home mediante la eliminación de secciones que repetían conceptos ya cubiertos en otras partes de la página.
- Reordenamiento narrativo del Home hacia una estructura más directa y comercial.
- Franja de respaldo institucional de Orión reubicada para mayor visibilidad, entre la sección "Qué es KRNL" y "Tecnologías compatibles".
- Sección de compatibilidad con modelos y proveedores conocidos (OpenAI, Anthropic, Google, modelos locales).
- Sección orientada a usuarios que crean agentes, con foco en gobierno desde el inicio del proceso.
- Ajustes de copy comercial riesgoso en seis archivos de página (detallado en la sección 6).
- Ajustes puntuales de copy en mobile en Soberanía IA y Contacto, para corregir saltos de línea causados por los ajustes de copy comercial (detallado en la sección 7).

## 6. Auditoría de copy comercial

Se realizó una búsqueda dirigida de frases comerciales absolutas o riesgosas en los archivos de las seis páginas revisadas, incluyendo expresiones del tipo:

- "sin límites"
- "sin costo" / "sin costo por usuario" / "sin costo por modelo"
- "uso ilimitado"
- "toda la empresa"
- "licencia anual sin límites"
- promesas absolutas de precio, SLA, cobertura o capacidad (por ejemplo, garantías de disponibilidad, prevención total o auditoría "inmutable")

Las frases identificadas como riesgosas se reemplazaron por lenguaje más seguro y alineado con la operación real del producto, entre otros:

- "modelo predecible"
- "gobierno centralizado"
- "operación escalable"
- "sin perder control ni trazabilidad"
- "preparado para crecer con la operación"

Se revisó también el caso puntual de la frase "Sin costo API", presente en la descripción de modelos locales/on-premise en la página Soberanía IA. Se determinó que corresponde a una descripción técnica correcta (los modelos on-premise no generan cargos por llamada a una API de terceros) y no a una promesa comercial de gratuidad, por lo que se mantuvo sin cambios. De igual forma, se descartó modificar certificaciones reales (ISO 27001, ISO 9001) que un análisis automatizado inicial había señalado erróneamente como lenguaje de riesgo.

## 7. Resultados del QA visual

### Inicio
Estado general: sin hallazgos bloqueantes. Se validó el orden de secciones (Hero, Qué es KRNL, franja de respaldo Orión, Tecnologías compatibles, Para quién es, Gobierno, Beneficios, Activación y pie de página), la visibilidad y ubicación de la franja Orión, la ausencia de secciones redundantes previamente eliminadas, la tabla comparativa de beneficios, y la integridad de navbar y pie de página en desktop y mobile. Una observación inicial de paneles aparentemente vacíos en el hero animado se verificó como un artefacto de la velocidad de captura automatizada (las animaciones de entrada requieren unos segundos para completarse) y no corresponde a un defecto real.

### Riesgos
Estado general: sin hallazgos. El copy actualizado ("Auditoría centralizada") se valida correctamente en desktop y mobile, sin desbordes ni cortes.

### Producto
Estado general: sin hallazgos bloqueantes. La tarjeta "Modelo predecible" mantiene la misma altura que las tarjetas vecinas, sin overflow, en desktop y mobile.
Hallazgo menor (severidad baja): el eyebrow "Modelo predecible" y el título "Licencia anual, modelo predecible" repiten la palabra "predecible" de forma cercana, lo que resulta levemente redundante sin ser un error.

### Gobierno
Estado general: sin hallazgos bloqueantes vinculados a los ajustes de copy realizados. Se identificó un hallazgo preexistente (severidad baja, no relacionado con esta auditoría de copy): la tabla de registros de la sección "Evidencia operativa" desborda horizontalmente en mobile sin un indicador visual de que el contenido es desplazable.

### Soberanía IA
Se identificaron dos hallazgos de severidad media:
- En el mockup "Vista KRNL", la fila "Registro activo" presentaba un valor que se partía en dos líneas en mobile, generando una fila más alta que sus vecinas. Este hallazgo fue corregido en esta auditoría.
- La tarjeta "Core Operativo" del mockup "KRNL — Model Router" se corta en el borde derecho del viewport en mobile. Este hallazgo es preexistente (no originado por los ajustes de copy) y no fue corregido en esta iteración, por quedar fuera del alcance autorizado.

### Contacto
Se identificó un hallazgo de severidad media: el badge de respuesta junto al formulario de contacto se partía en dos líneas en mobile, descentrando el indicador de estado y afectando también el título "Formulario de contacto". Este hallazgo fue corregido en esta auditoría.

## 8. Clasificación de severidad

### Alta
No se detectaron hallazgos de severidad alta en ninguna etapa de la auditoría. Ningún elemento revisado bloquea el envío del sitio a revisión ejecutiva.

### Media
Se detectaron tres hallazgos de severidad media:
1. Soberanía IA — fila "Registro activo" partida en mobile. **Corregido** (se reemplazó el valor por "Auditoría activa").
2. Contacto — badge de respuesta partido en mobile. **Corregido** (se reemplazó el texto por "Orión responde").
3. Soberanía IA — tarjeta "Core Operativo" cortada en mobile. **Pendiente**, preexistente y fuera del alcance autorizado para esta corrección.

### Baja
Se detectaron dos hallazgos de severidad baja, ambos sin corregir por no ser bloqueantes:
1. Gobierno — tabla de registros con overflow horizontal en mobile sin indicador visual (preexistente).
2. Producto — repetición menor de la palabra "predecible" en la tarjeta de licenciamiento (observación estética).

## 9. Pendientes no bloqueantes

Los siguientes puntos quedan disponibles para una segunda iteración, sin bloquear el envío actual:

- Ajuste de layout de la tarjeta "Core Operativo" en Soberanía IA (mobile), preexistente.
- Tabla de registros en Gobierno (mobile): incorporar un indicador visual de desplazamiento horizontal o revisar el diseño responsive de la tabla.
- Revisión menor de redacción en Producto para evitar la repetición de la palabra "predecible" en la tarjeta de licenciamiento.

## 10. Validación técnica

- Se ejecutó `pnpm run build` en múltiples momentos de la auditoría: tras aplicar los ajustes de copy comercial y tras aplicar la corrección final de los dos hallazgos de severidad media.
- Resultado: build exitoso en todas las ejecuciones (2018 módulos transformados), sin errores.
- Se observa una advertencia no bloqueante y preexistente de Vite respecto al tamaño del bundle principal (superior a 500 kB tras minificación), sin relación con los cambios de esta auditoría.

## 11. Conclusión ejecutiva

El sitio KRNL queda en buen estado para revisión ejecutiva. La página de Inicio presenta una narrativa más clara y directa, el respaldo institucional de Orión es más visible, y el copy comercial fue revisado y ajustado para reducir el riesgo de promesas absolutas de precio, cobertura o capacidad. El QA visual en desktop y mobile no arrojó hallazgos bloqueantes, y el build de producción se genera sin errores. Los pendientes detectados son menores o preexistentes, no bloquean el envío, y pueden abordarse en una segunda iteración.

## 12. Cumplimiento frente al análisis de Andrés

La siguiente tabla contrasta los puntos observados en el análisis recibido con las acciones efectivamente aplicadas al sitio durante esta auditoría.

| Recomendación / punto observado | Acción aplicada en el sitio | Estado | Observación |
|---|---|---|---|
| 1. Home más claro y ejecutivo | Se redujeron redundancias y se ordenó la narrativa principal del Home. | Cumplido | Verificado en el QA visual de Inicio (sección 7): orden de secciones consistente, sin secciones repetidas. |
| 2. Narrativa correcta del producto | Se reforzó el recorrido IA dispersa → conexión → gobierno → escala segura en el hero de Inicio. | Cumplido | El recorrido de 4 pasos fue validado visualmente; una observación inicial de paneles vacíos se confirmó como artefacto de captura, no como defecto real. |
| 3. Confianza enterprise | Se hizo más visible el respaldo de Orión y sus credenciales mediante una franja institucional reubicada. | Cumplido | Franja validada como visible y bien ubicada entre "Qué es KRNL" y "Tecnologías compatibles". |
| 4. Marcas/modelos conocidos | Se mantuvo una sección de compatibilidad con modelos y herramientas reconocibles (OpenAI, Anthropic, Google, modelos locales). | Cumplido | Sección validada en el QA visual sin hallazgos. |
| 5. Usuarios generando valor | Se reforzó que usuarios de distintas áreas pueden crear agentes sin depender siempre de desarrollo. | Cumplido | Corresponde a la sección de Home orientada a usuarios que crean agentes, con foco en gobierno desde el inicio. |
| 6. Riesgo de copy comercial | Se auditó y ajustó lenguaje absoluto o riesgoso relacionado con pricing, límites, SLA o cobertura en seis archivos de página. | Cumplido con observación | Se corrigieron las frases identificadas. Se mantuvo deliberadamente "Sin costo API" por tratarse de una descripción técnica y no de una promesa comercial; esta excepción quedó documentada, no es un descuido. |
| 7. Responsive / mobile | Se realizó QA visual en desktop y mobile en las seis páginas y se corrigieron los textos que se partían en mobile a causa de los ajustes de copy. | Cumplido con observación | Los dos hallazgos de severidad media originados por copy fueron corregidos. Quedan pendientes, no bloqueantes y fuera de este alcance, dos hallazgos preexistentes de layout no relacionados con copy (tarjeta "Core Operativo" en Soberanía IA y tabla de registros en Gobierno). |
| 8. Pendientes no bloqueantes | Se identificaron y documentaron ajustes menores para una segunda pasada, sin presentarlos como bloqueantes para el envío. | Cumplido | Detallado en las secciones 8 y 9 de este documento. |

No se declara cumplimiento total: existen pendientes no bloqueantes identificados y documentados (secciones 8 y 9), que no impiden el envío a revisión ejecutiva pero que quedan abiertos para una segunda iteración.

La versión actual responde a los principales puntos del análisis recibido: mejora claridad ejecutiva, refuerza la historia del producto, incorpora señales de confianza enterprise, reduce riesgos de copy comercial y deja identificados pendientes menores para una segunda iteración.
