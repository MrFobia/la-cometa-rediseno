<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>La galería y sus sedes — Galería La Cometa</title>
<meta name="description" content="Fundada en 1986 por Esteban Jaramillo. Sedes de La Cometa en Bogotá, Medellín, Miami, Madrid y Ciudad de México, con dirección, horario y la hora local de cada una.">
<link rel="canonical" href="https://galerialacometa.com/la-galeria/">
<link rel="alternate" hreflang="es" href="https://galerialacometa.com/la-galeria/">
<link rel="alternate" hreflang="en" href="https://galerialacometa.com/en/la-galeria/">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Galería La Cometa">
<meta property="og:url" content="https://galerialacometa.com/la-galeria/">
<meta property="og:title" content="La galería y sus sedes — Galería La Cometa">
<meta property="og:description" content="Fundada en 1986 por Esteban Jaramillo. Sedes de La Cometa en Bogotá, Medellín, Miami, Madrid y Ciudad de México, con dirección, horario y la hora local de cada una.">
<meta property="og:image" content="https://galerialacometa.com/assets/img/home-hero.webp">
<meta property="og:image:alt" content="Sala de Galería La Cometa">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#fcfcfc">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<link rel="icon" href="/assets/LC-Logo.svg" type="image/svg+xml">
<script type="application/ld+json">
{
  "@@context": "https://schema.org",
  "@@type": "AboutPage",
  "url": "https://galerialacometa.com/la-galeria/",
  "mainEntity": {
    "@@id": "https://galerialacometa.com/#organizacion"
  }
}
</script>
</head>
<body>

<a class="lc-skip" href="#contenido">Saltar al contenido</a>

<!-- ================= MASTHEAD (N6) ================= -->
<header class="lc-masthead">
  <div class="lc-shell lc-masthead__row">
    <a href="/" aria-label="Galería La Cometa — inicio" class="flex items-center gap-3 shrink-0">
      <img src="/assets/LC-Logo.svg" alt="" width="112" height="50" class="h-8 w-auto sm:h-9" aria-hidden="true">
      <span class="sr-only">Galería La Cometa</span>
    </a>

    <nav class="lc-masthead__nav" aria-label="Principal">
      <a class="lc-navlink" href="/exhibiciones/">Exposiciones</a>
      <a class="lc-navlink" href="/artistas/">Artistas</a>
      <a class="lc-navlink" href="/obras/">Obras</a>
      <a class="lc-navlink" href="/ferias/">Ferias</a>
      <a class="lc-navlink" href="/noticias/">Noticias</a>
      <a class="lc-navlink" href="/la-galeria/">La galería</a>
    </nav>

    <div class="flex items-center gap-1 sm:gap-3 shrink-0">
      <button type="button" class="lc-iconbtn" data-open-menu data-open-search aria-label="Buscar en el sitio">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" stroke-width="1.4"/>
          <path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <span class="hidden sm:inline">Buscar</span>
      </button>

      <a class="lc-iconbtn" href="/en/" hreflang="en" lang="en">EN</a>

      <button type="button" class="lc-iconbtn" data-open-menu aria-expanded="false" aria-controls="menu-general">
        <span>Menú</span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" focusable="false">
          <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" stroke-width="1.4"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<!-- ================= OVERLAY: MENÚ + BUSCADOR GLOBAL ================= -->
