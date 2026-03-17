# Panel de administración - KarlaHV

## Acceso

1. En el sitio público, haz clic en **"Karla Hernández Villalobos"** en el footer (abajo de la página).
2. Serás redirigido a `/admin` y, si no has iniciado sesión, a la página de login.

## Credenciales

- **Email:** karlahv3110@gmail.com
- **Contraseña:** Emili@2026

## Secciones editables

Desde el panel puedes editar:

- **Sitio general** – Nombre, email, teléfono, dominio, duración de consulta
- **Sobre mí** – Biografía, formación (carrusel), enfoques
- **Servicios** – Terapia niños, adolescentes, adultos (títulos, descripciones, puntos)
- **Recursos** – Guías, lecturas, comunidad (con opción de subir PDFs)
- **Cursos y talleres** – Enlaces a Luma, fechas, modalidades
- **Agenda** – Link de Calendly, tipos de cita
- **Contacto** – Mensaje, horario de atención

## Subir archivos (PDFs e imágenes)

- En **Recursos**, al añadir un ítem con PDF, usa el botón "Subir archivo" para cargar el documento.
- Los archivos se guardan en `/public/uploads/` y quedan disponibles en el sitio.

## Comandos para desarrollo

```bash
# Crear base de datos (primera vez)
npx prisma db push

# Cargar datos iniciales y usuario admin (primera vez)
npx prisma db seed

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Producción

1. Cambia `JWT_SECRET` en `.env` por una clave segura.
2. Para producción con base de datos, considera usar PostgreSQL en lugar de SQLite.
3. El sitio ya no usa export estático; necesita un servidor Node (Vercel, Railway, etc.).
