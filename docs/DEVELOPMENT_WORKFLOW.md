# Development Workflow

Этот файл описывает правила работы именно для frontend-репозитория.

## Branching

- `develop` — основная ветка для frontend-разработки и staging
- `main` — production-only ветка frontend
- задачи делаем в короткоживущих ветках от `develop`

## Branch Naming

Используем:

- `feat/`
- `fix/`
- `docs/`
- `refactor/`
- `chore/`

## Commit Messages

Используем `Conventional Commits`.

Примеры:

- `feat(admin): add environment switcher`
- `fix(docs): correct API intro copy`
- `docs(repo): add frontend handoff`

## Delivery Flow

Обычный flow:

1. создать ветку от `develop`
2. сделать изменение
3. прогнать `./scripts/ci_check.sh`
4. сделать commit
5. push в ветку
6. влить в `develop`
7. дождаться staging workflow

Production:

1. взять проверенный frontend из `develop`
2. влить в `main`
3. дождаться production workflow

## Что относится к этому репозиторию

Здесь живут:

- UI source
- docs page source
- admin UI source
- frontend styles
- frontend deploy workflows

Если задача про backend API, нужно идти в `Wobbly-develop/back`.

## Docs Rule

Если меняется:

- текст docs page
- admin UI flow
- landing copy

обновления делаются здесь.

Если меняется backend API contract:

- обновить frontend docs page source
- согласовать изменения с backend-репозиторием
