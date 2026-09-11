/* Galería La Cometa — comportamiento del home.
 * Vanilla JS, sin dependencias. Cada bloque es independiente:
 * si uno falla, el resto de la página sigue funcionando. */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
   * Año del copyright — el sitio actual quedó congelado en 2024.
   * ------------------------------------------------------------- */
  /* Sólo el sello del pie. Antes esto era [data-year], el mismo atributo que
   * usan los botones del filtro por año de ferias, exposiciones y noticias:
   * los reescribía todos con el año actual y el historial mostraba «2026 2026
   * 2026 2026». */
  $$("[data-year-stamp]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------------------------------------------------------------
   * Marca la sección activa en el menú principal.
   * ------------------------------------------------------------- */
  (function () {
    var here = location.pathname;
    $$(".lc-navlink, .lc-megalink").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.length > 1 && here.indexOf(href) === 0) a.setAttribute("aria-current", "page");
    });
  })();

  /* ---------------------------------------------------------------
   * Diálogos a pantalla completa (menú + consulta por obra).
   * Gestionan foco, Escape y bloqueo del scroll de fondo.
   * ------------------------------------------------------------- */
  var scrollLock = 0;

  function focusables(root) {
    return $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', root)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  function openDialog(el, focusSel) {
    if (!el) return;
    el.hidden = false;
    el.__opener = document.activeElement;
    // dos frames para que la transición arranque desde el estado cerrado
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add("is-open"); });
    });
    scrollLock++;
    document.body.style.overflow = "hidden";
    var target = focusSel ? $(focusSel, el) : null;
    (target || focusables(el)[0] || el).focus({ preventScroll: true });
  }

  function closeDialog(el) {
    if (!el || el.hidden) return;
    el.classList.remove("is-open");
    scrollLock = Math.max(0, scrollLock - 1);
    if (scrollLock === 0) document.body.style.overflow = "";
    var done = function () { el.hidden = true; };
    if (reduceMotion) done();
    else window.setTimeout(done, 260);
    if (el.__opener && el.__opener.focus) el.__opener.focus({ preventScroll: true });
  }

  document.addEventListener("keydown", function (ev) {
    var open = $(".lc-overlay.is-open");
    if (!open) return;
    if (ev.key === "Escape") { ev.preventDefault(); closeDialog(open); return; }
    if (ev.key !== "Tab") return;
    var items = focusables(open);
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });

  /* ---------------------------------------------------------------
   * Menú general + buscador global (referencia Victoria Miro:
   * los resultados se navegan dentro del propio menú).
   * ------------------------------------------------------------- */
  var menu = $("#menu-general");
  var searchInput = $("[data-search-input]");
  var results = $("[data-search-results]");
  var status = $("[data-search-status]");
  var panels = $("[data-menu-panels]");

  $$("[data-open-menu]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.setAttribute("aria-expanded", "true");
      openDialog(menu, btn.hasAttribute("data-open-search") ? "[data-search-input]" : null);
    });
  });

  $$("[data-close-menu]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$('[data-open-menu][aria-expanded]').forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      closeDialog(menu);
    });
  });

  // Atajo: “/” abre el buscador si no se está escribiendo en un campo.
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "/" || ev.metaKey || ev.ctrlKey) return;
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    ev.preventDefault();
    openDialog(menu, "[data-search-input]");
  });

  function normalize(str) {
    return String(str).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function renderResults(query) {
    var index = window.LC_INDEX || [];
    var q = normalize(query).trim();

    if (q.length < 2) {
      results.hidden = true;
      results.innerHTML = "";
      status.textContent = "";
      if (panels) panels.hidden = false;
      return;
    }

    var hits = index.filter(function (item) {
      return normalize(item.t + " " + item.k + " " + (item.x || "")).indexOf(q) !== -1;
    }).slice(0, 12);

    if (panels) panels.hidden = true;
    results.hidden = false;
    status.textContent = hits.length
      ? hits.length + (hits.length === 1 ? " resultado" : " resultados")
      : "Sin resultados para «" + query.trim() + "». Prueba con el nombre de un artista o de una sede.";

    results.innerHTML = hits.map(function (item) {
      return '<li><a class="lc-result" href="' + item.u + '">' +
        '<span class="lc-card__title">' + item.t + "</span>" +
        '<span class="lc-meta">' + item.k + "</span></a></li>";
    }).join("");
  }

  if (searchInput) {
    var timer = null;
    searchInput.addEventListener("input", function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { renderResults(searchInput.value); }, 120);
    });
  }

  var searchForm = $("[data-search-form]");
  if (searchForm) {
    searchForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = $(".lc-result", results);
      if (first) first.click();
    });
  }

  /* ---------------------------------------------------------------
   * Tabs de exposiciones (patrón ARIA con flechas).
   * ------------------------------------------------------------- */
  var tabs = $$('[role="tab"]');

  function selectTab(tab, moveFocus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (moveFocus) tab.focus({ preventScroll: true });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab, false); });
    tab.addEventListener("keydown", function (ev) {
      var dir = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      ev.preventDefault();
      selectTab(tabs[(i + dir + tabs.length) % tabs.length], true);
    });
  });

  /* ---------------------------------------------------------------
   * Artistas: filtro alfabético + vista mosaico/lista.
   * Reemplaza el scroll infinito por control explícito.
   * ------------------------------------------------------------- */
  var grid = $("[data-artist-grid]");
  var alpha = $("[data-alpha]");
  var emptyNote = $("[data-artist-empty]");

  if (grid && alpha) {
    var cards = $$("li", grid);
    var present = {};
    cards.forEach(function (c) { present[c.getAttribute("data-letter")] = true; });

    var letters = ["Todos"].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    alpha.innerHTML = letters.map(function (l) {
      var isAll = l === "Todos";
      var enabled = isAll || present[l];
      return '<button type="button" data-letter="' + l + '"' +
        (enabled ? "" : " disabled") +
        ' aria-pressed="' + (isAll ? "true" : "false") + '"' +
        (enabled ? "" : ' title="Sin artistas en esta página del listado"') +
        ">" + l + "</button>";
    }).join("");

    alpha.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button[data-letter]");
      if (!btn || btn.disabled) return;
      var letter = btn.getAttribute("data-letter");
      $$("button", alpha).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      var shown = 0;
      cards.forEach(function (c) {
        var on = letter === "Todos" || c.getAttribute("data-letter") === letter;
        c.hidden = !on;
        if (on) shown++;
      });
      if (emptyNote) emptyNote.hidden = shown !== 0;
    });

    // Vista mosaico/panal ↔ lista. El modo vive como atributo en la retícula
    // y el CSS hace el resto, así funciona igual en el home y en /artistas/.
    $$("[data-view]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-view");
        $$("[data-view]").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        grid.setAttribute("data-view", mode);
      });
    });
  }

  /* ---------------------------------------------------------------
   * Consultar por esta obra (referencia David Zwirner).
   * ------------------------------------------------------------- */
  var inquire = $("#consulta");
  var subject = $("[data-inquire-subject]");

  $$("[data-inquire]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (subject) subject.textContent = btn.getAttribute("data-inquire");
      openDialog(inquire, "#in-nombre");
    });
  });

  $$("[data-close-inquire]").forEach(function (btn) {
    btn.addEventListener("click", function () { closeDialog(inquire); });
  });

  /* ---------------------------------------------------------------
   * Formularios: validación en el envío + estados de carga/error/éxito.
   * Sin backend todavía; el envío queda simulado y marcado como tal.
   * ------------------------------------------------------------- */
  function wireForm(form, submitBtn, note, successText) {
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var invalid = null;
      $$("input, select, textarea", form).forEach(function (field) {
        if (!field.required) return;
        var ok = field.type === "checkbox" ? field.checked : field.checkValidity();
        field.setAttribute("aria-invalid", String(!ok));
        if (!ok && !invalid) invalid = field;
      });

      if (invalid) {
        note.dataset.state = "error";
        note.textContent = "Revisa los campos marcados antes de enviar.";
        invalid.focus();
        return;
      }

      submitBtn.disabled = true;
      note.dataset.state = "";
      note.textContent = "Enviando…";

      window.setTimeout(function () {
        submitBtn.disabled = false;
        note.dataset.state = "success";
        note.textContent = successText;
        form.reset();
      }, 700);
    });
  }

  wireForm($("[data-newsletter]"), $("[data-nl-submit]"), $("[data-nl-note]"),
    "Listo. Te escribiremos con las próximas aperturas.");
  wireForm($("[data-inquire-form]"), $("[data-inquire-submit]"), $("[data-inquire-note]"),
    "Consulta registrada. El equipo de la galería responde por correo.");

  /* ---------------------------------------------------------------
   * Revelado al entrar en pantalla (una sola primitiva de movimiento).
   * ------------------------------------------------------------- */
  var revealables = $$(".lc-reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }
})();
