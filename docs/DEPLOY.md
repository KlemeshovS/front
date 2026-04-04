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

## Recommended values

Текущая рабочая схема совпадает с backend deploy.

Production:

- `DEPLOY_HOST=api.wobbly.site`
- `DEPLOY_USER=root`
- `DEPLOY_PATH=/opt/rating-service`
- `DEPLOY_OWNER=ratingapp:ratingapp`
- `DEPLOY_STATIC_PATH=/opt/rating-service/backend/app/static`
- `DEPLOY_SSH_KEY` — скопировать один в один из backend repo secret `DEPLOY_SSH_KEY`

Staging:

- `STAGING_DEPLOY_HOST=api.wobbly.site`
- `STAGING_DEPLOY_USER=root`
- `STAGING_DEPLOY_PATH=/opt/rating-service-staging`
- `STAGING_DEPLOY_OWNER=ratingapp:ratingapp`
- `STAGING_DEPLOY_STATIC_PATH=/opt/rating-service-staging/backend/app/static`
- `STAGING_DEPLOY_SSH_KEY` — скопировать один в один из backend repo secret `STAGING_DEPLOY_SSH_KEY`
- `STAGING_ACCESS_KEY` — скопировать один в один из backend repo secret `STAGING_ACCESS_KEY`

## Smoke checks

Production:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`
