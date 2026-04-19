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
body{background:var(--bg)}
.wrap{max-width:700px;margin:0 auto;padding:0 20px}
.site-hd{border-bottom:1px solid var(--faint);padding:16px 0;text-align:center;background:var(--bg)}
.site-name{font-family:var(--fd);font-size:12px;letter-spacing:.35em;text-transform:uppercase;color:var(--accent)}
.site-sub{font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;margin-top:3px}
.art-hd{padding:48px 0 36px;border-bottom:1px solid var(--faint)}
.art-cat{font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
.art-title{font-family:var(--fd);font-size:clamp(1.7rem,4vw,2.7rem);line-height:1.15;font-weight:700;margin-bottom:16px;color:var(--text)}
.art-lead{font-size:1.1rem;color:var(--muted);line-height:1.65;font-style:italic;margin-bottom:24px;font-family:var(--fb)}
.art-meta{display:flex;align-items:center;gap:12px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);flex-wrap:wrap}
.dot{color:var(--accent)}
.art-body{padding:40px 0;font-size:1.1rem;line-height:1.88;color:var(--text);font-family:var(--fb)}
.art-body p{margin-bottom:1.4em}
.art-body p:first-of-type::first-letter{font-family:var(--fd);font-size:4.2rem;font-weight:900;float:left;line-height:.75;margin:8px 10px -4px 0;color:var(--accent)}
.art-body h2{font-family:var(--fd);font-size:1.25rem;font-weight:700;margin:2.5em 0 .9em;padding-bottom:7px;border-bottom:1px solid var(--faint);color:var(--text)}
.pull{border-left:3px solid var(--accent);padding:4px 0 4px 20px;margin:2em 0;font-family:var(--fd);font-size:1.15rem;font-style:italic;color:var(--accent);line-height:1.55}
.refs{border-top:1px solid var(--faint);padding:24px 0 8px}
.refs-title{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
.refs p{font-size:.88rem;color:var(--muted);line-height:1.65;margin-bottom:7px;font-family:var(--fb)}
.divider{border:none;border-top:1px solid var(--faint)}
.cmts{padding:40px 0 56px}
.cmts-hd{display:flex;align-items:baseline;gap:10px;margin-bottom:28px}
.cmts-title{font-family:var(--fd);font-size:1.3rem;font-weight:700;color:var(--text)}
.cmts-n{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--accent)}
.form-box{background:var(--surface);border:1px solid var(--faint);padding:20px;margin-bottom:32px}
.lbl{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.inp{width:100%;background:var(--surface2);border:1px solid var(--faint);color:var(--text);font-family:var(--fb);font-size:1rem;padding:9px 12px;outline:none;transition:border-color .2s;margin-bottom:12px;border-radius:0}
.inp:focus{border-color:var(--accent2)}
.ta{resize:vertical;min-height:88px}
.btn{background:var(--accent);color:#0f0e0d;border:none;font-family:var(--fb);font-size:.85rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:10px 24px;cursor:pointer;transition:opacity .18s}
.btn:hover{opacity:.82}.btn:disabled{opacity:.35;cursor:not-allowed}
.cmt{padding:20px 0;border-bottom:1px solid var(--faint);animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.cmt-author{font-family:var(--fd);font-weight:700;font-size:.98rem;margin-bottom:2px;color:var(--text)}
.cmt-date{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:9px}
.cmt-text{font-size:1.02rem;line-height:1.72;color:#c8bfb0;font-family:var(--fb)}
.empty{color:var(--muted);font-style:italic;padding:14px 0;font-family:var(--fb)}
.loading-txt{color:var(--muted);font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 0}
.err{color:#e07070;font-size:.88rem;margin-bottom:10px;font-family:var(--fb)}
.site-ft{border-top:1px solid var(--faint);padding:18px 0;text-align:center;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
`;

function fmt(ts) {
  return new Date(ts).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
}

const API_URL = "/api/comments";

export default function App() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function submit() {
    if (!name.trim() || !text.trim() || sending) return;
    setSending(true);
    setErr("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), text: text.trim() }),
      });
      if (!res.ok) throw new Error();
      const c = await res.json();
      setComments((p) => [c, ...p]);
      setName("");
      setText("");
    } catch {
      setErr("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <style>{FONTS}{css}</style>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <header className="site-hd">
          <div className="wrap">
            <div className="site-name">Pantalla &amp; Papel</div>
            <div className="site-sub">Samuel Gomez Restrepo · Blog colaborativo · Narrativas digitales</div>
          </div>
        </header>

        <div className="wrap">
          <div className="art-hd">
            <div className="art-cat">Ensayo · Narrativas digitales</div>
            <h1 className="art-title">La pantalla gana, no por lo teconologico</h1>
            <p className="art-lead">
              Por qué la narrativa digital argumenta mejor que la tradicional
            </p>
            <div className="art-meta">
              <span>Samuel Gomez Restrepo</span><span className="dot">·</span>
              <span>Abril 2025</span><span className="dot">·</span>
              <span>7 min de lectura</span>
            </div>
          </div>

          <article className="art-body">
            <p>La narrativa no nació en los libros. Nació en las paredes de las cavernas, en los gestos rituales de los sacerdotes, en las esculturas que adornaban los templos. Lo que Karbaum (2021) describe como la historia audiovisual de la humanidad es, en esencia, la historia de un impulso irrefrenable: el de contar. Cada época encuentra su soporte, sus tecnologías, sus formatos. Hoy ese soporte es digital, y la pregunta ya no es si la pantalla reemplazó al papel, sino en qué condiciones el nuevo formato supera al anterior como herramienta de argumentación.</p>
            <p>Mi respuesta es directa: la narrativa digital argumenta mejor. Pero es necesario precisar, porque la afirmación puede malentenderse fácilmente. No porque tenga más recursos visuales, no porque una historia se expanda por diez plataformas distintas, y definitivamente no porque incluya animaciones, gifs o hashtags. La narrativa digital argumenta mejor cuando hace exactamente lo que el texto escrito siempre hizo —construir un razonamiento sólido, verificable y accesible— pero con herramientas que el papel, estructuralmente, jamás podrá replicar.</p>
            <div className="pull">"La superioridad de la narrativa digital no es automática. Es potencial. Se realiza cuando el escritor asume la disciplina del ensayista tradicional."</div>
            <h2>El espejismo transmedia</h2>
            <p>Los textos consultados ofrecen un caso ejemplar: Harry Potter. La saga de Rowling es presentada como el modelo de narrativa transmedia exitosa —libros, películas, Pottermore, fanfictions, cómics, videojuegos, merchandising—. Paredes Otero (2022) señala con razón que este ecosistema genera comunidades, identidades compartidas y una fidelidad sostenida durante más de veinte años. El universo fandom de la saga cumple su función con precisión industrial.</p>
            <p>Pero hay que ser claros sobre lo que eso es: una estrategia comercial disfrazada de narrativa. La expansión de Harry Potter por múltiples plataformas no profundiza el argumento original de Rowling sobre identidad, lealtad y coraje. Lo fragmenta, lo dosifica y lo convierte en producto de consumo periódico. El lector que navega por Pottermore no está construyendo un argumento más sólido sobre los temas de la obra; está consumiendo derivados de una historia que, en su versión impresa de cuatro mil páginas, ya estaba completa.</p>
            <p>La narrativa transmedia es poderosa para el entretenimiento, para la fidelización de audiencias y para la expansión comercial de una franquicia. No lo es para la argumentación seria. Confundir el alcance mediático de una saga con su potencia argumentativa es uno de los errores conceptuales más frecuentes en este debate.</p>
            <h2>¿Qué hace entonces superior a la narrativa digital?</h2>
            <p>Hay una aparente contradicción en mi postura: valoro la profundidad y el análisis sin distracciones —cualidades que intuitivamente asociamos con el libro físico, con la página en silencio, con la lectura sostenida—. Y sin embargo, sostengo que el formato digital argumenta mejor. La contradicción se resuelve cuando se distingue el soporte del uso que se hace de él.</p>
            <p>Un texto digital bien construido —con hipervínculos a sus fuentes, con la posibilidad de ser comentado, refutado y actualizado en tiempo real— es epistemológicamente más honesto que un libro impreso. Cuando un argumento en pantalla cita una fuente y el lector puede seguir esa cadena de evidencia en segundos, el razonamiento se vuelve transparente y auditable. El hipertexto no es adorno: es una forma de responsabilidad argumentativa. Además, la narrativa digital democratiza la participación en el debate, eliminando los filtros institucionales que durante siglos controlaron qué voces podían publicarse.</p>
            <h2>Lo que la pantalla aún le debe al papel</h2>
            <p>Sería intelectualmente deshonesto no admitirlo: el entorno digital también destruye narrativas. Las redes sociales fragmentan el discurso en unidades de atención mínima. El scroll compulsivo es el enemigo estructural de la profundidad. Los algoritmos premian el impacto emocional sobre el rigor, y la sobreabundancia de información crea una paradoja de acceso: más fuentes disponibles, menor capacidad de síntesis crítica. El libro físico, en cambio, impone por diseño una lectura lineal y sostenida que el lector digital tiene que construir activamente.</p>
            <h2>Conclusión</h2>
            <p>La pantalla gana el debate argumentativo, pero no por el espectáculo. Gana por la transparencia que ofrecen los hipervínculos, por la accesibilidad que elimina barreras de distribución, y por la posibilidad de construir conocimiento colectivo en tiempo real —como lo demuestra, en pequeña escala, la sección de comentarios de este mismo blog—. El papel tiene nobleza y ofrece condiciones óptimas para la concentración. Pero es, estructuralmente, un monólogo. La pantalla, cuando se usa con rigor y sin dejarse seducir por el espectáculo transmedia, es un diálogo.</p>
          </article>

          <div className="refs">
            <div className="refs-title">Referencias</div>
            <p>Karbaum Padilla, G. (2021). Una historia audiovisual. En <em>La evolución de la narrativa audiovisual: analógica, transmedia y social media</em> (pp. 18-60). Universidad Peruana de Ciencias Aplicadas (UPC).</p>
            <p>Paredes Otero, G. (Coord.). (2022). <em>Narrativas y usuarios de la sociedad transmedia</em> (1.ª ed., pp. 239-262, 300-318, 731-743). Dykinson.</p>
          </div>

          <hr className="divider" />

          <section className="cmts">
            <div className="cmts-hd">
              <h2 className="cmts-title">Conversación</h2>
              {!loading && <span className="cmts-n">{comments.length} {comments.length === 1 ? "comentario" : "comentarios"}</span>}
            </div>
            <div className="form-box">
              <label className="lbl">Tu nombre</label>
              <input className="inp" placeholder="¿Quién eres?" value={name} onChange={(e) => setName(e.target.value)} />
              <label className="lbl">Tu comentario</label>
              <textarea className="inp ta" placeholder="¿Estás de acuerdo? ¿Qué agregarías o rebatirías?" value={text} onChange={(e) => setText(e.target.value)} />
              {err && <p className="err">{err}</p>}
              <button className="btn" onClick={submit} disabled={sending || !name.trim() || !text.trim()}>
                {sending ? "Publicando…" : "Publicar comentario"}
              </button>
            </div>
            {loading ? (
              <div className="loading-txt">Cargando comentarios…</div>
            ) : comments.length === 0 ? (
              <div className="empty">Sé el primero en comentar este ensayo.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="cmt">
                  <div className="cmt-author">{c.name}</div>
                  <div className="cmt-date">{fmt(c.ts)}</div>
                  <div className="cmt-text">{c.text}</div>
                </div>
              ))
            )}
          </section>
        </div>

        <footer className="site-ft">
          <div className="wrap">Samuel Gomez Restrepo · Pantalla &amp; Papel · {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}
