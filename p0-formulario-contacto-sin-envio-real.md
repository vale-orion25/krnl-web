# P0 (funcional) — El formulario de Contacto no envía leads reales

## Estado
**Abierto — pendiente de decisión de canal por parte de Desarrollo/Orión.** No se aplicó ningún cambio de código ni de diseño en el sitio; este documento es solo el hallazgo y la especificación para cuando se implemente.

## Resumen
El formulario de Contacto (`src/app/Contacto.tsx`) muestra la pantalla de éxito ("¡Gracias por contactarnos!") en el 100% de los envíos, sin enviar los datos a ningún destino real. Todo lo que una persona escribe se descarta al cerrar o recargar la página.

## Evidencia técnica
En `src/app/Contacto.tsx`, componente `FormContacto`:

```js
const handleSubmit = (e) => {
  e.preventDefault();
  onSend(); // solo cambia estado local (setSent(true)) — no hay request de ningún tipo
};
```

- No hay `fetch`/`XHR`/`action` en el `<form>`.
- No hay integración con CRM, email transaccional, endpoint propio, Formspree, Web3Forms ni ningún otro servicio.
- `onSend` únicamente actualiza estado de React (`sent = true`) en el componente padre `SectionFormulario`, lo que dispara el render de `SuccessCard`.

## Impacto de negocio
El sitio aparenta estar capturando leads (nombre, empresa, cargo, email, mensaje, intereses), pero ninguno llega al equipo comercial. Riesgo: pérdida silenciosa de leads reales sin ninguna alerta — nadie se entera de que el formulario "funciona" solo visualmente.

## Decisión pendiente: canal oficial de recepción
Antes de implementar, Desarrollo/Orión debe definir **uno** de estos canales (no se implementó ninguno todavía):
- Endpoint interno propio (API existente o nueva).
- CRM (HubSpot, Salesforce u otro ya en uso por Orión).
- Correo corporativo directo (ej. vía servicio transaccional tipo SendGrid/SES, o un backend simple que arme el email).
- Servicio de formularios aprobado (Web3Forms, Formspree u otro) — **solo si Orión lo aprueba explícitamente**, ya que implica que los datos de leads pasan por un tercero.

## Especificación funcional/UX para la implementación (criterios de aceptación)
Independiente del canal que se elija, la implementación debe cumplir:
1. **Campos enviados:** nombre, empresa, cargo, email, teléfono (nuevo campo, opcional) y mensaje. El campo teléfono no existe hoy en el formulario — hay que agregarlo (única adición de UI necesaria, debe respetar el estilo visual existente de los demás inputs).
2. **Estado "enviando":** el botón de submit debe reflejar que la request está en curso (ej. deshabilitado + texto "Enviando…") y evitar doble envío.
3. **Éxito solo si el envío fue confirmado:** la pantalla de éxito (`SuccessCard`, ya existente, no rediseñar) solo debe mostrarse tras una respuesta exitosa real del canal elegido (ej. `200 OK` + confirmación del servicio/endpoint).
4. **Error visible si falla:** si la request falla (red, servidor, rechazo del servicio), mostrar un mensaje de error claro en el propio formulario, sin perder los datos ya escritos, permitiendo reintentar.
5. **Sin cambios de diseño ni de copy** más allá del campo teléfono descrito en el punto 1 — no rediseñar la tarjeta del formulario ni el resto de la página de Contacto.
6. **Sin credenciales hardcodeadas:** cualquier clave/endpoint debe ir en variable de entorno (`VITE_...` para Vite), nunca commiteada en texto plano, con un `.env.example` documentando el nombre esperado.

## Archivos involucrados (para cuando se implemente)
- `src/app/Contacto.tsx` — función `FormContacto` (maneja el formulario) y `SectionFormulario` (maneja el estado `sent`/`SuccessCard`).
- `.env` / `.env.example` — para la credencial del canal elegido (no existen hoy, habría que crearlos).
- `.gitignore` — agregar `.env` si no está, para no commitear credenciales reales.

## Cómo probar una vez implementado
1. Completar el formulario con datos de prueba y enviarlo.
2. Confirmar visualmente: botón pasa a "Enviando…" y luego a éxito **solo si** el canal confirmó recepción.
3. Verificar en DevTools → Network que la request al canal elegido responde `200`/éxito antes de que se muestre la pantalla de éxito.
4. Forzar un error (ej. cortar la red, o apuntar a un endpoint inválido temporalmente) y confirmar que se muestra el mensaje de error, no la pantalla de éxito.
5. Confirmar en el destino real (bandeja de entrada, CRM o endpoint) que el lead de prueba llegó con todos los campos.

## Nota de proceso
Se había preparado una integración de referencia con Web3Forms durante la investigación de este hallazgo, pero **se revirtió completamente** a pedido explícito: no se debía adoptar un servicio externo sin aprobación de Desarrollo/Orión. El repositorio no tiene cambios pendientes relacionados a este punto (`git status` limpio); este documento es la única entrega de este hallazgo por ahora.
