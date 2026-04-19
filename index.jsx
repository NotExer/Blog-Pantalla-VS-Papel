import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');`;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f0e0d;--surface:#181512;--surface2:#201d18;
  --text:#e8e0d0;--muted:#8a7f6e;--faint:#3a342c;
  --accent:#c8a96e;--accent2:#7a6542;
  --fd:'Playfair Display',Georgia,serif;
  --fb:'Crimson Pro',Georgia,serif;
}
.wrap{max-width:700px;margin:0 auto;padding:0 20px}
.site-hd{border-bottom:1px solid var(--faint);padding:16px 0;text-align:center;background:var(--bg)}
.site-name{font-family:var(--fd);font-size:12px;letter-spacing:.35em;text-transform:uppercase;color:var(--accent)}
.site-sub{font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;margin-top:3px}
.art-hd{padding:48px 0 32px;border-bottom:1px solid var(--faint)}
.art-cat{font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.art-title{font-family:var(--fd);font-size:clamp(1.7rem,4vw,2.7rem);line-height:1.15;font-weight:700;margin-bottom:14px;color:var(--text)}
.art-lead{font-size:1.1rem;color:var(--muted);line-height:1.6;font-style:italic;margin-bottom:22px;font-family:var(--fb)}
.art-meta{display:flex;align-items:center;gap:12px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);flex-wrap:wrap}
.dot{color:var(--accent)}
.art-body{padding:36px 0;font-size:1.1rem;line-height:1.88;color:var(--text);font-family:var(--fb)}
.art-body p{margin-bottom:1.3em}
.art-body p:first-of-type::first-letter{font-family:var(--fd);font-size:4rem;font-weight:900;float:left;line-height:.75;margin:8px 10px -4px 0;color:var(--accent)}
.art-body h2{font-family:var(--fd);font-size:1.2rem;font-weight:700;margin:2.2em 0 .8em;padding-bottom:7px;border-bottom:1px solid var(--faint);color:var(--text)}
.pull{border-left:3px solid var(--accent);padding:4px 0 4px 18px;margin:1.8em 0;font-family:var(--fd);font-size:1.1rem;font-style:italic;color:var(--accent);line-height:1.55}
.tbl-wrap{overflow-x:auto;margin:1.6em 0}
table{width:100%;border-collapse:collapse;font-size:.92rem;font-family:var(--fb)}
th{background:var(--surface2);color:var(--accent);font-family:var(--fd);font-weight:700;padding:9px 13px;text-align:left;border-bottom:2px solid var(--faint);font-size:.9rem}
td{padding:8px 13px;border-bottom:1px solid var(--faint);color:var(--text);vertical-align:top;line-height:1.5}
tr:last-child td{border-bottom:none}
td:first-child{color:var(--muted);font-style:italic}
.media-box{margin:2em 0}
.media-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.video-wrap{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border:1px solid var(--faint)}
.video-wrap iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.info-card{background:var(--surface);border:1px solid var(--faint);padding:13px 15px}
.info-card-title{font-family:var(--fd);font-size:.86rem;font-weight:700;color:var(--accent);margin-bottom:7px}
.info-card ul{list-style:none;padding:0}
.info-card li{font-size:.88rem;color:var(--muted);line-height:1.65;padding:2px 0}
.info-card li::before{content:"→ ";color:var(--accent2)}
.refs{border-top:1px solid var(--faint);padding:22px 0 8px}
.refs-title{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.refs p{font-size:.88rem;color:var(--muted);line-height:1.65;margin-bottom:7px;font-family:var(--fb)}
.divider{border:none;border-top:1px solid var(--faint)}
.cmts{padding:36px 0 52px}
.cmts-hd{display:flex;align-items:baseline;gap:10px;margin-bottom:24px}
.cmts-title{font-family:var(--fd);font-size:1.2rem;font-weight:700;color:var(--text)}
.cmts-n{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--accent)}
.form-box{background:var(--surface);border:1px solid var(--faint);padding:18px;margin-bottom:28px}
.lbl{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:5px}
.inp{width:100%;background:var(--surface2);border:1px solid var(--faint);color:var(--text);font-family:var(--fb);font-size:1rem;padding:8px 12px;outline:none;transition:border-color .2s;margin-bottom:10px;border-radius:0}
.inp:focus{border-color:var(--accent2)}
.ta{resize:vertical;min-height:80px}
.btn{background:var(--accent);color:#0f0e0d;border:none;font-family:var(--fb);font-size:.83rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:9px 22px;cursor:pointer;transition:opacity .18s}
.btn:hover{opacity:.82}.btn:disabled{opacity:.35;cursor:not-allowed}
.cmt{padding:18px 0;border-bottom:1px solid var(--faint);animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.cmt-author{font-family:var(--fd);font-weight:700;font-size:.95rem;margin-bottom:2px;color:var(--text)}
.cmt-date{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.cmt-text{font-size:1rem;line-height:1.7;color:#c8bfb0;font-family:var(--fb)}
.empty{color:var(--muted);font-style:italic;padding:12px 0;font-family:var(--fb)}
.loading-txt{color:var(--muted);font-size:.83rem;letter-spacing:.1em;text-transform:uppercase;padding:12px 0}
.err{color:#e07070;font-size:.88rem;margin-bottom:8px;font-family:var(--fb)}
.site-ft{border-top:1px solid var(--faint);padding:16px 0;text-align:center;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
`;

function fmt(ts) {
  return new Date(ts).toLocaleDateString("es-CO", { year:"numeric", month:"long", day:"numeric" });
}

export default function Blog() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const list = await window.storage.list("pb:", true);
      if (list?.keys?.length) {
        const rows = await Promise.all(list.keys.map(async k => {
          try { const r = await window.storage.get(k, true); return r ? JSON.parse(r.value) : null; }
          catch { return null; }
        }));
        setComments(rows.filter(Boolean).sort((a,b) => b.ts - a.ts));
      }
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function submit() {
    if (!name.trim() || !text.trim() || sending) return;
    setSending(true); setErr("");
    const c = { id: Date.now().toString(), name: name.trim(), text: text.trim(), ts: Date.now() };
    try {
      await window.storage.set(`pb:${c.id}`, JSON.stringify(c), true);
      setComments(p => [c, ...p]);
      setName(""); setText("");
    } catch { setErr("No se pudo publicar. Intenta de nuevo."); }
    finally { setSending(false); }
  }

  return (
    <>
      <style>{FONTS}{css}</style>
      <div style={{minHeight:"100vh",background:"var(--bg)"}}>

        <header className="site-hd">
          <div className="wrap">
            <div className="site-name">Pantalla &amp; Papel</div>
            <div className="site-sub">Blog colaborativo · Narrativas digitales · Semana 4</div>
          </div>
        </header>

        <div className="wrap">
          <div className="art-hd">
            <div className="art-cat">Reflexión grupal · Narrativa digital vs. tradicional</div>
            <h1 className="art-title">¿Leemos igual en pantalla que en papel?</h1>
            <p className="art-lead">
              Las formas de contar historias han cambiado. ¿Cuáles son esas diferencias y cuál formato convence mejor?
            </p>
            <div className="art-meta">
              <span>Grupo colaborativo</span><span className="dot">·</span>
              <span>Abril 2025</span><span className="dot">·</span>
              <span>4 min de lectura</span>
            </div>
          </div>

          <article className="art-body">

            <p>
              Desde las pinturas rupestres hasta los reels de Instagram, los seres humanos siempre hemos contado historias. Lo que ha cambiado es el soporte: antes un libro en papel, hoy una pantalla conectada a internet. Pero, ¿eso cambia realmente cómo narramos y cómo argumentamos? La respuesta corta es: sí, y bastante.
            </p>

            <h2>¿En qué se diferencian la narrativa digital y la tradicional?</h2>

            <p>
              La narrativa tradicional —la del libro, el periódico, la revista— sigue un camino recto: empiezas en la página uno y llegas al final. El autor decide el orden, el ritmo y lo que merece atención. Por su parte, el lector se sienta con el texto y lo recorre sin interrupciones. Como señala Karbaum (2021), esta forma de narrar ha acompañado a la humanidad durante siglos y tiene una solidez que viene precisamente de eso.
            </p>
            <p>
              La narrativa digital, en cambio, no tiene por qué ir en línea recta: puedes hacer clic en un enlace, ver un video, escuchar un audio o saltar a otro artículo relacionado. Paredes Otero (2022) describe esto como una narrativa transmedia, donde la historia se distribuye por varias plataformas y cada persona arma su propio recorrido. Esto hace que la experiencia sea más rica, aunque también más fácil de perder el hilo.
            </p>

            <div className="media-box">
              <div className="media-label">Comparativa rápida</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>Aspecto</th><th>Narrativa tradicional</th><th>Narrativa digital</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Estructura</td><td>Lineal y fija</td><td>Hipertextual, se puede ramificar</td></tr>
                    <tr><td>Recursos</td><td>Texto e imagen estática</td><td>Video, audio, enlaces, animaciones</td></tr>
                    <tr><td>Participación</td><td>El lector solo recibe</td><td>El lector puede comentar y compartir</td></tr>
                    <tr><td>Actualización</td><td>Fija una vez publicada</td><td>Se puede editar en cualquier momento</td></tr>
                    <tr><td>Concentración</td><td>Favorece la lectura profunda</td><td>Más distracciones, pero más herramientas</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2>¿Cuál de los dos formatos argumenta mejor y por qué?</h2>

            <p>
              En nuestra opinión, la narrativa digital argumenta mejor, aunque con una condición importante: que se use bien. No se trata de poner más colores, más videos o más efectos. Se trata de aprovechar algo que el papel simplemente no puede ofrecer: la posibilidad de mostrar las fuentes al instante.
            </p>

            <div className="pull">
              "Cuando lees un argumento en pantalla y puedes verificar la fuente con un clic, la credibilidad del texto cambia completamente."
            </div>

            <p>
              En un libro, cuando el autor afirma algo, el lector tiene que creerle —o ir a buscar la fuente aparte, lo que casi nadie hace—. En un texto digital, el enlace está ahí. Esa transparencia hace que el argumento sea más fácil de evaluar. Además, el formato digital permite que cualquier persona pueda responder y entrar al debate sin necesidad de publicar un libro para hacerse escuchar.
            </p>
            <p>
              Sin embargo, también hay que reconocer lo que la narrativa tradicional hace bien. Un libro obliga a concentrarse: no hay notificaciones ni publicidad que distraigan. Esa profundidad es difícil de lograr en pantalla. Por eso, concluimos que el formato digital argumenta mejor en potencia, pero solo cuando el escritor —y el lector— ponen de su parte para no perderse en el ruido.
            </p>

            <div className="media-box">
              <div className="media-label">Video recomendado — ¿Qué es la narrativa transmedia?</div>
              <div className="video-wrap">
                <iframe
                  src="https://www.youtube.com/embed/4sbMQILUiAc"
                  title="Narrativa transmedia"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="media-box">
              <div className="media-label">Ventajas de cada formato</div>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-card-title">Narrativa digital</div>
                  <ul>
                    <li>Fuentes verificables al instante</li>
                    <li>Se actualiza en cualquier momento</li>
                    <li>Permite la participación del lector</li>
                    <li>Combina texto, imagen, audio y video</li>
                    <li>Llega a más personas sin barreras</li>
                  </ul>
                </div>
                <div className="info-card">
                  <div className="info-card-title">Narrativa tradicional</div>
                  <ul>
                    <li>Favorece la concentración profunda</li>
                    <li>Sin distracciones externas</li>
                    <li>Estructura clara y predecible</li>
                    <li>Mayor trayectoria histórica</li>
                    <li>No depende de conexión a internet</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              En conclusión, ambos formatos tienen su valor y no se excluyen entre sí. Si buscamos profundidad y análisis sin interrupciones, el papel es la mejor opción. Si queremos argumentar con transparencia, llegar a más personas y abrir el debate a otros, la pantalla lleva la delantera. Y en un mundo donde todo está conectado, saber usar bien los dos es la habilidad que realmente importa.
            </p>

          </article>

          <div className="refs">
            <div className="refs-title">Referencias</div>
            <p>Karbaum Padilla, G. (2021). Una historia audiovisual. En <em>La evolución de la narrativa audiovisual: analógica, transmedia y social media</em> (pp. 18-60). Universidad Peruana de Ciencias Aplicadas (UPC).</p>
            <p>Paredes Otero, G. (Coord.). (2022). <em>Narrativas y usuarios de la sociedad transmedia</em> (1.ª ed., pp. 239-262, 300-318, 731-743). Dykinson.</p>
          </div>

          <hr className="divider" />

          <section className="cmts">
            <div className="cmts-hd">
              <h2 className="cmts-title">¿Tú qué opinas?</h2>
              {!loading && <span className="cmts-n">{comments.length} {comments.length===1?"comentario":"comentarios"}</span>}
            </div>
            <div className="form-box">
              <label className="lbl">Tu nombre</label>
              <input className="inp" placeholder="¿Cómo te llamas?" value={name} onChange={e=>setName(e.target.value)} />
              <label className="lbl">Tu comentario</label>
              <textarea className="inp ta" placeholder="¿Estás de acuerdo? ¿Prefieres leer en papel o en pantalla?" value={text} onChange={e=>setText(e.target.value)} />
              {err && <p className="err">{err}</p>}
              <button className="btn" onClick={submit} disabled={sending||!name.trim()||!text.trim()}>
                {sending ? "Publicando…" : "Publicar comentario"}
              </button>
            </div>
            {loading
              ? <div className="loading-txt">Cargando comentarios…</div>
              : comments.length === 0
                ? <div className="empty">Sé el primero en dejar tu opinión.</div>
                : comments.map(c => (
                  <div key={c.id} className="cmt">
                    <div className="cmt-author">{c.name}</div>
                    <div className="cmt-date">{fmt(c.ts)}</div>
                    <div className="cmt-text">{c.text}</div>
                  </div>
                ))
            }
          </section>
        </div>

        <footer className="site-ft">
          <div className="wrap">Pantalla &amp; Papel · Escritura Digital · {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}