# Technical Backlog

Технический backlog для frontend-репозитория.

Правила:

- здесь только инженерные и UI-инфраструктурные задачи
- продуктовые изменения выносятся отдельно
- выполненные задачи удаляются или уходят в release notes

## Admin UI

- [ ] Добавить полноценную карточку пользователя в admin modal
  - Показать все доступные поля
  - Сделать layout устойчивым для длинных значений
  - Отдельно показать технические поля и user-facing поля

- [ ] Добавить optimistic/update state discipline в admin UI
  - Не показывать изменения как сохраненные до ответа backend
  - Понятно отображать loading/success/error для действий

- [ ] Добавить фильтрацию и сортировку пользователей в admin table
  - По `createdAt`
  - По `updatedAt`
  - По `score`
  - По участию в рейтинге

- [ ] Добавить pagination или incremental loading в admin users list
  - Чтобы таблица не деградировала на больших данных

- [ ] Добавить отдельные тесты для user detail modal
  - Открытие по клику
  - Загрузка detail endpoint
  - Ошибки загрузки
  - Сохранение изменений

## Public frontend

- [ ] Добавить anti-cache headers strategy для SPA entrypoints
  - Снизить риск залипания старого `index.html`
  - Зафиксировать это в nginx templates

- [ ] Разнести app shell smoke checks по surfaces
  - Landing
  - Docs page
  - Admin production
  - Admin staging

- [ ] Добавить visual regression baseline для критичных страниц
  - Landing
  - Docs page
  - Admin login
  - Admin users

## Архитектура и состояние

- [ ] Добавить единый слой env/runtime config
  - Production / staging distinction
  - Base URLs
  - Admin environment handling

- [ ] Упростить `useAdminConsole`
  - Разделить auth/session logic
  - Разделить users/admins/audit state
  - Вынести side effects в более мелкие composables

- [ ] Добавить error mapping layer для backend error codes
  - Чтобы UI не зависел от сырого текста исключений
  - Нужны человекочитаемые сообщения и recovery actions

## Тесты

- [ ] Расширить unit/integration tests для admin composables
  - Login flow
  - Logout flow
  - Load dashboard flow
  - Save user/admin flow
  - Delete user/admin flow

- [ ] Добавить tests для environment routing
  - `/production/`
  - `/staging/`
  - Docs page routing

- [ ] Добавить tests для status and error rendering
  - Error banners
  - Loading states
  - Empty states

- [ ] Добавить e2e smoke tests
  - Admin login
  - Users list
  - User detail modal
  - Docs page render

## CI/CD и качество

- [ ] Добавить coverage reporting для frontend tests
  - Vitest coverage
  - Thresholds для critical modules

- [ ] Добавить проверку nginx templates в CI
  - syntax-like validation
  - smoke assertions по root / alias / try_files

- [ ] Добавить preview build workflow для PR
  - Собранный artifact
  - Быстрый ручной QA перед merge

## Документация

- [ ] Добавить troubleshooting guide для frontend
  - Browser cache issues
  - Admin blank screen
  - Docs page asset 404
  - Wrong environment shell

- [ ] Держать `README.md` и `docs/DEPLOY.md` синхронными с live server setup
  - Любое изменение deploy paths или nginx routes обновлять сразу
