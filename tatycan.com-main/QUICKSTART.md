# 🚀 Quick Start - Sistema de Reservas

## 📋 Requisitos Previos

1. Node.js 18+ instalado
2. Vercel CLI instalado globalmente:
   ```bash
   npm install -g vercel
   ```

## ⚡ Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Telegram Bot

Crea un archivo `.env` en la raíz:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Obtener credenciales:**
- Bot Token: [@BotFather](https://t.me/BotFather) → `/newbot`
- Chat ID: [@userinfobot](https://t.me/userinfobot)

### 3. Ejecutar en desarrollo

```bash
npm run dev:vercel
```

Abre: **http://localhost:3000**

La app de reservas está en: **http://localhost:3000/reserva**

## 🎯 Características del Sistema de Reservas

✅ Multi-paso (4 pasos)
✅ Validación de teléfono español (XXX XXX XXX)
✅ Selección de razas con precios automáticos
✅ Calendario con selección de fecha y hora
✅ Servicios adicionales opcionales
✅ Notificaciones a Telegram
✅ 100% en español
✅ Optimizado para móvil

## 📱 Puntos de Acceso a Reservas

El botón de "Reservar Cita" aparece en:

- ✅ Navbar (desktop y mobile)
- ✅ Sección PriceList en homepage
- ✅ Sección BookingCTA dedicada en homepage
- ✅ Página de precios
- ✅ Botón flotante móvil

## 🚀 Deploy a Vercel

### Desde GitHub (Recomendado)

1. Push tu código a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Configura Environment Variables:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Deploy automático en cada push

### Desde CLI

```bash
vercel --prod
```

## 📂 Archivos Importantes

```
├── api/booking.js              # Vercel Serverless Function
├── src/pages/BookingPage.jsx   # Formulario principal
├── src/components/
│   ├── BookingCalendar.jsx     # Calendario con horarios
│   └── BookingCTA.jsx          # Sección CTA en homepage
├── vercel.json                 # Config Vercel
└── .env                        # Variables entorno (NO SUBIR A GIT)
```

## 🆘 Problemas Comunes

**La API no funciona en local:**
- Asegúrate de ejecutar `npm run dev:vercel` (no `npm run dev`)
- Verifica que `.env` existe con las variables correctas

**No recibo mensajes de Telegram:**
- Verifica las credenciales en `.env`
- Asegúrate de haber iniciado conversación con el bot (`/start`)
- Revisa logs: `vercel logs`

**Error de validación de teléfono:**
- Debe ser formato español: 9 dígitos, comenzando con 6-9
- Sin prefijo +34

## 📖 Documentación Completa

Ver [VERCEL_SETUP.md](./VERCEL_SETUP.md) para documentación detallada.

## ✨ Testing

Probar la API localmente:

```bash
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "phone": "612345678",
    "breed": "Golden Retriever",
    "price": 65,
    "slots": ["2025-10-15T10:00"],
    "total": 65
  }'
```

¡Eso es todo! 🎉
