#!/usr/bin/env node
/* Compositor de páginas estáticas — sin dependencias.
 *
 * Cada archivo de src/pages/*.html empieza con un bloque de metadatos:
 *
 *   <!--meta
 *   {"out": "artistas/index.html", "title": "…", "description": "…"}
 *   meta-->
 *
 * y usa {{> header }} / {{> footer }} para insertar los parciales.
 * La salida respeta la estructura de URLs real del sitio (/artistas/,
 * /exhibiciones/bogota/…), de modo que los enlaces del prototipo son los
 * mismos que irán a producción en Expressia.
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PAGES = path.join(ROOT, "src", "pages");
const PARTIALS = path.join(ROOT, "src", "partials");

/* Salida para Backbone AI: cada página se emite además como .blade.php dentro de
 * production/views/, con los assets colgando de /assets/ (la única raíz que la
 * plataforma resuelve en el preview) y los enlaces internos apuntando a
 * /preview/{id} cuando ya existe el mapa preview-ids.json. */
const VIEWS = path.join(ROOT, "production", "views");
const PREVIEW_MAP = path.join(ROOT, "preview-ids.json");
const previews = fs.existsSync(PREVIEW_MAP)
  ? JSON.parse(fs.readFileSync(PREVIEW_MAP, "utf8"))
  : {};

const partial = (name) =>
  fs.readFileSync(path.join(PARTIALS, name + ".html"), "utf8");

const SHELL = (meta, body) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="https://galerialacometa.com${meta.url}">
<link rel="alternate" hreflang="es" href="https://galerialacometa.com${meta.url}">
<link rel="alternate" hreflang="en" href="https://galerialacometa.com/en${meta.url}">

<meta property="og:type" content="${meta.ogType || "website"}">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Galería La Cometa">
<meta property="og:url" content="https://galerialacometa.com${meta.url}">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:image" content="https://galerialacometa.com${meta.image || "/assets/img/exh-apocalypse.webp"}">
<meta property="og:image:alt" content="${meta.imageAlt || meta.title}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#fcfcfc">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/dist/styles.css">
<link rel="icon" href="/assets/LC-Logo.svg" type="image/svg+xml">
${meta.ld ? '<script type="application/ld+json">\n' + JSON.stringify(meta.ld, null, 2) + "\n</script>" : ""}
</head>
<body>

<a class="lc-skip" href="#contenido">Saltar al contenido</a>

${partial("header")}

${body}

${partial("footer")}

<script src="/js/data.js"></script>
<script src="/js/main.js"></script>
<script src="/js/components.js"></script>
</body>
</html>
`;

/* Blade compila @algo como directiva: el JSON-LD hay que escaparlo. */
function toBlade(html, meta) {
  return html
    .replace(/"@(context|type|id|graph)"/g, '"@@$1"')
    .replace(/\/dist\/styles\.css/g, "/assets/styles.css")
    .replace(/\/js\//g, "/assets/js/")
    .replace(/(href|action)="(\/[^"#?]*)"/g, function (m, attr, url) {
      var id = previews[url];
      return id ? attr + '="/preview/' + id + '"' : m;
    });
}

function build() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith(".html"));
  let count = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(PAGES, file), "utf8");
    const match = raw.match(/^<!--meta\s*([\s\S]*?)meta-->/);
    if (!match) {
      console.warn("· sin bloque meta, se omite:", file);
      continue;
    }

    const meta = JSON.parse(match[1]);
    let body = raw.slice(match[0].length).trim();
    body = body.replace(/\{\{>\s*(\w[\w-]*)\s*\}\}/g, (_, name) => partial(name));

    const out = path.join(ROOT, meta.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const html = SHELL(meta, body);
    fs.writeFileSync(out, html, "utf8");

    const view = path.join(VIEWS, meta.out.replace(/index\.html$/, "").replace(/\/$/, "") || "home");
    fs.mkdirSync(path.dirname(view + ".blade.php"), { recursive: true });
    fs.writeFileSync(view + ".blade.php", toBlade(html, meta), "utf8");
    count++;
    console.log("✓", meta.out);
  }

  console.log(count + " páginas compuestas.");
}

build();

if (process.argv.includes("--watch")) {
  console.log("· vigilando src/pages y src/partials…");
  var pending = null;
  [PAGES, PARTIALS].forEach(function (dir) {
    fs.watch(dir, function () {
      clearTimeout(pending);
      pending = setTimeout(function () {
        try { build(); } catch (err) { console.error("✗", err.message); }
      }, 80);
    });
  });
}
