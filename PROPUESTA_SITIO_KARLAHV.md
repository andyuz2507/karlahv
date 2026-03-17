# Propuesta de Sitio Web — Karla Hernández Villalobos
## Psicóloga Integrativa | Karlahv.mx

---

## Resumen Ejecutivo

Propuesta integral para el sitio web de **Karla Hernández Villalobos**, psicóloga integrativa con más de 10 años de experiencia trabajando con niños, adolescentes y adultos. El sitio posicionará a Karla como eje central de su marca profesional, complementando su práctica clínica con herramientas digitales que fortalezcan el vínculo con pacientes y familias.

**Dominio:** Karlahv.mx

---

## Identidad Visual (Paleta y Tipografía)

Basado en la referencia de Maria Castilho que compartiste:

### Paleta de Colores
| Uso | Color | Código Hex | Aplicación |
|-----|-------|------------|------------|
| **Acento principal** | Marrón/berry profundo | `#7F334E` | Encabezados, CTAs, fondos de secciones destacadas |
| **Acento secundario** | Rosa polvoriento / mauve | `#DDAAAA` | Fondos suaves, acentos decorativos |
| **Base clara** | Beige / off-white | `#F5F0EB` | Fondos principales |
| **Base neutra** | Rosa pálido suave | `#F8F4F2` | Alternancia de secciones |
| **Texto** | Marrón oscuro | `#4A3C42` | Legibilidad óptima |

### Tipografía
- **Títulos y nombre:** Tipografía serif elegante (ej. Playfair Display, Cormorant Garamond o Lora) — transmite profesionalismo y calidez
- **Cuerpo y subtítulos:** Sans-serif limpia (ej. Nunito, Open Sans o Source Sans 3) — legibilidad y modernidad

### Elementos de Marca
- **Motivo:** Cerebro estilizado con mariposas (transformación, sanación, bienestar mental)
- **Patrón:** Mariposas delineadas como elemento decorativo sutil en fondos y materiales

---

## Inspiración: TherapyWithGayane.com

Elementos a adoptar del sitio de referencia:

1. **Tono empático y cercano** — Lenguaje que conecta emocionalmente sin ser clínico
2. **Estructura clara** — Hero → Problema/empatía → Solución → Servicios → CTA
3. **Sección "Meet"** — Presentación personal que humaniza la marca
4. **Servicios diferenciados** — Cards visuales para cada tipo de apoyo
5. **Integración de booking** — Calendario visible y accesible (estilo Calendly)
6. **Recursos y cursos** — Contenido de valor más allá de la terapia individual

---

## Los 6 Objetivos del Sitio

### 1. Recursos DIY para complementar la terapia

**Objetivo:** Ofrecer contenido descargable y práctico que los papás puedan usar en casa con sus hijos, reforzando lo trabajado en sesión.

**Implementación:**

| Elemento | Descripción |
|----------|-------------|
| **Biblioteca de guías PDF** | Sección "Recursos para casa" con guías descargables por tema: manejo de emociones, rutinas, límites, comunicación, etc. |
| **Categorización** | Por edad (niños, adolescentes), por tema (ansiedad, sueño, rabietas, autoestima) |
| **Contenido multimedia** | Enlaces curados a videos, podcasts, libros recomendados |
| **Acceso** | Pacientes actuales: acceso con login. Visitantes: algunos recursos gratuitos como gancho |

**Estructura sugerida:**
```
/recursos
  /guias-diy          → PDFs descargables
  /lecturas           → Artículos y recomendaciones
  /multimedia         → Videos, podcasts, libros
```

---

### 2. CRM adaptado para gestión de pacientes

**Objetivo:** Gestionar historial de pacientes y permitir que los papás vean y descarguen trabajos de sus hijos (dibujos, cuentos, ejercicios).

**Implementación:**

