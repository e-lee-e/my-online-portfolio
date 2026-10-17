/* Carnet de cybersécurité, Eg Elisée Lathro
   Le site fonctionne sans JavaScript. Ce fichier ajoute des conforts :
   la bascule de thème clair/sombre, le menu mobile, les filtres de la
   page Projets et TP, le chargement différé des PDF pour ne pas
   télécharger 20 Mo à l'ouverture de la page, l'ombre de la barre de
   navigation au défilement et quelques apparitions douces au scroll. */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Thème clair / sombre ----------
     Le thème initial est déjà posé par le petit script inline dans
     <head>, avant le premier rendu, pour éviter un flash de la mauvaise
     couleur. Ici on ne fait que réagir au clic et mémoriser le choix. */

  var themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Ombre de la barre de navigation au défilement ---------- */

  var topbar = document.querySelector(".topbar");

  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Apparitions douces au défilement ----------
     Pure confort visuel : sans JS ou avec un lecteur qui préfère moins
     de mouvement, le contenu reste simplement visible en permanence. */

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".card, .doc, .report, .callout");

    if (revealEls.length) {
      revealEls.forEach(function (el) { el.classList.add("reveal"); });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

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
