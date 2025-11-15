# 📅 Sistema de Reservas TATYCAN

Sistema completo de reservas online con integración a Telegram, optimizado para Vercel.

## 🎯 Características

- ✅ Formulario multi-paso (4 pasos)
- ✅ Validación de teléfono español con formato automático
- ✅ Selección de razas con precios de la lista oficial
- ✅ Calendario interactivo con selección de fecha y hora
- ✅ Servicios adicionales opcionales
- ✅ Notificaciones formateadas a Telegram
- ✅ Completamente en español
- ✅ Responsive y optimizado para móvil

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar .env (ver QUICKSTART.md)
cp .env.example .env

# Ejecutar con Vercel
npm run dev:vercel
```

Ver [QUICKSTART.md](./QUICKSTART.md) para instrucciones detalladas.

## 📚 Documentación

- [QUICKSTART.md](./QUICKSTART.md) - Guía de inicio rápido
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Deployment y configuración Vercel

## 🎨 Flujo del Usuario

1. **Paso 1**: Información de contacto (nombre, teléfono)
2. **Paso 2**: Selección de raza y servicios extras
3. **Paso 3**: Calendario y selección de horarios múltiples
4. **Paso 4**: Confirmación y envío

## 📱 Ejemplo de Mensaje Telegram

```
🐾 Nueva Solicitud de Cita

👤 Cliente: Juan Pérez
📞 Teléfono: 612 345 678
🐕 Raza: Golden Retriever

💰 Precio Base: 65€

📅 Fechas y Horarios Disponibles (2):
   • 15/10/2025 a las 10:00
   • 16/10/2025 a las 14:30

💵 Total Estimado: 65€

⏰ Recibido: 04/10/2025, 18:45:00
```

## 🔧 Stack Técnico

- **Frontend**: React 19, Vite 7, Tailwind CSS 4
- **UI Components**: SHADCN + react-calendar
- **Backend**: Vercel Serverless Functions
- **Integración**: Telegram Bot API
- **Hosting**: Vercel

## ✨ Créditos

Desarrollado para TATYCAN - Atelier de Peluquería Canina
