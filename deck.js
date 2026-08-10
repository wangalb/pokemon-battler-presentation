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
    "Scope": {
      bullets: [
        "Will: Accounts and Trainer Panel",
        "Aman: Pokédex",
        "Albert: Single Battle",
        "Dorothy: Tournaments",
        "Cindy: Build a Pokémon",
        "Edison: Custom Pokémon Battles"
      ],
      preserve: ".media-slot",
      preserveLimit: 1,
      visual: "side",
      notes: [
        "Spend five minutes here, including the complete project walkthrough.",
        "Introduce the six owners and seven user stories, then play the video without explaining implementation details.",
        "Introduction and Scope together are seven minutes and stay focused on what the product does."
      ]
    },
    "Will — Accounts & Panel": {
      lead: "As a returning trainer, I want an account and profile so that my identity and collection persist.",
      bullets: [
        "Register or log in",
        "Access role-specific controls",
        "Open the Trainer Panel",
        "Save favourite Pokémon",
        "Remove saved Pokémon",
        "Log out safely"
      ],
      notes: [
        "State Will's user story and show the before and after user experience.",
        "Use this slide and the architecture slide in about one minute total."
      ]
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
      visual: "side",
      notes: [
        "Connect the story to Clean Architecture: View to Controller, Input Boundary, Interactor, repository interface, Presenter, and View Model.",
        "Do not walk through the code line by line. Explain the boundary direction and the user-visible result."
      ]
    },
    "Aman — Pokédex": {
      lead: "As a trainer, I want to browse available Pokémon and save favourites so that I can make informed battle selections.",
      bullets: [
        "Browse every available Pokémon",
        "Search by name",
        "Filter by Pokémon type",
        "Inspect stats, moves, and sprites",
        "Open detailed Pokémon cards"
      ],
      notes: [
        "State Aman's user story and name the before and after views.",
        "Use Aman's three slides in no more than ninety seconds total."
      ]
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
      visual: "side",
      notes: [
        "Explain that the search and filter use cases are framework-independent functions.",
        "Focus on the dependency boundary, not the implementation details."
      ]
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
      visual: "side",
      notes: [
        "Trace the Clean Architecture layers from React Views to hooks, use cases, domain types, and services.",
        "Use the diagram as sufficient evidence; do not inspect individual functions."
      ]
    },
    "Albert — Battle": {
      lead: "As a player, I want to choose two Pokémon and run one battle so that I can compare them.",
      bullets: [
        "Choose two Pokémon",
        "Select moves each turn",
        "Track HP and battle logs",
        "Apply speed and type rules",
        "Finish with one winner"
      ],
      notes: [
        "State Albert's user story and identify the battle's before and after states.",
        "Use both battle slides in about one minute total."
      ]
    },
    "Albert — Interactor": {
      bullets: [
        "Reject a finished battle",
        "Ask the Strategy for the opponent's move",
        "Order the turn by speed",
        "Skip a fainted attacker's answer",
        "Entities own accuracy, crits and damage",
        "Dependencies point in, control travels out"
      ],
      preserve: "pre, figure",
      preserveLimit: 2,
      visual: "side",
      notes: [
        "Describe the Interactor's responsibility in one sentence: order the turn and let the entities do the arithmetic.",
        "Use the diagram to trace View, Controller, Input Boundary, Interactor, and Entities.",
        "Name Dependency Inversion once, precisely, instead of listing several principles.",
        "Do not walk through the turn algorithm line by line."
      ]
    },
    "Dorothy - Tournament demo": {
      lead: "As a player, I want to run an eight-entrant knockout tournament so that I can see one champion.",
      bullets: [
        "Before: choose eight tournament entrants",
        "Random slots fill when tournaments start",
        "During: run each round concurrently",
        "After: advance winners to one champion",
        "Fresh battles reset HP between matches"
      ],
      preserve: ".tournament-demo-stills",
      preserveLimit: 1,
      visual: "wide",
      notes: [
        "State Dorothy's user story and point to the before, during, and after views.",
        "Use all four tournament slides in under two minutes total."
      ]
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
      visual: "side",
      notes: [
        "Describe the Interactor's responsibility in one sentence: coordinate one round through boundaries.",
        "Do not walk through CompletableFuture code line by line."
      ]
    },
    "Dorothy - Tournament architecture": {
      bullets: [
        "Frameworks: React, HTTP, Spring, Executor",
        "Interface adapters: controllers, presenter, view models",
        "Business rules: Interactor coordinates each round",
        "Entities: Tournament validates bracket progression",
        "Dependency Rule: source dependencies point inward",
        "SRP: classes keep separate responsibilities",
        "DIP: Interactor depends on use-case interfaces"
      ],
      preserve: "figure",
      visual: "wide",
      notes: [
        "Use the UML to map Frameworks, Interface Adapters, Application Business Rules, and Entities.",
        "Emphasize that source-code dependencies point inward."
      ]
    },
    "Dorothy - Tournament design": {
      bullets: [
        "Strategy: TournamentMatchRunner swaps battle implementations",
        "RandomBattleRunner reuses ResolveTurnInputBoundary",
        "Dependency Injection supplies runner and Executor",
        "Configuration wires outer-layer implementations",
        "Fresh Battle resets HP every match",
        "CompletableFuture runs matches concurrently"
      ],
      preserve: ".tournament-file-tree",
      visual: "side",
      notes: [
        "Name Strategy and Dependency Injection, then explain that tournament reuses the single-battle boundary.",
        "Keep this high level so Dorothy's full section stays under two minutes."
      ]
    },
    "Cindy — Create Pokémon": {
      lead: "As a creative player, I want to build a valid custom Pokémon so that I can use my own competitor.",
      bullets: [
        "Choose a Pokémon name",
        "Set battle statistics",
        "Choose types and moves",
        "Upload a custom sprite",
        "Save to your collection"
      ],
      notes: [
        "State Cindy's user story and identify the empty form and saved Pokémon as before and after views.",
        "Use both creation slides in about one minute total."
      ]
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
      visual: "side",
      notes: [
        "Connect View, Controller, Input Boundary, Interactor, repository interfaces, Presenter, and View Model.",
        "Explain the Clean Architecture path rather than the code syntax."
      ]
    },
    "Edison — Custom Pokémon": {
      lead: "As a custom-Pokémon creator, I want my creations in battles and tournaments so that creating one changes the playable experience.",
      bullets: [
        "Select your saved custom Pokémon",
        "Load owner-scoped battle data",
        "Display uploaded sprites",
        "Use normal battle rules",
        "Enter single battles and tournaments"
      ],
      notes: [
        "State Edison's user story and show the change from saved creation to playable entrant.",
        "Use both custom-Pokémon slides in about one minute total."
      ]
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
      visual: "wide",
      notes: [
        "Use the UML to show that custom Pokémon reuse the same entities and use-case boundaries.",
        "Focus on ownership and dependency direction, not class-by-class implementation."
      ]
    },
    "API usage": {
      bullets: [
        "PokéAPI supplies official Pokémon data",
        "/pokemon/{id} returns stats, types, and sprites",
        "/move/{id} returns power, type, and accuracy",
        "No API key is required"
      ],
      notes: [
        "Spend one minute here and show no more than two endpoints.",
        "Explain what the program receives from each endpoint and which user-visible features use that data.",
        "Do not turn this into an implementation walkthrough."
      ]
    },
    "Clean Architecture": {
      bullets: [
        "Team story crosses all four layers",
        "Views collect player choices",
        "Controllers call input boundaries",
        "Interactors coordinate application rules",
        "Entities protect game and account rules",
        "Gateways implement use-case interfaces",
        "Dependencies point inward"
      ],
      preserve: ".program-architecture-figure",
      preserveLimit: 1,
      visual: "wide",
      notes: [
        "Spend one minute tracing the team user story through the program-wide SVG.",
        "Start with a player action in the View, move through Controllers and Interactors, reach Entities and gateways, then return through a Presenter and View Model.",
        "State the Dependency Rule: source-code dependencies point inward, and architecture tests enforce it."
      ]
    },
    "SOLID": {
      bullets: [
        "SRP: Tournament validates bracket progression",
        "SRP: Interactor coordinates one round",
        "DIP: Interactor depends on TournamentMatchRunner",
        "DIP: Adapters implement use-case boundaries"
      ],
      notes: [
        "Spend one minute on two principles in depth: Single Responsibility and Dependency Inversion.",
        "Use tournament coordination versus validation for SRP, then the use-case-owned TournamentMatchRunner interface for DIP.",
        "Explain the concrete benefit of each principle instead of defining all five letters."
      ]
    },
    "Design patterns": {
      bullets: [
        "Strategy: TournamentMatchRunner defines one matchup",
        "RandomBattleRunner is the production Strategy",
        "Fixed runners make tests deterministic",
        "New match policies need no Interactor changes"
      ],
      notes: [
        "Spend one minute on the Strategy pattern introduced for tournament matches.",
        "Name the interface, production implementation, test substitute, and the extension benefit.",
        "Do not list every pattern in the repository."
      ]
    },
    "Code organization": {
      bullets: [
        "Hybrid packaging: layers first, use cases second",
        "Backend roots mirror Clean Architecture layers",
        "Each application action has one package",
        "Frontend separates domain, use cases, and adapters",
        "Shared contracts prevent duplicate rules"
      ],
      preserve: "pre",
      preserveLimit: 1,
      visual: "side",
      notes: [
        "Spend one minute on the file tree that is already visible.",
        "Explain hybrid packaging: package by layer at the top, then package by application action inside use_case.",
        "Compare the backend layer roots with the frontend domain, usecases, services, hooks, and components folders."
      ]
    },
    "Code quality": {
      bullets: [
        "Feature branches isolate changes",
        "Pull requests document dependencies",
        "Stacked PRs preserve merge order",
        "CI checks gate merges",
        "Checkstyle enforces Java conventions",
        "Oxlint enforces frontend conventions"
      ],
      preserve: ".pr-evidence",
      preserveLimit: 1,
      visual: "side",
      notes: [
        "Spend one minute explaining feature branches, pull requests, documented merge order, and green CI checks.",
        "Name Checkstyle and Oxlint, then point to the pull-request screenshots as team process evidence."
      ]
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
      visual: "side",
      notes: [
        "Spend one minute and lead with coverage percentages, not test counts.",
        "Point to the JaCoCo and Vitest evidence, state the use-case coverage, and briefly identify remaining test gaps."
      ]
    },
    "Accessibility": {
      bullets: [
        "Flexibility: official, custom, or random Pokémon",
        "Tolerance for Error: editable choices and fallbacks",
        "Audience: fans, students, families, coding clubs",
        "Barriers: English, modern hardware, internet access"
      ],
      notes: [
        "Spend one minute on Flexibility in Use and Tolerance for Error.",
        "Then name the target audience and the groups affected by language, hardware, and connectivity barriers.",
        "Frame exclusion as a mismatch created by design choices."
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
    "Wrap": {
      bullets: [
        "Seven connected use cases work end to end",
        "Battles and tournaments share tested rules",
        "Custom Pokémon are fully playable",
        "Future: persist active battles and tournaments",
        "Future: route Pokédex through backend caching",
        "Future: improve localization and screen-reader support"
      ],
      notes: [
        "Spend one minute summarizing the shipped product and then naming future work.",
        "Prioritize persistent sessions, one cached Pokédex path, localization, and stronger screen-reader support.",
        "End by returning to the team user story and confirming that it works end to end."
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
    "Scope": "Our Use Cases",
    "Will — Accounts & Panel": "Accounts and Trainer Panel",
    "Will — Code": "Account Architecture",
    "Aman — Pokédex": "Pokédex",
    "Aman — Code": "Pokédex Logic",
    "Aman — Frontend architecture": "Frontend Architecture",
    "Albert — Battle": "Single Battle",
    "Albert — Interactor": "Battle Interactor and UML",
    "Dorothy - Tournament demo": "Tournament",
    "Dorothy - Interactor": "Tournament Interactor",
    "Dorothy - Tournament architecture": "Tournament Architecture",
    "Dorothy - Tournament design": "Tournament Design",
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
      // The authored title and introduction keep Albert's custom layouts.
      if (!config) return;

      var preserved = [];
      if (config.preserve) {
        preserved = Array.prototype.slice.call(slide.querySelectorAll(config.preserve));
        if (config.preserveLimit) preserved = preserved.slice(0, config.preserveLimit);
      }

      if (config.notes) {
        var notes = slide.querySelector(".notes-source");
        if (!notes) {
          notes = document.createElement("div");
          notes.className = "notes-source";
          slide.appendChild(notes);
        }
        notes.innerHTML = "";
        var notesList = document.createElement("ul");
        config.notes.forEach(function (note) {
          var noteItem = document.createElement("li");
          noteItem.textContent = note;
          notesList.appendChild(noteItem);
        });
        notes.appendChild(notesList);
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

  function applySpeakerScripts() {
    var orderedSlides = Array.prototype.slice.call(document.querySelectorAll("#deck > .slide"));
    var scripts = window.SLIDE_SCRIPTS;

    if (!Array.isArray(scripts) || scripts.length !== orderedSlides.length) {
      throw new Error("Speaker scripts must match the 30-slide presentation order.");
    }

    orderedSlides.forEach(function (slide, index) {
      var notes = slide.querySelector(".notes-source");
      if (!notes) {
        notes = document.createElement("div");
        notes.className = "notes-source";
        slide.appendChild(notes);
      }

      notes.innerHTML = "";
      scripts[index].split(/\n\n+/).forEach(function (paragraph) {
        var line = document.createElement("p");
        line.textContent = paragraph;
        notes.appendChild(line);
      });
    });
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
      "Scope",
      "API usage",
      "Run it",
      "Will — Accounts & Panel",
      "Will — Code",
      "Aman — Pokédex",
      "Aman — Code",
      "Aman — Frontend architecture",
      "Albert — Battle",
      "Albert — Interactor",
      "Dorothy - Tournament demo",
      "Dorothy - Interactor",
      "Dorothy - Tournament architecture",
      "Dorothy - Tournament design",
      "Cindy — Create Pokémon",
      "Cindy — Code",
      "Edison — Custom Pokémon",
      "Edison — Class UML",
      "Clean Architecture",
      "SOLID",
      "Design patterns",
      "Code organization",
      "Code quality",
      "Testing",
      "Accessibility",
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
    applySpeakerScripts();
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
