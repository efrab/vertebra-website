# Landing y video — Módulo de Inspecciones

Borrador v1 para revisión de Martin. Todo el contenido sale del Help Center (`lib/help_catalog.rb`, sección `inspecciones`) y del código del módulo; no hay cifras ni promesas que el producto no cumpla.

## Mensaje central

> Las inspecciones de tus inmuebles dejan de vivir en Excel, WhatsApp y fotos sueltas. Vértebra las programa, avisa a tu equipo, guarda la evidencia y la IA escribe la conclusión del reporte.

Público: administradores de parques industriales, plazas comerciales y portafolios (Vesta como caso principal). Clientes actuales que ya tienen el módulo activo.

## Guion del video (~90 s)

Formato: Martin (avatar HeyGen) a pantalla completa en apertura y cierre; en los pasos, Martin en la esquina inferior derecha y la pantalla del producto al centro, con zoom a la acción.

| # | Tiempo | Pantalla | Martin dice |
|---|--------|----------|-------------|
| 1 | 0:00–0:08 | Martin a cuadro | "Hola, soy Martín, de Vértebra. Te quiero mostrar algo que ya está activo en tu cuenta: el nuevo módulo de Inspecciones." |
| 2 | 0:08–0:18 | Infografía: Excel, fotos de WhatsApp, correos → un solo flujo | "Hoy las revisiones de tus inmuebles viven en hojas de cálculo, fotos sueltas y correos. Cuando alguien pregunta cómo está el techo de la nave 3, nadie tiene la respuesta a la mano." |
| 3 | 0:18–0:32 | Crear inspección: frecuencia, responsables, tareas desde Excel | "En Vértebra programas la inspección una sola vez: qué inmueble, cada cuánto, quién la hace —tu equipo o un proveedor— y qué tareas revisar. Puedes cargar las tareas desde Excel." |
| 4 | 0:32–0:46 | Ejecutar instancia: Óptimo / Aceptable / Crítico, fotos | "Cuando toca, la inspección se activa sola. El responsable califica cada punto como óptimo, aceptable o crítico, sube fotos y deja observaciones. Cada tarea queda con fecha y hora." |
| 5 | 0:46–0:56 | Conclusión generada por IA | "Al terminar, la inteligencia artificial redacta la conclusión: el estado general, los hallazgos críticos y lo que falta documentar." |
| 6 | 0:56–1:04 | Crear OT desde una tarea crítica | "¿Encontraste un problema? Creas la orden de trabajo desde esa misma tarea, y queda ligada a la inspección." |
| 7 | 1:04–1:16 | Historial por año, PDF, dashboard | "Todo queda en el historial, tarea por tarea y año por año. Descargas el reporte en PDF para tu cliente o tu auditoría, y el dashboard te dice qué se cumplió a tiempo y dónde están los hallazgos críticos." |
| 8 | 1:16–1:28 | Martin a cuadro + CTA | "El módulo ya está disponible. Entra a Mantenimiento, Inspecciones, y crea la primera. Si quieres que te ayudemos a configurarla, agenda una sesión con nosotros." |

Notas de producción:
- Subtítulos quemados (Whisper) porque la mayoría lo verá sin sonido.
- Versión corta de 20 s sin voz (pasos 3–7 acelerados) para el hero de la landing y redes.
- Las capturas salen de la app con datos demo (parque industrial ficticio), nunca de datos de clientes.

## Copy de la landing (`/es/landing-inspecciones`)

La página es una vista propia (`frontend/src/views/InspectionsLandingPage.astro`) con el copy en `frontend/src/modules/inspectionsLandingCopy.ts`; ese archivo es la fuente final del texto. Lo de abajo es el borrador original.

### Hero
- Eyebrow: Nuevo módulo
- Título: Inspecciones que se programan solas y se documentan completas
- Subtítulo: Programa revisiones periódicas de tus inmuebles, registra la evidencia en sitio y deja que la IA redacte la conclusión del reporte.
- CTA: Agenda una demo

### Cómo funciona (5 pasos)
1. **Programa** — Define inmueble, frecuencia (de diaria a anual), horario y responsables internos o externos.
2. **Carga las tareas** — Escríbelas o súbelas desde Excel. Los activos y proveedores se filtran por inmueble.
3. **Ejecuta en sitio** — Califica cada punto como óptimo, aceptable o crítico, o márcalo en modo checklist. Fotos obligatorias opcionales.
4. **La IA concluye** — Vértebra redacta el estado general, los hallazgos críticos y los pendientes de documentación.
5. **Da seguimiento** — Crea órdenes de trabajo desde cualquier tarea y consulta el historial completo.

### Detalle del módulo (showcase)

Capturas reales generadas con `scripts/capture-inspections.mjs` sobre una empresa demo ficticia (Parque Logístico Demo) en la app local.

- Programación flexible: ocho frecuencias, día de inicio y cierre, fines de semana opcionales.
- Dos modos de registro: status (óptimo / aceptable / crítico) o checklist para proveedores.
- Historial por año: cada columna es una instancia, cada fila una tarea.
- Reporte PDF: programación, responsables, resumen, detalle por tarea con imágenes.
- Dashboard: cumplimiento a tiempo, hallazgos críticos y rendimiento por responsable.

### IA en Inspecciones
- Conclusión automática de cada instancia, escrita para quien corrige y para el dueño del inmueble.
- Nunca inventa: solo usa las tareas y observaciones registradas.
- Pregúntale a Eva por el estado de tus inspecciones desde el chat.

### Preguntas frecuentes


- ¿Tiene costo adicional? → *(pendiente: confirmar con Martin)*
- ¿Un proveedor externo puede hacer la inspección? Sí, se asigna como responsable externo y usa el modo checklist o sube sus archivos.
- ¿Qué pasa si una inspección no se completa? La instancia vence y queda registrada como no completada en el historial y en el dashboard.
- ¿Puedo cambiar la frecuencia después? Sí. Vértebra te muestra cuántas instancias se conservan, se eliminan y se crean antes de aplicar el cambio.
- ¿Puedo compartir el resultado con alguien sin cuenta? Sí, con el reporte PDF de cada instancia.

### CTA final
- Título: Tu próxima inspección ya puede estar en Vértebra
- Botones: Agenda una demo · Entrar a mi cuenta
