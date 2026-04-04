# Deploy

Этот файл описывает deploy только для frontend-репозитория.

## Branches

- `develop` -> staging deploy
- `main` -> production deploy

## Build output

Frontend собирается в `dist/`.

Deploy script:

- `scripts/deploy_frontend.sh`
- nginx templates:
  - `deploy/nginx/wobbly.site.conf`
  - `deploy/nginx/api.wobbly.site.conf`
  - `deploy/nginx/admin.wobbly.site.conf`

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

- `<DEPLOY_PATH>/current`

## Recommended values

Текущая целевая схема независима от backend deploy.

Production:

- `DEPLOY_HOST=api.wobbly.site`
- `DEPLOY_USER=root`
- `DEPLOY_PATH=/opt/wobbly-front-production`
- `DEPLOY_OWNER=ratingapp:ratingapp`
- `DEPLOY_STATIC_PATH=/opt/wobbly-front-production/current`
- `DEPLOY_SSH_KEY` — скопировать один в один из backend repo secret `DEPLOY_SSH_KEY`

Staging:

- `STAGING_DEPLOY_HOST=api.wobbly.site`
- `STAGING_DEPLOY_USER=root`
- `STAGING_DEPLOY_PATH=/opt/wobbly-front-staging`
- `STAGING_DEPLOY_OWNER=ratingapp:ratingapp`
- `STAGING_DEPLOY_STATIC_PATH=/opt/wobbly-front-staging/current`
- `STAGING_DEPLOY_SSH_KEY` — скопировать один в один из backend repo secret `STAGING_DEPLOY_SSH_KEY`
- `STAGING_ACCESS_KEY` — скопировать один в один из backend repo secret `STAGING_ACCESS_KEY`

## Целевая серверная схема

Frontend и backend должны жить отдельно:

- production backend: `/opt/rating-service`
- staging backend: `/opt/rating-service-staging`
- production frontend: `/opt/wobbly-front-production/current`
- staging frontend: `/opt/wobbly-front-staging/current`

Nginx должен:

- `wobbly.site` раздавать из production frontend dir
- `api.wobbly.site/api/docs` раздавать из production frontend dir
- `admin.wobbly.site/production/` раздавать из production frontend dir
- `admin.wobbly.site/staging/` раздавать из staging frontend dir
- API-запросы проксировать в backend

## Smoke checks

Production:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`
