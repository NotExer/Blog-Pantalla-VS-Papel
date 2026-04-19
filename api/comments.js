// Vercel Serverless Function — Comments API
// Uses Vercel KV (Redis) for persistent storage.
// If KV is not configured, falls back to in-memory (resets on cold start).

let memoryComments = [];
let kv = null;

async function getKV() {
  if (kv !== undefined && kv !== null) return kv;
  try {
    const mod = await import("@vercel/kv");
    kv = mod.kv;
    return kv;
  } catch {
    kv = null;
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const store = await getKV();

  if (req.method === "GET") {
    try {
      if (store) {
        const keys = await store.keys("pb:*");
        const comments = [];
        for (const key of keys) {
          const val = await store.get(key);
          if (val) comments.push(val);
        }
        comments.sort((a, b) => b.ts - a.ts);
        return res.status(200).json(comments);
      }
      return res.status(200).json([...memoryComments].sort((a, b) => b.ts - a.ts));
    } catch (e) {
      console.error("GET error:", e);
      return res.status(500).json({ error: "Error al cargar comentarios" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, text } = req.body;
      if (!name || !text || typeof name !== "string" || typeof text !== "string") {
        return res.status(400).json({ error: "Nombre y comentario son requeridos" });
      }
      if (name.length > 100 || text.length > 2000) {
        return res.status(400).json({ error: "Texto demasiado largo" });
      }

      const comment = {
        id: Date.now().toString(),
        name: name.trim(),
        text: text.trim(),
        ts: Date.now(),
      };

      if (store) {
        await store.set(`pb:${comment.id}`, comment);
      } else {
        memoryComments.push(comment);
      }

      return res.status(201).json(comment);
    } catch (e) {
      console.error("POST error:", e);
      return res.status(500).json({ error: "Error al publicar comentario" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
