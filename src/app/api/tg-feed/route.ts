export const revalidate = 300;

export interface TgPost {
  id: string;
  text: string;
  date: string;
  url: string;
  views?: string;
}

export async function GET() {
  try {
    const res = await fetch("https://t.me/s/sleepycoffeem", {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json({ posts: [], error: "fetch_failed" });
    }

    const html = await res.text();
    const posts = parse(html);
    return Response.json({ posts });
  } catch {
    return Response.json({ posts: [], error: "network_error" });
  }
}

function parse(html: string): TgPost[] {
  const posts: TgPost[] = [];

  // Each post has data-post="sleepycoffeem/NNN"
  const ids = [...html.matchAll(/data-post="sleepycoffeem\/(\d+)"/g)];

  for (const m of ids) {
    const id = m[1];
    const idx = m.index!;
    const chunk = html.slice(idx, idx + 4000);

    const textM = chunk.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const text = textM ? stripHtml(textM[1]) : "";

    const dateM = chunk.match(/datetime="([^"]+)"/);
    const date = dateM ? dateM[1] : "";

    const urlM = chunk.match(/href="(https:\/\/t\.me\/sleepycoffeem\/\d+)"/);
    const url = urlM ? urlM[1] : `https://t.me/sleepycoffeem/${id}`;

    const viewsM = chunk.match(/class="tgme_widget_message_views">([^<]+)</);
    const views = viewsM ? viewsM[1].trim() : undefined;

    if (text || date) posts.push({ id, text: text.trim(), date, url, views });
  }

  return posts.reverse().slice(0, 20);
}

function stripHtml(raw: string): string {
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
