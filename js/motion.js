/* ===========================================================================
 * Movimiento — Galería La Cometa
 *
 * Una sola capa, sin dependencias, que instrumenta el DOM ya construido: no
 * hay que marcar nada en las páginas. Reglas de la casa:
 *   · El movimiento acompaña al scroll o confirma una acción. Nunca decora.
 *   · La obra no se deforma: el paralaje mueve el encuadre, no la pintura.
 *   · Con prefers-reduced-motion no se instala nada.
 * ======================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var raf = window.requestAnimationFrame.bind(window);

  /* --------------------------------------------------------------------
   * 1. Telón de entrada. Una sola vez por sesión y por página de entrada:
   *    volver atrás no vuelve a cerrar la puerta.
   * ------------------------------------------------------------------ */
  (function curtain() {
    try {
      if (sessionStorage.getItem("lc-entered")) return;
      sessionStorage.setItem("lc-entered", "1");
    } catch (e) { /* modo privado: se muestra y ya */ }

    var el = document.createElement("div");
    el.className = "lc-curtain";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<span class="lc-curtain__mark">___lacometa</span>';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1100);
  })();

  /* --------------------------------------------------------------------
   * 2. Barra de avance de lectura.
   * ------------------------------------------------------------------ */
  var bar = document.createElement("div");
  bar.className = "lc-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  /* --------------------------------------------------------------------
   * 3. Masthead que se retira al bajar y vuelve al subir.
   * ------------------------------------------------------------------ */
  var masthead = $(".lc-masthead");
  var lastY = window.scrollY;

  /* --------------------------------------------------------------------
   * 4. Títulos por línea. Se parte por palabras, se miden los saltos reales
   *    y cada línea sube desde detrás de su propio borde.
   * ------------------------------------------------------------------ */
  function splitLines(el) {
    if (el.dataset.lcSplit === "1") return;
    /* Si el título lleva marcado adentro (un enlace, una cursiva, un icono),
     * no se toca: partirlo por palabras lo destruiría. */
    if (el.querySelector("a, button, em, strong, img, svg, span")) return;
    var text = el.textContent.replace(/\s+/g, " ").trim();
    if (!text || text.length > 220) return;

    var words = text.split(" ");
    el.textContent = "";
    var probes = words.map(function (w, i) {
      var s = document.createElement("span");
      s.textContent = w + (i < words.length - 1 ? " " : "");
      s.style.display = "inline-block";
      el.appendChild(s);
      return s;
    });

    var lines = [];
    var top = null;
    probes.forEach(function (s) {
      var t = s.offsetTop;
      if (top === null || Math.abs(t - top) > 3) { lines.push([]); top = t; }
      lines[lines.length - 1].push(s.textContent);
    });

    el.textContent = "";
    el.classList.add("lc-lines");
    lines.forEach(function (words) {
      var line = document.createElement("span");
      line.className = "lc-lines__line";
      var inner = document.createElement("span");
      inner.className = "lc-lines__inner";
      inner.textContent = words.join("");
      line.appendChild(inner);
      el.appendChild(line);
    });
    el.dataset.lcSplit = "1";
  }

  /* Sólo los títulos de sección: los de tarjeta y los de lista quedan quietos,
   * porque ahí el movimiento se vuelve ruido. */
  var headings = $$("h1, .lc-section-head > div > h2, .lc-section-head > h2")
    .filter(function (h) { return !h.closest(".lc-card, .lc-hive, .lc-overlay, .lc-viewer"); });
  headings.forEach(splitLines);

  /* --------------------------------------------------------------------
   * 5. Revelado escalonado. Se marca lo que la página no marcó a mano.
   * ------------------------------------------------------------------ */
  var groups = $$([
    "[data-artist-grid] > *",
    ".lc-hive > li",
    ".lc-index__row",
    ".lc-strip__rail > *",
    ".lc-card",
    ".lc-datasheet > div",
    ".lc-round"
  ].join(","));

  groups.forEach(function (el, i) {
    if (el.closest(".lc-overlay, .lc-viewer")) return;
    el.classList.add("lc-reveal");
    var parent = el.parentElement;
    var index = parent ? Array.prototype.indexOf.call(parent.children, el) : i;
    el.style.setProperty("--lc-delay", Math.min(index, 7) * 55 + "ms");
  });

  $$("section > .lc-shell, .lc-band > .lc-shell, .lc-prose > p").forEach(function (el) {
    if (el.closest(".lc-overlay, .lc-viewer")) return;
    el.classList.add("lc-reveal");
  });

  /* --------------------------------------------------------------------
   * 6. La obra se descubre de abajo hacia arriba, y las figuras grandes
   *    llevan paralaje corto.
   * ------------------------------------------------------------------ */
  var figures = $$(".lc-figure").filter(function (f) {
    return !f.closest(".lc-overlay, .lc-viewer, .lc-lens") && f.querySelector("img");
  });

  var parallaxed = [];
  figures.forEach(function (f) {
    f.classList.add("lc-unveil");
    var img = f.querySelector("img");
    /* Sólo las figuras que ocupan pantalla: en una miniatura el paralaje no
     * se lee y sí cuesta cuadros. Y nunca sobre obra, que se recortaría. */
    if (f.classList.contains("lc-figure--obra")) return;
    if (f.getBoundingClientRect().height < 260) return;
    f.setAttribute("data-parallax", "");
    parallaxed.push({ el: f, img: img });
  });

  /* --------------------------------------------------------------------
   * 7. Un solo bucle de scroll para barra, masthead y paralaje.
   * ------------------------------------------------------------------ */
  var ticking = false;
  var vh = window.innerHeight;

  function frame() {
    ticking = false;
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - vh;

    bar.style.setProperty("--lc-progress", max > 0 ? (y / max).toFixed(4) : "0");

    if (masthead) {
      masthead.setAttribute("data-scrolled", y > 8 ? "1" : "0");
      var down = y > lastY && y > 220;
      var openMenu = document.body.hasAttribute("data-menu-open") ||
        $(".lc-overlay[data-open]");
      masthead.setAttribute("data-pinned", down && !openMenu ? "off" : "on");
    }
    lastY = y;

    for (var i = 0; i < parallaxed.length; i++) {
      var p = parallaxed[i];
      var r = p.el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      /* -1 arriba de pantalla, +1 abajo: el encuadre se mueve 6 % del alto */
      var center = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      var shift = Math.max(-1, Math.min(1, center)) * r.height * 0.06;
      p.el.style.setProperty("--lc-shift", shift.toFixed(1) + "px");
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    raf(frame);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    vh = window.innerHeight;
    headings.forEach(function (h) { h.dataset.lcSplit = ""; });
    onScroll();
  }, { passive: true });
  frame();

  /* --------------------------------------------------------------------
   * 8. Observador: revelados y títulos.
   * ------------------------------------------------------------------ */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });

  $$(".lc-reveal, .lc-unveil, .lc-lines").forEach(function (el) {
    var r = el.getBoundingClientRect();
    /* Lo que ya está en pantalla al cargar entra enseguida: nadie debería
     * tener que hacer scroll para ver el título de la página que abrió. */
    if (r.top < vh * 0.9) { el.classList.add("is-in"); return; }
    io.observe(el);
  });

  /* --------------------------------------------------------------------
   * 9. Punto de sala. Sólo con ratón fino; se agranda sobre lo que se puede
   *    tocar. No reemplaza el cursor del sistema.
   * ------------------------------------------------------------------ */
  if (window.matchMedia("(pointer: fine)").matches) {
    var dot = document.createElement("div");
    dot.className = "lc-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    var dx = 0, dy = 0, pending = false;
    document.addEventListener("mousemove", function (e) {
      dx = e.clientX; dy = e.clientY;
      if (pending) return;
      pending = true;
      raf(function () {
        pending = false;
        dot.style.setProperty("--lc-x", dx + "px");
        dot.style.setProperty("--lc-y", dy + "px");
        dot.classList.add("is-on");
      });
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var hot = e.target.closest("a, button, [role='button'], input, select, textarea");
      dot.classList.toggle("is-hot", !!hot);
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
      dot.classList.remove("is-on");
    });
  }

  /* --------------------------------------------------------------------
   * 10. Riel de sedes. Se duplica el contenido para que el bucle no salte.
   * ------------------------------------------------------------------ */
  var ticker = $("[data-ticker]");
  if (ticker) {
    var track = ticker.querySelector(".lc-ticker__track");
    if (track) track.innerHTML += track.innerHTML;
  }
})();
