# Re diseño - La cometa

## Project Context
You are building views for the "Re diseño - La cometa" project. This is a web project managed through the Backbone AI platform by the digital agency BACKBONE.

## File Creation Rules
- Working directory layout:
  - `views/` — **all generated view files go here** (one per page)
  - `assets/` — public assets (images, videos, fonts); URL is `/projects/{slug}/assets/...`
  - `context/{production,marketing,accounting,shared}/` — context files per department
  - `docs/`, `uploads/` — supporting docs and arbitrary uploads
  - `secrets/` — gitignored; .mcp.json and credentials live here
  - `memory/` — persistent memory files (see Memory section below)

## Stack: Tailwind CSS + vanilla  (no build step)
- Each view is a **standalone `.blade.php`** under `views/` — do NOT use @extends/@include.
- Full HTML5 document: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.
- CSS: load Tailwind CSS in `<head>`: `<script src="https://cdn.tailwindcss.com"></script>`
- Plain vanilla JavaScript only — NO jQuery, NO framework. Inline page JS in a `<script>` at the end of `<body>`.
- Each file is fully self-contained and directly viewable in a browser (zero build).

## File Naming
- Use lowercase kebab-case: `views/home.blade.php`, `views/about-us.blade.php`, `views/contact.blade.php`
- For related pages, use subdirectories under `views/`: `views/blog/index.blade.php`, `views/blog/post.blade.php`

## Structure Example
```
views/home.blade.php
views/about.blade.php
views/contact.blade.php
views/menu/drinks.blade.php
views/menu/food.blade.php
```

---

## Memory — neuron graph (MANDATORY for knowledge persistence)

This project has a persistent **memory graph** at `memory/`. Each `.md` file is a "neuron" of focused knowledge. **The CLI prompt only loads neurons that are reachable from Core (`memory/project.md`)** — anything orphaned is silently dropped, so you MUST connect new neurons back to Core or the knowledge is lost.

### Layout

- `memory/project.md` — **Core**. The project brief plus a `## References` block that points at every other neuron. This is the entry point for the reachability traversal.
- `memory/<topic>.md` — focused topic neurons (e.g., `brand-voice.md`, `deployment-process.md`, `key-decisions.md`).
- `memory/chat-{chatId}.md` — chat memory; auto-managed, you generally shouldn't touch directly.

A neuron is just a markdown file. Keep it focused on one topic and concise — long-form scaffolding (`## Facts` / `## Recent activity` / `## Background`) is optional, not required. Write what's useful; the platform won't impose a structure.

### When you MUST update or create a neuron

Whenever you complete a project instruction or learn something that would be useful in a future chat — a constraint, a quirk, a key decision, a user preference, a discovered API rule, a non-obvious workaround — **capture it in a neuron immediately**. If you don't, the knowledge dies with this chat.

**Update an existing neuron** when the new info fits a topic you already have:
- Edit the relevant `memory/<topic>.md`.
- Append the new fact; trim or rewrite stale lines while you're there.

**Create a new neuron** when the topic is genuinely new:
1. Pick a kebab-case filename: `memory/<topic>.md`.
2. Seed it with just `# <Topic title>` and the body content — no boilerplate sections needed.
3. **Wire it to Core**: open `memory/project.md` and add a line inside the `## References` block (between the `<!-- backbone:memory-references -->` markers):
   ```
   - [<Display name>](./<topic>.md)
   ```
   Connection = reachability. If a neuron isn't linked into the graph from Core, it never loads. That's all the link does; no trigger condition is needed.
4. The platform's auto-discovery picks up the new file on the next load. Neurons you author appear with a **gold body** on the memory map. A user-authored neuron that YOU later edit gets a **gold halo** (the body keeps the user's colour, only the glow turns gold) so the user can see at a glance which of their neurons you've touched.

### Disable, don't delete (CRITICAL)

When a neuron seems irrelevant to the current task, **prefer to disable it over deleting it**. Disabling cuts the neuron (and any neurons reachable only through it) out of the prompt for now, but the content stays on disk for future chats where it may be needed again.

- **Disable** a neuron by inserting `<!-- backbone:disabled -->` anywhere in its `.md` body. The platform's reconciler picks up the marker on the next load and excludes the neuron from the reachability traversal. Remove the marker to re-enable.
- **Disable** the parent neuron if a whole sub-tree of related knowledge is irrelevant — the cascade drops every neuron reachable only through the disabled hop.
- **Delete** ONLY when the content is **wrong**, **outdated and superseded by another neuron**, or **a true duplicate**. Deletion is destructive; only choose it when the information should never be loaded again.

When in doubt: disable. The user can prune later via the visual map if needed.

### Keep it tight

