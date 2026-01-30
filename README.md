# The Implementers GmbH Website (Next.js, App Router)

Last updated: 30-Jan-2026

Static export for `the-implementers.de` built with:
- Next.js (App Router, SSG export)
- Tailwind CSS
- Pre-rendered Metadata + OpenGraph for blog shares

## Development

```powershell
npm install
npm run dev
```

## Build (production / static export)

```powershell
npm run build
```

## Deployment

IONOS Webspace (static export):
1. `npm run build` (outputs `out/`)
2. Upload the contents of `out/` to `/the-implementers.de`

Set `NEXT_PUBLIC_SITE_URL=https://the-implementers.de` for correct absolute OG URLs.

### One-command deploy (IONOS Webspace)

```bash
IONOS_SFTP_PASS='your-password' NEXT_PUBLIC_SITE_URL='https://the-implementers.de' ./scripts/deploy-webspace.sh
```

## Health Check (Routen prüfen)

Falls du schnell prüfen willst, ob alle wichtigen Seiten erreichbar sind:

```bash
python3 - <<'PY'
import requests
base = "http://127.0.0.1:5174"
paths = [
    "/", "/blog",
    "/blog/arztdokumentation-mit-lokaler-llm",
    "/blog/automatische-auswertung-von-schmerzfrageboegen",
    "/blog/Roboter-werden-bessere-Chirurgen",
    "/kontakt",
    "/leistungen/lokale-llms",
    "/leistungen/projektmanagement",
    "/leistungen/prozessoptimierung",
    "/leistungen/prozessoptimierung/kaizen",
    "/leistungen/prozessoptimierung/5s",
    "/leistungen/prozessoptimierung/six-sigma",
    "/leistungen/prozessoptimierung/lean",
    "/leistungen/prozessoptimierung/tps",
    "/leistungen/prozessoptimierung/begriffserklaerung",
    "/leistungen/prozessoptimierung/vision-strategie",
    "/leistungen/prozessoptimierung/bab",
    "/leistungen/prozessoptimierung/bep",
    "/leistungen/prozessoptimierung/deckungsbeitrag",
    "/leistungen/prozessoptimierung/kosten",
    "/leistungen/prozessoptimierung/sgp",
    "/leistungen/prozessoptimierung/savings",
    "/impressum",
    "/datenschutz",
    "/disclaimer",
    "/Recorder",
    "/Settings",
]

width = max(len(p) for p in paths)
for path in paths:
    url = base + path
    try:
        res = requests.get(url, timeout=15)
        print(path.ljust(width), res.status_code)
    except Exception as exc:
        print(path.ljust(width), f"ERR {exc}")
PY
```

Wenn du über die VM im Netzwerk prüfst, ersetze `base` durch:
`http://192.168.5.187:5174`

## FAQ (Dev Server)

**Q: Warum ist der Dev‑Server nicht erreichbar über die VM‑IP?**  
A: Stelle sicher, dass `next dev` mit `--hostname 0.0.0.0` läuft. Beispiel:

```bash
npm run dev -- --hostname 0.0.0.0 --port 5174
```

**Q: Turbopack verursacht Errors (Internal Server Error)?**  
A: Starte ohne Turbopack und lösche den Dev‑Cache:

```bash
rm -rf .next
NEXT_DISABLE_TURBOPACK=1 npm run dev -- --hostname 0.0.0.0 --port 5174
```

## URLs (no hash routing)

- `/` (Home)
- `/blog` (Blog list)
- `/blog/[slug]` (Blog detail)
- `/kontakt`
- `/leistungen/lokale-llms`
- `/leistungen/projektmanagement`
- `/leistungen/prozessoptimierung`
- `/leistungen/prozessoptimierung/[slug]`
- `/impressum`
- `/datenschutz`
- `/disclaimer`
- `/Recorder`
- `/Settings`

Legacy Hash-URLs like `/#/blog` are not server-redirectable. The canonical URLs are the new ones above.

## Blog: neue Posts hinzufügen

1. **Post-Entry anlegen** in `src/content/blog/posts.js`:
   - `slug` (URL-safe, z. B. `mein-beitrag`)
   - `title`
   - `excerpt`
   - `author` (z. B. `Michael Schiffer`)
   - `date` (optional)
   - `coverImage` (z. B. `/blog/mein-beitrag/cover.jpg`)
   - `ogImage` (z. B. `/blog/mein-beitrag/og-1200x627.png`)
   - `body` (HTML-String)
2. **Assets platzieren**:
   - Cover: `public/blog/<slug>/cover.jpg`
   - OG Image (1200x627): `public/blog/<slug>/og-1200x627.png`
   - Optional: `node scripts/generate-og-images.mjs` erzeugt OG‑Images aus den Covers.
3. **Metadaten prüfen**: `/blog/[slug]` nutzt `generateMetadata` und setzt:
   - `og:title`, `og:description`, `og:image`, `og:url`
   - `twitter:card` = `summary_large_image`
4. **Absolute URLs**: Setze `NEXT_PUBLIC_SITE_URL` für korrekte OG-Links.
   - Beispiel: `NEXT_PUBLIC_SITE_URL=https://the-implementers.de`

### Beispiel: LinkedIn Share
- URL: `https://the-implementers.de/blog/arztdokumentation-mit-lokaler-llm`
- Erwartung: Titel + Description + OG Image (1200x627) werden serverseitig gerendert.

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
- Recorder: `/Recorder`
- Settings: `/Settings`

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
- `src/components/pages/Recorder.jsx`
- `src/components/pages/Settings.jsx`
- `src/components/UploadQueue.jsx`
- `src/lib/audioDB.js`
- `src/lib/api.js`
- `src/lib/storage.js`

## Content notes

### Favicon
- `public/favicon.svg` is used.

### Legacy migration (legal + process pages)
Legacy content is embedded as sanitized HTML:
- Legal pages source HTML: `src/content/legacy/*.html`
- Process pages source HTML: `src/content/legacy/process/*.html`
- Legacy images used by the process pages: `public/migrated/process/*`
- AGB PDF: `public/agb/TI-DO-AGB.pdf`

Process pages use an internal renderer that:
- removes scripts/styles/font tags and noisy attributes
- rewrites image sources to `/migrated/process/...`
- rewrites `.htm` links to the new Next.js routes
