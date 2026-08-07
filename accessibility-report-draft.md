# Accessibility Report — Pokémon Battle Simulator

> **This is a draft.** It was written by reading the code, not by testing the app with assistive
> technology. Review it as a team, correct anything you disagree with, put it in your own words, and
> then commit it to the project repo. Claims you have not verified should be cut rather than softened.

## 1. The seven Principles of Universal Design

### Equitable Use

*The design is useful and marketable to people with diverse abilities.*

Everyone reaches the same features through the same screens — there is no simplified or degraded
mode. Guest mode means the app is usable without creating an account, so someone unable or unwilling
to manage a password still gets the full Pokédex and battle experience.

**Where we fall short:** the app is effectively single-modality. A player who cannot see the sprites
and HP bars does not get an equivalent experience, only a worse one. See §3.

### Flexibility in Use

*The design accommodates a wide range of individual preferences and abilities.*

- A tournament bracket can be filled entirely by hand, entirely at random, or any mix — a player who
  finds choosing eight Pokémon tedious can leave every slot open and press start.
- Pokémon can be found by scrolling the grid, by typing a name, or by filtering to a type.
- A battle can be played move by move, or a tournament can be run and skipped to results.

### Simple and Intuitive Use

*Use of the design is easy to understand, regardless of experience or concentration level.*

The main menu shows only the panels the current role can actually open, so there are no dead ends to
discover by trial and error. Battle actions are a fixed set of four — fight, bag, party, run — in the
same place every turn. Damage outcomes are explained in words ("It's super effective!") rather than
requiring the player to know the 18-type chart.

### Perceptible Information

*The design communicates necessary information effectively regardless of ambient conditions or the
user's sensory abilities.*

HP is communicated three ways at once: a numeric value, a bar length, and a colour that shifts as it
drops. Type effectiveness is stated in text, never by colour alone. Move types are labelled with
their name as well as their colour.

**Where we fall short:** this is where our worst gap is. See §3.

### Tolerance for Error

*The design minimizes hazards and the adverse consequences of accidental or unintended actions.*

This is the principle the design engages with most deliberately:

- An item that would do nothing — a Potion on a full-HP Pokémon, a Revive on a healthy one — is
  **refused rather than consumed**. A mistaken tap costs the player neither the item nor the turn.
- Poké Balls and stat boosters are refused with a reason, because the simplified battle system does
  not model catching or stat stages. They are modelled and explained, not silently ignored.
- `Battle.resume()` rejects impossible states — HP above maximum, negative HP, an active index
  outside the party — so a corrupted state fails loudly instead of producing a nonsense battle.
- Creating a Pokémon with a blank name or a non-positive stat is rejected with the reason, not
  silently accepted.
- An admin deleting a user performs a **soft delete with 60-day restore**, so the most destructive
  action in the app is reversible for two months.

### Low Physical Effort

*The design can be used efficiently and comfortably with a minimum of fatigue.*

A full battle is a handful of clicks. A tournament is one click per round rather than one per turn —
the simulation runs the matches. Nothing requires dragging, precise pointing, timed input, or
sustained holding.

**Where we fall short:** every interaction is a click, and we did not test keyboard-only navigation.
See §3.

### Size and Space for Approach and Use

*Appropriate size and space is provided for approach, reach, manipulation and use.*

Battle action buttons and Pokédex cards are large click targets, and the layout is a desktop-width
grid with generous spacing rather than a dense toolbar.

**Where we fall short:** the app assumes a desktop-sized viewport. It was not designed or tested for
phones or tablets, and there is no zoom or text-size control beyond the browser's own.

## 2. Target users

The people we designed for: **Pokémon fans, roughly age 10 and up, on a desktop or laptop browser**,
who want to settle a "who would win" argument without owning the games or grinding levels.

We assumed:

- Familiarity with Pokémon as a concept — names, the idea of types, the idea of a battle — but *not*
  memorised knowledge of the type chart, which is why every hit's effectiveness is stated in words.
- Reading comfort at roughly a middle-school level. Battle messages are short sentences.
- A desktop or laptop with a mouse and a modern browser.
- No account or payment. Guest mode exists so the barrier to a first battle is a single click.

Marketing this program: it would reach its users through Pokémon fan communities, subreddits and
Discords — places where the "who would win" argument already happens daily and where a link that
settles it in fifteen seconds spreads on its own merit. It is free, needs no install, and needs no
account, all of which suit that channel.

## 3. A group who may struggle to use the program

**Players who are blind or have low vision, and who use a screen reader.**

Using the terminology from the E3I modules, this is a **barrier arising from a mismatch between the
design and the user**, not from the user's disability — the information the player needs exists in
our program, we simply did not expose it in a perceivable form.

Concretely, in our code today:

- **Sprites carry no meaningful alternative text.** A screen reader announces an image with nothing
  useful to say about it, so which Pokémon is on screen is not conveyed.
- **The battle message box is not marked as a live region.** When a turn resolves, the message
  updates silently. A screen reader user would know they pressed a button but not learn that the
  attack missed, was super effective, or knocked something out — which is the entire content of a
  turn.
- **HP is conveyed by a bar whose value is not exposed programmatically.** The visual bar is a styled
  `div`, not a `progressbar` role with `aria-valuenow`, so the numeric HP is available on screen but
  the *change* is not announced.
- **The tournament bracket is a spatial layout.** Who advanced to play whom is expressed by position
  on screen; there is no linear reading order that conveys the same structure.

A second, overlapping group: **players who cannot use a mouse**. The app is click-driven, and
keyboard-only navigation was never tested. Overlays — the bag, the party screen — do not trap or
restore focus, so a keyboard user could plausibly open one and be unable to get out of it.

We did not discover these by testing with assistive technology; we found them by reading our own
components. That itself is a finding worth stating: **no member of the team tested this app with a
screen reader or with a keyboard alone**, and accessibility was not part of any pull request review.

### What we would do about it

In order of how much each buys per hour of work:

1. Give the battle message box `role="status"` and `aria-live="polite"`. One attribute pair makes the
   single most important piece of battle state audible.
2. Give sprites real alt text — the Pokémon's name and current state.
3. Give the HP bar `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`.
4. Add focus management to the bag and party overlays, and test one full battle with the mouse
   unplugged.
5. Give the bracket a screen-reader-only text summary of each round's matchups and winners.

None of these change any use case, any interactor or any entity. All of them live in
`frontend/src/components/`, which is a consequence of the architecture: the presentation layer is
where presentation problems can be fixed.
