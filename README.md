# my-agent-skills

Collection of **Cursor Agent Skills** — capabilities for the [Cursor](https://cursor.com) editor that guide the AI to follow best practices and workflows for specific tasks (commits, Docker, NestJS, README, etc.).

---

## What are Skills and Rules?

| | Skills | Rules |
|---|--------|--------|
| **What** | Packages with detailed instructions the agent uses *when relevant* for the prompt | Short rules that run *on every prompt* (or by file) |
| **Loading** | Only loaded when the prompt indicates they are useful | Always applied (or per `globs` / file in use) |
| **Structure** | Folder with `SKILL.md` + optional `reference.md`, `scripts/`, `assets/` | File `.mdc` or `.md` in `.cursor/rules/` |
| **Example** | `git-commits` — helps with commits and branching | `.cursor/rules/inline-comments.mdc` — comments in English |

These skills are **specific to Cursor** and follow the [agentskills.io](https://agentskills.io) format.

---

## Where to place Skills

| Scope | Directory |
|--------|------------|
| **Global** (all projects) | `~/.cursor/skills/<skill-name>/` |
| **Project** (this repo only) | `.cursor/skills/<skill-name>/` or `.agents/skills/<skill-name>/` |

Example for `git-commits`:

- Global: `~/.cursor/skills/git-commits/`
- Project: `.cursor/skills/git-commits/` (at repo root)

---

## How to download a skill

Each skill has its own **branch**, so you can download only what you need.

### Example: `git-commits` skill

```bash
# Clone the repo on the git-commits branch (only that folder)
git clone -b git-commits https://github.com/mariocosttaa/my-agent-skills.git
cd my-agent-skills
```

You get:
```
my-agent-skills/
├── README.md
└── git-commits/
    ├── SKILL.md
    ├── README.md
    └── reference.md
```

### Install in Cursor (example: git-commits)

```bash
# Install globally
cp -r git-commits ~/.cursor/skills/

# Or, for a specific project:
mkdir -p .cursor/skills
cp -r git-commits .cursor/skills/
```

---

### Available branches

Versioning starts at **1.0** and increments with each commit. Each skill has its own branch; the install command copies the folder to `~/.cursor/skills/`.

| Branch | Skill | v. initial | v. current | Install (copy) |
|--------|-------|------------|-----------|-------------------|
| `main` | All skills | 1.0 | 1.7 | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cd my-agent-skills && cp -r create-* docker gin-workflow git-* github-readme nestjs-* ~/.cursor/skills/` |
| `create-cursor-skill` | Create new Cursor skills | 1.0 | 1.6 | `git clone -b create-cursor-skill https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-cursor-skill ~/.cursor/skills/` |
| `create-workflow` | Create workflow skills (generic or repo-specific) | 1.0 | 1.7 | `git clone -b create-workflow https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-workflow ~/.cursor/skills/` |
| `docker` | Docker, Dockerfile, docker-compose | 1.0 | 1.6 | `git clone -b docker https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/docker ~/.cursor/skills/` |
| `gin-workflow` | GIN workflow (Jira + repository) | 1.0 | 1.4 | `git clone -b gin-workflow https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/gin-workflow ~/.cursor/skills/` |
| `git-commits` | Commit messages and branching | 1.0 | 1.4 | `git clone -b git-commits https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/git-commits ~/.cursor/skills/` |
| `github-readme` | GitHub README | 1.0 | 1.4 | `git clone -b github-readme https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/github-readme ~/.cursor/skills/` |
| `nestjs-e2e-tests` | E2E with Playwright (NestJS) | 1.0 | 1.4 | `git clone -b nestjs-e2e-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-e2e-tests ~/.cursor/skills/` |
| `nestjs-integration-tests` | NestJS integration tests | 1.0 | 1.4 | `git clone -b nestjs-integration-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-integration-tests ~/.cursor/skills/` |
| `nestjs-unit-tests` | NestJS unit tests | 1.0 | 1.4 | `git clone -b nestjs-unit-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-unit-tests ~/.cursor/skills/` |

To install **per project** instead of globally, replace `~/.cursor/skills/` with `.cursor/skills/` (at repo root).

---

## Repository

[https://github.com/mariocosttaa/my-agent-skills](https://github.com/mariocosttaa/my-agent-skills)
