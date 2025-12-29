# The Implementers GmbH Website (React + Vite)

Modern single-page website for `the-implementers.de` built with:
- React + Vite
- `react-router-dom` with `HashRouter` (static hosting friendly)
- Tailwind CSS
- `react-helmet-async` for SEO
- `lucide-react` icons

## Development

```powershell
npm install
npm run dev
```

## Build (production)

```powershell
npm run build
```

Output is written to `dist/` (do not commit; it is ignored by `.gitignore`).

## Deployment (SFTP/FTP static hosting)

1. Run `npm run build`.
2. Upload **all files inside** `dist/` to your server webroot (overwrite existing files).
3. Hard refresh in the browser (`Ctrl+F5`) if old CSS/JS is cached.

Because the app uses `HashRouter`, no server rewrite rules are required. Routes look like:
- `/#/leistungen/prozessoptimierung`
- `/#/kontakt`

## Content notes

### Favicon
- `public/favicon.svg` is used via `index.html`.

### Legacy migration (legal + process pages)
Legacy content is embedded as sanitized HTML:
- Legal pages source HTML: `src/content/legacy/*.html`
- Process pages source HTML: `src/content/legacy/process/*.html`
- Legacy images used by the process pages: `public/legacy/process/*`
- AGB PDF: `public/agb/TI-DO-AGB.pdf`

Process pages use an internal renderer that:
- removes scripts/styles/font tags and noisy attributes
- rewrites image sources to `/legacy/process/...`
- rewrites `.htm` links to the new HashRouter routes

If you remove `legacy` entirely, make sure all required HTML/images are already copied into the locations above.

## GitHub publishing

This folder is currently not a git repository. To publish to GitHub:

```powershell
git init
git add .
git commit -m "Initial website version"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

If you share the GitHub repo URL and whether you prefer SSH or HTTPS, I can wire the remote and run the push.
