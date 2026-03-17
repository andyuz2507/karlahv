# Karlahv.mx — Sitio de Karla Hernández Villalobos

Sitio web para Karla Hernández Villalobos, psicóloga integrativa con más de 10 años de experiencia.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) (o http://localhost:3001 si el puerto 3000 está ocupado).

## Producción

```bash
npm run build
npm start
```

## Estructura

- **/** — Home
- **/sobre-mi** — Sobre Karla
- **/servicios** — Terapia con niños, adolescentes, adultos
- **/recursos** — Guías DIY, lecturas, comunidad
- **/cursos** — Cursos y talleres (integración Luma)
- **/agenda** — Reservar consulta (integrar Calendly/Cal.com)
- **/contacto** — Formulario de contacto

## Editar contenido

Todo el contenido está centralizado en **`src/lib/site-data.ts`**. Edita ese archivo para actualizar:
- Datos de contacto (email, teléfono, dirección)
- Biografía y formación
- Servicios, cursos, recursos
- URL de Calendly para la agenda

## Próximos pasos

1. **Agenda:** Crear cuenta en Calendly y actualizar `agenda.linkCalendly` en site-data.ts
2. **Newsletter:** Conectar formulario con Mailchimp/ConvertKit
3. **Contacto:** Conectar formulario con Formspree, Resend o backend
4. **Imágenes:** Añadir foto real de Karla (reemplazar el placeholder "KH")
5. **Dominio:** Desplegar en Vercel/Netlify y configurar Karlahv.mx
