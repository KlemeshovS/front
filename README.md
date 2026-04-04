# Wobbly Front

Отдельный frontend-репозиторий для:
- landing page
- privacy page
- text docs page
- admin UI

## Локальный запуск

```bash
npm ci
npm run dev
```

Проверки:

```bash
./scripts/ci_check.sh
```

Build:

```bash
npm run build
```

Сборка кладется в `dist/`.

## Branch Flow

- `develop` -> staging frontend deploy
- `main` -> production frontend deploy

## GitHub Secrets

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

Если `DEPLOY_STATIC_PATH` или `STAGING_DEPLOY_STATIC_PATH` не заданы, deploy script использует:
- `<DEPLOY_PATH>/backend/app/static`
