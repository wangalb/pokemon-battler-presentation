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

  /* Projected slides stay intentionally terse. The authored detail remains in
     index.html and is copied into speaker notes before the concise view is
     built, so nothing is lost when presenters need the deeper explanation. */
  var conciseSlides = {
    "Title": {
      bullets: [
        "Will: Accounts and Trainer Panel",
        "Aman: Pokédex",
        "Albert: Single Battle",
        "Dorothy: Tournaments",
        "Cindy: Build a Pokémon",
        "Edison: Custom Pokémon Battles"
      ]
    },
    "Introduction": {
      lead: "A web app where you pick Pokémon, battle them, and run knockout tournaments.",
      bullets: [
        "Real Data from PokeAPI",
        "Play Real Battles",
        "Create Tournaments",
        "Create your own Pokemon",
        "Battle with your own pokemon!"
      ]
    },
    "Specification": {
      bullets: [
        "Browse every available Pokémon",
        "Create custom Pokémon",
        "Save favourites to trainer profiles",
        "Run interactive single battles",
        "Run eight-entrant knockout tournaments",
        "Use custom Pokémon in battles",
        "Manage accounts and permissions"
      ]
    },
    "Scope": {
      bullets: [
        "Will: Accounts and Trainer Panel",
        "Aman: Pokédex",
        "Albert: Single Battle",
        "Dorothy: Tournaments",
        "Cindy: Build a Pokémon",
        "Edison: Custom Pokémon Battles"
      ]
    },
    "Architecture primer": {
      bullets: [
        "Entities contain enterprise rules",
        "Use cases contain application rules",
        "Adapters translate between formats",
        "Frameworks remain outer details",
        "Dependencies point toward business rules",
        "Both languages follow matching layers"
      ],
      preserve: ".layers",
      visual: "side"
    },
    "Will — Accounts & Panel": {
      bullets: [
        "Register or log in",
        "Access role-specific controls",
        "Open the Trainer Panel",
        "Save favourite Pokémon",
        "Remove saved Pokémon",
        "Log out safely"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Will — Code": {
      bullets: [
        "Controller creates use-case Input Data",
        "Interactor applies library policy",
        "Repository boundary protects dependency direction",
        "Presenter creates the View Model",
        "Authorization stays outside the View"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Aman — Pokédex": {
      bullets: [
        "Browse every available Pokémon",
        "Search by name",
        "Filter by Pokémon type",
        "Inspect stats, moves, and sprites",
        "Open detailed Pokémon cards"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Aman — Code": {
      bullets: [
        "Pure functions transform API data",
        "Use cases avoid React dependencies",
        "Errors become explicit result states",
        "Tests inject recorded Pokémon data"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Aman — Frontend architecture": {
      bullets: [
        "Components render View Models",
        "Hooks coordinate application state",
        "Use cases enforce frontend rules",
        "Services isolate external APIs",
        "Domain types remain framework-independent"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Albert — Battle": {
      bullets: [
        "Choose two Pokémon",
        "Select moves each turn",
        "Track HP and battle logs",
        "Apply speed and type rules",
        "Finish with one winner"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Albert — UML": {
      bullets: [
        "Battle owns combat state",
        "Interactor resolves complete turns",
        "Strategies isolate move selection",
        "Dependencies point toward entities",
        "Interfaces enable deterministic tests"
      ],
      preserve: "figure",
      visual: "wide"
    },
    "Dorothy - Tournament demo": {
      bullets: [
        "Choose eight tournament entrants",
        "Fill open slots randomly",
        "Run four quarterfinals concurrently",
        "Advance two semifinal winners",
        "Crown one final champion",
        "Reset HP between matches"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Dorothy - Interactor": {
      bullets: [
        "Load or create the tournament",
        "Pair entrants in bracket order",
        "Submit every matchup concurrently",
        "Join every completed match",
        "Record and save the round",
        "Present winners or failures"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Dorothy - UML": {
      bullets: [
        "Runtime control crosses outer layers",
        "Source dependencies point inward",
        "Use-case boundaries invert dependencies"
      ],
      preserve: "figure",
      visual: "wide"
    },
    "Dorothy - Class UML": {
      bullets: [
        "Composition enforces bracket ownership",
        "Interfaces provide replaceable Strategies",
        "No tournament inheritance exists"
      ],
      preserve: "figure",
      visual: "wide"
    },
    "Cindy — Create Pokémon": {
      bullets: [
        "Choose a Pokémon name",
        "Set battle statistics",
        "Choose types and moves",
        "Upload a custom sprite",
        "Save to your collection"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Cindy — Code": {
      bullets: [
        "Factory assembles the use-case objects",
        "Interactor validates custom Pokémon data",
        "Repositories persist metadata and sprites",
        "Presenter reports success or failure",
        "Creation reuses move-loading boundaries"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Edison — Custom Pokémon": {
      bullets: [
        "Select your saved custom Pokémon",
        "Load owner-scoped battle data",
        "Display uploaded sprites",
        "Use normal battle rules",
        "Enter single battles and tournaments"
      ],
      preserve: ".media-slot",
      visual: "side"
    },
    "Edison — Class UML": {
      bullets: [
        "Custom Pokémon reuse standard entities",
        "Owner scope protects saved data",
        "Interfaces isolate storage details",
        "Battles accept official or custom entrants",
        "Sprites load through dedicated boundaries"
      ],
      preserve: "figure",
      visual: "wide"
    },
    "API usage": {
      bullets: [
        "PokéAPI supplies official Pokémon data",
        "Species endpoint supplies names and identifiers",
        "Detail endpoint supplies stats and sprites",
        "Move endpoint supplies battle moves",
        "Backend caching supports battles and tournaments",
        "Browser loading supports the Pokédex"
      ]
    },
    "Clean Architecture": {
      bullets: [
        "Entities import no outer packages",
        "Use cases own their boundaries",
        "Controllers cannot access repositories directly",
        "Presenters implement output boundaries",
        "Architecture tests enforce dependency direction",
        "Known outer-layer debt remains documented"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "SOLID": {
      bullets: [
        "SRP separates orchestration from domain rules",
        "OCP supports new Strategy implementations",
        "LSP enables deterministic test doubles",
        "ISP keeps boundaries client-specific",
        "DIP points dependencies toward interfaces"
      ]
    },
    "Design patterns": {
      bullets: [
        "Strategy swaps battle policies",
        "Factory hides use-case construction",
        "Dependency Injection supplies collaborators",
        "Adapter unifies Pokémon data sources",
        "Cache-aside avoids repeated API calls",
        "Immutable values prevent accidental mutation"
      ]
    },
    "Code organization": {
      bullets: [
        "Top folders represent architecture layers",
        "Each use case has one folder",
        "Frontend folders separate responsibilities",
        "Shared contracts prevent duplicated policies",
        "Names reveal architectural intent"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Code quality": {
      bullets: [
        "Feature branches isolate changes",
        "Pull requests support review",
        "Checkstyle enforces Java conventions",
        "ESLint enforces frontend conventions",
        "CI blocks failing changes",
        "Verification reproduces every quality gate"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Testing": {
      bullets: [
        "634 automated tests",
        "90.00% backend line coverage",
        "89.79% frontend line coverage",
        "94%+ use-case line coverage",
        "Randomness is injected",
        "Tests require no external server"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Accessibility": {
      bullets: [
        "Consistent navigation reduces learning effort",
        "Keyboard controls support every main action",
        "Redundant labels avoid colour-only meaning",
        "Random selection offers flexible use",
        "Errors preserve items and turns",
        "Language and connectivity remain barriers",
        "Accessibility limitations remain documented"
      ]
    },
    "Run it": {
      bullets: [
        "Install Java 17 and Node 22",
        "Clone the repository",
        "Start the backend JAR",
        "Start the Vite frontend",
        "Open the local web address",
        "Verify backend health"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side"
    },
    "Limitations": {
      bullets: [
        "Tournament state resets with backend restarts",
        "Battle state resets with browser refreshes",
        "Some authentication remains locally trusted",
        "Pokédex bypasses backend caching",
        "Live API calls require connectivity",
        "Screen-reader testing remains manual"
      ]
    },
    "Wrap": {
      bullets: [
        "Seven complete use cases",
        "Official and custom Pokémon",
        "Interactive battles",
        "Parallel knockout tournaments",
        "Clean Architecture across two languages",
        "634 automated tests",
        "Runnable backend JAR"
      ]
    },
    "Q & A — architecture & data": {
      bullets: [
        "Dependency direction",
        "Interactor responsibilities",
        "Persistence locations",
        "PokéAPI caching",
        "Custom Pokémon ownership",
        "Tournament concurrency",
        "Known architecture debt"
      ]
    },
    "Q & A — testing, design & process": {
      bullets: [
        "Testing evidence",
        "Coverage thresholds",
        "SOLID examples",
        "Strategy pattern",
        "Randomness control",
        "Code review process",
        "Universal Design",
        "Future improvements"
      ]
    }
  };

  var conciseTitles = {
    "Title": "Pokémon Battle Simulator",
    "Introduction": "What We Built",
    "Specification": "Features",
    "Scope": "Our Use Cases",
    "Architecture primer": "Architecture Overview",
    "Will — Accounts & Panel": "Accounts and Trainer Panel",
    "Will — Code": "Account Architecture",
    "Aman — Pokédex": "Pokédex",
    "Aman — Code": "Pokédex Logic",
    "Aman — Frontend architecture": "Frontend Architecture",
    "Albert — Battle": "Single Battle",
    "Albert — UML": "Battle UML",
    "Dorothy - Tournament demo": "Tournament",
    "Dorothy - Interactor": "Tournament Interactor",
    "Dorothy - UML": "Tournament Architecture",
    "Dorothy - Class UML": "Tournament Class UML",
    "Cindy — Create Pokémon": "Build a Pokémon",
    "Cindy — Code": "Pokémon Creation Logic",
    "Edison — Custom Pokémon": "Custom Pokémon Battles",
    "Edison — Class UML": "Custom Battle Class UML",
    "API usage": "PokeAPI",
    "Clean Architecture": "Clean Architecture",
    "SOLID": "SOLID Principles",
    "Design patterns": "Design Patterns",
    "Code organization": "Code Organization",
    "Code quality": "Code Quality",
    "Testing": "Testing",
    "Accessibility": "Universal Design",
    "Run it": "Running the Project",
    "Limitations": "Limitations",
    "Wrap": "Project Summary",
    "Q & A — architecture & data": "Architecture Q&A",
    "Q & A — testing, design & process": "Testing and Design Q&A"
  };

  function wordCount(text) {
    return (text.trim().match(/\S+/g) || []).length;
  }

  function validateConciseSlides() {
    Object.keys(conciseSlides).forEach(function (section) {
      var bullets = conciseSlides[section].bullets || [];
      if (!conciseTitles[section]) {
        throw new Error(section + " has no concise title.");
      }
      if (bullets.length > 10) {
        throw new Error(section + " has more than 10 bullets.");
      }
      bullets.forEach(function (bullet) {
        if (wordCount(bullet) >= 10) {
          throw new Error(section + " has a bullet of 10 or more words: " + bullet);
        }
      });
    });
  }

  function archiveRemovedDetail(slide, config, conciseTitle) {
    var heading = slide.querySelector("h1, h2");
    var originalTitle = heading ? heading.textContent.replace(/\s+/g, " ").trim() : "";
    var clone = slide.cloneNode(true);
    clone.querySelectorAll(".notes-source, h1, h2, .speaker-tag, .eyebrow, .pokeball")
      .forEach(function (node) { node.remove(); });
    if (config.preserve) {
      clone.querySelectorAll(config.preserve).forEach(function (node) { node.remove(); });
    }

    var detail = clone.textContent.replace(/\s+/g, " ").trim();
    if (originalTitle && originalTitle !== conciseTitle) {
      detail = "Previous slide title: " + originalTitle + ". " + detail;
    }
    if (!detail) return;

    var notes = slide.querySelector(".notes-source");
    if (!notes) {
      notes = document.createElement("div");
      notes.className = "notes-source";
      slide.appendChild(notes);
    }
    var archive = document.createElement("div");
    archive.className = "notes-detail-archive";
    archive.innerHTML = "<h5>Detailed slide content</h5>";
    var paragraph = document.createElement("p");
    paragraph.textContent = detail;
    archive.appendChild(paragraph);
    notes.appendChild(archive);
  }

  function applyConciseSlides() {
    validateConciseSlides();

    document.querySelectorAll("#deck > .slide").forEach(function (slide) {
      if (slide.dataset.conciseApplied === "true") return;

      var section = sectionName(slide);
      var config = conciseSlides[section];
      var conciseTitle = conciseTitles[section];
      if (!config) throw new Error("No concise content configured for " + section + ".");

      var preserved = [];
      if (config.preserve) {
        preserved = Array.prototype.slice.call(slide.querySelectorAll(config.preserve));
        if (config.preserveLimit) preserved = preserved.slice(0, config.preserveLimit);
      }
      archiveRemovedDetail(slide, config, conciseTitle);

      var heading = slide.querySelector("h1, h2");
      if (heading) heading.textContent = conciseTitle;

      Array.prototype.slice.call(slide.children).forEach(function (node) {
        if (node.matches("h1, h2, .speaker-tag, .eyebrow, .pokeball, .notes-source")) return;
        node.remove();
      });

      var layout = document.createElement("div");
      layout.className = "concise-layout";
      if (preserved.length) {
        layout.classList.add("has-visual", "visual-" + (config.visual || "side"));
      }

      var summary = document.createElement("div");
      summary.className = "concise-summary";
      if (config.lead) {
        var lead = document.createElement("p");
        lead.className = "concise-lead";
        lead.textContent = config.lead;
        summary.appendChild(lead);
      }

      var list = document.createElement("ul");
      list.className = "concise-bullets";
      config.bullets.forEach(function (bullet) {
        var item = document.createElement("li");
        item.textContent = bullet;
        list.appendChild(item);
      });
      summary.appendChild(list);
      layout.appendChild(summary);

      if (preserved.length) {
        var visual = document.createElement("div");
        visual.className = "concise-visual";
        preserved.forEach(function (node) { visual.appendChild(node); });
        layout.appendChild(visual);
      }

      slide.insertBefore(layout, slide.querySelector(".notes-source"));
      slide.dataset.conciseApplied = "true";
    });
  }

  /* ------------------------------------------------------------ navigation */

  function sectionName(slide) {
    // data-section may contain an entity such as "Q &amp; A"; read it decoded.
    var raw = slide.getAttribute("data-section") || "";
    var box = document.createElement("textarea");
    box.innerHTML = raw;
    return box.value;
  }

  /* A slide must never scroll during the talk. Slides are composed to fit at
     full size; if fonts, an odd window shape, or a dense slide still overflow
     the panel, dial the content's zoom down (styles.css reads --fit) until it
     fits. Zoom reflows synchronously, so remeasure after each step. */
  function fitSlide(slide) {
    slide.style.removeProperty("--fit");
    var fit = 1;
    for (var i = 0; i < 4 && slide.scrollHeight > slide.clientHeight; i += 1) {
      fit *= slide.clientHeight / slide.scrollHeight;
      slide.style.setProperty("--fit", fit);
    }
  }

  function show(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === index);
    });
    current = index;
    fitSlide(slides[index]);

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

  // Rehearse to 18 minutes, turn gold at 16, and keep a full minute of buffer
  // before the 20-minute upper bound in the supplied presentation schedule.
  var TARGET_SECONDS = 19 * 60;
  var WARN_SECONDS = 16 * 60;

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

  function formatMediaTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    var whole = Math.floor(seconds);
    var minutes = Math.floor(whole / 60);
    var remainder = whole % 60;
    return minutes + ":" + String(remainder).padStart(2, "0");
  }

  function createVideoPlayer(video) {
    var player = document.createElement("div");
    var chrome = document.createElement("div");
    var play = document.createElement("button");
    var time = document.createElement("span");
    var scrub = document.createElement("div");
    var fill = document.createElement("span");
    var thumb = document.createElement("span");
    var mute = document.createElement("button");
    var fullscreen = document.createElement("button");
    var scrubbing = false;

    video.controls = false;
    video.className = "demo-video";

    player.className = "video-player";
    chrome.className = "video-controls";
    play.className = "video-button";
    mute.className = "video-button";
    fullscreen.className = "video-button";
    time.className = "video-time";
    scrub.className = "video-scrub";
    fill.className = "video-scrub-fill";
    thumb.className = "video-scrub-thumb";

    play.type = "button";
    mute.type = "button";
    fullscreen.type = "button";
    play.setAttribute("aria-label", "Play video");
    mute.setAttribute("aria-label", "Mute video");
    fullscreen.setAttribute("aria-label", "Fullscreen video");
    scrub.setAttribute("role", "slider");
    scrub.setAttribute("tabindex", "0");
    scrub.setAttribute("aria-label", "Video position");
    scrub.setAttribute("aria-valuemin", "0");
    scrub.setAttribute("aria-valuemax", "100");

    scrub.appendChild(fill);
    scrub.appendChild(thumb);
    chrome.appendChild(play);
    chrome.appendChild(time);
    chrome.appendChild(scrub);
    chrome.appendChild(mute);
    chrome.appendChild(fullscreen);
    player.appendChild(video);
    player.appendChild(chrome);

    function durationOrZero() {
      return isFinite(video.duration) ? video.duration : 0;
    }

    function sync() {
      var duration = durationOrZero();
      var ratio = duration ? Math.min(1, Math.max(0, video.currentTime / duration)) : 0;
      var percent = ratio * 100;

      player.style.setProperty("--video-progress", percent + "%");
      scrub.setAttribute("aria-valuenow", Math.round(percent));
      scrub.setAttribute(
        "aria-valuetext",
        formatMediaTime(video.currentTime) + " of " + formatMediaTime(duration)
      );
      time.textContent = formatMediaTime(video.currentTime) + " / " + formatMediaTime(duration);
      play.textContent = video.paused ? "▶" : "❚❚";
      play.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
      mute.textContent = video.muted ? "×" : "♪";
      mute.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
      fullscreen.textContent = "⛶";
    }

    function seekToRatio(ratio) {
      var duration = durationOrZero();
      if (!duration) return;
      video.currentTime = Math.min(1, Math.max(0, ratio)) * duration;
      sync();
    }

    function seekFromClientX(clientX) {
      var rect = scrub.getBoundingClientRect();
      seekToRatio((clientX - rect.left) / rect.width);
    }

    play.addEventListener("click", function () {
      if (video.paused) {
        var started = video.play();
        if (started && started.catch) started.catch(function () { sync(); });
      } else {
        video.pause();
      }
      sync();
    });
    video.addEventListener("click", function () { play.click(); });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("durationchange", sync);
    video.addEventListener("timeupdate", sync);

    scrub.addEventListener("pointerdown", function (event) {
      scrubbing = true;
      scrub.setPointerCapture(event.pointerId);
      seekFromClientX(event.clientX);
    });
    scrub.addEventListener("pointermove", function (event) {
      if (scrubbing) seekFromClientX(event.clientX);
    });
    scrub.addEventListener("pointerup", function (event) {
      scrubbing = false;
      scrub.releasePointerCapture(event.pointerId);
    });
    scrub.addEventListener("keydown", function (event) {
      var duration = durationOrZero();
      if (!duration) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        video.currentTime = Math.max(0, video.currentTime - 5);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        video.currentTime = Math.min(duration, video.currentTime + 5);
      } else if (event.key === "Home") {
        event.preventDefault();
        event.stopPropagation();
        video.currentTime = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        event.stopPropagation();
        video.currentTime = duration;
      }
      sync();
    });

    mute.addEventListener("click", function () {
      video.muted = !video.muted;
      sync();
    });
    fullscreen.addEventListener("click", function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (player.requestFullscreen) {
        player.requestFullscreen();
      }
    });

    sync();
    return player;
  }

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
        node.preload = "metadata";
        node.playsInline = true;
        node.addEventListener("loadedmetadata", function () {
          slot.innerHTML = "";
          slot.appendChild(createVideoPlayer(node));
        });
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
    // The source stays grouped by author for easy editing. Presentation order
    // follows the course's recommended flow: specification, API/artifact,
    // functionality, architecture/design, process evidence, and wrap-up.
    var presentationOrder = [
      "Title",
      "Introduction",
      "Specification",
      "Scope",
      "API usage",
      "Run it",
      "Will — Accounts & Panel",
      "Will — Code",
      "Aman — Pokédex",
      "Aman — Code",
      "Aman — Frontend architecture",
      "Albert — Battle",
      "Albert — UML",
      "Dorothy - Tournament demo",
      "Dorothy - Interactor",
      "Dorothy - UML",
      "Dorothy - Class UML",
      "Cindy — Create Pokémon",
      "Cindy — Code",
      "Edison — Custom Pokémon",
      "Edison — Class UML",
      "Architecture primer",
      "Clean Architecture",
      "SOLID",
      "Design patterns",
      "Code organization",
      "Code quality",
      "Testing",
      "Accessibility",
      "Limitations",
      "Wrap",
      "Q & A — architecture & data",
      "Q & A — testing, design & process"
    ];
    var rank = new Map(presentationOrder.map(function (name, index) {
      return [name, index];
    }));
    var deckElement = document.getElementById("deck");
    Array.prototype.slice.call(document.querySelectorAll("#deck > .slide"))
      .sort(function (left, right) {
        return (rank.get(left.dataset.section) ?? Number.MAX_SAFE_INTEGER)
          - (rank.get(right.dataset.section) ?? Number.MAX_SAFE_INTEGER);
      })
      .forEach(function (slide) { deckElement.appendChild(slide); });

    applyConciseSlides();
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

  // Refit whenever the panel's size or the text's metrics change: a resize or
  // fullscreen toggle, and the swap from fallback to the self-hosted fonts.
  window.addEventListener("resize", function () {
    if (slides.length) fitSlide(slides[current]);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (slides.length) fitSlide(slides[current]);
    });
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