- One topic per neuron. If a neuron grows past ~4KB, split it into sub-neurons (each linked from Core or from the parent neuron's References).
- Don't duplicate. If the info is already in a neuron, link to it, don't re-state it.

### What NOT to do

- **Never** dump knowledge into project.md's body — it should stay the Core brief + the References block. New knowledge goes into its own neuron.
- **Never** create a neuron without adding a reference in Core's References block (or from a neuron already referenced by Core) — the prompt will skip it entirely.
- **Never** rewrite the `<!-- backbone:memory-references -->` markers or the `## References` heading; the platform parses them.
- **Never delete a neuron** to "clean up" without confirming the content is wrong/duplicated. Disable instead.

---

## Installed Skills (MANDATORY)

You have two design skills installed. You MUST use them when generating any HTML view.

### /frontend-design
Apply for every view. Create distinctive interfaces that avoid generic "AI slop" aesthetics:
- **Tone**: Commit to a BOLD direction — brutally minimal, maximalist, retro-futuristic, organic, luxury, playful, editorial, brutalist, art deco, soft/pastel, industrial, etc.
- **Typography**: Distinctive, characterful fonts from Google Fonts. NEVER use generic fonts (Inter, Roboto, Arial, system fonts). Pair a display font with a refined body font.
- **Color**: Cohesive palette with CSS variables. Dominant colors with sharp accents.
- **Motion**: CSS animations for micro-interactions, staggered reveals, scroll-triggered effects, surprising hover states.
- **Layout**: Unexpected compositions — asymmetry, overlap, diagonal flow, grid-breaking elements, generous negative space.
- **Backgrounds**: Atmosphere and depth — gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, grain overlays.
- NEVER produce cookie-cutter designs. Every view must feel uniquely designed for its context.

### /ui-ux-pro-max
Before generating any view, run the design system tool:

```bash
SEARCH_PY=$(find ~/.claude/plugins/cache/ui-ux-pro-max-skill -name "search.py" -path "*/src/*" 2>/dev/null | head -1)
python3 "$SEARCH_PY" "<product_type> <industry> <keywords>" --design-system -p "Re diseño - La cometa"
python3 "$SEARCH_PY" "<keywords>" --stack html-tailwind
```

Replace `<product_type>`, `<industry>`, and `<keywords>` with values from the project description/brief.

### Pre-Delivery Checklist
Before finishing any view, verify:
- No emojis as icons — use inline SVG (Heroicons, Lucide)
- All clickable elements have `cursor-pointer`
- Hover states with clear visual feedback, smooth transitions (150-300ms)
- Accessible: alt text, form labels, visible focus states, 4.5:1 contrast ratio
- Responsive at 375px, 768px, 1024px, 1440px
- No horizontal scroll on mobile
- `prefers-reduced-motion` respected

---

## Specialist Agents

You have access to specialist agents at `/var/www/html/.claude/agents/`. Activate an agent by reading its `.md` file and adopting its role, methodology, and rules for the current task.

### When to use agents

Match the user's request to the most relevant agent(s) below. For complex tasks, chain agents (e.g. UX Architect → UI Designer → Frontend Developer). Always read the agent file first.

### Design Agents (`/var/www/html/.claude/agents/design/`)
| Agent | File | Use when |
|-------|------|----------|
| **UI Designer** | `design-ui-designer.md` | Designing component libraries, visual systems, interface layouts |
| **UX Architect** | `design-ux-architect.md` | CSS frameworks, responsive layout systems, design-to-dev bridge |
| **Brand Guardian** | `design-brand-guardian.md` | Building brand identity, ensuring brand consistency across pages |
| **Visual Storyteller** | `design-visual-storyteller.md` | Creating visual narratives, multimedia content, infographics |
| **Image Prompt Engineer** | `design-image-prompt-engineer.md` | Crafting AI image generation prompts for photography |
| **Whimsy Injector** | `design-whimsy-injector.md` | Adding personality, micro-interactions, playful Easter eggs |
| **UX Researcher** | `design-ux-researcher.md` | Validating design decisions, creating user personas |

### Engineering Agents (`/var/www/html/.claude/agents/engineering/`)
| Agent | File | Use when |
|-------|------|----------|
| **Frontend Developer** | `engineering-frontend-developer.md` | Building web UIs, performance optimization, accessibility |
| **Senior Developer** | `engineering-senior-developer.md` | Premium implementations, advanced animations, luxury experiences |
| **Rapid Prototyper** | `engineering-rapid-prototyper.md` | Fast proof-of-concept, MVP creation |
| **Backend Architect** | `engineering-backend-architect.md` | API design, database schema, server architecture |
| **Security Engineer** | `engineering-security-engineer.md` | Security review, threat modeling, vulnerability assessment |
| **Technical Writer** | `engineering-technical-writer.md` | Documentation, READMEs, API references |

### Marketing & Content Agents (`/var/www/html/.claude/agents/marketing/`)
| Agent | File | Use when |
|-------|------|----------|
| **Content Creator** | `marketing-content-creator.md` | Writing website copy, editorial content, brand storytelling |
| **Growth Hacker** | `marketing-growth-hacker.md` | Conversion optimization, viral mechanics, growth experiments |
| **Social Media Strategist** | `marketing-social-media-strategist.md` | Social strategy, LinkedIn/Twitter campaigns |

### Product & Project Agents
| Agent | File | Use when |
|-------|------|----------|
| **Senior PM** | `project-management/project-manager-senior.md` | Breaking specs into tasks, scoping work |
| **Sprint Prioritizer** | `product/product-sprint-prioritizer.md` | Prioritizing features, sprint planning |
| **Trend Researcher** | `product/product-trend-researcher.md` | Market research, competitive analysis |
| **Feedback Synthesizer** | `product/product-feedback-synthesizer.md` | Analyzing user feedback, extracting insights |

### Testing & QA Agents (`/var/www/html/.claude/agents/testing/`)
| Agent | File | Use when |
|-------|------|----------|
| **Accessibility Auditor** | `testing-accessibility-auditor.md` | WCAG 2.2 compliance, assistive tech testing |
| **Performance Benchmarker** | `testing-performance-benchmarker.md` | Core Web Vitals, load testing, optimization |
| **Reality Checker** | `testing-reality-checker.md` | Final production readiness validation |

### Orchestrator (`/var/www/html/.claude/agents/specialized/`)
| Agent | File | Use when |
|-------|------|----------|
| **Agents Orchestrator** | `agents-orchestrator.md` | Running full autonomous pipelines: PM → Architecture → Dev ↔ QA → Integration |

### How to activate an agent

1. Read the agent file: `cat /var/www/html/.claude/agents/design/design-ui-designer.md`
2. Adopt the agent's identity, methodology, rules, and communication style
3. Execute the task following the agent's workflow
4. For multi-agent workflows, complete one agent's work before transitioning to the next

### Recommended workflows

**Generating a single page:**
1. Activate **UI Designer** or **UX Architect** for design decisions
2. Use `/frontend-design` + `/ui-ux-pro-max` skills for implementation
3. Run **Accessibility Auditor** on the result

**Generating a full website (multiple pages):**
1. Activate **Agents Orchestrator** to manage the pipeline
2. Orchestrator delegates to: Senior PM → UX Architect → Frontend Developer ↔ Reality Checker
3. Each page passes QA before the next begins

**Writing website copy/content:**
1. Activate **Content Creator** for the copy
2. Activate **Brand Guardian** to ensure consistency

**Reviewing/improving an existing page:**
1. Activate **Accessibility Auditor** + **Performance Benchmarker** for audit
2. Activate **Frontend Developer** or **Senior Developer** for fixes

---

## Expresia Sub-Agent (CMS Deployment)

This project owns its Expresia `src/` and `dist/` under `expresia/` (per-project). The Expresia agent infrastructure (`.xpr-agent/`, `node_modules/`, build configs, the LAW at `expresia/CLAUDE.md`) lives at `/var/www/html/expresia` and is shared.

For ANY Expresia operation (push, pull, content, schema, docs, build), you MUST delegate to the Expresia sub-agent. Do NOT run `.xpr-agent/` scripts directly from this project root — they would operate on the SHARED scaffold's empty src/dist, not yours.

### How to invoke the Expresia sub-agent

Pass the per-project root via `EXPRESIA_PROJECT_ROOT`. The sub-agent's scripts and `vite.config.js` read this env var to find this project's src/dist.

```bash
# Windows
cd /d "/var/www/html/expresia" && set "EXPRESIA_PROJECT_ROOT=<this-project-expresia-root>" && type "C:/path/to/temp/prompt.txt" | claude -p --max-turns 50 --dangerously-skip-permissions 2>&1

# Linux / macOS (explicit --allowedTools — never --dangerously-skip-permissions on prod)
cd "/var/www/html/expresia" && EXPRESIA_PROJECT_ROOT="<this-project-expresia-root>" cat /path/to/prompt.txt | claude -p --max-turns 50 --allowedTools "Edit,Write,Bash,Read,Glob,Grep,WebFetch,WebSearch,TodoWrite" 2>&1
```

Replace `<this-project-expresia-root>` with the absolute path to this project's `expresia/` directory (sibling of `views/`, `assets/`, etc. in the same project tree).

The sub-agent will:
1. Read its own `CLAUDE.md` (the LAW, at `/var/www/html/expresia/CLAUDE.md`) for general rules.
2. Read `$EXPRESIA_PROJECT_ROOT/EXPRESIA.md` for THIS project's specifics (bundle prefix, target sections, active CFs, theming notes).
3. Operate against `$EXPRESIA_PROJECT_ROOT/src/` (sources) and `$EXPRESIA_PROJECT_ROOT/dist/` (build output).
4. Read credentials from the `EXPRESIA_DOMAIN` / `EXPRESIA_USERNAME` / `EXPRESIA_PASSWORD` env vars (injected by Backbone and inherited by the sub-agent — never hardcode or pass them in the prompt; there is no `.env`).

### When to delegate
- "Push to Expresia" / "Deploy bundles"
- "Build the Expresia project" / "Run npm run build" (the build picks up `EXPRESIA_PROJECT_ROOT`)
- "Pull from Expresia"
- "Break these views into bundles"
- "Set up custom fields / categories / sitemap"
- "Generate docs from the Expresia code"
- "Create/edit content in Expresia"
- Any task touching Expresia API, bundles, elements, skins, datasources, templates, content, or schema.