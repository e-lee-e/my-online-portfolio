/* Carnet de cybersécurité, Eg Elisée Lathro
   Le site fonctionne sans JavaScript. Ce fichier ajoute trois conforts :
   le menu mobile, les filtres de la page Projets et TP, et le chargement
   différé des PDF pour ne pas télécharger 20 Mo à l'ouverture de la page. */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Menu mobile ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var tabs = document.querySelector("nav.tabs");

  if (toggle && tabs) {
    toggle.addEventListener("click", function () {
      var open = tabs.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Aperçu des PDF ----------
     Chaque bloc <details class="reader"> contient une iframe dont l'URL est
     stockée dans data-src. On ne la déplace dans src qu'à la première
     ouverture. Si le fichier est absent du dossier docs/, on l'annonce
     au lieu de laisser un cadre noir. */

  document.querySelectorAll("details.reader").forEach(function (reader) {
    var frame = reader.querySelector("iframe[data-src]");
    if (!frame) return;

    reader.addEventListener("toggle", function () {
      if (!reader.open || frame.src) return;

      var path = frame.getAttribute("data-src");
      frame.src = path;

      if (!window.fetch || location.protocol === "file:") return;

      fetch(path, { method: "HEAD" })
        .then(function (response) {
          if (response.ok) return;
          showMissing(reader, path);
        })
        .catch(function () {
          showMissing(reader, path);
        });
    });
  });

  function showMissing(reader, path) {
    if (reader.querySelector(".reader-missing")) return;
    var body = reader.querySelector(".reader-body");
    if (body) body.style.display = "none";

    var warning = document.createElement("p");
    warning.className = "reader-missing";
    warning.textContent =
      "Fichier introuvable : " + path + ". Dépose le PDF dans le dossier docs/ " +
      "sous ce nom exact, puis recharge la page.";
    reader.insertBefore(warning, reader.querySelector(".reader-foot"));
  }

  /* ---------- Filtres par thème ---------- */

  var buttons = document.querySelectorAll(".filter-btn");
  var docs = document.querySelectorAll(".doc");
  var status = document.querySelector(".filter-status");

  if (!buttons.length || !docs.length) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var wanted = button.getAttribute("data-filter");
      var shown = 0;

      buttons.forEach(function (other) {
        var active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });

      docs.forEach(function (doc) {
        var keep = wanted === "all" || doc.getAttribute("data-theme") === wanted;
        doc.hidden = !keep;
        if (keep) shown++;
      });

      if (status) {
        status.textContent = shown > 1
          ? shown + " documents affichés"
          : shown + " document affiché";
      }
    });
  });

});
