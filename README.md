# Pokémon Battle Simulator — presentation site

The presentation website for Team 4's CSC207 project. It combines the slide deck, speaker notes,
project walkthrough, supporting images, and Q&A bank in one static page.

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

The timer turns **gold at 16:00** and **red at 19:00**. Rehearse to roughly 18 minutes so the team
keeps a full minute of buffer before the supplied 20-minute upper bound.

Every slide carries speaker notes. They are written to be read *before* presenting, not from the
podium — the individual rubric caps you at 3/5 on Verbal Presentation if you read from notes.

## Presentation media

All presentation media is committed under `assets/`; the deck does not reference temporary laptop
paths or require Google Drive during playback.

| File | Slide | Purpose |
| --- | --- | --- |
| `project-demo.mp4` | 3 | Three-minute walkthrough of the connected application workflows |
| `tournament-before.png` | 13 | Tournament setup before simulation |
| `tournament-during.png` | 13 | Four quarterfinal battles running concurrently |
| `tournament-after.png` | 13 | Completed bracket and champion |

The shared Drive recording was compressed to a GitHub-safe H.264/AAC MP4 while keeping a 720p
presentation resolution. Slide 13 uses three local stills so the before, during, and after views
remain visible while Dorothy explains the use case.

## Deck structure

1. Title
2. Introduction and team user story
3. Scope and complete project walkthrough
4. API usage — two concrete PokeAPI endpoints
5. Runnable artifact — clone, health check, generated JAR and frontend build
6.–20. Six individual sections with user stories, before/after evidence, interactors, and UML diagrams
21. Clean Architecture — the team user story through all four layers
22. SOLID — two tournament examples
23. Design patterns — the tournament match Strategy
24. Code organization and packaging
25. Code quality
26. Testing and coverage evidence
27. Accessibility and Universal Design
28. Summary and future work
29.–30. Q&A — 22 preloaded answers, click to reveal

Individual sections run in use-case order: Will (User Accounts and Trainer Panel) → Aman (Pokédex) → Albert (Single Battle) → Dorothy (Tournament) → Cindy (Build a Pokémon) → Edison (Battling with Custom Pokémon).

---

## Before you present — open items

These are gaps in the **project repo**, not in this deck. Each maps to a rubric category.

> **Updated 2026-08-09 against final `main` at `ad2ab75`.** PR #47
> (`dorothy/clean-architecture-readmes`) completed the use-case reorganization and documentation
> after the quality and architecture gates introduced in PR #40.

### 1. Rehearse the requested timing plan.

The requested section durations total about 23:45. That is longer than the earlier 20-minute group
rubric cap, so confirm the current cap before presenting. If 20 minutes is still strict, shorten the
project video or combine group sections rather than rushing every speaker.

Current requested budget:

| Time | Segment | Slides |
| --- | --- | --- |
| 0:00–0:15 | Title | 1 |
| 0:15–7:15 | Introduction, scope, and demo | 2–3 |
| 7:15–8:15 | API usage | 4 |
| 8:15–8:45 | Runnable artifact | 5 |
| 8:45–15:45 | Six individual sections | 6–20 |
| 15:45–16:45 | Clean Architecture | 21 |
| 16:45–18:45 | SOLID and design patterns | 22–23 |
| 18:45–22:45 | Organization, quality, testing, accessibility | 24–27 |
| 22:45–23:45 | Summary and future work | 28 |

The single pre-recorded walkthrough protects this budget. Use the tournament stills for the
rubric-critical before, during, and after states instead of repeating that workflow live.

### 2. ~~No accessibility report exists~~ — CLOSED

`docs/accessibility-report.md` covers all seven Universal Design principles as a general usability
review, plus the marketing audience and demographic barriers required by the assignment.

Real accessibility work landed with it: skip link, focusable main landmark, `:focus-visible`
styling, named modal dialogs with focus trapping and restoration, `aria-pressed` toggles,
`prefers-reduced-motion`, and component tests for modal keyboard behaviour.

**Still open, and slide 27 says so honestly:** the battle message box is not an `aria-live` region,
and the tournament bracket has no linear text equivalent. No screen-reader session has been run.

### 3. ~~No Checkstyle~~ — CLOSED

`maven-checkstyle-plugin` runs during Maven `validate` against `config/checkstyle/checkstyle.xml`.
CI now runs `./mvnw -B clean verify` and uploads the reports as artifacts.

### 4. ~~No coverage evidence~~ — CLOSED

