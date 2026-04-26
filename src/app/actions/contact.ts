"use server";

export async function submitContact(
  _: { status: string } | null,
  formData: FormData
): Promise<{ status: string }> {
  const name = (formData.get("name") as string)?.trim();
  const contact = (formData.get("contact") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !contact || !message) return { status: "error" };

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    const text = `🆕 *Сообщение с портфолио*\n\n👤 ${name}\n📬 ${contact}\n\n💬 ${message}`;
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
      });
    } catch { /* silent fail */ }
  }

  return { status: "success" };
}
console.log("token exists:", !!process.env.TELEGRAM_BOT_TOKEN);
console.log("chatId exists:", !!process.env.TELEGRAM_CHAT_ID);