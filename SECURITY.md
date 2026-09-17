# Security Policy

## Scope

This repository is a documentation project plus a static calculator served from `docs/` on GitHub Pages. There are:

- **No accounts, no data collection, no server, no database.**
- **No third-party scripts, CDNs, or runtime dependencies** — the calculator is self-contained vanilla HTML/CSS/JS.
- The calculator stores draft assessments only in the viewer's **own browser** (localStorage) and in the **URL fragment** of shareable links. Nothing is transmitted anywhere.

## What counts as a security issue

Please report:

- **Script injection or unsafe DOM handling** in `docs/app.js` — in particular, user-entered vendor names, assessor names, or justification notes must never be inserted via `innerHTML` or any other sink that interprets HTML.
- **Introduction of external scripts or CDNs** into the published site (supply-chain tampering of the Pages site).
- **Credentials or personal data committed** to the repository.
- **Content that could cause a materially unsafe compliance decision** — e.g., a scoring or clause error that would systematically understate risk if an organization relied on it.

## What is not a security issue

Disagreement with a score, tier boundary, clause wording, or regulatory interpretation is a content matter — please use the [Content correction issue form](https://github.com/delschlangen/vendor-risk-rubric/issues/new?template=content_correction.yml) instead.

## Reporting a vulnerability

1. **Preferred:** use GitHub's [Private Vulnerability Reporting](https://github.com/delschlangen/vendor-risk-rubric/security/advisories/new) for this repository, if enabled.
2. **Fallback:** if private reporting is not available, open a public issue titled **"Security contact request"** *without including any vulnerability details*, and the maintainer will provide a private channel.

## Response targets

- Acknowledgement within **7 days**.
- Fixes are best-effort by a solo maintainer; there is **no bug bounty**.

## Supported versions

Only the `main` branch / latest release is supported. Older tags receive no fixes.

## No-secrets policy

This repository must never contain API keys, tokens, real vendor names, or real assessment data. All examples are fictional. If you find anything that looks like a real secret or real personal data, report it as a security issue.
