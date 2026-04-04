#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/dist"

DEPLOY_HOST="${DEPLOY_HOST:?DEPLOY_HOST is required}"
DEPLOY_USER="${DEPLOY_USER:?DEPLOY_USER is required}"
DEPLOY_PATH="${DEPLOY_PATH:?DEPLOY_PATH is required}"
DEPLOY_OWNER="${DEPLOY_OWNER:?DEPLOY_OWNER is required}"
SSH_KEY_PATH="${SSH_KEY_PATH:?SSH_KEY_PATH is required}"
DEPLOY_STATIC_PATH="${DEPLOY_STATIC_PATH:-${DEPLOY_PATH%/}/backend/app/static}"

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory $BUILD_DIR does not exist. Run npm run build first."
  exit 1
fi

SSH_OPTS=(
  -o BatchMode=yes
  -o StrictHostKeyChecking=yes
  -i "$SSH_KEY_PATH"
)

REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
REMOTE_TMP="${DEPLOY_PATH%/}/.frontend-release-${TIMESTAMP}"
REMOTE_BACKUP_DIR="${DEPLOY_PATH%/}/.frontend-backups"
REMOTE_BACKUP="${REMOTE_BACKUP_DIR}/${TIMESTAMP}"

ssh "${SSH_OPTS[@]}" "$REMOTE" "mkdir -p '$REMOTE_TMP' '$REMOTE_BACKUP_DIR'"
rsync -az --delete -e "ssh ${SSH_OPTS[*]}" "${BUILD_DIR}/" "${REMOTE}:${REMOTE_TMP}/"

ssh "${SSH_OPTS[@]}" "$REMOTE" "
  set -euo pipefail
  mkdir -p '$(dirname "$DEPLOY_STATIC_PATH")'
  if [ -d '$DEPLOY_STATIC_PATH' ]; then
    mv '$DEPLOY_STATIC_PATH' '$REMOTE_BACKUP'
  fi
  mv '$REMOTE_TMP' '$DEPLOY_STATIC_PATH'
  chown -R '$DEPLOY_OWNER' '$DEPLOY_STATIC_PATH'
"