<div class="lc-overlay" id="menu-general" role="dialog" aria-modal="true" aria-label="Menú y buscador" hidden>
  <div class="lc-shell lc-masthead__row">
    <span class="lc-caps">Galería La Cometa</span>
    <button type="button" class="lc-iconbtn" data-close-menu>
      <span>Cerrar</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.4"/>
      </svg>
    </button>
  </div>

  <div class="lc-overlay__body">
    <div class="lc-shell pb-16">
      <!-- Buscador global (referencia Victoria Miro: resultados dentro del propio menú) -->
      <form class="pt-6" role="search" data-search-form autocomplete="off">
        <label for="q" class="lc-caps block mb-2">Buscar artista, obra, exposición o noticia</label>
        <input id="q" name="q" type="search" class="lc-searchfield" placeholder="Escribe un nombre…" data-search-input>
      </form>

      <p class="lc-meta mt-3" data-search-status role="status" aria-live="polite"></p>

      <ul class="mt-4" data-search-results hidden></ul>

      <div class="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] mt-12" data-menu-panels>
        <nav aria-label="Secciones del sitio">
          <ul class="space-y-1">
            <li><a class="lc-megalink" href="/exhibiciones/">Exposiciones</a></li>
            <li><a class="lc-megalink" href="/artistas/">Artistas</a></li>
            <li><a class="lc-megalink" href="/obras/">Obras</a></li>
            <li><a class="lc-megalink" href="/ferias/">Ferias</a></li>
            <li><a class="lc-megalink" href="/noticias/">Noticias</a></li>
            <li><a class="lc-megalink" href="/la-galeria/">La galería</a></li>
            <li><a class="lc-megalink" href="/contacto/">Contacto</a></li>
          </ul>
        </nav>

        <div class="space-y-8">
          <div>
            <h2 class="lc-caps mb-3">Sedes</h2>
            <ul class="space-y-1 text-lg">
              <li><a class="lc-link" href="/la-galeria/bogota">Bogotá</a></li>
              <li><a class="lc-link" href="/la-galeria/medellin">Medellín</a></li>
              <li><a class="lc-link" href="/la-galeria/miami">Miami</a></li>
              <li><a class="lc-link" href="/la-galeria/madrid">Madrid</a></li>
              <li><a class="lc-link" href="/la-galeria/mexico">Ciudad de México</a></li>
            </ul>
          </div>
          <div>
            <h2 class="lc-caps mb-3">Idioma</h2>
            <p class="lc-meta"><a class="lc-link" href="/" aria-current="page">Español</a> · <a class="lc-link" href="/en/" hreflang="en" lang="en">English</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<main id="contenido">
  <section class="lc-shell pt-8 pb-6 md:pt-12">
    <nav class="lc-crumbs" aria-label="Ruta">
      <ol>
        <li><a href="/">Inicio</a></li>
        <li aria-current="page">La galería</li>
      </ol>
    </nav>

    <h1 class="text-[length:var(--text-display-s)] mt-6 max-w-[16ch]">La galería</h1>
    <div class="lc-prose mt-6">
      <p>
        Fundada en 1986 por el galerista colombiano Esteban Jaramillo, La Cometa se ha
        consolidado como una de las plataformas artísticas más influyentes en América Latina.
        Desde sus comienzos, la galería se ha comprometido a enriquecer y fortalecer la escena
        artística global, enfocándose en la representación, promoción y exhibición de artistas
        latinoamericanos.
      </p>
    </div>
  </section>

  <!-- ---------- Sedes con hora local ---------- -->
  <section class="lc-shell lc-band" aria-labelledby="h-sedes">
    <div class="lc-section-head">
      <div>
        <h2 id="h-sedes" class="text-[length:var(--text-3xl)]">Cinco sedes, cinco relojes</h2>
        <p class="lc-meta mt-2 lc-measure">
          La hora de cada sede se calcula en tu navegador contra el horario publicado.
          Antes de escribir, sabes si hay alguien del otro lado.
        </p>
      </div>
    </div>

    <ul class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lc-grid-min-0">
      <li data-clock="bogota" data-hours="L-V 10-18|S 11-16">
        <p class="lc-clock__state" data-clock-state>Consultando…</p>
        <h3 class="lc-card__title mt-2 text-[length:var(--text-2xl)]">Bogotá</h3>
        <p class="lc-clock__time mt-1" data-clock-time>—:—</p>
        <dl class="lc-datasheet mt-4">
          <div><dt>Dirección</dt><dd>Carrera 10 No. 94 A - 25</dd></div>
          <div><dt>Horario</dt><dd>L a V 10:00 — 18:00 · S 11:00 — 16:00</dd></div>
          <div><dt>Correo</dt><dd><a class="lc-link" href="mailto:info@galerialacometa.com">info@galerialacometa.com</a></dd></div>
        </dl>
        <a class="lc-link mt-4" href="/la-galeria/bogota/">Ver la sede <span class="lc-arrow" aria-hidden="true">→</span></a>
      </li>

      <li data-clock="miami" data-hours="L-V 10-18|S 11-16">
        <p class="lc-clock__state" data-clock-state>Consultando…</p>
        <h3 class="lc-card__title mt-2 text-[length:var(--text-2xl)]">Miami</h3>
        <p class="lc-clock__time mt-1" data-clock-time>—:—</p>
        <dl class="lc-datasheet mt-4">
          <div><dt>Dirección</dt><dd>1015 NW 23rd St, unit 3, Miami, FL 33127</dd></div>
          <div><dt>Horario</dt><dd>L a V 10:00 — 18:00 · S 11:00 — 16:00</dd></div>
          <div><dt>Teléfono</dt><dd><a class="lc-link" href="tel:+17542776298">+1 754 277 6298</a></dd></div>
          <div><dt>Correo</dt><dd><a class="lc-link" href="mailto:acordoba@galerialacometa.com">acordoba@galerialacometa.com</a></dd></div>
        </dl>
        <a class="lc-link mt-4" href="/la-galeria/miami/">Ver la sede <span class="lc-arrow" aria-hidden="true">→</span></a>
      </li>

      <li data-clock="madrid" data-hours="M-V 11-19|S 11-14">
        <p class="lc-clock__state" data-clock-state>Consultando…</p>
        <h3 class="lc-card__title mt-2 text-[length:var(--text-2xl)]">Madrid</h3>
        <p class="lc-clock__time mt-1" data-clock-time>—:—</p>
        <dl class="lc-datasheet mt-4">
          <div><dt>Dirección</dt><dd>Calle San Lorenzo 11</dd></div>
          <div><dt>Horario</dt><dd>M a V 11:00 — 19:00 · S 11:00 — 14:00</dd></div>
          <div><dt>Teléfono</dt><dd><a class="lc-link" href="tel:+34913197452">+34 91 319 74 52</a></dd></div>
          <div><dt>Correo</dt><dd><a class="lc-link" href="mailto:palomajaramillo@galerialacometa.com">palomajaramillo@galerialacometa.com</a></dd></div>
        </dl>
        <a class="lc-link mt-4" href="/la-galeria/madrid/">Ver la sede <span class="lc-arrow" aria-hidden="true">→</span></a>
      </li>

      <li data-clock="mexico" data-hours="cita">
        <p class="lc-clock__state" data-clock-state>Consultando…</p>
        <h3 class="lc-card__title mt-2 text-[length:var(--text-2xl)]">Ciudad de México</h3>
        <p class="lc-clock__time mt-1" data-clock-time>—:—</p>
        <dl class="lc-datasheet mt-4">
          <div><dt>Tipo</dt><dd>Oficina de proyectos</dd></div>
          <div><dt>Horario</dt><dd>Solo con cita previa</dd></div>
          <div><dt>Teléfono</dt><dd><a class="lc-link" href="tel:+525549285380">+52 554 928 5380</a></dd></div>
          <div><dt>Correo</dt><dd><a class="lc-link" href="mailto:info@galerialacometa.com">info@galerialacometa.com</a></dd></div>
        </dl>
        <a class="lc-link mt-4" href="/la-galeria/mexico/">Ver la sede <span class="lc-arrow" aria-hidden="true">→</span></a>
      </li>

      <li data-clock="medellin">
        <p class="lc-clock__state" data-clock-state>Consultando…</p>
        <h3 class="lc-card__title mt-2 text-[length:var(--text-2xl)]">Medellín</h3>
        <p class="lc-clock__time mt-1" data-clock-time>—:—</p>
        <dl class="lc-datasheet mt-4">
          <div><dt>Dirección</dt><dd><span class="lc-pending">Dato pendiente</span></dd></div>
          <div><dt>Horario</dt><dd><span class="lc-pending">Dato pendiente</span></dd></div>
        </dl>
        <p class="lc-meta mt-4">
          Medellín tiene exposiciones publicadas en 2026 pero no tiene página de sede.
          Es una de las inconsistencias que la Fase 0 debe resolver.
        </p>
      </li>
    </ul>
  </section>

  <!-- ---------- Relatos de cada sede ---------- -->
  <section class="lc-band lc-band--quiet" aria-labelledby="h-historia">
    <div class="lc-shell">
      <div class="lc-section-head">
        <h2 id="h-historia" class="text-[length:var(--text-3xl)]">Cómo llegó a cada ciudad</h2>
      </div>

      <div class="grid gap-10 md:grid-cols-3 lc-grid-min-0">
        <article>
          <h3 class="lc-caps mb-3">Madrid · febrero de 2019</h3>
          <p class="lc-prose">
            Abrió con una muestra de cinco artistas contemporáneos colombianos. El calendario
            fue mutando hasta incluir a artistas españoles como Juan Baraja y Paloma Gámez,
            que evidencian el intercambio entre los dos continentes.
          </p>
        </article>
        <article>
          <h3 class="lc-caps mb-3">Miami · 30 de noviembre de 2023</h3>
          <p class="lc-prose">
            Un espacio donde la contemporaneidad y la modernidad dialogan para construir un
            puente entre períodos artísticos, al servicio de la comunidad artística de Miami
            y de la reflexión entre el Norte y el Sur.
          </p>
        </article>
        <article>
          <h3 class="lc-caps mb-3">Ciudad de México · 2026</h3>
          <p class="lc-prose">
            Una oficina de proyectos, después de más de una década de vínculos construidos en
            Zona Maco, visitas y conversaciones. Arranca con una colaboración junto a Marek
            Wolfryd y Anuar Maauad.
          </p>
        </article>
      </div>
    </div>
  </section>
