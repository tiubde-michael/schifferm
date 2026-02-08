# Michael Schiffer (schifferm.de) — Next.js Static Site

AI-first professional authority site built with Next.js App Router and Tailwind CSS. Static export only.

## Development

```bash
npm install
npm run dev
```

## Build (production / static export)

```bash
npm run build
```

The build runs `scripts/generate-machine-readable.mjs` and outputs to `out/`.

## Content Updates

Single source of truth:
- `src/content/profile.js`

Machine-readable outputs are generated into:
- `public/de/machine-readable/profile.json`
- `public/de/machine-readable/profile.md`
- `public/de/machine-readable/profile.txt`
- `public/en/machine-readable/profile.json`
- `public/en/machine-readable/profile.md`
- `public/en/machine-readable/profile.txt`

To refresh after edits:

```bash
npm run build
```

## Deployment (IONOS Webspace / 1&1)

Target server: `home436434446.1and1-data.host` using env user `IONOS_SFTP_USER_SCHIFFERM_WEBSEITE`.

1. `npm run build` (outputs `out/`)
2. Upload the contents of `out/` with `sh ./scripts/deploy-webspace.sh`

Set:

```bash
NEXT_PUBLIC_SITE_URL=https://schifferm.de
IONOS_SFTP_USER_SCHIFFERM_WEBSEITE=...
```

## Key Routes

- `/de` and `/en`
- `/de/profile`, `/de/skills`, `/de/projects`, `/de/certifications`, `/de/publications`, `/de/machine-readable`
- `/en/profile`, `/en/skills`, `/en/projects`, `/en/certifications`, `/en/publications`, `/en/machine-readable`
