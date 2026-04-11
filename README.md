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
- nginx templates для frontend surface

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

Целевая схема:

- frontend на сервере живет отдельно от backend
- production frontend и staging frontend имеют свои собственные каталоги
- nginx раздает frontend как static app, а backend отвечает только за API
- live server уже использует эту схему:
  - production frontend: `/opt/wobbly-front-production/current`
  - staging frontend: `/opt/wobbly-front-staging/current`

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
- `npm run typecheck`
- `npm run lint`
- `npm run format`
- `npm run test`
- `npm run build`

Поштучно:

```bash
./scripts/typecheck.sh
./scripts/lint.sh
./scripts/format_check.sh
./scripts/test.sh
```

Перед релизом:

```bash
./scripts/release_check.sh
```

## Ветки и deploy

- `develop` -> staging frontend deploy
- `main` -> production frontend deploy
- обычная работа идет только в `develop`
- `main` обновляется только по прямой просьбе владельца
- любой push или merge в `main` считается релизом
- перед release в `main` обязательно прогоняется `./scripts/release_check.sh`

Production surfaces:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging surfaces:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`

Подробности:

- [docs/DEVELOPMENT_WORKFLOW.md](/tmp/wobbly-front/docs/DEVELOPMENT_WORKFLOW.md)
- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)

## Что читать дальше

- [docs/HANDOFF.md](/tmp/wobbly-front/docs/HANDOFF.md)
- [docs/DEVELOPMENT_WORKFLOW.md](/tmp/wobbly-front/docs/DEVELOPMENT_WORKFLOW.md)
- [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)
- [docs/TECHNICAL_BACKLOG.md](/Users/klem/Documents/eguene/wobbly/front/docs/TECHNICAL_BACKLOG.md)
