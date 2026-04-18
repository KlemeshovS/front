export interface DocsCard {
  method?: string;
  badgeClass?: string;
  path?: string;
  headers?: string;
  request?: string;
  response?: string;
  paragraphs?: string[];
  muted?: string;
  list?: string[];
}

export interface QuickItem {
  title: string;
  body: string;
}

export interface DocsSection {
  id: string;
  title: string;
  quickGrid?: QuickItem[];
  cards?: DocsCard[];
}

export const docsSections: DocsSection[] = [
  {
    id: "base",
    title: "Base URL",
    cards: [
      {
        response: "https://api.wobbly.site/api/v1",
        muted:
          "Для нового mobile-контракта используйте /api/v1. Legacy unversioned routes пока сохранены для обратной совместимости.",
      },
    ],
  },
  {
    id: "flow",
    title: "Интеграционный Flow",
    quickGrid: [
      {
        title: "1. Первый запуск",
        body: "Если нет accessToken — вызвать POST /api/v1/auth/anonymous, сохранить accessToken и userId.",
      },
      {
        title: "2. Social login",
        body: "Получить idToken от Google/Apple или accessToken от Yandex, отправить на соответствующий endpoint. Backend вернёт accessToken + refreshToken.",
      },
      {
        title: "3. Восстановление сессии",
        body: "При старте приложения вызвать GET /api/v1/auth/session. Если 401 — выполнить refresh через POST /api/v1/auth/refresh.",
      },
      {
        title: "4. Профиль и рейтинг",
        body: "PATCH /api/v1/me/profile — сохранить username и participateInRating. PATCH /api/v1/me/rating — отдельно переключить участие.",
      },
      {
        title: "5. Обновление счёта",
        body: "POST /api/v1/me/score — только для authenticated пользователей с username и включённым рейтингом.",
      },
      {
        title: "6. Удаление аккаунта",
        body: "DELETE /api/v1/me — только для authenticated. Удаляет все данные каскадно. После успеха очистить локальное состояние.",
      },
    ],
  },
  {
    id: "request-headers",
    title: "Заголовки запросов",
    cards: [
      {
        paragraphs: ["Для защищённых методов передавать Authorization:"],
        headers: "Authorization: Bearer <accessToken>",
      },
      {
        paragraphs: [
          "Опциональный заголовок X-Client-Platform для идентификации платформы клиента. Сервер сохраняет значение в сессии.",
        ],
        headers: "X-Client-Platform: ios",
        muted:
          "Допустимые значения: ios, android. Любое другое значение игнорируется.",
      },
    ],
  },
  {
    id: "versioning",
    title: "Versioning Strategy",
    cards: [
      {
        paragraphs: [
          "Новый публичный mobile-контракт начинается с /api/v1/...",
          "Старые unversioned routes пока остаются доступными, чтобы не сломать уже выпущенных клиентов.",
          "Все обратно совместимые изменения можно добавлять в v1.",
          "Любое несовместимое изменение должно идти только через новый namespace вроде /api/v2/... с отдельным migration window для клиентов.",
        ],
      },
    ],
  },
  {
    id: "maintenance",
    title: "Правило Поддержки Docs",
    cards: [
      {
        paragraphs: [
          "Если меняется API-контракт, страницу /api/docs нужно обновлять в том же изменении.",
          "Документация должна оставаться читаемой: по смысловым секциям, без длинной неструктурированной стены текста.",
        ],
      },
    ],
  },
  {
    id: "health",
    title: "Service Health",
    cards: [
      {
        method: "GET",
        badgeClass: "get",
        path: "/health",
        paragraphs: ["Показывает, что HTTP-приложение запущено и отвечает."],
        response: `{
  "status": "ok"
}`,
      },
      {
        method: "GET",
        badgeClass: "get",
        path: "/ready",
        paragraphs: [
          "Показывает, что сервис реально готов принимать трафик.",
          "Сейчас readiness проверяет доступность PostgreSQL через простой DB ping.",
        ],
        response: `{
  "status": "ok"
}`,
        muted:
          "Если база недоступна, endpoint вернет 503 и единый error contract с message = Service not ready.",
      },
    ],
  },
  {
    id: "admin-api",
    title: "Admin API",
    cards: [
      {
        paragraphs: [
          "Для админки есть отдельный набор endpoint'ов под /admin.",
          "Admin auth не заменяет обычный user auth. Это отдельный слой для панели управления.",
          "Основные методы: POST /admin/auth/login, POST /admin/auth/logout, GET /admin/me, PATCH /admin/me/password, GET /admin/overview, GET/PATCH/DELETE /admin/users, GET /admin/audit-log, GET/POST/PATCH/DELETE /admin/admin-users.",
        ],
        muted:
          "UI админки работает через admin.wobbly.site/production/ и admin.wobbly.site/staging/ с same-origin admin API /production/api/... и /staging/api/....",
      },
    ],
  },
  {
    id: "errors-contract",
    title: "Единый Формат Ошибок",
    cards: [
      {
        paragraphs: ["Все ошибки API возвращаются в формате code + message."],
        response: `{
  "code": "USERNAME_ALREADY_EXISTS",
  "message": "Username already exists"
}`,
        list: [
          "MISSING_AUTHORIZATION_HEADER — заголовок Authorization отсутствует.",
          "INVALID_AUTHORIZATION_HEADER — заголовок Authorization передан в неправильном формате.",
          "INVALID_TOKEN — токен не найден или больше невалиден.",
          "AUTH_REQUIRED_FOR_RATING — требуется авторизация для рейтингового контура.",
          "AUTH_REQUIRED_FOR_USERNAME — требуется авторизация для сохранения username.",
          "GUEST_CANNOT_ENABLE_RATING — guest пытается включить участие в рейтинге.",
          "USERNAME_REQUIRED_FOR_RATING — нельзя включить рейтинг без username.",
          "USERNAME_ALREADY_EXISTS — такое имя уже занято.",
          "USER_NOT_FOUND — пользователь не найден.",
          "GOOGLE_AUTH_INVALID / APPLE_AUTH_INVALID / YANDEX_AUTH_INVALID — ошибка проверки токена провайдера.",
          "IDENTITY_ALREADY_LINKED — social account уже привязан к другому пользователю.",
          "PROVIDER_ALREADY_LINKED — provider уже привязан к текущему аккаунту.",
          "PROVIDER_NOT_LINKED — у аккаунта нет такого провайдера.",
          "LAST_IDENTITY_REQUIRED — нельзя отвязать последний способ входа.",
          "AUTH_REQUIRED_FOR_PROVIDER_MANAGEMENT — guest не может управлять провайдерами.",
          "RATE_LIMIT_EXCEEDED — превышен лимит запросов.",
          "VALIDATION_ERROR — тело запроса не прошло валидацию.",
          "INTERNAL_SERVER_ERROR — внутренняя ошибка backend.",
        ],
      },
    ],
  },
  {
    id: "auth-anonymous",
    title: "POST /api/v1/auth/anonymous",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/anonymous",
        paragraphs: [
          "Создаёт anonymous (guest) пользователя и возвращает bearer token.",
        ],
        request: "{}",
        response: `{
  "userId": 26,
  "accessToken": "ac_xxxxx",
  "tokenType": "bearer"
}`,
        muted:
          "refreshToken для anonymous не возвращается. Guest не может участвовать в рейтинге.",
      },
    ],
  },
  {
    id: "auth-google",
    title: "POST /api/v1/auth/google",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/google",
        paragraphs: [
          "Аутентификация через Google. Если передать Authorization с guest-токеном, guest-аккаунт будет смёржен с Google-аккаунтом.",
        ],
        headers: "Authorization: Bearer <guestAccessToken>  (опционально)",
        request: `{
  "idToken": "<Google ID Token>"
}`,
        response: `{
  "userId": 26,
  "accessToken": "ac_xxxxx",
  "refreshToken": "rf_xxxxx",
  "tokenType": "bearer"
}`,
      },
    ],
  },
  {
    id: "auth-apple",
    title: "POST /api/v1/auth/apple",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/apple",
        paragraphs: [
          "Аутентификация через Apple. Если передать Authorization с guest-токеном, guest-аккаунт будет смёржен с Apple-аккаунтом.",
        ],
        headers: "Authorization: Bearer <guestAccessToken>  (опционально)",
        request: `{
  "idToken": "<Apple Identity Token>"
}`,
        response: `{
  "userId": 26,
  "accessToken": "ac_xxxxx",
  "refreshToken": "rf_xxxxx",
  "tokenType": "bearer"
}`,
      },
    ],
  },
  {
    id: "auth-yandex",
    title: "POST /api/v1/auth/yandex",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/yandex",
        paragraphs: [
          "Аутентификация через Yandex. Если передать Authorization с guest-токеном, guest-аккаунт будет смёржен с Yandex-аккаунтом.",
        ],
        headers: "Authorization: Bearer <guestAccessToken>  (опционально)",
        request: `{
  "accessToken": "<Yandex OAuth Token>"
}`,
        response: `{
  "userId": 26,
  "accessToken": "ac_xxxxx",
  "refreshToken": "rf_xxxxx",
  "tokenType": "bearer"
}`,
      },
    ],
  },
  {
    id: "auth-session",
    title: "GET /api/v1/auth/session",
    cards: [
      {
        method: "GET",
        badgeClass: "get",
        path: "/api/v1/auth/session",
        paragraphs: [
          "Возвращает текущую серверную сессию и базовое состояние пользователя.",
        ],
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "userId": 26,
  "username": "player_1",
  "participateInRating": true,
  "sessionType": "authenticated",
  "provider": "google",
  "avatarUrl": "https://api.wobbly.site/media/avatars/user-26.jpg"
}`,
        muted:
          "sessionType: guest | authenticated. provider: google | apple | yandex | null для guest.",
      },
    ],
  },
  {
    id: "auth-refresh",
    title: "POST /api/v1/auth/refresh",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/refresh",
        paragraphs: ["Обменивает refreshToken на новую пару токенов."],
        request: `{
  "refreshToken": "rf_xxxxx"
}`,
        response: `{
  "userId": 26,
  "accessToken": "ac_yyyyy",
  "refreshToken": "rf_yyyyy",
  "tokenType": "bearer"
}`,
        muted: "Если refreshToken невалиден, вернёт 401 INVALID_TOKEN.",
      },
    ],
  },
  {
    id: "auth-logout",
    title: "POST /api/v1/auth/logout",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/logout",
        paragraphs: [
          "Завершает текущую сессию на сервере. После этого accessToken становится невалидным.",
        ],
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "status": "loggedOut"
}`,
      },
    ],
  },
  {
    id: "auth-providers",
    title: "GET /api/v1/auth/providers",
    cards: [
      {
        method: "GET",
        badgeClass: "get",
        path: "/api/v1/auth/providers",
        paragraphs: [
          "Возвращает список привязанных identity providers для текущего аккаунта.",
        ],
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "items": [
    {
      "provider": "google",
      "providerEmail": "user@gmail.com",
      "providerEmailVerified": true,
      "createdAt": "2026-04-01T10:00:00Z",
      "updatedAt": "2026-04-01T10:00:00Z"
    }
  ]
}`,
      },
    ],
  },
  {
    id: "auth-providers-link",
    title: "POST /api/v1/auth/providers/{provider}/link",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/providers/google/link",
        paragraphs: ["Привязывает Google к текущему authenticated аккаунту."],
        headers: "Authorization: Bearer <accessToken>",
        request: `{
  "idToken": "<Google ID Token>"
}`,
        response: `{
  "items": [...]
}`,
      },
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/providers/apple/link",
        request: `{
  "idToken": "<Apple Identity Token>"
}`,
      },
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/auth/providers/yandex/link",
        request: `{
  "accessToken": "<Yandex OAuth Token>"
}`,
        muted:
          "Ответ у всех link-методов одинаковый: обновлённый список providers.",
      },
    ],
  },
  {
    id: "auth-providers-unlink",
    title: "DELETE /api/v1/auth/providers/{provider}",
    cards: [
      {
        method: "DELETE",
        badgeClass: "delete",
        path: "/api/v1/auth/providers/{provider}",
        paragraphs: [
          "Отвязывает provider от текущего аккаунта.",
          "Допустимые значения provider: google, apple, yandex.",
        ],
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "items": [...]
}`,
        muted:
          "Нельзя отвязать последний способ входа — вернёт 409 LAST_IDENTITY_REQUIRED.",
      },
    ],
  },
  {
    id: "me",
    title: "GET /api/v1/me",
    cards: [
      {
        method: "GET",
        badgeClass: "get",
        path: "/api/v1/me",
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "id": 26,
  "username": "player_1",
  "participateInRating": true,
  "avatarUrl": "https://api.wobbly.site/media/avatars/user-26.jpg"
}`,
      },
    ],
  },
  {
    id: "profile",
    title: "PATCH /api/v1/me/profile",
    cards: [
      {
        method: "PATCH",
        badgeClass: "patch",
        path: "/api/v1/me/profile",
        headers: `Authorization: Bearer <accessToken>
Content-Type: application/json`,
        request: `{
  "username": "player_1",
  "participateInRating": true
}`,
        response: `{
  "id": 26,
  "username": "player_1",
  "participateInRating": true,
  "avatarUrl": null
}`,
        list: [
          "Если participateInRating = true, username должен быть заполнен.",
          "Guest не может сохранять username через этот endpoint.",
          "username должен быть уникальным.",
          "Разрешены только латиница, цифры, _, ., -.",
          "Если username уже был сохранён, его нельзя очистить обратно в пустое значение.",
        ],
      },
    ],
  },
  {
    id: "rating",
    title: "PATCH /api/v1/me/rating",
    cards: [
      {
        method: "PATCH",
        badgeClass: "patch",
        path: "/api/v1/me/rating",
        headers: `Authorization: Bearer <accessToken>
Content-Type: application/json`,
        request: `{
  "participateInRating": false
}`,
        response: `{
  "id": 26,
  "username": "player_1",
  "participateInRating": false,
  "avatarUrl": null
}`,
      },
    ],
  },
  {
    id: "avatar-upload",
    title: "POST /api/v1/me/avatar",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/me/avatar",
        paragraphs: ["Загружает новый аватар текущего пользователя."],
        headers: `Authorization: Bearer <accessToken>
Content-Type: multipart/form-data`,
        request: "Поле файла: file",
        response: `{
  "id": 26,
  "username": "player_1",
  "participateInRating": true,
  "avatarUrl": "https://api.wobbly.site/media/avatars/user-26.jpg"
}`,
        muted:
          "Поддерживаются image/jpeg, image/png, image/webp. Максимальный размер задаётся конфигом AVATAR_MAX_BYTES.",
      },
    ],
  },
  {
    id: "avatar-delete",
    title: "DELETE /api/v1/me/avatar",
    cards: [
      {
        method: "DELETE",
        badgeClass: "delete",
        path: "/api/v1/me/avatar",
        paragraphs: ["Удаляет текущий аватар пользователя."],
        headers: "Authorization: Bearer <accessToken>",
        response: `{
  "id": 26,
  "username": "player_1",
  "participateInRating": true,
  "avatarUrl": null
}`,
      },
    ],
  },
  {
    id: "account-delete",
    title: "DELETE /api/v1/me",
    cards: [
      {
        method: "DELETE",
        badgeClass: "delete",
        path: "/api/v1/me",
        paragraphs: [
          "Удаляет аккаунт текущего пользователя и все связанные данные: сессии, провайдеры, аватар.",
          "Доступно только для authenticated пользователей.",
        ],
        headers: "Authorization: Bearer <accessToken>",
        muted: "Ответ: 204 No Content. Действие необратимо.",
      },
    ],
  },
  {
    id: "score",
    title: "POST /api/v1/me/score",
    cards: [
      {
        method: "POST",
        badgeClass: "post",
        path: "/api/v1/me/score",
        headers: `Authorization: Bearer <accessToken>
Content-Type: application/json`,
        request: `{
  "score": 123
}`,
        response: `{
  "username": "player_1",
  "score": 123,
  "avatarUrl": null
}`,
        muted:
          "Не передавать userId или username — backend определяет пользователя по токену. Score можно отправлять только если есть username, включено участие в рейтинге и session не guest.",
      },
    ],
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    cards: [
      {
        method: "GET",
        badgeClass: "get",
        path: "/api/v1/leaderboard/top?limit=100",
        paragraphs: [
          "Возвращает только пользователей с score >= 0.",
          "В leaderboard попадают только пользователи с непустым username, включённым рейтингом и lastSeenAt не старше 30 дней.",
        ],
        response: `{
  "items": [
    {
      "username": "player_1",
      "score": 42,
      "avatarUrl": "https://api.wobbly.site/media/avatars/user-26.jpg"
    },
    {
      "username": "player_2",
      "score": 10,
      "avatarUrl": null
    }
  ],
  "total": 200
}`,
      },
      {
        method: "GET",
        badgeClass: "get",
        path: "/api/v1/leaderboard/bottom?limit=100",
        paragraphs: [
          "Возвращает только пользователей с score < 0.",
          "Те же правила фильтрации, что и у top.",
        ],
      },
    ],
  },
];
