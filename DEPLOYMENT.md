# Guía de despliegue: Vercel + Supabase

## Orden de pasos (resumen)

1. **Supabase** → Crear proyecto, obtener URLs, crear bucket `uploads`
2. **Variables** → Añadir a `.env` local y a Vercel
3. **Base de datos** → `npx prisma db push` y `npx prisma db seed`
4. **Vercel** → Conectar repo, configurar env vars, deploy
5. **Probar** → Login en admin con karlahv3110@gmail.com / Emili@2026

---

## Paso 1: Configurar Supabase

### 1.1 Crear proyecto

1. Entra a [supabase.com](https://supabase.com) e inicia sesión.
2. **New Project** → nombre (ej. `karlahv`), contraseña de DB, región.
3. Espera a que termine de crearse.

### 1.2 Obtener credenciales

En el proyecto: **Settings** → **API**:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

En **Settings** → **Database**:

- **Connection string** → **URI** (modo Transaction)
- Copia la URL y úsala como `DATABASE_URL`
- Para **Direct connection** (puerto 5432) copia la URL y úsala como `DIRECT_URL`

Formato típico:

```
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres"
```

### 1.3 Crear bucket de Storage

1. **Storage** → **New bucket**
2. Nombre: `uploads`
3. Marca **Public bucket** (para que las URLs de los PDFs sean accesibles)
4. **Create bucket**

---

## Paso 2: Configurar Vercel

### 2.1 Conectar el repositorio

1. Entra a [vercel.com](https://vercel.com) e inicia sesión.
2. **Add New** → **Project**
3. Importa el repo de GitHub/GitLab.
4. Framework: **Next.js** (detectado automáticamente).

### 2.2 Variables de entorno

En el proyecto: **Settings** → **Environment Variables** y añade:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `DATABASE_URL` | URL de conexión (pooler) de Supabase | Production, Preview |
| `DIRECT_URL` | URL de conexión directa de Supabase | Production, Preview |
| `JWT_SECRET` | Clave secreta larga y aleatoria | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL de Supabase | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key de Supabase | Production, Preview |

Para generar `JWT_SECRET`:

```bash
openssl rand -base64 32
```

### 2.3 Deploy

1. **Deploy** (o haz push al repo si ya está conectado).
2. Espera a que termine el build.

---

## Paso 3: Configurar variables localmente

Crea o actualiza tu archivo `.env` con las credenciales de Supabase:

```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres"
JWT_SECRET="genera-una-clave-con-openssl-rand-base64-32"
NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

## Paso 4: Migrar la base de datos

### 4.1 Ejecutar migraciones

```bash
npx prisma db push
```

### 4.2 Cargar datos iniciales y usuario admin

```bash
npx prisma db seed
```

Esto crea el usuario admin: `karlahv3110@gmail.com` / `Emili@2026`.

---

## Paso 5: Verificar

1. Abre la URL de tu proyecto en Vercel.
2. Haz clic en **"Karla Hernández Villalobos"** en el footer.
3. Inicia sesión con las credenciales del admin.
4. Comprueba que puedes editar contenido y subir archivos.

---

## Desarrollo local

Usa el mismo `.env` con las credenciales de Supabase. Luego:

```bash
npx prisma db push
npx prisma db seed
npm run dev
```

El sitio estará en http://localhost:5001

---

## Resumen de variables

| Variable | Dónde obtenerla |
|----------|----------------|
| `DATABASE_URL` | Supabase → Settings → Database → Connection string (URI, pooler) |
| `DIRECT_URL` | Supabase → Settings → Database → Direct connection |
| `JWT_SECRET` | Generar con `openssl rand -base64 32` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (secret) |
