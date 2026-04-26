export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, contact, message } = await req.json();

    if (!name?.trim() || !contact?.trim() || !message?.trim()) {
      return Response.json({ status: "error", error: "Заполните все поля" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("[contact] Missing env vars");
      return Response.json({ status: "error", error: "Конфигурация сервера" }, { status: 500 });
    }

    const text = `🆕 *Сообщение с портфолио*\n\n👤 ${name}\n📬 ${contact}\n\n💬 ${message}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
    });

    if (!tgRes.ok) {
      const body = await tgRes.text();
      console.error("[contact] Telegram error:", tgRes.status, body);
      return Response.json({ status: "error", error: "Ошибка отправки" }, { status: 502 });
    }

    return Response.json({ status: "success" });
  } catch (e) {
    console.error("[contact] Unexpected error:", e);
    return Response.json({ status: "error", error: "Внутренняя ошибка" }, { status: 500 });
  }
}
