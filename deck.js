/* Pokémon Battle Simulator — Team 4 presentation deck
   No dependencies. Works from file:// as well as a static server. */

(function () {
  "use strict";

  var slides = [];
  var current = 0;

  var elBar      = document.getElementById("progress-bar");
  var elCounter  = document.getElementById("counter");
  var elSection  = document.getElementById("section-name");
  var elNotes    = document.getElementById("notes");
  var elNotesBody = document.getElementById("notes-body");
  var elOverview = document.getElementById("overview");
  var elOvGrid   = document.getElementById("ov-grid");
  var elHelp     = document.getElementById("help");
  var elTimer    = document.getElementById("timer");
  var btnNotes   = document.getElementById("btn-notes");
  var btnOverview = document.getElementById("btn-overview");

  /* ------------------------------------------------------------ navigation */

  function sectionName(slide) {
    // data-section may contain an entity such as "Q &amp; A"; read it decoded.
    var raw = slide.getAttribute("data-section") || "";
    var box = document.createElement("textarea");
    box.innerHTML = raw;
    return box.value;
  }

  function show(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === index);
    });
    current = index;

    elCounter.textContent = (index + 1) + " / " + slides.length;
    elBar.style.setProperty(
      "--progress",
      slides.length < 2 ? 1 : index / (slides.length - 1)
    );
    elSection.textContent = sectionName(slides[index]);

    slides[index].scrollTop = 0;
    renderNotes();
    markOverview();

    if (history.replaceState) {
      history.replaceState(null, "", "#" + (index + 1));
    }
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  /* --------------------------------------------------------- speaker notes */

  function renderNotes() {
    var source = slides[current].querySelector(".notes-source");
    elNotesBody.innerHTML = source
      ? source.innerHTML
      : '<p style="color:var(--dim);margin:0">No notes for this slide.</p>';
  }

  function toggleNotes() {
    var on = elNotes.classList.toggle("show");
    btnNotes.classList.toggle("on", on);
  }

  /* -------------------------------------------------------------- overview */

  function buildOverview() {
    slides.forEach(function (slide, i) {
      var item = document.createElement("div");
      item.className = "ov-item";
      item.innerHTML = '<span class="ov-num">' + String(i + 1).padStart(2, "0") + "</span>";
      item.appendChild(document.createTextNode(sectionName(slide)));
      item.addEventListener("click", function () {
        show(i);
        closePanels();
      });
      elOvGrid.appendChild(item);
    });
  }

  function markOverview() {
    Array.prototype.forEach.call(elOvGrid.children, function (item, i) {
      item.classList.toggle("current", i === current);
    });
  }

  function toggleOverview() {
    var on = elOverview.classList.toggle("show");
    btnOverview.classList.toggle("on", on);
  }

  function closePanels() {
    elOverview.classList.remove("show");
    elHelp.classList.remove("show");
    btnOverview.classList.remove("on");
  }

  /* ----------------------------------------------------------------- timer */

  // 15:00 is the group rubric's hard limit for the Excellent band.
  var TARGET_SECONDS = 15 * 60;
  var WARN_SECONDS = 12 * 60;

  var elapsed = 0;
  var ticking = null;

  function paintTimer() {
    var m = Math.floor(elapsed / 60);
    var s = elapsed % 60;
    elTimer.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    elTimer.classList.toggle("warn", elapsed >= WARN_SECONDS && elapsed < TARGET_SECONDS);
    elTimer.classList.toggle("over", elapsed >= TARGET_SECONDS);
  }

  function toggleTimer() {
    if (ticking) {
      clearInterval(ticking);
      ticking = null;
    } else {
      ticking = setInterval(function () {
        elapsed += 1;
        paintTimer();
      }, 1000);
    }
    elTimer.style.opacity = ticking ? "1" : "0.55";
  }

  function resetTimer() {
    if (ticking) { clearInterval(ticking); ticking = null; }
    elapsed = 0;
    elTimer.style.opacity = "0.55";
    paintTimer();
  }

  /* ------------------------------------------------- demo media hydration */

  // Each .media-slot names the file it is waiting for in data-src. If that file
  // exists, swap the placeholder out for it; otherwise leave the placeholder so
  // the deck still reads correctly with nothing recorded yet.
  function hydrateMedia() {
    document.querySelectorAll(".media-slot[data-src]").forEach(function (slot) {
      var src = slot.getAttribute("data-src");
      var isVideo = /\.(mp4|webm|mov|m4v)$/i.test(src);
      var node;

      if (isVideo) {
        node = document.createElement("video");
        node.controls = true;
        node.preload = "metadata";
        node.playsInline = true;
        node.addEventListener("loadedmetadata", function () { slot.innerHTML = ""; slot.appendChild(node); });
      } else {
        node = document.createElement("img");
        node.alt = "";
        node.addEventListener("load", function () { slot.innerHTML = ""; slot.appendChild(node); });
      }

      node.addEventListener("error", function () { /* keep the placeholder */ });
      node.src = src;
    });
  }

  /* -------------------------------------------------------------- bindings */

  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);
  btnNotes.addEventListener("click", toggleNotes);
  btnOverview.addEventListener("click", toggleOverview);
  document.getElementById("btn-help").addEventListener("click", function () {
    elHelp.classList.toggle("show");
  });
  elTimer.addEventListener("click", toggleTimer);
  elTimer.addEventListener("dblclick", resetTimer);
  elHelp.addEventListener("click", closePanels);
  elOverview.addEventListener("click", function (event) {
    if (event.target === elOverview) closePanels();
  });

  document.addEventListener("keydown", function (event) {
    // Never hijack typing, and let <details> keep its own Enter/Space handling.
    var tag = (event.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || event.target.isContentEditable) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    switch (event.key) {
      case "ArrowRight":
      case "PageDown":
        event.preventDefault(); next(); break;
      case " ":
        if (tag === "summary" || tag === "button") return;
        event.preventDefault(); next(); break;
      case "ArrowLeft":
      case "PageUp":
        event.preventDefault(); prev(); break;
      case "Home":
        event.preventDefault(); show(0); break;
      case "End":
        event.preventDefault(); show(slides.length - 1); break;
      case "n": case "N":
        toggleNotes(); break;
      case "o": case "O":
        toggleOverview(); break;
      case "t": case "T":
        toggleTimer(); break;
      case "r": case "R":
        resetTimer(); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
      case "h": case "H": case "?":
        elHelp.classList.toggle("show"); break;
      case "Escape":
        closePanels(); break;
      default:
        if (/^[1-9]$/.test(event.key)) show(parseInt(event.key, 10) - 1);
    }
  });

  /* ----------------------------------------------------------------- start */

  // Collect the slides only once the whole document is parsed. Some preview and
  // embedding hosts execute scripts while the HTML is still streaming, and an
  // early query would find one section instead of twenty-nine.
  function start() {
    slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
    if (!slides.length) return;

    elOvGrid.innerHTML = "";
    buildOverview();
    hydrateMedia();
    resetTimer();

    var fromHash = parseInt((location.hash || "").replace("#", ""), 10);
    show(isNaN(fromHash) ? 0 : fromHash - 1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // Belt and braces. Some preview and embedding hosts replay a snapshot of the
  // page and inject the remaining sections after scripts have already run, so
  // watch the deck and re-initialise if the slide count changes under us.
  var deck = document.getElementById("deck");
  if (deck && window.MutationObserver) {
    new MutationObserver(function () {
      if (slides.length !== document.querySelectorAll(".slide").length) start();
    }).observe(deck, { childList: true });
  }
})();
