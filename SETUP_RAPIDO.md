# Solo te faltan 2 cosas (2 minutos)

## 1. Pegar las URLs en el archivo .env

1. Abre https://supabase.com/dashboard y tu proyecto
2. Clic en **Connect** (arriba derecha)
3. **Method: Transaction** → copia la URL → sustituye `[YOUR-PASSWORD]` por tu contraseña → pégalo en `.env` en `DATABASE_URL=""`
4. **Method: Direct connection** → copia la URL → sustituye `[YOUR-PASSWORD]` → pégalo en `DIRECT_URL=""`
5. Guarda el archivo .env

## 2. Crear el bucket en Supabase

1. En Supabase: menú izquierdo → **Storage**
2. **New bucket** → nombre: `uploads` → marcar **Public bucket** → Create

## 3. Ejecutar en la terminal

```bash
npx prisma db push
npx prisma db seed
npm run dev
```

Luego abre http://localhost:5001 y haz clic en el nombre en el footer.
