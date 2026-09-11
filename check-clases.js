/**
 * check-clases.js — verifica que toda clase usada en una página esté compilada.
 *
 *   node check-clases.js src/pages/404.html src/partials/sala-pendiente.html
 *   node check-clases.js src/pages/*.html
 *
 * Por qué existe: Tailwind sólo emite las utilidades que ve al compilar, y desde la
 * plataforma no se puede recompilar (no hay node_modules). Una clase que no está en
 * dist/styles.css no da ningún error: el markup simplemente sale sin estilo. Este
 * chequeo convierte ese fallo silencioso en una lista.
 *
 * Si aparece algo en AUSENTES, o se reemplaza por una clase que ya exista, o se pide
 * agregarla al safelist de @source inline en src/input.css y recompilar.
 */
const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "dist", "styles.css"), "utf8");

// Tailwind escapa estos caracteres con una sola contrabarra dentro del selector.
function esc(c) {
  return c.replace(/[\[\](),:.\/%!#'"]/g, (ch) => "\\" + ch);
}

// `group` y `peer` son marcadoras: no tienen estilos propios y nunca aparecen como
// selector en la hoja. Existen para que los hijos puedan usar group-hover:, peer-focus:,
// etc. Buscarlas en el CSS da siempre un falso positivo.
const MARCADORAS = /^(group|peer)(\/[\w-]+)?$/;

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Uso: node check-clases.js <archivo.html> [...]");
  process.exit(2);
}

let total = 0;
let ok = 0;
const fail = [];

for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const clases = new Set();
  for (const m of html.match(/class="[^"]*"/g) || []) {
    for (const c of m.slice(7, -1).split(/\s+/)) {
      if (c) clases.add(c);
    }
  }
  for (const c of clases) {
    if (MARCADORAS.test(c)) continue;
    total++;
    if (css.includes("." + esc(c))) ok++;
    else fail.push(path.basename(f) + " → " + c);
  }
}

console.log("clases distintas: " + total + " · presentes en dist/styles.css: " + ok);
if (fail.length) {
  console.log("AUSENTES (saldrían sin estilo):\n  " + fail.join("\n  "));
  process.exit(1);
}
console.log("ausentes: ninguna");
