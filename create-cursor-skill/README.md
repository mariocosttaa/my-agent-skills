# create-cursor-skill

**Skill que guia a criação de Agent Skills no Cursor** — estrutura de pastas, formato SKILL.md, frontmatter, regras .mdc e boas práticas (padrão [agentskills.io](https://agentskills.io/)).

---

## Estrutura desta skill

```
create-cursor-skill/
│
├── SKILL.md              ← Entrada principal para o agente
│                             Usar modo Plan (Build) antes de implementar
│                             Decisão Skill vs Rule (.mdc)
│                             Estrutura obrigatória, onde guardar
│                             Formato SKILL.md e frontmatter
│                             Checklist antes de publicar
│
├── reference.md          ← Referência detalhada
│                             Skills vs Rules, diretórios
│                             Estrutura completa, frontmatter, .mdc
│                             Progressive disclosure, scripts
│
├── examples.md           ← Exemplos práticos
│                             Skill mínima, com references, com scripts
│                             Exemplo de Rule .mdc
│
└── README.md             ← Este ficheiro (para humanos)
```

---

## Quando usar

- Queres **criar uma nova skill** do zero (o agente deve usar **modo Plan/Build** primeiro para recolher requisitos).
- Tens dúvidas sobre **estrutura de pastas**, **SKILL.md**, **frontmatter** ou **onde guardar** (projeto vs utilizador).
- Precisas de distinguir **Skills** (SKILL.md em pasta) de **Rules** (ficheiros .mdc em `.cursor/rules/`).
- Queres **exemplos** de skills mínimas, com referências ou com scripts.

O agente usa esta skill quando detecta pedidos como "como criar uma skill", "estrutura de uma skill", "SKILL.md", ".mdc", etc.

---

## Onde esta skill está guardada

- **Neste projeto:** `.cursor/skills/create-cursor-skill/` — o Cursor carrega skills desta pasta automaticamente.

Para usar em todos os teus projetos, copia para `~/.cursor/skills/create-cursor-skill/`.

---

## Referências oficiais

- [Cursor Docs — Agent Skills](https://cursor.com/docs/context/skills)
- [Cursor Docs — Rules](https://cursor.com/docs/context/rules)
- [agentskills.io](https://agentskills.io/) — especificação SKILL.md