JaCoCo on the backend, Vitest coverage on the frontend, **both gated** — the build fails below
threshold. CI uploads both reports. Both stacks were regenerated from final `main` on 2026-08-09:

| Area | Tests | Line | Branch |
| --- | ---: | ---: | ---: |
| Java backend | 309 | 90.00% | 75.99% |
| Java `use_case` | included above | 94.29% | 82.75% |
| TypeScript frontend | 324 | 89.79% | 77.42% |
| TypeScript `usecases` | included above | 95.67% | 87.96% |

That clears the Exceptional band (>90% interactor, >70% overall). Slide 26 now leads with these
percentages instead of test counts.

### 5. Backend boot — mostly confirmed

`scripts/verify.ps1` passed on final `main` on 2026-08-09. The Maven **wrapper is committed**
(`backend/mvnw`), so the backend needs a JDK but no separate Maven install; the complete app also
requires Node 22 for the frontend.

**Still worth doing once:** a genuine fresh `git clone` into an empty folder, both terminals, one
battle. Verification proves the tests; it does not prove `backend/cache/` and `backend/data/` get
created on a machine that has never run this before.

### 6. ~~Party switching may be unreachable~~ — RESOLVED, cut from the demo by decision

`frontend/src/usecases/singleBattleSetup.ts` still builds `party: [player]`, and **that is fine** —
the team decided not to demo switching. It stays in the codebase as an extension point.

The deck now frames it that way rather than promising it. Slide 11 carries a card saying parties and
`SwitchPokemon` are built and tested but deliberately not demoed, and that enabling them is a
setup-screen change with no entity, interactor or endpoint edits — which is open/closed evidence
rather than a gap. Its speaker notes say **do not narrate switching**, and there is a Q&A entry for
it if a grader asks.

Capability claims were tightened to match on slides 2, 3, 13, 25 and 26: the deck no longer tells
the audience a user can switch a Pokémon out, because on the shipped path they cannot.

**If anyone later changes the setup screen to build a real party, reverse all of that** — the deck
would then be understating what works.

### 7. ~~Confirm the user-story owners~~ — CONFIRMED by the team, 2026-08-08

Slide 3 now lists **seven use cases, all shipped**, in use-case order. The cut sharing story is gone from
the slide entirely, and the Status column went with it since every row was "Built".

| Use case | Owner |
| --- | --- |
| User Accounts | Will Xu |
| Trainer Panel | Will Xu |
| Pokédex | Aman Shah |
| Single Battle | Albert Wang |
| Tournament | Dorothy Zheng |
| Build a Pokémon | Cindy Liu |
| Battling with Custom Pokémon | Edison Cai |

Two things this correction changed beyond the table:

**"Yiming Xu" is Will.** The deck had the accounts section under Yiming Xu; the committer is
`Will-Xv <xuy413682@gmail.com>` and there is no separate Yiming in the history. Renamed throughout —
section headings, speaker tags, and avatar initials. The git
branch name `yiming/library-api` on slide 23 was **left alone**, because that is what the branch is
actually called. Will's section now covers both his use cases; his code slide was already
`AddToLibraryInteractor`, which is the Trainer Panel.

**Edison's headline use case moved.** His section led with the PokéAPI cache; his assigned use case
is Battling with Custom Pokémon. His story slide was rewritten to that — owner-scoped
storage, user-scoped API loading, sprite loading, custom entrants fighting like official ones —
and the project walkthrough shows the shared workflow.

**His code slide now uses `LoadCustomPokemonSpriteInteractor`.** That aligns the individual rubric
with his assigned use case: the project walkthrough shows a created Pokémon entering battle, and the
code/class-diagram slide explains the backend loading path behind that workflow. The catalog
and cache work still appears on the API Usage and SOLID slides as group-level evidence.

Note the earlier misattribution this fixed: the clean-architecture pass (PR #40) is **Dorothy's**, not
Cindy's. `cindy-pokemon-customization` is unmerged and carries only checkstyle fixes.

```bash
git log main --format='%an %s' --no-merges | sort | uniq -c | sort -rn
```

### 8. Verified numbers

Coverage now comes from the 2026-08-09 final JaCoCo and Vitest reports rather than source counting.
The deck says 633 tests: 309 backend plus 324 frontend, with 90.00% and 89.79% overall line coverage.

**If any code lands after 2026-08-09, re-run `scripts/verify.ps1` and update slides 26 and 5.**
Quoting stale coverage to a grader who can run the command themselves is worse than quoting none.

### 9. One genuinely new claim to sanity-check

Slide 21 now claims the dependency rule is **executable**: five ArchUnit rules in
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
