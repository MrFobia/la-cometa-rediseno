/* Componentes de las páginas internas — Galería La Cometa.
 * Cada bloque se activa solo si su marcado existe en la página.
 * Sin dependencias; todo degrada a contenido legible si el JS no corre. */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =============================================================
   * 1. Navegación contextual con scroll-spy
   *    (ficha de artista y de exposición — referencia Pace Gallery)
   * ============================================================= */
  $$("[data-spy]").forEach(function (nav) {
    var links = $$("a[href^='#']", nav);
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    function mark(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.setAttribute("aria-current", on ? "true" : "false");
      });
    }

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
    mark(sections[0].id);
  });

  /* =============================================================
   * 2. Filmstrip — riel horizontal de obras / vistas de sala.
   *    Arrastre con el ratón, rueda horizontal, teclado y barra de avance.
   * ============================================================= */
  $$("[data-filmstrip]").forEach(function (root) {
    var rail = $("[data-rail]", root);
    var bar = $("[data-rail-progress]", root);
    var counter = $("[data-rail-counter]", root);
    var prev = $("[data-rail-prev]", root);
    var next = $("[data-rail-next]", root);
    if (!rail) return;

    var items = $$(":scope > *", rail);

    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var ratio = max > 0 ? rail.scrollLeft / max : 0;
      if (bar) bar.style.transform = "scaleX(" + Math.max(0.04, ratio) + ")";
      if (counter) {
        // La primera pieza visible manda, no la que queda en el centro.
        var left = rail.scrollLeft + 8;
        var idx = items.length - 1;
        for (var i = 0; i < items.length; i++) {
          if (items[i].offsetLeft + items[i].offsetWidth > left) { idx = i; break; }
        }
        counter.textContent = (idx + 1) + " / " + items.length;
      }
      if (prev) prev.disabled = rail.scrollLeft < 4;
      if (next) next.disabled = rail.scrollLeft > max - 4;
    }

    function step(dir) {
      var el = items[0];
      var amount = el ? el.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
      rail.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    rail.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight") { ev.preventDefault(); step(1); }
      if (ev.key === "ArrowLeft") { ev.preventDefault(); step(-1); }
    });

    // Arrastre con el ratón (en táctil ya funciona el scroll nativo).
    var down = false, startX = 0, startScroll = 0, moved = 0;
    rail.addEventListener("pointerdown", function (ev) {
      if (ev.pointerType === "touch") return;
      down = true; moved = 0;
      startX = ev.clientX; startScroll = rail.scrollLeft;
      rail.setPointerCapture(ev.pointerId);
      rail.classList.add("is-dragging");
    });
    rail.addEventListener("pointermove", function (ev) {
      if (!down) return;
      var dx = ev.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startScroll - dx;
    });
    ["pointerup", "pointercancel"].forEach(function (evt) {
      rail.addEventListener(evt, function () {
        down = false;
        rail.classList.remove("is-dragging");
      });
    });
    // Un arrastre largo no debe disparar el enlace de la tarjeta.
    rail.addEventListener("click", function (ev) {
      if (moved > 8) { ev.preventDefault(); ev.stopPropagation(); }
    }, true);

    update();
  });

  /* =============================================================
   * 3. Lupa — amplía el detalle de la obra siguiendo el cursor.
   *    En táctil y con teclado se ofrece un botón de acercar/alejar.
   * ============================================================= */
  $$("[data-lens]").forEach(function (frame) {
    var img = $("img", frame);
    var lens = $("[data-lens-glass]", frame);
    var toggle = $("[data-lens-toggle]", frame);
    if (!img || !lens) return;

    var zoom = 2.6;
    var pinned = false;

    function place(x, y) {
      var r = frame.getBoundingClientRect();
      var px = Math.min(Math.max(x - r.left, 0), r.width);
      var py = Math.min(Math.max(y - r.top, 0), r.height);
      lens.style.setProperty("--lens-x", px + "px");
      lens.style.setProperty("--lens-y", py + "px");
      lens.style.backgroundImage = "url(" + img.currentSrc + ")";
      lens.style.backgroundSize = r.width * zoom + "px " + r.height * zoom + "px";
      lens.style.backgroundPosition =
        -(px * zoom - 90) + "px " + -(py * zoom - 90) + "px";
    }

    frame.addEventListener("pointermove", function (ev) {
      if (ev.pointerType === "touch") return;
      frame.classList.add("is-lensing");
      place(ev.clientX, ev.clientY);
    });

    frame.addEventListener("pointerleave", function () {
      if (!pinned) frame.classList.remove("is-lensing");
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        pinned = !pinned;
        frame.classList.toggle("is-zoomed", pinned);
        toggle.setAttribute("aria-pressed", String(pinned));
        toggle.querySelector("[data-lens-label]").textContent = pinned ? "Alejar" : "Acercar";
      });
    }
  });

  /* =============================================================
   * 4. Escala humana — dibuja una figura de 170 cm junto a la obra
   *    para entender su tamaño real antes de consultar por ella.
   * ============================================================= */
  var HUMAN_CM = 170;

  $$("[data-scale]").forEach(function (root) {
    var w = parseFloat(root.getAttribute("data-w"));
    var h = parseFloat(root.getAttribute("data-h"));
    var stage = $("[data-scale-stage]", root);
    var readout = $("[data-scale-readout]", root);
    if (!w || !h || !stage) return;

    var work = $("[data-scale-work]", stage);
    var human = $("[data-scale-human]", stage);
    var HUMAN_W_CM = 45; // ancho de hombros aproximado de la silueta

    // Altura de colgada de museo: centro de la obra a 150 cm del piso.
    var HANG_CM = 150;

    function draw() {
      var available = stage.clientWidth || root.clientWidth || 800;
      var topCm = Math.max(HUMAN_CM, HANG_CM + h / 2);
      var totalWCm = w + HUMAN_W_CM + 60; // 60 cm de aire entre obra y persona
      // La escala la fija la dimensión que primero se queda sin espacio.
      var perCm = Math.min(380 / topCm, available / totalWCm);

      stage.style.height = topCm * perCm + "px";
      work.style.width = w * perCm + "px";
      work.style.height = h * perCm + "px";
      work.style.marginBottom = Math.max(0, HANG_CM - h / 2) * perCm + "px";
      human.style.width = HUMAN_W_CM * perCm + "px";
      human.style.height = HUMAN_CM * perCm + "px";

      var src = root.getAttribute("data-scale-src");
      if (src) {
        work.style.backgroundImage = "url(" + src + ")";
        work.style.backgroundSize = "cover";
        work.style.backgroundPosition = "center";
      }
    }

    if (readout) {
      readout.textContent =
        h >= HUMAN_CM
          ? "Esta obra es " + Math.round(h - HUMAN_CM) + " cm más alta que una persona de 1,70 m."
          : "Una persona de 1,70 m la supera en " + Math.round(HUMAN_CM - h) +
            " cm de alto. Colgada a la altura de museo, su centro queda a 150 cm del piso.";
    }

    // El botón puede vivir en la cabecera de la sección, fuera del escenario.
    var scope = root.closest("section") || document;
    var toggle = $("[data-scale-toggle]", scope);
    if (toggle) {
      toggle.addEventListener("click", function () {
        var on = root.classList.toggle("is-scaled");
        toggle.setAttribute("aria-pressed", String(on));
        var label = toggle.querySelector("[data-scale-label]");
        if (label) label.textContent = on ? "Ocultar la escala" : "Ver a escala humana";
        if (on) draw();
      });
    }

    window.addEventListener("resize", function () {
      if (root.classList.contains("is-scaled")) draw();
    });
  });

  /* =============================================================
   * 5. Muro a escala — cuelga el listado de obras respetando su
   *    tamaño real, como un montaje de salón. Alterna con la retícula.
   * ============================================================= */
  $$("[data-wall-switch]").forEach(function (group) {
    var target = document.getElementById(group.getAttribute("data-wall-switch"));
    if (!target) return;

    // Ancho de muro imaginario, en centímetros. En móvil el muro es más
    // corto para que las piezas pequeñas sigan siendo visibles.
    function wallCm() { return target.clientWidth < 640 ? 420 : 900; }

    function hang() {
      var perCm = target.clientWidth / wallCm();
      $$(":scope > li", target).forEach(function (li) {
        var w = parseFloat(li.getAttribute("data-w"));
        var h = parseFloat(li.getAttribute("data-h"));
        var fig = li.querySelector("figure");
        if (!w || !h || !fig) { li.hidden = true; return; }
        li.hidden = false;
        li.style.width = Math.max(26, w * perCm) + "px";
        fig.style.aspectRatio = "auto";
        fig.style.height = Math.max(20, h * perCm) + "px";
      });

      var note = document.querySelector("[data-wall-note]");
      if (note) {
        note.textContent =
          "Muro de referencia: " + (wallCm() / 100) + " m de ancho · escala aproximada 1:" +
          Math.round(1 / perCm * 10) / 10 + " cm por píxel.";
      }
    }

    function unhang() {
      $$(":scope > li", target).forEach(function (li) {
        li.hidden = false;
        li.style.removeProperty("width");
        var fig = li.querySelector("figure");
        if (fig) {
          fig.style.removeProperty("height");
          fig.style.aspectRatio = "4 / 5";
        }
      });
    }

    function apply(mode) {
      target.setAttribute("data-mode", mode);
      $$("[data-mode-btn]", group).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-mode-btn") === mode));
      });
      if (mode === "muro") hang(); else unhang();
      var note = document.querySelector("[data-wall-note]");
      if (note) note.hidden = mode !== "muro";
    }

    $$("[data-mode-btn]", group).forEach(function (btn) {
      btn.addEventListener("click", function () { apply(btn.getAttribute("data-mode-btn")); });
    });

    apply(target.getAttribute("data-mode") || "reticula");

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      if (target.getAttribute("data-mode") !== "muro") return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(hang, 120);
    });
  });

  /* =============================================================
   * 6. Filtros cruzados del catálogo (artista · técnica · década ·
   *    disponibilidad). Combinables, con conteo en vivo.
   * ============================================================= */
  $$("[data-filters]").forEach(function (panel) {
    var target = document.getElementById(panel.getAttribute("data-filters"));
    if (!target) return;
    var items = $$("li", target);
    var count = $("[data-filter-count]", panel);
    var clear = $("[data-filter-clear]", panel);
    var selects = $$("select", panel);

    function apply() {
      var active = {};
      selects.forEach(function (s) { if (s.value) active[s.name] = s.value; });

      var shown = 0;
      items.forEach(function (li) {
        var ok = Object.keys(active).every(function (k) {
          return (li.getAttribute("data-" + k) || "") === active[k];
        });
        li.hidden = !ok;
        if (ok) shown++;
      });

      if (count) {
        count.textContent = shown === items.length
          ? items.length + " obras"
          : shown + " de " + items.length + " obras";
      }
      if (clear) clear.hidden = Object.keys(active).length === 0;
      var empty = $("[data-filter-empty]", panel.parentNode) || $("[data-filter-empty]");
      if (empty) empty.hidden = shown !== 0;
    }

    selects.forEach(function (s) { s.addEventListener("change", apply); });
    if (clear) {
      clear.addEventListener("click", function () {
        selects.forEach(function (s) { s.value = ""; });
        apply();
      });
    }
    apply();
  });

  /* =============================================================
   * 7. Línea de tiempo por año — el archivo se recorre saltando
   *    de año en año, no con scroll infinito.
   * ============================================================= */
  $$("[data-timeline]").forEach(function (nav) {
    var target = document.getElementById(nav.getAttribute("data-timeline"));
    if (!target) return;
    var groups = $$("[data-year-group]", target);
    var buttons = $$("button[data-year]", nav);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var year = btn.getAttribute("data-year");
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        var shown = 0;
        groups.forEach(function (g) {
          var on = year === "todos" || g.getAttribute("data-year-group") === year;
          g.hidden = !on;
          if (on) shown++;
        });
        var note = $("[data-timeline-note]", nav.parentNode);
        if (note) note.textContent = year === "todos"
          ? "Mostrando todos los años."
          : "Mostrando " + year + ".";
      });
    });
  });

  /* =============================================================
   * 8. Hora local de cada sede — saber si la galería está abierta
   *    ahora mismo, sin hacer cuentas de husos horarios.
   * ============================================================= */
  var ZONES = {
    bogota: "America/Bogota",
    medellin: "America/Bogota",
    miami: "America/New_York",
    madrid: "Europe/Madrid",
    mexico: "America/Mexico_City"
  };

  function tick() {
    $$("[data-clock]").forEach(function (el) {
      var zone = ZONES[el.getAttribute("data-clock")];
      if (!zone) return;
      try {
        var now = new Date();
        el.querySelector("[data-clock-time]").textContent =
          new Intl.DateTimeFormat("es-CO", {
            hour: "2-digit", minute: "2-digit", hour12: false, timeZone: zone
          }).format(now);

        var parts = new Intl.DateTimeFormat("en-GB", {
          weekday: "short", hour: "2-digit", hour12: false, timeZone: zone
        }).formatToParts(now);
        var day = parts.find(function (p) { return p.type === "weekday"; }).value;
        var hour = parseInt(parts.find(function (p) { return p.type === "hour"; }).value, 10);

        var open = false;
        var schedule = el.getAttribute("data-hours"); // "L-V 10-18|S 11-16" o "cita"
        if (schedule && schedule !== "cita") {
          schedule.split("|").forEach(function (block) {
            var m = block.trim().match(/^([A-Za-z-]+)\s+(\d+)-(\d+)$/);
            if (!m) return;
            var days = m[1].toUpperCase();
            var isWeekday = ["MON", "TUE", "WED", "THU", "FRI"].indexOf(day.toUpperCase()) !== -1;
            var isSat = day.toUpperCase() === "SAT";
            var inBlock =
              (days === "L-V" && isWeekday) ||
              (days === "M-V" && isWeekday && day.toUpperCase() !== "MON") ||
              (days === "S" && isSat);
            if (inBlock && hour >= +m[2] && hour < +m[3]) open = true;
          });
        }

        var badge = el.querySelector("[data-clock-state]");
        if (badge) {
          if (!schedule) {
            // Sin horario cargado no se afirma si está abierta o cerrada.
            badge.textContent = "Horario por confirmar";
            badge.dataset.state = "pendiente";
          } else if (schedule === "cita") {
            badge.textContent = "Solo con cita previa";
            badge.dataset.state = "cita";
          } else {
            badge.textContent = open ? "Abierto ahora" : "Cerrado ahora";
            badge.dataset.state = open ? "abierto" : "cerrado";
          }
        }
      } catch (err) {
        /* Si el navegador no soporta la zona, se deja el horario impreso. */
      }
    });
  }

  if ($("[data-clock]")) {
    tick();
    window.setInterval(tick, 30000);
  }

  /* =============================================================
   * 9. Visor de sala — abre una vista de sala a pantalla completa,
   *    navegable con flechas. Reutiliza el diálogo del sistema.
   * ============================================================= */
  var viewer = $("[data-viewer]");
  if (viewer) {
    var vImg = $("[data-viewer-img]", viewer);
    var vCap = $("[data-viewer-caption]", viewer);
    var vCount = $("[data-viewer-count]", viewer);
    var sources = [];
    var current = 0;

    function show(i) {
      current = (i + sources.length) % sources.length;
      var item = sources[current];
      vImg.src = item.src;
      vImg.alt = item.alt;
      vCap.textContent = item.alt;
      vCount.textContent = (current + 1) + " / " + sources.length;
    }

    $$("[data-viewer-open]").forEach(function (trigger, i) {
      trigger.addEventListener("click", function (ev) {
        ev.preventDefault();
        sources = $$("[data-viewer-open]").map(function (t) {
          var im = t.querySelector("img");
          return { src: im.getAttribute("data-full") || im.src, alt: im.alt };
        });
        show(i);
        viewer.hidden = false;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { viewer.classList.add("is-open"); });
        });
        document.body.style.overflow = "hidden";
        $("[data-viewer-next]", viewer).focus();
      });
    });

    $("[data-viewer-next]", viewer).addEventListener("click", function () { show(current + 1); });
    $("[data-viewer-prev]", viewer).addEventListener("click", function () { show(current - 1); });
    $("[data-viewer-close]", viewer).addEventListener("click", close);

    function close() {
      viewer.classList.remove("is-open");
      document.body.style.overflow = "";
      window.setTimeout(function () { viewer.hidden = true; }, reduceMotion ? 0 : 260);
    }

    document.addEventListener("keydown", function (ev) {
      if (viewer.hidden) return;
      if (ev.key === "ArrowRight") show(current + 1);
      if (ev.key === "ArrowLeft") show(current - 1);
      if (ev.key === "Escape") close();
    });
  }
})();
