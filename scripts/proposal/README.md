# Website review proposals

The template behind the R. Martin Creative website audit & proposal PDFs. The full
process and content rules are in `.claude/skills/website-review/SKILL.md`, so in Claude
Code you can just ask for "a website review of example.com".

```sh
bun run proposal:new pams-appliance-express                                   # proposals/<slug>/ from template.html
bun run proposal:audit pams-appliance-express https://www.pamsapplianceexpress.com/  # speed + SEO checks, screenshots
bun run proposal:shots pams-appliance-express                                 # screenshots of mockups/concept-a|b.html
bun run proposal:pdf pams-appliance-express                                   # proposals/<slug>/<Title>.pdf
```

`proposals/` is gitignored because it holds client files. First run on a new machine:
`bunx playwright install chromium` (or have Google Chrome installed).

| File | What it is |
|---|---|
| `template.html` | The 10-page proposal with `[PLACEHOLDERS]` |
| `proposal.css` | Page layout, type, cards, tables, pills, frames, bars |
| `grad.js` | Per-letter gradient for `.grad` text (no PDF hairlines) |
| `fonts/` | Geist and Geist Mono (SIL Open Font License) |
| `audit.mjs`, `shots.mjs`, `render.mjs`, `new.mjs` | The scripts above |