</main>

<!-- ================= FOOTER (Ft5 · declaración) ================= -->
<footer class="lc-shell lc-band">
  <p class="text-[length:var(--text-display-s)] max-w-[14ch] leading-[0.95]">La Cometa</p>
  <p class="lc-measure lc-meta mt-5">
    Arte contemporáneo de Colombia y América Latina. Bogotá · Medellín · Miami · Madrid · Ciudad de México.
  </p>

  <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12 lc-grid-min-0">
    <div>
      <h2 class="lc-caps mb-3">Navegar</h2>
      <ul class="space-y-1 lc-meta">
        <li><a class="lc-link" href="/exhibiciones/">Exposiciones</a></li>
        <li><a class="lc-link" href="/artistas/">Artistas</a></li>
        <li><a class="lc-link" href="/obras/">Obras</a></li>
        <li><a class="lc-link" href="/ferias/">Ferias</a></li>
        <li><a class="lc-link" href="/noticias/">Noticias</a></li>
      </ul>
    </div>
    <div>
      <h2 class="lc-caps mb-3">Contacto</h2>
      <ul class="space-y-1 lc-meta">
        <li><a class="lc-link" href="mailto:info@galerialacometa.com">info@galerialacometa.com</a></li>
        <li><a class="lc-link" href="/contacto/">Formulario de contacto</a></li>
        <li><a class="lc-link" href="/la-galeria/">Sedes y horarios</a></li>
      </ul>
      <p class="lc-meta mt-3">Correo oficial único para todo el sitio y los directorios externos.</p>
    </div>
    <div>
      <h2 class="lc-caps mb-3">Seguir</h2>
      <ul class="space-y-1 lc-meta">
        <li><a class="lc-link" href="https://www.instagram.com/galerialacometa/" rel="noopener">Instagram</a></li>
        <li><a class="lc-link" href="https://open.spotify.com/show/0y4tb4f2PNViVJSCviehgJ" rel="noopener">Spotify</a></li>
        <li><a class="lc-link" href="https://www.linkedin.com/company/103151627/" rel="noopener">LinkedIn</a></li>
      </ul>
    </div>
    <div>
      <h2 class="lc-caps mb-3">Referencias</h2>
      <ul class="space-y-1 lc-meta">
        <li><a class="lc-link" href="https://es.wikipedia.org/wiki/Galer%C3%ADa_La_Cometa" rel="noopener">Wikipedia</a></li>
        <li><a class="lc-link" href="https://artbo.co/" rel="noopener">ARTBO</a></li>
        <li><a class="lc-link" href="https://agac.com.co/" rel="noopener">AGAC</a></li>
      </ul>
    </div>
  </div>

  <div class="mt-12 pt-6 border-t border-[color:var(--color-rule)] flex flex-wrap items-center justify-between gap-4 lc-meta">
    <p>© <span data-year>2026</span> Galería La Cometa. Todos los derechos reservados.</p>
    <p><a class="lc-link" href="/utilidades/terminos-y-condiciones/">Términos y política de datos</a></p>
  </div>
