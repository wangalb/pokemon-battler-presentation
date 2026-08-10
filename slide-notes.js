/* Spoken script shown in the Notes panel for slides 1-30. */
window.SLIDE_SCRIPTS = [
  `We built Pokemon Battler. We are Will, Aman, Albert, Dorothy, Cindy, and Edison. Each person owns a different user story, and those stories connect into one application. We will start with what a player can do, then show how the architecture keeps those features connected without mixing their responsibilities.`,

  `Our team user story is: As a Pokemon fan, I want to explore official and custom Pokemon through battles and tournaments, so I can compare them in one app.

The product is for someone who wants to answer a familiar question: which Pokemon would win? A player can browse real Pokemon data, save favourites, create a Pokemon, choose competitors, play a single battle, or run an eight-entry tournament. Accounts keep each trainer's collection separate, and custom Pokemon can join the same battles and tournaments as official Pokemon. A player does not need to understand the architecture or manage data files. The screens guide them from discovery to selection and then to a result.

The result is one connected experience. You can discover a Pokemon, inspect its stats and moves, save it, compare it in battle, then place it in a tournament. Or you can invent a Pokemon first and use it in those same workflows. The app shows the selections, health, battle messages, round winners, and final champion. Random slots let someone begin quickly, while manual selection gives them control over a matchup.

That is the product we set out to make. We will explain how it is designed later. For now, the important point is what a player can do and how the seven stories combine into one complete path.`,

  `We divided that team story into seven use cases. Will owns accounts and the Trainer Panel. Aman owns the Pokedex. Albert owns Single Battle. Dorothy owns Tournament. Cindy owns Build a Pokemon. Edison owns battling with custom Pokemon. The Trainer Panel and account work are closely related, but they remain separate user-facing actions within Will's part of the project.

The walkthrough shows those use cases as a player sees them. Watch for the main menu, real Pokemon data, the trainer collection, battle selection and results, tournament progression, and a custom Pokemon entering the same game. The video focuses on outcomes rather than source code: a trainer starts with choices, takes an action, and sees a clear result.

These features are separate enough for six people to own, but they work together. Accounts identify the trainer. The Pokedex and creation flow supply competitors. The Trainer Panel keeps a personal collection. Single Battle resolves the game rules, and Tournament reuses those rules across several matches. Custom Pokemon cross those boundaries without creating a second version of combat. The next sections explain each story and show where it belongs in the architecture.`,

  `We use PokeAPI for official Pokemon data. I will focus on two endpoints because they directly support the features in the demonstration.

GET slash pokemon slash name-or-id gives us a Pokemon's HP, attack, defense, speed, weight, types, move pool, and sprite references. Those fields support the Pokedex detail view, battle and tournament selection, entity construction, and random tournament slots. We map the API response into our own Pokemon shapes before the rest of the program uses it, so screens and use cases do not depend on PokeAPI's JSON structure.

GET slash move slash name-or-id gives us a move's power, type, and accuracy. Those are the values the battle rules need when a turn is resolved. Status moves with no implemented damage effect are excluded, and Struggle is supplied when no usable damaging move remains.

PokeAPI is public and requires no API key. Calls are kept at the outer data-access edge, and cached data helps avoid repeating the same network work. These two endpoint families provide the official data needed by the user-visible features we just demonstrated.`,

  `The repository documents one path from a clean clone to a running app. Java 17 or newer runs the executable Spring Boot JAR, Node 22 runs the frontend, and the Maven Wrapper is committed so a separate Maven installation is optional. The backend health endpoint confirms the API is ready before the frontend is opened. The README also lists the commands, ports, and common setup errors, so another person can reproduce the demonstration without using our IntelliJ configuration.`,

  `My user story is: As a returning trainer, I want an account and profile so that my identity and collection persist. Before login there is no personal collection and protected actions have no owner. After login, the menu reflects the user's role and the Trainer Panel shows Pokemon saved by that trainer.

The flow also distinguishes player, developer, and administrator permissions. That matters because viewing a collection and managing another account are different actions. The result is not just a successful login message; it is an identity that the library, custom Pokemon, and selection use cases can consistently reference.`,

  `This follows Clean Architecture. The View sends input to a Controller, which constructs Input Data and calls an Input Boundary. The Interactor applies the account or library policy and depends on repository interfaces owned by the use-case layer. A Presenter turns Output Data into a View Model that the screen can render.

The use case does not depend on React, local storage, JSON files, or a concrete repository. File-based adapters implement the required interfaces from the outside. Access rules also live in policy objects rather than being repeated as button checks in each screen. That means a different interface could call the same use case and receive the same decision. The diagram and boundary direction are the key evidence; the important part is who depends on whom, not a line-by-line code walkthrough.`,

  `My user story is: As a trainer, I want to browse available Pokemon and save favourites so that I can make informed battle selections. The before view is the complete catalog. The after view is a searched or type-filtered result with a loaded detail card, and the selected Pokemon can be saved to the trainer's library.

The user can search by name or dex number, combine type filters, inspect base stats and moves, and see weaknesses computed from the shared type chart. The screen loads summaries for browsing and only fetches the heavier detail data for the selected entry. This keeps the catalog responsive while still presenting enough information to choose a competitor.`,

  `The search, filtering, sorting, and weakness calculations are application rules in plain TypeScript use-case functions. They accept domain data and return domain data, without React state, fetch calls, or browser storage. Because they are pure, their edge cases can be tested with simple arrays instead of rendering a page.

React components render the result, hooks coordinate screen state, domain interfaces hold the core species data, and services isolate PokeAPI and custom-Pokemon details. The hook decides when to load and what the selected entry is, but delegates matching rules to the use-case module. Dependencies point from those outer details toward the domain and use cases. Architecture tests reject imports that point the wrong way. That is how this user story becomes an application use case instead of search logic embedded in a component.`,

  `This UML shows the same Pokédex flow as concrete modules and interfaces. PokedexView and PokedexScreen are Frameworks and Drivers. useLibraryPokedex and usePokedex are Interface Adapters: they translate React events and asynchronous results into the PokedexState View Model. The pure pokedex use-case module performs search, filtering, type discovery, and conversion to library data.

SpeciesSummary is the small domain interface used by the grid. PokemonSpecies extends it with full stats, abilities, measurements, and moves for the detail view. That substitution lets one search implementation work with either level of data. The PokeAPI gateway is outside these rules and maps remote responses into those domain interfaces. The dashed dependencies show outer modules naming inner types, while the domain remains independent of React and fetch.`,

  `My user story is: As a player, I want to choose two Pokemon and run one battle so that I can compare them. These three screenshots are the before, during, and after views. Before, the setup screen holds a chosen Pokemon in each slot, here Rayquaza against Groudon Primal. A question-mark slot can be filled randomly, and either choice can be changed before the battle starts.

During, the arena shows both Pokemon at full HP. The player selects actions, and each completed turn updates health, remaining resources, and the battle message. After, the result panel names the winner and the losing Pokemon is at zero HP. The screen makes the state transition visible instead of asking the player to infer it from a log.

Every turn in that middle screen is a real round trip to the Java backend. Speed decides who strikes first, damage comes from power, attack over defense, same-type bonus, critical hits, and the shared type chart, and a faint ends the battle. The frontend displays the returned result rather than reimplementing those rules.`,

  `ResolveTurnInteractor is the Use Case Interactor for a single battle. It orders one turn: reject a finished battle, find the move the player chose, ask the move selector for the opponent's, decide who strikes first, and return one TurnResult. The arithmetic is not here. BattleSimulator and the other Entities own accuracy, critical hits, type effectiveness, and damage.

The diagram maps the same path to Clean Architecture. The React arena and web gateway are Frameworks and Drivers, BattleController is an Interface Adapter, the Input Boundary and Interactor are Application Business Rules, and the combat objects are Entities. Runtime control travels outward while source-code dependencies point inward.

Dependency Inversion is visible at the boundary. BattleController depends on ResolveTurnInputBoundary, never on the concrete Interactor, which realizes that boundary. OpponentMoveSelector is a Strategy and Random is injected, so tests choose the rolls and the turn is deterministic.`,

  `My user story is: As a player, I want to run an eight-entrant knockout tournament so that I can see one champion. These screenshots show the before, during, and after views. The player chooses entrants or leaves slots random, then four quarterfinals run together. Winners return to the bracket, advance through eight, four, two, and one, and the final view names the champion.

Each matchup is one complete battle. HP and battle state reset before the next round because every matchup receives a fresh Battle entity. The bracket keeps the user-selected ordering, so placement determines the opening matchups rather than silently reshuffling them.`,

  `RunTournamentRoundInteractor is the Use Case Interactor. Its responsibility is to coordinate one round: load or create the tournament, read the current entrants, pair adjacent Pokemon, submit each matchup to a match runner, join the completed results, record the winners, save the aggregate, and prepare output.

The Tournament entity protects bracket order and valid progression. TournamentRound checks the required match count for the round, and TournamentMatch ensures its winner was actually one of its two participants. Persistence and display formatting stay outside those entities. The code on the slide identifies the Interactor and its collaborators; the architectural point is that orchestration and validation are separate responsibilities.`,

  `The UML maps the tournament use case to four Clean Architecture layers. React, HTTP, Spring configuration, and the Executor are Frameworks and Drivers. The web Controller and TournamentRoundPresenter are Interface Adapters. RunTournamentRoundInteractor and its boundaries are Application Business Rules. Tournament, TournamentRound, TournamentMatch, and Pokemon are Entities.

The Interactor depends on interfaces owned by its use-case layer: TournamentMatchRunner, data-access ports, an ID generator, and an Output Boundary. Concrete runners, repositories, and presenters point back toward those abstractions. That is the Dependency Rule in source code. The diagram also shows composition: a Tournament owns its completed rounds, and each round owns its matches, so bracket consistency is protected by the aggregate rather than reconstructed in the View.`,

  `TournamentMatchRunner is a Strategy. It defines the result the tournament needs without deciding how a match is simulated. RandomBattleRunner is the production implementation, while tests replace it with a fixed runner that returns known winners. The Interactor does not branch on which implementation it receives.

RandomBattleRunner calls Albert's ResolveTurnInputBoundary, so tournament reuses the existing single-battle logic rather than copying speed, damage, accuracy, or fainting rules. It selects available moves until the battle ends and returns a TournamentMatch. A new Battle is created for every matchup, which resets HP and temporary state between rounds. Finally, an injected Executor lets the four or two independent matches in one round run concurrently while the Interactor still records the results in bracket order.`,

  `My user story is: As a creative player, I want to build a valid custom Pokemon so that I can use my own competitor. The before view is an empty form where the player chooses a name, types, stats, moves, and artwork. Invalid values remain visible with a specific explanation instead of clearing the player's work.

The after view is a saved Pokemon in that trainer's collection with the chosen values and sprite. Validation covers required text, stat ranges, allowed types, move data, duplicate names, and image handling. Saving it to the library connects creation to the Trainer Panel and later selection instead of leaving the result isolated in a separate editor.`,

  `The View gives Input Data to a Controller and Input Boundary. CreatePokemonInteractor validates the request and depends on CustomPokemonRepository, ImageRepository, account data, and the existing add-to-library boundary. The Presenter reports success or failure through a response and View Model rather than exposing repository exceptions to the screen.

Construction happens in CreatePokemonFactory, an outer Interface Adapter. It creates the Presenter and Interactor, injects the repository and boundary dependencies, and returns one ready Controller. The creation rule therefore stays independent of React, HTTP, and file storage. Tests can replace every external collaborator, while production configuration supplies the file-backed implementations.`,

  `My user story is: As a custom-Pokemon creator, I want my creations in battles and tournaments so that creating one changes the playable experience. Before this use case, the Pokemon is saved in its owner's collection but does not automatically prove that every game mode can load it. Afterward, it appears beside official Pokemon in selection, keeps its custom stats, moves, types, and sprite, and can win a battle or advance through a tournament.

The important user-facing result is consistency. A player does not enter a special custom-only mode or learn different controls. Ownership is still respected when data and artwork are loaded, but once the Pokemon becomes a combat entity, the ordinary battle and bracket rules apply to it.`,

  `The UML shows that custom Pokemon reuse the ordinary Pokemon, Move, Battle, and Tournament entities. There is no second combat model and no duplicate damage formula. Data from the saved custom definition is mapped into the same entity shape used for official competitors.

Interactors depend on CustomPokemonRepository and ImageRepository interfaces owned by the inner layer, while file-backed adapters implement those interfaces outside it. The sprite-loading Interactor verifies that the requested artwork belongs to the named Pokemon and owner before returning bytes. Battle and tournament loaders can therefore support another data source without changing combat rules. This keeps the custom-Pokemon story inside the same Clean Architecture boundaries and avoids an inheritance hierarchy that would make official and custom Pokemon behave differently.`,

  `We can use the team user story to trace the architecture of the whole program. A player acts in a View. A Controller translates that action into Input Data and calls an Input Boundary. An Interactor coordinates the application rule. Entities protect rules shared across screens, such as battle state, tournament progression, Pokemon data, and account policy. Data-access interfaces state what the use case needs, and Gateways implement those interfaces using files, PokeAPI, or memory. Results return through an Output Boundary and Presenter to a View Model.

The SVG shows representative classes from all major features in those four layers, with at most a few examples per row so the direction stays readable. Frameworks and Drivers contain React, Spring, HTTP, storage, and external services. Interface Adapters translate formats. Application Business Rules hold boundaries and Interactors. Enterprise Business Rules hold the entities.

The Dependency Rule is about source code: dependencies point inward toward policy. Runtime calls can travel both directions because inner-owned interfaces invert the source dependency. Five Java ArchUnit rules and three TypeScript import rules enforce that structure in CI, so the diagram is backed by executable checks rather than folder names alone.`,

  `We will discuss Single Responsibility and Dependency Inversion in depth, then connect them to other features.

For Single Responsibility, RunTournamentRoundInteractor coordinates one round. Tournament validates bracket progression. RandomBattleRunner simulates one match. TournamentRoundPresenter formats the result. Those are separate reasons to change. A new bracket rule changes the entity, a new simulation changes the runner, and a new response format changes the Presenter. The same separation appears in the Pokedex: pure search functions decide what matches, the hook manages React state, and the gateway fetches remote data.

For Dependency Inversion, high-level policy names abstractions that it owns. The tournament Interactor depends on TournamentMatchRunner and repository interfaces, not RandomBattleRunner or a map. BattleController depends on ResolveTurnInputBoundary rather than ResolveTurnInteractor. Custom-Pokemon Interactors depend on CustomPokemonRepository and ImageRepository rather than file classes. Concrete outer adapters implement those ports.

The payoff is visible in both extension and testing. Production can swap a runner, move selector, or repository at the composition root. Tests provide fixed implementations without network, disk, or random outcomes. Open/Closed and Interface Segregation support this design too: narrow ports let a new implementation be added without expanding every client or editing stable Interactors.`,

  `Strategy is the clearest behavioural pattern in our battle code. MoveSelector defines how a Pokemon chooses a move. RandomOpponentMoveSelector is the production Strategy, while tests inject a fixed selector. ResolveTurnInteractor, SwitchPokemonInteractor, and UseItemInteractor ask the abstraction for a choice without knowing the algorithm. Tournament uses the same idea at a larger scale: TournamentMatchRunner defines one matchup, RandomBattleRunner implements it, and tests can supply predetermined winners.

A second pattern appears in custom-Pokemon creation: Simple Factory. CreatePokemonFactory receives the repositories and existing account and library boundaries, creates a Presenter and CreatePokemonInteractor, and returns a fully wired Controller. The web layer asks for the finished collaborator instead of knowing the construction order. This concentrates wiring in one outer-layer class and keeps constructors out of request handling.

We also use cache-aside for official data. CachedPokeApiDataAccess checks local cached data, falls through to PokeAPI on a miss, then stores the result. The use cases still depend on narrow data-access interfaces, so caching does not leak into their rules. Across these examples, the patterns solve concrete problems: selectable behaviour, object assembly, and avoiding repeated remote calls.`,

  `Our packaging is hybrid. At the top, backend packages represent Clean Architecture layers: entity, use_case, interface_adapter, data_access, and app. This makes the Dependency Rule visible in the directory structure. Inside use_case, every application action has its own package, such as resolve_turn, tournament, create_pokemon, signup, or library operations. Each action keeps its Input Boundary, Input Data, Output Boundary, Output Data, and Interactor together.

The frontend uses domain, usecases, services, hooks, and components. Domain holds entities and pure shared rules. Usecases holds framework-independent application functions. Hooks adapt those rules to React state, services talk to APIs, and components render the interface. Feature folders then group related screens within the outer component layer.

This combines package-by-layer with package-by-feature where each helps most. Layer roots make forbidden imports easier to detect, while named action packages make ownership and navigation clearer. Shared contracts remain in one place so battle, tournament, the Pokedex, and custom Pokemon do not duplicate type or combat policies.`,

  `We maintained code quality through feature branches, pull requests, automated checks, and review context. The screenshots show a stacked pull request documenting which change must merge first, why it temporarily targets another branch, and how it will retarget afterward. The timeline shows dependent work merging only after the required checks passed.

CI runs Checkstyle for Java conventions and Oxlint for TypeScript and React. It also runs backend and frontend tests, coverage gates, production builds, dependency checks, and architecture rules. A failed job means the change is not ready to merge. The Maven Wrapper permission is checked because CI must be able to execute the same build from a clean Linux checkout.

Pull requests give reviewers more than a diff. They preserve the reason for a change, affected use cases, test evidence, and known dependencies. Small commits make it easier to identify where a regression began, while reviews help catch duplicated responsibility or a dependency pointing into the wrong layer before it reaches main.`,

  `This slide is our proof of testing coverage. The final verification passed 309 Java tests and 325 TypeScript tests, for 634 total. JaCoCo reports just over 90 percent backend line coverage, and Vitest reports 89.79 percent frontend line coverage. The use-case layers are above 94 percent in both stacks, which matters because that is where application coordination lives.

The suite is layered like the code. Entity tests cover damage, healing limits, type effectiveness, battle completion, and bracket progression. Interactor tests drive boundaries with stand-in repositories, presenters, runners, and random values. Frontend tests cover pure use-case functions, hooks, and user-visible component behaviour. Architecture tests separately inspect dependency direction.

Reports are generated in CI and uploaded as artifacts, so the numbers can be checked against the presented commit. External data, storage, and randomness are replaced at defined seams, so no test needs a running server or live network. Remaining gaps are documented: visual CSS placement, real PokeAPI outages, full screen-reader sessions, and timing-sensitive concurrency under production load.`,

  `Two Universal Design principles are especially visible. Flexibility in Use appears when players choose official, custom, or random Pokemon; search by name or number; filter by type; and revise selections before committing to a battle or tournament. The same goal can be reached through different paths, so someone who wants a quick random matchup and someone who wants a carefully planned bracket can both use the program.

Tolerance for Error appears in preserved form values, editable selections, disabled impossible actions, explicit validation messages, server-side checks, and Struggle as a fallback when no damaging move is available. Account and ownership checks are enforced inside use cases rather than relying only on hidden buttons. These choices reduce the cost of a mistaken click or incomplete Pokemon definition.

Our target audience is Pokemon fans, students, families, friend groups, and coding clubs who enjoy comparing game data or running short competitions. Some people may not be able to use the program as easily because it is English-only, assumes familiarity with Pokemon terms, needs a modern device, and sometimes needs reliable internet. Dense retro text and colour-coded information can also create barriers. Those are limitations of our design and access choices, not deficiencies in those groups.`,

  `Pokemon Battler now has seven connected use cases. Players can manage an account and collection, browse official Pokemon, create custom Pokemon, play battles, and run parallel knockout tournaments. Official and custom competitors use the same Pokemon and Battle entities, so they follow the same tested rules. A tournament then composes those single battles into a complete eight-to-one bracket.

The project is also distributable and checkable. The repository contains a runnable Spring Boot JAR path, detailed clean-clone setup, Maven and npm requirements, automated quality gates, coverage reports, and architecture checks in Java and TypeScript. The README explains both normal startup and common failures.

Our next priorities are to persist active battles and tournaments across restarts, route more Pokedex traffic through the backend cache, localize the interface, and improve keyboard and screen-reader support. We would also add richer status moves and configurable tournament sizes without replacing the current boundaries. The team user story is fulfilled today: a Pokemon fan can explore official and custom Pokemon through battles and tournaments in one app. Thank you.`,

  `For architecture or data questions, the owner of the relevant user story can trace the request from its View through the Input Boundary and Interactor to the entity or gateway. We can then point to the exact class, interface, UML relationship, or architecture test that supports the answer instead of relying on a general claim.`,

  `For testing, design, or process questions, we will give the result first, then show the repository evidence if requested. That evidence includes the CI checks, coverage reports, pull-request history, runnable-artifact instructions, and the Strategy, Factory, repository, and boundary seams used by the relevant feature.`
];
