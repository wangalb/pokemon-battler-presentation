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

## Adding the demo recordings

Each user story gets **one pre-recorded clip**, not a before/after screenshot pair. Drop the files
into `assets/` using the exact names below. The page picks them up on reload; anything missing keeps
its dashed placeholder, so the deck always presents cleanly even if a recording is not ready.

Aim for **~45 seconds each**, pre-trimmed. At six clips that is 4:30 of the 15 minutes, which is
what the one-minute-per-section budget allows.

| File | Slide | Beats the clip has to hit |
| --- | --- | --- |
| `will-demo.mp4` | Will | Sign up as `PLAYER` → menu shows only the panels that role can reach → add one from the Pokédex and the trainer panel holds it → sign up again with the `developer` invite code and Dev Tools appears → sign in with Google as an existing admin and the Admin Panel appears |
| `aman-demo.mp4` | Aman | Open the Pokédex → search and filter by type → detail view with real stat bars → save one to the library |
| `edison-demo.mp4` | Edison | Cindy's custom Pokémon in the library → pick it as a battle entrant → its uploaded sprite loads in the arena → it takes and deals damage |
| `cindy-demo.mp4` | Cindy | Empty creation form → validation rejects a bad stat → upload a sprite and pick moves → it appears in the library |
| `albert-demo.mp4` | Albert | Setup at full HP → super-effective hit, HP drops → an item that would do nothing is refused → faint ends the battle |
| `dorothy-demo.mp4` | Dorothy | Hand-pick entrants leaving `?` slots → open slots fill at random → round resolves → bracket completes with a champion |

The beats are also printed on each slide under the video, so the slide still communicates while the
clip is paused on its first frame — and if a recording is missing entirely, the section is still
presentable.

**Cindy's slide carries both.** `cindy-before.png` and `cindy-after.png` are already captured and
committed, so they stay beneath her clip slot rather than being deleted — the section has real
media today and upgrades to video when `cindy-demo.mp4` lands. Delete the `before-after` block on
that slide once the clip exists, or keep both if you prefer the stills as a fallback.

`.webm` and `.mov` work too; change the slot's `data-src` in `index.html` to match. A still `.png`
also works if a clip falls through — the loader swaps in an `<img>` instead of a `<video>`.

To add a slot somewhere new, copy this block:

```html
<div class="demo">
  <div class="ba-label">Recorded demo · ~45s</div>
  <div class="media-slot" data-src="assets/my-clip.mp4">
    <div class="placeholder"><span class="ph-icon">▶</span>What this will show<span class="ph-file">assets/my-clip.mp4</span></div>
  </div>
  <ol class="demo-beats"><li>First beat</li><li>Second beat</li></ol>
</div>
```

## Deck structure

1. Title
2. Introduction
3. Specification
4. Scope — the seven shipped use cases and who owns each
5. Architecture primer — read once, applies to all six individual sections
6.–17. Six individual sections, two slides each: **story + recorded demo**, then **interactor code + class diagram**
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
29. Q&A — 22 preloaded answers, click to reveal

Individual sections run in demo order: Will → Aman → Edison → Cindy → Albert → Dorothy.

---

## Before you present — open items

These are gaps in the **project repo**, not in this deck. Each maps to a rubric category.

> **Updated 2026-08-08 against `main` at `bd0b4ef`.** PR #40 (`dorothy/final-quality-updates`)
> closed items 2, 3, 4 and most of 5. What remains is below. Note that the clean-architecture and
> quality pass was **Dorothy's** work, not Cindy's — `cindy-pokemon-customization` is an unmerged
> branch carrying only checkstyle fixes on top of older `main`.

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

One minute each means the demos must be **recorded and pre-trimmed** — which is now the plan. Each
individual section is a ~45s clip plus ~15s of speaking, and the deck has one video slot per story
sized for exactly that. Live clicking will not fit, and it is the single most common way a group
overruns.

### 2. ~~No accessibility report exists~~ — CLOSED

`docs/accessibility-report.md` now covers all seven Universal Design principles plus a manual
acceptance checklist. `accessibility-report-draft.md` in this repo is superseded and can be deleted.

Real accessibility work landed with it: skip link, focusable main landmark, `:focus-visible`
styling, named modal dialogs with focus trapping and restoration, `aria-pressed` toggles,
`prefers-reduced-motion`, and component tests for modal keyboard behaviour.

**Still open, and slide 25 says so honestly:** the battle message box is not an `aria-live` region,
and the tournament bracket has no linear text equivalent. No screen-reader session has been run.

### 3. ~~No Checkstyle~~ — CLOSED

`maven-checkstyle-plugin` runs during Maven `validate` against `config/checkstyle/checkstyle.xml`.
CI now runs `./mvnw -B clean verify` and uploads the reports as artifacts.

### 4. ~~No coverage evidence~~ — CLOSED

JaCoCo on the backend, Vitest coverage on the frontend, **both gated** — the build fails below
threshold. CI uploads both reports. Backend refreshed 2026-08-08; frontend retained from 2026-08-07:

| Area | Tests | Line | Branch |
| --- | ---: | ---: | ---: |
| Java backend | 308 | 90.00% | 75.99% |
| Java `use_case` | — | 94%+ | — |
| TypeScript frontend | 325 | 90.01% | 77.62% |
| TypeScript `usecases` | — | 95.67% | 87.95% |

