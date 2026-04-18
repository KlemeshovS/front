<template>
  <div class="ds-page">
    <div class="arch-hero">
      <h1>Design System</h1>
      <p class="arch-subtitle">
        Визуальный язык Wobbly — токены, типографика, компоненты
      </p>
    </div>

    <!-- Colors -->
    <div class="arch-section">
      <h2 class="arch-section-title">Color Tokens</h2>
      <div class="ds-colors">
        <div
          v-for="token in colorTokens"
          :key="token.name"
          class="ds-color-swatch"
        >
          <div
            class="ds-color-preview"
            :style="{ background: token.value }"
          ></div>
          <div class="ds-color-meta">
            <div class="ds-color-name">{{ token.name }}</div>
            <div class="ds-color-value">{{ token.value }}</div>
            <div class="ds-color-desc">{{ token.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Typography -->
    <div class="arch-section">
      <h2 class="arch-section-title">Typography</h2>
      <div class="ds-type-stack card">
        <div class="ds-type-row">
          <span class="ds-type-label">h1 · clamp(32–42px) · 700</span>
          <h1 class="ds-sample-h1">Wobbly</h1>
        </div>
        <div class="ds-type-row">
          <span class="ds-type-label">h2 · clamp(24–28px) · 600</span>
          <h2 class="ds-sample-h2">Section Title</h2>
        </div>
        <div class="ds-type-row">
          <span class="ds-type-label">h3 · clamp(18–20px) · 600</span>
          <h3 class="ds-sample-h3">Card Header</h3>
        </div>
        <div class="ds-type-row">
          <span class="ds-type-label">body · 15px · 400</span>
          <p class="ds-sample-body">
            Текст описания — достаточно длинная строка для демонстрации
            читаемости.
          </p>
        </div>
        <div class="ds-type-row">
          <span class="ds-type-label">muted · 15px · var(--muted)</span>
          <p class="ds-sample-muted">
            Вспомогательный текст с пониженным контрастом
          </p>
        </div>
        <div class="ds-type-row">
          <span class="ds-type-label">code · ui-monospace</span>
          <code class="ds-sample-code">/api/v1/auth/session</code>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="arch-section">
      <h2 class="arch-section-title">Method Badges</h2>
      <div class="ds-badges card">
        <div v-for="badge in badges" :key="badge.label" class="ds-badge-row">
          <span class="badge" :class="badge.cls">{{ badge.label }}</span>
          <span class="ds-badge-meta">
            {{ badge.color }} · {{ badge.desc }}
          </span>
        </div>
      </div>
    </div>

    <!-- Spacing -->
    <div class="arch-section">
      <h2 class="arch-section-title">Spacing Scale</h2>
      <div class="ds-spacing card">
        <div v-for="step in spacingScale" :key="step.px" class="ds-spacing-row">
          <div class="ds-spacing-bar-wrap">
            <div
              class="ds-spacing-bar"
              :style="{ width: step.px + 'px' }"
            ></div>
          </div>
          <span class="ds-spacing-label">{{ step.px }}px</span>
          <span class="ds-spacing-use">{{ step.use }}</span>
        </div>
      </div>
    </div>

    <!-- Components -->
    <div class="arch-section">
      <h2 class="arch-section-title">Components</h2>
      <div class="ds-components">
        <div class="ds-comp-block">
          <div class="ds-comp-label">Card</div>
          <div class="card">
            <div class="method">
              <span class="badge get">GET</span>
              <code>/api/v1/me</code>
            </div>
            <p>Основной контейнер для endpoint'а или блока контента.</p>
            <p class="muted">border-radius: 20px · padding: 24px</p>
          </div>
        </div>

        <div class="ds-comp-block">
          <div class="ds-comp-label">Quick Box</div>
          <div class="quick-grid">
            <div class="quick-box">
              <h3>Шаг 1</h3>
              <p>Краткое описание шага в интеграционном flow.</p>
            </div>
            <div class="quick-box">
              <h3>Шаг 2</h3>
              <p>Второй шаг с пояснением.</p>
            </div>
          </div>
        </div>

        <div class="ds-comp-block">
          <div class="ds-comp-label">Hero</div>
          <div class="hero">
            <h1>API docs</h1>
            <p class="muted">Описание страницы с фоновым градиентом.</p>
            <div class="links">
              <a href="#">Swagger UI</a>
              <a href="#">Main site</a>
            </div>
          </div>
        </div>

        <div class="ds-comp-block">
          <div class="ds-comp-label">Code Block</div>
          <pre>{{ codeExample }}</pre>
        </div>
      </div>
    </div>

    <!-- Radii and effects -->
    <div class="arch-section">
      <h2 class="arch-section-title">Radii & Effects</h2>
      <div class="ds-radii card">
        <div v-for="r in radii" :key="r.label" class="ds-radius-row">
          <div
            class="ds-radius-preview"
            :style="{ borderRadius: r.value }"
          ></div>
          <div class="ds-radius-meta">
            <span class="ds-radius-label">{{ r.label }}</span>
            <span class="ds-radius-value">{{ r.value }}</span>
            <span class="ds-radius-use">{{ r.use }}</span>
          </div>
        </div>
        <div class="ds-effect-row">
          <div class="ds-effect-preview ds-effect-glass"></div>
          <div class="ds-radius-meta">
            <span class="ds-radius-label">Glassmorphism</span>
            <span class="ds-radius-value">backdrop-filter: blur(10px)</span>
            <span class="ds-radius-use">Sidebar, overlays</span>
          </div>
        </div>
        <div class="ds-effect-row">
          <div class="ds-effect-preview ds-effect-gradient"></div>
          <div class="ds-radius-meta">
            <span class="ds-radius-label">Gradient BG</span>
            <span class="ds-radius-value">radial-gradient purple + teal</span>
            <span class="ds-radius-use">Page background, hero</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorTokens = [
  {
    name: "--bg",
    value: "#0f1020",
    desc: "Page background",
  },
  {
    name: "--panel",
    value: "#17192b",
    desc: "Card surface",
  },
  {
    name: "--panel-2",
    value: "#1f2340",
    desc: "Elevated surface",
  },
  {
    name: "--text",
    value: "#f3f4ff",
    desc: "Primary text",
  },
  {
    name: "--muted",
    value: "#b9bce0",
    desc: "Secondary text",
  },
  {
    name: "--accent",
    value: "#7c5cff",
    desc: "Purple accent",
  },
  {
    name: "--border",
    value: "rgba(255,255,255,0.09)",
    desc: "Subtle border",
  },
  {
    name: "GET",
    value: "#1d9bf0",
    desc: "Read operations",
  },
  {
    name: "POST",
    value: "#22c55e",
    desc: "Create operations",
  },
  {
    name: "PATCH",
    value: "#f59e0b",
    desc: "Update operations",
  },
  {
    name: "DELETE",
    value: "#ef4444",
    desc: "Delete operations",
  },
];

const badges = [
  {
    label: "GET",
    cls: "get",
    color: "#1d9bf0",
    desc: "Чтение данных, safe & idempotent",
  },
  {
    label: "POST",
    cls: "post",
    color: "#22c55e",
    desc: "Создание ресурса или действие",
  },
  {
    label: "PATCH",
    cls: "patch",
    color: "#f59e0b",
    desc: "Частичное обновление",
  },
  {
    label: "DELETE",
    cls: "delete",
    color: "#ef4444",
    desc: "Удаление ресурса",
  },
];

const spacingScale = [
  { px: 4, use: "gap, micro padding" },
  { px: 8, use: "badge padding, icon gap" },
  { px: 12, use: "link padding, small gap" },
  { px: 16, use: "code block padding, card gap" },
  { px: 20, use: "sidebar padding, medium gap" },
  { px: 24, use: "card padding" },
  { px: 32, use: "section spacing" },
  { px: 40, use: "content padding" },
  { px: 56, use: "content horizontal padding" },
];

const radii = [
  { label: "Badge", value: "999px", use: "Pills, tags" },
  { label: "Code", value: "6px", use: "Inline code" },
  { label: "Code block", value: "16px", use: "pre blocks" },
  { label: "Quick box", value: "18px", use: "Info cards" },
  { label: "Card", value: "20px", use: "Endpoint cards" },
  { label: "Hero", value: "24px", use: "Hero section" },
];

const codeExample = `{
  "userId": 26,
  "accessToken": "ac_xxxxx",
  "tokenType": "bearer"
}`;
</script>
