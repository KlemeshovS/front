# Deploy

Этот файл описывает deploy только для frontend-репозитория.

## Branches

- `develop` -> staging deploy
- `main` -> production deploy

## Build output

Frontend собирается в `dist/`.

Deploy script:

- `scripts/deploy_frontend.sh`

## GitHub Workflows

- `.github/workflows/staging.yml`
- `.github/workflows/pipeline.yml`

## Secrets

Production:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_PATH`
- `DEPLOY_OWNER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_STATIC_PATH` (optional)

Staging:

- `STAGING_DEPLOY_HOST`
- `STAGING_DEPLOY_USER`
- `STAGING_DEPLOY_PATH`
- `STAGING_DEPLOY_OWNER`
- `STAGING_DEPLOY_SSH_KEY`
- `STAGING_DEPLOY_STATIC_PATH` (optional)
- `STAGING_ACCESS_KEY`

Если `*_STATIC_PATH` не задан, deploy идет в:

- `<DEPLOY_PATH>/backend/app/static`

## Smoke checks

Production:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`