</footer>

<!-- Panel de consulta por obra -->
<div class="lc-overlay" id="consulta" role="dialog" aria-modal="true" aria-labelledby="h-consulta" hidden>
  <div class="lc-shell lc-masthead__row">
    <span class="lc-caps">Consulta</span>
    <button type="button" class="lc-iconbtn" data-close-inquire>
      <span>Cerrar</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.4"/>
      </svg>
    </button>
  </div>
  <div class="lc-overlay__body">
    <div class="lc-shell pb-16 max-w-3xl">
      <h2 id="h-consulta" class="text-[length:var(--text-3xl)] mt-6">Consultar por una obra</h2>
      <p class="lc-meta mt-2" data-inquire-subject></p>
      <form class="grid gap-5 mt-8" data-inquire-form novalidate>
        <div>
          <label class="lc-caps block mb-1" for="in-nombre">Nombre</label>
          <input class="lc-field" id="in-nombre" name="nombre" required autocomplete="name">
        </div>
        <div>
          <label class="lc-caps block mb-1" for="in-email">Correo electrónico</label>
          <input class="lc-field" id="in-email" name="email" type="email" required autocomplete="email">
        </div>
        <div>
          <label class="lc-caps block mb-1" for="in-mensaje">Mensaje</label>
          <textarea class="lc-field" id="in-mensaje" name="mensaje" rows="3"></textarea>
        </div>
        <div class="flex items-center gap-4 flex-wrap">
          <button class="lc-btn" type="submit" data-inquire-submit>Enviar consulta</button>
          <p class="lc-formnote" data-inquire-note role="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
  </div>
</div>


<script src="/assets/js/data.js"></script>
<script src="/assets/js/main.js"></script>
<script src="/assets/js/components.js"></script>
</body>
</html>
