# Contributing

Thanks for your interest in improving the Vendor Risk Assessment Framework. This is a documentation-plus-static-site project: Markdown content, a tiered clause library, and a vanilla HTML/CSS/JS calculator served from `docs/` on GitHub Pages. Contributions of all sizes are welcome.

Please also read our [Code of Conduct](CODE_OF_CONDUCT.md) and [security policy](SECURITY.md).

## Ways to contribute

- **New vendor examples** — worked assessments for vendor types the four existing examples don't cover.
- **Contract clauses** — additional illustrative clause language for the library.
- **Content corrections** — fixes to scores, wording, or internal inconsistencies.
- **Regulatory updates** — changes when a law or standard the framework references evolves.
- **Calculator improvements** — bug fixes or enhancements to `docs/index.html`, `docs/app.js`, `docs/styles.css`.

For anything larger than a typo fix, open an issue first using the matching [issue form](https://github.com/delschlangen/vendor-risk-rubric/issues/new/choose).

## Proposing a new vendor example

1. Copy [`templates/blank_assessment.md`](templates/blank_assessment.md) to `examples/<snake_case_name>.md`.
2. Score **all six dimensions** (0–3 each) with a written justification for every score.
3. Compute the tier from the total: **Standard 0–5, Enhanced 6–10, High 11–15, Critical 16–18**. Remember the rule: *any dimension = 3 adds the specialist review and the Enhanced clause set without changing the tier* — the tier itself is set by the total.
4. List the complete required reviews and the full applicable clause sets, not just highlights.
5. Add a row to the Examples table in [README.md](README.md).
6. Verify the tier, reviews, and clause sets against the [calculator](https://delschlangen.github.io/vendor-risk-rubric/) (or against an existing preset) before submitting.

Use fictional vendors only — no real company names or real assessment data.

## Proposing contract clauses

Clauses live in [`clauses/contract_clauses.md`](clauses/contract_clauses.md). Follow the house style:

- `### Clause Title` heading, followed by a blockquote in the form `> **Bold lead.** Clause text…`.
- Add a one-line note on when to use the clause.
- Keep the document's note that clauses are **illustrative, not legal advice** — new clauses must fit that framing.

## Content corrections and regulatory updates

- Every correction or regulatory change needs a **primary source URL** (regulator, official journal, statute, or standards body) and an **effective date**. Use the [Regulatory update issue form](https://github.com/delschlangen/vendor-risk-rubric/issues/new?template=regulatory_update.yml).
- Regulatory statements should be hedged with "as of YYYY-MM" so readers can judge freshness, and the source should be added to the affected document's Sources section.

## Style rules

- US English; sentence-case headings; en dashes for ranges (0–3, 6–10).
- Prefer tables over prose for structured information.
- In-repo links must be **relative** (GitHub renders them; Pages serves `.md` files raw). No external images.
- When you change a core document, bump its **Version History** table and its "Last reviewed" line.
- Add a matching entry to [CHANGELOG.md](CHANGELOG.md) under `## [Unreleased]`.

## Calculator rules

- **Vanilla HTML/CSS/JS only.** No CDNs, no npm packages, no build step, no external runtime dependencies.
- The calculator must keep working when opened over `file://` and when served from GitHub Pages.
- Any scoring change in `docs/app.js` must match [`rubric/risk_rubric.md`](rubric/risk_rubric.md) and [`rubric/decision_tree.md`](rubric/decision_tree.md) exactly.
- Update the `REVIEW_RULES`/`CLAUSES` tables and the "How this result was calculated" panel together — they must never disagree.
- Bump the `FRAMEWORK.version` constant and the page footer when behavior changes.

## Before opening a PR

1. Run the link checker and make sure it passes:

   ```bash
   python3 scripts/check_links.py
   ```

   It walks every `*.md` and `*.html` file, resolves relative links and anchors, and exits non-zero if anything is broken. (Standard library only — no install needed. `--include-external` also HEAD-checks http(s) links; `--root` points it at another tree.)

2. Open `docs/index.html` locally in a browser (double-click works — it runs over `file://`) and load each example preset to confirm the calculator still behaves.
3. Fill in the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) checklist.

## Release checklist (maintainer)

- [ ] Move `Unreleased` entries in [CHANGELOG.md](CHANGELOG.md) to a new version section with today's date.
- [ ] Bump `version` and `date-released` in [CITATION.cff](CITATION.cff).
- [ ] Bump the `FRAMEWORK` version constant, the footer, and the JSON-LD `dateModified`/`softwareVersion` in `docs/index.html`.
- [ ] Update `lastmod` in `docs/sitemap.xml`.
- [ ] Bump each changed document's Version History table.
- [ ] Tag `vX.Y.Z` and publish a GitHub Release pointing at the CHANGELOG section.

## Licensing

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE) that covers this project.
