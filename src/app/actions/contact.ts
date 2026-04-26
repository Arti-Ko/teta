"use server";

export async function submitContact(
  _: { status: string; error?: string } | null,
  formData: FormData
): Promise<{ status: string; error?: string }> {
  const name = (formData.get("name") as string)?.trim();
  const contact = (formData.get("contact") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !contact || !message) {
    return { status: "error", error: "Заполните все поля" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[contact] Missing env vars:", { token: !!token, chatId: !!chatId });
    return { status: "error", error: "Конфигурация сервера не завершена. Напишите напрямую: arti.k.renko@gmail.com" };
  }

  const text = `🆕 *Сообщение с портфолио*\n\n👤 ${name}\n📬 ${contact}\n\n💬 ${message}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[contact] Telegram API error:", res.status, body);
    return { status: "error", error: "Не удалось отправить. Напишите напрямую на email." };
  }

  return { status: "success" };
}
