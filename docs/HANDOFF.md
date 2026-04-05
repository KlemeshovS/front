# Handoff

Быстрый старт для нового человека во frontend-репозитории.

## Репозитории

- frontend: `https://github.com/Wobbly-develop/front`
- backend: `https://github.com/Wobbly-develop/back`

## Здесь source of truth для

- landing
- privacy page
- text docs page
- admin UI
- frontend CI/CD

Если задача про backend API, migrations или backend deploy, идти в backend-репозиторий.

## Где искать код

- `src/pages/LandingPage.vue`
- `src/pages/PrivacyPage.vue`
- `src/pages/ApiDocsPage.vue`
- `src/pages/AdminPage.vue`
- `src/features/docs/content.ts`
- `src/features/admin/`

## Ветки

- `develop` — staging frontend
- `main` — production frontend
- обычная работа идет в `develop`
- в `main` идем только по прямой просьбе владельца
- любой push в `main` считается релизом

## Поверхности

Production:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`

Server paths:

- production frontend: `/opt/wobbly-front-production/current`
- staging frontend: `/opt/wobbly-front-staging/current`

## Перед началом работы

1. проверить `git status --short --branch`
2. прочитать [README.md](/tmp/wobbly-front/README.md)
3. если задача про deploy, прочитать [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)
