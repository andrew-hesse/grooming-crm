# Configuración para Vercel Deployment

Este documento explica cómo configurar y desplegar el sistema de reservas en Vercel.

## 🚀 Configuración Local con Vercel

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui
```

**Cómo obtener estas credenciales:**

1. **Bot Token**: Habla con [@BotFather](https://t.me/BotFather) en Telegram
   - Envía `/newbot`
   - Sigue las instrucciones
   - Copia el token que te proporciona

2. **Chat ID**: Habla con [@userinfobot](https://t.me/userinfobot)
   - Envía cualquier mensaje
   - Copia tu ID de chat

### 3. Ejecutar en Local (con Vercel)

```bash
npm run dev:vercel
```

Esto iniciará el servidor en: **http://localhost:3000**

La API estará disponible en: **http://localhost:3000/api/booking**

### 4. Alternativa: Solo Frontend (sin API)

Si solo quieres trabajar en el frontend:

```bash
npm run dev
```

Esto iniciará Vite en: **http://localhost:5173**

⚠️ **Nota**: Las funciones de API no funcionarán en este modo.

## 📦 Deployment a Vercel

### Opción 1: Desde la Terminal

1. **Login a Vercel**:
```bash
vercel login
```

2. **Deploy**:
```bash
vercel
```

3. **Deploy a Producción**:
```bash
vercel --prod
```

### Opción 2: Desde GitHub (Recomendado)

1. **Conecta tu repositorio** en [vercel.com](https://vercel.com)
2. **Importa tu proyecto** desde GitHub
3. **Configura las variables de entorno** en el dashboard de Vercel:
   - Ve a: Settings → Environment Variables
   - Añade:
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`

4. **Deploy automático**: Cada push a main desplegará automáticamente

## 🔧 Estructura del Proyecto

```
tatycan.com/
├── api/
│   └── booking.js          # Vercel Serverless Function
├── src/
│   ├── pages/
│   │   └── BookingPage.jsx
│   └── components/
├── vercel.json             # Configuración de Vercel
└── .env                    # Variables de entorno (NO SUBIR A GIT)
```

## 📝 Variables de Entorno en Vercel

Para configurar en producción:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade las siguientes variables:

| Variable | Descripción |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram |
| `TELEGRAM_CHAT_ID` | ID de tu chat de Telegram |

## 🧪 Probar la API Localmente

```bash
# Con Vercel CLI ejecutándose
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "612345678",
    "breed": "Golden Retriever",
    "price": 65,
    "extras": [],
    "slots": ["2025-10-15T10:00"],
    "total": 65
  }'
```

## ⚙️ Configuración de vercel.json

El archivo `vercel.json` ya está configurado:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

Esto asegura que las rutas `/api/*` sean manejadas por las serverless functions.

## 🔒 Seguridad

- ✅ `.env` está en `.gitignore`
- ✅ Variables sensibles solo en Vercel Environment Variables
- ✅ CORS configurado en la API
- ✅ Validación de datos en el backend

## 🐛 Troubleshooting

### Error: "Telegram credentials not configured"

**Solución**: Verifica que las variables de entorno estén configuradas correctamente.

Local:
```bash
# Verifica que .env existe y tiene las variables
cat .env
```

Producción:
- Verifica en Vercel Dashboard → Settings → Environment Variables

### Error: "Method not allowed"

**Solución**: La API solo acepta POST requests. Verifica el método HTTP.

### Error de CORS

**Solución**: La API ya tiene CORS habilitado. Si persiste:
1. Verifica que estás usando `http://localhost:3000` con Vercel CLI
2. En producción, Vercel maneja CORS automáticamente

## 📊 Logs en Producción

Para ver logs de las serverless functions:

```bash
vercel logs [deployment-url]
```

O en el dashboard:
- Project → Deployments → Click en deployment → Functions → Logs

## 🎯 Comandos Útiles

```bash
# Desarrollo local
npm run dev:vercel

# Build del frontend
npm run build

# Lint
npm run lint

# Deploy a preview
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Abrir dashboard
vercel open
```

## 📱 Resultado Final

Una vez desplegado, tu aplicación estará disponible en:

```
https://tatycan.vercel.app
```

Y la API en:

```
https://tatycan.vercel.app/api/booking
```

¡Listo para recibir reservas! 🎉