That clears the Exceptional band (>90% interactor, >70% overall). Slide 22 now leads with these
percentages instead of test counts.

### 5. Backend boot — mostly confirmed

`scripts/verify.ps1` passed on 2026-08-07, so `clean verify` works and the Maven **wrapper is now
committed** (`backend/mvnw`) — a fresh clone needs only a JDK, no Maven install. That removes the
old blocker.

**Still worth doing once:** a genuine fresh `git clone` into an empty folder, both terminals, one
battle. Verification proves the tests; it does not prove `backend/cache/` and `backend/data/` get
created on a machine that has never run this before.

### 6. ~~Party switching may be unreachable~~ — RESOLVED, cut from the demo by decision

`frontend/src/usecases/singleBattleSetup.ts` still builds `party: [player]`, and **that is fine** —
the team decided not to demo switching. It stays in the codebase as an extension point.

The deck now frames it that way rather than promising it. Slide 14 carries a card saying parties and
`SwitchPokemon` are built and tested but deliberately not demoed, and that enabling them is a
setup-screen change with no entity, interactor or endpoint edits — which is open/closed evidence
rather than a gap. Its speaker notes say **do not narrate switching**, and there is a Q&A entry for
it if a grader asks.

Capability claims were tightened to match on slides 2, 3, 4, 14, 27 and 28: the deck no longer tells
the audience a user can switch a Pokémon out, because on the shipped path they cannot.

**If anyone later changes the setup screen to build a real party, reverse all of that** — the deck
would then be understating what works.

### 7. ~~Confirm the user-story owners~~ — CONFIRMED by the team, 2026-08-08

Slide 4 now lists **seven use cases, all shipped**, in demo order. The cut sharing story is gone from
the slide entirely, and the Status column went with it since every row was "Built".

| Use case | Owner |
| --- | --- |
| User Accounts | Will Xu |
| Trainer Panel | Will Xu |
| Pokédex | Aman Shah |
| Battling with Custom Pokémon | Edison Cai |
| Build a Pokémon | Cindy Liu |
| Single Battle | Albert Wang |
| Tournament | Dorothy Zheng |

Two things this correction changed beyond the table:

**"Yiming Xu" is Will.** The deck had the accounts section under Yiming Xu; the committer is
`Will-Xv <xuy413682@gmail.com>` and there is no separate Yiming in the history. Renamed throughout —
section headings, speaker tags, avatar initials, and `yiming-demo.mp4` → `will-demo.mp4`. The git
branch name `yiming/library-api` on slide 23 was **left alone**, because that is what the branch is
actually called. Will's section now covers both his use cases; his code slide was already
`AddToLibraryInteractor`, which is the Trainer Panel.

**Edison's headline use case moved.** His section led with the PokéAPI cache; his assigned use case
is Battling with Custom Pokémon. His story slide and demo beats were rewritten to that — owner-scoped
storage, user-scoped API loading, sprite loading, custom entrants fighting like official ones —
and his clip now picks up where Cindy's ends.

**His code slide now uses `LoadCustomPokemonSpriteInteractor`.** That aligns the individual rubric
with his assigned use case: before/after demo beats show a created Pokémon entering battle, and the
code/class-diagram slide explains the backend loading path behind that workflow. The catalog
and cache work still appears on the API Usage and SOLID slides as group-level evidence.

Note the earlier misattribution this fixed: the clean-architecture pass (PR #40) is **Dorothy's**, not
Cindy's. `cindy-pokemon-customization` is unmerged and carries only checkstyle fixes.

```bash
git log main --format='%an %s' --no-merges | sort | uniq -c | sort -rn
```

### 8. Verified numbers

Backend coverage on the deck now comes from the 2026-08-08 JaCoCo verification pass rather than
from counting `@Test` occurrences. The deck says 633 tests, 90.0% / 90.0% line coverage, and 40
merged pull requests.

**If any code lands after 2026-08-08, re-run `scripts/verify.ps1` and update slides 22 and 28.**
Quoting stale coverage to a grader who can run the command themselves is worse than quoting none.

### 9. One genuinely new claim to sanity-check

Slide 19 now claims the dependency rule is **executable**: four ArchUnit rules in
`backend/src/test/java/architecture/CleanArchitectureTest.java` and three import rules in
`frontend/src/__tests__/architecture.test.ts`, both running in CI. This is the deck's strongest
Clean Architecture evidence, so make sure whoever presents it can open both files on demand.

## Submission checklist

From the course submission page:

- [ ] GitHub link to the project repo
- [ ] `ai.txt` — **started, not finished.** The file now exists at the root of the project repo with
      Albert's section complete and a per-person template. **Five sections are still placeholders**
      (Dorothy, Aman, Cindy, Will, Edison) — each person must write their own; nobody can declare
      another person's AI use for them. If you used none, the file must say so explicitly.
- [ ] `slides.pdf` (or `.pptx`, or any format) — listed as required to remind you to upload slides.
      This deck prints to PDF with `Ctrl+P` → Save as PDF; the print stylesheet puts one slide per
      page and hides the chrome.
- [ ] Submit **before** the presentation
