export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Test actual Telegram delivery
  let telegramStatus = "not_tested";
  if (token && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: Number(chatId),
          text: "🔧 Debug test from Vercel",
        }),
      });
      const body = await res.json();
      telegramStatus = res.ok ? "ok" : `error: ${JSON.stringify(body)}`;
    } catch (e) {
      telegramStatus = `fetch_error: ${String(e)}`;
    }
  }

  return Response.json({
    hasToken: !!token,
    tokenLength: token?.length ?? 0,
    hasChatId: !!chatId,
    chatIdValue: chatId ?? "MISSING",
    telegramStatus,
  });
}