| Componente | Función |
|------------|---------|
| **Panel privado (Karla)** | Vista de pacientes, historial, notas de sesión, archivos adjuntos |
| **Galería por paciente** | Subir dibujos, cuentos, trabajos realizados en terapia |
| **Portal de padres** | Login seguro para que cada familia vea solo el contenido de su hijo/a |
| **Descarga** | Los papás pueden descargar en PDF o imagen los trabajos de sus hijos |

**Consideraciones técnicas:**
- Base de datos con pacientes, sesiones, archivos
- Autenticación segura (pacientes/padres vs. Karla)
- Cumplimiento de privacidad y confidencialidad (consentimiento, encriptación)

**Stack sugerido:** Backend con base de datos (PostgreSQL/Supabase) + autenticación (Auth0, Supabase Auth) o integración con herramientas existentes (Notion, Airtable) si prefiere empezar más ligero.

---

### 3. Foro de papás "De papis a papis"

**Objetivo:** Crear comunidad donde los padres compartan dudas, consejos y experiencias entre sí.

**Implementación:**

| Elemento | Descripción |
|----------|-------------|
| **Foro moderado** | Karla o equipo puede moderar; evita contenido inapropiado |
| **Categorías** | Por tema: crianza, emociones, adolescencia, rutinas, recomendaciones |
| **Sistema de posts** | Preguntas, respuestas, "me gusta" o votos útiles |
| **Acceso** | Requiere registro (puede vincularse con newsletter o ser independiente) |

**Plataformas alternativas si no se construye desde cero:**
- **Circle** — Comunidades de pago/gratuitas, integrable
- **Discourse** — Foro open source, muy flexible
- **Mighty Networks** — Comunidad + cursos

**Integración:** Si el foro es externo, el sitio tendría una sección "Comunidad" que enlaza al foro con diseño coherente.

---

### 4. Visibilidad de cursos (presenciales y remotos)

**Objetivo:** Dar visibilidad a cursos, talleres y formaciones; gestión con Luma u otra herramienta.

**Implementación:**

| Elemento | Descripción |
|----------|-------------|
| **Página /cursos** | Listado de cursos con imagen, descripción, fecha, modalidad (presencial/remoto) |
| **Filtros** | Por modalidad, fecha, tema |
| **Integración Luma** | Botón "Inscribirme" que lleva a Luma para registro y pago |
| **Destacados** | Cursos próximos en homepage o sección "Próximos eventos" |

**Estructura:**
```
/cursos
  /curso-nombre-del-curso   → Detalle con CTA a Luma
```

---

### 5. Agenda y espacios para nuevos pacientes

**Objetivo:** Mostrar disponibilidad de forma clara y facilitar la reserva de consultas para nuevos pacientes.

**Implementación (inspirada en la referencia Calendly):**

| Elemento | Descripción |
|----------|-------------|
| **Widget de calendario** | Integración con Calendly, Cal.com o Acuity — Karla sincroniza su agenda y el sitio muestra slots disponibles |
| **Tipos de cita** | Consulta inicial (15–20 min), sesión individual, etc. |
| **Sección destacada** | "Da el primer paso" / "Reserva tu consulta" con calendario embebido o enlace directo |
| **Zona horaria** | Selector de zona horaria para usuarios (como en la referencia) |

**Diseño sugerido:** Card blanco con dos columnas — izquierda: info de la consulta (duración, modalidad, descripción); derecha: calendario interactivo.

---

### 6. Newsletter y captación de leads

**Objetivo:** Recopilar emails de personas interesadas en contenido y novedades.

**Implementación:**

| Elemento | Descripción |
|----------|-------------|
| **Formulario de suscripción** | En footer, pop-up opcional, y/o sección dedicada |
| **Campos** | Email (obligatorio), nombre (opcional), interés (opcional: recursos, cursos, newsletter general) |
| **Integración** | Mailchimp, ConvertKit, Brevo o similar |
| **Confirmación** | Página de "Gracias" y email de bienvenida |
| **GDPR/Privacidad** | Checkbox de consentimiento y enlace a política de privacidad |

