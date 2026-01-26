# The Implementers GmbH Website (React + Vite)

Last updated: 14-Jan-2026

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
- `/#/Recorder`
- `/#/Settings`

## Recorder App (Audio + Text Upload)

Mobile-friendly recorder that works in Android/Chrome and supports offline uploads.

### Features
- Audio recording via `MediaRecorder` (webm)
- Text-only submissions (when no audio is recorded)
- Local storage via IndexedDB (`idb`) with an upload queue
- Optional metadata fields: patient/id, dob, topic
- Uploads via multipart/form-data to the configured webhook
- Basic Auth (username + password) for webhook access

### Routes
- Recorder: `/#/Recorder`
- Settings: `/#/Settings`

### Settings
Settings are stored in `localStorage`:
- Webhook URL (default: `https://n8n.ti-ub-ki.ddns.net/webhook/audio-upload`)
- Basic Auth Username
- Basic Auth Passwort
- Target Sample Rate (metadata only; MediaRecorder cannot enforce)

### Upload payload
Multipart form fields:
- `file`: audio/webm (only for audio uploads)
- `patient` (optional)
- `dob` (optional)
- `topic` (optional)
- `clientTimestamp`: ISO string
- `targetSampleRate`: number or empty string

### File naming
Format:
- `<MODE>-<USERNAME>-recording-<ISO>.webm`
- `<MODE>-<USERNAME>-text-<ISO>` (text-only queue entries)

Mode values:
- `2 Personen` (no prefix)
- `Diktat` (prefix `Diktat-`)
- `Team` (prefix `Team-`)

### Offline queue behavior
- After stopping a recording, the audio is saved to IndexedDB.
- Upload starts automatically; failures remain in the queue.
- Queue entries can be retried, downloaded (audio), or deleted.

### Required HTTPS
Microphone access requires HTTPS (or localhost).

### Troubleshooting
- If uploads fail with `403`, verify Basic Auth on the n8n webhook (not only the UI).
- If the queue does not show items, clear site data or update IndexedDB (DB version upgrade is included).

### Key files
- `src/pages/Recorder.jsx`
- `src/pages/Settings.jsx`
- `src/components/UploadQueue.jsx`
- `src/lib/audioDB.js`
- `src/lib/api.js`
- `src/lib/storage.js`

## Content notes

### Favicon
- `public/favicon.svg` is used via `index.html`.

### Legacy migration (legal + process pages)
Legacy content is embedded as sanitized HTML:
- Legal pages source HTML: `src/content/legacy/*.html`
- Process pages source HTML: `src/content/legacy/process/*.html`
- Legacy images used by the process pages: `public/migrated/process/*`
- AGB PDF: `public/agb/TI-DO-AGB.pdf`

Process pages use an internal renderer that:
- removes scripts/styles/font tags and noisy attributes
- rewrites image sources to `/migrated/process/...`
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
