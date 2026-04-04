# Wobbly Front

Frontend-репозиторий проекта `Wobbly`.

Репозитории:

- frontend: [Wobbly-develop/front](https://github.com/Wobbly-develop/front)
- backend: [Wobbly-develop/back](https://github.com/Wobbly-develop/back)

Этот репозиторий отвечает за:

- landing
- privacy page
- text docs page source
- admin UI source
- frontend CI/CD
- frontend deploy в static bundle на сервере

## Что здесь есть

- `src/pages/LandingPage.vue`
- `src/pages/PrivacyPage.vue`
- `src/pages/ApiDocsPage.vue`
- `src/pages/AdminPage.vue`
- `src/features/docs/` — source of truth для текстовой docs page
- `src/features/admin/` — admin state, typed API client, types
- `.github/workflows/` — frontend CI/CD
- `scripts/ci_check.sh`
- `scripts/deploy_frontend.sh`

## Локальный запуск

```bash
npm ci
npm run dev
```

Build:

```bash
npm run build
```

Сборка кладется в `dist/`.

## Проверки

```bash
./scripts/ci_check.sh
```

Что входит:

- `npm ci`
- `npm run lint`
- `npm run format`
- `npm run build`

## Branch Flow

- `develop` -> staging frontend deploy
- `main` -> production frontend deploy

## Deploy

Frontend деплоится отдельно от backend-кода:

- staging deploy идет из `develop`
- production deploy идет из `main`
- результат выкладывается в серверный static path

Подробности:

- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)

## Важные docs

- [docs/HANDOFF.md](/tmp/wobbly-front/docs/HANDOFF.md)
- [docs/DEVELOPMENT_WORKFLOW.md](/tmp/wobbly-front/docs/DEVELOPMENT_WORKFLOW.md)
- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)
