<template>
  <div class="ambient ambient-a" aria-hidden="true"></div>
  <div class="ambient ambient-b" aria-hidden="true"></div>
  <div class="ambient ambient-c" aria-hidden="true"></div>

  <main class="page">
    <div class="shell">
      <header class="topbar">
        <a class="brand" href="/" aria-label="Wobbly home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-name">Wobbly</span>
        </a>
        <div class="topbar-actions">
          <a class="topbar-cta" :href="appStoreUrl" target="_blank" rel="noreferrer">App Store</a>
          <a class="topbar-cta" :href="googlePlayUrl" target="_blank" rel="noreferrer">Google Play</a>
        </div>
      </header>

      <section class="hero">
        <div class="hero-copy">
          <div class="eyebrow">{{ copy.eyebrow }}</div>
          <h1>{{ copy.heroTitle }}</h1>
          <p class="hero-subtitle">{{ copy.heroBody }}</p>
          <div class="hero-actions">
            <div class="cta-row">
              <a class="primary-cta" :href="appStoreUrl" target="_blank" rel="noreferrer">
                <span class="cta-label">{{ copy.appStoreLabel }}</span>
                <span class="cta-title">{{ copy.appStoreTitle }}</span>
              </a>
              <a class="secondary-cta" :href="googlePlayUrl" target="_blank" rel="noreferrer">
                <span class="cta-label">{{ copy.googlePlayLabel }}</span>
                <span class="cta-title">{{ copy.googlePlayTitle }}</span>
              </a>
              <a class="secondary-cta" href="https://t.me/wobbly_app" target="_blank" rel="noreferrer">
                <span class="cta-label">{{ copy.tgLabel }}</span>
                <span class="cta-title">{{ copy.tgTitle }}</span>
              </a>
            </div>
            <p class="hero-note">{{ copy.heroNote }}</p>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <!-- Floating cards -->
          <div class="floating-card floating-card-top glass-card">
            <span class="floating-card-accent">+24</span>
            <strong>{{ copy.card1Title }}</strong>
            <span>{{ copy.card1Body }}</span>
          </div>

          <div class="floating-card floating-card-middle glass-card">
            <strong>{{ copy.card2Title }}</strong>
            <span>{{ copy.card2Body }}</span>
          </div>

          <div class="floating-card floating-card-bottom glass-card">
            <strong>{{ copy.card3Title }}</strong>
            <span>{{ copy.card3Body }}</span>
          </div>

          <!-- Phone mockup -->
          <div class="phone phone-main">
            <div class="phone-screen">
              <div class="screen-top">
                <span class="screen-date">{{ copy.screenDate }}</span>
                <span class="screen-pill">{{ copy.screenLabel }}</span>
              </div>

              <div class="screen-score">
                <strong>{{ copy.screenNumber }}</strong>
                <span>{{ copy.screenNumberLabel }}</span>
              </div>

              <div class="screen-chart">
                <span class="bar bar-pos bar-1"></span>
                <span class="bar bar-neg bar-2"></span>
                <span class="bar bar-pos bar-3"></span>
                <span class="bar bar-pos bar-4"></span>
                <span class="bar bar-neg bar-5"></span>
                <span class="bar bar-pos bar-6"></span>
                <span class="bar bar-pos bar-7"></span>
              </div>

              <div class="screen-leaderboard">
                <div class="lb-row">
                  <span class="lb-pos">1.</span>
                  <span class="lb-avatar"></span>
                  <span class="lb-name">alex_k</span>
                  <span class="lb-score">+147</span>
                </div>
                <div class="lb-row">
                  <span class="lb-pos">2.</span>
                  <span class="lb-avatar"></span>
                  <span class="lb-name">marina</span>
                  <span class="lb-score">+118</span>
                </div>
                <div class="lb-row lb-me">
                  <span class="lb-pos">3.</span>
                  <span class="lb-avatar"></span>
                  <span class="lb-name">{{ copy.screenMe }}</span>
                  <span class="lb-score">+{{ copy.screenNumber }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="section">
        <div class="section-heading">
          <span class="section-kicker">{{ copy.featuresKicker }}</span>
          <h2>{{ copy.featuresTitle }}</h2>
        </div>
        <div class="feature-grid">
          <article
            v-for="item in featureCards"
            :key="item.title"
            class="feature-card glass-card"
          >
            <div :class="['feature-icon', item.iconClass]">{{ item.emoji }}</div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </section>

      <!-- CTA bottom -->
      <section class="section cta-section">
        <div class="cta-panel glass-card">
          <div class="cta-panel-copy">
            <span class="section-kicker">{{ copy.ctaKicker }}</span>
            <h2>{{ copy.ctaSectionTitle }}</h2>
            <p>{{ copy.ctaSectionBody }}</p>
          </div>
          <div class="cta-column">
            <a class="primary-cta" :href="appStoreUrl" target="_blank" rel="noreferrer">
              <span class="cta-label">{{ copy.appStoreLabel }}</span>
              <span class="cta-title">{{ copy.appStoreTitle }}</span>
            </a>
            <a class="secondary-cta" :href="googlePlayUrl" target="_blank" rel="noreferrer">
              <span class="cta-label">{{ copy.googlePlayLabel }}</span>
              <span class="cta-title">{{ copy.googlePlayTitle }}</span>
            </a>
            <a class="secondary-cta" href="https://t.me/wobbly_app" target="_blank" rel="noreferrer">
              <span class="cta-label">{{ copy.tgLabel }}</span>
              <span class="cta-title">{{ copy.tgTitle }}</span>
            </a>
          </div>
        </div>
      </section>

      <footer class="footer">
        <a href="/privacy">{{ copy.footerPrivacy }}</a>
        <a href="mailto:hello@wobbly.site">{{ copy.footerContact }}</a>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import "@/shared/styles/landing.css";

const appStoreUrl =
  "https://apps.apple.com/ru/app/wobbly-sobriety-tracker/id6755603610?l";
const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.tritan.wobbly_flutter";

const locale = computed(() => {
  const language = (navigator.language || "").toLowerCase();
  return language.startsWith("ru") ? "ru" : "en";
});

const copyMap = {
  ru: {
    title: "Wobbly — трекер трезвости и привычек для iPhone и Android",
    description:
      "Wobbly — трекер трезвости с рейтингами и лидербордом. Отмечай дни, следи за прогрессом, соревнуйся с другими. Бесплатно для iOS и Android.",
    eyebrow: "Трекер трезвости",
    heroTitle: "Честный счёт. Без лишних слов.",
    heroBody:
      "Wobbly считает твои дни и показывает реальную картину. Рейтинг среди пользователей, личный прогресс, никакой морали.",
    appStoreLabel: "Доступно на iPhone",
    appStoreTitle: "App Store",
    googlePlayLabel: "Доступно на Android",
    googlePlayTitle: "Google Play",
    tgLabel: "Подписаться",
    tgTitle: "@wobbly_app",
    heroNote: "Бесплатно. Для iPhone и Android.",
    card1Title: "Счёт растёт",
    card1Body: "Каждый день в фокусе добавляет очки.",
    card2Title: "Топ-100",
    card2Body: "Рейтинг среди всех пользователей.",
    card3Title: "Цифры не врут",
    card3Body: "Статистика не приукрашивает.",
    screenDate: "Сегодня",
    screenLabel: "в фокусе",
    screenNumber: "87",
    screenNumberLabel: "дней подряд",
    screenMe: "ты",
    featuresKicker: "Почему Wobbly",
    featuresTitle: "Коротко. Жёстко. По делу.",
    ctaKicker: "Начни сейчас",
    ctaSectionTitle: "Скачай и начни считать.",
    ctaSectionBody:
      "Wobbly бесплатно. Работает на iOS и Android. В Telegram — канал без лишнего шума.",
    footerPrivacy: "Privacy Policy",
    footerContact: "Контакты",
  },
  en: {
    title: "Wobbly — sobriety tracker app for iPhone and Android",
    description:
      "Wobbly is a free sobriety tracker with leaderboards and ratings. Log your days, track progress, compete with others. Available on iOS and Android.",
    eyebrow: "Sobriety tracker",
    heroTitle: "Honest score. No lectures.",
    heroBody:
      "Wobbly counts your days and shows the real picture. Ratings among users, personal progress, zero moralizing.",
    appStoreLabel: "Available on iPhone",
    appStoreTitle: "App Store",
    googlePlayLabel: "Available on Android",
    googlePlayTitle: "Google Play",
    tgLabel: "Follow us",
    tgTitle: "@wobbly_app",
    heroNote: "Free. For iPhone and Android.",
    card1Title: "Score grows",
    card1Body: "Every day in focus adds points.",
    card2Title: "Top-100",
    card2Body: "Global leaderboard ranking.",
    card3Title: "Numbers don't lie",
    card3Body: "Stats don't sugarcoat anything.",
    screenDate: "Today",
    screenLabel: "in focus",
    screenNumber: "87",
    screenNumberLabel: "days in a row",
    screenMe: "you",
    featuresKicker: "Why Wobbly",
    featuresTitle: "Short. Sharp. Honest.",
    ctaKicker: "Get started",
    ctaSectionTitle: "Download and start counting.",
    ctaSectionBody:
      "Wobbly is free. Works on iOS and Android. Telegram channel — no noise.",
    footerPrivacy: "Privacy Policy",
    footerContact: "Contact",
  },
} as const;

const copy = computed(() => copyMap[locale.value]);

const featureCards = computed(() => [
  {
    title: locale.value === "ru" ? "Быстрые отметки" : "Quick check-ins",
    body:
      locale.value === "ru"
        ? "Отметь день за секунду. Без форм, без лишних шагов."
        : "Log the day in one tap. No forms, no friction.",
    emoji: "⚡",
    iconClass: "feature-icon-a",
  },
  {
    title: locale.value === "ru" ? "Рейтинг и лидерборд" : "Ratings & leaderboard",
    body:
      locale.value === "ru"
        ? "Топ-100 лучших и антирейтинг. Видно, где ты находишься среди других."
        : "Top-100 and bottom rankings. See exactly where you stand.",
    emoji: "🏆",
    iconClass: "feature-icon-b",
  },
  {
    title: locale.value === "ru" ? "Никакой морали" : "No lectures",
    body:
      locale.value === "ru"
        ? "Если статистика плохая — приложение не притворяется, что это норма."
        : "If the stats look bad, the app won't pretend you're just going through a phase.",
    emoji: "📊",
    iconClass: "feature-icon-c",
  },
]);

onMounted(() => {
  document.title = copy.value.title;
  const setMeta = (sel: string, val: string) =>
    document.querySelector(sel)?.setAttribute("content", val);

  setMeta('meta[name="description"]', copy.value.description);
  setMeta('meta[property="og:title"]', copy.value.title);
  setMeta('meta[property="og:description"]', copy.value.description);
  setMeta('meta[name="twitter:title"]', copy.value.title);
  setMeta('meta[name="twitter:description"]', copy.value.description);
});
</script>
