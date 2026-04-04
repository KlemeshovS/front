# Wobbly Front

Frontend-репозиторий проекта `Wobbly`.

Репозитории:

- frontend: [Wobbly-develop/front](https://github.com/Wobbly-develop/front)
- backend: [Wobbly-develop/back](https://github.com/Wobbly-develop/back)

Здесь живут:

- landing
- privacy page
- text docs page source
- admin UI source
- frontend CI/CD и deploy

## Структура

- `src/pages/LandingPage.vue`
- `src/pages/PrivacyPage.vue`
- `src/pages/ApiDocsPage.vue`
- `src/pages/AdminPage.vue`
- `src/features/docs/` — source of truth для docs page
- `src/features/admin/` — admin state, API client, types
- `scripts/ci_check.sh`
- `scripts/deploy_frontend.sh`

## Быстрый старт

```bash
npm ci
npm run dev
```

Vite dev server поднимется локально. Для production-сборки:

```bash
npm run build
```

Сборка кладется в `dist/`.

## Как разрабатывать локально

Обычный цикл:

1. создать ветку от `develop`
2. запустить `npm run dev`
3. внести изменения
4. прогнать `./scripts/ci_check.sh`
5. сделать commit и push
6. влить в `develop`

Главная команда проверок:

```bash
./scripts/ci_check.sh
```

Она запускает:

- `npm ci`
- `npm run lint`
- `npm run format`
- `npm run build`

## Ветки и deploy

- `develop` -> staging frontend deploy
- `main` -> production frontend deploy

Подробности:

- [docs/DEVELOPMENT_WORKFLOW.md](/tmp/wobbly-front/docs/DEVELOPMENT_WORKFLOW.md)
- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)

## Что читать дальше

- [docs/HANDOFF.md](/tmp/wobbly-front/docs/HANDOFF.md)
- [docs/DEVELOPMENT_WORKFLOW.md](/tmp/wobbly-front/docs/DEVELOPMENT_WORKFLOW.md)
- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)
