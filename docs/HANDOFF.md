# Handoff

Этот файл нужен для быстрого старта нового чата именно по frontend-репозиторию.

## Репозитории

- frontend: `https://github.com/Wobbly-develop/front`
- backend: `https://github.com/Wobbly-develop/back`

## Что считается source of truth

Здесь:

- landing source
- privacy page source
- text docs page source
- admin UI source
- frontend CI/CD

Не здесь:

- backend API logic
- migrations
- backend deploy/release scripts

Если задача про backend behavior, идти в `Wobbly-develop/back`.

## Важные пути

- `src/pages/LandingPage.vue`
- `src/pages/PrivacyPage.vue`
- `src/pages/ApiDocsPage.vue`
- `src/pages/AdminPage.vue`
- `src/features/docs/content.ts`
- `src/features/admin/`

## Branch truth

- `develop` — staging frontend
- `main` — production frontend

## Deploy truth

Frontend собирается в `dist/` и выкладывается на сервер как static bundle.

Production surfaces:

- `https://wobbly.site`
- `https://api.wobbly.site/api/docs`
- `https://admin.wobbly.site/production/`

Staging surfaces:

- `https://staging-api.wobbly.site/api/docs`
- `https://admin.wobbly.site/staging/`

## Перед началом работы

1. Прочитать этот файл
2. Прочитать [README.md](/tmp/wobbly-front/README.md)
3. Если задача про deploy, прочитать [docs/DEPLOY.md](/tmp/wobbly-front/docs/DEPLOY.md)
4. Проверить `git status --short --branch`