---

## Arquitectura del Sitio (Mapa de Navegación)

```
Karlahv.mx
│
├── / (Home)
│   ├── Hero con mensaje principal
│   ├── Sobre Karla
│   ├── Servicios (terapia individual, niños, adolescentes, adultos)
│   ├── Recursos destacados
│   ├── Próximos cursos
│   ├── Book a consultation (calendario)
│   └── Newsletter signup
│
├── /sobre-mi          → Historia, enfoque, formación
├── /servicios         → Detalle de cada tipo de terapia
├── /recursos          → Guías DIY, lecturas, multimedia
├── /cursos            → Listado y detalle de cursos
├── /agenda            → Reservar consulta (Calendly/Cal.com)
├── /comunidad         → Acceso al foro de papás
├── /blog              → (Opcional) Artículos y contenido
└── /contacto          → Formulario + datos de contacto
```

**Áreas con login:**
- `/portal` — Padres (ver trabajos de sus hijos)
- `/panel` — Karla (CRM, gestión de pacientes)

---

## Fases de Implementación Sugeridas

### Fase 1 — Fundación (4–6 semanas)
- [ ] Diseño de identidad (logo, paleta, tipografía)
- [ ] Homepage + páginas estáticas (Sobre mí, Servicios, Contacto)
- [ ] Integración Calendly/Cal.com para agenda
- [ ] Formulario de newsletter
- [ ] Hosting y dominio Karlahv.mx

### Fase 2 — Contenido y valor (3–4 semanas)
- [ ] Sección Recursos con guías PDF
- [ ] Página de Cursos con integración Luma
- [ ] Blog o sección de artículos (opcional)

### Fase 3 — CRM y portal de padres (6–8 semanas)
- [ ] Base de datos y autenticación
- [ ] Panel de Karla (gestión de pacientes)
- [ ] Portal de padres (galería de trabajos, descargas)

### Fase 4 — Comunidad (4–6 semanas)
- [ ] Foro de papás (propio o integración Circle/Discourse)
- [ ] Moderación y reglas de comunidad

---

## Stack Tecnológico Recomendado

| Capa | Opción A (Simple) | Opción B (Más control) |
|------|-------------------|------------------------|
| **Frontend** | WordPress + tema personalizado | Next.js / Astro |
| **Hosting** | SiteGround, Kinsta | Vercel, Netlify |
| **CRM/DB** | Airtable + Zapier | Supabase, PostgreSQL |
| **Newsletter** | Mailchimp, ConvertKit | ConvertKit, Brevo |
| **Agenda** | Calendly, Cal.com | Cal.com (open source) |
| **Cursos** | Luma (externo) | Luma (externo) |
| **Foro** | Circle, Mighty Networks | Discourse (self-hosted) |

**Recomendación inicial:** Empezar con Opción A para lanzar rápido; migrar a Opción B si se requiere más personalización del CRM y portal.

---

## Presupuesto Estimado (Referencia)

| Concepto | Rango |
|----------|-------|
| Diseño + desarrollo Fase 1 | $XXX – $XXX MXN |
| Desarrollo Fases 2–4 | Según alcance |
| Dominio + hosting anual | ~$1,500 – $3,000 MXN |
| Herramientas (Calendly, Mailchimp, etc.) | $500 – $2,000 MXN/mes |
| Mantenimiento mensual | Opcional |

---

## Próximos Pasos

1. **Validar propuesta** — Revisar con Karla y ajustar prioridades
2. **Definir contenido** — Textos para homepage, sobre mí, servicios
3. **Recopilar materiales** — Fotos, logo, guías PDF existentes
4. **Elegir stack** — Decidir entre WordPress vs. custom según presupuesto y tiempo
5. **Kick-off Fase 1** — Iniciar diseño y desarrollo

---

*Documento creado para Karla Hernández Villalobos — Karlahv.mx*  
*Propuesta v1.0 — Marzo 2026*
