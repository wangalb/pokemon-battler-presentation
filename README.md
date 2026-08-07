# Pokémon Battle Simulator — presentation site

The demo website for Team 4's CSC207 project. It is the slide deck, the speaker notes, the demo
video shells and the Q&A bank in one static page.

Project repo: <https://github.com/aman-a-shah/pokemon-battler>

## Running it

No build step, no dependencies, no server needed. The three typefaces are self-hosted under
`assets/fonts/`, so the deck looks the same on a projector with no internet.

```bash
start index.html
```

If you prefer a local server (needed only if a browser blocks `file://` video playback):

```bash
npx serve .
```

## Presenting

| Key | Does |
| --- | --- |
| `→` `Space` | Next slide |
| `←` | Previous slide |
| `1`–`9` | Jump to that slide |
| `Home` / `End` | First / last slide |
| `N` | Speaker notes for the current slide |
| `O` | Grid of every slide, click to jump |
| `T` | Start / pause the timer |
| `R` | Reset the timer |
| `F` | Fullscreen |
| `H` or `?` | Shortcut list |
| `Esc` | Close any panel |

The timer turns **gold at 12:00** and **red at 15:00**, because 15 minutes is the hard limit in the
group rubric's Excellent band.

Every slide carries speaker notes. They are written to be read *before* presenting, not from the
podium — the individual rubric caps you at 3/5 on Verbal Presentation if you read from notes.

## Adding the demo recordings and screenshots

Drop files into `assets/` using the exact names below. The page picks them up automatically on
reload; anything missing keeps showing its dashed placeholder, so the deck always presents cleanly
even if a recording is not ready.

| File | Slide | What it should show |
| --- | --- | --- |
| `yiming-before.png` | Yiming | Login screen, signed out |
| `yiming-after.png` | Yiming | Main menu with role-gated panels |
| `aman-before.png` | Aman | Main menu before opening the Pokédex |
| `aman-after.png` | Aman | Pokédex grid + detail view with stat bars |
| `edison-before.png` | Edison | Empty `backend/cache/`, cold request |
| `edison-after.png` | Edison | `curl /api/pokemon/pikachu` and the warm cache |
| `cindy-before.png` | Cindy | Empty creation form |
| `cindy-after.png` | Cindy | The custom Pokémon sitting in the library |
| `albert-before.png` | Albert | Battle setup, both Pokémon at full HP |
| `albert-after.png` | Albert | A super-effective hit, HP bar dropping |
| `dorothy-before.png` | Dorothy | Setup screen: chosen entrants and `?` slots |
| `dorothy-after.png` | Dorothy | Populated bracket with a champion |

Video works too — name a file `*.mp4`, `*.webm` or `*.mov` and change the slot's `data-src` in
`index.html` to match. A `<video>` element with controls replaces the placeholder.

To add a slot somewhere new, copy this block:

```html
<div class="media-slot" data-src="assets/my-clip.mp4">
  <div class="placeholder"><span class="ph-icon">▣</span>What this will show<span class="ph-file">assets/my-clip.mp4</span></div>
</div>
```

## Deck structure

1. Title
2. Introduction
3. Specification
4. Scope — the nine blueprint user stories and who owns each
5. Architecture primer — read once, applies to all six individual sections
6.–17. Six individual sections, two slides each: **story + before/after**, then **interactor code + class diagram**
18. API usage
19. Clean Architecture deep dive
20. SOLID
21. Design patterns
22. Testing
23. Code quality
24. Code organization
25. Accessibility
26. Run it yourself
27. Limitations
28. Wrap
29. Q&A — 21 preloaded answers, click to reveal

Individual sections run in demo order: Yiming → Aman → Edison → Cindy → Albert → Dorothy.

---

## Before you present — open items

These are gaps in the **project repo**, not in this deck. Each maps to a rubric category, and each
one is fixable in an evening.

### 1. The rubric says 15 minutes. The old plan says 20.

