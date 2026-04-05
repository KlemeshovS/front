# Development Workflow

Правила работы для frontend-репозитория.

## Ветки

- `develop` — основная ветка разработки и staging
- `main` — production-only ветка
- задачи делаются в коротких ветках от `develop`

## Именование веток

Используем:

- `feat/`
- `fix/`
- `docs/`
- `refactor/`
- `chore/`

## Коммиты

Используем `Conventional Commits`.

Примеры:

- `feat(admin): add environment switcher`
- `fix(docs): correct API intro copy`
- `docs(repo): update frontend docs`

## Обычная разработка

1. создать ветку от `develop`
2. запустить `npm run dev`
3. внести изменения
4. прогнать `./scripts/ci_check.sh`
5. сделать commit
6. push в свою ветку
7. влить в `develop`
8. дождаться staging workflow

## Проверки

Главная команда:

```bash
./scripts/ci_check.sh
```

Отдельные стадии:

```bash
./scripts/typecheck.sh
./scripts/lint.sh
./scripts/format_check.sh
./scripts/test.sh
```

## Production

1. взять проверенный frontend из `develop`
2. влить в `main`
3. дождаться production workflow

Deploy flow after repo split:

- `front` выкатывает только frontend bundle и не трогает backend service
- `back` выкатывает только backend code и не трогает frontend dirs

## Границы репозитория

Здесь живут:

- UI source
- docs page source
- admin UI source
- frontend styles
- frontend deploy workflows

Если задача про backend API, migrations или backend deploy, нужно идти в [Wobbly-develop/back](https://github.com/Wobbly-develop/back).

## Документация

Если меняется:

- landing copy
- docs page
- admin UI flow

изменения делаются здесь.

Если меняется backend API contract:

- обновить frontend docs page source
- согласовать изменения с backend-репозиторием
