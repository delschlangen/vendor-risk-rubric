# Changelog

All notable changes to the Vendor Risk Assessment Framework are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-09-15

### Added

- Calculator: assessment details fields (vendor name, assessor, date) and per-dimension justification notes.
- Calculator: shareable link (assessment encoded in the URL fragment) and browser autosave of drafts.
- Calculator: one-click example presets for the four worked examples.
- Calculator: Markdown and JSON export, JSON import, and a ticket-ready summary.
- Calculator: next-steps and monitoring guidance per tier, regulatory checkpoints, and a "How this result was calculated" rules-used panel.
- Site: documentation hub and about section on the calculator page.
- Site: SEO metadata, Open Graph tags, JSON-LD structured data, favicons, social sharing image (`og-image.png`), `sitemap.xml`, `robots.txt`, custom 404 page, and `.nojekyll`.
- Community files: `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), structured issue forms, a pull request template, and `scripts/check_links.py` (stdlib relative-link checker).
- `docs/calculator_guide.md` — how to use the interactive calculator and its exports.
- Jurisdiction guide: a DORA section, regulatory status pointers, and a regulatory watch-list with sources.

### Changed

- Calculator: conditional reviews (Privacy at Data ≥ 2 in Enhanced; Finance, Risk, and AI Governance in High/Critical) and dimension-triggered clauses (DPA at Data = 3, exit plan at Continuity = 3) now match the decision tree.
- Rubric wording clarified: a dimension score of 3 adds the specialist review and the Enhanced clause set without changing the tier.
- Enhanced clause set retitled "Score 6+ or any dimension = 3".
- Standards alignment wording kept version-neutral (NIST Cybersecurity Framework — supply chain risk management; ISO/IEC 27001 — supplier relationship controls; NIST AI RMF — AI supply chain considerations).
- Version bumped to 1.1.0 in `CITATION.cff` and in every document's Version History table.
- Accessibility improvements across the calculator: form labels, live region announcements, focus management, contrast, and print styles.

### Fixed

- AI/ML clause list was missing the "Prohibited Uses" clause.
- Examples: incomplete required-review and clause lists completed.
- Filled example: Site & Security Access score corrected to 2 (total now 10).
- Executive summary: placeholder link replaced with the real calculator URL.
- FAQ: sole-source and timeline contradictions resolved.
- Adoption guide: incorrect PHI example corrected.

## [1.0.0] - 2024-12-25

### Added

- Initial release: six-dimension scoring rubric (0–3 each, total 0–18) with four risk tiers (Standard / Enhanced / High / Critical).
- Decision tree with review workflows and escalation triggers.
- Tiered contract clause library (Standard, Enhanced, High-Risk, AI/ML sets).
- Templates: blank assessment form and intake questionnaire.
- Four worked examples: AI analytics vendor, staffing agency, low-risk SaaS, construction vendor.
- Guides: quick reference, adoption guide, RACI matrix, executive summary, FAQ.
- Jurisdiction and regulatory considerations guide (EU AI Act, GDPR, CCPA, HIPAA, SOX, GLBA).
- Interactive risk calculator hosted on GitHub Pages (vanilla HTML/CSS/JS, no build step).
- `CITATION.cff` citation metadata and MIT license.

[Unreleased]: https://github.com/delschlangen/vendor-risk-rubric/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/delschlangen/vendor-risk-rubric/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/delschlangen/vendor-risk-rubric/commits/afbff57

<!-- Note: v1.0.0 was not tagged at release time. Creating a retroactive v1.0.0 tag on commit afbff57 (and a v1.1.0 tag on the release commit) is a maintainer action; until then the compare links above will 404. -->