`docs/presentation-plan.md` in the project repo lays out a 20-minute schedule. The group rubric you
were given caps the Excellent band at **15 minutes**, and requires that every member speaks. That is
a 25% cut, and it lands hardest on the two segments that always overrun — architecture and the demo.

Suggested 15-minute budget:

| Time | Segment | Slides |
| --- | --- | --- |
| 0:00–2:00 | Intro, specification, scope | 1–4 |
| 2:00–3:00 | Architecture primer | 5 |
| 3:00–9:00 | Six individual sections, ~1 min each | 6–17 |
| 9:00–11:00 | API, Clean Architecture, SOLID, patterns | 18–21 |
| 11:00–13:00 | Testing, code quality, organization, accessibility | 22–25 |
| 13:00–14:00 | Run it, limitations | 26–27 |
| 14:00–15:00 | Wrap | 28 |

One minute each means the demos must be **recorded and pre-trimmed**. Live clicking will not fit.

### 2. No accessibility report exists

There is no accessibility Markdown file anywhere in the project repo. The rubric requires one
containing **all** the Universal Design principles; without it that category scores 1/5 out of 5.

A draft covering all seven principles is in this repo as
[`accessibility-report-draft.md`](accessibility-report-draft.md). **Review it as a team, correct
anything you disagree with, then commit it to the project repo** — it describes your app, and it
should be in your words, not a starting draft's.

### 3. No Checkstyle

CI runs `mvn -B test` but no style check on the Java side. The Code Quality rubric names Checkstyle
explicitly: without a tool like it you cannot score above 3/5. Adding it is a plugin block in
`pom.xml` and one step in `.github/workflows/ci.yml`.

### 4. No coverage evidence

The Testing rubric wants **evidence of code coverage** from 2/5 upward — a coverage report, not a
test count. Slide 22 currently shows counts. Run IntelliJ's coverage tool or add JaCoCo, screenshot
the result, and put it on that slide. Targets: >70% interactor line coverage for Excellent, >90% for
Exceptional, with >50%/>70% overall.

### 5. Nobody has confirmed the backend boots

`mvn test` and `mvn spring-boot:run` have not been run on Albert's machine (no Java, no Maven), and
`backend/cache/` and `backend/data/` have never been created there. Boot has broken once before —
commit `8ea562a`, *"make the backend start again by wiring the create-Pokemon beans"* — and
`TournamentConfiguration` and `CreatePokemonRestController` both landed after that fix.

Before recording anything, on a machine with Maven:

```bash
cd backend && mvn test && mvn spring-boot:run
```

Then exercise all three backend paths by hand: one battle, one tournament round, one custom Pokémon.

### 6. Party switching may be unreachable in the running app

Per `docs/presentation-plan.md` §1.2, every playable route into the arena builds a party of one
(`usecases/singleBattleSetup.ts`), so the party screen and switching are invisible even though the
backend, the use cases and their tests all support them. **Either fix the setup screen to hand the
player three party members, or cut switching from the demo** — do not narrate a feature the screen
cannot show. Slide 14 currently lists switching as demoable.

### 7. Confirm the user-story owners

The owner column on slide 4, and the six individual sections, were reconstructed from commit history
and branch names. It is a good-faith reading, not an authoritative one. **Each person should confirm
their own row before you present** — a wrong attribution in front of the graders is worse than any
formatting issue in this deck.

### 8. Verified numbers

Two numbers on the deck were measured on 2026-08-07 against the local checkout:

- **311 frontend tests across 42 files** — `npm test`, all passing. Verified.
- **223 Java test methods across 38 files** — counted `@Test` occurrences. **Not executed**; no Maven
  on this machine. Run `mvn test` and replace this with the real pass count before presenting.

## Submission checklist

From the course submission page:

- [ ] GitHub link to the project repo
- [ ] `ai.txt` — required; if the team used no AI, you must say so explicitly
- [ ] `slides.pdf` (or `.pptx`, or any format) — listed as required to remind you to upload slides.
      This deck prints to PDF with `Ctrl+P` → Save as PDF; the print stylesheet puts one slide per
      page and hides the chrome.
- [ ] Submit **before** the presentation
