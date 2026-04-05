#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Installing frontend dependencies"
npm ci

echo "Running frontend typecheck"
npm run typecheck

echo "Running frontend lint"
npm run lint

echo "Running frontend format check"
npm run format

echo "Running frontend tests"
npm run test

echo "Running frontend build"
npm run build

echo "Frontend CI checks completed"
