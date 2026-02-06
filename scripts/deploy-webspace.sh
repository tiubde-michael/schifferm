#!/bin/sh
set -e

if [ -z "${IONOS_SFTP_PASS:-}" ]; then
  echo "Missing IONOS_SFTP_PASS. Example:"
  echo "  IONOS_SFTP_PASS='your-password' NEXT_PUBLIC_SITE_URL='https://schifferm.de' ./scripts/deploy-webspace.sh"
  exit 1
fi

HOST="home436434446.1and1-data.host"
USER="u70724527"
REMOTE_DIR="/schifferm.de"

NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://schifferm.de}"
export NEXT_PUBLIC_SITE_URL

echo "Building static site..."
npm run build

if [ ! -d "out" ]; then
  echo "Build output folder 'out' not found."
  exit 1
fi

ASKPASS="$(mktemp)"
cat > "${ASKPASS}" <<'SH'
#!/bin/sh
echo "${IONOS_SFTP_PASS}"
SH
chmod 700 "${ASKPASS}"

echo "Uploading to ${USER}@${HOST}:${REMOTE_DIR} ..."
SSH_ASKPASS="${ASKPASS}" SSH_ASKPASS_REQUIRE=force DISPLAY=:0 \
  setsid -w scp -r -o StrictHostKeyChecking=no out/* "${USER}@${HOST}:${REMOTE_DIR}/"

rm -f "${ASKPASS}"
echo "Done."
