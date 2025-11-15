// Vercel Serverless Function for Booking
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const bookingData = req.body;

    // Validate required fields
    if (!bookingData.name || !bookingData.phone || !bookingData.breed) {
      return res.status(400).json({
        success: false,
        error: "Faltan campos requeridos",
      });
    }

    // Send to Telegram
    const message = formatBookingMessage(bookingData);
    await sendToTelegram(message);

    res.status(200).json({
      success: true,
      message: "Solicitud enviada correctamente",
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({
      success: false,
      error: "Error al procesar la solicitud",
    });
  }
}

// Send message to Telegram
async function sendToTelegram(message) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram credentials not configured");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.statusText} - ${errorText}`);
  }

  return await response.json();
}

// Format booking data for Telegram
function formatBookingMessage(data) {
  const { name, phone, breed, price, extras, slots, total } = data;

  let message = `🐾 <b>Nueva Solicitud de Cita</b>\n\n`;
  message += `👤 <b>Cliente:</b> ${name}\n`;
  message += `📞 <b>Teléfono:</b> ${phone}\n`;
  message += `🐕 <b>Raza:</b> ${breed}\n\n`;

  if (price !== null) {
    message += `💰 <b>Precio Base:</b> ${price}€\n`;
  } else {
    message += `💰 <b>Precio:</b> Requiere consulta\n`;
  }

  if (extras && extras.length > 0) {
    message += `\n<b>Servicios Adicionales:</b>\n`;
    extras.forEach((extra) => {
      if (extra) {
        message += `   • ${extra}\n`;
      }
    });
  }

  if (total !== null && total > 0) {
    message += `\n💵 <b>Total Estimado:</b> ${total}€\n`;
    message += `<i>(Precio orientativo, sujeto a confirmación)</i>\n`;
  }

  if (slots && slots.length > 0) {
    message += `\n📅 <b>Fechas y Horarios Disponibles (${slots.length}):</b>\n`;
    slots.forEach((slot) => {
      message += `   • ${slot}\n`;
    });
  }

  message += `\n⏰ <b>Recibido:</b> ${new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
  })}`;

  return message;
}
