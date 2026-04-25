export const revalidate = 300;

export interface TgPost {
  id: string;
  text: string;
  date: string;
  url: string;
  views?: string;
  images: string[];
  videos: string[];
}

export async function GET() {
  try {
    const res = await fetch("https://t.me/s/sleepycoffeem", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
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

  // Each post block starts at data-post="sleepycoffeem/NNN"
  const ids = [...html.matchAll(/data-post="sleepycoffeem\/(\d+)"/g)];

  for (const m of ids) {
    const id = m[1];
    const idx = m.index!;

    // Grab a chunk up to the next post or 12 000 chars
    const nextIdx = html.indexOf('data-post="sleepycoffeem/', idx + 1);
    const chunk = html.slice(idx, nextIdx > 0 ? nextIdx : idx + 12000);

    // ── Text ──────────────────────────────────────────────────────────────────
    const textM = chunk.match(
      /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const text = textM ? stripHtml(textM[1]) : "";

    // ── Date ──────────────────────────────────────────────────────────────────
    const dateM = chunk.match(/datetime="([^"]+)"/);
    const date = dateM ? dateM[1] : "";

    // ── URL ───────────────────────────────────────────────────────────────────
    const urlM = chunk.match(
      /href="(https:\/\/t\.me\/sleepycoffeem\/\d+)"/
    );
    const url = urlM ? urlM[1] : `https://t.me/sleepycoffeem/${id}`;

    // ── Views ─────────────────────────────────────────────────────────────────
    const viewsM = chunk.match(
      /class="tgme_widget_message_views">([^<]+)</
    );
    const views = viewsM ? viewsM[1].trim() : undefined;

    // ── Images ────────────────────────────────────────────────────────────────
    // Strategy: only look inside .tgme_widget_message_photo elements, not
    // the whole chunk (avoids picking up channel avatar / previews).
    //
    // Telegram renders photos as anchor tags with inline style:
    //   <a class="tgme_widget_message_photo_wrap ..."
    //      style="...background-image:url('https://...')...">
    //
    // The URL may be single-quoted OR HTML-entity-encoded (&quot;).

    const images: string[] = [];

    // photo_wrap anchors
    const photoBlockRe =
      /tgme_widget_message_photo_wrap[\s\S]*?(?=tgme_widget_message_photo_wrap|tgme_widget_message_video|<\/div>\s*<\/div>|$)/g;

    const photoBlocks = [...chunk.matchAll(photoBlockRe)];

    if (photoBlocks.length > 0) {
      for (const pb of photoBlocks) {
        const block = pb[0];
        // single-quoted: url('...')
        const sq = block.match(/background-image:url\('([^']+)'\)/);
        if (sq && !images.includes(sq[1])) { images.push(sq[1]); continue; }
        // double-quoted entity: url(&quot;...&quot;)
        const dq = block.match(/background-image:url\(&quot;([^&]+)&quot;\)/);
        if (dq && !images.includes(dq[1])) { images.push(dq[1]); continue; }
        // plain double-quoted: url("...")
        const plain = block.match(/background-image:url\("([^"]+)"\)/);
        if (plain && !images.includes(plain[1])) images.push(plain[1]);
      }
    } else {
      // Fallback: some themes emit <img> tags inside photo wrappers
      const imgTags = [
        ...chunk.matchAll(
          /<img[^>]+class="[^"]*photo[^"]*"[^>]+src="([^"]+)"/g
        ),
      ];
      for (const it of imgTags) {
        if (!images.includes(it[1])) images.push(it[1]);
      }
    }

    // ── Videos ───────────────────────────────────────────────────────────────
    // Telegram embeds video in several ways:
    //   1. <video ...><source src="...mp4"></video>
    //   2. <video src="...mp4" ...>
    //   3. data-url="...mp4" on .tgme_widget_message_video_player

    const videos: string[] = [];

    // <source src="...">
    const sourceMatches = [
      ...chunk.matchAll(/<source[^>]+src="([^"]+)"/g),
    ];
    for (const sm of sourceMatches) {
      if (!videos.includes(sm[1])) videos.push(sm[1]);
    }

    // <video src="..."> (direct attribute, less common)
    const videoSrcMatches = [
      ...chunk.matchAll(/<video[^>]+src="([^"]+)"/g),
    ];
    for (const vm of videoSrcMatches) {
      if (!videos.includes(vm[1])) videos.push(vm[1]);
    }

    // data-url="..." on video player wrapper
    const dataUrlMatches = [
      ...chunk.matchAll(/tgme_widget_message_video[^>]+data-url="([^"]+)"/g),
    ];
    for (const du of dataUrlMatches) {
      if (!videos.includes(du[1])) videos.push(du[1]);
    }

    if (date) {
      posts.push({ id, text: text.trim(), date, url, views, images, videos });
    }
  }

  // Newest first, cap at 20
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